import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'

const titles = {
  '/dashboard': 'Your workspace',
  '/interview/setup': 'Interview practice',
  '/history': 'Your practice history',
  '/resume-analyzer': 'Resume analyzer',
  '/profile': 'Your profile',
  '/settings': 'Account settings',
}

export default function Navbar() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const title = location.pathname.includes('/live') ? 'Practice in progress'
    : location.pathname.includes('/result') ? 'Interview recap'
      : titles[location.pathname] || 'Prepwise'
  const initials = (user?.name || 'P').split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        <button className="icon-button" type="button" aria-label="Sign out" title="Sign out" onClick={() => { signOut(); navigate('/') }}>↗</button>
        <div className="user-chip">
          <div className="avatar">{initials}</div>
          <div><strong>{user?.name || 'Learner'}</strong><span>Practice account</span></div>
        </div>
      </div>
    </header>
  )
}
