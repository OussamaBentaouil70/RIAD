<?php
/**
 * Reservation form endpoint.
 *
 * Expects a JSON POST body: { name, email, phone, message, website }
 * (`website` is a honeypot field and must always arrive empty).
 * Sends a plain notification email to the business inbox and a styled
 * HTML confirmation email to the customer, via PHPMailer/SMTP.
 * Always responds with JSON: { success: bool, error?: string }.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $body)
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Method not allowed.']);
}

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/email-template.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

$envPath = __DIR__ . '/.env';
if (!file_exists($envPath)) {
    respond(500, ['success' => false, 'error' => 'Server is not configured yet. Copy php/.env.example to php/.env and fill in your mailbox details.']);
}

$requiredEnvKeys = [
    'SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USERNAME', 'SMTP_PASSWORD',
    'MAIL_FROM', 'MAIL_FROM_NAME', 'MAIL_TO', 'MAIL_TO_NAME',
    'SITE_URL', 'SITE_NAME', 'WHATSAPP_NUMBER',
];

try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $dotenv->required($requiredEnvKeys)->notEmpty();
} catch (Throwable $e) {
    error_log('[send-reservation] env error: ' . $e->getMessage());
    respond(500, ['success' => false, 'error' => 'Server email configuration is incomplete. Check php/.env.']);
}

define('SMTP_HOST', $_ENV['SMTP_HOST']);
define('SMTP_PORT', (int) $_ENV['SMTP_PORT']);
define('SMTP_SECURE', $_ENV['SMTP_SECURE']);
define('SMTP_USERNAME', $_ENV['SMTP_USERNAME']);
define('SMTP_PASSWORD', $_ENV['SMTP_PASSWORD']);
define('MAIL_FROM', $_ENV['MAIL_FROM']);
define('MAIL_FROM_NAME', $_ENV['MAIL_FROM_NAME']);
define('MAIL_TO', $_ENV['MAIL_TO']);
define('MAIL_TO_NAME', $_ENV['MAIL_TO_NAME']);
define('SITE_URL', $_ENV['SITE_URL']);
define('SITE_NAME', $_ENV['SITE_NAME']);
define('WHATSAPP_NUMBER', $_ENV['WHATSAPP_NUMBER']);

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);

if (!is_array($data)) {
    respond(400, ['success' => false, 'error' => 'Invalid request body.']);
}

// Honeypot: bots fill every field, including this hidden one. Pretend to
// succeed without sending anything so they don't learn to avoid it.
if (!empty($data['website'])) {
    respond(200, ['success' => true]);
}

function clean(string $value, int $maxLength): string
{
    return mb_substr(trim(strip_tags($value)), 0, $maxLength);
}

$name = clean((string) ($data['name'] ?? ''), 100);
$email = clean((string) ($data['email'] ?? ''), 190);
$phone = clean((string) ($data['phone'] ?? ''), 30);
$message = clean((string) ($data['message'] ?? ''), 2000);

$errors = [];
if ($name === '') {
    $errors[] = 'name';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}
if ($phone === '' || !preg_match('/^\+?[0-9\s().-]{6,20}$/', $phone)) {
    $errors[] = 'phone';
}

if (!empty($errors)) {
    respond(400, ['success' => false, 'error' => 'Please check the following fields: ' . implode(', ', $errors) . '.']);
}

function send_mail(string $toEmail, string $toName, string $fromEmail, string $fromName, string $subject, string $html, ?string $replyTo = null, ?string $bcc = null): void
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port = SMTP_PORT;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($toEmail, $toName);
    if ($replyTo) {
        $mail->addReplyTo($replyTo);
    }
    if ($bcc && strcasecmp($bcc, $toEmail) !== 0) {
        $mail->addBCC($bcc);
    }

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $html;
    $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $html));

    $mail->send();
}

try {
    // 1. Notify the business inbox. BCC the sending mailbox too — a
    // safety net in case MAIL_TO isn't deliverable (e.g. the mailbox
    // doesn't exist yet on the host), so leads still reach an inbox
    // that's confirmed working since it's the one sending the mail.
    send_mail(
        MAIL_TO,
        MAIL_TO_NAME,
        MAIL_FROM,
        MAIL_FROM_NAME,
        'New reservation request from ' . $name,
        render_notification_email($name, $email, $phone, $message),
        $email,
        MAIL_FROM,
    );

    // 2. Confirm to the customer.
    send_mail(
        $email,
        $name,
        MAIL_FROM,
        MAIL_FROM_NAME,
        'We received your request — ' . SITE_NAME,
        render_confirmation_email($name, $phone, $message),
    );

    respond(200, ['success' => true]);
} catch (PHPMailerException | Exception $e) {
    error_log('[send-reservation] mail error: ' . $e->getMessage());
    respond(500, ['success' => false, 'error' => 'We could not send your message right now. Please try WhatsApp instead.']);
}
