/**
 * Footer.jsx — Site-wide footer.
 *
 * Four columns (desktop) → stacked (mobile):
 *   1. Brand — logo, tagline, social icons
 *   2. Services — links to each service section
 *   3. Company — page links
 *   4. Get In Touch — email, WhatsApp, location
 *
 * ── HOW TO ADD A SERVICE LINK ───────────────────────────────
 *   Services are pulled from SERVICES in services.js automatically.
 *   No changes needed here when you add a new service.
 *
 * ── HOW TO ADD A COMPANY LINK ───────────────────────────────
 *   Add an object to COMPANY_LINKS below.
 * ────────────────────────────────────────────────────────────
 */

import { Link } from 'react-router-dom'
import { SITE, SERVICES } from '@/data/services'

// ── Company links (add Batch 2 pages here as you build them) ─
const COMPANY_LINKS = [
  { label: 'Home',         to: '/'            },
  { label: 'Services',     to: '/services'    },
  { label: 'Get Started',  to: '/get-started' },
  // Batch 2 additions:
  // { label: 'About',       to: '/about'       },
  // { label: 'Case Studies',to: '/results'     },
  // { label: 'Blog',        to: '/blog'        },
]

// ── Social icon map ──────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href:  SITE.social.instagram,
    icon:  'ti-brand-instagram',
  },
  {
    label: 'X (Twitter)',
    href:  SITE.social.twitter,
    icon:  'ti-brand-x',
  },
  {
    label: 'LinkedIn',
    href:  SITE.social.linkedin,
    icon:  'ti-brand-linkedin',
  },
  {
    label: 'YouTube',
    href:  SITE.social.youtube,
    icon:  'ti-brand-youtube',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t border-border bg-bg-primary"
      aria-label="Site footer"
    >
      {/* ── Purple gradient fade above footer ── */}
      <div className="section-divider" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* ── Main grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1: Brand ──────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            {/* Logo + name */}
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <img
                src="/logo.png"
                alt=""
                className="h-9 w-9 object-contain"
                aria-hidden="true"
              />
              <span className="text-xl font-bold text-white tracking-tight">
                Triggrr
                <span className="text-purple" aria-hidden="true">.</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              {SITE.description}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3" aria-label="Social media links">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    w-9 h-9 rounded-lg flex items-center justify-center
                    bg-bg-card border border-border text-text-muted
                    hover:text-white hover:border-purple-border hover:bg-purple-subtle
                    transition-all duration-200
                  "
                >
                  <i className={`ti ${s.icon} text-base`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Services ───────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="eyebrow mb-4">Services</h3>
            <ul className="space-y-3" role="list">
              {SERVICES.map(service => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="
                      text-sm text-text-muted hover:text-white
                      transition-colors duration-200 flex items-center gap-1.5 group
                    "
                  >
                    <i
                      className="ti ti-chevron-right text-xs text-purple opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                      aria-hidden="true"
                    />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Company ────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="eyebrow mb-4">Company</h3>
            <ul className="space-y-3" role="list">
              {COMPANY_LINKS.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="
                      text-sm text-text-muted hover:text-white
                      transition-colors duration-200 flex items-center gap-1.5 group
                    "
                  >
                    <i
                      className="ti ti-chevron-right text-xs text-purple opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact ────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="eyebrow mb-4">Get In Touch</h3>

            <ul className="space-y-3" role="list">
              {/* Email */}
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="
                    flex items-start gap-3 group
                    text-sm text-text-muted hover:text-white transition-colors
                  "
                  aria-label={`Email us at ${SITE.email}`}
                >
                  <i className="ti ti-mail text-purple-light mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-3 group
                    text-sm text-text-muted hover:text-whatsapp transition-colors
                  "
                  aria-label="Chat on WhatsApp"
                >
                  <i className="ti ti-brand-whatsapp text-whatsapp flex-shrink-0" aria-hidden="true" />
                  <span>+91 93811 49845</span>
                </a>
              </li>

              {/* Location */}
              <li>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <i className="ti ti-map-pin text-purple-light flex-shrink-0" aria-hidden="true" />
                  <span>{SITE.location}</span>
                </div>
              </li>
            </ul>

            {/* Response time note */}
            <p className="text-xs text-text-faint leading-relaxed pt-1">
              We typically respond within 1 hour on WhatsApp and within 24 hours via email.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div
          className="
            flex flex-col sm:flex-row items-center justify-between gap-3
            mt-12 pt-6 border-t border-border
          "
        >
          <p className="text-xs text-text-faint">
            © {currentYear} Triggrr. All rights reserved.
          </p>

          <p className="text-xs text-text-faint flex items-center gap-1.5">
            <i className="ti ti-code text-purple-light" aria-hidden="true" />
            Built with Python &amp; ❤️ in India by&nbsp;
            <span className="text-text-muted font-medium">{SITE.founder}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
