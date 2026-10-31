import { Link } from 'react-router-dom'
import { formatDate } from '../services/formatDate.js'

export default function InterviewCard({ interview }) {
  return (
    <article className="interview-card">
      <div className="interview-card-main">
        <div className="interview-symbol" aria-hidden="true">✳</div>
        <div>
          <h3>{interview.role}</h3>
          <div className="interview-meta">{interview.interview_type} · {formatDate(interview.created_at)}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className={`status-pill ${interview.status}`}>{interview.status.replace('_', ' ')}</span>
        {interview.status === 'in_progress' && <Link className="btn btn-small btn-outline" to={`/interview/${interview.id}/live`}>Continue</Link>}
      </div>
    </article>
  )
}
