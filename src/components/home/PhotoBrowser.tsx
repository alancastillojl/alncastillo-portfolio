"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/lib/notion-types";

type Photo = {
  src: string;
  projectName: string;
  projectDescription?: string;
  sections: string[];
};

function slugifySection(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6";
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export function PhotoBrowser({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSectionSlug = searchParams.get("section");

  const published = useMemo(
    () => projects.filter((p) => p.status === "Published"),
    [projects],
  );

  const sections = useMemo(() => {
    const seen = new Map<string, string>();
    for (const project of published) {
      for (const section of project.sections) {
        const slug = slugifySection(section);
        if (!seen.has(slug)) seen.set(slug, section);
      }
    }
    return Array.from(seen, ([slug, name]) => ({ slug, name }));
  }, [published]);

  const photos = useMemo<Photo[]>(
    () =>
      published.flatMap((project) =>
        project.gallery.map((src) => ({
          src,
          projectName: project.name,
          projectDescription: project.description,
          sections: project.sections,
        })),
      ),
    [published],
  );

  const visiblePhotos = useMemo(() => {
    if (!activeSectionSlug) return photos;
    return photos.filter((photo) =>
      photo.sections.some((s) => slugifySection(s) === activeSectionSlug),
    );
  }, [photos, activeSectionSlug]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const wheelLocked = useRef(false);

  function goToSection(slug: string | null) {
    setActiveIndex(null);
    const params = new URLSearchParams();
    if (slug) params.set("section", slug);
    router.replace(params.size ? `${pathname}?${params}` : pathname, {
      scroll: false,
    });
  }

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + visiblePhotos.length) % visiblePhotos.length,
    );
  }, [visiblePhotos.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % visiblePhotos.length));
  }, [visiblePhotos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const activePhoto = activeIndex !== null ? visiblePhotos[activeIndex] : null;

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) showPrev();
    else if (delta < -50) showNext();
    touchStartX.current = null;
  }

  // El trackpad de Mac dispara "wheel" con deltaX en un swipe de dos dedos
  // (no genera eventos touch). Se bloquea brevemente tras cada cambio de
  // foto porque un solo swipe dispara decenas de eventos wheel seguidos.
  function onWheel(e: React.WheelEvent) {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    if (Math.abs(e.deltaX) < 12 || wheelLocked.current) return;
    wheelLocked.current = true;
    if (e.deltaX > 0) showNext();
    else showPrev();
    setTimeout(() => {
      wheelLocked.current = false;
    }, 450);
  }

  return (
    <section id="work" className="scroll-mt-24 px-6 pt-16 pb-16 md:px-10 md:pt-20">
      <div className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
        <button
          type="button"
          onClick={() => goToSection(null)}
          className={`text-xs font-normal tracking-[0.15em] uppercase transition-colors ${
            !activeSectionSlug
              ? "text-foreground"
              : "text-foreground/40 hover:text-foreground/70"
          }`}
        >
          Overview
        </button>
        {sections.map((section) => (
          <button
            key={section.slug}
            type="button"
            onClick={() => goToSection(section.slug)}
            className={`text-xs font-normal tracking-[0.15em] uppercase transition-colors ${
              activeSectionSlug === section.slug
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground/70"
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {visiblePhotos.length === 0 ? (
        <p className="text-center text-sm text-foreground/60">
          No photos published yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:gap-2 lg:grid-cols-3">
          {visiblePhotos.map((photo, index) => (
            <button
              key={`${photo.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-black/5"
            >
              <Image
                src={photo.src}
                alt={photo.projectName}
                fill
                quality={65}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      )}

      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 px-4 py-6 backdrop-blur-sm"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 text-2xl text-foreground/60 transition-colors hover:text-foreground md:top-6 md:right-8"
          >
            ×
          </button>

          {visiblePhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 opacity-70 transition-opacity hover:opacity-100 md:left-6"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 opacity-70 transition-opacity hover:opacity-100 md:right-6"
              >
                <ChevronIcon direction="right" />
              </button>
            </>
          )}

          <div
            className="flex max-w-6xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[88vh] w-[94vw] max-w-6xl">
              <Image
                src={activePhoto.src}
                alt={activePhoto.projectName}
                fill
                quality={85}
                sizes="94vw"
                className="object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-[11px] font-medium tracking-[0.1em] text-foreground/50 uppercase">
                {activePhoto.projectName}
              </p>
              {activePhoto.projectDescription && (
                <p className="mt-1 max-w-md text-[11px] text-foreground/35">
                  {activePhoto.projectDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
