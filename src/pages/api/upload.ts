import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime?.env;
  if (!env?.R2) return new Response(JSON.stringify({ error: 'R2 not configured' }), { status: 500 });

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  if (!file) return new Response(JSON.stringify({ error: 'No file' }), { status: 400 });

  const key = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const buffer = await file.arrayBuffer();
  await env.R2.put(key, buffer, {
    httpMetadata: { contentType: file.type },
  });

  return new Response(JSON.stringify({ url: `/images/r2/${key}` }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
