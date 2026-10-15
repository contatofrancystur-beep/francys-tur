// Cloudflare Pages Function: o chat chama /api/chat e a chave fica só no servidor
const ALLOWED_ORIGINS = [
  'https://francystur.com.br',
  'https://www.francystur.com.br',
  'https://francys-tur.pages.dev',
];

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin') || '';
  const okOrigin = ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.francys-tur.pages.dev');
  if (!okOrigin) return new Response('Forbidden', { status: 403 });

  let body;
  try { body = await request.json(); } catch { return new Response('Bad Request', { status: 400 }); }

  const payload = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: Math.min(Number(body.max_tokens) || 1000, 1000),
    system: typeof body.system === 'string' ? body.system.slice(0, 20000) : undefined,
    messages: Array.isArray(body.messages) ? body.messages.slice(-20) : [],
  };

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(payload),
  });

  return new Response(await r.text(), {
    status: r.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
