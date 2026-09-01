"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/lib/notion-types";
import { projectImageLayoutId } from "@/lib/project-transition";

export function ProjectCard({ project }: { project: Project }) {
  const isComingSoon = project.status === "Próximamente";

  const content = (
    <>
      <motion.div
        layoutId={projectImageLayoutId(project.slug)}
        className="relative aspect-[4/5] w-full overflow-hidden bg-black/5"
      >
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        {isComingSoon && (
          <span className="absolute top-3 left-3 bg-background px-2 py-1 text-xs font-medium">
            Coming Soon
          </span>
        )}
      </motion.div>
      <div className="mt-3">
        <p className="text-sm font-semibold">{project.name}</p>
        {project.categories.length > 0 && (
          <p className="text-sm text-foreground/60">
            {project.categories.join(", ")}
          </p>
        )}
      </div>
    </>
  );

  if (isComingSoon) {
    return <div className="group block">{content}</div>;
  }

  return (
    <Link href={`/proyectos/${project.slug}`} className="group block">
      {content}
    </Link>
  );
}
