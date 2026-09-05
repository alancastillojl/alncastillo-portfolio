export type ProjectStatus = "Published" | "Coming Soon" | "Draft";

export type Project = {
  id: string;
  slug: string;
  name: string;
  categories: string[];
  sections: string[];
  status: ProjectStatus;
  order: number;
  client?: string;
  description?: string;
  cover: string | null;
  gallery: string[];
};
