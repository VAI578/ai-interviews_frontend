import { useState } from 'react'
import { useAuth } from '../context/authContext.js'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [saved, setSaved] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    updateUser({ name: name.trim() })
    setSaved(true)
  }

  return (
    <>
      <div className="page-heading"><div><h1>Your profile</h1><p>Manage the details shown in your practice space.</p></div></div>
      <section className="card form-card">
        <div className="profile-row">
          <div className="profile-avatar">{(user?.name || 'P').slice(0, 1).toUpperCase()}</div>
          <form onSubmit={handleSubmit}>
            {saved && <div className="alert info" role="status">Your profile was saved in this browser.</div>}
            <div className="field" style={{ marginBottom: 16 }}><label htmlFor="profile-name">Display name</label><input id="profile-name" required maxLength="80" value={name} onChange={(event) => { setName(event.target.value); setSaved(false) }} /></div>
            <div className="field" style={{ marginBottom: 19 }}><label htmlFor="profile-email">Email address</label><input id="profile-email" type="email" value={user?.email || ''} disabled /><span className="field-hint">Account details are stored locally for this frontend demo.</span></div>
            <button className="btn" type="submit">Save profile</button>
          </form>
        </div>
      </section>
    </>
  )
}
