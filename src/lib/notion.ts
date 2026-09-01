import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  QueryDataSourceParameters,
} from "@notionhq/client/build/src/api-endpoints";
import type { Project, ProjectStatus } from "./notion-types";

const DATABASE_ID = process.env.NOTION_PROJECTS_DATABASE_ID;
const NOTION_TOKEN = process.env.NOTION_TOKEN;

const notion = NOTION_TOKEN ? new Client({ auth: NOTION_TOKEN }) : null;

// Datos de ejemplo para poder ver el diseño del sitio antes de conectar Notion.
// En cuanto se configuren NOTION_TOKEN y NOTION_PROJECTS_DATABASE_ID, se ignoran.
const SAMPLE_PROJECTS: Project[] = [
  {
    id: "sample-1",
    slug: "campana-verano",
    name: "Campaña Verano",
    categories: ["Product Photography"],
    status: "Publicado",
    order: 1,
    description:
      "Sesión de fotografía de producto para catálogo de temporada.",
    cover: "/sample/campana-verano-1.svg",
    gallery: [
      "/sample/campana-verano-1.svg",
      "/sample/campana-verano-2.svg",
      "/sample/campana-verano-3.svg",
    ],
  },
  {
    id: "sample-2",
    slug: "retoque-editorial",
    name: "Retoque Editorial",
    categories: ["Retouch"],
    status: "Publicado",
    order: 2,
    description: "Retoque digital para editorial de moda.",
    cover: "/sample/retoque-editorial-1.svg",
    gallery: [
      "/sample/retoque-editorial-1.svg",
      "/sample/retoque-editorial-2.svg",
    ],
  },
  {
    id: "sample-3",
    slug: "linea-otono",
    name: "Línea Otoño",
    categories: ["Product Photography", "Retouch"],
    status: "Próximamente",
    order: 3,
    description: "Próximo lanzamiento de temporada.",
    cover: "/sample/linea-otono-1.svg",
    gallery: ["/sample/linea-otono-1.svg"],
  },
];

function getTitle(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === "title") {
    return prop.title.map((t) => t.plain_text).join("");
  }
  return "";
}

function getRichText(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === "rich_text") {
    return prop.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

function getSelect(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === "select") {
    return prop.select?.name ?? "";
  }
  return "";
}

function getMultiSelect(page: PageObjectResponse, key: string): string[] {
  const prop = page.properties[key];
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((o) => o.name);
  }
  return [];
}

function getNumber(page: PageObjectResponse, key: string): number {
  const prop = page.properties[key];
  if (prop?.type === "number") {
    return prop.number ?? 0;
  }
  return 0;
}

function getFiles(page: PageObjectResponse, key: string): string[] {
  const prop = page.properties[key];
  if (prop?.type !== "files") return [];
  return prop.files
    .map((file) => {
      if (file.type === "file") return file.file.url;
      if (file.type === "external") return file.external.url;
      return null;
    })
    .filter((url): url is string => Boolean(url));
}

function mapPage(page: PageObjectResponse): Project {
  const gallery = getFiles(page, "Galería");
  const coverFiles = getFiles(page, "Portada");
  return {
    id: page.id,
    slug: getRichText(page, "Slug") || page.id,
    name: getTitle(page, "Nombre"),
    categories: getMultiSelect(page, "Categoría"),
    status: (getSelect(page, "Estado") || "Borrador") as ProjectStatus,
    order: getNumber(page, "Orden"),
    client: getRichText(page, "Cliente") || undefined,
    description: getRichText(page, "Descripción") || undefined,
    cover: coverFiles[0] ?? gallery[0] ?? null,
    gallery,
  };
}

let cachedDataSourceId: string | null = null;

async function resolveDataSourceId(): Promise<string | null> {
  if (!notion || !DATABASE_ID) return null;
  if (cachedDataSourceId) return cachedDataSourceId;

  const database = await notion.databases.retrieve({
    database_id: DATABASE_ID,
  });
  const dataSourceId =
    "data_sources" in database ? database.data_sources[0]?.id : undefined;
  cachedDataSourceId = dataSourceId ?? null;
  return cachedDataSourceId;
}

async function queryAllProjects(): Promise<Project[]> {
  const dataSourceId = await resolveDataSourceId();
  if (!notion || !dataSourceId) {
    return SAMPLE_PROJECTS;
  }

  const params: QueryDataSourceParameters = {
    data_source_id: dataSourceId,
    filter: {
      or: [
        { property: "Estado", select: { equals: "Publicado" } },
        { property: "Estado", select: { equals: "Próximamente" } },
      ],
    },
    sorts: [{ property: "Orden", direction: "ascending" }],
  };

  const results: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.dataSources.query({
      ...params,
      start_cursor: cursor,
    });
    results.push(...(response.results as PageObjectResponse[]));
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return results.map(mapPage);
}

export async function getProjects(): Promise<Project[]> {
  const projects = await queryAllProjects();
  return projects.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export const isNotionConfigured = Boolean(notion && DATABASE_ID);

const CONTACTS_DATABASE_ID = process.env.NOTION_CONTACTS_DATABASE_ID;

export async function createContactLead(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  if (!notion || !CONTACTS_DATABASE_ID) return;

  await notion.pages.create({
    parent: { database_id: CONTACTS_DATABASE_ID },
    properties: {
      Nombre: { title: [{ text: { content: data.name } }] },
      Email: { email: data.email },
      Teléfono: { rich_text: [{ text: { content: data.phone ?? "" } }] },
      Mensaje: { rich_text: [{ text: { content: data.message } }] },
    },
  });
}
