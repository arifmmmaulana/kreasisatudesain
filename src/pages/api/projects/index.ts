import type { APIRoute } from 'astro';
import { getProjects, createProject } from '@/lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any).runtime?.env;
  const projects = await getProjects(env.DB);
  return new Response(JSON.stringify(projects), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime?.env;
  const body = await request.json();
  const id = body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const project = await createProject(env.DB, {
    id,
    title: body.title,
    category: body.category,
    location: body.location,
    year: body.year,
    cover_image: body.cover_image,
    description: body.description || '',
    highlights: body.highlights || '[]',
  });
  return new Response(JSON.stringify(project), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
