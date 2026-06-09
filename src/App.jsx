import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@components/Layout/Navbar'
import { Footer } from '@components/Layout/Footer'
import ScrollToTop from '@components/UI/ScrollToTop'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const showFooter = location.pathname !== '/messages';

  return (
    <div className="flex flex-col min-h-screen bg-[#000000]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 flex flex-col min-h-0 bg-[#000000]">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default App
