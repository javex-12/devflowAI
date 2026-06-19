/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Flame, Zap, AppWindow, ArrowRight, Asterisk } from 'lucide-react';
import { PRICING_PLANS } from '../data';
import { PricingPlan } from '../types';

interface PricingProps {
  onNavigate: (sectionId: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <section
      id="pricing"
      className="py-24 bg-slate-950 border-b border-white/5 relative"
    >
      {/* Background ambient gradient orbs */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" id="pricing-ambient">
        <div className="absolute top-[30%] right-[-5%] w-[450px] h-[450px] bg-indigo-950/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[420px] h-[420px] bg-teal-950/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-teal-500/20 text-xs font-semibold text-teal-400 mb-4 font-mono select-none uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 text-teal-400 font-bold" />
            Pricing Plans
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
            Predictable SaaS scale models
          </h2>
          <p className="text-lg text-slate-400 font-sans leading-relaxed">
            Choose the right subscription for your development flow. Save 20% by locking in annual billing. No hidden service charges, cancel anytime.
          </p>

          {/* Toggle Interactive Controller */}
          <div className="mt-10 flex items-center justify-center gap-3.5" id="pricing-toggle-wrapper">
            <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-555'}`}>
              Billed monthly
            </span>
            
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 rounded-full bg-slate-900 border border-white/5 p-1 flex items-center transition-all cursor-pointer relative"
              id="billing-toggle"
              title="Toggle billing period"
            >
              <motion.div
                layout
                className="w-5.5 h-5.5 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 shadow-md"
                animate={{ x: billingPeriod === 'yearly' ? '24px' : '0px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-white' : 'text-slate-555'}`}>
                Billed annually
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/20 text-[10px] text-teal-400 font-mono font-bold tracking-wider uppercase select-none animate-pulse">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" id="pricing-cards-grid">
          {PRICING_PLANS.map((plan: PricingPlan) => {
            const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly;
            return (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl flex flex-col justify-between relative transition-all duration-300 shadow-[0_20px_50px_rgba(3,7,18,0.7)] ${
                  plan.popular
                    ? 'glass border-teal-500/30 shadow-[0_0_50px_rgba(20,184,166,0.15)] -translate-y-2 lg:-translate-y-3 z-10'
                    : 'glass border-white/5 hover:border-white/10 hover:bg-slate-900/10 z-0'
                }`}
                id={`pricing-tier-${plan.name.toLowerCase()}`}
              >
                {/* Popular Highlight Badge Tag */}
                {plan.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-teal-450 to-indigo-605 text-white font-mono text-[10px] font-bold tracking-widest px-3 py-1 rounded-full flex items-center gap-1 select-none shadow-[0_4px_10px_rgba(20,184,166,0.3)] uppercase">
                    <Flame className="w-3.5 h-3.5 fill-white animate-bounce" />
                    Best Selling
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & subtitle details */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">{plan.name} Tier</span>
                    <h3 className="text-2xl font-display font-bold text-white">{plan.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-sans min-h-[60px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Financial Price Indicator */}
                  <div className="flex items-baseline gap-1 pt-4 border-t border-white/5">
                    <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                      ${price}
                    </span>
                    <span className="text-slate-500 font-sans text-sm">
                      /{billingPeriod === 'monthly' ? 'month' : 'month, billed yearly'}
                    </span>
                  </div>

                  {/* Pricing Feature Checklist checkboxes */}
                  <ul className="space-y-3.5 pt-4" id="pricing-features-list">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <div className="w-4.5 h-4.5 rounded-md bg-slate-950 border border-white/5 flex items-center justify-center p-0.5 mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-teal-450" />
                        </div>
                        <span className="font-sans leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary dynamic Action button trigger */}
                <div className="pt-8 mt-8 border-t border-white/5">
                  <button
                    onClick={() => onNavigate('contact')}
                    className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-teal-500 via-teal-400 to-indigo-600 hover:opacity-90 text-white shadow-[0_0_20px_rgba(20,184,166,0.25)]'
                        : 'bg-slate-950 hover:bg-slate-800 border border-white/5 text-slate-300 hover:text-white'
                    }`}
                    id={`pricing-tier-${plan.name.toLowerCase()}-btn`}
                  >
                    {plan.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
