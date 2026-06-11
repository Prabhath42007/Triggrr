/**
 * Contact.jsx — Client intake form ("Get Started" page).
 *
 * ── FEATURES ─────────────────────────────────────────────────
 *  • Pre-fill  — reads ?service= from URL (Services no-results redirect)
 *  • Validation — per-field, clears on change, blocks submit until valid
 *  • Honeypot  — invisible field; bots fill it → fake success, no submit
 *  • reCAPTCHA v3 — loaded dynamically; gracefully skipped if key not set
 *  • Submission — POST to Google Apps Script (no-cors) → Google Sheets
 *  • States    — idle → loading → success (replaces form) or error (inline)
 *
 * ── SETUP REQUIRED ───────────────────────────────────────────
 *  1. Deploy GoogleAppsScript.gs as a Web App (see SITE_REFERENCE.txt §9)
 *  2. Set VITE_SCRIPT_URL in your .env file
 *  3. Set VITE_RECAPTCHA_KEY (optional but recommended)
 *
 * ── ADDING / REMOVING FORM FIELDS ────────────────────────────
 *  • Dropdown options: edit the constant arrays near the top of this file
 *  • New text field: add to INITIAL_FORM + add a <Field> in the JSX
 *  • Remove a field: delete from INITIAL_FORM + remove from JSX + validate()
 *  • After any change, update GoogleAppsScript.gs column headers to match
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect }    from 'react'
import { Link, useSearchParams }  from 'react-router-dom'
import { SERVICES, SITE }         from '@/data/services'

// ── Dropdown option lists ─────────────────────────────────────
// Edit these arrays to add / remove dropdown choices.

const INDUSTRIES = [
  'Retail / E-commerce',
  'Amazon & Flipkart Selling',
  'Restaurant & Food',
  'Healthcare & Clinic',
  'CA / Accounting',
  'Real Estate',
  'Education & Coaching',
  'Manufacturing',
  'Other',
]

// Pulled from services.js so it stays in sync automatically.
const SERVICE_OPTIONS = [
  ...SERVICES.map(s => s.title),
  'Not sure — need advice',
  'Custom automation (describe below)',
]

const BUDGETS = [
  'Under ₹5,000',
  '₹5,000 – ₹15,000',
  '₹15,000 – ₹30,000',
  '₹30,000 – ₹60,000',
  '₹60,000+',
  "Let's discuss",
]

const TIMELINES = [
  'As soon as possible',
  'Within 2 weeks',
  'Within a month',
  'Flexible',
]

const SOURCES = [
  'Google Search',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'WhatsApp / Referral',
  'Word of mouth',
  'Other',
]

// ── Form shape ────────────────────────────────────────────────
const INITIAL_FORM = {
  name:      '',
  email:     '',
  mobile:    '',
  business:  '',
  industry:  '',
  service:   '',
  budget:    '',
  timeline:  '',
  challenge: '',
  source:    '',
}

// ── Validation ────────────────────────────────────────────────
function validate(f) {
  const e = {}
  if (!f.name.trim())
    e.name = 'Full name is required'
  if (!f.email.trim())
    e.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = 'Enter a valid email address'
  if (!f.business.trim())
    e.business = 'Business name is required'
  if (!f.industry)
    e.industry = 'Please select your business type'
  if (!f.service)
    e.service = 'Please select a service'
  if (!f.budget)
    e.budget = 'Please select a budget range'
  if (!f.challenge.trim())
    e.challenge = 'Please describe your challenge'
  else if (f.challenge.trim().length < 20)
    e.challenge = 'Please add a bit more detail (at least 20 characters)'
  return e
}

// ── Error style (applied inline to avoid CSS specificity issues) ──
const ERR_STYLE = {
  borderColor: 'rgba(239,68,68,0.65)',
  boxShadow:   '0 0 0 3px rgba(239,68,68,0.10)',
}

// ── Field wrapper ─────────────────────────────────────────────
// Wraps label + input + error message. Keeps JSX clean.
function Field({ id, label, required, optional, error, children, full }) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={id} className="text-xs font-medium text-text-muted">
        {label}
        {required && (
          <span className="text-cyan ml-0.5" aria-label="required">*</span>
        )}
        {optional && (
          <span className="text-text-faint ml-1">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1.5" role="alert">
          <i className="ti ti-alert-circle text-xs flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

// ── Success state ─────────────────────────────────────────────
function SuccessState() {
  return (
    <div className="card text-center py-14 space-y-6">
      {/* Green check */}
      <div
        className="w-20 h-20 rounded-full mx-auto flex items-center justify-center border-2"
        style={{
          background:   'rgba(34,197,94,0.08)',
          borderColor:  'rgba(34,197,94,0.35)',
        }}
        aria-hidden="true"
      >
        <i className="ti ti-check text-4xl" style={{ color: '#4ade80' }} />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-extrabold text-white">
          Request received!
        </h2>
        <p className="text-text-muted leading-relaxed max-w-sm mx-auto text-sm">
          We&apos;ll review your details and reply within 24 hours with a free
          automation plan — no charge, no commitment.
        </p>
      </div>

      {/* Next steps */}
      <div
        className="text-left rounded-xl p-4 space-y-2 max-w-sm mx-auto"
        style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)' }}
      >
        {[
          'We review your request today',
          'Free call to map out the automation',
          'Fixed-price quote — you decide',
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-text-muted">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                         text-xs font-bold text-white"
              style={{ background: '#7C3AED' }}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            {step}
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        <p className="text-text-faint text-sm">Want a faster response?</p>
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full justify-center"
        >
          <i className="ti ti-brand-whatsapp" aria-hidden="true" />
          Chat with us on WhatsApp
        </a>
        <Link to="/services" className="btn-outline w-full justify-center">
          Browse more services
        </Link>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
export default function Contact() {
  const [searchParams]      = useSearchParams()
  const [form,    setForm]  = useState(INITIAL_FORM)
  const [errors,  setErrors]= useState({})
  const [status,  setStatus]= useState('idle') // 'idle'|'loading'|'success'|'error'
  const [honeypot,setHoneypot] = useState('')

  // ── Page title ────────────────────────────────────────────
  useEffect(() => {
    document.title = 'Get Started — Triggrr Automation'
  }, [])

  // ── Pre-fill from ?service= (Services no-results redirect) ─
  useEffect(() => {
    const svc = searchParams.get('service')
    if (!svc) return

    // Try to find an exact service match for the dropdown
    const match = SERVICE_OPTIONS.find(opt =>
      opt.toLowerCase().includes(svc.toLowerCase())
    )

    setForm(prev => ({
      ...prev,
      service:   match || 'Custom automation (describe below)',
      challenge: `I'm looking for: ${svc}\n\nMore details: `,
    }))
  }, [searchParams])

  // ── Load reCAPTCHA v3 script ──────────────────────────────
  useEffect(() => {
    const key = import.meta.env.VITE_RECAPTCHA_KEY
    if (!key || window.grecaptcha) return

    const script    = document.createElement('script')
    script.src      = `https://www.google.com/recaptcha/api.js?render=${key}`
    script.async    = true
    document.head.appendChild(script)
  }, [])

  // ── Field change handler ──────────────────────────────────
  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear that field's error as the user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // ── reCAPTCHA token helper ────────────────────────────────
  const getRecaptchaToken = () => {
    const key = import.meta.env.VITE_RECAPTCHA_KEY
    if (!key || !window.grecaptcha) return Promise.resolve('')
    return new Promise(resolve => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(key, { action: 'contact_form' })
          .then(resolve)
          .catch(() => resolve(''))
      })
    })
  }

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = async e => {
    e.preventDefault()

    // 1. Validate
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll to first error
      const firstErr = document.querySelector('[role="alert"]')
      firstErr?.closest('div')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // 2. Honeypot check — silently succeed without submitting
    if (honeypot) {
      setStatus('success')
      return
    }

    setStatus('loading')

    try {
      // 3. Get reCAPTCHA token (optional, gracefully skipped)
      const recaptchaToken = await getRecaptchaToken()

      // 4. Build payload
      const payload = {
        ...form,
        recaptchaToken,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }

      // 5. Submit to Google Apps Script
      const url = import.meta.env.VITE_SCRIPT_URL

      if (!url) {
        // Dev mode: no URL set → simulate success after delay
        console.warn('[Contact] VITE_SCRIPT_URL not set — simulating success.')
        await new Promise(r => setTimeout(r, 1200))
      } else {
        // no-cors: response is opaque; we can't read it, so we
        // assume success if the fetch itself doesn't throw.
        await fetch(url, {
          method:  'POST',
          mode:    'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        })
      }

      setStatus('success')

    } catch (err) {
      console.error('[Contact] Submission error:', err)
      setStatus('error')
    }
  }

  // ── Shared input props helper ─────────────────────────────
  const inp = (name, extra = {}) => ({
    id:       `f-${name}`,
    name,
    value:    form[name],
    onChange: handleChange,
    disabled: status === 'loading',
    ...extra,
  })

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════════════ */}
      <section
        className="border-b border-border py-14 sm:py-20"
        style={{ background: 'rgba(124,58,237,0.03)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Get started</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Tell us about<br className="hidden sm:block" /> your business
            </h1>
            <p className="text-text-muted text-lg leading-relaxed">
              Fill in the form below. We&apos;ll review it the same day and
              reply within 24 hours with a free automation plan.
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: 'ti-phone-off', text: 'Free consultation' },
                { icon: 'ti-shield-check', text: 'No commitment' },
                { icon: 'ti-clock', text: 'Reply within 24 hrs' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-1.5 text-sm text-text-muted">
                  <i className={`ti ${item.icon} text-cyan text-sm`} aria-hidden="true" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TWO-COLUMN LAYOUT
      ══════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ── Form — top on mobile, right on desktop ─── */}
          <div className="lg:col-span-3 lg:order-2">

            {/* Pre-fill notice (only when coming from search redirect) */}
            {searchParams.get('service') && status !== 'success' && (
              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-6 text-sm"
                style={{
                  background: 'rgba(124,58,237,0.10)',
                  border:     '1px solid rgba(124,58,237,0.30)',
                }}
                role="note"
              >
                <i className="ti ti-sparkles text-purple-light flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-text-muted">
                  Your search for{' '}
                  <span className="text-white font-medium">
                    &ldquo;{searchParams.get('service')}&rdquo;
                  </span>{' '}
                  has been pre-filled below — add any extra details you&apos;d like.
                </p>
              </div>
            )}

            {/* ── Success state replaces the form ───────── */}
            {status === 'success' ? (
              <SuccessState />
            ) : (

              /* ── The form ────────────────────────────── */
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Automation request form"
              >
                {/* ── Honeypot (hidden from real users) ─── */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}
                >
                  <label htmlFor="f-website">Website</label>
                  <input
                    id="f-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                  />
                </div>

                {/* ── Field grid ───────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Name */}
                  <Field id="f-name" label="Full name" required error={errors.name}>
                    <input
                      {...inp('name')}
                      type="text"
                      placeholder="Rahul Sharma"
                      autoComplete="name"
                      className="form-input"
                      style={errors.name ? ERR_STYLE : {}}
                    />
                  </Field>

                  {/* Email */}
                  <Field id="f-email" label="Email address" required error={errors.email}>
                    <input
                      {...inp('email')}
                      type="email"
                      placeholder="rahul@business.com"
                      autoComplete="email"
                      className="form-input"
                      style={errors.email ? ERR_STYLE : {}}
                    />
                  </Field>

                  {/* Mobile — +91 prefix */}
                  <Field id="f-mobile" label="Mobile number" optional>
                    <div className="flex gap-2">
                      <div
                        className="form-input w-14 flex-shrink-0 flex items-center
                                   justify-center text-text-muted select-none"
                        aria-hidden="true"
                      >
                        +91
                      </div>
                      <input
                        {...inp('mobile')}
                        id="f-mobile"
                        type="tel"
                        placeholder="9876543210"
                        autoComplete="tel"
                        maxLength={10}
                        className="form-input flex-1"
                        aria-label="Mobile number (without country code)"
                      />
                    </div>
                  </Field>

                  {/* Business name */}
                  <Field id="f-business" label="Business name" required error={errors.business}>
                    <input
                      {...inp('business')}
                      type="text"
                      placeholder="My Business Pvt Ltd"
                      autoComplete="organization"
                      className="form-input"
                      style={errors.business ? ERR_STYLE : {}}
                    />
                  </Field>

                  {/* Business type */}
                  <Field id="f-industry" label="Business type" required error={errors.industry}>
                    <select
                      {...inp('industry')}
                      className="form-select"
                      style={errors.industry ? ERR_STYLE : {}}
                    >
                      <option value="">Select your industry</option>
                      {INDUSTRIES.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Service */}
                  <Field id="f-service" label="Service interested in" required error={errors.service}>
                    <select
                      {...inp('service')}
                      className="form-select"
                      style={errors.service ? ERR_STYLE : {}}
                    >
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Budget */}
                  <Field id="f-budget" label="Monthly budget" required error={errors.budget}>
                    <select
                      {...inp('budget')}
                      className="form-select"
                      style={errors.budget ? ERR_STYLE : {}}
                    >
                      <option value="">Select budget range</option>
                      {BUDGETS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Timeline */}
                  <Field id="f-timeline" label="Preferred timeline" optional>
                    <select {...inp('timeline')} className="form-select">
                      <option value="">When do you need this?</option>
                      {TIMELINES.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Challenge — full width */}
                  <Field
                    id="f-challenge"
                    label="Describe your challenge"
                    required
                    error={errors.challenge}
                    full
                  >
                    <textarea
                      {...inp('challenge')}
                      rows={5}
                      placeholder={
                        "e.g. 'I manually send invoices to 50 clients every week'\n" +
                        "or 'My team copies WhatsApp orders into a spreadsheet daily'"
                      }
                      className="form-input resize-y"
                      style={errors.challenge ? ERR_STYLE : {}}
                    />
                  </Field>

                  {/* Source — full width */}
                  <Field
                    id="f-source"
                    label="How did you find us?"
                    optional
                    full
                  >
                    <select {...inp('source')} className="form-select">
                      <option value="">Select one</option>
                      {SOURCES.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* ── Error banner ─────────────────────── */}
                {status === 'error' && (
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl mt-6 text-sm"
                    style={{
                      background: 'rgba(239,68,68,0.08)',
                      border:     '1px solid rgba(239,68,68,0.30)',
                    }}
                    role="alert"
                  >
                    <i className="ti ti-alert-triangle text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-red-400">Submission failed</p>
                      <p className="text-red-400/70 mt-0.5">
                        Something went wrong. Please try again, or{' '}
                        <a
                          href={SITE.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-red-300 transition-colors"
                        >
                          reach us on WhatsApp
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Submit ───────────────────────────── */}
                <div className="mt-8 space-y-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center text-base py-4"
                  >
                    {status === 'loading' ? (
                      <>
                        <i className="ti ti-loader-2 animate-spin" aria-hidden="true" />
                        Sending your request…
                      </>
                    ) : (
                      <>
                        Send my automation request
                        <i className="ti ti-arrow-right" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  {/* reCAPTCHA note */}
                  {import.meta.env.VITE_RECAPTCHA_KEY && (
                    <p className="text-text-faint text-xs text-center">
                      Protected by reCAPTCHA —{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-text-muted transition-colors"
                      >
                        Privacy
                      </a>
                      {' & '}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-text-muted transition-colors"
                      >
                        Terms
                      </a>
                    </p>
                  )}

                  {/* WhatsApp alternative */}
                  <div className="wa-strip">
                    <span>Prefer to chat directly?</span>
                    <a
                      href={SITE.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ti ti-brand-whatsapp" aria-hidden="true" />
                      Message us on WhatsApp
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* ── Trust panel — bottom on mobile, left on desktop ─ */}
          <div className="lg:col-span-2 lg:order-1 space-y-8">

            {/* What happens next */}
            <div>
              <p className="eyebrow mb-5">What happens next</p>
              <ol className="space-y-5" role="list">
                {[
                  {
                    n:    '1',
                    t:    'We review your request',
                    d:    'Same day. We read every submission personally and understand your problem before responding.',
                  },
                  {
                    n:    '2',
                    t:    'Free consultation call',
                    d:    'We map out exactly what to automate, the tools involved, and give you a firm timeline and price.',
                  },
                  {
                    n:    '3',
                    t:    'You decide — no pressure',
                    d:    "If the quote works for you, we build it. If not, we part as friends. No deposits until you're happy.",
                  },
                ].map(step => (
                  <li key={step.n} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center
                                 text-white text-sm font-extrabold flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}
                      aria-label={`Step ${step.n}`}
                    >
                      {step.n}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{step.t}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Divider */}
            <div className="section-divider" aria-hidden="true" />

            {/* Contact info */}
            <div>
              <p className="eyebrow mb-5">Reach us directly</p>
              <ul className="space-y-3" role="list">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-sm text-text-muted
                               hover:text-white transition-colors group"
                    aria-label={`Email ${SITE.email}`}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center
                                    bg-bg-card border border-border group-hover:border-purple-border
                                    transition-colors flex-shrink-0">
                      <i className="ti ti-mail text-purple-light" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">Email</p>
                      <p className="text-text-muted text-xs">{SITE.email}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-text-muted
                               hover:text-whatsapp transition-colors group"
                    aria-label="Chat on WhatsApp"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center
                                    bg-bg-card border border-border group-hover:border-whatsapp/30
                                    transition-colors flex-shrink-0">
                      <i className="ti ti-brand-whatsapp text-whatsapp" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">WhatsApp</p>
                      <p className="text-text-muted text-xs">+91 93811 49845</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-text-muted">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center
                                  bg-bg-card border border-border flex-shrink-0">
                    <i className="ti ti-map-pin text-purple-light" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">Location</p>
                    <p className="text-text-muted text-xs">{SITE.location}</p>
                  </div>
                </li>
              </ul>
              <p className="text-text-faint text-xs mt-4 leading-relaxed">
                We typically respond within 1 hour on WhatsApp and within 24 hours via email.
              </p>
            </div>

            {/* Divider */}
            <div className="section-divider" aria-hidden="true" />

            {/* Trust bullets */}
            <div>
              <p className="eyebrow mb-4">Our guarantee</p>
              <ul className="space-y-2.5" role="list">
                {[
                  'Free consultation — no charge, ever',
                  'Fixed-price quotes — no surprise billing',
                  'No deposit until you approve the plan',
                  'You own the code and all accounts',
                  'Post-delivery support included',
                ].map(point => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-sm text-text-muted"
                  >
                    <i className="ti ti-circle-check text-cyan flex-shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
