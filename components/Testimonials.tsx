"use client";
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";

export type Testimonial = {
  id: string;
  name: string;
  roleLine: string;
  quote: string;
  initials: string;
  avatarUrl?: string;
  /** True until this is swapped for a real client quote. Not shown in the UI — internal tracking only. */
  isPlaceholder?: boolean;
};

// Placeholder quotes — swap for real ones before shipping.
// avatarUrl entries are AI-generated placeholder faces; swap for real client photos later.
export const testimonials: Testimonial[] = [
  {
    id: "automation-delivery",
    name: "Amara Whitfield",
    roleLine: "Founder, B2B SaaS",
    quote:
      "Riz didn't just wire up automations — he made us rebuild how we thought about the whole sales pipeline first. That's the part that actually stuck.",
    initials: "AW",
    avatarUrl: "/images/testimonials/amara.jpg",
    isPlaceholder: true,
  },
  {
    id: "ops-clarity",
    name: "Daniel Okafor",
    roleLine: "Head of Ops, logistics scale-up",
    quote:
      'We\'d tried three other "AI consultants" before Riz. He was the first one who asked about our process before touching a single tool.',
    initials: "DO",
    avatarUrl: "/images/testimonials/daniel.jpg",
    isPlaceholder: true,
  },
  {
    id: "workshops",
    name: "Priya Nathan",
    roleLine: "COO, recruitment agency",
    quote:
      "The workshop paid for itself in the first week — my team stopped treating AI like a toy and started treating it like leverage.",
    initials: "PN",
    avatarUrl: "/images/testimonials/priya.jpg",
    isPlaceholder: true,
  },
  {
    id: "advisory",
    name: "Marcus Feldt",
    roleLine: "Managing Partner, law firm",
    quote:
      "Straightforward, no-nonsense advisory. Riz told us what wouldn't work before we spent a cent building it.",
    initials: "MF",
    avatarUrl: "/images/testimonials/marcus.jpg",
    isPlaceholder: true,
  },
];

export const trustedCompanies = ["Careem", "Bolt", "Wise"];

function Avatar({
  initials,
  avatarUrl,
  name,
  size,
}: {
  initials: string;
  avatarUrl?: string;
  name: string;
  size: number;
}) {
  const [errored, setErrored] = useState(false);

  const avatarInner =
    avatarUrl && !errored ? (
      <img
        src={avatarUrl}
        alt={name}
        className="testimonials-avatar-photo"
        style={{ width: size, height: size }}
        onError={() => setErrored(true)}
      />
    ) : (
      <div
        className="testimonials-avatar"
        style={{ width: size, height: size, fontSize: Math.round(size * 0.32) }}
      >
        {initials}
      </div>
    );

  return (
    <span className="testimonials-avatar-wrap" style={{ width: size, height: size }}>
      {avatarInner}
    </span>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="testimonials-card">
      <span className="testimonials-card-mark" aria-hidden="true">&ldquo;</span>
      <p className="testimonials-card-quote">{t.quote}</p>
      <div className="testimonials-author">
        <Avatar initials={t.initials} avatarUrl={t.avatarUrl} name={t.name} size={36} />
        <div>
          <div className="testimonials-author-name">{t.name}</div>
          <div className="testimonials-author-role">{t.roleLine}</div>
        </div>
      </div>
    </div>
  );
}

type TestimonialsSectionProps = {
  /** "full" = featured pull-quote + 3-col grid + trust strip. "compact" = 2-card grid only. */
  variant?: "full" | "compact";
  heading: React.ReactNode;
  headingStyle?: React.CSSProperties;
  background?: string;
};

export default function TestimonialsSection({
  variant = "full",
  heading,
  headingStyle,
  background = "#F3ECDD",
}: TestimonialsSectionProps) {
  const featured = variant === "full" ? testimonials[0] : null;
  const gridItems = variant === "full" ? testimonials.slice(1) : testimonials.slice(0, 2);
  const gridBaseDelay = featured ? 220 : 120;

  return (
    <section
      className="testimonials-section"
      style={{ background, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="max-w-site">
        <AnimateIn>
          <h2 style={{ marginBottom: variant === "full" ? 48 : 36, maxWidth: 640, ...headingStyle }}>
            {heading}
          </h2>
        </AnimateIn>

        {featured && (
          <AnimateIn delay={120}>
            <div className="testimonials-featured">
              <span className="testimonials-featured-mark" aria-hidden="true">&ldquo;</span>
              <p className="testimonials-featured-quote">{featured.quote}</p>
              <div className="testimonials-author">
                <Avatar
                  initials={featured.initials}
                  avatarUrl={featured.avatarUrl}
                  name={featured.name}
                  size={48}
                />
                <div>
                  <div className="testimonials-author-name">{featured.name}</div>
                  <div className="testimonials-author-role">{featured.roleLine}</div>
                </div>
              </div>
            </div>
          </AnimateIn>
        )}

        <div className={`testimonials-grid${variant === "compact" ? " compact" : ""}`}>
          {gridItems.map((t, i) => (
            <AnimateIn key={t.id} delay={gridBaseDelay + i * 80}>
              <TestimonialCard t={t} />
            </AnimateIn>
          ))}
        </div>

        {variant === "full" && (
          <AnimateIn delay={gridBaseDelay + gridItems.length * 80}>
            <div className="testimonials-strip">
              <p className="testimonials-strip-label">
                Trusted by operators from{" "}
                <span className="testimonials-strip-companies">{trustedCompanies.join(" · ")}</span>
              </p>
              <p className="testimonials-strip-note">
                Companies Riz has worked at — background, not client logos.
              </p>
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
