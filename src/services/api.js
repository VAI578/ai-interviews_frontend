const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const body = await response.json()
      if (body.error) message = body.error
    } catch {
      // Keep the HTTP status message when the server does not return JSON.
    }
    throw new Error(message)
  }

  if (response.status === 204) return null
  return response.json()
}

export async function getInterviews(status) {
  const query = status ? `?status=${encodeURIComponent(status)}` : ''
  return (await request(`/interviews${query}`)).interviews
}

export async function getInterview(id) {
  return (await request(`/interviews/${id}`)).interview
}

export async function createInterview(payload) {
  return (await request('/interviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  })).interview
}

export async function submitAnswer(interviewId, questionId, answer) {
  return (await request(`/interviews/${interviewId}/questions/${questionId}`, {
    method: 'PATCH',
    body: JSON.stringify({ answer }),
  })).interview
}

export async function finishInterview(id) {
  return (await request(`/interviews/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'completed' }),
  })).interview
}
