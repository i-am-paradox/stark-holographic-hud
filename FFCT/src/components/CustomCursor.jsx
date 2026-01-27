import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Move cursor and follower
        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            });
        };

        // Hover effects
        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        document.addEventListener('mousemove', onMouseMove);

        // Add listeners to interactive elements
        const links = document.querySelectorAll('a, button, .interactive');
        links.forEach(link => {
            link.addEventListener('mouseenter', onMouseEnter);
            link.addEventListener('mouseleave', onMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            links.forEach(link => {
                link.removeEventListener('mouseenter', onMouseEnter);
                link.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (isHovering) {
            gsap.to(cursor, { scale: 0.5, duration: 0.3 });
            gsap.to(follower, {
                scale: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'transparent',
                duration: 0.3
            });
        } else {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'white',
                duration: 0.3
            });
        }
    }, [isHovering]);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-colors"
            />
        </>
    );
};

export default CustomCursor;
