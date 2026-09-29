import { cn } from "@/lib/utils";

/** CyberGlyph mark: an open "C" enclosing a keyhole. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <path
        d="M24.5 8.2A11 11 0 1 0 24.5 23.8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="16" cy="13.6" r="3.2" fill="var(--signal)" />
      <path d="M14.6 15.5h2.8l.9 6h-4.6z" fill="var(--signal)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight">
        CyberGlyph
        <span className="ml-1.5 font-normal text-muted-foreground">
          Security
        </span>
      </span>
    </span>
  );
}
