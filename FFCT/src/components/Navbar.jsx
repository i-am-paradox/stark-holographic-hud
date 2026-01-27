import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const scrollToSection = (id) => {
        gsap.to(window, { duration: 1, scrollTo: id, ease: "power2.out" });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/5 backdrop-blur-md transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <div
                    onClick={() => scrollToSection(0)}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-200 to-amber-500"></div>
                    <div className="text-sm font-medium tracking-tight uppercase opacity-90 text-white">FFCT</div>
                </div>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-white/70">
                    <button onClick={() => scrollToSection('#features')} className="hover:text-white transition-colors duration-200">Mission</button>
                    <button onClick={() => scrollToSection('#technology')} className="hover:text-white transition-colors duration-200">Impact</button>
                    <button onClick={() => scrollToSection('#manifesto')} className="hover:text-white transition-colors duration-200">Vision</button>
                    <button onClick={() => scrollToSection('#team')} className="hover:text-white transition-colors duration-200">Team</button>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => scrollToSection('#donate')}
                        className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-medium hover:bg-gray-200 transition-colors duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        Donate Now
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
