import type { APIRoute } from 'astro';
import { addGalleryImage, deleteGalleryImage } from '@/lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ params, request, locals }) => {
  const env = (locals as any).runtime?.env;
  const body = await request.json();
  await addGalleryImage(env.DB, params.id!, body.image_url, body.sort_order ?? 0);
  return new Response(JSON.stringify({ success: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime?.env;
  const body = await request.json();
  await deleteGalleryImage(env.DB, body.id);
  return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
};
