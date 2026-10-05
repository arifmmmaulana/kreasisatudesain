import { defineMiddleware } from 'astro:middleware';
import { verifySession } from '@/lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isAdminRoute = pathname.startsWith('/admin');
  const isApiRoute = pathname.startsWith('/api');
  const isLoginPage = pathname === '/admin/login';
  const isLoginApi = pathname === '/api/auth/login' || pathname === '/api/auth/logout';

  if ((isAdminRoute && !isLoginPage) || (isApiRoute && !isLoginApi)) {
    const token = context.cookies.get('session')?.value;
    const env = (context.locals as any).runtime?.env;
    const secret = env?.SESSION_SECRET;

    if (!token || !secret) {
      if (isApiRoute) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return context.redirect('/admin/login');
    }

    const session = await verifySession(token, secret);
    if (!session) {
      context.cookies.delete('session');
      if (isApiRoute) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return context.redirect('/admin/login');
    }

    (context.locals as any).admin = session;
  }

  return next();
});
