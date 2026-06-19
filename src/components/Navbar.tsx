/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, Github, Star, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', target: 'features' },
    { label: 'How It Works', target: 'how-it-works' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'Pricing', target: 'pricing' },
    { label: 'FAQ', target: 'faq' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-300 glass rounded-2xl px-4 sm:px-8 py-2.5 shadow-[0_10px_40px_rgba(3,7,18,0.6)] ${
        scrolled ? 'border-white/15 bg-slate-900/60' : 'border-white/8 bg-slate-900/40'
      }`}
    >
      <div className="flex items-center justify-between h-14">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="brand-wrapper"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-600 p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-4.5 h-4.5 text-teal-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </div>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white space-x-1">
            DevFlow <span className="gradient-text italic">AI</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5" id="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/5 rounded-lg -z-10 border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-4" id="nav-cta-actions">
          {/* Stars Badge */}
          <a
            href="https://github.com"
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-white/8 hover:border-white/15 transition-all duration-200 group text-slate-300 hover:text-white text-xs font-mono"
            id="github-star-link"
          >
            <Github className="w-4 h-4 text-slate-400 group-hover:text-slate-100" />
            <Star className="w-3.5 h-3.5 text-teal-400 fill-teal-400" />
            <span>4.9k stars</span>
          </a>

          {/* Core Get Started CTA */}
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-sm font-bold shadow-lg shadow-white/5 transition-all duration-300 flex items-center gap-1.5 group cursor-pointer"
            id="nav-get-started-btn"
          >
            Deploy Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-slate-950" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3" id="mobile-trigger-container">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            id="mobile-menu-toggle-btn"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-neutral-950/95 border-b border-neutral-900 backdrop-blur-lg overflow-hidden"
            id="mobile-drawer"
          >
            <div className="px-4 py-6 space-y-3 flex flex-col">
              {navLinks.map((link) => {
                const isActive = activeSection === link.target;
                return (
                  <button
                    key={link.target}
                    onClick={() => handleLinkClick(link.target)}
                    className={`px-4 py-3 rounded-lg text-left text-base font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-neutral-900/50 text-white border-l-2 border-indigo-500 pl-3'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900/20'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-neutral-900 flex flex-col gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-mono"
                  id="mobile-github"
                >
                  <Github className="w-4 h-4" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Star on GitHub (4.9k)</span>
                </a>

                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
                  id="mobile-cta"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
