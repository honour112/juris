const apiBaseUrl = (process.env.CAMPAY_API_BASE_URL || 'https://demo.campay.net/api').replace(/\/$/, '');

const getToken = async () => {
  const response = await fetch(`${apiBaseUrl}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: process.env.CAMPAY_USERNAME,
      password: process.env.CAMPAY_PASSWORD
    })
  });
  const body = await response.json();
  if (!response.ok || !body.token) throw new Error(body.detail || 'CamPay authentication failed');
  return body.token as string;
};

export const campayRequest = async (path: string, init: RequestInit = {}) => {
  const token = await getToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Token ${token}`);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${apiBaseUrl}${path}`, { ...init, headers });
  const body = await response.json();
  if (!response.ok) throw new Error(body.detail || body.message || 'CamPay request failed');
  return body;
};
