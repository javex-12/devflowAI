/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Github, Twitter, Linkedin, ArrowUp, Send, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const productLinks = [
    { label: 'SQL Optimizer', target: 'features' },
    { label: 'API Scaffold Builder', target: 'features' },
    { label: 'Unit Test Harness', target: 'features' },
    { label: 'CI/CD pipeline CI', target: 'features' },
  ];

  const resourceLinks = [
    { label: 'Documentation guides', target: 'faq' },
    { label: 'Y Combinator stage', target: 'hero' },
    { label: 'Pricing plans', target: 'pricing' },
    { label: 'Sandbox terminal', target: 'hero' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-slate-950 pt-20 pb-8 border-t border-white/5 overflow-hidden relative"
    >
      {/* Background soft ambient dots */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" id="footer-ambient">
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-teal-950/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core footer columns sitemap container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-16 mb-12" id="footer-links-grid">
          
          {/* Brand Col: description and social hooks (Span 4) */}
          <div className="md:col-span-4 space-y-6">
            <div
              onClick={scrollToTop}
              className="flex items-center gap-2 cursor-pointer group w-fit"
              id="footer-brand"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 p-[1px] shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-4.5 h-4.5 text-teal-450 group-hover:text-teal-300 transition-colors duration-200" />
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white">
                DevFlow <span className="text-teal-400">AI</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-sm">
              The premium YC-stage developer automation system. We ingest query blueprints, controller APIs, and unit test suites to accelerate engineering deliverables under 120 seconds.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3" id="social-icons">
              <a
                href="https://github.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/10 transition-colors"
                id="social-github"
                aria-label="GitHub Profile"
              >
                <Github className="w-4.5 h-4.5" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/10 transition-colors"
                id="social-twitter"
                aria-label="Twitter Feed"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-805 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                id="social-linkedin"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Columns 2: Product (Span 2) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 select-none">Product</h4>
            <ul className="space-y-2.5">
              {productLinks.map((p, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(p.target)}
                    className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columns 3: Resources (Span 2) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 select-none">Resources</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((r, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(r.target)}
                    className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {r.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columns 4: Multi-newsletter subscribing (Span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 select-none">Subscribe newsletter</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Sign up for secure release notes, performance indexes, and AI model feature drops.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 relative" id="newsletter-form">
              <input
                type="email"
                placeholder="developer@work.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                id="newsletter-email-input"
                required
              />
              <button
                type="submit"
                className="px-3.5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center cursor-pointer max-w-[50px] font-bold"
                id="newsletter-submit-btn"
                title="Subscribe form"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
              </button>

              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-0 bottom-[-30px] text-[10px] text-teal-400 font-mono flex items-center gap-1 select-none"
                    id="newsletter-indicator"
                  >
                    <Check className="w-3 h-3" />
                    Subscribed! Welcome to DevFlow.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Bottom micro footer copyright rows and scroll up button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-550 font-mono tracking-wider" id="footer-bottom-row">
          <span>© 2026 DevFlow AI, Inc. All rights reserved. S26 Cohort.</span>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of service</a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-805 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer shadow-md select-none"
              id="scroll-to-top-btn"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
