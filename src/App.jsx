/**
 * App.jsx — Root component: routing, layout, lazy loading, scroll management.
 *
 * ── ROUTE MAP ────────────────────────────────────────────────
 *   /              → Home.jsx       (hero, stats, who, how, cards, FAQ)
 *   /services      → Services.jsx   (niche-grouped, search, YT demos, pricing)
 *   /get-started   → Contact.jsx    (10-field form → Google Apps Script → Sheets)
 *   *              → NotFound.jsx   (404)
 *
 * ── HOW TO ADD A NEW ROUTE ───────────────────────────────────
 *   1. Create src/pages/NewPage.jsx
 *   2. Add one lazy import below:
 *        const NewPage = lazy(() => import('@/pages/NewPage'))
 *   3. Add one <Route> inside the <Route element={<Layout />}> block:
 *        <Route path="new-path" element={<NewPage />} />
 *   4. Add a link in Navbar.jsx (NAV_LINKS array)
 *   That's all — no other files need changing.
 *
 * ── HOW LAZY LOADING WORKS ───────────────────────────────────
 *   Each page is a separate JS chunk. It downloads only when
 *   the user navigates to that route. <Suspense> shows the
 *   skeleton screen while the chunk loads. After first visit,
 *   the chunk is cached by the browser.
 * ─────────────────────────────────────────────────────────────
 */

import { lazy, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom'

import Navbar          from '@/components/Navbar'
import Footer          from '@/components/Footer'
import WhatsAppButton  from '@/components/WhatsAppButton'
import { SkeletonPage } from '@/components/Skeleton'

// ── Lazy-loaded pages ────────────────────────────────────────
// Each becomes its own JS chunk (never loads until first visit)
const Home     = lazy(() => import('@/pages/Home'))
const Services = lazy(() => import('@/pages/Services'))
const Contact  = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// ── Scroll to top on every route change ─────────────────────
// Uses 'instant' (not 'smooth') — standard UX for page navigation
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

// ── GA4 SPA page-view tracker ────────────────────────────────
// React Router does not trigger native page-view events.
// This fires a GA4 page_view on every route change manually.
// Replace 'G-XXXXXXXXXX' in index.html once you have your ID.
function GA4Tracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pathname })
    }
  }, [pathname])

  return null
}

// ── Shared page layout ───────────────────────────────────────
// Wraps every page with Navbar + Footer + floating WhatsApp button.
// <Outlet /> is where the current page's content renders.
// Using React Router's layout route pattern (v6) means
// Navbar and Footer do NOT unmount/remount on navigation — smooth.
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      <Navbar />

      {/* flex-1 pushes Footer to the bottom on short pages */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Floating WhatsApp button — always visible, bottom-right */}
      <WhatsAppButton />
    </div>
  )
}

// ── Root App ─────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GA4Tracker />

      {/* Suspense shows SkeletonPage while a lazy chunk loads */}
      <Suspense fallback={<SkeletonPage />}>
        <Routes>
          {/*
            All routes share Layout (Navbar + Footer).
            The nested <Route> elements render into <Outlet />.
          */}
          <Route element={<Layout />}>
            <Route index              element={<Home />}     />
            <Route path="services"    element={<Services />} />
            <Route path="get-started" element={<Contact />}  />

            {/* 404 — must be last, catches everything unmatched */}
            <Route path="*"           element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
