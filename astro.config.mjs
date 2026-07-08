import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://bac-company-profile.vercel.app",
  integrations: [sitemap()],
});
