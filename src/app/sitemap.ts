import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/services", "/assessment", "/industries", "/zero-trust", "/contact", "/privacy", "/responsible-disclosure"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
