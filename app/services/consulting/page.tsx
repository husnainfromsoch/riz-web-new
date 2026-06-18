"use client";
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const formats = [
  {
    title: "Strategy sessions",
    body: "90 minutes, recorded, actioned. We name the problem and leave with a clear direction.",
  },
  {
    title: "Fractional ops",
    body: "1–2 days per week, embedded in your team. I run ops alongside you, not for you.",
  },
  {
    title: "Advisory retainer",
    body: "Monthly, async-first. I'm in your corner when you need a clear head on hard decisions.",
  },
];

export default function ConsultingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>Consulting &amp; coaching</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "1.25rem",
                maxWidth: 580,
              }}
            >
              Clarity before systems.
            </h1>
          </AnimateIn>
          <AnimateIn delay={180}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.1rem",
                color: "var(--body)",
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              I work with founders and ops leads who know something is wrong but can&apos;t quite name it. We name it together. Then we fix it.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* FORMATS */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "2.5rem",
              }}
            >
              What this looks like.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-5">
            {formats.map((f, i) => (
              <AnimateIn key={f.title} delay={i * 120}>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "2rem",
                    background: "#fff",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.15rem",
                      color: "var(--ink)",
                      fontWeight: 700,
                      marginBottom: "0.65rem",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.9rem",
                      color: "var(--body)",
                      lineHeight: 1.7,
                    }}
                  >
                    {f.body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={400}>
            <div
              style={{
                marginTop: "2.5rem",
                padding: "1.5rem 2rem",
                background: "var(--cream)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "0.75rem",
                  color: "var(--coral)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Pricing
              </span>
              <span
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.1rem",
                  color: "var(--ink)",
                  fontWeight: 600,
                }}
              >
                From $160/hr · Retainers from $2,400/mo
              </span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <div style={{ maxWidth: 600 }}>
            <AnimateIn>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                  color: "var(--ink)",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                }}
              >
                Tell me what&apos;s broken.
              </h2>
            </AnimateIn>
            <AnimateIn delay={80}>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "1rem",
                  color: "var(--muted)",
                  marginBottom: "2rem",
                }}
              >
                I&apos;ll reply within 48 hours. If there&apos;s a fit, we&apos;ll book a call.
              </p>
            </AnimateIn>
            <AnimateIn delay={150}>
              {submitted ? (
                <div
                  style={{
                    padding: "2rem",
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.2rem",
                      color: "var(--coral)",
                      fontWeight: 600,
                    }}
                  >
                    Got it. Talk soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (name && email && problem) setSubmitted(true); }}
                  style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  {[
                    { label: "Name", value: name, setter: setName, type: "text", placeholder: "Your name" },
                    { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "your@email.com" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          display: "block",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          border: "1px solid var(--line-2)",
                          borderRadius: 6,
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.95rem",
                          color: "var(--ink)",
                          background: "#fff",
                          outline: "none",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      What&apos;s the problem?
                    </label>
                    <textarea
                      placeholder="Describe what's eating your time or breaking down..."
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      required
                      rows={5}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid var(--line-2)",
                        borderRadius: 6,
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.95rem",
                        color: "var(--ink)",
                        background: "#fff",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn-coral">Send →</button>
                  </div>
                </form>
              )}
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
