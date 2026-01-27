import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import Landing from './components/Hero';
import Impact from './components/Impact';
import Causes from './components/Causes';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './components/About';
import Donate from './components/Donate';
import ThreeBackground from './components/ThreeBackground';

function App() {
    return (
        <SmoothScroll>
            <div className="relative w-full min-h-screen text-white selection:bg-amber-500/30">

                {/* 3D Background Layer */}
                <ThreeBackground />

                <Navbar />

                {/* Content Layer */}
                <main className="relative z-10 w-full">
                    <Landing />
                    <About />
                    <Impact />
                    <Causes />
                    <Team />
                    <Donate />
                    <Contact />
                </main>

                <Footer />

            </div>
        </SmoothScroll>
    );
}

export default App;
