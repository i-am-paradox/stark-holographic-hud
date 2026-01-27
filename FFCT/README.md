# FFCT - Forever Foundation Charitable Trust Website

A premium, production-ready NGO website featuring cinematic GSAP animations and smooth scroll.

![FFCT Website](https://img.shields.io/badge/React-18.3-blue) ![GSAP](https://img.shields.io/badge/GSAP-3.12-green) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Features

- **9 Animated Sections**: Hero, About, Causes, Impact, Gallery, Donate, Contact, Footer
- **GSAP Animations**: Split text reveals, staggered cards, parallax effects, counters
- **Lenis Smooth Scroll**: Buttery smooth scrolling experience
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Premium Design**: Modern UI with gradients, glassmorphism, and micro-interactions

## 📁 Project Structure

```
/src
  /components
    Navbar.jsx      # Fixed navigation with scroll effects
    Hero.jsx        # Full viewport with split text animation
    About.jsx       # Two-column parallax layout
    Causes.jsx      # Program cards with staggered animation
    Impact.jsx      # Animated counter statistics
    Gallery.jsx     # Story cards with hover overlays
    Donate.jsx      # Donation form with amount selection
    Contact.jsx     # Contact form with info cards
    Footer.jsx      # Footer with scroll-to-top
  /utils
    animations.js   # Reusable GSAP animation functions
  /hooks
    useCounter.js   # Animated counter hook
    useSmoothScroll.js # Lenis smooth scroll hook
```

## 🎯 Customization Guide

### Colors

Edit `tailwind.config.js` to change brand colors:

```javascript
colors: {
  primary: '#0066FF',    // Main brand color
  accent: '#00D4FF',     // Accent/highlight color
  dark: '#0A0E27',       // Background dark
  light: '#F8FAFC',      // Text light
}
```

### Content

Each component has clearly labeled data at the top. For example, in `Causes.jsx`:

```javascript
const causes = [
  {
    icon: Droplets,
    title: 'Clean Water Access',
    description: 'Your description here...',
    raised: 85000,
    goal: 100000,
    color: 'from-blue-500 to-cyan-400'
  },
  // Add more causes...
]
```

### Animation Timings

All animation durations are configurable. In `animations.js`:

```javascript
// Slow down or speed up animations
fadeInUp(element, { duration: 1.5 }) // Default: 1s
staggerCards(container, '.card', { stagger: 0.2 }) // Default: 0.15s
```

Individual component timings:

| Animation | File | Line | Default |
|-----------|------|------|---------|
| Hero text reveal | Hero.jsx | ~48 | 1.2s |
| Section reveal | All sections | - | 1s |
| Card stagger | Causes.jsx | ~61 | 0.15s delay |
| Counter | Impact.jsx | ~58 | 2s |

### Images

Replace placeholder gradients with actual images:

```jsx
// In About.jsx, replace the gradient div with:
<img 
  ref={imageRef}
  src="/images/your-image.jpg" 
  alt="About FFCT"
  className="w-full h-full object-cover"
/>
```

## ⚡ Performance Tips

1. **Images**: Use WebP format and lazy loading
2. **Build**: Run `npm run build` for optimized production bundle
3. **ScrollTrigger**: Already configured for cleanup on unmount

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **GSAP 3.12** - Animations
- **Lenis** - Smooth Scroll
- **Lucide React** - Icons

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 📄 License

MIT License - Free to use for personal and commercial projects.

---

Built with ❤️ for Forever Foundation Charitable Trust
