import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/notion";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((p) => p.status === "Publicado")
    .map((project) => ({
      url: `${siteConfig.url}/proyectos/${project.slug}`,
      lastModified: new Date(),
    }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/contacto`, lastModified: new Date() },
    ...projectEntries,
  ];
}
