import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const bootSequence = [
    { text: "booting zainab.system v2.6.0 [KERNEL_INIT]...", delay: 300 },
    { text: "verifying architecture: x86_64 / arm64 / neural-engine...", delay: 400 },
    { text: "loading intelligence modules [LLMs, RAG, PromptEng]...", delay: 500 },
    { text: "mounting computer architecture & low-level assembly layers...", delay: 400 },
    { text: "initializing network packet analyzers & security tools...", delay: 450 },
    { text: "loading case studies: TriCore AI, ResNet50, Packet Sniffer...", delay: 500 },
    { text: "establishing quantum email gateway [xanab2105@gmail.com]...", delay: 400 },
    { text: "> access granted. Welcome to Zainab's AI Laboratory.", delay: 600 }
  ];

  useEffect(() => {
    if (currentStep < bootSequence.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[currentStep].text]);
        setCurrentStep(prev => prev + 1);
      }, bootSequence[currentStep].delay);
      return () => clearTimeout(timer);
    } else {
      const doneTimer = setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 600);
      }, 700);
      return () => clearTimeout(doneTimer);
    }
  }, [currentStep, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070a] font-mono text-emerald-400 p-4 select-none"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Terminal Window Box */}
          <div className="relative w-full max-w-2xl bg-[#0b0f17] border border-emerald-500/30 rounded-xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#080b11] border-b border-emerald-500/20 text-xs text-emerald-500/70">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="ml-2 flex items-center gap-1 font-semibold text-emerald-400">
                  <Terminal className="w-3.5 h-3.5" /> zainab.system --boot
                </span>
              </div>
              <button
                onClick={() => {
                  setIsDone(true);
                  setTimeout(onComplete, 200);
                }}
                className="px-2.5 py-1 rounded text-[11px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1"
              >
                Skip Boot <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[280px] sm:h-[320px] overflow-y-auto space-y-2 text-xs sm:text-sm font-mono leading-relaxed">
              {lines.map((line, idx) => {
                const isLast = idx === lines.length - 1;
                const isSuccess = line.includes("access granted");
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2 ${
                      isSuccess ? "text-cyan-300 font-bold text-sm sm:text-base mt-2" : "text-emerald-400"
                    }`}
                  >
                    <span className="text-emerald-600 select-none">{'>'}</span>
                    <span>{line}</span>
                    {isLast && isSuccess && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 inline shrink-0 ml-1 animate-pulse" />
                    )}
                  </motion.div>
                );
              })}

              {/* Blinking Cursor */}
              {currentStep < bootSequence.length && (
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="text-emerald-600">{'>'}</span>
                  <span className="w-2.5 h-4 bg-emerald-400 animate-pulse inline-block" />
                </div>
              )}
            </div>

            {/* Progress Indicator Footer */}
            <div className="px-6 py-3 bg-[#080b11]/80 border-t border-emerald-500/10 flex items-center justify-between text-xs text-emerald-500/60">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>SYSTEM STATUS: {currentStep === bootSequence.length ? "ONLINE" : "INITIALIZING"}</span>
              </div>
              <div className="w-32 bg-emerald-950/60 h-1.5 rounded-full overflow-hidden border border-emerald-500/20">
                <div
                  className="bg-emerald-400 h-full transition-all duration-300 shadow-[0_0_10px_#10b981]"
                  style={{ width: `${Math.min(100, Math.round((currentStep / bootSequence.length) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
