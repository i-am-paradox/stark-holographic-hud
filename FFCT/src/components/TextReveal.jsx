import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

const TextReveal = ({ children, className, delay = 0, stagger = 0.05 }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        // Split text into chars/words
        const split = new SplitType(text, { types: 'chars, words' });

        // Initial state
        gsap.set(split.chars, {
            y: 100,
            opacity: 0,
            rotateX: -90,
            transformOrigin: 'bottom center'
        });

        // Animation
        gsap.to(split.chars, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: stagger,
            duration: 1,
            ease: 'power4.out',
            delay: delay,
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        return () => {
            if (split) split.revert();
        };
    }, [children, delay, stagger]);

    return (
        <div ref={textRef} className={className}>
            {children}
        </div>
    );
};

export default TextReveal;
