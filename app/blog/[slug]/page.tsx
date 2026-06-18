import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import SubscribeBox from "@/components/SubscribeBox";

const posts: Record<string, {
  title: string;
  date: string;
  tag: string;
  readTime: string;
  lead: string;
  body: { type: "p" | "h2" | "blockquote"; text: string }[];
}> = {
  "just-add-ai": {
    title: '"Just add AI" is the new "just add blockchain"',
    date: "June 2026",
    tag: "Opinion",
    readTime: "5 min",
    lead: "Every few years, a technology arrives that everyone agrees will change everything. And every few years, the same mistake gets made with it.",
    body: [
      {
        type: "p",
        text: "The mistake isn't adopting the technology too early. It's bolting it onto a broken process and expecting it to fix things. AI is the latest victim of this pattern. You can hear it in every pitch deck: 'We're adding AI to our workflow.' Full stop. No mention of what the workflow is. No mention of what problem it's solving. Just: AI.",
      },
      {
        type: "h2",
        text: "The blockchain playbook, repeated",
      },
      {
        type: "p",
        text: "We watched this happen with blockchain. Every company was adding it — not because they had a problem that decentralised ledgers solved, but because it sounded like progress. Most of those implementations quietly died. The underlying processes were broken. Blockchain just made them harder to maintain.",
      },
      {
        type: "blockquote",
        text: "A slow, broken process with AI bolted on is just a faster, more expensive broken process.",
      },
      {
        type: "h2",
        text: "What actually works",
      },
      {
        type: "p",
        text: "The companies I've watched use AI well did something boring first: they got clear on what they were trying to do. Not 'add AI' — actually improve a specific outcome. Then they designed a process that made sense. Then, and only then, did they look at what tools could support it.",
      },
      {
        type: "p",
        text: "The order matters. Tool → process is backwards. Process → tool is how you build something that survives.",
      },
    ],
  },
  "automation-write-month": {
    title: "I let an automation write for a month. Here's what broke.",
    date: "May 2026",
    tag: "Field notes",
    readTime: "6 min",
    lead: "The pipeline ran beautifully. The thinking behind it didn't. A story about where the human still matters.",
    body: [
      {
        type: "p",
        text: "In March I handed my content pipeline over entirely to automation. Five n8n workflows: research, draft, illustrate, format, publish. Monday to Friday, no human in the loop. By the end of April, I had learned something uncomfortable.",
      },
      {
        type: "h2",
        text: "What ran fine",
      },
      {
        type: "p",
        text: "The operational stuff worked perfectly. Posts went out on schedule. Images were generated and attached. The formatting was consistent. The pipeline did exactly what it was designed to do.",
      },
      {
        type: "h2",
        text: "What quietly broke",
      },
      {
        type: "blockquote",
        text: "The machine optimised for output. It had no way to optimise for truth.",
      },
      {
        type: "p",
        text: "Without a human in the loop, the content started to drift toward confident generality. Things that sounded right without being earned. The automation had no skin in the game. I did. And I'd removed myself from the process.",
      },
      {
        type: "p",
        text: "I'm back in the loop now. The automation handles the work I don't need to do. The judgment calls — what to say, whether it's honest, whether it's worth saying — those stay human.",
      },
    ],
  },
  "boring-part-matters": {
    title: "The boring part is the part that matters",
    date: "May 2026",
    tag: "Operations",
    readTime: "7 min",
    lead: "Ten years of scaling ops taught me the unglamorous truth about what actually compounds.",
    body: [
      {
        type: "p",
        text: "Nobody writes about the boring parts of operations. They write about the launches, the pivots, the crises. But operations is mostly the boring stuff — and the boring stuff is where everything either holds or falls apart.",
      },
      {
        type: "h2",
        text: "What I mean by boring",
      },
      {
        type: "p",
        text: "Documentation. Consistent handoffs. The fifteen-minute standup that actually happens every day. The process for onboarding that takes three weeks to write and saves three months of confusion every time. None of this is interesting to talk about. All of it compounds.",
      },
      {
        type: "blockquote",
        text: "The unsexy stuff is the infrastructure. Everything exciting is built on top of it.",
      },
      {
        type: "h2",
        text: "Why teams skip it",
      },
      {
        type: "p",
        text: "Because it doesn't feel like progress. Writing the third version of an onboarding doc feels like admin, not momentum. But the teams I watched scale were the ones who treated the boring parts as first-class work. They hired for it, protected time for it, and refused to let 'we'll document it later' become the default.",
      },
    ],
  },
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="max-w-site text-center">
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "2rem",
              color: "var(--ink)",
            }}
          >
            Post not found.
          </h1>
          <Link href="/blog" className="btn-coral" style={{ display: "inline-block", marginTop: "2rem" }}>
            ← Back to writing
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* HEADER */}
      <section style={{ paddingTop: 120, paddingBottom: 60, background: "var(--cream-2)" }}>
        <div className="max-w-site" style={{ maxWidth: 720 }}>
          <AnimateIn>
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "var(--muted)",
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "1.75rem",
              }}
            >
              ← Writing
            </Link>
          </AnimateIn>
          <AnimateIn delay={80}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span className="tag-pill">{post.tag}</span>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "0.72rem",
                  color: "var(--faint)",
                }}
              >
                {post.date} · {post.readTime} read
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                lineHeight: 1.2,
                color: "var(--ink)",
                fontWeight: 700,
              }}
            >
              {post.title}
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* BODY */}
      <section style={{ padding: "4rem 0 2rem" }}>
        <div className="max-w-site" style={{ maxWidth: 720 }}>
          <AnimateIn>
            {/* Lead paragraph */}
            <p
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
                color: "var(--body)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {post.lead}
            </p>

            {/* Body blocks */}
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                      color: "var(--ink)",
                      fontWeight: 700,
                      margin: "2.5rem 0 1rem",
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "blockquote") {
                return (
                  <blockquote
                    key={i}
                    style={{
                      borderLeft: "3px solid var(--coral)",
                      paddingLeft: "1.5rem",
                      margin: "2rem 0",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                        fontStyle: "italic",
                        color: "var(--ink)",
                        lineHeight: 1.7,
                      }}
                    >
                      {block.text}
                    </p>
                  </blockquote>
                );
              }
              return (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.85,
                    marginBottom: "1.5rem",
                  }}
                >
                  {block.text}
                </p>
              );
            })}
          </AnimateIn>

          <AnimateIn delay={200}>
            <SubscribeBox />
          </AnimateIn>

          <AnimateIn delay={300}>
            <div
              style={{
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Link
                href="/blog"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                ← Back to writing
              </Link>
              <Link
                href="/services/consulting"
                className="btn-coral"
                style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}
              >
                Work with me →
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return [
    { slug: "just-add-ai" },
    { slug: "automation-write-month" },
    { slug: "boring-part-matters" },
  ];
}
