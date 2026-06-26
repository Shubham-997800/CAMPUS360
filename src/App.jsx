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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/notices" element={<Notices />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
