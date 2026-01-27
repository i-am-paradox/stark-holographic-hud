import { useEffect, useRef } from 'react';
import { Twitter, Github, Disc, Heart } from 'lucide-react';

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const elements = footerRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <footer ref={footerRef} className="py-20 px-6 border-t border-white/5 bg-black relative overflow-hidden">
            {/* Footer Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none opacity-50"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-20 reveal">
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-200 to-amber-500"></div>
                            <span className="text-lg font-medium tracking-tight text-white">FFCT</span>
                        </div>
                        <p className="text-sm text-white/40 max-w-xs leading-relaxed">
                            Crafting sustainable futures for modern communities. Open transparency and ready for impact.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="text-white/40 hover:text-white transition-colors"><Github size={18} /></a>
                            <a href="#" className="text-white/40 hover:text-white transition-colors"><Disc size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Foundation</h4>
                        <ul className="space-y-3 text-sm text-white/40">
                            <li><a href="#" className="hover:text-white transition-colors">Mission</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Impact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">History</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Reports</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Connect</h4>
                        <ul className="space-y-3 text-sm text-white/40">
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Partner</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-white/40">
                            <li><a href="#" className="hover:text-white transition-colors">Privay</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Financials</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Status</h4>
                        <div className="flex items-center gap-2 text-sm text-emerald-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                            </span>
                            Active Operations
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/20 reveal delay-100">
                    <p>© 2026 FFCT. All rights reserved.</p>
                    <p className="flex items-center gap-1">Designed with <Heart size={10} className="text-amber-500" /> for the future</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
