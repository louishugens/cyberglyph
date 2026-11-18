import { cn } from "@/lib/utils";

/** Official CyberGlyph Security lockup (source: docs/logos), reverse version for the navy theme. */
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/cyberglyph-reverse.svg"
      alt="CyberGlyph Security"
      width={900}
      height={240}
      className={cn("h-10 w-auto", className)}
    />
  );
}
