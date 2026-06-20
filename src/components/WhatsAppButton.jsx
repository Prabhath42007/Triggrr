/**
 * WhatsAppButton.jsx — Floating WhatsApp contact button.
 *
 * Always visible, bottom-right corner.
 * Desktop: icon + "Chat on WhatsApp" label.
 * Mobile:  icon only (smaller footprint).
 * Pulse ring draws attention without being annoying.
 *
 * The pre-filled message in SITE.whatsappUrl (services.js) means
 * the client lands in WhatsApp with "Hi Triggrr! I want to know
 * more about your automation services." already typed — one tap to send.
 */

import { SITE } from '@/data/services'

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2">

      {/* ── Tooltip (desktop hover only) ── */}
      <div className="
        hidden sm:block
        opacity-0 group-hover:opacity-100
        pointer-events-none
        bg-bg-card text-text-primary text-xs font-medium
        px-3 py-1.5 rounded-lg shadow-card
        border border-border
        whitespace-nowrap
        transition-opacity duration-200
      ">
        Response usually within 1 hour
      </div>

      {/* ── Main button ── */}
      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Triggrr on WhatsApp"
        title="Chat with us on WhatsApp"
        className="group relative flex items-center gap-2.5 cursor-pointer"
      >
        {/*
          Pulse ring — a growing, fading ring that draws the eye.
          animate-ping is a Tailwind utility: scales from 1→2 and
          fades to transparent on a 1s loop.
        */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background:    'rgba(37, 211, 102, 0.30)',
            animationDuration: '1.8s',
          }}
          aria-hidden="true"
        />

        {/* ── Desktop button (icon + text) ── */}
        <span className="
          hidden sm:flex items-center gap-2.5
          bg-whatsapp hover:bg-[#1da851]
          text-white font-semibold text-sm
          pl-4 pr-5 py-3 rounded-full
          shadow-[0_4px_20px_rgba(37,211,102,0.45)]
          transition-all duration-200
          group-hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)]
          group-hover:-translate-y-0.5
          relative z-10
        ">
          <i className="ti ti-brand-whatsapp text-xl leading-none" aria-hidden="true" />
          Chat on WhatsApp
        </span>

        {/* ── Mobile button (icon only) ── */}
        <span className="
          sm:hidden flex items-center justify-center
          bg-whatsapp hover:bg-[#1da851]
          text-white
          w-14 h-14 rounded-full
          shadow-[0_4px_20px_rgba(37,211,102,0.45)]
          transition-all duration-200
          group-hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)]
          group-hover:-translate-y-0.5
          relative z-10
        ">
          <i className="ti ti-brand-whatsapp text-2xl leading-none" aria-hidden="true" />
        </span>
      </a>
    </div>
  )
}
