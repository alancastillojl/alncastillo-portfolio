import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-start justify-between px-6 py-8 md:px-10">
      <div>
        <Link
          href="/"
          className="block text-sm font-bold tracking-tight uppercase"
        >
          {siteConfig.name}
        </Link>
        <Link
          href="/#trabajo"
          className="mt-1 block font-serif text-sm italic text-foreground/80 transition-colors hover:text-foreground"
        >
          Proyectos
        </Link>
      </div>

      <nav className="text-right">
        <div className="flex items-center gap-4 text-sm font-bold uppercase">
          <Link
            href="/?cat=Product+Photography#trabajo"
            className="transition-colors hover:opacity-60"
          >
            Product Photography
          </Link>
          <span aria-hidden className="opacity-40">
            /
          </span>
          <Link
            href="/?cat=Retouch#trabajo"
            className="transition-colors hover:opacity-60"
          >
            Retouch
          </Link>
        </div>
        <Link
          href="/contacto"
          className="mt-1 block font-serif text-sm italic text-foreground/80 transition-colors hover:text-foreground"
        >
          Contacto
        </Link>
      </nav>
    </header>
  );
}
