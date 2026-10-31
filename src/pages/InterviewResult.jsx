import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getInterview } from '../services/api.js'
import { formatDate } from '../services/formatDate.js'

export default function InterviewResult() {
  const { id } = useParams()
  const [interview, setInterview] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getInterview(id).then(setInterview).catch((requestError) => setError(requestError.message))
  }, [id])

  if (error) return <div className="alert" role="alert">Could not load this session: {error}</div>
  if (!interview) return <div className="empty-state">Loading your recap…</div>

  const answered = interview.questions.filter((question) => Boolean(question.answer)).length
  return (
    <>
      <div className="page-heading"><div><h1>Practice complete</h1><p>You showed up and worked through the questions. That is progress worth recognizing.</p></div><Link className="btn" to="/interview/setup">Practice again →</Link></div>
      <section className="card section-card" style={{ maxWidth: 820 }}>
        <div className="section-title"><div><h2>{interview.role}</h2><div className="interview-meta" style={{ marginTop: 6 }}>{interview.interview_type} · {formatDate(interview.updated_at)}</div></div><span className={`status-pill ${interview.status}`}>{interview.status.replace('_', ' ')}</span></div>
        <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', margin: '22px 0' }}>
          <div className="card stat-card"><div className="stat-label">Questions answered</div><div className="stat-value">{answered} / {interview.questions.length}</div><div className="stat-note">Each response is saved in your session</div></div>
          <div className="card stat-card"><div className="stat-label">Experience level</div><div className="stat-value" style={{ fontSize: 18, textTransform: 'capitalize' }}>{interview.experience_level}</div><div className="stat-note">Your selected practice focus</div></div>
        </div>
        <div className="section-title"><h2>Your answers</h2></div>
        <div className="interview-list">{interview.questions.map((question, questionIndex) => <article className="quick-action" key={question.id} style={{ alignItems: 'flex-start' }}><span className="quick-action-icon">{questionIndex + 1}</span><span><strong>{question.text}</strong><span style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{question.answer || 'No answer was recorded for this question.'}</span></span></article>)}</div>
        <div className="alert info" style={{ marginTop: 18, marginBottom: 0 }}>This recap shows your saved answers. The current backend does not provide AI feedback or a performance score.</div>
      </section>
    </>
  )
}
