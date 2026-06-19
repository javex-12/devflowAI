/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Smooth scroll and spy handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 72; // height of fixed header on scroll
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scrollspy observer implementation
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['hero', 'features', 'how-it-works', 'testimonials', 'pricing', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 180; // offset benchmark threshold

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-505/30 selection:text-white antialiased overflow-x-hidden scroll-smooth relative">
      
      {/* Immersive UI Glow Dots */}
      <div className="glow-dot -top-40 -left-40 overflow-hidden" />
      <div className="glow-dot top-1/2 -right-40 overflow-hidden" />
      <div className="glow-dot bottom-0 left-10 overflow-hidden" />

      {/* Absolute Global Ambient Noise Canvas Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none select-none z-40 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22105%25%22 filter=%22url(%23noise)%22/></svg>')]"
      />

      {/* Floating fixed top header navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Core View Modules index layout */}
      <main id="main-content">
        <Hero onNavigate={handleNavigate} />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing onNavigate={handleNavigate} />
        <Faq />
        <Contact />
      </main>

      {/* Structured sitemaps and triggers footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
