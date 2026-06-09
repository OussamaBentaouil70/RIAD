import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';

/* ─── Intersection Observer Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '', delay }: { children: React.ReactNode; className?: string; delay?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: delay } : undefined}>
      {children}
    </div>
  );
}

/* ─── Toast ─── */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-obsidian text-white text-[12.5px] tracking-wide px-5 py-3 rounded-full shadow-xl z-[80] transition-all duration-500 pointer-events-none ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {message}
    </div>
  );
}

/* ─── WhatsApp Sticky Button ─── */
function WhatsAppSticky() {
  return (
    <a
      href="https://wa.me/212524429108"
      target="_blank"
      rel="noopener"
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl"
      aria-label="Contact us on WhatsApp"
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.862 11.862 0 005.682 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* ─── Section WhatsApp Button ─── */
function SectionWhatsAppButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href="https://wa.me/212524429108"
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-3 text-[13px] transition-colors duration-300 ${light ? 'text-white/70 hover:text-white' : 'text-muted hover:text-brass'}`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.862 11.862 0 005.682 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="tracking-wide">Message on WhatsApp</span>
    </a>
  );
}

/* ─── HEADER ─── */
function Header({ onReserve, onMobileOpen, scrolled }: { onReserve: () => void; onMobileOpen: () => void; scrolled: boolean }) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-canvas/95 backdrop-blur-md shadow-[0_1px_0_#EAE7E1]' : 'bg-transparent'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="h-[72px] md:h-[84px] flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-6">
            <span className={`display text-[22px] md:text-[24px] tracking-[-0.01em] transition-colors duration-300 ${scrolled ? 'text-obsidian' : 'text-white'}`}>RIAD NOIR</span>
            <span className={`eyebrow text-[10px] hidden sm:inline transition-colors duration-300 ${scrolled ? 'text-muted' : 'text-white/70'}`}>Marrakesh — Medina</span>
          </a>
          <nav className="hidden lg:flex items-center gap-11 text-[13px] font-[400] tracking-wide">
            <a href="#suites" className={`transition-colors duration-300 ${scrolled ? 'text-[#3d3a36] hover:text-brass' : 'text-white/90 hover:text-brass'}`}>Suites</a>
            <a href="#testimonials" className={`transition-colors duration-300 ${scrolled ? 'text-[#3d3a36] hover:text-brass' : 'text-white/90 hover:text-brass'}`}>Testimonials</a>
            <a href="#gallery" className={`transition-colors duration-300 ${scrolled ? 'text-[#3d3a36] hover:text-brass' : 'text-white/90 hover:text-brass'}`}>Gallery</a>
            <a href="#amenities" className={`transition-colors duration-300 ${scrolled ? 'text-[#3d3a36] hover:text-brass' : 'text-white/90 hover:text-brass'}`}>Amenities</a>
            <a href="#faq" className={`transition-colors duration-300 ${scrolled ? 'text-[#3d3a36] hover:text-brass' : 'text-white/90 hover:text-brass'}`}>FAQ</a>
          </nav>
          <div className="flex items-center gap-7">
            <button onClick={onReserve} className={`eyebrow text-[11px] transition-colors duration-300 hidden md:block cursor-pointer ${scrolled ? 'text-obsidian hover:text-brass' : 'text-white hover:text-brass'}`}>
              Reserve
            </button>
            <button onClick={onMobileOpen} className="lg:hidden w-9 h-9 flex flex-col items-end justify-center gap-[6px] cursor-pointer group" aria-label="Open menu">
              <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? 'bg-obsidian' : 'bg-white'} group-hover:w-5`} />
              <span className={`block w-4 h-px transition-all duration-300 ${scrolled ? 'bg-obsidian' : 'bg-white'} group-hover:w-6`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── MOBILE MENU ─── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-[60] transition-opacity duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-[400px] bg-canvas shadow-2xl transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="px-8 py-6 flex items-center justify-between border-b border-hairline">
            <span className="display text-[22px]">RIAD NOIR</span>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-muted hover:text-obsidian transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 px-8 py-12 space-y-8">
            {[
              { label: 'Suites', href: '#suites' },
              { label: 'Testimonials', href: '#testimonials' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Amenities', href: '#amenities' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Inquire', href: '#inquire' },
            ].map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="block text-[28px] display text-obsidian hover:text-brass transition-all duration-300 hover:translate-x-2"
                style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="px-8 py-8 border-t border-hairline">
            <p className="text-[13px] text-muted font-light leading-relaxed">
              9 Derb Sidi Ahmed,<br />Mouassine, Marrakesh Medina
            </p>
            <p className="mt-4 text-[13px] text-muted font-light">
              reservations@riadnoir.ma<br />+212 524 42 91 08
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── RESERVATION DRAWER ─── */
function ReserveDrawer({ open, onClose, showToast }: { open: boolean; onClose: () => void; showToast: (msg: string) => void }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-[70] transition-opacity duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-[520px] bg-canvas shadow-2xl border-l border-hairline overflow-y-auto transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-8 md:px-12 py-10 md:py-12">
          <div className="flex justify-between items-start">
            <div>
              <p className="eyebrow mb-2">Reservation Request</p>
              <h3 className="display text-[34px]">Reserve Your Sanctuary</h3>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-muted hover:text-obsidian transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-[14.5px] text-[#3f3b36] font-light">Seven suites. Direct booking with our house manager. No booking engines.</p>

          <form
            className="mt-10 space-y-7"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              showToast('Reservation request received. We will be in touch shortly.');
              setTimeout(onClose, 1400);
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label className="eyebrow text-[10.5px]" htmlFor="r_checkin">Check-in</label>
                <input type="date" id="r_checkin" className="input-minimal" required />
              </div>
              <div>
                <label className="eyebrow text-[10.5px]" htmlFor="r_checkout">Check-out</label>
                <input type="date" id="r_checkout" className="input-minimal" required />
              </div>
            </div>
            <div>
              <label className="eyebrow text-[10.5px]" htmlFor="r_suite">Preferred Suite</label>
              <select id="r_suite" className="input-minimal bg-transparent cursor-pointer">
                <option>Noir Suite — Shadow Garden</option>
                <option>Noir Suite — Cedar Canopy</option>
                <option>First Floor — Onyx Light</option>
                <option>First Floor — Atlas View</option>
                <option>Grand Suite — Tadelakt Noir</option>
                <option>Rooftop Pavilion — Noir</option>
                <option>Advise me</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label className="eyebrow text-[10.5px]" htmlFor="r_name_r">Name</label>
                <input id="r_name_r" className="input-minimal" placeholder="Full name" required />
              </div>
              <div>
                <label className="eyebrow text-[10.5px]" htmlFor="r_email_r">Email</label>
                <input id="r_email_r" type="email" className="input-minimal" placeholder="name@email.com" required />
              </div>
            </div>
            <div>
              <label className="eyebrow text-[10.5px]" htmlFor="r_message">Message</label>
              <input id="r_message" className="input-minimal" placeholder="Occasion, preferences…" />
            </div>
            <div className="pt-3 flex items-center gap-6">
              <button type="submit" className="btn-primary brass">Submit Request</button>
            </div>
            <p className="text-[12px] text-muted pt-1">A 30% deposit secures your dates. Flexible cancellation up to 14 days prior.</p>
            {submitted && (
              <p className="text-[13.5px] text-[#2d6a4f] animate-pulse">Thank you. Your request has been sent to our host desk. We will reply within 6 hours.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─── INLINE RESERVATION FORM (HERO) ─── */
function InlineReservationForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <label className="eyebrow text-[10.5px] text-white/70" htmlFor="h_checkin">Check-in</label>
        <input type="date" id="h_checkin" className="input-minimal-white" required />
      </div>
      <div>
        <label className="eyebrow text-[10.5px] text-white/70" htmlFor="h_checkout">Check-out</label>
        <input type="date" id="h_checkout" className="input-minimal-white" required />
      </div>
      <div>
        <label className="eyebrow text-[10.5px] text-white/70" htmlFor="h_suite">Preferred Suite</label>
        <select id="h_suite" className="input-minimal-white bg-transparent cursor-pointer">
          <option>Noir Suite — Shadow Garden</option>
          <option>Noir Suite — Cedar Canopy</option>
          <option>First Floor — Onyx Light</option>
          <option>Grand Suite — Tadelakt Noir</option>
          <option>Advise me</option>
        </select>
      </div>
      <div>
        <label className="eyebrow text-[10.5px] text-white/70" htmlFor="h_name">Name</label>
        <input id="h_name" className="input-minimal-white" placeholder="Full name" required />
      </div>
      <div>
        <label className="eyebrow text-[10.5px] text-white/70" htmlFor="h_email">Email</label>
        <input id="h_email" type="email" className="input-minimal-white" placeholder="name@email.com" required />
      </div>
      <div>
        <label className="eyebrow text-[10.5px] text-white/70" htmlFor="h_message">Message</label>
        <input id="h_message" className="input-minimal-white" placeholder="Occasion, dietary needs, preferences…" />
      </div>
      <button type="submit" className="btn-primary-white w-full mt-4">
        Request Reservation <span aria-hidden="true">&#8594;</span>
      </button>
    </form>
  );
}

/* ─── BLOCK 1: HERO ─── */
function HeroSection({ onReserve, showToast }: { onReserve: () => void; showToast: (msg: string) => void }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=80"
          alt="Shadow-draped Riad courtyard with dark marble reflection pool"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/70 to-obsidian/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/30" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-32 w-full">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-16 items-center">
          <div className="col-span-12 lg:col-span-7">
            <div className={`transition-all duration-1000 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="eyebrow mb-7 text-white/60">A Private Riad — Medina Quarter</p>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="display text-[44px] sm:text-[58px] lg:text-[68px] xl:text-[80px] leading-[1.08] tracking-[-0.022em] text-white max-w-[680px]">
                An Oasis of Shadow, Texture, and Still Water Hidden Within the Red City.
              </h1>
            </div>
            <div className={`transition-all duration-1000 delay-400 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="mt-8 md:mt-10 max-w-[500px] text-[17px] leading-relaxed text-white/80 font-light">
                Behind an unassuming heavy cedar door in the heart of the Medina lies a private inner courtyard cooled by black marble fountains, dark green palms, and soft dramatic architectural shadows. Seven grand suites, one quiet house.
              </p>
            </div>
            <div className={`mt-10 md:mt-12 flex flex-wrap items-center gap-8 transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button onClick={onReserve} className="btn-primary-white">
                Reserve your sanctuary <span aria-hidden="true">&#8594;</span>
              </button>
              <a href="#suites" className="text-[14px] text-white/70 link-fine-white">Explore the house</a>
            </div>
            <div className={`mt-14 md:mt-20 flex items-center gap-10 text-[12.5px] text-white/50 transition-all duration-1000 delay-600 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span>Marrakesh, Morocco</span>
              <span className="w-10 h-px bg-white/20" />
              <span>Est. 1684 — Rest. 2021</span>
            </div>
          </div>

          <div className={`col-span-12 lg:col-span-5 transition-all duration-1000 delay-700 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-obsidian/60 backdrop-blur-md border border-white/10 p-8 md:p-10 shadow-2xl">
              <p className="eyebrow mb-2 text-brass">Make a Reservation</p>
              <h3 className="display text-[28px] text-white mb-6">Book Your Stay</h3>
              <InlineReservationForm onSubmit={() => showToast('Reservation request received. We will be in touch within 6 hours.')} />
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <SectionWhatsAppButton light />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 2: ESSENCE GRID ─── */
function EssenceGrid() {
  const metrics = [
    { num: '07', symbol: '\u2726', label: 'Exclusive Grand Suites', desc: 'Each with open-sky bath and dark cedar alcove.' },
    { num: '17th', symbol: '\u25C8', label: 'Century Restored Architecture', desc: 'Hand-chiseled zellige, black tadelakt.' },
    { num: '01', symbol: '\u25CE', label: 'Central Onyx Reflection Pool', desc: 'Black marble & local Bejmat, courtyard cooled.' },
    { num: '24/7', symbol: '\u274B', label: 'Dedicated Butler Attendance', desc: 'Discrete, house-trained, one per suite.' },
  ];

  return (
    <section className="border-y border-hairline bg-white">
      <Reveal>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={i} className={`essence-cell py-9 md:py-12 lg:py-14 ${i > 0 ? 'lg:px-10' : 'pr-6'} border-t sm:border-t-0 border-hairline transition-all duration-500 hover:bg-plaster/50`}>
                <div className="flex items-baseline gap-3">
                  <span className="display text-[44px] md:text-[52px] leading-none text-obsidian">{m.num}</span>
                  <span className="text-brass text-lg">{m.symbol}</span>
                </div>
                <p className="eyebrow mt-4 text-[10.8px]">{m.label}</p>
                <p className="mt-2 text-[13.5px] text-muted font-light">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── BLOCK 3: SPACES ─── */
function SpacesSection() {
  return (
    <section id="suites" className="bg-canvas">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-28 lg:py-[132px]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <div>
              <p className="eyebrow mb-4">The Spaces</p>
              <h2 className="display text-[42px] md:text-[54px] lg:text-[60px]">Private Suites & Architectural Spaces</h2>
            </div>
            <p className="max-w-[320px] text-[14.5px] text-muted font-light">A house of three floors, built around silence and shade. Dark limestone, cedar, brass.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-16 items-center mb-20 md:mb-28">
            <div className="col-span-12 lg:col-span-7 group">
              <div className="aspect-[5/4] overflow-hidden bg-[#1a1a1a]">
                <img
                  src="https://images.unsplash.com/photo-1506374322094-6021face62bf?auto=format&fit=crop&w=1400&q=80"
                  alt="Warm minimalist luxury room interior with dark cedar ceilings"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:pl-6">
              <p className="eyebrow text-brass mb-3">01 — Ground Floor</p>
              <h3 className="display text-[34px] md:text-[40px] mb-4">The Noir Suites</h3>
              <p className="text-[16px] leading-relaxed text-[#3b3834] font-light max-w-[420px]">
                Hand-chiseled dark cedar wood ceilings, custom linen drapes, and open-sky plaster bathrooms where afternoon light spills across black tadelakt walls in long, quiet shadows.
              </p>
              <div className="mt-7 text-[13.5px] text-muted">
                <p>45 – 62 m² • King Canopy • Courtyard Soaking Tub</p>
              </div>
              <div className="mt-8">
                <a href="#" className="link-fine text-[13.5px]">Discover the Spaces &#8594;</a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-16 items-center mb-20 md:mb-28">
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 lg:pr-6">
              <p className="eyebrow text-brass mb-3">02 — Rooftop</p>
              <h3 className="display text-[34px] md:text-[40px] mb-4">The Moonlit Terrace</h3>
              <p className="text-[16px] leading-relaxed text-[#3b3834] font-light max-w-[420px]">
                Unobstructed views over the Medina rooftops to the Atlas Mountains. Candlelit lounge alcoves, potted olive trees, and a slow, private dinner service under the stars.
              </p>
              <div className="mt-7 text-[13.5px] text-muted">
                <p>Sunset Aperitivo • Private Dining • Atlas View</p>
              </div>
              <div className="mt-8">
                <a href="#" className="link-fine text-[13.5px]">Discover the Spaces &#8594;</a>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 group">
              <div className="aspect-[5/4] overflow-hidden bg-[#1a1a1a]">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
                  alt="Rooftop lounge terrace at dusk with warm lanterns"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-16 items-center">
            <div className="col-span-12 lg:col-span-7 group">
              <div className="aspect-[5/4] overflow-hidden bg-[#1a1a1a]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
                  alt="Serene dark stone spa vault with smooth plaster walls"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:pl-6">
              <p className="eyebrow text-brass mb-3">03 — Subterranean</p>
              <h3 className="display text-[34px] md:text-[40px] mb-4">The Obsidian Hammam</h3>
              <p className="text-[16px] leading-relaxed text-[#3b3834] font-light max-w-[420px]">
                A subterranean spa space wrapped in smooth dark emerald Tadelakt plaster. Heated stone slabs, eucalyptus steam, and sensory argan oil rituals performed in near silence.
              </p>
              <div className="mt-7 text-[13.5px] text-muted">
                <p>Private Bookings Only • 90 min Rituals • Cool Plunge</p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <a href="#" className="link-fine text-[13.5px]">Discover the Spaces &#8594;</a>
                <SectionWhatsAppButton />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── BLOCK 4: TESTIMONIALS SLIDER ─── */
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    { quote: "An oasis of calm in the bustling Medina. The attention to detail is extraordinary — every corner reveals thoughtful design.", author: "Alexandra M.", location: "London, UK" },
    { quote: "We stayed for our anniversary and it exceeded every expectation. The staff anticipated our needs before we even knew them ourselves.", author: "James & Sophia L.", location: "Sydney, Australia" },
    { quote: "The aesthetic is stunning — dark, moody, luxurious without being pretentious. The hammam ritual was transformative.", author: "Isabelle D.", location: "Paris, France" },
    { quote: "True quiet luxury. No crowds, no noise, just exceptional hospitality in a setting that feels like stepping into another world.", author: "Michael T.", location: "New York, USA" },
    { quote: "From the moment we were escorted through the Medina to the unmarked door, we knew this was somewhere special. The rooftop dinners under the stars were unforgettable.", author: "Emma & David K.", location: "Toronto, Canada" },
    { quote: "A masterclass in understated elegance. The black marble courtyard at dawn, with the reflection pool still and silent, is etched in my memory forever.", author: "Catherine B.", location: "Geneva, Switzerland" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="border-y border-hairline bg-obsidian py-24 md:py-32">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4 text-brass">Testimonials</p>
            <h2 className="display text-[36px] md:text-[48px] text-white">What Our Guests Say</h2>
          </div>
        </Reveal>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="text-center">
                    <blockquote className="display italic text-[28px] md:text-[38px] leading-[1.35] text-white/90 mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <p className="text-[15px] text-brass font-medium">{t.author}</p>
                    <p className="text-[13px] text-white/50 mt-1">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-brass' : 'bg-white/30 hover:bg-white/50'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <SectionWhatsAppButton light />
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 5: GALLERY ─── */
import InteractiveImageBentoGallery from "./components/ui/bento-gallery";

function GallerySection() {
  const imageItems = [
    {
      id: 1,
      title: "Courtyard Reflection",
      desc: "Black marble calm, warm lantern hush.",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: 2,
      title: "Noir Suite Interior",
      desc: "Cedar shadows and quiet linen lines.",
      url: "https://images.unsplash.com/photo-1506374322094-6021face62bf?auto=format&fit=crop&w=1200&q=80",
      span: "md:row-span-1",
    },
    {
      id: 3,
      title: "Moonlit Terrace",
      desc: "Private air and atlas dusk glow.",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      span: "md:row-span-1",
    },
    {
      id: 4,
      title: "Obsidian Hammam",
      desc: "Tadelakt vaults & eucalyptus steam.",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      span: "md:row-span-2",
    },
    {
      id: 5,
      title: "Zellige Detail",
      desc: "Tilework light, geometry in motion.",
      url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
      span: "md:row-span-1",
    },
    {
      id: 6,
      title: "Canopy Bed",
      desc: "Soft drapes, deep rest.",
      url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
      span: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <section id="gallery" className="bg-plaster">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-28">
        <Reveal>
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Gallery</p>
            <h2 className="display text-[42px] md:text-[54px]">Curated Moments</h2>
            <p className="mt-4 max-w-[500px] mx-auto text-[15px] text-muted font-light">
              Drag to explore. Click to expand.
            </p>
          </div>
        </Reveal>

        <div className="-mx-6 md:-mx-10 lg:-mx-14">
          <InteractiveImageBentoGallery
            imageItems={imageItems}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <SectionWhatsAppButton />
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 6: AMENITIES ─── */
function AmenitiesSection() {
  const amenities = [
    { symbol: '\u2726', title: 'Private Airport Concierge & Medina Escort', desc: 'Met airside in Marrakesh. Private transfer to the edge of the Medina, then escorted on foot through our quiet lanes to the unmarked riad door.' },
    { symbol: '\u25C8', title: 'Customized Gastronomy', desc: 'Private market-to-table culinary experiences. Daily produce, courtyard breakfasts, and late candlelit dinners crafted by our private chef.' },
    { symbol: '\u25CE', title: 'Privileged Access', desc: 'Curated architectural tours of the Medina with our house antiquarian, private atelier visits, and Agafay desert excursions at golden hour.' },
    { symbol: '\u274B', title: 'Tailored Wellness', desc: 'In-suite organic massage treatments, private aromatherapy blending, and sunrise yoga on the terrace. All by appointment.' },
  ];

  return (
    <section id="amenities" className="bg-canvas">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-28 lg:py-[124px]">
        <Reveal>
          <div className="max-w-[560px] mb-14 md:mb-20">
            <p className="eyebrow mb-4">Bespoke Amenities</p>
            <h2 className="display text-[42px] md:text-[54px]">A framework for quiet indulgence.</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="border border-hairline amenity-grid">
            {amenities.map((a, i) => (
              <div key={i} className={`px-8 md:px-12 py-12 md:py-16 transition-all duration-300 hover:bg-plaster/50 ${i >= 2 ? 'border-t border-hairline' : i === 1 ? 'border-t md:border-t-0 border-hairline' : 'border-t md:border-t-0 border-hairline'}`}>
                <div className="text-brass text-xl mb-4">{a.symbol}</div>
                <h3 className="display text-[26px] mb-3">{a.title}</h3>
                <p className="text-[15.5px] text-[#3b3834] font-light leading-relaxed max-w-[420px]">{a.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 flex justify-center">
          <SectionWhatsAppButton />
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 7: ARRIVAL PIPELINE ─── */
function ArrivalSection() {
  const steps = [
    { num: '01', title: 'Bespoke Selection', desc: 'Choosing your dedicated suite layout. Courtyard ground, light-filled first floor, or the private rooftop pavilion.' },
    { num: '02', title: 'Personalization Curated', desc: 'Tailoring your arrival menu, spa slots, dietary preferences, and local guides before you land in Marrakesh.' },
    { num: '03', title: 'The Medina Welcome', desc: 'Traditional mint tea pouring ceremony upon entering the riad gates. Luggage disappears. Silence arrives.' },
  ];

  return (
    <section id="arrival" className="border-y border-hairline bg-plaster">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-28">
        <Reveal>
          <p className="eyebrow mb-10">The Arrival Pipeline</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
          {steps.map((s, i) => (
            <Reveal key={i} delay={`${i * 0.08}s`}>
              <div className="group">
                <div className="display text-[56px] md:text-[68px] text-brass/90 leading-none mb-6 transition-transform duration-300 group-hover:translate-x-2">{s.num}</div>
                <h4 className="display text-[24px] mb-3">{s.title}</h4>
                <p className="text-[15px] text-[#3b3834] font-light leading-relaxed max-w-[320px]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 8: FAQ ─── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'What is the minimum stay requirement?', a: 'We require a minimum stay of 2 nights throughout the year. During peak season (October to April), we prefer stays of 3 nights or more to allow guests to fully settle into the rhythm of the house.' },
    { q: 'How far is Riad Noir from Marrakesh Airport?', a: 'Riad Noir is approximately 15-20 minutes by private vehicle from Marrakesh-Menara Airport. Upon arrival, you will be met airside and escorted through the Medina to our unmarked door.' },
    { q: 'Is the riad suitable for children?', a: 'Riad Noir is designed as an adult sanctuary. We welcome guests aged 12 and above, ensuring the quiet, contemplative atmosphere our visitors seek.' },
    { q: 'Can the riad be booked exclusively?', a: 'Yes, full buyout is available for private events, celebrations, or complete privacy. The entire house can accommodate up to 14 guests across all seven suites. Please inquire directly for rates and arrangements.' },
    { q: 'What is your cancellation policy?', a: 'We offer flexible cancellation up to 14 days prior to arrival for a full refund of your 30% deposit. Cancellations within 14 days forfeit the deposit. For peak season reservations, we recommend travel insurance.' },
    { q: 'Do you accommodate dietary requirements?', a: 'Absolutely. Our private chef will discuss your preferences and dietary needs prior to arrival. Whether vegetarian, vegan, gluten-free, or specific allergies, all meals are prepared with your requirements in mind.' },
  ];

  return (
    <section id="faq" className="bg-canvas">
      <div className="max-w-[900px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-28">
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Frequently Asked Questions</p>
            <h2 className="display text-[42px] md:text-[54px]">Common Inquiries</h2>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={`${i * 0.05}s`}>
              <div className="border border-hairline">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left transition-colors duration-300 hover:bg-plaster/50"
                >
                  <span className="display text-[18px] md:text-[20px] pr-4">{faq.q}</span>
                  <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 md:px-8 pb-6 text-[15px] text-muted font-light leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <SectionWhatsAppButton />
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 9: INQUIRY + FOOTER ─── */
function InquirySection() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [formNote, setFormNote] = useState('We never share your details.\nEncrypted, direct to our host desk.');

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2600);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get('name') || !fd.get('email')) {
      setFormNote('Please add your name and email.');
      return;
    }
    showToast('Inquiry sent — we will be in touch shortly.');
    (e.target as HTMLFormElement).reset();
    setFormNote('Received. Our host desk will respond within 6 hours.');
  };

  return (
    <section id="inquire" className="bg-plaster">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-28 lg:py-[120px]">
        <div className="grid grid-cols-12 gap-y-16 lg:gap-x-20 items-start">
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="eyebrow mb-5">Inquiry</p>
            <h2 className="display text-[46px] md:text-[58px] leading-[1.08]">Begin Your Marrakesh Narrative.</h2>
            <p className="mt-6 text-[16px] text-[#403d39] font-light max-w-[380px] leading-relaxed">
              Seven suites only. Stays of three nights or more are preferred, allowing time to truly settle into the rhythm of the house.
            </p>
            <div className="mt-10 border-t border-[#ddd8cf] pt-8 text-[14px] text-[#4a4642] font-light space-y-2">
              <p><span className="text-muted">Direct:</span> reservations@riadnoir.ma</p>
              <p><span className="text-muted">Private line:</span> +212 524 42 91 08</p>
              <p className="pt-4">
                <SectionWhatsAppButton />
              </p>
            </div>
            <div className="mt-10 text-[12.5px] text-muted leading-relaxed max-w-[340px]">
              Response within 6 hours, Marrakesh time (GMT+1). For same-week reservations, please call.
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-7" delay="0.08s">
            <form className="bg-canvas border border-hairline px-7 md:px-12 py-10 md:py-14 shadow-[0_18px_60px_rgba(28,24,20,0.045)]" noValidate onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-9">
                <div>
                  <label className="eyebrow text-[10.5px]" htmlFor="f_name">Full Name</label>
                  <input className="input-minimal" id="f_name" name="name" placeholder="Your name" required />
                </div>
                <div>
                  <label className="eyebrow text-[10.5px]" htmlFor="f_email">Email</label>
                  <input className="input-minimal" id="f_email" name="email" type="email" placeholder="name@email.com" required />
                </div>
                <div>
                  <label className="eyebrow text-[10.5px]" htmlFor="f_arrival">Arrival Window</label>
                  <input className="input-minimal" id="f_arrival" name="arrival" type="text" placeholder="e.g. March 12 — 16" />
                </div>
                <div>
                  <label className="eyebrow text-[10.5px]" htmlFor="f_guests">Guests</label>
                  <select id="f_guests" name="guests" className="input-minimal bg-transparent cursor-pointer">
                    <option>1 Guest</option>
                    <option selected>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="eyebrow text-[10.5px]" htmlFor="f_notes">Notes</label>
                  <input className="input-minimal" id="f_notes" name="notes" placeholder="Suite preference, occasion, dietary needs…" />
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                <button type="submit" className="btn-primary">
                  Send Inquiry <span aria-hidden="true">&#8594;</span>
                </button>
                <p className="text-[12.5px] text-muted whitespace-pre-line">{formNote}</p>
              </div>
            </form>
            <p className="mt-5 text-[12px] text-muted px-2">Minimum stay: 2 nights. Peak season: 3 nights. Full buyout available.</p>
          </Reveal>
        </div>
      </div>

      <footer className="border-t border-hairline bg-canvas">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-14 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div>
              <div className="display text-[26px] mb-3">RIAD NOIR</div>
              <p className="text-[13.5px] text-muted font-light leading-relaxed">
                9 Derb Sidi Ahmed, Mouassine<br />
                Marrakesh Medina 40000, Morocco
              </p>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-4 text-[12.5px] text-[#4a4642]">
              <a href="#" className="hover:text-brass transition-colors">Instagram</a>
              <a href="#" className="hover:text-brass transition-colors">Journal</a>
              <a href="#" className="hover:text-brass transition-colors">Press Kit</a>
              <a href="#" className="hover:text-brass transition-colors">Privacy</a>
              <a href="#" className="hover:text-brass transition-colors">Terms</a>
            </div>
            <div className="text-[12px] text-muted">
              &copy; {new Date().getFullYear()} Riad Noir.<br />Quiet Hospitality.
            </div>
          </div>
        </div>
      </footer>

      <Toast message={toastMsg} visible={toastVisible} />
    </section>
  );
}

/* ─── APP ─── */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [globalToast, setGlobalToast] = useState({ visible: false, message: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = useCallback((msg: string) => {
    setGlobalToast({ visible: true, message: msg });
    setTimeout(() => setGlobalToast({ visible: false, message: '' }), 2600);
  }, []);

  return (
    <>
      <Header
        onReserve={() => setReserveOpen(true)}
        onMobileOpen={() => setMobileOpen(true)}
        scrolled={scrolled}
      />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <ReserveDrawer open={reserveOpen} onClose={() => setReserveOpen(false)} showToast={showToast} />

      <main>
        <HeroSection onReserve={() => setReserveOpen(true)} showToast={showToast} />
        <EssenceGrid />
        <SpacesSection />
        <TestimonialsSection />
        <GallerySection />
        <AmenitiesSection />
        <ArrivalSection />
        <FAQSection />
        <InquirySection />
      </main>

      <WhatsAppSticky />
      <Toast message={globalToast.message} visible={globalToast.visible} />
    </>
  );
}
