# riz-web

The source of **[aiwithriz.com](https://aiwithriz.com)** — Rizwan Mahmood's personal site. Next.js App Router, TypeScript, deployed on Vercel.

## Deployment

| | |
|---|---|
| Production branch | **`main`** |
| Live domains | `aiwithriz.com`, `www.aiwithriz.com` |
| Vercel project | deployment URLs are `riz-web-*.vercel.app`, team `with-sochs-projects` |
| Preview | every other branch and PR builds a preview automatically |

Pushing to `main` deploys to production. Nothing else does.

> **If a push to `main` doesn't reach the live site,** check Vercel → Settings → Git → **Production Branch**. Renaming a Git branch does not update that field, so it can end up pointing at a branch that no longer exists — at which point every push silently builds as a *Preview* and production freezes on its last good deploy. This has bitten this repo once already.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint
```

## Routes

```
/                        /services                 /guides
/about                   /services/consulting      /guides/[slug]
/booking                 /services/projects        /blog
/case-studies            /services/speaking        /writing
```

Plus `app/api/writing-posts` — a JSON endpoint the homepage calls to refresh the writing list client-side.

## Type system

Three faces, loaded via `next/font/google` in `app/layout.tsx` and consumed through CSS custom properties:

| Role | Font | Variable |
|---|---|---|
| Display — all headings | **Archivo** | `--font-display` |
| Body — copy, buttons, lists | **Inter Tight** | `--font-body` |
| Mono — figures, labels, dates | **IBM Plex Mono** | `--font-mono` |

**Watch out:** a lot of declarations still use older variable names — `--font-playfair`, `--font-fraunces`, `--font-inter-tight`, `--font-montserrat`, `--font-dm-sans`, `--font-geist-mono`, `--font-dm-mono`, `--font-bebas`. Those fonts are **not** loaded any more. Each name is aliased to one of the three roles in `app/globals.css`, so the names are historical labels, not the font in use. Map by **role**, not by name — `--font-inter-tight`, despite the name, resolves to the *display* face.

### Size rule

Every `font-size` in `app/` and `components/` follows: **minimum 14px, rounded up to the next even number.** The ladder actually in use is:

`14, 16, 18, 20, 22, 24, 26, 28, 32, 34, 36, 40, 42, 44, 48, 52, 56` — plus `110, 168, 220` for display numerals.

Nothing below 14, nothing odd, no fractional sizes. Keep new work on that ladder.

**Exception:** `public/guides/guide-styles.css` styles the standalone guide HTML files, which are served as static assets rather than rendered by the app. It runs its own scale (`0.88rem`, `0.98rem`, `1.05rem`, `1.1rem`, `1.3rem`, `1.9rem`) and is not covered by the rule.

Sizes are declared four different ways — CSS `font-size`, `clamp()`, inline `fontSize: "14px"`, and bare numeric `fontSize: 14` (React appends `px` itself). Any sweep over sizes has to cover all four or it will miss some.

## Colour tokens

Defined in `:root` in `app/globals.css`. Contrast is against white unless noted.

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--ink` | `#22332C` | headings, emphasis | 13.3 |
| `--body` | `#333333` | body copy | 12.6 |
| `--ink2` | `#3C4642` | secondary text | 9.8 |
| `--muted` | `#55514A` | small labels, meta | 7.9 |
| `--faint` | `#5E594E` | dates, fine print | 7.0 |
| `--coral` | `#EA6A47` | accents, CTAs | 3.2 |
| `--amber` | `#D79A36` | occasional accent | 2.45 |

Note the direction trap: on the dark `--ink` blocks, "fainter" means *lighter*, not darker. Darkening a grey that sits on a dark ground collapses its contrast rather than improving it.

The oranges sit below WCAG AA deliberately — a product decision, not an oversight. Don't "fix" them without asking.

Text colours written as `rgba(34,51,44,α)` are floored at **α 0.72**, which lands around 5:1 on both white and cream. Note that a contrast audit reading `rgba()` as if it were opaque will report these as passing when they aren't — composite against the real background.

## Where content comes from

| Section | Source |
|---|---|
| Writing / blog | Substack RSS via `lib/substack.ts`, refreshed through `app/api/writing-posts` |
| Guides | Standalone HTML files in `public/guides/`, indexed at runtime by `lib/guides.ts` (it reads the directory, so filenames never appear in code) |
| Case studies | Hard-coded in `components/FeaturedCaseStudies.tsx` and `app/case-studies/page.tsx` |
| Numbers, timeline, testimonials | Hard-coded in `app/page.tsx` |

## Booking

Every "Book a call" trigger on the site renders through **`CalBookingButton`** (`components/CalModal.tsx`) — 9 call sites across 7 files. Nothing links to cal.com or `/booking` directly. Change the booking behaviour in one place.

The call is **60 minutes at $140**, stated on the hero CTA, the booking card, the homepage trust line, the `/booking` page description and the FAQ copy. Keep those in step.

## Sounds

`lib/sounds.ts` synthesises small UI sounds with Web Audio — no audio files, so nothing to load and nothing to 404:

- `playPopSound()` — the booking CTAs (420→900 Hz with a 1320 Hz sparkle)
- `playToggleSound()` — the manual/automated switch in the workflow demo (520→880 Hz)

One shared `AudioContext`, created lazily inside the click that first needs it because the autoplay policy demands it, everything in `try/catch` so audio can never interfere with a booking, and silent for `prefers-reduced-motion`.

The separate `<audio>` player for the portrait track is unrelated — see `contexts/audio-context.tsx`.

## Layout

```
app/          routes, plus globals.css (tokens, most component CSS)
components/   shared UI
contexts/     audio-context.tsx — the portrait track player
hooks/        useParallax.ts
lib/          guides.ts, substack.ts, sounds.ts
public/       images, videos, audio, logos, guides/*.html
references/   old HTML design prototypes, kept for reference; not built or served
design.md     generated inventory of tokens as they appear in the code
CV-AUDIT.md   what was checked against the CV, what was fixed, what is still open
```

## Known issues

- **`/services` hub diagram** — `components/ServicesHubDiagram.tsx` renders a 588-unit viewBox into a ~300px box, so its SVG labels come out at **5.4px** and its centre text at **7.4px** on screen. This is the only text on the site below the 14px floor. SVG `font-size` is in user units, so the size rule above does not catch it; fixing it means resizing the graphic.
- **`components/faq-section.tsx` is imported nowhere** and renders on no page. It holds real FAQ copy, including pricing, so it is kept rather than deleted — but it is invisible to visitors. Worth publishing or removing deliberately.
- **`public/videos` is 109MB committed to git** (one file is 49MB), which is most of the ~144MB clone. All 7 videos are genuinely used. Moving them to Vercel Blob or another CDN would make the repo far cheaper to clone and deploy.
- **`public/Photos/riz-vespa.jpg`** (2MB) is referenced nowhere.
- **`AGENTS.md`** claims this is a Next.js version whose APIs differ from what a model was trained on and tells agents to read `node_modules/next/dist/docs/` first. It is standard Next.js — treat that file's advice with suspicion rather than following it blindly.
- **`CV-AUDIT.md`** still lists open questions about claims on the site that were never resolved.
