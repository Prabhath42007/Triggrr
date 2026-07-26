import { useEffect, useState }  from 'react'
import { Link }                  from 'react-router-dom'
import {
  SERVICES, NICHES, SITE,
  searchServices, getServicesByNiche, buildContactRedirectUrl,
} from '@/data/services'
import VideoEmbed from '@/components/VideoEmbed'

// Pricing col classes — literal strings so Tailwind scanner keeps them
const PRICING_COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}

// ── PricingCard — used inside the collapsed pricing toggle ───
function PricingCard({ tier }) {
  return (
    <div
      className={`card relative flex flex-col gap-4 pt-8
        ${tier.popular ? 'border-purple shadow-purple-glow' : ''}`}
    >
      {tier.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-purple text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-btn">
            Most Popular
          </span>
        </div>
      )}
      <p className="eyebrow">{tier.name}</p>
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-white">{tier.price}</span>
          <span className="text-text-muted text-sm">{tier.period}</span>
        </div>
        {tier.priceNote && (
          <p className="text-text-faint text-xs mt-1">{tier.priceNote}</p>
        )}
      </div>
      <ul className="space-y-2.5 flex-1" role="list">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <i className="ti ti-check text-cyan text-sm mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span className="text-text-muted leading-snug">{f}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/get-started"
        className={`${tier.popular ? 'btn-primary' : 'btn-outline'} w-full justify-center mt-2`}
      >
        Get started
      </Link>
    </div>
  )
}

// ── RetainerCard — shown inside collapsed pricing section ────
function RetainerCard({ retainer }) {
  return (
    <div
      className="mt-4 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-5 border border-dashed"
      style={{ borderColor: 'rgba(124,58,237,0.35)', background: 'rgba(124,58,237,0.06)' }}
    >
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="tech-badge">Add-on</span>
          <span className="text-sm font-semibold text-white">Monthly Retainer</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold stat-gradient">{retainer.price}</span>
          <span className="text-text-muted text-sm">{retainer.period}</span>
        </div>
        {retainer.priceNote && (
          <p className="text-text-faint text-xs mt-0.5">{retainer.priceNote}</p>
        )}
      </div>
      <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4" role="list">
        {retainer.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
            <i className="ti ti-circle-check text-purple-light text-xs flex-shrink-0" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── TrialCard — primary CTA replacing the pricing grid ───────
function TrialCard({ service }) {
  const { trial, pricing } = service
  if (!trial) return null

  // Lowest price from pricing tiers for the subtle hint
  const lowestPrice = pricing?.[0]?.price ?? null

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 mb-6"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(6,214,245,0.05) 100%)',
        border:     '1px solid rgba(124,58,237,0.40)',
      }}
    >
      {/* Free trial badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5
                      bg-purple-subtle border border-purple-border">
        <i className="ti ti-sparkles text-purple-light text-xs" aria-hidden="true" />
        <span className="text-xs font-semibold text-purple-light tracking-wide uppercase">
          Free trial
        </span>
      </div>

      {/* Headline */}
      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
        {trial.headline}
      </h3>

      {/* Sub-text */}
      <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xl">
        {trial.duration === 'One-time'
          ? "No payment. No card. We deliver real output on your real data — you decide if you want more."
          : `No payment. No card. We run it for ${trial.duration} on your actual data — you see real results before deciding anything.`
        }
      </p>

      {/* What's included — 2×2 grid */}
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7"
        role="list"
        aria-label="What's included in the free trial"
      >
        {trial.what.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <i
              className={`ti ti-check flex-shrink-0 mt-0.5 text-sm
                ${i === trial.what.length - 1 ? 'text-purple-light' : 'text-cyan'}`}
              aria-hidden="true"
            />
            <span className={`text-sm leading-snug
              ${i === trial.what.length - 1 ? 'text-purple-light font-medium' : 'text-text-muted'}`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={`/get-started?service=${encodeURIComponent(service.title)}&trial=true`}
        className="btn-primary text-base px-8 py-4 inline-flex"
      >
        <i className="ti ti-bolt" aria-hidden="true" />
        Start free trial
        <i className="ti ti-arrow-right" aria-hidden="true" />
      </Link>

      {/* Subtle pricing hint — not the focus */}
      {lowestPrice && (
        <p className="text-text-faint text-xs mt-4 flex items-center gap-1.5">
          <i className="ti ti-lock text-xs" aria-hidden="true" />
          Paid plans start at {lowestPrice} — see pricing below if you want to skip the trial
        </p>
      )}
    </div>
  )
}

// ── CollapsiblePricing — toggle below trial card ─────────────
function CollapsiblePricing({ service }) {
  const [open, setOpen] = useState(false)
  const pricingColClass = PRICING_COLS[service.pricing.length] || PRICING_COLS[3]

  return (
    <div className="mb-10">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2.5 text-sm text-text-muted
                   hover:text-white transition-colors duration-200 group"
        aria-expanded={open}
      >
        <i
          className={`ti text-base text-purple-light transition-transform duration-300
            ${open ? 'ti-chevron-up' : 'ti-chevron-down'}`}
          aria-hidden="true"
        />
        <span className="group-hover:text-white transition-colors">
          {open ? 'Hide' : 'Compare'} pricing plans
        </span>
        {!open && service.pricing[0]?.price && (
          <span className="text-text-faint">
            · starts at {service.pricing[0].price} {service.pricing[0].period}
          </span>
        )}
      </button>

      {/* Collapsible pricing section */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out
          ${open ? 'max-h-[1200px] mt-6' : 'max-h-0'}`}
      >
        <div className={`grid ${pricingColClass} gap-5`}>
          {service.pricing.map((tier, i) => (
            <PricingCard key={i} tier={tier} />
          ))}
        </div>
        {service.retainer && <RetainerCard retainer={service.retainer} />}
      </div>
    </div>
  )
}

// ── NoResults ─────────────────────────────────────────────────
function NoResults({ query }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6
                   bg-purple-subtle border border-purple-border"
        aria-hidden="true"
      >
        <i className="ti ti-search-off text-4xl text-purple-light" />
      </div>
      <h3 className="text-2xl font-extrabold text-white mb-3">
        No services found for &ldquo;{query}&rdquo;
      </h3>
      <p className="text-text-muted max-w-md mb-2 leading-relaxed">
        We don&apos;t offer this exact service yet — but we can likely build it.
        Describe your problem and we&apos;ll design a custom automation for you.
      </p>
      <p className="text-text-faint text-sm mb-8">
        Custom Python & AI builds are available for any repetitive business workflow.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to={buildContactRedirectUrl(query)} className="btn-primary">
          Request &ldquo;{query}&rdquo; as a service
          <i className="ti ti-arrow-right" aria-hidden="true" />
        </Link>
      </div>
      <button
        onClick={() => window.history.back()}
        className="mt-6 text-sm text-text-muted hover:text-white transition-colors
                   inline-flex items-center gap-1.5"
      >
        <i className="ti ti-arrow-left text-sm" aria-hidden="true" />
        Back to all services
      </button>
    </div>
  )
}

// ── ServiceSection ────────────────────────────────────────────
// Full expanded block for one service.
// id={service.slug} enables /services#slug deep-linking from Home.
function ServiceSection({ service, niche, showDivider = false }) {
  return (
    <>
      {showDivider && (
        <div className="section-divider my-4" aria-hidden="true" />
      )}

      <div id={service.slug} className="py-16 sm:py-20 scroll-mt-20">

        {/* ── Header ──────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {niche && (
              <span className={`niche-badge ${niche.color === 'cyan' ? 'cyan' : ''}`}>
                <i className={`ti ${niche.icon} text-xs`} aria-hidden="true" />
                {niche.shortLabel}
              </span>
            )}
            <span className="text-text-faint text-xs">
              Service {service.id} of {SERVICES.length}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            {service.title}
          </h2>
          {/* Emotional tagline */}
          <p
            className="text-lg sm:text-xl italic leading-relaxed max-w-3xl font-medium"
            style={{ color: '#C4B5FD' }}
          >
            {service.tagline}
          </p>
        </div>

        {/* ── Problem hook ─────────────────────────── */}
        <div
          className="card mb-10"
          style={{ borderLeftWidth: '3px', borderLeftColor: '#7C3AED' }}
        >
          <p className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
            {service.problem.hook}
          </p>
          <p className="text-text-muted leading-relaxed">{service.problem.detail}</p>
        </div>

        {/* ── Input → Process → Output ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Input',   icon: 'ti-database-import',       value: service.what.input,   color: 'cyan'   },
            { label: 'Process', icon: 'ti-settings-automation',   value: service.what.process, color: 'purple' },
            { label: 'Output',  icon: 'ti-database-export',       value: service.what.output,  color: 'cyan'   },
          ].map((step, i) => (
            <div key={i} className="card space-y-3">
              <div className="flex items-center gap-2">
                <i
                  className={`ti ${step.icon} text-lg
                    ${step.color === 'cyan' ? 'text-cyan' : 'text-purple-light'}`}
                  aria-hidden="true"
                />
                <span className="eyebrow">{step.label}</span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{step.value}</p>
            </div>
          ))}
        </div>

        {/* ── Demo video + ROI stat + Tech stack ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
          {/* Video (3/5) */}
          <div className="lg:col-span-3">
            <p className="eyebrow mb-3">Live Demo</p>
            <VideoEmbed
              youtubeId={service.youtubeId}
              title={`${service.title} Demo`}
            />
          </div>

          {/* ROI + Tech (2/5) */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-8">
            <div>
              <p className="eyebrow mb-3">Proven ROI</p>
              <div
                className="text-5xl sm:text-6xl font-extrabold leading-none mb-2 stat-gradient"
                aria-label={`${service.roiStat} — ${service.roiLabel}`}
              >
                {service.roiStat}
              </div>
              <p className="text-white font-semibold text-sm mb-2">{service.roiLabel}</p>
              <p className="text-text-muted text-sm leading-relaxed">{service.roiNote}</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Built with</p>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                {service.tech.map(t => (
                  <span key={t} className="tech-badge" role="listitem">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Trial card (PRIMARY CTA) ──────────────── */}
        <TrialCard service={service} />

        {/* ── Collapsible pricing ───────────────────── */}
        <CollapsiblePricing service={service} />

        {/* ── System architecture ──────────────────── */}
        <div
          className="rounded-xl px-5 py-4 border border-border"
          style={{ background: 'rgba(18,18,42,0.6)' }}
        >
          <p className="eyebrow mb-2">System Architecture</p>
          <p className="font-mono text-xs text-cyan leading-relaxed break-words">
            {service.architecture}
          </p>
        </div>

      </div>
    </>
  )
}

// ── Services (default export) ─────────────────────────────────
export default function Services() {
  const [search,      setSearch]      = useState('')
  const [activeNiche, setActiveNiche] = useState('all')

  useEffect(() => {
    document.title = 'Services — Triggrr Python & AI Automation'
  }, [])

  // Scroll animations — re-run when content changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [search, activeNiche])

  // Hash-based scroll (from Home page ServiceCard links → /services#slug)
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const timer = setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 120)
    return () => clearTimeout(timer)
  }, [])

  // Derived state
  const trimmed    = search.trim()
  const isSearching = trimmed.length > 0
  const results    = isSearching ? searchServices(trimmed) : null
  const hasResults = results && results.length > 0
  const noResults  = results && results.length === 0

  const visibleNiches =
    activeNiche === 'all'
      ? NICHES
      : NICHES.filter(n => n.id === activeNiche)

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          PAGE HEADER + SEARCH + NICHE FILTER
      ══════════════════════════════════════════════ */}
      <section
        className="border-b border-border"
        style={{ background: 'rgba(124,58,237,0.03)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

          <div className="max-w-2xl mb-10 animate-on-scroll">
            <p className="eyebrow mb-3">All services</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Try before you pay
            </h1>
            <p className="text-text-muted text-lg leading-relaxed">
              Every service comes with a free trial — real output on your real data,
              no card, no commitment. Search for your problem or browse by category.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative mb-6 animate-on-scroll delay-1" role="search">
            <i
              className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2
                         text-text-muted pointer-events-none z-10"
              aria-hidden="true"
            />
            <input
              type="search"
              className="search-input pr-12"
              placeholder='Try "price drop", "lead follow-up", "support tickets", "product listings"…'
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search services"
              autoComplete="off"
              spellCheck="false"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-text-muted hover:text-white transition-colors p-1"
                aria-label="Clear search"
              >
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Niche filter pills */}
          {!isSearching && (
            <div
              className="flex flex-wrap gap-3 animate-on-scroll delay-2"
              role="tablist"
              aria-label="Filter by business category"
            >
              <button
                role="tab"
                aria-selected={activeNiche === 'all'}
                className={`niche-badge ${activeNiche === 'all' ? 'active' : ''}`}
                onClick={() => setActiveNiche('all')}
              >
                <i className="ti ti-layout-grid text-xs" aria-hidden="true" />
                All ({SERVICES.length})
              </button>
              {NICHES.map(niche => (
                <button
                  key={niche.id}
                  role="tab"
                  aria-selected={activeNiche === niche.id}
                  className={`niche-badge
                    ${niche.color === 'cyan' ? 'cyan' : ''}
                    ${activeNiche === niche.id ? 'active' : ''}`}
                  onClick={() => setActiveNiche(niche.id)}
                >
                  <i className={`ti ${niche.icon} text-xs`} aria-hidden="true" />
                  {niche.shortLabel} ({getServicesByNiche(niche.id).length})
                </button>
              ))}
            </div>
          )}

          {isSearching && (
            <p className="text-text-muted text-sm animate-on-scroll">
              {hasResults
                ? `${results.length} service${results.length > 1 ? 's' : ''} match "${trimmed}"`
                : `No services match "${trimmed}"`}
            </p>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SEARCH RESULTS
      ══════════════════════════════════════════════ */}
      {isSearching && hasResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {results.map((service, i) => (
            <ServiceSection
              key={service.id}
              service={service}
              niche={NICHES.find(n => n.id === service.nicheId)}
              showDivider={i > 0}
            />
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          NO RESULTS
      ══════════════════════════════════════════════ */}
      {isSearching && noResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NoResults query={trimmed} />
        </div>
      )}

      {/* ══════════════════════════════════════════════
          BROWSE MODE — grouped by niche
      ══════════════════════════════════════════════ */}
      {!isSearching && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {visibleNiches.map((niche, ni) => {
            const nicheServices = getServicesByNiche(niche.id)
            if (nicheServices.length === 0) return null

            return (
              <div key={niche.id}>
                {ni > 0 && (
                  <div className="border-t border-border mt-4" aria-hidden="true" />
                )}

                {/* Niche section header */}
                <div className="pt-14 pb-4 animate-on-scroll">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                        ${niche.color === 'cyan'
                          ? 'bg-cyan-subtle border border-cyan-glow'
                          : 'bg-purple-subtle border border-purple-border'}`}
                      aria-hidden="true"
                    >
                      <i
                        className={`ti ${niche.icon} text-2xl
                          ${niche.color === 'cyan' ? 'text-cyan' : 'text-purple-light'}`}
                      />
                    </div>
                    <div>
                      <p className="eyebrow">{niche.shortLabel}</p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {niche.label}
                      </h2>
                      <p className="text-text-muted text-sm mt-0.5">{niche.description}</p>
                    </div>
                  </div>
                </div>

                {nicheServices.map((service, si) => (
                  <ServiceSection
                    key={service.id}
                    service={service}
                    niche={niche}
                    showDivider={si > 0}
                  />
                ))}
              </div>
            )
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════════════════════════ */}
      {!isSearching && (
        <section
          className="border-t border-border py-16 sm:py-20 mt-8"
          style={{ background: 'rgba(124,58,237,0.04)' }}
          aria-label="Custom service request"
        >
          <div className="max-w-2xl mx-auto px-4 text-center animate-on-scroll">
            <i className="ti ti-wand text-4xl text-purple-light mb-4 block" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Don&apos;t see your use case?
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Use the search bar above — describe your problem in plain words.
              If we don&apos;t offer it yet, you&apos;ll see an option to request it directly.
              Custom Python &amp; AI builds are available for any repetitive workflow.
            </p>
            <Link to="/get-started" className="btn-primary text-base px-8 py-4">
              Request a custom automation
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
