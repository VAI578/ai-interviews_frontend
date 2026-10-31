import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getInterviews } from '../services/api.js'
import { formatDate } from '../services/formatDate.js'

export default function InterviewHistory() {
  const [interviews, setInterviews] = useState([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInterviews()
      .then(setInterviews)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  const visible = filter === 'all' ? interviews : interviews.filter((item) => item.status === filter)
  return (
    <>
      <div className="page-heading"><div><h1>Interview history</h1><p>Look back at your sessions and keep your progress moving.</p></div><Link className="btn" to="/interview/setup">＋ New session</Link></div>
      {error && <div className="alert" role="alert">Could not load interview history: {error}. Check that the Flask API is running.</div>}
      <section className="card section-card">
        <div className="section-title"><h2>Your sessions</h2><select aria-label="Filter by status" value={filter} onChange={(event) => setFilter(event.target.value)} style={{ padding: '8px 10px', border: '1px solid var(--line)', borderRadius: 8, color: 'var(--ink)', background: 'white', fontSize: 11 }}><option value="all">All sessions</option><option value="in_progress">In progress</option><option value="completed">Completed</option><option value="abandoned">Abandoned</option></select></div>
        {loading ? <div className="empty-state">Loading your sessions…</div> : visible.length ? (
          <div className="table-wrap"><table className="data-table"><thead><tr><th>ROLE</th><th>TYPE</th><th>DATE</th><th>QUESTIONS</th><th>STATUS</th><th /></tr></thead><tbody>
            {visible.map((interview) => <tr key={interview.id}><td><strong>{interview.role}</strong></td><td style={{ textTransform: 'capitalize' }}>{interview.interview_type}</td><td>{formatDate(interview.created_at)}</td><td>{interview.questions?.length || 0}</td><td><span className={`status-pill ${interview.status}`}>{interview.status.replace('_', ' ')}</span></td><td>{interview.status === 'in_progress' ? <Link className="text-link" to={`/interview/${interview.id}/live`}>Continue →</Link> : <Link className="text-link" to={`/interview/${interview.id}/result`}>Review →</Link>}</td></tr>)}
          </tbody></table></div>
        ) : !error ? <div className="empty-state"><strong>No sessions found</strong>{filter === 'all' ? 'Start your first interview practice session when you are ready.' : `There are no ${filter.replace('_', ' ')} sessions.`}</div> : null}
      </section>
    </>
  )
}
