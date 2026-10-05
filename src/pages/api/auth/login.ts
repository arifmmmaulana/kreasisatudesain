import type { APIRoute } from 'astro';
import { verifyPassword, createSession } from '@/lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const env = (locals as any).runtime?.env;
  if (!env) return new Response(JSON.stringify({ error: 'Server config error' }), { status: 500 });

  const body = await request.json();
  const { username, password } = body;

  if (username !== env.ADMIN_USERNAME) {
    return new Response(JSON.stringify({ error: 'Username atau password salah' }), { status: 401 });
  }

  const valid = await verifyPassword(password, env.ADMIN_PASSWORD_HASH);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Username atau password salah' }), { status: 401 });
  }

  const token = await createSession(username, env.SESSION_SECRET);
  cookies.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
