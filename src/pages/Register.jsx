import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'

export default function Register() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Add your name and email address to continue.')
      return
    }
    signIn(email.trim(), name.trim())
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <a className="brand" href="/"><span className="brand-mark">✳</span><span className="brand-name">prepwise</span></a>
        <div className="auth-copy"><h1>Confidence is built, not found.</h1><p>Create a space that is yours. Practice thoughtfully, learn from each session, and take your next step with confidence.</p></div>
        <div className="auth-quote">Start where you are. One answer at a time.</div>
      </aside>
      <main className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create your account</h2><p>Your personal space for interview practice.</p>
          {error && <div className="alert" role="alert">{error}</div>}
          <div className="field"><label htmlFor="name">Your name</label><input id="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Morgan" /></div>
          <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
          <button className="btn" type="submit">Create practice account <span aria-hidden="true">→</span></button>
          <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
          <p className="field-hint" style={{ textAlign: 'center', marginTop: 20 }}>Demo account only · authentication is stored locally in this browser.</p>
        </form>
      </main>
    </div>
  )
}
