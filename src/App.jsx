import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Sidebar from './components/Sidebar.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import InterviewHistory from './pages/InterviewHistory.jsx'
import InterviewResult from './pages/InterviewResult.jsx'
import InterviewSetup from './pages/InterviewSetup.jsx'
import Landing from './pages/Landing.jsx'
import LiveInterview from './pages/LiveInterview.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import ResumeAnalyzer from './pages/ResumeAnalyzer.jsx'
import Settings from './pages/Settings.jsx'
import './App.css'

function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <main className="page-content"><Outlet /></main>
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/interview/setup" element={<InterviewSetup />} />
              <Route path="/interview/:id/live" element={<LiveInterview />} />
              <Route path="/interview/:id/result" element={<InterviewResult />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/history" element={<InterviewHistory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
