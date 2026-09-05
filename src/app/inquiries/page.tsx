import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Inquiries",
  description: `Get in touch with ${siteConfig.name} to quote your next product photography or retouching project.`,
  alternates: { canonical: "/inquiries" },
};

export default function InquiriesPage() {
  return (
    <section className="flex min-h-screen flex-col items-center px-6 pt-40 pb-24 text-center md:px-10">
      <h1 className="text-2xl font-semibold">Let&apos;s talk about your project</h1>
      <div className="mt-10 w-full max-w-md">
        <ContactForm contactEmail={siteConfig.email} />
      </div>
    </section>
  );
}
