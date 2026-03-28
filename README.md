# YK PRODUCE — Next.js 14 Full Rebuild

A complete recreation of ykproduce.co.jp built with Next.js 14 App Router.

---

## Stack

| Library | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| Tailwind CSS | Utility styling |
| GSAP + ScrollTrigger | Scroll animations, split-text reveals |
| Framer Motion | Micro-interactions, AnimatePresence |
| Three.js | Hero 3D particle + wireframe scene |
| Lenis | Smooth inertial scrolling |

---

## Quick Start

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Our Sections, What's YKP, Video, Topics, Catch |
| `/wedding` | Wedding services, masonry works gallery, CTA |
| `/creation` | Creation services, projects list, CTA |
| `/whats_ykp` | Mission, values (4-up grid), team, company info |
| `/topics` | Filterable topics grid (All / News / Media / Works) |
| `/topics/[slug]` | Individual topic detail + related posts |
| `/contact` | Full validated form + contact info sidebar |
| `/privacy` | Privacy policy |
| `*` | Custom 404 |

---

## Project Structure

```
ykproduce/
├── app/
│   ├── layout.tsx             ← Root: fonts, cursor, scroll progress, Lenis
│   ├── page.tsx               ← Homepage
│   ├── not-found.tsx          ← Custom 404
│   ├── wedding/page.tsx
│   ├── creation/page.tsx
│   ├── whats_ykp/page.tsx
│   ├── topics/
│   │   ├── page.tsx           ← Topics listing
│   │   └── [slug]/page.tsx    ← Topic detail
│   ├── contact/page.tsx
│   └── privacy/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx         ← Fixed nav, scale-line decoration, scroll state
│   │   ├── Footer.tsx         ← Wordmark SVG, contact card, sub-nav
│   │   └── MobileMenu.tsx     ← GSAP clip-path slide-in overlay
│   │
│   ├── sections/
│   │   ├── PageHero.tsx       ← Shared inner-page hero (grid bg, split chars)
│   │   ├── Hero.tsx           ← Homepage hero (Three.js bg + tagline)
│   │   ├── OurSections.tsx    ← Wedding/Creation scroll reveals
│   │   ├── WhatsYKP.tsx       ← Marquee + parallax image strip
│   │   ├── VideoCopy.tsx      ← Full-screen video with controls
│   │   ├── Topics.tsx         ← Home topics preview (3 cards)
│   │   ├── Catch.tsx          ← Tagline with bg color shift
│   │   ├── wedding/           ← WeddingServices, WeddingWorks, WeddingCta
│   │   ├── creation/          ← CreationServices, CreationProjects
│   │   ├── whats_ykp/         ← AboutMission, AboutValues, AboutTeam
│   │   ├── topics/            ← TopicsGrid (filtered), TopicDetail
│   │   └── contact/           ← ContactForm (validated), ContactInfo
│   │
│   ├── three/
│   │   └── HeroThree.tsx      ← Three.js: particles + YK wireframe + sphere
│   │
│   └── ui/
│       ├── Loading.tsx              ← Count-up loader, GSAP exit
│       ├── CustomCursor.tsx         ← GSAP lerp cursor, mix-blend-mode
│       ├── ScrollProgress.tsx       ← Top reading progress bar
│       ├── SmoothScrollProvider.tsx ← Lenis + GSAP ticker sync
│       ├── YKSymbol.tsx             ← Octagon SVG mark
│       ├── ScaleLines.tsx           ← Animated waveform decoration
│       ├── Arrows.tsx               ← CurveArrow, BlankArrow SVGs
│       └── PrimaryLink.tsx          ← Animated underline link
│
├── hooks/
│   ├── useGSAP.ts             ← useLenisGSAP, useScrollAnimation
│   └── useTextReveal.ts       ← splitChars helper, useTextReveal hook
│
└── lib/
    └── topics.ts              ← Topic data, getTopicBySlug, getRelatedTopics

```

---

## Assets Required

Place in `public/`:

```
public/
├── images/
│   ├── business-wedding.png
│   ├── business-creation.png
│   ├── photo-01.webp / photo-02.webp / photo-03.webp
│   ├── topics-01.jpg / topics-02.jpg / topics-03.jpg
│   └── ogp.png (1200×630)
└── video/
    ├── main-video-mute.mp4    ← Hero (muted autoplay)
    ├── main-video.mp4         ← Video copy section / showreel
    └── footer.mp4             ← Footer ambient
```

---

## Three.js Hero

`HeroThree.tsx` renders:
1. **1,800 particles** distributed on a sphere — rotate slowly, react to mouse
2. **YK wireframe octagon** — 3D ring + spokes, rotates and follows mouse parallax
3. **Inner wireframe sphere** — subtle depth
4. **240-point outer ring** — subtle dot ring at radius ~2.4

Mouse parallax: `targetRot.x/y` lerped toward mouse position at 4% per frame.

---

## Contact Form

- Client-side validation (name, email, type, message required)
- Inquiry type pill selector
- Date picker for shoot date
- Simulated async submit — replace `await new Promise(...)` in `ContactForm.tsx` with your actual API endpoint
- Success / error states with AnimatePresence transitions
