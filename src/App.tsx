import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import WhyHero from './components/WhyHero'
import SplitCards from './components/SplitCards'
import Services from './components/Services'
import RetailSupport from './components/RetailSupport'
import Community from './components/Community'
import ArtistMarquee from './components/ArtistMarquee'
import ArtistTestimonials from './components/ArtistTestimonials'
import VinylStudio from './components/VinylStudio'
import Footer from './components/Footer'
import VinylLoadingScreen from './components/VinylLoadingScreen'
import NotFoundPage from './components/NotFoundPage'
import RouteErrorBoundary from './components/RouteErrorBoundary'
import ToastProvider from './components/ToastProvider'
const LoginPage = lazy(() => import('./components/LoginPage'))
const CreateAccountPage = lazy(() => import('./components/CreateAccountPage'))
const DiscoverPage = lazy(() => import('./components/DiscoverPage'))
const CartPage = lazy(() => import('./components/CartPage'))
const ArtistPage = lazy(() => import('./components/ArtistPage'))
import { CartProvider } from './lib/CartContext'
import { PricingProvider } from './lib/PricingContext'
function App() {
  const location = useLocation()
  const [showLoader, setShowLoader] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(document.readyState === 'complete')

  useEffect(() => {
    let showTimer: number | undefined
    let hideTimer: number | undefined
    let maxTimer: number | undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const finishLoading = () => {
      setPageLoaded(true)
      if (showLoader) hideTimer = window.setTimeout(() => setShowLoader(false), 80)
    }

    if (document.readyState === 'complete') return

    showTimer = window.setTimeout(() => {
      try {
        if (!pageLoaded && !sessionStorage.getItem('spindrop.initial-load-seen')) {
          sessionStorage.setItem('spindrop.initial-load-seen', 'true')
          setShowLoader(true)
        }
      } catch {
        if (!pageLoaded) setShowLoader(true)
      }
    }, reducedMotion ? 250 : 180)
    maxTimer = window.setTimeout(finishLoading, 1000)
    window.addEventListener('load', finishLoading, { once: true })
    window.addEventListener('error', finishLoading, { once: true })

    return () => {
      if (showTimer) window.clearTimeout(showTimer)
      if (hideTimer) window.clearTimeout(hideTimer)
      if (maxTimer) window.clearTimeout(maxTimer)
      window.removeEventListener('load', finishLoading)
      window.removeEventListener('error', finishLoading)
    }
  }, [pageLoaded, showLoader])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>('main h1');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    });
  }, [location.pathname]);

  return (
    <>
      {showLoader && !pageLoaded && <VinylLoadingScreen />}
      <ToastProvider>
      <CartProvider>
        <PricingProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:ring-2 focus:ring-black">Skip to content</a>
          <Header />
          <RouteErrorBoundary>
          <Suspense fallback={<VinylLoadingScreen />}>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-in" element={<Navigate to="/login" replace />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/artists/:artistSlug" element={<ArtistPage />} />
          <Route path="/" element={
            <>
              <WhyHero />
              <SplitCards />
              <Services />
              <RetailSupport />
              <Community />
              <ArtistMarquee />
              <ArtistTestimonials />
              <VinylStudio />
              <Footer />
            </>
          } />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
          </RouteErrorBoundary>
        </PricingProvider>
      </CartProvider>
      </ToastProvider>
    </>
  )
}

export default App
