const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

// Backend API call – projects are fetched from:
//   GET http://localhost:5001/api/projects
// or a configured VITE_API_BASE_URL.
export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/api/projects`)
  if (!res.ok) {
    throw new Error('Failed to load projects')
  }
  const data = await res.json()
  // Data fetching – normalise shape so the UI can rely
  // on a consistent structure regardless of backend details.
  if (Array.isArray(data)) return data
  if (Array.isArray(data.projects)) return data.projects
  return []
}

// Backend API call – contact messages are sent to:
//   POST http://localhost:5001/api/contact
// with JSON payload.
export async function sendContactMessage(payload) {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => '')
    throw new Error(errorText || 'Failed to send message')
  }

  return res.json().catch(() => ({}))
}

