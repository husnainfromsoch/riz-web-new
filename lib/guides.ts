import fs from "fs";
import path from "path";

export type GuideMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail?: string;
};

const GUIDES_DIR = path.join(process.cwd(), "public", "guides");
const SLUG_PATTERN = /^[a-z0-9-]+$/;

function extractTag(html: string, pattern: RegExp): string {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

function parseGuide(slug: string, html: string): GuideMeta {
  const title = extractTag(html, /<title>([^<]*)<\/title>/i) || slug;
  const excerpt = extractTag(html, /<meta\s+name=["']guide-excerpt["']\s+content=["']([^"']*)["']/i);
  const date = extractTag(html, /<meta\s+name=["']guide-date["']\s+content=["']([^"']*)["']/i);
  const thumbnail = extractTag(html, /<img[^>]+src=["']([^"']+)["']/i) || undefined;

  return { slug, title, excerpt, date, thumbnail };
}

export function getAllGuides(): GuideMeta[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];

  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".html"))
    .map((file) => {
      const slug = file.replace(/\.html$/, "");
      const html = fs.readFileSync(path.join(GUIDES_DIR, file), "utf-8");
      return parseGuide(slug, html);
    });
}

export function getGuide(slug: string): GuideMeta | null {
  if (!SLUG_PATTERN.test(slug)) return null;

  const filePath = path.join(GUIDES_DIR, `${slug}.html`);
  if (!fs.existsSync(filePath)) return null;

  const html = fs.readFileSync(filePath, "utf-8");
  return parseGuide(slug, html);
}
