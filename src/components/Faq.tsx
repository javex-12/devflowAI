/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, MessageSquare, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data';
import { FaqItem } from '../types';

export default function Faq() {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']); // First one open by default

  const toggleAccordion = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((oId) => oId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section
      id="faq"
      className="py-24 bg-slate-950 border-b border-white/5 relative"
    >
      <div className="absolute inset-0 z-0 select-none pointer-events-none" id="faq-ambient">
        <div className="absolute bottom-[20%] left-[20%] w-[420px] h-[420px] bg-teal-950/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-teal-500/20 text-xs font-semibold text-teal-400 mb-4 font-mono select-none uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-teal-400 font-bold" />
            Support Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white mb-4">
            Answers to common questions
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            Everything you need to know about DevFlow AI - from security certifications, model licensing guidelines, to API rate limits.
          </p>
        </div>

        {/* FAQs list items */}
        <div className="space-y-4" id="faq-accordions-group">
          {FAQ_DATA.map((item: FaqItem) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl glass border-white/5 hover:border-teal-500/20 overflow-hidden transition-colors"
                id={`faq-accordion-container-${item.id}`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-6 py-5.5 flex items-center justify-between text-left gap-4 text-white hover:text-teal-300 transition-colors cursor-pointer"
                  id={`faq-header-${item.id}`}
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg tracking-wide leading-snug">
                    {item.question}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-slate-800 border-white/10' : 'rotate-0'
                  }`}>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </button>

                {/* Smooth Expand/Collapse body with motion height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      id={`faq-body-${item.id}`}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-400 font-sans leading-relaxed border-t border-white/5">
                        {item.answer}
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest select-none pt-4 border-t border-white/5">
                          <span>Category: {item.category}</span>
                          <span>•</span>
                          <span>Approved Document</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic CTA at target of FAQ */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl glass border-teal-500/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left select-none">
          <div className="space-y-1">
            <h4 className="text-white font-display font-bold text-lg">Still have some questions?</h4>
            <p className="text-sm text-slate-400 font-sans">Our solutions engineers are online to evaluate compile constraints or setup assistance.</p>
          </div>
          <button
            onClick={() => {
              const contactEl = document.getElementById('contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-white/5 text-sm font-medium text-white transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 animate-pulse-subtle"
            id="faq-support-cta-btn"
          >
            <MessageSquare className="w-4 h-4 text-teal-450" />
            Talk with Solutions Dev
          </button>
        </div>

      </div>
    </section>
  );
}
