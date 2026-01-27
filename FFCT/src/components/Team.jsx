import { useRef, useEffect } from 'react';

const trustees = [
    { name: "Ashok Kumar", role: "President", label: "AK" },
    { name: "Anita Kharwar", role: "VP", label: "AK" },
    { name: "Pramod Singh", role: "Secretary", label: "PS" },
    { name: "Shiv Barnwal", role: "Deputy", label: "SB" },
    { name: "Gaurav K.", role: "Treasurer", label: "GK" },
    { name: "Rina Devi", role: "Deputy", label: "RD" },
];

const Team = () => {
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
        <section id="team" ref={sectionRef} className="py-32 px-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="reveal text-3xl font-medium tracking-tight mb-20 text-white">Leadership</h2>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    {trustees.map((member, i) => (
                        <div key={i} className="reveal delay-100 flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-white/40 mb-4 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
                                {member.label}
                            </div>
                            <h3 className="text-sm font-medium text-white">{member.name}</h3>
                            <p className="text-white/30 text-xs mt-1">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
