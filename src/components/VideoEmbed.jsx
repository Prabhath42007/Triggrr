/**
 * VideoEmbed.jsx — Lazy-loaded YouTube video embed.
 *
 * ── HOW IT WORKS ─────────────────────────────────────────────
 *
 *  1. Initially renders a clickable thumbnail (no iframe).
 *     → Zero YouTube scripts downloaded on page load.
 *     → Page is fast even with 5 videos on Services page.
 *
 *  2. User clicks → thumbnail swaps to real iframe.
 *     → autoplay=1 so video starts immediately on click.
 *     → youtube-nocookie.com (privacy-enhanced, no tracking cookies).
 *
 *  3. If youtubeId is null → shows "Coming Soon" placeholder
 *     with a WhatsApp link to request a live walkthrough.
 *
 *  4. Thumbnail tries maxresdefault (HD), falls back to
 *     hqdefault if the HD thumb is not available yet.
 *
 * ── USAGE ────────────────────────────────────────────────────
 *   <VideoEmbed youtubeId="kbkyW1aUen8" title="Lead Management Demo" />
 *   <VideoEmbed youtubeId={null}         title="AI Support Triage Demo" />
 *
 * ── HOW TO ADD A VIDEO LATER ─────────────────────────────────
 *   In services.js, set youtubeId to the 11-char ID from the URL:
 *     youtu.be/ABC123XYZ01  →  youtubeId: 'ABC123XYZ01'
 *   No changes needed in this file.
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { SITE } from '@/data/services'

// ── Helper: build nocookie embed URL ────────────────────────
function buildEmbedUrl(id) {
  const params = new URLSearchParams({
    autoplay:        '1',
    rel:             '0',     // no "related videos" after playback
    modestbranding:  '1',     // minimal YouTube branding
    color:           'white',
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`
}

// ── Coming-soon placeholder ──────────────────────────────────
function ComingSoon({ title }) {
  return (
    <div
      className="video-placeholder flex items-center justify-center bg-bg-card rounded-xl"
      role="img"
      aria-label={`${title} — demo video coming soon`}
    >
      <div className="text-center space-y-4 p-8">
        {/* Icon */}
        <div
          className="
            w-16 h-16 rounded-2xl mx-auto flex items-center justify-center
            bg-purple-subtle border border-purple-border
          "
          aria-hidden="true"
        >
          <i className="ti ti-video text-3xl text-purple-light" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <p className="text-white font-semibold text-sm">
            Demo Video Coming Soon
          </p>
          <p className="text-text-muted text-xs max-w-xs leading-relaxed">
            Watch a live walkthrough on our YouTube channel or request a
            personalised demo over WhatsApp.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a
            href={SITE.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center gap-1.5
              text-xs font-medium text-text-muted hover:text-white
              transition-colors
            "
            aria-label="Visit Triggrr YouTube channel"
          >
            <i className="ti ti-brand-youtube text-base text-red-400" aria-hidden="true" />
            Subscribe for updates
          </a>

          <span className="hidden sm:block text-text-faint text-xs self-center">·</span>

          <a
            href={`${SITE.whatsappUrl}&text=${encodeURIComponent(
              `Hi! I'd like a live demo of your services.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center gap-1.5
              text-xs font-medium text-whatsapp hover:opacity-80
              transition-opacity
            "
            aria-label="Request a live demo on WhatsApp"
          >
            <i className="ti ti-brand-whatsapp text-base" aria-hidden="true" />
            Request a live demo
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────
export default function VideoEmbed({ youtubeId, title = 'Service Demo' }) {
  const [isPlaying,    setIsPlaying]    = useState(false)
  const [thumbQuality, setThumbQuality] = useState('maxresdefault')
  const [thumbLoaded,  setThumbLoaded]  = useState(false)

  // ── Coming soon state ────────────────────────────────────
  if (!youtubeId) {
    return (
      <div className="aspect-video-16-9">
        <ComingSoon title={title} />
      </div>
    )
  }

  const thumbUrl = `https://i.ytimg.com/vi/${youtubeId}/${thumbQuality}.jpg`
  const embedUrl = buildEmbedUrl(youtubeId)

  return (
    <div className="aspect-video-16-9" aria-label={`${title} video player`}>

      {/* ── Playing state: real iframe ──────────────────── */}
      {isPlaying ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="rounded-xl"
          loading="lazy"
        />

      ) : (
        /* ── Click-to-play state: thumbnail + overlay ───── */
        <div
          className="video-placeholder cursor-pointer group rounded-xl overflow-hidden"
          onClick={() => setIsPlaying(true)}
          role="button"
          tabIndex={0}
          aria-label={`Play demo video: ${title}`}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsPlaying(true)
            }
          }}
        >
          {/* ── Thumbnail image ────────────────────────── */}
          {/* Show skeleton shimmer until thumbnail loads */}
          {!thumbLoaded && (
            <div className="absolute inset-0 skeleton rounded-xl" aria-hidden="true" />
          )}

          <img
            src={thumbUrl}
            alt={`${title} video thumbnail`}
            className={`
              w-full h-full object-cover transition-transform duration-500
              group-hover:scale-105
              ${thumbLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            loading="lazy"
            onLoad={() => setThumbLoaded(true)}
            onError={() => {
              // HD thumbnail not available → fall back to standard quality
              if (thumbQuality === 'maxresdefault') {
                setThumbQuality('hqdefault')
              }
            }}
          />

          {/* ── Dark overlay ──────────────────────────── */}
          <div
            className="
              absolute inset-0 bg-black/45
              group-hover:bg-black/25
              transition-colors duration-300
            "
            aria-hidden="true"
          />

          {/* ── Play button ───────────────────────────── */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div
              className="
                w-16 h-16 rounded-full flex items-center justify-center
                bg-white/15 backdrop-blur-sm border border-white/25
                group-hover:bg-purple group-hover:border-purple
                group-hover:scale-110
                transition-all duration-300
                shadow-lg
              "
            >
              {/* Offset the icon slightly right so it looks centred visually */}
              <i className="ti ti-player-play text-2xl text-white ml-1" />
            </div>
          </div>

          {/* ── Bottom label ──────────────────────────── */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-2"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
            }}
            aria-hidden="true"
          >
            <i className="ti ti-brand-youtube text-red-400 text-lg" />
            <span className="text-white/85 text-xs font-medium">
              Click to watch demo
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
