import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta a ${siteConfig.name} para cotizar tu próxima sesión de fotografía de producto o retoque digital.`,
};

export default function ContactoPage() {
  return (
    <section className="min-h-screen px-6 pt-40 pb-24 md:px-10">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold">Hablemos de tu proyecto</h1>
        <p className="mt-2 max-w-md text-foreground/70">
          Cuéntame qué necesitas — fotografía de producto, retoque, o ambos —
          y te responderé con una propuesta.
        </p>
        <div className="mt-10">
          <ContactForm contactEmail={siteConfig.email} />
        </div>
      </div>
    </section>
  );
}
