import { useState } from 'react'

export default function Settings() {
  const [reminders, setReminders] = useState(() => localStorage.getItem('prepwise-reminders') === 'true')
  const [notice, setNotice] = useState('')

  function toggleReminders(event) {
    const enabled = event.target.checked
    setReminders(enabled)
    localStorage.setItem('prepwise-reminders', String(enabled))
    setNotice('Preference saved in this browser.')
  }

  return (
    <>
      <div className="page-heading"><div><h1>Settings</h1><p>Adjust your practice preferences.</p></div></div>
      <section className="card section-card" style={{ maxWidth: 760 }}>
        {notice && <div className="alert info" role="status">{notice}</div>}
        <div className="section-title"><h2>Preferences</h2></div>
        <div className="setting-row"><div><strong>Practice reminders</strong><p>Save your reminder preference in this browser.</p></div><input className="switch" type="checkbox" checked={reminders} onChange={toggleReminders} aria-label="Enable practice reminders" /></div>
        <div className="setting-row"><div><strong>Privacy</strong><p>Profile and demo sign-in details stay in local browser storage. Interview sessions are sent to the configured Flask API.</p></div></div>
        <div className="alert info" style={{ marginTop: 18, marginBottom: 0 }}>Reminder delivery and account security settings are not connected to a backend service.</div>
      </section>
    </>
  )
}
