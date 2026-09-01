"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { projectImageLayoutId } from "@/lib/project-transition";

export function ProjectHero({
  slug,
  cover,
  name,
}: {
  slug: string;
  cover: string | null;
  name: string;
}) {
  return (
    <motion.div
      layoutId={projectImageLayoutId(slug)}
      className="relative h-[70vh] w-full overflow-hidden bg-black/5 md:h-screen"
    >
      {cover && (
        <Image
          src={cover}
          alt={name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
    </motion.div>
  );
}
