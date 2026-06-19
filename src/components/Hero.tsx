/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Zap, Shield, Sparkles, Server } from 'lucide-react';
import TerminalDemo from './TerminalDemo';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative pt-[140px] pb-20 md:pt-44 md:pb-28 overflow-hidden bg-slate-950 flex flex-col items-center justify-center min-h-[90vh]"
    >
      {/* Background ambient lighting orbs & grid lines */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" id="hero-ambient-lights">
        <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[150px]" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px]" />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 mix-blend-overlay" 
          style={{ maskImage: 'radial-gradient(circle at center, black, transparent 80%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        {/* Top Announcement Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-teal-500/20 text-xs text-teal-400 font-semibold mb-8 transition-colors duration-200 cursor-pointer select-none shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:bg-slate-900/70"
          onClick={() => onNavigate('features')}
          id="hero-announcement"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span className="font-mono text-slate-300">DevFlow AI joining Y Combinator S26</span>
          <ArrowRight className="w-3 h-3 text-teal-400" />
        </motion.div>

        {/* Dynamic Typography Header */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
          id="hero-main-title"
        >
          Automate software delivery with{' '}
          <span className="gradient-text">
            Agentic AI workflows
          </span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-sans"
          id="hero-subtitle"
        >
          The intelligent automation layer for developer teams. Optimize legacy SQL databases, bootstrap validated API endpoints, write deep vitest harnesses, and compile pristine markdown docs instantly.
        </motion.p>

        {/* Primary and secondary Call-In buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto"
          id="hero-cta-group"
        >
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-100 shadow-xl shadow-white/5 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-sm"
            id="hero-cta-primary"
          >
            Start Free Sandbox Trial
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform text-slate-950" />
          </button>
          
          <button
            onClick={() => onNavigate('how-it-works')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/50 border border-white/8 hover:border-white/15 text-slate-300 hover:text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
            id="hero-cta-secondary"
          >
            <Play className="w-4 h-4 text-teal-400 fill-teal-400" />
            Watch Product Demo
          </button>
        </motion.div>

        {/* Floating live playground terminal wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-4xl"
          id="hero-terminal-container"
        >
          <TerminalDemo />
        </motion.div>

        {/* Key trust builders & stats metrics badges (with subtle grid alignment) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 sm:mt-24 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass select-none"
          id="hero-metrics-indicators"
        >
          <div className="flex flex-col items-center p-3">
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-teal-400">14x</span>
            <span className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Refactor Index</span>
          </div>
          <div className="flex flex-col items-center p-3 border-l border-white/8 md:border-l-0">
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-indigo-400">99.4%</span>
            <span className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Doc Precision</span>
          </div>
          <div className="flex flex-col items-center p-3 border-l border-white/8">
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-purple-450">30k+</span>
            <span className="text-slate-400 text-xs mt-1 uppercase font-mono tracking-wider">Active Devs</span>
          </div>
          <div className="flex flex-col items-center p-3 border-l border-white/8">
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-white">Zero</span>
            <span className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Data Retention</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
