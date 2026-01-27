import React from 'react';

const trustees = [
    { name: "Ashok Kumar Kharwar", role: "President / Founder Trustee", relation: "S/o Late Lannu Kharwar" },
    { name: "Smt. Anita Kharwar", role: "Vice President", relation: "W/o Ashok Kumar Kharwar" },
    { name: "Pramod Kumar Singh", role: "Secretary", relation: "S/o Bhrigunath Singh" },
    { name: "Shiv Balak Barnwal", role: "Deputy Secretary", relation: "S/o Ramavad" },
    { name: "Gaurav Kharwar", role: "Treasurer", relation: "S/o Ashok Kumar Kharwar" },
    { name: "Smt. Rina Devi", role: "Deputy Treasurer", relation: "W/o Savle Kharwar" },
];

const Trustees = () => {
    return (
        <section className="w-full py-32 relative z-10 bg-black/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-5 text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-20">The Guardians</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trustees.map((t, i) => (
                        <div key={i} className="group p-8 border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:bg-white/5 rounded-sm text-left">
                            <div className="text-yellow-500 text-xs tracking-widest uppercase mb-2 font-bold">{t.role}</div>
                            <h3 className="text-xl md:text-2xl font-serif text-white mb-1">{t.name}</h3>
                            <p className="text-gray-500 text-sm italic">{t.relation}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trustees;
