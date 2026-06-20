/**
 * NotFound.jsx — 404 page.
 *
 * Shown for any route that doesn't match App.jsx's route definitions.
 * Keeps the user on the site with clear navigation options.
 */

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SITE } from '@/data/services'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = '404 — Page Not Found · Triggrr'
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-20">

      {/* Background accents */}
      <div
        className="absolute inset-0 dot-bg opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,58,237,0.14) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-xl mx-auto space-y-8">

        {/* 404 number */}
        <div aria-hidden="true">
          <p
            className="text-[9rem] sm:text-[12rem] font-extrabold leading-none
                       select-none tracking-tighter"
            style={{
              background:              'linear-gradient(135deg, rgba(124,58,237,0.6) 0%, rgba(6,214,245,0.4) 100%)',
              WebkitBackgroundClip:    'text',
              WebkitTextFillColor:     'transparent',
              backgroundClip:          'text',
            }}
          >
            404
          </p>
        </div>

        {/* Heading */}
        <div className="space-y-3 -mt-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            This page doesn&apos;t exist
          </h1>
          <p className="text-text-muted leading-relaxed">
            The URL you visited isn&apos;t connected to anything.{' '}
            <span className="text-text-faint">
              (Even our automation couldn&apos;t find it.)
            </span>
          </p>
        </div>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary justify-center">
            <i className="ti ti-home" aria-hidden="true" />
            Go to homepage
          </Link>
          <Link to="/services" className="btn-outline justify-center">
            <i className="ti ti-layout-grid" aria-hidden="true" />
            Browse services
          </Link>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-text-muted hover:text-white transition-colors
                     inline-flex items-center gap-1.5 mx-auto"
        >
          <i className="ti ti-arrow-left text-sm" aria-hidden="true" />
          Go back to previous page
        </button>

        {/* Divider */}
        <div className="section-divider" aria-hidden="true" />

        {/* Lost? Here's help. */}
        <div className="space-y-4">
          <p className="text-text-muted text-sm">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              { label: 'Lead management',     to: '/services#lead-management'       },
              { label: 'Price monitoring',    to: '/services#price-monitoring'      },
              { label: 'Review mining',       to: '/services#review-mining'         },
              { label: 'Support triage',      to: '/services#ai-support-triage'     },
              { label: 'Product listings',    to: '/services#product-listing-engine'},
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 rounded-lg text-text-muted hover:text-white
                           bg-bg-card border border-border hover:border-purple-border
                           transition-all duration-200 text-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* WhatsApp fallback */}
        <p className="text-text-faint text-xs">
          Still can&apos;t find what you need?{' '}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-whatsapp hover:opacity-80 transition-opacity"
          >
            Chat with us on WhatsApp →
          </a>
        </p>
      </div>
    </div>
  )
}
