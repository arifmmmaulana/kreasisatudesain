import type { APIRoute } from 'astro';
import { getProject, updateProject, deleteProject } from '@/lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
  const env = (locals as any).runtime?.env;
  const project = await getProject(env.DB, params.id!);
  if (!project) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  return new Response(JSON.stringify(project), { headers: { 'Content-Type': 'application/json' } });
};

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const env = (locals as any).runtime?.env;
  const body = await request.json();
  const project = await updateProject(env.DB, params.id!, {
    title: body.title,
    category: body.category,
    location: body.location,
    year: body.year,
    cover_image: body.cover_image,
    description: body.description,
    highlights: body.highlights,
  });
  if (!project) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  return new Response(JSON.stringify(project), { headers: { 'Content-Type': 'application/json' } });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const env = (locals as any).runtime?.env;
  await deleteProject(env.DB, params.id!);
  return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
};
