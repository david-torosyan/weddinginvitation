export async function submitRsvp(payload, messages = {}) {
  const mode = import.meta.env.VITE_RSVP_MODE || 'mock';
  if (mode === 'webhook') {
    const url = import.meta.env.VITE_RSVP_WEBHOOK_URL;
    if (!url) throw new Error(messages.missingWebhookUrl || 'RSVP webhook URL is not configured.');

    // Apps Script does not expose CORS response headers. text/plain keeps this
    // request preflight-free; the Apps Script endpoint still receives JSON.
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    return { mode };
  }

  await new Promise((resolve) => setTimeout(resolve, 550));
  localStorage.setItem('wedding-rsvp-latest', JSON.stringify(payload));
  if (import.meta.env.DEV) console.info('Mock RSVP payload:', payload);
  return { mode: 'mock' };
}
