/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, Mail, User, ShieldAlert, Cpu, Sparkles, Server, Terminal } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Developer',
    tierInterest: 'Pro',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'FullName is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) tempErrors.message = 'Please provide brief details of your request';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API callback pipeline
      setTimeout(() => {
        setIsLoading(false);
        setSubmitted(true);
      }, 1000);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      role: 'Developer',
      tierInterest: 'Pro',
      message: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-slate-950 border-b border-white/5 relative"
    >
      {/* Background neon ambient lights */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" id="contact-ambient">
        <div className="absolute top-[20%] left-[80%] w-[380px] h-[380px] bg-indigo-950/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[420px] h-[420px] bg-teal-950/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="contact-split-grid">
          
          {/* Column Left: Visual Marketing Hooks (Column Span 5) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6 text-left" id="contact-left-branding">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-teal-500/20 text-xs font-semibold text-teal-400 font-mono select-none uppercase tracking-widest">
              <Mail className="w-3.5 h-3.5 text-teal-400 font-bold" />
              Succeed With Us
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s build the future of software
            </h2>
            
            <p className="text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
              Ready to scale up dev velocity? Trigger sandboxed trial requests, secure on-premise VPC setups, or book dedicated enterprise solution blueprints.
            </p>

            <div className="space-y-4 pt-6 border-t border-white/5" id="contact-details-bullets">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center p-2 text-indigo-400">
                  <Terminal className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-display">Developer Sandbox</h4>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Start free locally with full compound SQL pipeline optimizations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-19 h-9 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center p-2 text-teal-400">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-display">On-Premises deployment</h4>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Secure your private cloud clusters with complete zero data-retention guarantees.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column Right: Glassmorphism Contact Form (Column Span 7) */}
          <div className="lg:col-span-12 xl:col-span-7" id="contact-form-card">
            <div className="p-6 sm:p-10 rounded-2xl glass shadow-[0_20px_50px_rgba(3,7,18,0.7)] min-h-[460px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  /* INQUIRY FORM PANEL */
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    id="contact-form-element"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">Your name *</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Sarah Chen"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors ${
                              errors.name ? 'border-red-500/40' : 'border-white/5'
                            }`}
                            id="input-name"
                          />
                        </div>
                        {errors.name && <p className="text-red-400 text-xs font-sans mt-1">{errors.name}</p>}
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">Work Email *</label>
                        <input
                          type="email"
                          placeholder="sarah@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors ${
                            errors.email ? 'border-red-500/40' : 'border-white/5'
                          }`}
                          id="input-email"
                        />
                        {errors.email && <p className="text-red-400 text-xs font-sans mt-0.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Company input */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">Company name</label>
                        <input
                          type="text"
                          placeholder="Acme Corp"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                          id="input-company"
                        />
                      </div>

                      {/* Role selection dropdown */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">Who are you?</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-350 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
                          id="select-role"
                        >
                          <option value="Developer">Senior Engineer / Developer</option>
                          <option value="Architect">Software Architect</option>
                          <option value="Manager">Engineering Manager</option>
                          <option value="Founder">SaaS Founder</option>
                        </select>
                      </div>
                    </div>

                    {/* Message detail */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">How can we help? *</label>
                      <textarea
                        rows={4}
                        placeholder="I want to integrate DevFlow unit testing workflows into our internal CI/CD pipelines..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-605 focus:outline-none focus:border-teal-500 transition-colors ${
                          errors.message ? 'border-red-500/40' : 'border-white/5'
                        }`}
                        id="input-message"
                      />
                      {errors.message && <p className="text-red-400 text-xs font-sans mt-0.5">{errors.message}</p>}
                    </div>

                    {/* Submit CTA button with dynamic loader */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 via-teal-400 to-indigo-600 hover:opacity-90 text-white font-medium text-sm flex items-center justify-center gap-2 group cursor-pointer transition-transform duration-200 shadow-md active:scale-98"
                      id="contact-submit-btn"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <>
                          Submit Inquiry
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  /* SUBMISSION SUCCESS PANEL */
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="text-center py-6 flex flex-col items-center justify-center space-y-6 font-sans"
                    id="contact-success-stage"
                  >
                    {/* Glowing Check icon */}
                    <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-teal-500/30 flex items-center justify-center p-3 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.25)] animate-bounce">
                      <Check className="w-8 h-8 font-bold" />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-2xl font-display font-bold text-white">Pipeline active!</h3>
                      <p className="text-slate-405 text-sm leading-relaxed">
                        Thank you, <span className="text-white font-semibold">{formData.name}</span>. We successfully received your inquiry for the <span className="text-teal-400 font-extrabold">{formData.tierInterest || 'Pro'}</span> tier plan.
                      </p>
                      <p className="text-slate-500 text-xs font-mono pt-3">
                        DISPATCH_REF: devflow-node-{Math.random().toString(36).substring(7).toUpperCase()}
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/5 text-xs text-slate-400 hover:text-white transition-all cursor-pointer font-mono"
                      id="contact-reset-btn"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
