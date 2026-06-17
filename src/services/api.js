const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function fetchApi(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function postApi(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || 'Erreur lors de l\'envoi');
  }
  return result;
}

export const api = {
  getHealth: () => fetchApi('/health'),
  getVersion: () => fetchApi('/version'),
  getBooks: (params = '') => fetchApi(`/books${params ? '?' + params : ''}`),
  getBook: (id) => fetchApi(`/books/${id}`),
  getCategories: () => fetchApi('/categories'),
  getStats: () => fetchApi('/stats'),
  sendContact: (data) => postApi('/contact', data)
};
