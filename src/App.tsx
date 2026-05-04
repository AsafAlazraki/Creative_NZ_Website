import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageTransition } from '@/components/motif/KoruMotifs'
import { SkeletonHero } from '@/components/ui/Skeleton'

// Pages — lazy loaded for performance
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))

// Funding
const FundingHub = lazy(() => import('./pages/funding/FundingHub'))
const FundingTier = lazy(() => import('./pages/funding/FundingTier'))
const Opportunities = lazy(() => import('./pages/funding/Opportunities'))
const OpportunityDetail = lazy(() => import('./pages/funding/OpportunityDetail'))
const ApplyFlow = lazy(() => import('./pages/funding/ApplyFlow'))
const FundingCalendar = lazy(() => import('./pages/funding/FundingCalendar'))
const FundingResults = lazy(() => import('./pages/funding/FundingResults'))
const FundingAdvice = lazy(() => import('./pages/funding/FundingAdvice'))
const AwardsPage = lazy(() => import('./pages/funding/AwardsPage'))
const AdviserPage = lazy(() => import('./pages/funding/AdviserPage'))

// Other sections
const AdvocacyPage = lazy(() => import('./pages/AdvocacyPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const AboutPage = lazy(() => import('./pages/about/AboutPage'))
const CouncilPage = lazy(() => import('./pages/about/CouncilPage'))
const ContactPage = lazy(() => import('./pages/about/ContactPage'))
const NewsIndex = lazy(() => import('./pages/news/NewsIndex'))
const NewsArticle = lazy(() => import('./pages/news/NewsArticle'))
const ToiMaoriPage = lazy(() => import('./pages/ToiMaoriPage'))
const ToiPasifikaPage = lazy(() => import('./pages/ToiPasifikaPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="40" height="40" viewBox="0 0 40 40" style={{ animation: 'spin 1.4s linear infinite', opacity: 0.3 }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <path d="M 20 36 C 20 36 8 33 8 20 C 8 11 13 7 20 7 C 27 7 32 12 32 18 C 32 24 27 27 23 27 C 19 27 16 24 16 21 C 16 18 19 17 20 17 C 21 17 22 18 22 19"
          fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center', padding: '120px 0' }}>
      <span className="eyebrow">404</span>
      <h1 style={{ marginTop: 16 }}>Page not found.</h1>
      <p className="lede" style={{ maxWidth: 480, margin: '24px auto' }}>The page you're looking for has moved or doesn't exist.</p>
      <a href="/" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>Back to home →</a>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <PageTransition routeKey={location.pathname}>
        <Suspense fallback={<SkeletonHero />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />

            {/* Funding */}
            <Route path="/funding" element={<FundingHub />} />
            <Route path="/funding/early-career" element={<FundingTier />} />
            <Route path="/funding/artists" element={<FundingTier />} />
            <Route path="/funding/organisations" element={<FundingTier />} />
            <Route path="/funding/opportunities" element={<Opportunities />} />
            <Route path="/funding/opportunity/:oppId" element={<OpportunityDetail />} />
            <Route path="/funding/apply" element={<ApplyFlow />} />
            <Route path="/funding/calendar" element={<FundingCalendar />} />
            <Route path="/funding/results" element={<FundingResults />} />
            <Route path="/funding/advice" element={<FundingAdvice />} />
            <Route path="/funding/awards" element={<AwardsPage />} />
            <Route path="/funding/adviser" element={<AdviserPage />} />

            {/* Other sections */}
            <Route path="/advocacy" element={<AdvocacyPage />} />
            <Route path="/advocacy/*" element={<AdvocacyPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/*" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/council" element={<CouncilPage />} />
            <Route path="/about/contact" element={<ContactPage />} />
            <Route path="/about/*" element={<AboutPage />} />
            <Route path="/news" element={<NewsIndex />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/toi-maori" element={<ToiMaoriPage />} />
            <Route path="/toi-pasifika" element={<ToiPasifikaPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  )
}

function AppContent() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* Skip-nav link: hidden until focused, jumps over header to main content */}
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
