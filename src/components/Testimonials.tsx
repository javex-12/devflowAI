/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Users, BrainCircuit, Heart, MessageSquare } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';
import { TestimonialItem } from '../types';

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Engineering' | 'Product' | 'Founder'>('All');

  const filterTabs: ('All' | 'Engineering' | 'Product' | 'Founder')[] = ['All', 'Engineering', 'Product', 'Founder'];

  const filteredTestimonials = activeFilter === 'All'
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.filter(t => t.tag === activeFilter);

  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-950 border-b border-white/5 relative"
    >
      <div className="absolute inset-0 z-0 select-none pointer-events-none" id="testimonials-ambient">
        <div className="absolute top-1/2 left-[10%] w-[380px] h-[380px] bg-teal-950/5 rounded-full blur-[130px]" />
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-fuchsia-950/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-teal-500/20 text-xs font-semibold text-teal-400 mb-4 font-mono select-none uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-teal-400 font-bold" />
            Social Validation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
            Vouched by engineering scale leaders
          </h2>
          <p className="text-lg text-slate-400 font-sans leading-relaxed">
            Discover why developers from high-velocity YC teams, Vercel, Supabase, and Stripe rely on DevFlow AI to ship code safely.
          </p>
        </div>

        {/* Roles Filter Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-14" id="testimonials-filter-row">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-teal-350 border border-white/10 shadow-md'
                    : 'text-slate-500 hover:text-slate-350 border border-transparent'
                }`}
                id={`testimonial-filter-${tab}`}
              >
                {tab === 'All' ? 'View All reviews' : `${tab} team`}
              </button>
            );
          })}
        </div>

        {/* Testimonials Card Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="testimonials-card-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((review) => {
              // Creating a simple mock initials or letter token if initials are needed
              const initials = review.name.split(' ').map(n => n[0]).join('');
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={review.id}
                  className="p-6 sm:p-8 rounded-2xl glass hover:border-teal-500/35 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between shadow-[0_10px_40px_rgba(3,7,18,0.5)]"
                  id={`testimonial-card-${review.id}`}
                >
                  <div className="space-y-4">
                    {/* Header Row: Stars and Rating details */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5" id="stars-row">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                      
                      <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-white/5 text-[9px] font-mono font-semibold text-slate-500 tracking-wider">
                        {review.tag.toUpperCase()}
                      </span>
                    </div>

                    {/* Content statement quotes */}
                    <p className="text-slate-300 text-sm leading-relaxed font-sans italic">
                      &ldquo;{review.content}&rdquo;
                    </p>
                  </div>

                  {/* Profile Signature Card */}
                  <div className="flex items-center gap-3.5 pt-6 border-t border-white/5 mt-6">
                    {/* Avatar Initials Placeholder */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-teal-400 p-[1px]">
                      <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center font-bold text-xs text-white">
                        {initials}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-display font-bold text-white truncate">
                        {review.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-sans truncate">
                        {review.role} • <span className="text-slate-400 font-semibold">{review.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
