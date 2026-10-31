import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) {
      setError('Enter your email address to continue.')
      return
    }
    signIn(email.trim())
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <a className="brand" href="/"><span className="brand-mark">✳</span><span className="brand-name">prepwise</span></a>
        <div className="auth-copy"><h1>Make room for your best answer.</h1><p>A little practice can make a big difference. Pick up where you left off and keep moving forward.</p></div>
        <div className="auth-quote">Your next opportunity is worth preparing for.</div>
      </aside>
      <main className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Welcome back</h2><p>Sign in to your practice space.</p>
          {error && <div className="alert" role="alert">{error}</div>}
          <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
          <button className="btn" type="submit">Continue to dashboard <span aria-hidden="true">→</span></button>
          <p className="auth-switch">New to Prepwise? <Link to="/register">Create an account</Link></p>
          <p className="field-hint" style={{ textAlign: 'center', marginTop: 20 }}>Demo account only · authentication is stored locally in this browser.</p>
        </form>
      </main>
    </div>
  )
}
