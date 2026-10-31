import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', icon: '⌂', label: 'Dashboard' },
  { to: '/interview/setup', icon: '✳', label: 'New interview' },
  { to: '/history', icon: '◷', label: 'Interview history' },
  { to: '/resume-analyzer', icon: '▤', label: 'Resume analyzer' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="/dashboard">
        <span className="brand-mark">✳</span><span className="brand-name">prepwise</span>
      </a>
      <div className="nav-label">Workspace</div>
      <nav className="side-nav" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
            <span className="side-icon" aria-hidden="true">{link.icon}</span><span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="nav-label">Account</div>
      <nav className="side-nav" aria-label="Account navigation">
        <NavLink to="/profile" className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
          <span className="side-icon" aria-hidden="true">◉</span><span>My profile</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
          <span className="side-icon" aria-hidden="true">⚙</span><span>Settings</span>
        </NavLink>
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <strong>A little practice goes a long way</strong>
          <p>Show up, try a question, and build confidence one session at a time.</p>
        </div>
      </div>
    </aside>
  )
}
