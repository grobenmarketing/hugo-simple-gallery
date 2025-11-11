# Hugo Simple Gallery
**Ultra-lightweight, plug-and-play Hugo gallery with Netlify CDN optimization**

Vibe Coded HUGO Gallery for basic needs and max bandwidth reduction. CLAUDE is my co-captain.

---

## Current Features

### Core Functionality
- ✅ **Masonry Grid Layout** - Auto-adjusting heights for natural image flow
- ✅ **Category Filtering** - Filter by Landscapes, Portraits, Abstract (auto-detects folders)
- ✅ **Lazy Loading** - Images load as needed, not all at once
- ✅ **Pagination** - "View More" button loads 12 images at a time
- ✅ **Responsive Design** - Mobile-first, works on all screen sizes
- ✅ **Zero Dependencies** - Pure vanilla JS, no jQuery or frameworks
- ✅ **Folder-Based Categories** - Drop images in folders, auto-detected

### Performance
- ✅ **Minimal CSS/JS** - Single CSS file (~8KB), single JS file (~5KB)
- ✅ **No Popup/Lightbox** - Ultra-light, no modal overlays
- ✅ **Progressive Enhancement** - Works without JS (degrades gracefully)

---

## Planned Improvements

### Phase 1: Netlify Optimization (Priority)
- [ ] **Netlify Image CDN Integration**
  - Use `/.netlify/images?url=IMAGE&w=WIDTH&q=QUALITY` API
  - Generate responsive srcset for multiple device sizes
  - Automatic WebP conversion with JPEG fallback
  - Thumbnail sizes: 320w, 480w, 800w, 1200w
  - Quality: 85 for thumbnails, 90 for full size

- [ ] **Modern Image Formats**
  - WebP primary, JPEG fallback for older browsers
  - AVIF support detection and serving
  - Automatic format negotiation via Netlify

- [ ] **Smart Loading Strategy**
  - Blur-up placeholder technique (tiny base64 preview)
  - Intersection Observer for precise lazy loading
  - Preload next batch of images on scroll proximity

### Phase 2: Loop/Infinite Scroll
- [ ] **Infinite Scroll Option**
  - Replace "View More" button with automatic loading
  - Loop back to top when reaching end (circular behavior)
  - Configurable: button mode OR infinite scroll mode
  - Virtual scrolling for massive galleries (1000+ images)

- [ ] **Circular Navigation**
  - When filtering, seamlessly loop through categories
  - Keyboard navigation: Arrow keys, Home, End
  - Touch gestures for mobile swipe-through

### Phase 3: Easy Installation
- [ ] **Hugo Module Support**
  - Installable via `hugo mod get`
  - Import as theme component
  - No file copying required

- [ ] **Shortcode Implementation**
  - Single shortcode: `{{< gallery "folder-name" >}}`
  - Parameters: categories, layout, pagination mode
  - Works in any Hugo content file

- [ ] **Theme Partial Option**
  - Copy single `layouts/partials/gallery.html`
  - Include with `{{ partial "gallery.html" . }}`
  - Bring-your-own-CSS or use included styles

- [ ] **Installation Script**
  - One command: `curl -sL install.sh | bash`
  - Copies layouts, static files, creates example content
  - Interactive setup (asks for preferences)

### Phase 4: Enhanced UX
- [ ] **Image Captions & Metadata**
  - Auto-read EXIF data (title, description, date)
  - Front matter support for custom captions
  - Optional overlay caption on hover

- [ ] **Sort Options**
  - Sort by: Date, Name, Random, File size
  - Reverse order toggle
  - Remember user preference (localStorage)

- [ ] **Deep Linking**
  - URL hash for filtered category: `#/landscapes`
  - Direct link to specific image: `#/landscapes/image-03`
  - Browser back/forward button support

- [ ] **Search Functionality**
  - Search by filename, caption, or EXIF data
  - Fuzzy matching for typos
  - Live search results as you type

- [ ] **Keyboard Shortcuts**
  - `1-9` - Switch between categories
  - `Arrow Keys` - Navigate images
  - `Spacebar` - Load more / Continue scroll
  - `Escape` - Clear filters
  - `?` - Show keyboard shortcuts help

### Phase 5: Developer Experience
- [ ] **Configuration File**
  - `data/gallery-config.yml` for all settings
  - Items per page, lazy load offset, animation speed
  - Color scheme, button labels, category names

- [ ] **Multi-Gallery Support**
  - Multiple galleries on one site: `/gallery/portfolio/`, `/gallery/blog/`
  - Different configs per gallery
  - Shared CSS/JS for efficiency

- [ ] **Image Optimization Pre-processor**
  - CLI tool to prep images before upload
  - Auto-resize, compress, rename
  - Generate thumbnails locally (optional)

- [ ] **Analytics Hooks**
  - Data attributes for tracking: `data-gallery-event`
  - Google Analytics events: image view, filter change, pagination
  - Plausible/Fathom compatible

### Phase 6: Advanced Features (Nice-to-Have)
- [ ] **Responsive Image Grid Options**
  - Switch between: Masonry, Fixed Grid, Justified layout
  - User preference toggle
  - CSS-only options (no JS reflow)

- [ ] **Color Palette Detection**
  - Extract dominant colors from each image
  - Filter by color family
  - Color-matched borders/backgrounds

- [ ] **Gallery Password Protection**
  - Simple password gate for private galleries
  - Netlify Identity integration
  - Client-side encryption for ultra-privacy

- [ ] **PWA Support**
  - Offline viewing of loaded images
  - Service worker caching
  - Install as app on mobile

- [ ] **Accessibility Enhancements**
  - Screen reader announcements for filter changes
  - ARIA labels for all interactive elements
  - High contrast mode support
  - Focus visible indicators

---

## Installation (Current)

### 1. Copy files to your Hugo site

```bash
# Clone this repo
git clone https://github.com/grobenmarketing/hugo-simple-gallery.git

# Copy to your Hugo site
cp -r hugo-simple-gallery/layouts/* YOUR_SITE/layouts/
cp -r hugo-simple-gallery/static/* YOUR_SITE/static/
```

### 2. Add gallery images

```bash
# Create category folders
mkdir -p static/images/gallery/{landscapes,portraits,abstract}

# Add your images
cp your-images/*.jpg static/images/gallery/landscapes/
```

### 3. Create gallery page

```bash
hugo new gallery/_index.md
```

Add front matter:
```yaml
---
title: "Gallery"
subtitle: "Browse our collection"
---
```

### 4. Use in template

```go-html-template
{{ partial "gallery.html" . }}
```

---

## Structure

```
hugo-simple-gallery/
├── layouts/
│   ├── _default/
│   │   └── baseof.html       # Base template
│   ├── partials/
│   │   ├── gallery.html      # Main gallery component
│   │   ├── header.html       # Minimal header
│   │   └── footer.html       # Minimal footer
│   └── index.html            # Homepage layout
├── static/
│   ├── css/
│   │   └── gallery.css       # ~8KB minified
│   ├── js/
│   │   └── gallery.js        # ~5KB minified
│   └── images/
│       └── gallery/          # Your images here
│           ├── landscapes/   # Category 1
│           ├── portraits/    # Category 2
│           └── abstract/     # Category 3
├── hugo.toml                 # Hugo config
└── README.md                 # This file
```

---

## Configuration (Planned)

Future `data/gallery-config.yml`:

```yaml
gallery:
  # Pagination
  items_per_page: 12
  load_mode: "button"  # or "infinite"
  loop_when_done: true

  # Images
  lazy_load: true
  lazy_offset: 200  # pixels before viewport

  # Netlify CDN
  use_netlify_cdn: true
  thumbnail_sizes: [320, 480, 800, 1200]
  image_quality: 85

  # Layout
  grid_type: "masonry"  # or "fixed" or "justified"
  gap: 16  # pixels

  # Filtering
  default_filter: "all"
  show_count: true  # Show image count per category

  # Performance
  preload_next_batch: true
  virtual_scroll: false  # For 1000+ images
```

---

## Netlify Image CDN Integration (Next Up)

The gallery will automatically use Netlify's CDN when deployed:

```html
<!-- Current: Direct image -->
<img src="/images/gallery/landscapes/photo.jpg">

<!-- Improved: Netlify CDN with responsive sizes -->
<img
  src="/.netlify/images?url=/images/gallery/landscapes/photo.jpg&w=480&q=85"
  srcset="
    /.netlify/images?url=/images/gallery/landscapes/photo.jpg&w=320&q=85 320w,
    /.netlify/images?url=/images/gallery/landscapes/photo.jpg&w=480&q=85 480w,
    /.netlify/images?url=/images/gallery/landscapes/photo.jpg&w=800&q=85 800w,
    /.netlify/images?url=/images/gallery/landscapes/photo.jpg&w=1200&q=90 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
  decoding="async">
```

**Bandwidth savings:** ~70-80% reduction on mobile, ~50-60% on desktop

---

## Performance Targets

| Metric | Current | Target |
|--------|---------|--------|
| First Load CSS | ~8KB | ~6KB gzipped |
| First Load JS | ~5KB | ~4KB gzipped |
| Time to Interactive | ~500ms | ~300ms |
| Lighthouse Score | ~85 | ~95+ |
| Initial Image Load | ~15MB (15 images) | ~2MB (thumbnails only) |
| Images per second | ~5 | ~20 (with CDN) |

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Mobile Chrome 90+

**Degrades gracefully** on older browsers (shows all images, no filtering)

---

## Contributing

Ideas? Open an issue or PR!

**Priority areas:**
1. Netlify CDN integration
2. Infinite scroll / loop mode
3. Shortcode implementation
4. Installation automation

---

## License

MIT - Use it however you want!

---

## Roadmap

- **v0.1** ✅ - Basic masonry gallery with filtering
- **v0.2** 🚧 - Netlify CDN optimization
- **v0.3** 📋 - Infinite scroll & loop mode
- **v0.4** 📋 - Hugo module & shortcode
- **v1.0** 📋 - Production-ready, full feature set

---

## Credits

Built with Hugo + Vanilla JS. No frameworks harmed in the making of this gallery.

**Coded by:** Vibe + Claude (AI co-captain)
