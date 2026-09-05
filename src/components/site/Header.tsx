"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { InquiriesButton } from "./InquiriesButton";
import { NegativeText } from "./NegativeText";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const brandClass = "block text-sm font-bold tracking-tight uppercase";
  const projectsClass = "mt-1 block text-[11px] font-normal uppercase italic";
  const navTextClass = "text-sm font-bold uppercase";

  return (
    <header className="sticky inset-x-0 top-0 z-40 flex items-start justify-between px-6 py-8 md:px-10">
      <div>
        <Link href="/" className={brandClass}>
          {isHome ? (
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
          {isHome ? (
            <NegativeText className={projectsClass}>Services</NegativeText>
          ) : (
            "Services"
          )}
        </Link>
      </div>

      <nav className="flex flex-col items-end">
        <p className={navTextClass}>
          {isHome ? (
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
