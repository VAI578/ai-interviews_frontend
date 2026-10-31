import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { finishInterview, getInterview, submitAnswer } from '../services/api.js'

export default function LiveInterview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [interview, setInterview] = useState(null)
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getInterview(id)
      .then((session) => {
        setInterview(session)
        const firstUnanswered = session.questions.findIndex((question) => !question.answer)
        const startIndex = firstUnanswered < 0 ? 0 : firstUnanswered
        setIndex(startIndex)
        setAnswer(session.questions[startIndex]?.answer || '')
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(event) {
    event.preventDefault()
    const question = interview?.questions?.[index]
    if (!question || !answer.trim()) {
      setError('Write an answer before continuing.')
      return
    }
    setError('')
    setSaving(true)
    try {
      await submitAnswer(interview.id, question.id, answer.trim())
      if (index < interview.questions.length - 1) {
        setAnswer(interview.questions[index + 1].answer || '')
        setIndex(index + 1)
      } else {
        await finishInterview(interview.id)
        navigate(`/interview/${interview.id}/result`)
      }
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="empty-state">Loading your practice session…</div>
  if (!interview) return <><div className="alert" role="alert">{error || 'Interview session not found.'}</div><Link className="btn btn-outline" to="/history">Back to history</Link></>
  if (interview.status !== 'in_progress') return <><div className="alert info">This session is {interview.status.replace('_', ' ')}.</div><Link className="btn" to={`/interview/${interview.id}/result`}>View session recap</Link></>
  if (!interview.questions.length) return <div className="alert">This session has no questions. Return to your dashboard and create a new practice session.</div>

  const question = interview.questions[index]
  return (
    <div className="live-wrap">
      <div className="page-heading"><div><h1>{interview.role}</h1><p>{interview.interview_type} practice · {interview.experience_level}</p></div><Link className="btn btn-outline btn-small" to="/dashboard">Exit session</Link></div>
      <div className="live-progress" aria-label={`Question ${index + 1} of ${interview.questions.length}`}><span style={{ width: `${((index + 1) / interview.questions.length) * 100}%` }} /></div>
      <form className="card question-card" onSubmit={handleSubmit}>
        <div className="question-count">QUESTION {index + 1} OF {interview.questions.length}</div>
        <h2>{question.text}</h2>
        {error && <div className="alert" role="alert">{error}</div>}
        <div className="field"><label htmlFor="answer">Your answer</label><textarea id="answer" maxLength="20000" required value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Take a breath, organize your thoughts, and write your answer…" /></div>
        <div className="question-actions"><span className="field-hint">Your answer is saved with this session.</span><button className="btn" type="submit" disabled={saving}>{saving ? 'Saving…' : index === interview.questions.length - 1 ? 'Finish session ✓' : 'Save & continue →'}</button></div>
      </form>
    </div>
  )
}
