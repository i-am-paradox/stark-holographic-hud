import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Landing = () => {
    const containerRef = useRef(null);
    const titleRefs = useRef([]);

    useEffect(() => {
        // Re-enabling animation with clearer logic
        gsap.set(titleRefs.current, { y: 100, opacity: 0 });
        gsap.to(titleRefs.current, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.5
        });
    }, []);

    const addToRefs = (el) => {
        if (el && !titleRefs.current.includes(el)) {
            titleRefs.current.push(el);
        }
    };

    return (
        <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center z-10">

            {/* Background Noise with Standard Classes */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-white"></div>

            <div className="text-center space-y-4 md:space-y-8 mix-blend-difference">
                <div className="overflow-hidden">
                    <h1 ref={addToRefs} className="text-white text-6xl md:text-9xl font-bold font-serif leading-none tracking-tighter">
                        FOREVER
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h1 ref={addToRefs} className="text-white text-6xl md:text-9xl font-bold font-serif leading-none tracking-tighter">
                        FOUNDATION
                    </h1>
                </div>

                <div className="mt-10 overflow-hidden">
                    <p ref={addToRefs} className="text-yellow-500 text-lg md:text-xl uppercase tracking-[0.5em] font-medium font-sans">
                        Charitable Trust
                    </p>
                </div>
            </div>

            <div className="absolute bottom-20 flex flex-col items-center animate-bounce">
                <span className="text-xs tracking-widest text-gray-500 mb-2 font-sans">START THE JOURNEY</span>
                <div className="w-px h-10 bg-gray-500"></div>
            </div>

        </section>
    );
};

export default Landing;
