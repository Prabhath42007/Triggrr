/**
 * ServiceCard.jsx — Preview card used in the Home page services grid.
 *
 * Shows: niche badge, icon, title, short description,
 *        ROI stat, and "View details →" link.
 *
 * Links to /services#{service.slug} to deep-link to that
 * specific service section on the Services page.
 *
 * Receives scroll animation classes from the parent (Home.jsx)
 * which applies the IntersectionObserver. The card itself only
 * carries the CSS classes — no JS animation logic here.
 *
 * Props:
 *   service {Object}  — one object from SERVICES array in services.js
 *   index   {number}  — card's position in the grid (0-based, for stagger delay)
 *   niche   {Object}  — the matching NICHES entry (for the badge label)
 */

import { Link } from 'react-router-dom'

// Stagger delay classes (maps index → Tailwind delay utility from index.css)
// Max delay is delay-5 (0.4s) to avoid feeling too slow.
const DELAY_MAP = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-5']

export default function ServiceCard({ service, index = 0, niche }) {
  const delayClass = DELAY_MAP[index] ?? 'delay-5'

  return (
    <Link
      to={`/services#${service.slug}`}
      className={`
        card group flex flex-col gap-4
        animate-on-scroll ${delayClass}
        focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2
        focus-visible:ring-offset-bg-primary
      `}
      aria-label={`Learn more about ${service.title}`}
    >
      {/* ── Niche badge ──────────────────────────────────── */}
      {niche && (
        <div className="flex items-center gap-1.5 w-fit">
          <span
            className={`niche-badge ${niche.color === 'cyan' ? 'cyan' : ''}`}
            aria-label={`Category: ${niche.shortLabel}`}
          >
            <i className={`ti ${niche.icon} text-xs`} aria-hidden="true" />
            {niche.shortLabel}
          </span>
        </div>
      )}

      {/* ── Icon ─────────────────────────────────────────── */}
      <div
        className="
          w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
          bg-purple-subtle border border-purple-border
          group-hover:bg-purple-glow group-hover:border-purple-border
          transition-colors duration-250
        "
        aria-hidden="true"
      >
        <i
          className={`
            ti ${service.icon} text-xl
            ${service.accentColor === 'cyan' ? 'text-cyan' : 'text-purple-light'}
          `}
        />
      </div>

      {/* ── Title ────────────────────────────────────────── */}
      <h3 className="text-base font-bold text-white leading-snug">
        {service.title}
      </h3>

      {/* ── Description ──────────────────────────────────── */}
      <p className="text-text-muted text-sm leading-relaxed line-clamp-3 flex-1">
        {service.shortDesc}
      </p>

      {/* ── ROI stat ─────────────────────────────────────── */}
      <div
        className="
          flex items-center gap-2 pt-1
          border-t border-border
        "
      >
        <span className="stat-gradient text-lg font-bold leading-none">
          {service.roiStat}
        </span>
        <span className="text-text-muted text-xs leading-tight">
          {service.roiLabel}
        </span>
      </div>

      {/* ── CTA link ─────────────────────────────────────── */}
      <div
        className="
          flex items-center gap-1.5 text-sm font-medium
          text-purple-light
          group-hover:gap-3 transition-all duration-200
        "
        aria-hidden="true"  {/* Whole card is a link; this is decorative */}
      >
        View details
        <i className="ti ti-arrow-right text-base" />
      </div>
    </Link>
  )
}
