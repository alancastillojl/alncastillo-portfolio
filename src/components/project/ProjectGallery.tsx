"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function ProjectGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-24 md:px-10">
      {images.map((src, index) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden bg-black/5"
        >
          <Image
            src={src}
            alt={`${name} ${index + 1}`}
            width={1600}
            height={2000}
            sizes="(min-width: 768px) 80vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
