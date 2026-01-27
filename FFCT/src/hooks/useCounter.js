/**
 * useCounter Hook
 * Animated counter that counts up when element is in view
 * 
 * Usage:
 * const { ref, count } = useCounter(50000, { duration: 2 })
 * <span ref={ref}>{count}</span>
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const useCounter = (endValue, options = {}) => {
    const {
        duration = 2,
        ease = 'power2.out',
        threshold = 0.5,  // 50% visible
        suffix = '',      // e.g., '+', '%'
        prefix = ''       // e.g., '$'
    } = options

    const ref = useRef(null)
    const [count, setCount] = useState(0)
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!ref.current || hasAnimated.current) return

        const counter = { value: 0 }

        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start: `top ${100 - threshold * 100}%`,
            onEnter: () => {
                if (hasAnimated.current) return
                hasAnimated.current = true

                gsap.to(counter, {
                    value: endValue,
                    duration,
                    ease,
                    onUpdate: () => {
                        setCount(Math.floor(counter.value))
                    }
                })
            }
        })

        return () => trigger.kill()
    }, [endValue, duration, ease, threshold])

    // Format the display value
    const formattedCount = `${prefix}${count.toLocaleString()}${suffix}`

    return { ref, count, formattedCount }
}

export default useCounter
