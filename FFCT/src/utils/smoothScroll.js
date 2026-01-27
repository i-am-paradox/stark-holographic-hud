/**
 * FFCT Buttery Smooth Scroll
 * Using Lenis for ultra-smooth scrolling
 * Optimized for GSAP ScrollTrigger sync
 */

import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null
let rafId = null

/**
 * Initialize Lenis smooth scroll with GSAP sync
 * Buttery smooth - optimized settings
 */
export const initSmoothScroll = () => {
    // Destroy existing instance if any
    if (lenisInstance) {
        lenisInstance.destroy()
    }
    if (rafId) {
        cancelAnimationFrame(rafId)
    }

    const lenis = new Lenis({
        duration: 1.5,                    // Longer duration = smoother feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,             // Slower wheel for smoother scroll
        smoothTouch: false,               // Disable on touch for better mobile UX
        touchMultiplier: 1.5,
        infinite: false,
        autoResize: true,
    })

    lenisInstance = lenis

    // Sync Lenis with GSAP ScrollTrigger - optimized approach
    lenis.on('scroll', ScrollTrigger.update)

    // Use dedicated RAF loop for Lenis (better performance)
    function raf(time) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Set ScrollTrigger to use the same scroller
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                lenis.scrollTo(value, { immediate: true })
            }
            return lenis.animatedScroll
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
        pinType: document.body.style.transform ? "transform" : "fixed"
    })

    // Refresh ScrollTrigger on Lenis ready
    ScrollTrigger.defaults({ scroller: document.body })

    // Disable GSAP lag smoothing for precise sync
    gsap.ticker.lagSmoothing(0)

    return lenis
}

/**
 * Get the current Lenis instance
 */
export const getLenis = () => lenisInstance

/**
 * Scroll to a target element or position (smooth)
 */
export const scrollTo = (target, options = {}) => {
    if (lenisInstance) {
        lenisInstance.scrollTo(target, {
            offset: 0,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            ...options
        })
    }
}

/**
 * Stop smooth scroll (useful for modals)
 */
export const stopScroll = () => {
    if (lenisInstance) {
        lenisInstance.stop()
    }
}

/**
 * Resume smooth scroll
 */
export const startScroll = () => {
    if (lenisInstance) {
        lenisInstance.start()
    }
}

/**
 * Destroy Lenis instance (cleanup)
 */
export const destroySmoothScroll = () => {
    if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
    }
    if (lenisInstance) {
        lenisInstance.destroy()
        lenisInstance = null
    }
}

export default initSmoothScroll
