import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Responsible Disclosure",
  description: "How to report a security vulnerability in a CyberGlyph Security website or system.",
  alternates: { canonical: "/responsible-disclosure" },
};

// DRAFT: the commitments below need the client's sign-off before launch.
export default function ResponsibleDisclosurePage() {
  return (
    <ProsePage title="Responsible disclosure">
      <p>
        If you find a security vulnerability in this website or another
        CyberGlyph Security system, we want to hear about it.
      </p>

      <h2>How to report</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> with:
      </p>
      <ul>
        <li>The affected page or system</li>
        <li>The steps to reproduce the issue</li>
        <li>What an attacker could do with it</li>
      </ul>

      <h2>What we ask</h2>
      <ul>
        <li>Give us time to fix the issue before you publish it.</li>
        <li>Stop testing once you have confirmed the issue.</li>
        <li>Leave other people&rsquo;s data alone.</li>
      </ul>

      <h2>What you can expect</h2>
      <p>
        We will confirm that we received your report, keep you informed while
        we fix the issue, and credit you if you wish. We will not pursue legal
        action against anyone who reports in good faith and follows this page.
      </p>
    </ProsePage>
  );
}
