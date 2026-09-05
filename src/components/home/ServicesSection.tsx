const SERVICES = [
  {
    title: "Prep",
    items: [
      "Creative Direction",
      "Concept Development",
      "Moodboards",
      "Art Direction",
      "Shot Lists",
      "Casting",
      "Prop & Set Sourcing",
      "Styling",
      "Production Planning",
      "Crew Coordination",
    ],
  },
  {
    title: "Production",
    items: [
      "Product & Still Life Photography",
      "Lighting Direction",
      "Set Direction",
      "Product Styling",
      "Talent Direction",
      "Digital Capture",
      "Focus Stacking",
      "Multi-Exposure Capture",
      "On-Set Creative Supervision",
    ],
  },
  {
    title: "Post prod",
    items: [
      "High-End Retouching",
      "Color Management",
      "Compositing",
      "Focus Stacking",
      "Surface & Material Retouching",
      "AI-Assisted Retouching",
      "Campaign Adaptations",
      "Print & Digital Delivery",
    ],
  },
  {
    title: "Creative & Strategy",
    items: [
      "Creative Direction",
      "Visual Strategy",
      "Campaign Concept",
      "Brand Visual Language",
      "Image System Development",
      "Visual Consistency",
      "Content Architecture",
      "Campaign Asset Planning",
      "Photography Guidelines",
      "Brand Photography Direction",
    ],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 px-6 py-12 text-center md:px-10 md:py-16">
      <p className="text-xs font-bold tracking-[0.2em] uppercase">
        Services
      </p>

      <div className="mt-6 flex flex-col gap-16 md:gap-20">
        {SERVICES.map((service) => (
          <div key={service.title}>
            <h3 className="text-[42px] leading-none font-black tracking-tight md:text-[50px] lg:text-[67px]">
              {service.title}
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-center text-[11px] leading-relaxed text-foreground/80 md:max-w-md md:text-[13px]">
              {service.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
