/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Workflow, Shield, ArrowRight, GitBranch, Terminal, ShieldAlert, Cpu } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: '01',
      title: 'Context Sync',
      subtitle: 'Analyze Codebases',
      icon: GitBranch,
      description: 'DevFlow logs into your repositories (via simple local CLI trigger or git webhooks). It indexes abstract syntax trees (ASTs), schema models, and past test files to construct an isolated topological code context map.',
      termPrompt: 'devflow status --metrics',
      termLines: [
        'Connecting target repo: github.com/org/payment-service...',
        'Checking context hash: 4ff78b...',
        'Parsed 142 files | Found TS, SQL schema maps.',
        '🟢 Context graph fully updated in memory [Ready].'
      ]
    },
    {
      step: '02',
      title: 'Structural Audit',
      subtitle: 'Identify Refactor Hotspots',
      icon: ShieldAlert,
      description: 'The agent runs background tracing to isolate database queries, unsecured parameters, undocumented controllers, and low-coverage unit hooks. It charts optimization vectors and maps out work pipelines.',
      termPrompt: 'devflow audit --type=performance',
      termLines: [
        'Analyzing query patterns inside /src/db/queries...',
        '🚩 High risk rating on subquery join in profiles.ts:16',
        '💡 Recommendation: rewrite to агрегате array model',
        '📊 Work execution plan compiled [2 target files].'
      ]
    },
    {
      step: '03',
      title: 'Synthesis Execution',
      subtitle: 'Generate Optimizations',
      icon: Cpu,
      description: 'DevFlow models compile the optimized changes. Within seconds, it creates complete type-validated code blocks: SQL composite queries, Jest testing routines, Express rate-limit routes, or markdown files.',
      termPrompt: 'devflow optimize auth.ts --write',
      termLines: [
        'Refactoring target: registerUser handler...',
        'Injecting Zod validation schemas...',
        'Building Argon2 salt hashes & Vitest test suites...',
        '📝 Code optimized and rewritten instantly with zero syntax errors!'
      ]
    },
    {
      step: '04',
      title: 'Verification Sandbox',
      subtitle: 'Continuous QA Guard',
      icon: Shield,
      description: 'Before committing any edits back to your code branch, DevFlow parses the modified ASTs via real-world TypeScript linters inside container sandboxes. This guarantees 100% compile passes with zero breaks.',
      termPrompt: 'devflow verify --sandbox',
      termLines: [
        'Booting mock sandboxed runtime container...',
        'Executing compiler: tsc --noEmit...',
        'Running vitest suite [useThrottle tests, register-auth tests]...',
        '🟢 100% build tests passed! Sandbox safe for git commit push.'
      ]
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-slate-950 border-b border-white/5 relative"
    >
      <div className="absolute inset-0 z-0 select-none pointer-events-none" id="how-it-works-ambient">
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-teal-950/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-teal-500/20 text-xs font-semibold text-teal-400 mb-4 font-mono select-none uppercase tracking-widest">
            <Workflow className="w-3.5 h-3.5 text-teal-400 font-bold" />
            Execution Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
            How DevFlow AI drives velocity
          </h2>
          <p className="text-lg text-slate-400 font-sans leading-relaxed">
            From local CLI execution to container sandboxing, DevFlow ensures code synthesis is flawless, compile-checked, and perfectly aligned with your architectural principles.
          </p>
        </div>

        {/* Timeline Flow Matrix Split Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="how-it-works-matrix">
          
          {/* Timeline Steps Accordion List (Column Span 5) */}
          <div className="lg:col-span-5 space-y-4" id="timeline-accordion">
            {steps.map((st, idx) => {
              const StepIcon = st.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={st.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                    isActive
                      ? 'glass border-teal-500/20 shadow-[0_4px_25px_rgba(20,184,166,0.06)]'
                      : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                  id={`how-it-works-step-card-${st.step}`}
                >
                  {/* Step Code Icon & Header Column */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2.5 transition-colors ${
                      isActive ? 'bg-gradient-to-br from-teal-400 to-indigo-600 text-white shadow-lg' : 'bg-slate-900/60 text-slate-500 border border-white/5'
                    }`}>
                      <StepIcon className="w-5 h-5 animate-pulse" />
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-[1.5px] flex-1 bg-white/5 mt-3" />
                    )}
                  </div>

                  {/* Text Header / description */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold">Step {st.step}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />}
                    </div>
                    <h3 className="text-lg font-display font-bold text-white leading-tight">
                      {st.title}
                    </h3>
                    <p className={`text-sm leading-relaxed font-sans transition-all duration-300 ${
                      isActive ? 'text-slate-400 max-h-[160px]' : 'text-slate-600 max-h-[0px] overflow-hidden'
                    }`}>
                      {st.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Dynamic Shell Preview Box (Column Span 7) */}
          <div className="lg:col-span-7 glass p-6 rounded-2xl shadow-[0_10px_60px_rgba(3,7,18,0.7)] relative overflow-hidden" id="timeline-shell-panel">
            {/* Ambient subtle glow light of shell header */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-teal-500/5 rounded-full blur-[60px] pointer-events-none select-none" />

            {/* Window bar layout */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-red-500/40 rounded-full" />
                <div className="w-2.5 h-2.5 bg-yellow-500/40 rounded-full" />
                <div className="w-2.5 h-2.5 bg-green-500/40 rounded-full" />
                <span className="text-[10px] font-mono text-slate-500 ml-2">sandbox://runtime-v2-log</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400">ACTIVE ENV</span>
            </div>

            {/* Shell typewriter rendering */}
            <div className="font-mono text-xs leading-relaxed space-y-3 min-h-[180px]">
              {/* Shell prompt */}
              <div className="flex items-center gap-2 text-slate-400 select-none pb-2 border-b border-white/5">
                <span className="text-indigo-400 font-bold">~</span>
                <span className="text-slate-500">proj-owner$</span>
                <span className="text-white font-semibold">{steps[activeStep].termPrompt}</span>
              </div>

              {/* Logs line outputs with staggered simulated delays */}
              <div className="space-y-2 text-neutral-300 select-all" id="how-it-works-dynamic-view">
                {steps[activeStep] && steps[activeStep].termLines && steps[activeStep].termLines.map((line, lIdx) => {
                  const isSuccess = line && (line.startsWith('🟢') || line.includes('Success!') || line.startsWith('✅'));
                  const isAlert = line && (line.startsWith('🚩') || line.startsWith('⚠️'));
                  return (
                    <motion.div
                      key={`${activeStep}-${lIdx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: lIdx * 0.15 }}
                      className={`text-xs pl-0 flex items-start gap-2 ${
                        isSuccess ? 'text-emerald-400 font-semibold' : isAlert ? 'text-amber-400' : 'text-neutral-400'
                      }`}
                    >
                      <span>{line}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Step selection footer controls metrics indicators */}
            <div className="border-t border-neutral-900 pt-4 mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] text-neutral-600 font-mono tracking-wider">
              <span>PIPELINE ENGINE HOOK</span>
              <div className="flex items-center gap-2">
                <span>ACTIVE: STEP 0{activeStep + 1}</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
