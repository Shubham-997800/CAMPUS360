// ============================================
// App - Root component with routing definition
// ============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Statistics from './components/Statistics'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Notices from './pages/Notices/Notices'
import Events from './pages/Events/Events'
import Complaints from './pages/Complaints/Complaints'
import LostFound from './pages/LostFound/LostFound'
import StudyHub from './pages/StudyHub/StudyHub'
import Profile from './pages/Profile/Profile'

// ── HomePage - Landing page composing all marketing sections ──
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Statistics />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}

// ── App - Sets up BrowserRouter with all application routes ──
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/notices" element={<Notices />} />
        <Route path="/dashboard/events" element={<Events />} />
        <Route path="/dashboard/complaints" element={<Complaints />} />
        <Route path="/dashboard/lost-found" element={<LostFound />} />
        <Route path="/dashboard/study-hub" element={<StudyHub />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
