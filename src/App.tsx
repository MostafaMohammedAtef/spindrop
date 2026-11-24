import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
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
import LoginPage from './components/LoginPage'
function App() {
  const [showLoader, setShowLoader] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(document.readyState === 'complete')

  useEffect(() => {
    let showTimer: number | undefined
    let hideTimer: number | undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const finishLoading = () => {
      setPageLoaded(true)
      if (showLoader) hideTimer = window.setTimeout(() => setShowLoader(false), 80)
    }

    if (document.readyState === 'complete') return

    showTimer = window.setTimeout(() => {
      if (!pageLoaded) setShowLoader(true)
    }, reducedMotion ? 250 : 180)
    window.addEventListener('load', finishLoading, { once: true })
    window.addEventListener('error', finishLoading, { once: true })

    return () => {
      if (showTimer) window.clearTimeout(showTimer)
      if (hideTimer) window.clearTimeout(hideTimer)
      window.removeEventListener('load', finishLoading)
      window.removeEventListener('error', finishLoading)
    }
  }, [pageLoaded, showLoader])

  return (
    <>
      {showLoader && !pageLoaded && <VinylLoadingScreen />}
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={
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
      </Routes>
    </>
  )
}

export default App
