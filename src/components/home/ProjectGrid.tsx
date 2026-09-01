"use client";

import { useSearchParams } from "next/navigation";
import type { Project } from "@/lib/notion-types";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");

  const filtered = category
    ? projects.filter((p) => p.categories.includes(category))
    : projects;

  return (
    <section id="trabajo" className="scroll-mt-24 px-6 pt-32 pb-24 md:px-10">
      {filtered.length === 0 ? (
        <p className="text-sm text-foreground/60">
          No hay proyectos en esta categoría todavía.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
