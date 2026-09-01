<?php
/**
 * Email markup helpers.
 *
 * Table-based layout + inline CSS on purpose: Gmail/Outlook strip <style>
 * blocks and ignore flexbox/grid, so every email-safe template sticks to
 * tables and inline styles. Georgia is the serif fallback since Gmail/
 * Outlook usually strip the Google Fonts <link>.
 */

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

/**
 * The "beautiful" confirmation email sent to the customer.
 */
function render_confirmation_email(string $name, string $phone, string $message): string
{
    $firstName = e(trim(explode(' ', $name)[0] ?? $name));
    $safeName = e($name);
    $safePhone = e($phone);
    $safeMessage = nl2br(e($message));
    $waLink = 'https://wa.me/' . WHATSAPP_NUMBER;
    $siteUrl = e(SITE_URL);

    return <<<HTML
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank you — Proposal Packages Barcelona</title>
</head>
<body style="margin:0; padding:0; background-color:#FFF9F6; font-family:Georgia, 'Times New Roman', serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFF9F6; padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#FFFFFF; border-radius:18px; overflow:hidden; border:1px solid rgba(249,168,196,0.3);">

        <tr>
          <td style="background:linear-gradient(135deg,#E87DA0,#F9A8C4); padding:40px 32px; text-align:center;">
            <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.85);">Proposal Packages Barcelona</p>
            <h1 style="margin:12px 0 0; font-family:Georgia, 'Times New Roman', serif; font-weight:normal; font-size:30px; color:#ffffff;">Thank You, {$firstName}</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:36px 32px 8px;">
            <p style="margin:0 0 18px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.7; color:#3D2B34;">
              Your reservation request has been received. We&rsquo;re so glad you&rsquo;re considering us to help plan your moment in Barcelona &mdash; our team will carefully review your message and reach out to confirm every detail as soon as possible.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:8px 32px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FDE8EE; border-radius:14px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 6px; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#7A5C68;">What you sent</p>
                  <p style="margin:0 0 4px; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#3D2B34;"><strong>Name:</strong> {$safeName}</p>
                  <p style="margin:0 0 4px; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#3D2B34;"><strong>Phone:</strong> {$safePhone}</p>
                  <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#3D2B34;"><strong>Message:</strong><br>{$safeMessage}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:0 32px 40px; text-align:center;">
            <a href="{$waLink}" style="display:inline-block; background-color:#E87DA0; color:#ffffff; text-decoration:none; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; padding:14px 32px; border-radius:99px;">Message Erica on WhatsApp</a>
          </td>
        </tr>

        <tr>
          <td style="background-color:#3D2B34; padding:24px 32px; text-align:center;">
            <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:12px; color:rgba(255,255,255,0.6);">Luxury proposal &amp; romantic event planning in Barcelona, Spain.</p>
            <p style="margin:6px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; color:rgba(255,255,255,0.4);"><a href="{$siteUrl}" style="color:rgba(255,255,255,0.4); text-decoration:underline;">{$siteUrl}</a></p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
HTML;
}

/**
 * Plain internal notification sent to the business inbox for each new lead.
 */
function render_notification_email(string $name, string $email, string $phone, string $message): string
{
    $safeName = e($name);
    $safeEmail = e($email);
    $safePhone = e($phone);
    $safeMessage = nl2br(e($message));
    $when = e(date('Y-m-d H:i'));

    return <<<HTML
<!doctype html>
<html lang="en">
<body style="margin:0; padding:24px; background-color:#FFF9F6; font-family:Arial, Helvetica, sans-serif; color:#3D2B34;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; margin:0 auto; background:#FFFFFF; border:1px solid rgba(249,168,196,0.3); border-radius:14px;">
    <tr>
      <td style="padding:24px 28px; border-bottom:1px solid rgba(249,168,196,0.3);">
        <p style="margin:0; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#E87DA0;">New Reservation Request</p>
        <p style="margin:4px 0 0; font-size:12px; color:#7A5C68;">{$when}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px;">
        <p style="margin:0 0 8px; font-size:14px;"><strong>Name:</strong> {$safeName}</p>
        <p style="margin:0 0 8px; font-size:14px;"><strong>Email:</strong> {$safeEmail}</p>
        <p style="margin:0 0 8px; font-size:14px;"><strong>Phone:</strong> {$safePhone}</p>
        <p style="margin:16px 0 0; font-size:14px;"><strong>Message:</strong><br>{$safeMessage}</p>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}
