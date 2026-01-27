import { useEffect, useRef } from 'react';
import { GraduationCap, Heart, Leaf, Zap } from 'lucide-react';

const About = () => {
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

    const cards = [
        {
            icon: GraduationCap,
            title: "Education First",
            desc: "Igniting curiosity through scholarships and smart classrooms."
        },
        {
            icon: Heart,
            title: "Healthcare Access",
            desc: "Critical surgeries and mobile clinics for the underserved."
        },
        {
            icon: Leaf,
            title: "Sustainable Earth",
            desc: "Planting forests and managing waste for a greener tomorrow."
        }
    ];

    return (
        <section id="features" ref={sectionRef} className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-[2px]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="reveal">
                        <h2 className="text-3xl font-medium tracking-tight mb-4">Core Pillars</h2>
                        <p className="text-white/50 max-w-md text-sm leading-relaxed">
                            Structured around three fundamental rights, our mission delivers high-frequency impact across underserved demographics.
                        </p>
                    </div>
                    <div className="text-right hidden md:block reveal delay-100">
                        <div className="text-xs text-white/30 font-mono mb-1">IMPACT RADIUS</div>
                        <div className="text-xl text-emerald-400 font-mono">150km+</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, i) => (
                        <div key={i} className={`reveal delay-${(i + 1) * 100} glass-card p-8 group`}>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <card.icon size={20} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-medium mb-2 tracking-tight">{card.title}</h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
