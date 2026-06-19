/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, GitBranch, FileText, ShieldAlert, Cpu, GitPullRequest, Layers, Sparkles, Zap, Workflow, Code } from 'lucide-react';
import { FEATURES_DATA } from '../data';
import { FeatureItem } from '../types';

export default function Features() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterCategories = [
    { label: 'All features', id: 'all' },
    { label: 'Intelligence', id: 'intelligence' },
    { label: 'Optimization', id: 'optimization' },
    { label: 'Automation', id: 'automation' },
    { label: 'Collaboration', id: 'collaboration' }
  ];

  const filteredFeatures = activeFilter === 'all'
    ? FEATURES_DATA
    : FEATURES_DATA.filter(feat => feat.category === activeFilter);

  // Bulletproof icon mapper that handles dynamic icon rendering
  const renderFeatureIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className={className} />;
      case 'GitBranch':
        return <GitBranch className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'CommandLine':
        return <Cpu className={className} />;
      case 'GitPullRequest':
        return <GitPullRequest className={className} />;
      default:
        return <Code className={className} />;
    }
  };

  return (
    <section
      id="features"
      className="py-24 bg-slate-950 border-t border-white/5 border-b border-white/5 relative"
    >
      {/* Background radial soft light blur */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" id="features-ambient">
        <div className="absolute bottom-0 right-[15%] w-[450px] h-[450px] bg-teal-950/5 rounded-full blur-[140px]" />
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-indigo-950/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-teal-500/20 text-xs font-semibold text-teal-400 mb-4 font-mono select-none uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
            Engineered for high-throughput development
          </h2>
          <p className="text-lg text-slate-400 font-sans leading-relaxed">
            Eliminate boilerplate cycles. DevFlow AI translates system intent into validated production code modules directly inside your IDE workspace.
          </p>
        </div>

        {/* Feature Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-14" id="features-filter-row">
          {filterCategories.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-teal-350 border border-white/10 shadow-[0_4px_25px_rgba(20,184,166,0.08)]'
                    : 'text-slate-500 hover:text-slate-350 border border-transparent'
                }`}
                id={`feature-filter-${cat.id}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="features-bento-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((feat, idx) => {
              // Custom spanning pattern for visual rhythm
              const isLarge = idx === 0 || idx === 5;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  key={feat.id}
                  className={`relative p-8 rounded-2xl glass hover:border-teal-500/30 transition-all duration-300 group flex flex-col justify-between overflow-hidden shadow-[0_10px_40px_rgba(3,7,18,0.5)] md:col-span-1 ${
                    isLarge ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                  id={`feature-card-${feat.id}`}
                >
                  {/* Backdrop glowing gradient light on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-900/10 to-teal-500/0 group-hover:to-teal-500/5 transition-all duration-300 select-none" />

                  <div>
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center p-3 group-hover:border-teal-500/20 group-hover:bg-slate-900 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        {renderFeatureIcon(feat.icon, 'w-5 h-5 text-teal-400 group-hover:text-indigo-400 transition-colors duration-300')}
                      </div>

                      {feat.badge && (
                        <span className="px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-medium tracking-wide">
                          {feat.badge}
                        </span>
                      )}
                    </div>

                    {/* Meta info */}
                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                      {feat.description}
                    </p>
                  </div>

                  {/* Core Action Trigger */}
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 group-hover:text-teal-400 transition-colors duration-200 select-none pt-4 border-t border-white/5 mt-auto">
                    <span>devflow describe &apos;{feat.id}&apos;</span>
                    <Workflow className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300" />
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
