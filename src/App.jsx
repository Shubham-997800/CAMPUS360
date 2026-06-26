import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NoticeEvents from './pages/NoticeEvents'
import Complaints from './pages/Complaints'
import LostFound from './pages/LostFound'
import StudyHub from './pages/StudyHub'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/notices-events" element={<NoticeEvents />} />
        <Route path="/dashboard/complaints" element={<Complaints />} />
        <Route path="/dashboard/lost-found" element={<LostFound />} />
        <Route path="/dashboard/study-hub" element={<StudyHub />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
