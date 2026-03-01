# The Talk Therapy - Website Templates

## Overview
Complete HTML/CSS templates for The Talk Therapy website based on the approved "Calm Sanctuary" design concept.

## File Structure
```
templates/
├── css/
│   └── style.css          # Main stylesheet with brand variables
├── js/
│   └── main.js            # Interactive functionality
├── base.html              # Base template with navigation/footer
├── index.html             # Homepage (Concept A: Calm Sanctuary)
└── README.md              # This file
```

## Design Implementation

### Color Palette
- **Primary CTA/Accent:** `#FFD8C8` (Soft Peach)
- **Background/Secondary:** `#C8D8C8` (Soft Sage)
- **Main Background:** `#FFF8F0` (Cream)
- **Borders/Subtle:** `#E8E0D8` (Warm Gray)
- **Text Primary:** `#333333`
- **Text Secondary:** `#666666`

### Typography
- **Font Family:** Inter (Google Fonts)
- **Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Base Size:** 16px (14px on mobile)

### Spacing System
8px base unit (0.5rem):
- `--space-xs`: 8px
- `--space-sm`: 16px
- `--space-md`: 24px
- `--space-lg`: 32px
- `--space-xl`: 48px
- `--space-2xl`: 64px

### Components Implemented
1. **Navigation Bar**
   - Responsive mobile menu
   - Active state indicators
   - Smooth hover effects

2. **Hero Section**
   - Gradient background (Cream → Sage)
   - Centered call-to-action
   - Responsive typography

3. **Feature Cards**
   - Three-column grid (single on mobile)
   - Icon + title + description
   - Hover animations

4. **Article Cards**
   - Image placeholder with gradient
   - Category badges
   - Meta information (date, read time)
   - Hover effects

5. **Newsletter Section**
   - Email validation
   - Toast notifications
   - Responsive form layout

6. **Footer**
   - Three-column layout
   - Legal links
   - Responsive stacking

## JavaScript Features
- Mobile menu toggle
- Smooth scrolling for anchor links
- Newsletter form validation
- Toast notifications
- Image lazy loading
- Current page highlighting in navigation

## Responsive Breakpoints
- **Desktop:** 1200px+ (full layout)
- **Tablet:** 768px-1199px (adjusted grids)
- **Mobile:** < 768px (stacked layout, hamburger menu)

## Usage Instructions

### 1. Static Site (HTML/CSS/JS)
Simply copy the `templates/` directory to your web server. All paths are relative.

### 2. Static Site Generator (Hugo/Jekyll/Next.js/Astro)
- Use `base.html` as your layout template
- Extend with `{% block content %}` for page-specific content
- Update asset paths as needed for your SSG

### 3. Customization
1. **Colors:** Update CSS variables in `style.css`
2. **Content:** Replace placeholder text in HTML files
3. **Images:** Replace gradient placeholders with actual images
4. **Icons:** Update emoji icons with SVG icons if desired

## Next Steps
1. **Content Integration:** Add actual articles and resources
2. **Image Assets:** Create/select appropriate imagery
3. **SEO Optimization:** Add meta tags, Open Graph, etc.
4. **Performance:** Optimize images, implement caching
5. **Analytics:** Add tracking code
6. **Accessibility:** Complete ARIA labels, keyboard navigation

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Notes
- All CSS uses modern features (CSS Grid, Flexbox, CSS Variables)
- JavaScript uses vanilla JS (no frameworks)
- Fonts loaded from Google Fonts CDN
- No external dependencies except Inter font

## Deployment Options
See `../DEPLOYMENT-GUIDE.md` for detailed deployment instructions for:
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages