/**
 * FFCT Cinema-Grade Animation Utilities
 * 
 * Reusable GSAP animations for cinematic scroll experiences
 * All timings optimized for 60fps performance
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// TEXT ANIMATIONS
// ============================================

/**
 * Split text and animate characters/words with cinematic reveal
 * @param {Element} element - Text element to animate
 * @param {Object} options - Animation options
 */
export const splitTextReveal = (element, options = {}) => {
    const {
        duration = 1.2,
        stagger = 0.03,
        ease = 'expo.out',
        delay = 0.5,
        y = 100,
        rotationX = -90,
        splitType = 'words'  // 'chars', 'words', or 'chars,words'
    } = options

    // Create SplitType instance
    const split = new SplitType(element, { types: splitType })
    const targets = splitType.includes('chars') ? split.chars : split.words

    const tl = gsap.timeline({ delay })

    tl.from(targets, {
        y,
        rotationX,
        opacity: 0,
        stagger,
        duration,
        ease,
        transformOrigin: '50% 50% -50px'
    })

    // Return split instance for cleanup
    return { timeline: tl, split }
}

/**
 * Line-by-line text reveal
 */
export const lineReveal = (element, options = {}) => {
    const { duration = 1, stagger = 0.1, ease = 'power3.out', delay = 0 } = options

    const split = new SplitType(element, { types: 'lines' })

    // Wrap each line in overflow hidden container
    split.lines.forEach(line => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
    })

    return gsap.from(split.lines, {
        y: '100%',
        opacity: 0,
        stagger,
        duration,
        ease,
        delay
    })
}

// ============================================
// SCROLL-TRIGGERED REVEALS
// ============================================

/**
 * Fade in + slide up animation (most common)
 */
export const fadeInUp = (element, options = {}) => {
    const {
        y = 80,
        duration = 1.2,
        ease = 'power3.out',
        start = 'top 85%',
        toggleActions = 'play none none reverse'
    } = options

    return gsap.from(element, {
        y,
        opacity: 0,
        duration,
        ease,
        scrollTrigger: {
            trigger: element,
            start,
            toggleActions
        }
    })
}

/**
 * Fade in + scale animation
 */
export const fadeInScale = (element, options = {}) => {
    const {
        scale = 0.9,
        duration = 1,
        ease = 'back.out(1.4)',
        start = 'top 80%'
    } = options

    return gsap.from(element, {
        scale,
        opacity: 0,
        duration,
        ease,
        scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none reverse'
        }
    })
}

/**
 * Staggered card/grid animation
 */
export const staggerCards = (container, cards, options = {}) => {
    const {
        y = 60,
        scale = 0.95,
        stagger = 0.15,
        duration = 1,
        ease = 'power2.out',
        start = 'top 75%'
    } = options

    return gsap.from(cards, {
        y,
        opacity: 0,
        scale,
        stagger,
        duration,
        ease,
        scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none reverse'
        }
    })
}

// ============================================
// PARALLAX EFFECTS
// ============================================

/**
 * Parallax scroll effect
 * @param {Element} element - Element to parallax
 * @param {number} speed - 0.1 to 1 (0.3 = 30% of normal scroll speed)
 */
export const parallaxElement = (element, speed = 0.3) => {
    return gsap.to(element, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true
        }
    })
}

/**
 * Multiple parallax layers with different speeds
 */
export const parallaxLayers = (layers, speeds = [0.1, 0.3, 0.5]) => {
    layers.forEach((layer, i) => {
        const speed = speeds[i % speeds.length]
        parallaxElement(layer, speed)
    })
}

// ============================================
// HORIZONTAL SCROLL
// ============================================

/**
 * Horizontal scroll section
 * Scroll vertically to move horizontally
 */
export const horizontalScroll = (container, wrapper, panels) => {
    const totalWidth = (panels.length - 1) * 100

    return gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => `+=${totalWidth}%`,
            invalidateOnRefresh: true
        }
    })
}

// ============================================
// PINNED SECTIONS
// ============================================

/**
 * Pin a section while animating content
 */
export const pinnedSection = (section, contentTimeline) => {
    return ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        animation: contentTimeline
    })
}

// ============================================
// IMAGE REVEALS
// ============================================

/**
 * Clip-path reveal from bottom
 */
export const imageReveal = (image, options = {}) => {
    const { duration = 1.5, ease = 'expo.out', start = 'top 80%' } = options

    return gsap.from(image, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration,
        ease,
        scrollTrigger: {
            trigger: image,
            start,
            toggleActions: 'play none none reverse'
        }
    })
}

/**
 * Scale + opacity image reveal
 */
export const imageZoom = (image, options = {}) => {
    const { scale = 1.3, duration = 1.8, ease = 'power2.out', start = 'top 75%' } = options

    return gsap.from(image, {
        scale,
        opacity: 0,
        duration,
        ease,
        scrollTrigger: {
            trigger: image,
            start,
            toggleActions: 'play none none reverse'
        }
    })
}

// ============================================
// COUNTER ANIMATION
// ============================================

/**
 * Animate number counter on scroll
 */
export const animateCounter = (element, endValue, options = {}) => {
    const { duration = 2.5, ease = 'expo.out', suffix = '', prefix = '' } = options

    const counter = { value: 0 }

    return gsap.to(counter, {
        value: endValue,
        duration,
        ease,
        scrollTrigger: {
            trigger: element,
            start: 'top 70%',
            once: true
        },
        onUpdate: () => {
            element.textContent = `${prefix}${Math.floor(counter.value).toLocaleString()}${suffix}`
        }
    })
}

// ============================================
// HOVER ANIMATIONS
// ============================================

/**
 * Setup hover scale animation
 */
export const hoverScale = (element, options = {}) => {
    const { scale = 1.05, duration = 0.3 } = options

    const tl = gsap.timeline({ paused: true })
    tl.to(element, { scale, duration, ease: 'power2.out' })

    element.addEventListener('mouseenter', () => tl.play())
    element.addEventListener('mouseleave', () => tl.reverse())

    return tl
}

/**
 * Setup hover lift animation
 */
export const hoverLift = (element, options = {}) => {
    const { y = -8, shadow = true, duration = 0.3 } = options

    const tl = gsap.timeline({ paused: true })

    const props = { y, duration, ease: 'power2.out' }
    if (shadow) {
        props.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
    }

    tl.to(element, props)

    element.addEventListener('mouseenter', () => tl.play())
    element.addEventListener('mouseleave', () => tl.reverse())

    return tl
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create GSAP context for React cleanup
 */
export const createAnimationContext = (animationFn, scope) => {
    return gsap.context(animationFn, scope)
}

/**
 * Refresh all ScrollTriggers (call after layout changes)
 */
export const refreshScrollTrigger = () => {
    ScrollTrigger.refresh()
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Apply reduced motion settings
 */
export const applyReducedMotion = () => {
    if (prefersReducedMotion()) {
        gsap.globalTimeline.timeScale(10) // Make animations near-instant
        return true
    }
    return false
}

export { gsap, ScrollTrigger }
