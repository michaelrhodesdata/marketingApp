// Authenticated fetch wrapper — attaches JWT from localStorage
export function apiFetch(url, options = {}) {
  const token = localStorage.getItem('auth_token');
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then(res => {
    if (res.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return res;
  });
}
