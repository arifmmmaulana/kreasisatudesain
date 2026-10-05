export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  cover_image: string;
  description: string;
  highlights: string;
  created_at: string;
  updated_at: string;
};

export type GalleryImage = {
  id: number;
  project_id: string;
  image_url: string;
  sort_order: number;
};

export async function getProjects(db: D1Database) {
  const { results: projects } = await db
    .prepare('SELECT * FROM projects ORDER BY year DESC, created_at DESC')
    .all<Project>();
  if (!projects || projects.length === 0) return [];

  const { results: galleries } = await db
    .prepare('SELECT * FROM gallery_images ORDER BY sort_order ASC')
    .all<GalleryImage>();

  return projects.map((p) => ({
    ...p,
    gallery: (galleries ?? []).filter((g) => g.project_id === p.id),
  }));
}

export async function getProject(db: D1Database, id: string) {
  const project = await db
    .prepare('SELECT * FROM projects WHERE id = ?')
    .bind(id)
    .first<Project>();
  if (!project) return null;

  const { results: gallery } = await db
    .prepare('SELECT * FROM gallery_images WHERE project_id = ? ORDER BY sort_order ASC')
    .bind(id)
    .all<GalleryImage>();

  return { ...project, gallery: gallery ?? [] };
}

export async function createProject(db: D1Database, data: Omit<Project, 'created_at' | 'updated_at'>) {
  await db
    .prepare(
      `INSERT INTO projects (id, title, category, location, year, cover_image, description, highlights)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(data.id, data.title, data.category, data.location, data.year, data.cover_image, data.description, data.highlights)
    .run();
  return getProject(db, data.id);
}

export async function updateProject(db: D1Database, id: string, data: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) {
  const fields: string[] = [];
  const values: unknown[] = [];
  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }
  if (fields.length === 0) return getProject(db, id);
  fields.push(`updated_at = datetime('now')`);
  values.push(id);
  await db
    .prepare(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
  return getProject(db, id);
}

export async function deleteProject(db: D1Database, id: string) {
  await db.prepare('DELETE FROM projects WHERE id = ?').bind(id).run();
}

export async function addGalleryImage(db: D1Database, projectId: string, imageUrl: string, sortOrder: number) {
  await db
    .prepare('INSERT INTO gallery_images (project_id, image_url, sort_order) VALUES (?, ?, ?)')
    .bind(projectId, imageUrl, sortOrder)
    .run();
}

export async function deleteGalleryImage(db: D1Database, id: number) {
  await db.prepare('DELETE FROM gallery_images WHERE id = ?').bind(id).run();
}
