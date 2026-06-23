import { Suspense } from "react";
import { XMLParser } from "fast-xml-parser";
import AnimateIn from "@/components/AnimateIn";
import WritingClient, { type Post } from "./WritingClient";

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://conversationswithriz.substack.com/feed", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      cdataPropName: "__cdata",
      allowBooleanAttributes: true,
    });
    const parsed = parser.parse(xml);
    const raw = parsed?.rss?.channel?.item ?? [];
    const items: unknown[] = Array.isArray(raw) ? raw : [raw];

    return items.map((item) => {
      const i = item as Record<string, unknown>;
      const descField = i.description as Record<string, unknown> | string | undefined;
      const descRaw =
        typeof descField === "object" && descField !== null
          ? String((descField as Record<string, unknown>).__cdata ?? "")
          : String(descField ?? "");
      const excerpt = descRaw
        .replace(/<[^>]*>/g, "")
        .replace(/&[a-z#0-9]+;/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 200);

      const enclosure = i.enclosure as Record<string, unknown> | undefined;
      const mediaContent = i["media:content"] as Record<string, unknown> | undefined;
      const thumbnail =
        (enclosure?.["@_url"] as string | undefined) ??
        (mediaContent?.["@_url"] as string | undefined);

      const titleField = i.title as Record<string, unknown> | string | undefined;
      const title =
        typeof titleField === "object" && titleField !== null
          ? String((titleField as Record<string, unknown>).__cdata ?? "")
          : String(titleField ?? "");

      return {
        title,
        link: String(i.link ?? ""),
        pubDate: String(i.pubDate ?? ""),
        excerpt,
        thumbnail,
      };
    });
  } catch {
    return [];
  }
}

async function PostsFetcher() {
  const posts = await getPosts();
  return <WritingClient posts={posts} />;
}

function PostsSkeleton() {
  return (
    <section style={{ padding: "4rem 0 5rem" }}>
      <div className="max-w-site">
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            height: 46,
            borderRadius: 8,
            background: "var(--cream)",
            marginBottom: "2.5rem",
            animation: "shimmer 1.4s ease-in-out infinite",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                border: "1px solid var(--line)",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "var(--cream)",
                  animation: "shimmer 1.4s ease-in-out infinite",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div
                  style={{
                    height: 10,
                    width: "35%",
                    borderRadius: 4,
                    background: "var(--cream)",
                    animation: "shimmer 1.4s ease-in-out infinite",
                    animationDelay: `${i * 0.1 + 0.1}s`,
                  }}
                />
                <div
                  style={{
                    height: 16,
                    width: "90%",
                    borderRadius: 4,
                    background: "var(--cream)",
                    animation: "shimmer 1.4s ease-in-out infinite",
                    animationDelay: `${i * 0.1 + 0.15}s`,
                  }}
                />
                <div
                  style={{
                    height: 16,
                    width: "75%",
                    borderRadius: 4,
                    background: "var(--cream)",
                    animation: "shimmer 1.4s ease-in-out infinite",
                    animationDelay: `${i * 0.1 + 0.2}s`,
                  }}
                />
                <div
                  style={{
                    height: 12,
                    width: "55%",
                    borderRadius: 4,
                    background: "var(--cream)",
                    animation: "shimmer 1.4s ease-in-out infinite",
                    animationDelay: `${i * 0.1 + 0.25}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WritingPage() {
  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 60, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>
              05 · WRITING
            </p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Things I&rsquo;ve thought about long enough to write down.
            </h1>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.05rem",
                color: "var(--body)",
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              Essays, observations, and dispatches from someone who thinks too much about how work actually works.
            </p>
          </AnimateIn>
        </div>
      </section>

      <Suspense fallback={<PostsSkeleton />}>
        <PostsFetcher />
      </Suspense>
    </>
  );
}
