import type { MetadataRoute } from "next";
import { ORG } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${ORG.name} — University Admissions & Distance Education`,
    short_name: ORG.name,
    description: ORG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#007AFF",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
