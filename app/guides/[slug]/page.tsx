import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide } from "@/lib/guides";

function formatDate(raw: string): string {
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: `${guide.title} — Rizwan Mahmood`,
    description: guide.excerpt || undefined,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <section style={{ padding: "7rem 0 5rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.75rem",
              color: "var(--faint)",
              letterSpacing: "0.06em",
            }}
          >
            {formatDate(guide.date)}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: 1.15,
              color: "var(--ink)",
              margin: "0.5rem 0 0",
            }}
          >
            {guide.title}
          </h1>
        </div>

        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "var(--shadow)",
            background: "#fff",
          }}
        >
          <iframe
            src={`/guides/${guide.slug}.html`}
            title={guide.title}
            style={{ width: "100%", minHeight: "70vh", border: "none", display: "block" }}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/guides" className="btn-ghost">
            View All Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
