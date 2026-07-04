/**
 * Home.jsx — Main landing page.
 *
 * Section order (follows buyer's journey):
 *   1. Hero          — hook + CTAs
 *   2. Stats         — instant social proof
 *   3. Who we help   — client type recognition
 *   4. Why Triggrr   — trust & differentiation
 *   5. How it works  — process clarity
 *   6. Services grid — offer overview
 *   7. FAQ           — objection handling
 *   8. CTA strip     — conversion
 *
 * Scroll animations: elements carry .animate-on-scroll (starts invisible).
 * IntersectionObserver adds .in-view on entry → CSS transition plays.
 * Animation fires once per element, then observer detaches (performance).
 *
 * Dynamic class names like delay-1..delay-5 must appear as
 * literal strings (below in DELAYS) so Tailwind's scanner keeps them.
 */
 
import { useEffect, useState } from 'react'
import { Link }                 from 'react-router-dom'
import {
  SERVICES, NICHES, STATS,
  FAQ, HOW_IT_WORKS, TARGET_CLIENTS, SITE,
} from '@/data/services'
import ServiceCard from '@/components/ServiceCard'
 
// Stagger delay classes — literal strings so Tailwind scanner keeps them.
const DELAYS = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5']
const d = i => DELAYS[Math.min(i, 4)]
 
// "Why choose us" value props — not in services.js (UI concern, not content)
const WHY_US = [
  {
    icon:    'ti-code',
    title:   'Python-first, not no-code',
    desc:    'Every system is custom-built in Python. No drag-and-drop tools that break the moment your business changes. Real code, real reliability, real ownership.',
    accent:  'cyan',
  },
  {
    icon:    'ti-rocket',
    title:   'Delivered in days, not months',
    desc:    'Small focused team. No project managers or committees. You speak directly to the builder. Most projects are live in 2–7 business days.',
    accent:  'purple',
  },
  {
    icon:    'ti-lock-open',
    title:   'You own everything',
    desc:    'Your accounts. Your code. Your data. We hand over complete ownership and walk you through every part of the system before we close the project.',
    accent:  'cyan',
  },
]
 
export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
 
  // ── Page title ───────────────────────────────────────────
  useEffect(() => {
    document.title = 'Triggrr | Business Automations'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', SITE.description)
  }, [])
 
  // ── Scroll-triggered fade-up animations ─────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target) // fire once, then stop watching
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    )
 
    const els = document.querySelectorAll('.animate-on-scroll')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
 
  const toggleFaq = i => setOpenFaq(prev => (prev === i ? null : i))
 
  return (
    <div className="overflow-x-hidden">
 
      {/* ═══════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center"
        aria-label="Hero"
      >
        {/* Dot-grid background */}
        <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" aria-hidden="true" />
 
        {/* Purple radial glow from top-center */}
        <div className="hero-gradient absolute inset-0 pointer-events-none" aria-hidden="true" />
 
        {/* Decorative soft blobs */}
        <div
          className="absolute top-1/4 -left-40 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.22), transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/3 -right-40 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,214,245,0.14), transparent)' }}
          aria-hidden="true"
        />
 
        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
 
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          text-xs font-semibold mb-8 animate-fade-in
                          bg-purple-subtle border border-purple-border text-cyan">
            <i className="ti ti-bolt text-sm" aria-hidden="true" />
            Python · AI · Automation
          </div>
 
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white
                         leading-[1.1] tracking-tight mb-6">
            Your business runs.
            <br />
            We make it run{' '}
            <span className="text-gradient">itself.</span>
          </h1>
 
          {/* Sub-headline */}
          <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We build Python &amp; AI automations that handle your most time-consuming
            tasks — lead follow-ups, price monitoring, product listings, support
            tickets — so you can focus on what actually grows your business.
          </p>
 
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/services"
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center"
            >
              See what we automate
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-8 py-4 w-full sm:w-auto justify-center"
            >
              <i className="ti ti-brand-whatsapp" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
 
          {/* Micro-trust line */}
          <p className="text-text-faint text-sm mt-6">
            Free consultation &nbsp;·&nbsp; No commitment &nbsp;·&nbsp; Response within 1 hour
          </p>
        </div>
 
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40" aria-hidden="true">
          <i className="ti ti-chevron-down text-text-muted text-2xl" />
        </div>
      </section>
 
      {/* ═══════════════════════════════════════════════════
          2. STATS BAR
      ═══════════════════════════════════════════════════ */}
      <section
        className="border-y border-border"
        style={{ background: 'rgba(124,58,237,0.04)' }}
        aria-label="Key numbers"
      >
        {/*
          gap-px + bg-border trick: shows border-color through 1px gaps,
          creating clean dividers without CSS border-right juggling.
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-bg-primary flex flex-col items-center justify-center py-10 px-4 text-center animate-on-scroll"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span className="stat-gradient text-3xl font-extrabold mb-1.5 leading-none">
                {stat.value}
              </span>
              <span className="text-text-muted text-xs leading-snug max-w-[140px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
 
      {/* ═══════════════════════════════════════════════════
          3. WHO WE HELP
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28" aria-labelledby="who-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
          <div className="text-center mb-12 animate-on-scroll">
            <p className="eyebrow mb-3">Who we help</p>
            <h2 id="who-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Built for small businesses<br className="hidden sm:block" />
              done with manual work
            </h2>
            <p className="text-text-muted max-w-lg mx-auto">
              If your team does the same task more than 3 times a week,
              there is a system that can do it for you.
            </p>
          </div>
 
          {/* Client-type pills */}
          <div
            className="flex flex-wrap justify-center gap-3 animate-on-scroll delay-2"
            role="list"
            aria-label="Business types we serve"
          >
            {TARGET_CLIENTS.map((client, i) => (
              <span
                key={i}
                role="listitem"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                           bg-bg-card border border-border text-text-primary
                           hover:border-purple-border hover:bg-purple-subtle
                           transition-all duration-200 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" aria-hidden="true" />
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>
 
      <div className="section-divider" aria-hidden="true" />
 
      {/* ═══════════════════════════════════════════════════
          4. WHY TRIGGRR
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-20 sm:py-28 dot-bg-faint"
        aria-labelledby="why-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
          <div className="text-center mb-14 animate-on-scroll">
            <p className="eyebrow mb-3">Why Triggrr</p>
            <h2 id="why-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Not a no-code agency.<br className="hidden sm:block" />
              Not a freelancer who disappears.
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Every system we build is custom, tested, documented, and handed
              over with complete ownership.
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <div key={i} className={`card animate-on-scroll ${d(i)} space-y-4`}>
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center
                    ${item.accent === 'cyan'
                      ? 'bg-cyan-subtle border border-cyan-glow'
                      : 'bg-purple-subtle border border-purple-border'
                    }`}
                  aria-hidden="true"
                >
                  <i
                    className={`ti ${item.icon} text-2xl
                      ${item.accent === 'cyan' ? 'text-cyan' : 'text-purple-light'}`}
                  />
                </div>
 
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <div className="section-divider" aria-hidden="true" />
 
      {/* ═══════════════════════════════════════════════════
          5. HOW IT WORKS
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28" aria-labelledby="how-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 
          <div className="text-center mb-16 animate-on-scroll">
            <p className="eyebrow mb-3">How it works</p>
            <h2 id="how-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              From "I have a problem" to "it runs itself" —<br className="hidden lg:block" />
              usually in under a week
            </h2>
          </div>
 
          <div className="relative">
            {/* Connecting line between steps (desktop only) */}
            <div
              className="hidden md:block absolute top-8 left-[18%] right-[18%] h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 25%, rgba(124,58,237,0.5) 75%, transparent)',
              }}
              aria-hidden="true"
            />
 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center gap-5 animate-on-scroll ${d(i)}`}
                >
                  {/* Step circle — sits on the connecting line */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-full flex items-center
                                justify-center font-extrabold text-lg text-white flex-shrink-0
                                border-2 border-purple"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                      boxShadow:  '0 0 24px rgba(124,58,237,0.40)',
                    }}
                    aria-label={`Step ${step.step}`}
                  >
                    {step.step}
                  </div>
 
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      <div className="section-divider" aria-hidden="true" />
 
      {/* ═══════════════════════════════════════════════════
          6. SERVICES PREVIEW GRID
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-20 sm:py-28"
        style={{ background: 'rgba(124,58,237,0.03)' }}
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div className="animate-on-scroll">
              <p className="eyebrow mb-3">Our services</p>
              <h2 id="services-heading" className="text-3xl sm:text-4xl font-extrabold text-white">
                Pick your automation
              </h2>
              <p className="text-text-muted mt-3 max-w-lg">
                Five proven solutions for Indian small businesses — or describe your
                problem and we will design one from scratch.
              </p>
            </div>
            <Link
              to="/services"
              className="btn-outline text-sm flex-shrink-0 animate-on-scroll w-fit"
            >
              View all services
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
 
          {/* Service cards grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label="Available services"
          >
            {SERVICES.map((service, i) => (
              <div key={service.id} role="listitem">
                <ServiceCard
                  service={service}
                  index={i}
                  niche={NICHES.find(n => n.id === service.nicheId)}
                />
              </div>
            ))}
          </div>
 
          {/* Bottom CTA */}
          <div className="text-center mt-12 animate-on-scroll">
            <p className="text-text-muted text-sm mb-4">
              Don&apos;t see your use case?
            </p>
            <Link
              to="/get-started"
              className="text-purple-light font-semibold text-sm hover:text-white
                         transition-colors inline-flex items-center gap-1.5"
            >
              Describe your problem — we&apos;ll design an automation for it
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
 
      <div className="section-divider" aria-hidden="true" />
 
      {/* ═══════════════════════════════════════════════════
          7. FAQ ACCORDION
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 
          <div className="text-center mb-14 animate-on-scroll">
            <p className="eyebrow mb-3">FAQ</p>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Questions we get before every project
            </h2>
            <p className="text-text-muted">Straight answers, no fluff.</p>
          </div>
 
          <div className="space-y-3" role="list">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={`card !p-0 overflow-hidden animate-on-scroll ${d(i)}`}
                role="listitem"
              >
                {/* Question toggle button */}
                <button
                  className="w-full flex items-center justify-between gap-4
                             px-5 sm:px-6 py-5 text-left
                             hover:bg-white/[0.025] transition-colors duration-200
                             focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-purple focus-visible:ring-inset"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-${i}`}
                  id={`faq-btn-${i}`}
                >
                  <span className="text-sm sm:text-base font-semibold text-white leading-snug">
                    {item.q}
                  </span>
                  <i
                    className={`ti flex-shrink-0 text-lg text-purple-light
                                transition-transform duration-300
                                ${openFaq === i ? 'ti-minus' : 'ti-plus'}`}
                    aria-hidden="true"
                  />
                </button>
 
                {/* Answer panel — CSS max-height for smooth animation */}
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                              ${openFaq === i ? 'max-h-[400px]' : 'max-h-0'}`}
                >
                  <p className="px-5 sm:px-6 pb-5 pt-4 text-text-muted text-sm
                                leading-relaxed border-t border-border">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
 
          {/* More questions CTA */}
          <p className="text-center text-text-muted text-sm mt-10 animate-on-scroll">
            Have a question not listed here?{' '}
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-whatsapp hover:opacity-80 font-medium
                         transition-opacity inline-flex items-center gap-1"
            >
              <i className="ti ti-brand-whatsapp" aria-hidden="true" />
              Ask us on WhatsApp
            </a>
          </p>
        </div>
      </section>
 
      {/* ═══════════════════════════════════════════════════
          8. FINAL CTA STRIP
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden" aria-label="Call to action">
        {/* Backgrounds */}
        <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 90% at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 border-y pointer-events-none"
          style={{ borderColor: 'rgba(124,58,237,0.25)' }}
          aria-hidden="true"
        />
 
        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center animate-on-scroll">
          <p className="eyebrow mb-4">Ready to automate?</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            Stop spending time on tasks<br />
            a system should be doing.
          </h2>
          <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Tell us one task that is eating your time. We will design the
            automation, give you a firm quote, and deliver it within the week.
          </p>
 
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/get-started"
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center"
            >
              Get your free automation plan
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-base px-8 py-4 w-full sm:w-auto justify-center"
            >
              <i className="ti ti-brand-whatsapp text-whatsapp" aria-hidden="true" />
              Chat first, commit later
            </a>
          </div>
 
          <p className="text-text-faint text-xs mt-6 tracking-wide">
            Free consultation &nbsp;·&nbsp; Delivered in 2–7 days &nbsp;·&nbsp; You own the code
          </p>
        </div>
      </section>
 
    </div>
  )
}