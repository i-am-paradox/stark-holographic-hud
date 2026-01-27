import { useEffect, useRef } from 'react';
import { MousePointer2, ArrowRight } from 'lucide-react';

const Hero = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const elements = sectionRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col justify-center items-start px-6 md:px-12 max-w-7xl mx-auto pt-20">

            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-medium text-amber-200/90 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <span className="tracking-wide">Transforming Lives Daily</span>
            </div>

            {/* Headline */}
            <h1 className="reveal delay-100 text-5xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                Elevating <br /> Humanity.
            </h1>

            {/* Subhead */}
            <p className="reveal delay-200 text-lg md:text-xl text-white/60 font-normal leading-relaxed max-w-lg mb-12 tracking-wide">
                Building bridges to a sustainable future through education, healthcare, and community empowerment.
            </p>

            {/* Buttons */}
            <div className="reveal delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="group flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-200">
                    Explore Our Work
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-200">
                    <span className="font-mono opacity-80">Join the movement</span>
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-3 text-xs text-white/40 font-medium animate-pulse">
                <MousePointer2 size={14} />
                Scroll to animate the sunset
            </div>
        </section>
    );
};

export default Hero;
