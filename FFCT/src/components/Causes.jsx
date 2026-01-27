import { useEffect, useRef } from 'react';

const Causes = () => {
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

    const programs = [
        {
            title: "Project Shiksha",
            desc: "Smart classrooms bridging the digital divide.",
            img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Health Camps",
            desc: "Weekly checkups for remote communities.",
            img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Green Future",
            desc: "10,000 trees annually to combat erosion.",
            img: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    return (
        <section id="programs" ref={sectionRef} className="py-32 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">

                <h2 className="reveal text-3xl font-medium tracking-tight mb-16 text-center">Initiatives</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((prog, index) => (
                        <div
                            key={index}
                            className={`reveal delay-${(index + 1) * 100} glass-card overflow-hidden group`}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={prog.img}
                                    alt={prog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            </div>
                            <div className="p-8 relative">
                                <h3 className="text-lg font-medium mb-2 tracking-tight text-white">{prog.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed font-normal">
                                    {prog.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Causes;
