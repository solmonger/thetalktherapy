# The Talk Therapy Visual Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the site from a generic wellness template into a serif editorial content hub (magazine front page layout) with mobile-first responsive design.

**Architecture:** Static Vite multi-page build. Three HTML pages (homepage, articles archive, article template) sharing one editorial CSS file. `blog-publish.py` updated to output articles into the new template. Deployed to Vercel.

**Tech Stack:** Vite, vanilla HTML/CSS/JS, Google Fonts (Lora + Inter), Vercel

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `templates/css/style.css` | **Replace** | New editorial stylesheet (mobile-first) |
| `index.html` | **Replace** | Magazine front page homepage |
| `articles.html` | **Create** | Articles archive with category filters |
| `article-template.html` | **Create** | Reference template for article pages (used by blog-publish.py) |
| `templates/js/main.js` | **Replace** | Minimal JS: category filter, newsletter, nav active state |
| `vite.config.js` | **Modify** | Add articles.html as multi-page input |
| `vercel.json` | **Modify** | Fix routing for multi-page (remove SPA catch-all) |
| `scripts/blog-publish.py` (openclaw-infra) | **Modify** | Update HTML_TEMPLATE to match new editorial design |

---

## Chunk 1: Foundation — CSS + Homepage

### Task 1: Replace the stylesheet with editorial design

**Files:**
- Replace: `templates/css/style.css`

- [ ] **Step 1: Write the new editorial stylesheet**

Replace `templates/css/style.css` with the full editorial stylesheet. Mobile-first approach. Key design tokens:

- Palette preserved: cream (#FFF8F0), sage (#C8D8C8), peach (#FFD8C8), warm-gray (#E8E0D8)
- Serif: `'Lora', Georgia, serif` for headings and article titles
- Sans: `'Inter', -apple-system, sans-serif` for UI, body, meta text
- Flat layout: horizontal rules as dividers, no card borders/shadows
- Article body: 17px, line-height 1.8, max-width 680px reading column
- Components: `.featured`, `.article-list`, `.article-grid`, `.article-item`, `.podcast-bar`, `.social-line`, `.newsletter`, `.footer`, `.archive-header`, `.category-filters`, `.category-pill`, `.article-header`, `.article-body`, `.continue-reading`, `.toast`
- Responsive breakpoints: base (mobile), 768px (tablet: two-column article grid), 1024px (desktop: wider container)

See the spec at `docs/superpowers/specs/2026-03-10-thetalktherapy-redesign-design.md` for full details on each component's styling.

- [ ] **Step 2: Verify the file was written correctly**

Run: `wc -l templates/css/style.css` from `~/thetalktherapy`
Expected: ~430 lines

- [ ] **Step 3: Commit**

```bash
git add templates/css/style.css
git commit -m "Replace stylesheet with editorial design system

Mobile-first CSS with Lora serif + Inter sans-serif typography,
flat editorial layout with horizontal rules instead of cards,
cream/sage/peach palette preserved."
```

---

### Task 2: Replace the homepage

**Files:**
- Replace: `index.html`

- [ ] **Step 1: Write the new homepage**

Replace `index.html` with the magazine front page layout. Structure:

1. **`<head>`**: Load Lora + Inter from Google Fonts, link to `/templates/css/style.css`
2. **`nav.navbar`**: Sticky. `a.logo` = "THE TALK THERAPY" (letterspaced uppercase). `div.nav-menu` with single `a.nav-link` to `/articles.html`.
3. **`section.featured`**: `div.featured-label` ("Featured"), `h1.featured-title` wrapping an `<a>` to the article, `p.featured-excerpt`, `div.featured-meta` (category, read time).
4. **`hr.divider`**
5. **`section.article-list`**: `div.article-list-header` ("Recent"), `div.article-grid` containing 2 `div.article-item` elements (each has `h2.article-item-title > a`, `div.article-item-meta`). `a.view-all` ("All articles →") linking to `/articles.html`.
6. **`div.podcast-bar`**: Sage background, microphone SVG, label, episode text, "Listen →" link to Podbean.
7. **`div.social-line`**: Links to Podcast and Bluesky separated by `span.separator`. YouTube and TikTok links wrapped in `social-hidden` class.
8. **`section.newsletter`**: Sage background, centered. Lora heading, copy, email input + subscribe button, privacy note.
9. **`footer.footer`**: Copyright, links to Podcast, Bluesky, Privacy, Terms.

Note: Article data shown on the homepage is placeholder/sample. Once `blog-publish.py` produces real articles, the homepage can optionally read from `articles/index.json` via JS (future enhancement).

- [ ] **Step 2: Verify by running dev server**

Run: `cd ~/thetalktherapy && npm install && npx vite --port 5173`
Expected: Magazine-style homepage with serif featured title, clean article list, podcast bar, no emojis, no gradient placeholders.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Replace homepage with magazine front page layout

Serif editorial design: featured article hero, two-column recent
articles, podcast bar, social links, newsletter. No emojis, no
placeholder images, no cards — flat typographic layout."
```

---

## Chunk 2: Articles Archive + Article Template

### Task 3: Create the articles archive page

**Files:**
- Create: `articles.html`
- Modify: `vite.config.js` (add to rollup inputs)

- [ ] **Step 1: Create articles.html**

Structure:
1. Same `<head>` and `nav.navbar` as homepage (with Articles link marked `.active`)
2. `div.archive-header`: `h1.archive-title` ("Articles"), `div.category-filters` with 5 `button.category-pill` elements (All, Mental Health, Self-Care, Relationships, Personal Growth). "All" starts with `.active` class. Each pill has `data-category` attribute.
3. `section.article-list`: `div#article-archive.article-grid` (style="display: block") — populated by JS from `/articles/index.json`. Include a `<noscript>` fallback message.
4. Same footer as homepage.

- [ ] **Step 2: Update vite.config.js to include articles.html**

In `vite.config.js`, add to `rollupOptions.input`:

```js
input: {
  main: resolve(__dirname, 'index.html'),
  articles: resolve(__dirname, 'articles.html'),
},
```

- [ ] **Step 3: Commit**

```bash
git add articles.html vite.config.js
git commit -m "Add articles archive page with category filters

Chronological article list loaded from index.json, filterable by
category pills. Multi-page Vite build config."
```

---

### Task 4: Create article page template reference

**Files:**
- Create: `article-template.html`

This is a **reference file** — not served directly by Vite. It documents the HTML structure that `blog-publish.py` should generate for each article.

- [ ] **Step 1: Write article-template.html**

Structure uses `{{PLACEHOLDER}}` syntax to show where blog-publish.py inserts dynamic values:

1. Same `<head>` (with `{{TITLE}}`, `{{DESCRIPTION}}`, `{{ISO_DATE}}` in meta tags) and nav as other pages
2. `header.article-header` (max-width reading-width, centered): `span.article-category` ("{{CATEGORY}}"), `h1.article-page-title` ("{{TITLE}}"), `div.article-page-meta` ("{{READ_TIME}} min read · {{DISPLAY_DATE}}"), `hr.article-header-divider`
3. `div.article-body`: `{{CONTENT}}` — the converted markdown HTML
4. `section.continue-reading`: title label + placeholder for related articles
5. Podcast bar (same as homepage but constrained to reading-width)
6. Newsletter section (same as homepage but constrained to reading-width)
7. Same footer, using `{{YEAR}}` placeholder

- [ ] **Step 2: Commit**

```bash
git add article-template.html
git commit -m "Add article page template reference for blog-publish.py

Defines the HTML structure for individual article pages: narrow
reading column, serif title, category pill, continue-reading
section, podcast bar, newsletter signup."
```

---

## Chunk 3: JavaScript + Vercel Config + blog-publish.py

### Task 5: Replace main.js with minimal editorial JS

**Files:**
- Replace: `templates/js/main.js`

- [ ] **Step 1: Write the new main.js**

Three features only:

1. **Newsletter form handler**: Get form, validate email with regex, show toast on submit (placeholder — no real endpoint yet). Uses `showToast(message, type)` helper that creates a `div.toast.toast-{type}` element with auto-remove after 3s.

2. **Category filters (archive page)**: If `.category-pill` buttons and `#article-archive` exist on page, fetch `/articles/index.json`. `renderArticles(articles)` function creates `.article-item` elements with title links, meta, and excerpt. Each pill click filters by `data-category` attribute. Uses `escapeHtml()` via `document.createElement('div').textContent` assignment pattern for safe output. **Note:** Article content comes from our own `blog-publish.py` pipeline (trusted source), and all dynamic values are escaped via `escapeHtml()` before insertion.

3. **Nav active state**: Match `window.location.pathname` against `.nav-link` href values.

Remove: card hover effects, lazy loading observer, mobile menu toggle (nav only has 1 link now, no hamburger needed), smooth scroll for anchors.

- [ ] **Step 2: Commit**

```bash
git add templates/js/main.js
git commit -m "Replace JS with minimal editorial functionality

Newsletter form handler, category filter for archive page (loads
from index.json), toast notifications, nav active state. Removed
card hover effects, lazy loading, mobile menu toggle."
```

---

### Task 6: Update vercel.json routing for multi-page

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Update vercel.json rewrites**

Replace the `"rewrites"` array. Remove the SPA catch-all (`"source": "/(.*)"` → `"/index.html"`). Replace with:

```json
"rewrites": [
  {
    "source": "/articles",
    "destination": "/articles.html"
  }
]
```

This lets `/articles` route to the archive page while individual article files (`/articles/slug.html`) are served directly as static files.

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "Fix Vercel routing for multi-page site

Remove SPA catch-all rewrite that sent everything to index.html.
Add /articles -> /articles.html rewrite for clean archive URL."
```

---

### Task 7: Update blog-publish.py HTML template

**Files:**
- Modify: `~/openclaw-infra/scripts/blog-publish.py` (lines 191-361, the `HTML_TEMPLATE` string)

- [ ] **Step 1: Replace the HTML_TEMPLATE in blog-publish.py**

Replace the entire `HTML_TEMPLATE` variable (lines 191-361) with the new editorial template that matches the redesigned site. Key changes:
- Uses Lora + Inter from Google Fonts (via `<link>` tags)
- Links to `/templates/css/style.css` instead of inline styles
- Uses `.article-body` wrapper class for content
- Adds `.article-category` pill, `.article-page-meta` with read time
- Adds podcast bar, newsletter section, continue-reading section
- Matches the nav/footer structure from the main site
- Uses same `{{double-brace}}` style but with Python `.format()` compatible `{single-brace}` placeholders: `{title}`, `{description}`, `{iso_date}`, `{display_date}`, `{year}`, `{content}`, plus new `{category}` and `{read_time}`

Refer to `article-template.html` in the thetalktherapy repo as the source of truth for the HTML structure.

- [ ] **Step 2: Add --category and read_time to cmd_create**

In `cmd_create()`, before building the page:
- Add: `read_time = max(1, len(md_text.split()) // 200)`
- Pass `category=html.escape(args.category)` and `read_time=read_time` to `HTML_TEMPLATE.format()`

In the argument parser section:
- Add: `create_parser.add_argument("--category", default="Essay", help="Article category")`

- [ ] **Step 3: Update manifest entry**

In `cmd_create()`, update the manifest dict to include category and readTime:

```python
articles.insert(0, {
    "slug": slug,
    "title": title,
    "date": now.isoformat(),
    "description": description,
    "category": args.category,
    "readTime": read_time,
})
```

- [ ] **Step 4: Verify blog-publish.py still works**

Run: `cd ~/openclaw-infra && BLOG_DIR=/tmp/test-blog python3 scripts/blog-publish.py create "Test Article" --stdin --category "Mental Health" <<< "## Test\n\nThis is a test article about mental health."`

Expected: JSON output with `"ok": true`, and the generated HTML file at `/tmp/test-blog/articles/test-article.html` uses the new editorial template with Lora font, article-body class, category pill, etc.

- [ ] **Step 5: Commit (in openclaw-infra repo)**

```bash
cd ~/openclaw-infra
git add scripts/blog-publish.py
git commit -m "Update blog-publish.py to use editorial article template

New HTML template matches site redesign: Lora serif headings, Inter
body, external CSS, category pill, read time, podcast bar, newsletter.
Added --category flag and readTime to article manifest."
```

---

## Chunk 4: Cleanup + Verification

### Task 8: Remove unused files and verify build

**Files:**
- Delete: `templates/css/improved-style.css` (unused)
- Delete: `templates/js/improved-main.js` (unused)
- Delete: `color-preview.html` (unused)
- Delete: `templates/base.html` (unused, replaced by article-template.html)

- [ ] **Step 1: Remove unused files**

```bash
cd ~/thetalktherapy
rm templates/css/improved-style.css templates/js/improved-main.js color-preview.html templates/base.html
```

- [ ] **Step 2: Verify Vite build succeeds**

Run: `cd ~/thetalktherapy && npm install && npx vite build 2>&1`
Expected: Build succeeds, outputs to `dist/` with `index.html`, `articles.html`, and assets.

- [ ] **Step 3: Preview built site**

Run: `npx vite preview --port 4173`
Expected: Homepage shows magazine layout, Articles page loads, styles applied correctly.

- [ ] **Step 4: Commit cleanup**

```bash
git add -A
git commit -m "Remove unused template files

Cleaned up improved-style.css, improved-main.js, color-preview.html,
and base.html — all replaced by the editorial redesign."
```

- [ ] **Step 5: Push to GitHub and verify Vercel deployment**

```bash
git push origin main
```

Expected: Vercel auto-deploys. Visit https://thetalktherapy.vercel.app to verify the new editorial design is live.
