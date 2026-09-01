export const siteConfig = {
  name: "Alan Castillo",
  shortName: "ALAN C.",
  tagline: "Fotografía de producto y retoque",
  description:
    "Portafolio de fotografía de producto y retoque digital de Alan Castillo. Fotografía comercial de alta calidad para marcas y catálogos.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://alancastillo.com",
  email: process.env.CONTACT_TO_EMAIL || "hola@alancastillo.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  nav: [
    { label: "Proyectos", href: "/#trabajo" },
    { label: "Product Photography", href: "/#trabajo?cat=product" },
    { label: "Retouch", href: "/#trabajo?cat=retouch" },
  ],
  contactLabel: "Contacto",
};
