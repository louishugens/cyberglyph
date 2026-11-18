import type { ReactNode } from "react";

/** Narrow text page for legal and policy content. */
export function ProsePage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 md:pt-24 lg:px-8">
      <h1 className="text-4xl leading-[1.05] font-medium tracking-[-0.035em] sm:text-5xl">{title}</h1>
      <div className="mt-10 grid gap-5 text-lg leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-2">
        {children}
      </div>
    </article>
  );
}
