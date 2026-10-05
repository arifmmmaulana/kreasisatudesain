import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
  const key = params.path;
  if (!key) return new Response('Not found', { status: 404 });

  const env = (locals as any).runtime?.env;
  const r2: R2Bucket | undefined = env?.R2;
  if (!r2) return new Response('R2 binding not found', { status: 500 });

  const object = await r2.get(key);
  if (!object) return new Response('Not found', { status: 404 });

  return new Response(object.body, {
    headers: {
      'Content-Type': object.httpMetadata?.contentType ?? 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
