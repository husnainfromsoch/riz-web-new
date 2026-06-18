"use client";
import { useState } from "react";

export default function SubscribeBox() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        background: "var(--cream)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        padding: "2rem",
        marginTop: "4rem",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "1.2rem",
          color: "var(--ink)",
          fontWeight: 700,
          marginBottom: "0.5rem",
        }}
      >
        Get the thinking, not the noise.
      </h3>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.9rem",
          color: "var(--muted)",
          marginBottom: "1.25rem",
        }}
      >
        Notes on automation, ops, and AI. New posts most weeks.
      </p>
      {submitted ? (
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.9rem",
            color: "var(--coral)",
            fontWeight: 600,
          }}
        >
          You&apos;re in. Talk soon.
        </p>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
          style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              flex: 1,
              minWidth: 200,
              padding: "0.7rem 1rem",
              border: "1px solid var(--line-2)",
              borderRadius: 6,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.9rem",
              color: "var(--ink)",
              background: "#fff",
              outline: "none",
            }}
          />
          <button type="submit" className="btn-coral" style={{ padding: "0.7rem 1.5rem" }}>
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
