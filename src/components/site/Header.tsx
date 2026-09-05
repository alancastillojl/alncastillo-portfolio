"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/site-config";
import { InquiriesButton } from "./InquiriesButton";
import { NegativeText } from "./NegativeText";

function subscribeToDesktopQuery(callback: () => void) {
  const query = window.matchMedia("(min-width: 768px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function isDesktopQuery() {
  return window.matchMedia("(min-width: 768px)").matches;
}
function isDesktopServerSnapshot() {
  return false;
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // El efecto de "negativo" dibuja el texto como una sola línea dentro de
  // una máscara SVG — si el texto real necesita 2 líneas (pantallas
  // angostas), la máscara no coincide y se ve roto. Por eso el efecto solo
  // se activa desde md hacia arriba; en mobile se usa texto plano, igual
  // que en las demás páginas, para que envuelva normal.
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopQuery,
    isDesktopQuery,
    isDesktopServerSnapshot,
  );

  const useNegativeText = isHome && isDesktop;

  const brandClass = "block text-sm font-bold tracking-tight uppercase";
  const projectsClass = "mt-1 block text-[11px] font-normal uppercase italic";
  const navTextClass = "text-sm font-bold uppercase";

  return (
    <header className="sticky inset-x-0 top-0 z-40 flex items-start justify-between px-6 py-8 md:px-10">
      <div>
        <Link href="/" className={brandClass}>
          {useNegativeText ? (
            <NegativeText className={brandClass}>{siteConfig.name}</NegativeText>
          ) : (
            siteConfig.name
          )}
        </Link>
        <Link
          href="/#services"
          className={`${projectsClass} transition-opacity hover:opacity-70 ${
            isHome ? "" : "text-foreground/80 hover:text-foreground"
          }`}
        >
          {useNegativeText ? (
            <NegativeText className={projectsClass}>Services</NegativeText>
          ) : (
            "Services"
          )}
        </Link>
      </div>

      <nav className="flex flex-col items-end">
        <p className={navTextClass}>
          {useNegativeText ? (
            <NegativeText className={navTextClass}>
              Product Photography / Retouching
            </NegativeText>
          ) : (
            "Product Photography / Retouching"
          )}
        </p>
        <div className="mt-1">
          <InquiriesButton />
        </div>
      </nav>
    </header>
  );
}
