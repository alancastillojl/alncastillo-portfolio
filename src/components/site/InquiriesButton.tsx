import Link from "next/link";

export function InquiriesButton({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const sizeClasses =
    size === "md" ? "px-5 py-2 text-xs" : "px-3 py-1 text-[10px]";

  return (
    <Link
      href="/inquiries"
      className={`inline-block border border-foreground/70 font-bold uppercase tracking-wide transition-colors hover:bg-foreground hover:text-background ${sizeClasses} ${className}`}
    >
      Inquiries
    </Link>
  );
}
