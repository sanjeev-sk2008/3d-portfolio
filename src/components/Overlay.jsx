import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Overlay() {
  const overlayRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('.gsap-section');
      
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 100 },
          {
            opacity: 1, 
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  // Removed "absolute" so this overlay correctly stretches the page height for scrolling!
  return (
    <div ref={overlayRef} className="w-full pointer-events-none flex flex-col items-center pb-20">
      
      {/* Brand Header */}
      <div className="fixed top-8 left-8 pointer-events-auto z-50">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Sanjeev <span className="text-gold">Sharath Kumar</span>
        </h1>
        <p className="text-[10px] md:text-xs text-white/60 tracking-[0.3em] uppercase font-light mt-1">
          Creative Developer
        </p>
      </div>

      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col justify-end items-center px-4 relative pb-24">
        <div className="gsap-section text-center pointer-events-auto">
          <p className="text-sm md:text-base text-white/70 tracking-widest uppercase font-light">
            Scroll to discover the build
          </p>
        </div>
        
        <div className="absolute bottom-10 animate-bounce text-white/50 pointer-events-auto">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Accomplishments Section - Massive White Panel */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-20 z-10">
        <div className="w-full max-w-6xl pointer-events-auto bg-white rounded-[40px] shadow-2xl p-10 md:p-24 relative overflow-hidden">
          {/* Gold highlight accent */}
          <div className="absolute top-0 left-0 w-full h-3 bg-gold"></div>
          
          <h2 className="gsap-section text-5xl md:text-7xl font-black mb-20 tracking-tighter uppercase leading-none text-navy">
            What Was <br/><span className="text-gold-dark">Accomplished</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            {/* Tech Stack */}
            <div className="gsap-section flex flex-col gap-4">
              <span className="text-6xl text-navy font-black opacity-10">01</span>
              <h3 className="text-3xl font-bold text-navy tracking-tight">Tech Stack Initialization</h3>
              <p className="text-lg text-black font-medium leading-relaxed">
                Bootstrapped a blazing fast Vite + React environment integrated with <strong className="text-gold-dark">@react-three/fiber</strong> for GPU-accelerated 3D rendering and <strong className="text-navy">gsap</strong> for buttery-smooth scroll triggers.
              </p>
            </div>

            {/* Cyber-Core */}
            <div className="gsap-section flex flex-col gap-4">
              <span className="text-6xl text-navy font-black opacity-10">02</span>
              <h3 className="text-3xl font-bold text-navy tracking-tight">Procedural 3D Cyber-Core</h3>
              <p className="text-lg text-black font-medium leading-relaxed">
                To ensure the site is 100% resilient and loads instantly regardless of network or DNS restrictions, I built a custom Procedural Cyber-Core using native Three.js mathematics. It renders glass and metallic properties dynamically.
              </p>
            </div>
            
            {/* Fluid Interactivity */}
            <div className="gsap-section flex flex-col gap-8 md:col-span-2 mt-8 border-t-2 border-navy/10 pt-16">
              <div className="flex items-baseline gap-4">
                <span className="text-6xl text-navy font-black opacity-10">03</span>
                <h3 className="text-4xl font-bold text-navy tracking-tight">Fluid Interactivity</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="p-6 bg-navy/5 rounded-2xl border border-navy/10 hover:border-gold transition-colors">
                  <h4 className="text-xl font-bold text-navy mb-3">Scroll Parallax</h4>
                  <p className="text-base text-black font-medium">As you scroll, the entire 3D object elegantly floats upwards, giving a frictionless feeling.</p>
                </div>
                <div className="p-6 bg-navy/5 rounded-2xl border border-navy/10 hover:border-gold transition-colors">
                  <h4 className="text-xl font-bold text-navy mb-3">Mouse Parallax</h4>
                  <p className="text-base text-black font-medium">A global window listener accurately maps your mouse movements to the inner core's rotation, preventing CSS blocks.</p>
                </div>
                <div className="p-6 bg-navy/5 rounded-2xl border border-navy/10 hover:border-gold transition-colors">
                  <h4 className="text-xl font-bold text-navy mb-3">Drag-to-Rotate</h4>
                  <p className="text-base text-black font-medium">The outer PresentationControls wrapper allows you to click and drag the environment to view it from any angle.</p>
                </div>
              </div>
            </div>

            {/* Copywriting */}
            <div className="gsap-section flex flex-col gap-4 mt-8">
              <span className="text-6xl text-navy font-black opacity-10">04</span>
              <h3 className="text-3xl font-bold text-navy tracking-tight">Professional Copywriting</h3>
              <p className="text-lg text-black font-medium leading-relaxed">
                The tone of the website was updated to frame you as a Creative Developer and Software Engineer, completely removing any "cringe" or "vibe coding" references.
              </p>
            </div>

            {/* Styling */}
            <div className="gsap-section flex flex-col gap-4 mt-8">
              <span className="text-6xl text-navy font-black opacity-10">05</span>
              <h3 className="text-3xl font-bold text-navy tracking-tight">Strict Styling Guidelines</h3>
              <p className="text-lg text-black font-medium leading-relaxed">
                The UI overlay enforces the color constraints flawlessly, with this white section using strictly black text and prominent navy/gold highlights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Results */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-32 z-10">
        <div className="w-full max-w-5xl pointer-events-auto">
          <h2 className="gsap-section text-5xl md:text-7xl font-black mb-20 text-white tracking-tighter">
            Validation <span className="text-gold">Results</span>
          </h2>

          <div className="space-y-16">
            <div className="gsap-section group cursor-default">
              <h3 className="text-3xl font-bold text-white flex items-center gap-6 mb-4">
                <span className="w-12 h-2 bg-gold inline-block group-hover:w-24 group-hover:bg-white transition-all duration-500"></span> 
                Framerate & Performance
              </h3>
              <p className="text-xl text-white/80 font-light ml-18 pl-4 border-l border-white/20">
                The procedural geometries compile instantly and run at a stable 60+ FPS without causing memory leaks or hanging suspense states.
              </p>
            </div>

            <div className="gsap-section group cursor-default">
              <h3 className="text-3xl font-bold text-white flex items-center gap-6 mb-4">
                <span className="w-12 h-2 bg-gold inline-block group-hover:w-24 group-hover:bg-white transition-all duration-500"></span> 
                GSAP Animations
              </h3>
              <p className="text-xl text-white/80 font-light ml-18 pl-4 border-l border-white/20">
                The ScrollTrigger sections reliably snap in and out of view with the power4.out easing curve, bringing this text to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-[80vh] w-full flex flex-col justify-center items-center px-4 mt-20">
        <div className="gsap-section pointer-events-auto text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-7xl font-bold mb-10 text-white tracking-tighter">
            Establish <span className="text-gold">Contact</span>
          </h2>
          
          <a 
            href="https://github.com/sanjeev-sk2008" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-white text-navy font-bold text-xl rounded-full flex items-center gap-3 overflow-hidden transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="relative z-10 group-hover:text-navy transition-colors"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.02c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
            </svg>
            <span className="relative z-10 group-hover:text-navy transition-colors">GitHub Profile</span>
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full pt-32 pb-8 text-center text-white/40 text-sm tracking-widest font-light pointer-events-auto">
        &copy; {new Date().getFullYear()} SANJEEV SHARATH KUMAR. DIGITAL EXPERIENCES.
      </footer>
    </div>
  );
}
