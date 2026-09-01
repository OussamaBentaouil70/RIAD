import { useState, useEffect, type FormEvent } from 'react';
import PhoneInput, { isValidPhoneNumber, type Value as PhoneValue } from 'react-phone-number-input';
import { waLink } from '../lib/whatsapp';

type ReservationFormProps = {
  variant?: 'dark' | 'light';
  prefillMessage?: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ReservationForm({ variant = 'light', prefillMessage }: ReservationFormProps) {
  const dark = variant === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<PhoneValue | undefined>();
  const [message, setMessage] = useState(prefillMessage ?? '');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (prefillMessage) setMessage(prefillMessage);
  }, [prefillMessage]);

  function validate() {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Please enter your full name.';
    if (!email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(email)) next.email = 'Please enter a valid email address.';
    if (!phone || !isValidPhoneNumber(phone)) next.phone = 'Please enter a valid phone number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (website) {
      // Honeypot tripped — silently pretend to succeed, don't hit the network.
      setStatus('success');
      return;
    }

    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/php/send-reservation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, website }),
      });
      const data = await res.json().catch(() => ({ success: false }));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong sending your message. Please try again.');
      }
      window.location.href = '/thankyou';
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong sending your message. Please try again.');
    }
  }

  const labelCls = `field-label ${dark ? 'text-white/70' : 'text-taupe'}`;
  const inputCls = (hasError: boolean) => `field-input ${dark ? 'field-input--dark' : ''} ${hasError ? 'field-error' : ''}`;
  const textareaCls = (hasError: boolean) => `field-textarea ${dark ? 'field-textarea--dark' : ''} ${hasError ? 'field-error' : ''}`;
  const phoneWrapperCls = `${dark ? 'PhoneInput--dark' : ''} ${errors.phone ? 'PhoneInput--error' : ''}`;

  if (status === 'success') {
    return (
      <div className={`rounded-2xl px-6 py-8 text-center ${dark ? 'bg-white/10 border border-white/20' : 'bg-mint/40 border border-sage/40'}`}>
        <p className={`display text-[22px] mb-2 ${dark ? 'text-white' : 'text-charcoal'}`}>Thank you!</p>
        <p className={`text-[14px] ${dark ? 'text-white/80' : 'text-taupe'}`}>Your message is on its way — redirecting you now.</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real visitors */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
        aria-hidden="true"
      />

      <div>
        <label className={labelCls} htmlFor="rf_name">Full Name</label>
        <input
          id="rf_name"
          className={inputCls(!!errors.name)}
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="field-error-text">{errors.name}</p>}
      </div>

      <div>
        <label className={labelCls} htmlFor="rf_email">Email</label>
        <input
          id="rf_email"
          type="email"
          className={inputCls(!!errors.email)}
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="field-error-text">{errors.email}</p>}
      </div>

      <div>
        <label className={labelCls} htmlFor="rf_phone">Phone</label>
        <PhoneInput
          id="rf_phone"
          className={phoneWrapperCls}
          international
          defaultCountry="ES"
          placeholder="Your phone number"
          value={phone}
          onChange={setPhone}
        />
        {errors.phone && <p className="field-error-text">{errors.phone}</p>}
      </div>

      <div>
        <label className={labelCls} htmlFor="rf_message">Message</label>
        <textarea
          id="rf_message"
          className={textareaCls(false)}
          placeholder="Tell us about the moment you're dreaming of…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'submitting' ? 'Sending…' : 'Send Reservation Request'}
      </button>

      {status === 'error' && (
        <div className={`text-[13px] rounded-xl px-4 py-3 ${dark ? 'bg-white/10 text-white/85' : 'bg-lightblush text-charcoal'}`}>
          <p>{errorMessage}</p>
          <a href={waLink("Hi Erica! I tried to send a reservation request from your site but it didn't go through.")} target="_blank" rel="noopener" className={`inline-block mt-2 underline ${dark ? 'text-blush' : 'text-rose'}`}>
            Message us on WhatsApp instead
          </a>
        </div>
      )}
    </form>
  );
}
