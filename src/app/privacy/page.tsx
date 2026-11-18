import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this website collects and how CyberGlyph Security uses it.",
  alternates: { canonical: "/privacy" },
};

// DRAFT: describes what the site does today. Needs review by the client and
// counsel before launch.
export default function PrivacyPage() {
  return (
    <ProsePage title="Privacy">
      <p>This page explains what this website collects and what we do with it.</p>

      <h2>What we collect</h2>
      <p>
        When you send the briefing form, we receive your name, work email,
        company, the service you selected, and any message you wrote. We
        collect nothing else through this site.
      </p>

      <h2>How we use it</h2>
      <p>
        We use those details to reply to your request and to prepare for the
        call. We do not sell your information or share it for advertising.
      </p>

      <h2>Your choices</h2>
      <p>
        To see, correct, or delete what you sent us, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </ProsePage>
  );
}
