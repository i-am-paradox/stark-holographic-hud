/**
 * useSmoothScroll Hook
 * Initializes Lenis smooth scroll and syncs with GSAP ScrollTrigger
 * 
 * Usage:
 * useSmoothScroll() // Call in App.jsx
 * 
 * Configuration:
 * - duration: Scroll animation duration (default: 1.2)
 * - smooth: Enable smooth scrolling (default: true)
 * - smoothTouch: Enable on touch devices (default: false for better mobile UX)
 */

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const useSmoothScroll = (options = {}) => {
    const {
        duration = 1.2,
        easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth = true,
        smoothTouch = false,
        touchMultiplier = 2
    } = options

    const lenisRef = useRef(null)

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration,
            easing,
            smooth,
            smoothTouch,
            touchMultiplier
        })

        lenisRef.current = lenis

        // Sync Lenis scroll with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Add Lenis to GSAP ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        // Disable GSAP lag smoothing for better sync
        gsap.ticker.lagSmoothing(0)

        // Cleanup
        return () => {
            lenis.destroy()
            gsap.ticker.remove(lenis.raf)
        }
    }, [duration, easing, smooth, smoothTouch, touchMultiplier])

    // Expose scroll methods
    const scrollTo = (target, options = {}) => {
        lenisRef.current?.scrollTo(target, options)
    }

    const stop = () => lenisRef.current?.stop()
    const start = () => lenisRef.current?.start()

    return { scrollTo, stop, start, lenis: lenisRef }
}

export default useSmoothScroll
