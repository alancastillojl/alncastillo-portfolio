export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end px-6 pb-24 md:px-10">
      <a
        href="#trabajo"
        className="group flex w-fit flex-col items-center gap-2 self-center text-center"
      >
        <span className="text-xs font-bold tracking-[0.2em] uppercase">
          Work
        </span>
        <span className="text-lg transition-transform duration-300 group-hover:translate-y-1">
          ↓
        </span>
      </a>
    </section>
  );
}
