# The Talk Therapy — Visual Redesign Spec

## Purpose

Transform thetalktherapy.vercel.app from a generic wellness blog template into a serif editorial content hub that feels like a literary magazine. The therapy agent auto-publishes articles daily; the site should make those articles feel like essays worth reading.

## Scope

Three templates, one stylesheet, no framework change.

### Out of scope

- CMS/admin, dynamic server-side rendering
- Article authoring UI (handled by `blog-publish.py` pipeline)
- Podcast player embed (link out to Podbean)
- About/Resources/Contact pages (cut for now)

## Visual Identity

| Element | Current | New |
|---------|---------|-----|
| Headings | Inter (sans-serif) | Lora (serif, Google Fonts) |
| Body text | Inter 400 | Inter 400 (unchanged) |
| Icons | Emoji (brain, speech bubble, plant) | Removed — typography does the work |
| Article images | Gradient placeholder divs | Removed — no images, pure editorial |
| Color palette | cream/sage/peach/warm-gray | Same palette, used more deliberately |
| Logo | "The Talk Therapy" + speech bubble emoji | Wordmark only, letterspaced uppercase |
| Cards | White rounded cards with borders + hover lift | Flat — separated by horizontal rules, no boxes |
| Overall feel | Generic wellness template | Aeon meets Headspace — literary, warm, elevated |

### Palette (unchanged)

- `--color-cream: #FFF8F0` (background)
- `--color-sage: #C8D8C8` (accent sections, podcast bar)
- `--color-peach: #FFD8C8` (CTAs, category pills)
- `--color-warm-gray: #E8E0D8` (dividers, borders)
- `--color-dark-gray: #5A5A5A` (headings)
- `--color-text: #333` (body)
- `--color-text-light: #666` (meta text)

### Typography

- Headings: `'Lora', Georgia, serif` — weights 400, 600
- Body/UI: `'Inter', -apple-system, sans-serif` — weights 300, 400, 500, 600
- Article body: 17px, line-height 1.8, max-width 680px

## Pages

### 1. Homepage (`index.html`) — Magazine Front Page

**Nav**: Sticky cream bar with backdrop blur. Letterspaced uppercase wordmark ("THE TALK THERAPY") left. "Articles" link right. No hamburger on mobile — just wordmark + Articles link.

**Featured Article**: Full-width block below nav. Small "FEATURED" label (uppercase, letterspaced, muted). Large Lora serif title (2.5rem desktop / 1.75rem mobile). Excerpt paragraph in Inter. Read time in muted text. Links to the article page.

**Divider**: 1px warm-gray horizontal rule.

**Recent Articles**: Two-column grid on desktop (min 350px columns), single column on mobile. Each entry: serif title + meta line (category · read time · date). Separated by horizontal rules. No cards, no images.

**Podcast Bar**: Sage background, rounded corners. Microphone SVG icon + "Latest Episode" label + episode title + duration + "Listen →" link to Podbean. Full-width.

**Social Presence**: Subtle line below the nav or above the footer: "Podcast · Bluesky · YouTube · TikTok" as small linked text. YouTube/TikTok links hidden via CSS until they go live (toggle with a CSS variable or class).

**Newsletter Section**: Sage background, centered. Lora serif heading "Stay Connected". Brief copy. Email input + peach subscribe button. Privacy note.

**Footer**: Minimal — copyright "© 2026 The Talk Therapy", privacy/terms links, social icon row (Bluesky, Podbean, YouTube, TikTok — same hide logic for inactive ones).

### 2. Articles Archive (`articles/index.html`)

**Header**: "Articles" in large Lora serif. Category filter pills below (Mental Health, Self-Care, Relationships, Personal Growth) in peach/sage. Pills toggle active state to filter the list.

**Article List**: Chronological, newest first. Each entry: serif title, one-line excerpt in muted text, meta (category pill · date · read time). Separated by horizontal rules. No cards, no images.

**Pagination**: Simple "Older articles →" / "← Newer articles" links at bottom.

### 3. Article Page (`articles/[slug].html`)

**Narrow reading column**: max-width 680px, centered.

**Header**: Category pill (small, uppercase, peach background), article title in large Lora serif (2.25rem), meta line "8 min read · March 10, 2026". Thin sage gradient line separator.

**Body**: Inter 17px, line-height 1.8. Generous paragraph spacing. Pull quotes: indented block with sage left border, italic Lora. Subheadings in Lora serif.

**Article footer**: Thin divider. "Continue Reading" section: 2-3 related article titles + read time. Podcast bar. Newsletter signup.

**No sidebar, no share buttons, no author bio.**

## Technical Approach

- **Stack**: Vite + vanilla HTML/CSS (no change)
- **Fonts**: Add Lora via Google Fonts (`wght@400;600`), keep Inter
- **CSS**: Replace `templates/css/style.css` with new editorial stylesheet. Mobile-first (media queries scale UP).
- **JS**: Minimal — mobile menu toggle (if needed), category filter on archive page, newsletter form handler
- **`blog-publish.py` integration**: Script outputs article content into the article page template. Existing pipeline stays intact. Articles land at `articles/<slug>.html`.
- **Social links**: CSS class `.social-hidden` on inactive platforms (YouTube, TikTok). Remove class when they go live.
- **Deployment**: Same Vercel config, same build process

## Mobile Responsiveness

- **Base**: Single column, 16px body text
- **≥768px**: Two-column article grid on homepage, slightly larger headings
- **≥1024px**: Full desktop layout, 2.5rem featured title, wider container

Nav never collapses to hamburger — only has 1 link ("Articles"), so it always fits.

## Content Pipeline Integration

The `blog-publish.py` script in openclaw-infra handles:
1. Therapy agent writes markdown article
2. Script converts to HTML, generates slug
3. Outputs to `articles/<slug>.html` using article template
4. Updates `articles/index.json` manifest
5. Deploys via Vercel CLI

The redesign provides the templates; the pipeline fills them with content. No pipeline changes needed beyond updating the HTML template that `blog-publish.py` wraps articles in.

## Success Criteria

- Site looks like a curated literary magazine, not a wellness blog template
- Articles feel like essays worth reading
- Podcast is discoverable but doesn't compete with content
- Social links present but not intrusive, easy to activate new platforms
- Fully responsive — reads well on phone
- No empty/placeholder pages
- Existing `blog-publish.py` pipeline works without modification (or minimal template update)
