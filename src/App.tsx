import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { getUser } from './utils/storage'
import BottomNav from './components/BottomNav'
import Welcome from './pages/Welcome'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Reflection from './pages/Reflection'
import Paths from './pages/Paths'
import Journal from './pages/Journal'
import Prayer from './pages/Prayer'
import Community from './pages/Community'

const NAV_PAGES = ['/home', '/paths', '/journal', '/prayer', '/community']

function AppShell() {
  const user = getUser()
  const { pathname } = useLocation()
  const showNav = NAV_PAGES.some(p => pathname.startsWith(p))

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-lg mx-auto min-h-screen relative">
        <Routes>
          <Route path="/" element={user?.onboardingComplete ? <Navigate to="/home" /> : <Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reflection" element={<Reflection />} />
          <Route path="/paths" element={<Paths />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
