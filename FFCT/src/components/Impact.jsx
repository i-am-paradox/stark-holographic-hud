import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const Impact = () => {
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

    const stats = [
        { label: "Lives Impacted", value: "15k+" },
        { label: "Villages Served", value: "240+" },
        { label: "Years Active", value: "50+" },
        { label: "Transparency", value: "100%" },
    ];

    return (
        <>
            {/* Manifesto / Quote Section */}
            <section id="manifesto" ref={sectionRef} className="py-40 px-6 border-t border-white/5 bg-black/40 backdrop-blur-lg">
                <div className="max-w-4xl mx-auto text-center reveal">
                    <Quote className="text-white/20 mb-8 mx-auto" size={32} strokeWidth={1.5} />
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                        "We don't just donate. We build the primitives for the next generation of rural infrastructure."
                    </h2>
                    <div className="mt-12 flex items-center justify-center gap-4 reveal delay-200">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold font-mono">AK</div>
                        <div className="text-left">
                            <div className="text-sm font-medium text-white">Ashok Kumar Kharwar</div>
                            <div className="text-xs text-white/40">President, FFCT</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="technology" className="py-24 px-6 border-t border-white/5 bg-black/60">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2 reveal delay-100">
                            <span className="text-4xl font-medium tracking-tight text-white">{stat.value}</span>
                            <span className="text-xs font-medium uppercase text-white/40 tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Impact;
