/**
 * Navbar.jsx — Sticky top navigation bar.
 *
 * Behaviours:
 *  • Transparent on top → glass blur when scrolled > 20px
 *  • Active link highlighted via React Router NavLink
 *  • Mobile: hamburger menu, slides down, closes on route change
 *  • Desktop: logo left, nav links centre, CTA button right
 *
 * ── HOW TO ADD A NAV LINK ────────────────────────────────────
 *   Add an object to NAV_LINKS below:
 *     { label: 'About', to: '/about' }
 *   The link appears automatically on desktop and mobile.
 *   Also add the route in App.jsx and create the page file.
 * ────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

// ── Nav links ─────────────────────────────────────────────────
// Add / remove / reorder links here. 'to' must match App.jsx routes.
const NAV_LINKS = [
  { label: 'Home',     to: '/'         },
  { label: 'Services', to: '/services' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen,   setIsOpen]   = useState(false)
  const { pathname } = useLocation()

  // ── Glass effect on scroll ───────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close mobile menu on route change ───────────────────
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // ── Shared active / inactive link styles ────────────────
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-white'
        : 'text-text-muted hover:text-white'
    }`

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled || isOpen ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            aria-label="Triggrr — go to homepage"
          >
            <img
              src="/logo.png"
              alt=""
              className="h-8 w-8 object-contain"
              aria-hidden="true"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Triggrr
              <span className="text-purple" aria-hidden="true">.</span>
            </span>
          </Link>

          {/* ── Desktop nav links ─────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}      // prevent "/" matching all routes
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/get-started" className="btn-primary text-sm px-5 py-2.5">
              Get Started
              <i className="ti ti-arrow-right text-base" aria-hidden="true" />
            </Link>
          </div>

          {/* ── Mobile hamburger ──────────────────────────── */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(prev => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <i
              className={`ti text-xl transition-transform duration-200 ${
                isOpen ? 'ti-x rotate-90' : 'ti-menu-2'
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* ── Mobile menu (slide down) ──────────────────────── */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-80' : 'max-h-0'
        }`}
        aria-hidden={!isOpen}
      >
        <nav
          className="px-4 pt-2 pb-5 space-y-1 border-t border-border"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-subtle text-white border border-purple-border'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* CTA in mobile menu */}
          <Link
            to="/get-started"
            className="btn-primary w-full justify-center mt-3 py-3"
          >
            Get Started
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
