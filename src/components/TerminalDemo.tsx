/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Cpu, BadgeCheck, FileText, Play, Check, Copy, RefreshCw, Terminal, Eye } from 'lucide-react';
import { TERMINAL_SAMPLES } from '../data';
import { TerminalSample } from '../types';

export default function TerminalDemo() {
  const [selectedTab, setSelectedTab] = useState<string>('query');
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [typedCode, setTypedCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const logTimerRef = useRef<NodeJS.Timeout | null>(null);
  const writeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSample = TERMINAL_SAMPLES.find((s) => s.id === selectedTab) || TERMINAL_SAMPLES[0];

  // Helper mapper to render category icons in the sidebar selector
  const renderTabIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'BadgeCheck':
        return <BadgeCheck className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      default:
        return <Terminal className={className} />;
    }
  };

  // Run the typewriter and step aggregation simulator
  const runSimulation = (sample: TerminalSample) => {
    // Clear previous timeouts
    if (logTimerRef.current) clearTimeout(logTimerRef.current);
    if (writeTimerRef.current) clearTimeout(writeTimerRef.current);

    setIsProcessing(true);
    setVisibleLogs([]);
    setTypedCode('');
    setCopied(false);

    let currentLogIndex = 0;
    const logsList = sample.logs;

    const streamLogs = () => {
      if (currentLogIndex < logsList.length) {
        setVisibleLogs((prev) => [...prev, logsList[currentLogIndex]]);
        currentLogIndex++;
        logTimerRef.current = setTimeout(streamLogs, 400);
      } else {
        // Logs finished, type code output
        setIsProcessing(false);
        typeCode(sample.finalCode);
      }
    };

    streamLogs();
  };

  const typeCode = (code: string) => {
    let index = 0;
    const speed = 8; // Milliseconds per character chunk to keep it fast

    const type = () => {
      if (index < code.length) {
        // Add chunk of characters for premium speed
        const chunk = code.substring(0, index + 4);
        setTypedCode(chunk);
        index += 4;
        writeTimerRef.current = setTimeout(type, speed);
      } else {
        setTypedCode(code);
      }
    };
    type();
  };

  // Trigger when tab changes
  useEffect(() => {
    runSimulation(activeSample);
    return () => {
      if (logTimerRef.current) clearTimeout(logTimerRef.current);
      if (writeTimerRef.current) clearTimeout(writeTimerRef.current);
    };
  }, [selectedTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSample.finalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="w-full glass rounded-2xl p-1.5 sm:p-2.5 shadow-[0_20px_50px_rgba(3,7,18,0.7)]"
      id="devflow-terminal-demo-stage"
    >
      {/* Top Outer Controls & Tab Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-3 p-3 gap-3">
        {/* Left Mac Style Window Dots */}
        <div className="flex items-center gap-1.5" id="mock-window-dots">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          <span className="ml-2 text-xs font-mono text-slate-500 tracking-wider">devflow-terminal.sh</span>
        </div>

        {/* Tab Actions switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/5">
          {TERMINAL_SAMPLES.map((sample) => {
            const isSelected = selectedTab === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => setSelectedTab(sample.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-250 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-teal-300 border border-white/10 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
                id={`tab-select-${sample.id}`}
              >
                {renderTabIcon(sample.iconName, `w-3.5 h-3.5 ${isSelected ? 'text-teal-400 animate-pulse' : 'text-slate-500'}`)}
                {sample.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Editor Split View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] text-sm overflow-hidden" id="terminal-grid-wrapper">
        
        {/* Log Stream Output Shell (Column Span 5) */}
        <div className="lg:col-span-5 bg-slate-950/80 p-4 border-r border-white/5 flex flex-col justify-between font-mono text-slate-300">
          <div className="space-y-3">
            {/* Input prompt lines */}
            <div className="flex items-center gap-2 group border-b border-white/5 pb-2">
              <span className="text-indigo-400 font-bold select-none">~</span>
              <span className="text-emerald-500 select-none">root$</span>
              <span className="text-white flex-1 break-all select-all font-semibold">
                {activeSample.command}
              </span>
            </div>

            {/* Stepped log files container */}
            <div className="space-y-2 mt-3 select-none" id="log-output-container">
              {visibleLogs.map((log, index) => {
                const isCheck = log && (log.startsWith('✅') || log.startsWith('🟢'));
                const isWarn = log && log.startsWith('⚠️');
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2 leading-relaxed text-xs ${
                      isCheck ? 'text-emerald-400' : isWarn ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    <span>{log}</span>
                  </motion.div>
                );
              })}

              {/* Live Blinking State Loader */}
              {isProcessing && (
                <div className="flex items-center gap-2 text-indigo-450 text-xs py-1" id="log-loader-line">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                  <span className="text-slate-450">Processing code optimization filters...</span>
                </div>
              )}
            </div>
          </div>

          {/* Trigger Play button manually at footer of logs */}
          <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider">DEVFLOW ENGINE V2.4</span>
            <button
              onClick={() => runSimulation(activeSample)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 border border-white/5 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
              id="terminal-retrigger-btn"
            >
              <Play className="w-3 h-3 text-teal-400 fill-teal-400" />
              Re-Run Process
            </button>
          </div>
        </div>

        {/* Code Output Textarea (Column Span 7) */}
        <div className="lg:col-span-7 bg-slate-900/20 flex flex-col p-4 relative" id="code-panel">
          {/* Header toolbar for code tab */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-450 animate-ping" />
              <span className="text-xs font-mono text-teal-400/90 font-medium tracking-wide">
                OUTPUT: {activeSample.finalLang.toUpperCase()}
              </span>
            </div>

            {/* Editor tools buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="p-1 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-white/5 text-slate-450 hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                id="copy-code-btn"
                title="Copy Code"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-450" />
                    <span className="text-emerald-450 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Content display with typewriter effect and lines numbering scroll */}
          <div className="flex-1 font-mono text-xs text-slate-300 overflow-auto max-h-[300px] leading-relaxed custom-textarea-scroll select-all">
            <table className="w-full border-collapse">
              <tbody>
                {typedCode.split('\n').map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/10 transition-colors">
                    <td className="w-8 select-none text-right pr-3.5 text-slate-600 border-r border-white/5 pr-3 font-mono text-[10px]">
                      {idx + 1}
                    </td>
                    <td className="pl-4 whitespace-pre pr-2 text-indigo-100 font-medium" style={{ tabSize: 2 }}>
                      {/* Let's highlight some simple keywords */}
                      {line && (line.startsWith('SELECT') || line.startsWith('FROM') || line.startsWith('WHERE') || line.startsWith('INNER JOIN') || line.startsWith('LEFT JOIN') || line.startsWith('ORDER BY') || line.startsWith('LIMIT') || line.startsWith('COALESCE') || line.startsWith('ON') || line.startsWith('IN')) ? (
                        <span className="text-teal-300">{line}</span>
                      ) : line && (line.startsWith('import') || line.startsWith('const') || line.startsWith('router') || line.startsWith('await') || line.startsWith('return')) ? (
                        <span className="text-indigo-300">{line}</span>
                      ) : line && (line.startsWith('//') || line.startsWith('--') || line.startsWith('/*')) ? (
                        <span className="text-slate-550 italic">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </td>
                  </tr>
                ))}
                {/* Blinking pipe cursor if writing */}
                {typedCode.length < activeSample.finalCode.length && (
                  <tr>
                    <td className="w-8"></td>
                    <td className="pl-4">
                      <span className="w-2 h-4 bg-teal-400 inline-block animate-pulse animate-blink" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Absolute floating premium indicator */}
          {!isProcessing && typedCode.length >= activeSample.finalCode.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute bottom-4 right-4 bg-slate-900/95 border border-teal-500/30 text-teal-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_4px_15px_rgba(20,184,166,0.15)] font-mono select-none"
              id="optimise-badge"
            >
              <Check className="w-3.5 h-3.5 text-teal-400" />
              Verified Build Passed
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
