import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

const posts: Record<string, { title: string; date: string; readTime: string; tag: string; content: string }> = {
  "why-automation-breaks": {
    title: "Why your automation keeps breaking",
    date: "January 2025",
    readTime: "6 min",
    tag: "Automation",
    content: `The problem is never the tool.

It's the process you encoded into the tool.

I've watched companies spend six figures on automation platforms, hire consultants to implement them, run change management programmes — and still end up with systems that break every other week and cost more to maintain than the people they replaced.

Every time, the diagnosis is the same. The automation was built to mirror an existing process. And the existing process was broken.

**The map is not the territory**

When you sit down to automate something, you typically start with a process document. Or someone describes the process to you. Or you watch someone do it once.

None of these are the process.

The process is what actually happens when things go wrong. When the exception occurs. When the third-party system is down. When the team is understaffed and someone takes a shortcut that became standard practice three years ago and nobody remembers why.

Automating the documented process leaves all of those edge cases to be handled manually — or, worse, to surface as silent errors that nobody notices until three months of data is corrupted.

**Fix the thinking before you automate it**

The right approach is uncomfortable. It requires slowing down before you speed up.

Map what actually happens, not what should happen. Interview the people doing the work. Follow the exceptions. Find the workarounds. Understand why they exist.

Then — only then — design the process you want. And automate that.

It takes longer. It feels less like progress. But it's the only kind of automation that survives contact with reality.`,
  },
  "careem-scaling-ops": {
    title: "What Careem taught me about scaling ops",
    date: "December 2024",
    readTime: "8 min",
    tag: "Operations",
    content: `At 2am in Dubai, watching a system fail in ways nobody predicted, I learned more about operations than any MBA could teach.

The system in question was designed to handle surge demand during Ramadan. We'd stress-tested it. We'd built redundancy. We'd run the numbers.

What we hadn't accounted for was human behaviour at scale.

**What the model missed**

When demand spiked, drivers started clustering in high-demand areas — which was rational at the individual level and catastrophic at the system level. The algorithm was optimising for availability. The drivers were optimising for earnings. Neither model included the other.

This is the thing about scaling: the gaps between your assumptions are where operations actually live.

**The lesson I keep coming back to**

Every time I work with a company on their operations, I ask: what's the thing your system assumes will always be true, that sometimes isn't?

That's where you'll find the 2am problems. And if you find them before 2am, you can usually fix them before they matter.`,
  },
  "ai-adoption-playbook": {
    title: "The AI adoption playbook I wish existed",
    date: "November 2024",
    readTime: "5 min",
    tag: "AI",
    content: `Most AI adoption fails at the same point. Not the technology. Not the budget. The point where someone has to change how they work.

I've seen this pattern so many times it's almost boring to describe. A company invests in an AI tool. The tool works. Adoption is low. The investment is written off as a failed experiment.

But the tool didn't fail. The change management did.

**The mistake everyone makes**

The standard playbook goes: buy tool → train team → measure results.

The actual sequence should be: understand current behaviour → design new behaviour → buy tool that supports it → train team on new behaviour (tool is secondary) → measure results.

Notice what's different? The tool is step three, not step one. And the thing you're training on is the new way of working, not the software.

**What works instead**

Find one team with a clear problem and a leader who's willing to change how they work. Not just willing to try a new tool — willing to change the process.

Build the new process with them. Use the AI tool to support it. When it works, you have a proof point and a template.

Then do it again.

It's slower than a company-wide rollout. It's also the only thing that actually works.`,
  },
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="max-w-site text-center">
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "var(--ink)" }}>
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
                marginBottom: "1.5rem",
              }}
            >
              ← Writing
            </Link>
          </AnimateIn>
          <AnimateIn delay={100}>
            <span className="tag-pill" style={{ marginBottom: "1rem", display: "inline-block" }}>{post.tag}</span>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                lineHeight: 1.25,
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.75rem",
                color: "var(--muted)",
              }}
            >
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section style={{ padding: "4rem 0 6rem" }}>
        <div className="max-w-site" style={{ maxWidth: 720 }}>
          <AnimateIn>
            <div
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.05rem",
                color: "var(--body)",
                lineHeight: 1.85,
              }}
            >
              {post.content.split("\n\n").map((para, i) => {
                if (para.startsWith("**") && para.endsWith("**")) {
                  return (
                    <h2
                      key={i}
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "1.3rem",
                        color: "var(--ink)",
                        fontWeight: 700,
                        margin: "2.5rem 0 1rem",
                      }}
                    >
                      {para.replace(/\*\*/g, "")}
                    </h2>
                  );
                }
                return (
                  <p key={i} style={{ marginBottom: "1.5rem" }}>
                    {para}
                  </p>
                );
              })}
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <div
              style={{
                marginTop: "4rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Link href="/blog" style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.875rem", color: "var(--muted)", textDecoration: "none" }}>
                ← Back to writing
              </Link>
              <Link href="/about" className="btn-coral" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}>
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
    { slug: "why-automation-breaks" },
    { slug: "careem-scaling-ops" },
    { slug: "ai-adoption-playbook" },
  ];
}
