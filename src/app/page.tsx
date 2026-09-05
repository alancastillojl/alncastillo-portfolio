import { Suspense } from "react";
import { PhotoBrowser } from "@/components/home/PhotoBrowser";
import { ServicesSection } from "@/components/home/ServicesSection";
import { getProjects } from "@/lib/notion";

export const revalidate = 300;

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Suspense fallback={null}>
        <PhotoBrowser projects={projects} />
      </Suspense>
      <ServicesSection />
    </>
  );
}
