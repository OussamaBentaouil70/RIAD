import { useState, useEffect, useRef } from 'react';
import InteractiveImageBentoGallery from './components/ui/bento-gallery';
import ReservationForm from './components/ReservationForm';
import ExperienceModal, { type Experience } from './components/ExperienceModal';
import { waLink } from './lib/whatsapp';

import picnicProposalImg from '../assets/type of propsals/Picnic Proposal_Barcelona.png';
import barcelonetaBeachImg from '../assets/type of propsals/Beach Proposal_Barcelona.png';
import rooftopProposalImg from '../assets/type of propsals/Rooftop proposal_Barcelona.png';
import sagradaFamiliaImg from '../assets/type of propsals/Sagrada Família proposal_Barcelona.png';
import ciutadellaParkImg from '../assets/type of propsals/Ciutadella Park proposal_Barcelona.png';
import customProposalImg from '../assets/type of propsals/Custom proposal_Barcelona.png';
import aboutMeImg from '../assets/Who We Are/Erica image.png';

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

/* ─── WhatsApp Icon ─── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.862 11.862 0 005.682 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── WhatsApp Sticky Button ─── */
function WhatsAppSticky() {
  return (
    <a
      href={waLink("Hi Erica! I'd love to start planning a proposal in Barcelona.")}
      target="_blank"
      rel="noopener"
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_36px_rgba(61,43,52,0.28)] hover:scale-110 transition-transform duration-300"
      aria-label="Message Erica on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}

/* ─── Section WhatsApp Button ─── */
function SectionWhatsAppButton({ light = false, message }: { light?: boolean; message?: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-3 text-[13px] transition-colors duration-300 ${light ? 'text-white/70 hover:text-white' : 'text-taupe hover:text-rose'}`}
    >
      <WhatsAppIcon className="w-5 h-5" />
      <span className="tracking-wide">Message on WhatsApp</span>
    </a>
  );
}

/* ─── HEADER ─── */
const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Our Commitment', href: '#commitment' },
  { label: 'Beyond Proposals', href: '#beyond' },
  { label: 'Featured Work', href: '#featured-work' },
  { label: 'FAQ', href: '#faq' },
];

function Header({ scrolled, onMobileOpen }: { scrolled: boolean; onMobileOpen: () => void }) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-cream/90 backdrop-blur-md shadow-[0_4px_24px_rgba(200,100,140,0.1)]' : 'bg-transparent'}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-9 md:px-12 lg:px-[72px]">
        <div className="h-[72px] md:h-[80px] flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-4">
            <span className={`display text-[18px] md:text-[21px] leading-tight transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-white'}`}>Proposal Packages</span>
            <span className={`eyebrow text-[10px] hidden sm:inline transition-colors duration-300 ${scrolled ? 'text-taupe' : 'text-white/70'}`}>Barcelona</span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-[13.5px]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors duration-300 ${scrolled ? 'text-charcoal hover:text-rose' : 'text-white/90 hover:text-blush'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <a
              href={waLink("Hi Erica! I'd love to start planning a proposal in Barcelona.")}
              target="_blank"
              rel="noopener"
              className={`hidden md:inline-flex items-center rounded-full px-6 py-2.5 text-[13px] font-medium transition-all duration-300 ${scrolled ? 'bg-rose text-white hover:opacity-85' : 'bg-white/15 text-white border border-white/40 hover:bg-white/25'}`}
            >
              Let&rsquo;s Talk
            </a>
            <button onClick={onMobileOpen} className="lg:hidden w-9 h-9 flex flex-col items-end justify-center gap-[6px] cursor-pointer group" aria-label="Open menu">
              <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? 'bg-charcoal' : 'bg-white'} group-hover:w-5`} />
              <span className={`block w-4 h-px transition-all duration-300 ${scrolled ? 'bg-charcoal' : 'bg-white'} group-hover:w-6`} />
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
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-[400px] bg-cream shadow-2xl transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="px-8 py-6 flex items-center justify-between border-b border-blush/30">
            <span className="display text-[20px] text-charcoal">Proposal Packages</span>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-taupe hover:text-rose transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 px-8 py-12 space-y-8">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="block text-[28px] display text-charcoal hover:text-rose transition-all duration-300 hover:translate-x-2"
                style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="px-8 py-8 border-t border-blush/30">
            <a
              href={waLink("Hi Erica! I'd love to start planning a proposal in Barcelona.")}
              target="_blank"
              rel="noopener"
              className="btn-primary w-full justify-center"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── BLOCK 1: HERO ─── */
function HeroSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={sagradaFamiliaImg}
          alt="Romantic proposal with the Sagrada Família as the backdrop, styled by Erica"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-charcoal/10" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-9 md:px-12 lg:px-[72px] py-24 md:py-32 w-full">
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-16 items-center">
          <div className="col-span-12 lg:col-span-7">
            <div className={`transition-all duration-1000 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="eyebrow mb-7 text-white/70">Luxury Proposal Planning — Barcelona</p>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="display text-[42px] sm:text-[54px] lg:text-[60px] xl:text-[68px] leading-[1.08] text-white max-w-[680px]">
                Every Love Story Deserves an Unforgettable Setting
              </h1>
            </div>
            <div className={`transition-all duration-1000 delay-400 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="mt-8 md:mt-10 max-w-[500px] text-[17px] leading-relaxed text-white/85">
                From breathtaking proposals and romantic celebrations to intimate experiences — we create deeply personal, elegantly curated moments in the heart of Barcelona.
              </p>
            </div>
            <div className={`mt-10 md:mt-12 flex flex-wrap items-center gap-8 transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href={waLink("Hi Erica! I'd love to start planning a proposal in Barcelona.")} target="_blank" rel="noopener" className="btn-primary">
                Start Planning <span aria-hidden="true">&#8594;</span>
              </a>
              <a href="#featured-work" className="text-[14px] text-white/80 hover:text-blush transition-colors underline-offset-4 hover:underline">
                See Featured Work
              </a>
            </div>
          </div>

          <div className={`col-span-12 lg:col-span-5 transition-all duration-1000 delay-700 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-charcoal/60 backdrop-blur-md border border-white/10 rounded-2xl p-7 md:p-9 shadow-[0_20px_60px_rgba(40,15,25,0.35)]">
              <p className="eyebrow mb-2 text-blush">Start Planning</p>
              <h3 className="display text-[26px] text-white mb-6">Request a Reservation</h3>
              <ReservationForm variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 2: FEATURED WORK ─── */
function FeaturedWorkSection() {
  const imageItems = [
    { id: 1, title: 'Sagrada Família Proposal', desc: 'Gaudí’s masterpiece as your unforgettable backdrop.', url: sagradaFamiliaImg, span: 'col-span-2 row-span-2' },
    { id: 2, title: 'Rooftop Proposal', desc: 'Sunset skyline views above the city.', url: rooftopProposalImg, span: 'col-span-1 row-span-1' },
    { id: 3, title: 'Barceloneta Beach Proposal', desc: 'Golden hour by the Mediterranean Sea.', url: barcelonetaBeachImg, span: 'col-span-1 row-span-1' },
    { id: 4, title: 'Ciutadella Park Proposal', desc: 'Lush greenery and elegant architecture.', url: ciutadellaParkImg, span: 'col-span-1 row-span-2' },
    { id: 5, title: 'Picnic Proposal', desc: 'Soft styling in Barcelona’s most romantic corners.', url: picnicProposalImg, span: 'col-span-1 row-span-1' },
    { id: 6, title: 'Custom Proposal', desc: 'Designed entirely around your story.', url: customProposalImg, span: 'col-span-2 row-span-1' },
  ];

  return (
    <section id="featured-work" className="bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-9 md:px-12 lg:px-[72px] py-24 md:py-28">
        <Reveal>
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Featured Work</p>
            <h2 className="display text-[42px] md:text-[54px] text-charcoal">Romantic proposals in Barcelona &amp; Catalonia</h2>
            <p className="mt-4 max-w-[500px] mx-auto text-[15px] text-taupe">Click any moment to see it up close.</p>
          </div>
        </Reveal>

        <InteractiveImageBentoGallery imageItems={imageItems} />
      </div>
    </section>
  );
}

/* ─── BLOCK 3: OUR COMMITMENT ─── */
function CommitmentSection() {
  const items = [
    { symbol: '✦', title: 'Tailored Experiences', desc: 'Every proposal and romantic celebration is thoughtfully designed around your story, vision, personality, and atmosphere.' },
    { symbol: '◈', title: 'Exceptional Barcelona Venues', desc: 'From Mediterranean sunsets to elegant rooftops, private terraces, gardens, hotels, and iconic locations, we find the perfect setting.' },
    { symbol: '◎', title: 'Seamless Planning & Coordination', desc: 'From venue selection and styling to flowers, photography, logistics, and execution, every detail is handled with care.' },
    { symbol: '❋', title: 'Emotion, Elegance & Authenticity', desc: "Refined experiences inspired by Barcelona's beauty, Mediterranean romance, timeless elegance, and unforgettable moments." },
  ];

  return (
    <section id="commitment" className="bg-lavender/40">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-9 md:px-12 lg:px-[72px] py-24 md:py-28 lg:py-[124px]">
        <Reveal>
          <div className="max-w-[620px] mb-14 md:mb-20">
            <p className="eyebrow mb-4">Our Commitment</p>
            <h2 className="display text-[42px] md:text-[54px] text-charcoal">The Barcelona Romance Promise</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((a, i) => (
            <Reveal key={i} delay={`${i * 0.08}s`}>
              <div className="card-blush px-8 py-10 h-full">
                <div className="text-rose text-2xl mb-5">{a.symbol}</div>
                <h3 className="display text-[24px] mb-3 text-charcoal">{a.title}</h3>
                <p className="text-[15px] text-taupe leading-relaxed">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 4: ABOUT ERICA ─── */
function AboutSection() {
  return (
    <section id="about" className="bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-9 md:px-12 lg:px-[72px] py-24 md:py-28 lg:py-[132px]">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-16 items-center">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="card-clean">
              <img
                src={aboutMeImg}
                alt="Erica, luxury proposal planner in Barcelona"
                className="w-full h-full object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-7 lg:pl-6" delay="0.1s">
            <p className="eyebrow text-rose mb-3">Who We Are</p>
            <h2 className="display text-[38px] md:text-[46px] mb-6 text-charcoal">Meet Erica</h2>
            <div className="space-y-5 text-[16px] leading-relaxed text-charcoal/80 max-w-[560px]">
              <p>I&rsquo;m Erica, a luxury proposal planner in Barcelona, passionate about creating elegant, romantic, and unforgettable experiences in one of Europe&rsquo;s most captivating cities.</p>
              <p>With over 10 years of experience in luxury events, I specialize in bespoke marriage proposals and intimate celebrations, thoughtfully designed around each couple&rsquo;s story and vision. From breathtaking rooftops overlooking Barcelona to Mediterranean settings, elegant hotels, private venues, and iconic locations, every detail is carefully curated to create a truly unique moment.</p>
              <p>Together with my team, we combine creativity, local expertise, and attention to detail to take care of every aspect — from venue selection and styling to flowers, photography, and coordination — transforming your proposal into an effortless and unforgettable experience.</p>
            </div>
            <div className="mt-8">
              <a href={waLink("Hi Erica! I'd love to talk about planning our proposal.")} target="_blank" rel="noopener" className="link-fine text-[14.5px]">
                Say hello on WhatsApp &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 5: BEYOND PROPOSALS ─── */
const BEYOND_ITEMS: Experience[] = [
  {
    title: 'Picnic Proposal',
    img: picnicProposalImg,
    desc: 'A beautifully styled picnic in one of Barcelona’s most romantic settings.',
    longDesc: 'A beautifully styled picnic in one of Barcelona’s most romantic settings — soft details, flowers, and an intimate atmosphere designed around your love story and the perfect surprise.',
    highlights: [
      'Romantic picnic setup + styling',
      'Flowers, candles + personalized details',
      'Coordination + surprise planning',
    ],
  },
  {
    title: 'Barceloneta Beach Proposal',
    img: barcelonetaBeachImg,
    desc: 'Golden-hour proposal by the Mediterranean Sea, waves as your soundtrack.',
    longDesc: 'A romantic proposal by the Mediterranean Sea — golden-hour light, the sound of the waves, and an elegant beach setup creating the perfect setting for an unforgettable “Yes”.',
    highlights: [
      'Romantic beach setup + styling',
      'Candles, flowers + ambient décor',
      'Coordination + surprise planning',
    ],
  },
  {
    title: 'Rooftop Proposal',
    img: rooftopProposalImg,
    desc: 'Sunset skyline views from an elegant private rooftop escape.',
    longDesc: 'An intimate proposal above the rooftops of Barcelona — spectacular city views, sunset light, and an elegant private setting transformed into your own romantic escape.',
    highlights: [
      'Private rooftop setup + styling',
      'Candles, flowers + ambient lighting',
      'Coordination + surprise planning',
    ],
  },
  {
    title: 'Sagrada Família Proposal',
    img: sagradaFamiliaImg,
    desc: 'An iconic proposal with Gaudí’s masterpiece as your backdrop.',
    longDesc: 'An iconic Barcelona proposal with the Sagrada Família as your backdrop — breathtaking architecture combined with an elegant romantic setup for a truly unforgettable moment.',
    highlights: [
      'Romantic setup + styling',
      'Flowers, candles + personalized details',
      'Location coordination + surprise planning',
    ],
  },
  {
    title: 'Ciutadella Park Proposal',
    img: ciutadellaParkImg,
    desc: 'A charming outdoor setting amid lush greenery and elegant architecture.',
    longDesc: 'A romantic proposal surrounded by the beauty of Ciutadella Park — lush greenery, elegant architecture, and a charming outdoor setting styled especially for your moment.',
    highlights: [
      'Romantic park setup + styling',
      'Flowers, candles + decorative details',
      'Coordination + surprise planning',
    ],
  },
  {
    title: 'Custom Proposal',
    img: customProposalImg,
    desc: 'A completely personalized proposal built entirely around your story.',
    longDesc: 'A completely personalized proposal created around your story, your partner, and your vision — from choosing the perfect Barcelona location to designing every detail of the surprise.',
    highlights: [
      'Bespoke concept + location sourcing',
      'Personalized décor, flowers + experiences',
      'Full coordination + surprise planning',
    ],
  },
];

function BeyondSection({ onReserve }: { onReserve: (title: string) => void }) {
  const [selected, setSelected] = useState<Experience | null>(null);

  return (
    <section id="beyond" className="bg-beige">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-9 md:px-12 lg:px-[72px] py-24 md:py-28">
        <Reveal>
          <div className="text-center max-w-[640px] mx-auto mb-16 md:mb-20">
            <p className="eyebrow mb-4">Beyond Proposals</p>
            <h2 className="display text-[42px] md:text-[54px] text-charcoal mb-5">Experiences Crafted With Intention</h2>
            <p className="text-[16px] text-taupe leading-relaxed">
              Picnics, beaches, rooftops, iconic landmarks, and fully custom settings — each proposal experience thoughtfully designed to create an unforgettable moment in Barcelona.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEYOND_ITEMS.map((it, i) => (
            <Reveal key={i} delay={`${i * 0.08}s`}>
              <button
                onClick={() => setSelected(it)}
                className="card-clean h-full w-full text-left group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={it.img}
                    alt={it.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="display text-[21px] mb-2 text-charcoal">{it.title}</h3>
                  <p className="text-[13.5px] text-taupe leading-relaxed">{it.desc}</p>
                  <span className="mt-3 inline-block text-[12.5px] text-rose font-medium">Learn more &#8594;</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <ExperienceModal
        item={selected}
        onClose={() => setSelected(null)}
        onReserve={(title) => {
          setSelected(null);
          onReserve(title);
        }}
      />
    </section>
  );
}

/* ─── BLOCK 6: FAQ ─── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'How far in advance should we book?', a: "We recommend reaching out at least 4–6 weeks before your planned proposal date, though we understand love doesn't always wait — get in touch and we'll do our best to accommodate shorter timelines." },
    { q: "What's included in a proposal package?", a: 'Every package is fully bespoke, but typically includes venue sourcing, styling and decor, flowers, candles, music, photography or videography, and on-the-day coordination so you can simply focus on the moment.' },
    { q: 'Can you plan a proposal if we’re traveling to Barcelona?', a: 'Absolutely — many of our couples plan their proposal from abroad. We handle every detail locally and coordinate closely with you online, so everything is ready when you arrive.' },
    { q: 'Do you offer photography and videography?', a: 'Yes. We work with a trusted network of photographers and videographers across Barcelona and Catalonia to discreetly capture the moment, so you have it to treasure forever.' },
    { q: 'What happens if the weather doesn’t cooperate?', a: 'We always prepare a beautiful backup plan for outdoor settings, and monitor the forecast closely in the days leading up to your proposal so we can adapt without losing the magic.' },
    { q: 'Do you plan celebrations beyond proposals?', a: 'Yes — beyond marriage proposals, we design romantic dinners, anniversary surprises, and other intimate celebrations throughout Barcelona and the surrounding coast.' },
  ];

  return (
    <section id="faq" className="bg-cream">
      <div className="max-w-[900px] mx-auto px-6 sm:px-9 md:px-12 py-24 md:py-28">
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Frequently Asked Questions</p>
            <h2 className="display text-[42px] md:text-[54px] text-charcoal">Common Inquiries</h2>
          </div>
        </Reveal>

        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={`${i * 0.05}s`}>
              <div className="border border-blush/30 rounded-2xl bg-white overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left transition-colors duration-300 hover:bg-lightblush/60"
                >
                  <span className="display text-[18px] md:text-[20px] text-charcoal pr-4">{faq.q}</span>
                  <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 md:px-8 pb-6 text-[15px] text-taupe leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-[13.5px] text-taupe">Didn&rsquo;t find your answer?</p>
          <SectionWhatsAppButton message="Hi Erica! I have a question about planning a proposal." />
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCK 7: FINAL CTA ─── */
function CTASection({ prefillMessage }: { prefillMessage?: string }) {
  return (
    <section id="contact" className="bg-lightblush">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-9 md:px-12 lg:px-[72px] py-24 md:py-32">
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-16 items-center">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="eyebrow mb-5">Ready to Begin?</p>
            <h2 className="display text-[40px] md:text-[52px] leading-[1.1] text-charcoal">
              Let&rsquo;s Create Something Truly Unforgettable Together
            </h2>
            <p className="mt-6 max-w-[480px] text-[16px] text-taupe leading-relaxed">
              Whether it&rsquo;s an intimate rooftop proposal, a Mediterranean sunset moment, or an unforgettable romantic surprise, share your vision with us — we&rsquo;ll bring every detail to life in Barcelona.
            </p>
            <div className="mt-10">
              <a
                href={waLink("Hi Erica! We'd love to start planning our proposal.")}
                target="_blank"
                rel="noopener"
                className="btn-primary"
              >
                Message Erica on WhatsApp <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-6" delay="0.1s">
            <div className="card-clean bg-white p-7 md:p-9">
              <p className="eyebrow text-rose mb-2">Start Planning</p>
              <h3 className="display text-[26px] text-charcoal mb-6">Request a Reservation</h3>
              <ReservationForm variant="light" prefillMessage={prefillMessage} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer id="footer" className="bg-charcoal">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-9 md:px-12 lg:px-[72px] py-14 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <div>
            <div className="display text-[24px] text-white mb-2">Proposal Packages</div>
            <p className="eyebrow text-white/50 mb-4">Barcelona</p>
            <p className="text-[13.5px] text-white/60 leading-relaxed max-w-[380px]">
              Luxury proposal &amp; romantic event planning in Barcelona, Spain. We create bespoke marriage proposals, intimate celebrations, and unforgettable experiences with elegance and intention.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-[12.5px] text-white/60">
            <a href={waLink()} target="_blank" rel="noopener" className="hover:text-blush transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-blush transition-colors">Instagram</a>
            <a href="#" className="hover:text-blush transition-colors">Privacy</a>
            <a href="#" className="hover:text-blush transition-colors">Terms</a>
          </div>
          <div className="text-[12px] text-white/40">
            &copy; {new Date().getFullYear()} Proposal Packages Barcelona.<br />Romance, Elevated.
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [interestedIn, setInterestedIn] = useState<string | undefined>();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReserve = (title: string) => {
    setInterestedIn(`I'm interested in: ${title}. `);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header scrolled={scrolled} onMobileOpen={() => setMobileOpen(true)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main>
        <HeroSection />
        <AboutSection />
        <CommitmentSection />
        <BeyondSection onReserve={handleReserve} />
        <FeaturedWorkSection />
        <FAQSection />
        <CTASection prefillMessage={interestedIn} />
      </main>

      <Footer />
      <WhatsAppSticky />
    </>
  );
}
