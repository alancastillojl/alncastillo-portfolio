export const siteConfig = {
  name: "Alan Castillo",
  tagline: "Product photography and retouching",
  description:
    "Alan Castillo is a product photographer and retoucher specializing in jewelry, timepieces, cosmetics, and beverage photography for brands, catalogs, and e-commerce. High-end still life photography, styling, and digital retouching.",
  // Especialidades reales del estudio (coinciden con el campo "Section" en
  // Notion) — se usan en los datos estructurados (JSON-LD) para SEO.
  specialties: [
    "Jewelry Photography",
    "Timepieces Photography",
    "Cosmetics Photography",
    "Beverage & Food Photography",
    "Personal Project Photography",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://alncastillo.com",
  email: process.env.CONTACT_TO_EMAIL || "hola@alncastillo.com",
  social: {
    behance: "https://www.behance.net/flucastillo",
    instagram: "https://www.instagram.com/alancstlllo/",
    linkedin: "https://www.linkedin.com/in/alanccast/",
  },
};
