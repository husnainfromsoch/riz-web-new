import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import { ArrowIcon, BookIcon } from "./icons";

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

export default function GuideCard({ guide }: { guide: GuideMeta }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="gd-card-link">
      <article className="gd-card">
        <div className="gd-card-thumb">
          {guide.thumbnail ? (
            <img src={guide.thumbnail} alt="" className="gd-card-thumb-img" />
          ) : (
            <div className="gd-card-thumb-fallback">
              <BookIcon size={32} />
            </div>
          )}
          <span className="guide-badge gd-card-badge">{guide.category}</span>
        </div>

        <div className="gd-card-body">
          <h3 className="gd-card-title">{guide.title}</h3>

          {guide.excerpt && <p className="gd-card-excerpt">{guide.excerpt}</p>}

          <span className="gd-card-meta">
            {formatDate(guide.date)} · {guide.readingTime} min read
          </span>

          <span className="gd-card-read">
            Read guide <ArrowIcon size={13} />
          </span>
        </div>
      </article>
    </Link>
  );
}
