import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { getProjects } from "@/lib/notion";

export const revalidate = 300;

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <ProjectGrid projects={projects} />
      </Suspense>
    </>
  );
}
