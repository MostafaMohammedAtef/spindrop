import { lazy, Suspense, useEffect, useRef, useState } from 'react'
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
import MiniCartDrawer from './components/MiniCartDrawer'
import RouteLoadingFallback from './components/RouteLoadingFallback'
import { usePageTitle } from './hooks/usePageTitle'
const LoginPage = lazy(() => import('./components/LoginPage'))
const CreateAccountPage = lazy(() => import('./components/CreateAccountPage'))
const DiscoverPage = lazy(() => import('./components/DiscoverPage'))
const CartPage = lazy(() => import('./components/CartPage'))
const ArtistPage = lazy(() => import('./components/ArtistPage'))
const RecordDetailPage = lazy(() => import('./components/RecordDetailPage'))
const WishlistPage = lazy(() => import('./components/WishlistPage'))
const AccountPage = lazy(() => import('./components/AccountPage'))
const DemoCheckoutPage = lazy(() => import('./components/DemoCheckoutPage'))
const DemoOrdersPage = lazy(() => import('./components/DemoOrdersPage'))
const DemoProtectedRoute = lazy(() => import('./components/DemoProtectedRoute'))
import { CartProvider } from './lib/CartContext'
import { PricingProvider } from './lib/PricingContext'

function HomePage() {
  usePageTitle('Home')
  return (
    <main id="main-content">
      <h1 className="sr-only">Press your music on vinyl</h1>
      <WhyHero />
      <SplitCards />
      <Services />
      <RetailSupport />
      <Community />
      <ArtistMarquee />
      <ArtistTestimonials />
      <VinylStudio />
    </main>
  )
}

function App() {
  const location = useLocation()
  const [loaderPhase, setLoaderPhase] = useState<'hidden' | 'visible' | 'leaving'>('hidden')
  const loaderShown = useRef(false)

  useEffect(() => {
    let showTimer: number | undefined
    let hideTimer: number | undefined
    let maxTimer: number | undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let loaded = document.readyState === 'complete'

    const finishLoading = () => {
      loaded = true
      if (!loaderShown.current) return
      setLoaderPhase('leaving')
      hideTimer = window.setTimeout(() => setLoaderPhase('hidden'), reducedMotion ? 1 : 180)
    }

    if (loaded) return

    showTimer = window.setTimeout(() => {
      try {
        if (!loaded && !sessionStorage.getItem('spindrop.initial-load-seen')) {
          sessionStorage.setItem('spindrop.initial-load-seen', 'true')
          loaderShown.current = true
          setLoaderPhase('visible')
        }
      } catch {
        if (!loaded) { loaderShown.current = true; setLoaderPhase('visible'); }
      }
    }, reducedMotion ? 250 : 180)
    maxTimer = window.setTimeout(finishLoading, 800)
    window.addEventListener('load', finishLoading, { once: true })

    return () => {
      if (showTimer) window.clearTimeout(showTimer)
      if (hideTimer) window.clearTimeout(hideTimer)
      if (maxTimer) window.clearTimeout(maxTimer)
      window.removeEventListener('load', finishLoading)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const focusHeading = () => {
      const heading = document.querySelector<HTMLElement>('main h1');
      if (!heading) return false;
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      return true;
    };
    if (focusHeading()) return;
    const observer = new MutationObserver(() => {
      if (focusHeading()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 1500);
    return () => { observer.disconnect(); window.clearTimeout(timeout); };
  }, [location.pathname]);

  return (
    <>
      {loaderPhase !== 'hidden' && <VinylLoadingScreen isLeaving={loaderPhase === 'leaving'} />}
      <ToastProvider>
      <CartProvider>
        <PricingProvider>
          <MiniCartDrawer />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:ring-2 focus:ring-black">Skip to content</a>
          <Header />
          <RouteErrorBoundary>
          <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-in" element={<Navigate to="/login" replace />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/records/:slug" element={<RecordDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route element={<DemoProtectedRoute />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/orders" element={<DemoOrdersPage />} />
          </Route>
          <Route path="/checkout" element={<DemoCheckoutPage />} />
          <Route path="/order/:id" element={<DemoOrdersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/artists/:artistSlug" element={<ArtistPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
          </RouteErrorBoundary>
          <Footer />
        </PricingProvider>
      </CartProvider>
      </ToastProvider>
    </>
  )
}

export default App
