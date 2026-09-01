export type ProjectStatus = "Publicado" | "Próximamente" | "Borrador";

export type Project = {
  id: string;
  slug: string;
  name: string;
  categories: string[];
  status: ProjectStatus;
  order: number;
  client?: string;
  description?: string;
  cover: string | null;
  gallery: string[];
};
