import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Donate = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
            }
        );
    }, []);

    return (
        <section id="donate" ref={containerRef} className="py-40 bg-bg-secondary text-center">

            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-text-main">
                Be the Change.
            </h2>

            <p className="max-w-xl mx-auto text-xl text-text-secondary mb-12 font-light">
                Your contribution directly fuels these initiatives. Transparency is our core value. Join us in making a difference today.
            </p>

            <button className="bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-full text-lg font-semibold transition-transform hover:scale-105 shadow-xl shadow-primary/30">
                Support Our Mission
            </button>

        </section>
    );
};

export default Donate;
