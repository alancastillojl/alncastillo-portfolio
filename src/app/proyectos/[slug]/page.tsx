import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { getProjectBySlug, getProjects } from "@/lib/notion";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 300;

type Params = { slug: string };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects
    .filter((p) => p.status === "Publicado")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const title = project.name;
  const description =
    project.description || `${project.name} · ${siteConfig.tagline}`;

  return {
    title,
    description,
    openGraph: {
      title: `${project.name} — ${siteConfig.name}`,
      description,
      images: project.cover ? [{ url: project.cover }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const restOfGallery = project.gallery.filter((src) => src !== project.cover);

  return (
    <article>
      <ProjectHero slug={project.slug} cover={project.cover} name={project.name} />

      <header className="mx-auto flex max-w-5xl flex-col gap-2 px-6 pt-12 pb-8 md:px-10">
        <Link
          href="/#trabajo"
          className="w-fit text-xs font-bold tracking-[0.15em] uppercase text-foreground/60 transition-colors hover:text-foreground"
        >
          ← Proyectos
        </Link>
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <div className="flex flex-wrap gap-x-4 text-sm text-foreground/60">
          {project.categories.length > 0 && (
            <span>{project.categories.join(", ")}</span>
          )}
          {project.client && <span>{project.client}</span>}
        </div>
        {project.description && (
          <p className="mt-4 max-w-2xl text-base text-foreground/80">
            {project.description}
          </p>
        )}
      </header>

      <ProjectGallery images={restOfGallery} name={project.name} />
    </article>
  );
}
