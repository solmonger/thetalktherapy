# The Talk Therapy - Website Wireframes

## Homepage Layouts

### Concept A: Calm Sanctuary
```
┌─────────────────────────────────────┐
│           HERO SECTION              │
│  Full-width gradient background     │
│  Main headline + brief description  │
│  CTA: "Start Reading" / "Explore"   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│        FEATURED ARTICLES            │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │Card │ │Card │ │Card │           │
│  │     │ │     │ │     │           │
│  └─────┘ └─────┘ └─────┘           │
│  3-column grid, rounded cards       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│          ABOUT SECTION              │
│  Text + supportive image            │
│  Explains The Talk Therapy mission  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│        CATEGORY PILLS               │
│  [Anxiety] [Depression] [Mindfulness]│
│  [Relationships] [Self-Care]        │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│          RECENT POSTS               │
│  List view with dates & categories  │
│  Pagination at bottom               │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│             FOOTER                  │
│  Simple links + copyright           │
└─────────────────────────────────────┘
```

### Concept B: Conversation Flow
```
┌─────────────────────────────────────┐
│                                     │
│    ┌──────────────────────┐        │
│    │                      │        │
│    │   ASYMMETRICAL HERO  │        │
│    │   Text on left,      │        │
│    │   organic shape on right      │
│    └──────────────────────┘        │
│                                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│  ┌────────┐                        │
│  │Quote   │  ┌──────────────┐      │
│  │Bubble  │  │Latest Article│      │
│  │        │  │              │      │
│  └────────┘  └──────────────┘      │
│                                     │
│  ┌──────────────┐  ┌────────┐      │
│  │Featured      │  │Resource│      │
│  │              │  │        │      │
│  └──────────────┘  └────────┘      │
│                                     │
└─────────────────────────────────────┘
```

### Concept C: Minimal Comfort
```
┌─────────────────────────────────────┐
│                                     │
│          THE TALK THERAPY           │
│          Simple centered text       │
│          Subtitle below             │
│                                     │
│          [Explore Articles]         │
│                                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│  Article 1 Title                    │
│  Brief excerpt...                   │
│  Category • Date                    │
│                                     │
│  ─────────────────────────────      │
│                                     │
│  Article 2 Title                    │
│  Brief excerpt...                   │
│  Category • Date                    │
│                                     │
│  ─────────────────────────────      │
│                                     │
│  Article 3 Title                    │
│  Brief excerpt...                   │
│  Category • Date                    │
│                                     │
└─────────────────────────────────────┘
```

## Article Page Template
```
┌─────────────────────────────────────┐
│  Back to Home • Category            │
│                                     │
│  ARTICLE TITLE                      │
│  Author • Date • Read time          │
│                                     │
│  [Featured Image]                   │
│                                     │
│  Article content in clean typography│
│  Generous line height (1.8)         │
│  Comfortable max-width (65ch)       │
│                                     │
│  ─────────────────────────────      │
│                                     │
│  Tags: [Anxiety] [Mindfulness]      │
│                                     │
│  Share buttons (minimal)            │
│                                     │
│  Related Articles section           │
└─────────────────────────────────────┘
```

## Navigation Structure

### Main Navigation
- Home
- Articles (dropdown: Categories)
- About
- Resources
- Contact

### Footer Navigation
- Privacy Policy
- Terms of Use
- Contact
- Newsletter Signup
- Social Links

## Mobile Considerations

### Breakpoints:
- **Mobile:** < 768px (stack everything vertically)
- **Tablet:** 768px - 1024px (2-column where appropriate)
- **Desktop:** > 1024px (full layout)

### Mobile Navigation:
- Hamburger menu on mobile
- Sticky header on scroll
- Touch-friendly buttons (min 44×44px)

## Content Components

### 1. Article Cards
- Image (optional)
- Title
- Excerpt (2-3 lines)
- Category badge
- Read time

### 2. Category Pills
- Rounded rectangles
- Soft background color
- Hover effect

### 3. CTAs (Call to Actions)
- Primary: Solid Soft Peach button
- Secondary: Outline button
- Text links with underline on hover

### 4. Forms
- Newsletter signup
- Contact form
- Simple, accessible inputs

## Accessibility Features

### 1. Color Contrast
- All text meets WCAG AA standards
- Focus states for interactive elements
- Sufficient color contrast ratios

### 2. Keyboard Navigation
- Logical tab order
- Skip to content link
- Focus visible on all interactive elements

### 3. Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Alt text for all images

## Performance Targets

### 1. Loading Speed
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

### 2. Asset Optimization
- Compressed images (WebP format)
- Lazy loading for below-fold images
- Minimal JavaScript

### 3. Core Web Vitals
- CLS (Cumulative Layout Shift): < 0.1
- FID (First Input Delay): < 100ms
- LCP (Largest Contentful Paint): < 2.5s

## Next Steps for Implementation

### Phase 1: HTML/CSS Foundation
1. Create base HTML structure
2. Implement CSS with brand variables
3. Build responsive grid system
4. Create reusable components

### Phase 2: Content Integration
1. Set up markdown/content structure
2. Create article templates
3. Implement navigation
4. Add search functionality (if needed)

### Phase 3: Polish & Optimization
1. Add animations/transitions
2. Optimize performance
3. Test across browsers/devices
4. Accessibility audit

### Phase 4: Deployment
1. Choose platform (GitHub Pages/Vercel)
2. Set up deployment pipeline
3. Configure domain (if applicable)
4. Launch with basic content