import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InterviewCard from '../components/InterviewCard.jsx'
import StatCard from '../components/StatCard.jsx'
import { getInterviews } from '../services/api.js'

export default function Dashboard() {
  const [interviews, setInterviews] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInterviews()
      .then(setInterviews)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  const completed = interviews.filter((item) => item.status === 'completed').length
  const active = interviews.filter((item) => item.status === 'in_progress').length

  return (
    <>
      <div className="page-heading">
        <div><h1>Your practice, your pace.</h1><p>A little preparation today can help you feel ready tomorrow.</p></div>
        <Link className="btn" to="/interview/setup"><span aria-hidden="true">＋</span> Start an interview</Link>
      </div>
      {error && <div className="alert" role="alert">Could not load interview sessions: {error}. Check that the Flask API is running, then refresh.</div>}
      <div className="stat-grid">
        <StatCard label="Total sessions" value={interviews.length} note="Every step counts" icon="◷" />
        <StatCard label="Completed" value={completed} note="Sessions you finished" icon="✓" />
        <StatCard label="In progress" value={active} note="Pick up where you left off" icon="↗" />
        <StatCard label="Questions practiced" value={interviews.reduce((total, item) => total + (item.questions?.length || 0), 0)} note="One answer at a time" icon="✳" />
      </div>
      <div className="dashboard-grid">
        <section className="card section-card">
          <div className="section-title"><h2>Recent practice</h2><Link className="text-link" to="/history">View history →</Link></div>
          {loading ? <div className="empty-state">Loading your sessions…</div>
            : interviews.length ? <div className="interview-list">{interviews.slice(0, 4).map((interview) => <InterviewCard key={interview.id} interview={interview} />)}</div>
              : error ? <div className="empty-state"><strong>Sessions are temporarily unavailable</strong>Your dashboard will show your practice history once the API is reachable.</div>
                : <div className="empty-state"><strong>Your first session starts here</strong>Choose a role and practice a few questions to get started.<div style={{ marginTop: 14 }}><Link className="btn btn-small" to="/interview/setup">Set up practice</Link></div></div>}
        </section>
        <section className="card section-card">
          <div className="section-title"><h2>Quick actions</h2></div>
          <div className="quick-actions">
            <Link to="/interview/setup" className="quick-action"><span className="quick-action-icon">✳</span><span><strong>Practice an interview</strong><span>Set up a focused session</span></span></Link>
            <Link to="/history" className="quick-action"><span className="quick-action-icon">◷</span><span><strong>Review your sessions</strong><span>See the practice you have done</span></span></Link>
            <Link to="/resume-analyzer" className="quick-action"><span className="quick-action-icon">▤</span><span><strong>Resume analyzer</strong><span>Review analyzer availability</span></span></Link>
          </div>
        </section>
      </div>
    </>
  )
}
