# United H.O.P.E Foundation (UHF)

A highly cinematic, premium, and emotionally resonant web application designed for the United H.O.P.E Foundation. The platform uses a modern architecture to ensure high performance while delivering a beautiful, fluid user experience driven by complex scroll-based animations.

## Tech Stack

**Frontend:**
- **[Next.js](https://nextjs.org/)** (App Router)
- **[Tailwind CSS](https://tailwindcss.com/)** (Styling & Layout)
- **[GSAP](https://gsap.com/)** (Complex timelines & scroll-triggered animations)
- **[Framer Motion](https://www.framer.com/motion/)** (Micro-interactions & page transitions)

**Backend:**
- **Next.js API Routes** OR **Node.js + Express** (Depending on deployment strategy and service separation)

**Database:**
- **[Supabase (PostgreSQL)](https://supabase.com/)** (Relational data for users, events, and dynamic content)

**CMS:**
- **[Sanity](https://www.sanity.io/)** (Headless content management for stories, programs, and foundation updates)

---

## File Structure

```text
uhf/
├── public/                 # Static assets (images, fonts, cutouts)
└── src/
    ├── app/                # Next.js App Router core
    │   ├── favicon.ico
    │   ├── globals.css     # Global styles and Tailwind configuration
    │   ├── layout.tsx      # Root layout, HTML wrapper, and Font configuration
    │   └── page.tsx        # Main entry point assembling the application
    │
    └── components/         # Reusable UI & Animation components
        ├── Documentary.tsx
        ├── EmotionalBreak.tsx
        ├── Events.tsx
        ├── Footer.tsx
        ├── Hero.tsx
        ├── ImpactStats.tsx
        ├── OpeningAnimation.tsx
        ├── Programs.tsx
        ├── SmoothScroll.tsx
        └── Stories.tsx
```

---

## Component Details

### Core Application (`src/app/`)
* **`layout.tsx`**: Defines the root HTML shell. It is responsible for loading the optimized web fonts (`Inter` and `Cormorant Garamond`) and injecting the `SmoothScroll` context across all routes.
* **`page.tsx`**: The primary landing page that stitches all modular sections (Hero, Programs, Stories, etc.) together to form the unified continuous scrolling experience.
* **`globals.css`**: Contains Tailwind directives and custom CSS for cinematic aesthetic details, such as text-highlighting rules and custom scrollbar hiding.

### UI & Animations (`src/components/`)
* **`OpeningAnimation.tsx`**: Manages the ultra-cinematic first load experience. Orchestrates the 120px circular logo's entrance, its zoom mechanics, its seamless diagonal translation into the top-left corner, and hosts the persistent top navigation bar.
* **`Hero.tsx`**: The first immediate visual section. Handles the bold typography mixing serif and sans-serif fonts, and seamlessly overlays a cutout image against the bottom/right edges for a 3D overlapping effect.
* **`ImpactStats.tsx`**: A scroll-triggered counter section displaying real-world metrics using GSAP to animate numbers upwards as they enter the viewport.
* **`Programs.tsx`**: A structured grid layout highlighting the core initiatives of the NGO with subtle image-scaling hover states.
* **`Stories.tsx`**: An editorial-style masonry or grid layout designed for deeply human storytelling and impact reporting.
* **`Documentary.tsx`**: A visually intensive horizontal-scroll section. It translates vertical scrolling into a horizontal pan across large, immersive black-and-white photography.
* **`Events.tsx`**: An interactive schedule component to display upcoming volunteer opportunities or foundation activities.
* **`Footer.tsx`**: The comprehensive bottom section of the application containing all site mapping, social links, contact information, and the massive foundational logo.
* **`SmoothScroll.tsx`**: A global layout wrapper that utilizes `lenis` to hijack native browser scrolling and apply a buttery-smooth, cinematic inertia to all scrolling interactions.
* **`EmotionalBreak.tsx`**: A minimal, typography-focused interstitial spacer component designed to give the user a visual and emotional pause between heavy content sections.
