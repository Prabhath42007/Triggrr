/**
 * Skeleton.jsx — Reusable shimmer loading placeholders.
 *
 * ── USAGE GUIDE ──────────────────────────────────────────────
 *
 *  1. PAGE LOAD (Suspense fallback in App.jsx):
 *       import { SkeletonPage } from '@/components/Skeleton'
 *       <Suspense fallback={<SkeletonPage />}>
 *
 *  2. HOME SERVICE CARDS (while Home.jsx renders):
 *       import { SkeletonServiceCard } from '@/components/Skeleton'
 *       {isLoading && Array.from({length:6}).map((_,i) =>
 *         <SkeletonServiceCard key={i} />
 *       )}
 *
 *  3. YOUTUBE VIDEO (VideoEmbed.jsx shows this while iframe loads):
 *       import { SkeletonVideo } from '@/components/Skeleton'
 *       {!iframeLoaded && <SkeletonVideo />}
 *
 *  4. FORM SUBMIT (Contact.jsx disables button while fetching):
 *       import { SkeletonBlock } from '@/components/Skeleton'
 *       {submitting && <SkeletonBlock className="h-11 w-full rounded-xl" />}
 *
 *  5. ANY ARBITRARY BLOCK (inline one-off shimmer):
 *       <SkeletonBlock className="h-5 w-40 rounded-lg" />
 *
 * ── ADDING A NEW SKELETON VARIANT ────────────────────────────
 *   Copy any export below, rename it, adjust the inner divs
 *   to match the shape of the content you're loading.
 *   The `.skeleton` class (from index.css) provides the shimmer.
 * ─────────────────────────────────────────────────────────────
 */

// ── 1. Base block — arbitrary shimmer rectangle ──────────────
// Most flexible — use className to set h, w, rounded, etc.
export function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      aria-hidden="true"
    />
  )
}

// ── 2. Text lines — paragraph placeholder ───────────────────
// lines: number of text rows to render
// Last line is 65% width to look like a natural paragraph end
export function SkeletonText({ lines = 1, className = '' }) {
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3.5 rounded"
          style={{
            width: i === lines - 1 && lines > 1 ? '65%' : '100%',
          }}
        />
      ))}
    </div>
  )
}

// ── 3. Home page service card placeholder ───────────────────
// Matches the shape of ServiceCard.jsx
export function SkeletonServiceCard() {
  return (
    <div
      className="card p-6 space-y-4"
      aria-hidden="true"
      aria-label="Loading service"
    >
      {/* Icon */}
      <div className="skeleton h-10 w-10 rounded-xl" />

      {/* Title */}
      <div className="skeleton h-5 w-3/4 rounded-lg" />

      {/* Description (3 lines) */}
      <div className="space-y-2.5">
        <div className="skeleton h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-11/12 rounded" />
        <div className="skeleton h-3.5 w-4/6 rounded" />
      </div>

      {/* "Watch demo" link placeholder */}
      <div className="skeleton h-3.5 w-28 rounded-full" />
    </div>
  )
}

// ── 4. Services page full service block ──────────────────────
// Matches the expanded service section on Services.jsx
// (title + video + pricing table)
export function SkeletonServiceDetail() {
  return (
    <div className="space-y-8 py-10" aria-hidden="true" aria-label="Loading service details">
      {/* Eyebrow + title */}
      <div className="space-y-3">
        <div className="skeleton h-3.5 w-24 rounded-full" />
        <div className="skeleton h-9 w-3/4 rounded-xl" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
      </div>

      {/* Problem + What it does (two-col) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="skeleton h-32 rounded-xl" />
        <div className="skeleton h-32 rounded-xl" />
      </div>

      {/* Video placeholder */}
      <div className="skeleton h-64 w-full rounded-xl" />

      {/* Pricing cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton h-48 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

// ── 5. YouTube video embed placeholder ──────────────────────
// VideoEmbed.jsx renders this until the iframe loads.
// The 16:9 wrapper (aspect-video-16-9 from index.css) is applied
// by the parent — this fills the inner space.
export function SkeletonVideo({ className = '' }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
      aria-hidden="true"
      aria-label="Video loading"
    >
      {/* Shimmer background (fills the 16:9 container) */}
      <div className="absolute inset-0 skeleton rounded-xl" />

      {/* Centred play-button hint */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border:     '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <i className="ti ti-player-play text-2xl text-text-muted" aria-hidden="true" />
        </div>
        <span className="text-xs text-text-muted font-medium tracking-wide">
          Loading video…
        </span>
      </div>
    </div>
  )
}

// ── 6. Full page skeleton ────────────────────────────────────
// Used as the <Suspense> fallback in App.jsx.
// Shown for ~200–500ms while a page's JS chunk downloads.
// Mirrors the rough shape of every page (navbar + hero area).
export function SkeletonPage() {
  return (
    <div
      className="min-h-screen bg-bg-primary flex flex-col"
      role="status"
      aria-label="Loading page"
    >
      {/* ── Fake navbar ── */}
      <div
        className="glass h-16 flex items-center px-6 gap-4 sticky top-0 z-40"
        aria-hidden="true"
      >
        {/* Logo */}
        <div className="skeleton h-7 w-24 rounded-lg" />

        <div className="flex-1" />

        {/* Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="skeleton h-4 w-12 rounded" />
          <div className="skeleton h-4 w-16 rounded" />
          <div className="skeleton h-4 w-14 rounded" />
        </div>

        {/* CTA button */}
        <div className="skeleton h-9 w-28 rounded-xl ml-2" />
      </div>

      {/* ── Fake hero section ── */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-4 py-24 gap-5"
        aria-hidden="true"
      >
        {/* Badge pill */}
        <div className="skeleton h-6 w-44 rounded-full" />

        {/* Headline (2 lines) */}
        <div className="space-y-3 w-full max-w-xl text-center">
          <div className="skeleton h-11 rounded-2xl mx-auto" style={{ width: '80%' }} />
          <div className="skeleton h-11 rounded-2xl mx-auto" style={{ width: '65%' }} />
        </div>

        {/* Sub-text (2 lines) */}
        <div className="space-y-2.5 w-full max-w-md text-center">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 rounded mx-auto" style={{ width: '75%' }} />
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 mt-3">
          <div className="skeleton h-11 w-40 rounded-xl" />
          <div className="skeleton h-11 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// Default export for convenience (used in Suspense fallback)
export default SkeletonPage
