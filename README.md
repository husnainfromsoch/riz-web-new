# aiwithriz.com

Personal site for **Rizwan Mahmood** — operator, builder, Tallinn.
Next.js (App Router, TypeScript), deployed on Vercel.

---

## ⚠️ You are looking at the wrong branch

**`main` is not the site.** It is a stale `create-next-app` skeleton — its
`public/` holds nothing but the default SVGs.

**The live site is on [`v2.1`](../../tree/v2.1).** Branch off `v2.1`, not `main`.

This matters: a shallow clone of the default branch shows an almost-empty
`public/` and makes it look like this repo isn't the live site. It is.

## Branches

| Branch | What it is |
|---|---|
| **`v2.1`** | **Production → aiwithriz.com** |
| `fix/cv-accuracy` | Corrections against the Sep 2026 CV + `CV-AUDIT.md`. Ready to merge |
| `v3-fonts` | `fix/cv-accuracy` + the design preview's type stack (Archivo / Inter Tight / IBM Plex Mono). Colours and animations unchanged |
| `preview/v2-dskin` | Homepage design preview at `public/preview/v2.html`. Experimental |
| `fix/cal-link-guides` | Cal link fix |
| `about-font-preview` | Font experiment on `/about` |
| `services-font-preview` | Font experiment on `/services` |
| `main` | This stale skeleton. Do not build on it |
| `experiment` | Scratch |

## Fonts

`app/layout.tsx` loads the typefaces; `app/globals.css` then aliases eight
legacy variable names onto them, so no selector has to change when the stack
does. **Map by role, not by name** — `--font-inter-tight` is the *display* face
in the components (28 declarations including `.hz-headline`), not the body face.

| Role | Legacy variables | `v2.1` | `v3-fonts` |
|---|---|---|---|
| Display | `--font-inter-tight`, `--font-fraunces`, `--font-playfair`, `--font-bebas` | Poppins | Archivo |
| Body | `--font-montserrat`, `--font-dm-sans` | Poppins | Inter Tight |
| Mono | `--font-geist-mono`, `--font-dm-mono` | Poppins | IBM Plex Mono |

On `v2.1` every alias points at Poppins, so the whole site is Poppins despite
the naming. `/guides` additionally loads Caveat for handwriting, independently.

Watch for declarations written as `'Inter Tight', var(--font-inter-tight)` —
literal first means they ignore the variable entirely.

## Deploying

Vercel project **`riz-web`**. Every branch push gets a preview deployment
automatically; only `v2.1` is attached to the domain. Pushing to any other
branch cannot affect the live site.

To try something: branch off `v2.1`, push, open the preview URL Vercel posts
back to the commit.

## Routes

```
/                    homepage
/about               bio and timeline
/services            + /consulting, /projects, /speaking
/case-studies        filterable
/blog        /blog/[slug]
/guides
```

## Local development

```bash
git checkout v2.1
npm install
npm run dev          # http://localhost:3000
```

## Content notes

- Writing is sourced from Substack (*Conversations with Riz*).
- Case studies are unattributed by design — client work is under NDA.
- `byTheNumbersRows` in `app/page.tsx` is the credentials strip. Keep it matched
  to the CV; see `CV-AUDIT.md` on `fix/cv-accuracy` for the last full check and
  the open questions.
- `public/preview/` holds static single-file mock-ups. They are plain HTML in
  `public/`, share nothing with the app, and carry `noindex`.
