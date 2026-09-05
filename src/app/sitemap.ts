import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/inquiries`, lastModified: new Date() },
  ];
}
