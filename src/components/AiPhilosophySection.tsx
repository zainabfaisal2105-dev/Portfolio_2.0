import React from 'react';
import { motion } from 'motion/react';
import { Brain, ArrowRight, Zap } from 'lucide-react';
import { ThemeMode } from '../types';

interface AiPhilosophySectionProps {
  activeTheme: ThemeMode;
}

export const AiPhilosophySection: React.FC<AiPhilosophySectionProps> = ({ activeTheme }) => {

  const pillars = [
    { title: 'Designing Behavior', desc: 'Establishing precise agent personas and task-specific response constraints.' },
    { title: 'Creating Constraints', desc: 'Preventing hallucinations by bounding context strictly to vector store documents.' },
    { title: 'Engineering Prompts', desc: 'Structuring zero-shot & few-shot system prompts with structured JSON output.' },
    { title: 'Controlling Outputs', desc: 'Optimizing token limits, stop sequences, and deterministic seed parameters.' },
    { title: 'Evaluating Reliability', desc: 'Testing RAG retrieval precision, latency benchmarks, and citation integrity.' },
  ];

  return (
    <section id="ailab" className="py-20 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${activeTheme === 'y2k' ? 'text-purple-800' : 'text-purple-400'}`}>
            <Brain className="w-4 h-4" />
            <span>{activeTheme === 'myspace' ? 'my AI opinions lol' : 'AI SYSTEM ARCHITECTURE PHILOSOPHY'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              activeTheme === 'y2k'
                ? 'drop-shadow-[2px_2px_0px_#a855f7]'
                : activeTheme === 'myspace'
                ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                : 'text-white'
            }`}
          >
            {activeTheme === 'myspace' ? (
              'how i actually build AI stuff'
            ) : activeTheme === 'y2k' ? (
              <>
                <span className="text-purple-900">How I Build</span>{' '}
                <span className="text-pink-600">AI Systems</span>
              </>
            ) : (
              'How I Build AI Systems'
            )}
          </h2>
          <p className={`text-sm max-w-2xl ${activeTheme === 'y2k' ? 'text-zinc-700' : 'text-zinc-400'}`}>
            {activeTheme === 'myspace' ? "u cant just slap a model on something n call it done... u gotta actually control it or it'll do whatever it wants lol" : 'AI is not merely about importing raw foundation models. It is about building deterministic control wrappers around stochastic intelligence.'}
          </p>
        </div>

        {/* Visual Pipeline Flow: Prompt -> Context -> Model -> Evaluation */}
        <div className={`mb-12 p-6 sm:p-8 rounded-2xl border font-mono ${
          activeTheme === 'y2k'
            ? 'bg-purple-100 border-4 border-black text-black shadow-[6px_6px_0px_0px_#000]'
            : activeTheme === 'myspace'
            ? 'bg-[#1a1d23] border-4 border-black text-[#eef1f7] shadow-[6px_6px_0px_0px_#8ea2c9]'
            : 'bg-black/40 border-purple-500/30 text-white'
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${
            activeTheme === 'y2k' ? 'text-purple-900 font-bold' : 'text-purple-400'
          }`}>
            <Zap className="w-4 h-4" /> TRICORE CONTROL PIPELINE
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              activeTheme === 'y2k' ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]' : 'bg-purple-950/40 border-purple-500/30 text-white'
            }`}>
              <span className={`text-[10px] font-bold block ${activeTheme === 'y2k' ? 'text-purple-800' : 'text-purple-300'}`}>STEP 1</span>
              <span className={`font-bold text-sm block ${activeTheme === 'y2k' ? 'text-purple-950 font-extrabold' : 'text-white'}`}>Prompt</span>
              <span className={`text-[11px] block ${activeTheme === 'y2k' ? 'text-zinc-700' : 'text-slate-300'}`}>Structured system instructions & constraints</span>
            </div>

            <div className={`hidden md:flex justify-center ${activeTheme === 'y2k' ? 'text-purple-800 font-bold' : 'text-purple-400'}`}>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              activeTheme === 'y2k' ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]' : 'bg-cyan-950/40 border-cyan-500/30 text-white'
            }`}>
              <span className={`text-[10px] font-bold block ${activeTheme === 'y2k' ? 'text-cyan-800' : 'text-cyan-300'}`}>STEP 2</span>
              <span className={`font-bold text-sm block ${activeTheme === 'y2k' ? 'text-blue-950 font-extrabold' : 'text-white'}`}>Context</span>
              <span className={`text-[11px] block ${activeTheme === 'y2k' ? 'text-zinc-700' : 'text-slate-300'}`}>RAG vector similarity chunk injection</span>
            </div>

            <div className={`hidden md:flex justify-center ${activeTheme === 'y2k' ? 'text-cyan-800 font-bold' : 'text-cyan-400'}`}>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              activeTheme === 'y2k' ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]' : 'bg-emerald-950/40 border-emerald-500/30 text-white'
            }`}>
              <span className={`text-[10px] font-bold block ${activeTheme === 'y2k' ? 'text-emerald-800' : 'text-emerald-300'}`}>STEP 3</span>
              <span className={`font-bold text-sm block ${activeTheme === 'y2k' ? 'text-emerald-950 font-extrabold' : 'text-white'}`}>Model</span>
              <span className={`text-[11px] block ${activeTheme === 'y2k' ? 'text-zinc-700' : 'text-slate-300'}`}>Temperature & parameter execution</span>
            </div>

            <div className={`hidden md:flex justify-center ${activeTheme === 'y2k' ? 'text-emerald-800 font-bold' : 'text-emerald-400'}`}>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              activeTheme === 'y2k' ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]' : 'bg-pink-950/40 border-pink-500/30 text-white'
            }`}>
              <span className={`text-[10px] font-bold block ${activeTheme === 'y2k' ? 'text-pink-800' : 'text-pink-300'}`}>STEP 4</span>
              <span className={`font-bold text-sm block ${activeTheme === 'y2k' ? 'text-pink-950 font-extrabold' : 'text-white'}`}>Evaluation</span>
              <span className={`text-[11px] block ${activeTheme === 'y2k' ? 'text-zinc-700' : 'text-slate-300'}`}>Citation validation & hallucination check</span>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`p-5 rounded-xl border transition-all ${
                activeTheme === 'y2k'
                  ? 'bg-purple-100 border-2 border-black text-black font-bold shadow-[3px_3px_0px_0px_#000]'
                  : activeTheme === 'myspace'
                  ? 'bg-[#1a1d23] border-2 border-black text-[#eef1f7] font-bold shadow-[3px_3px_0px_0px_#8ea2c9] hover:border-[#8ea2c9]'
                  : 'bg-[#0b0e18] border-white/10 text-white hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  activeTheme === 'y2k' ? 'bg-purple-200 text-purple-900 border border-purple-400 font-extrabold' : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {idx + 1}
                </span>
                <div>
                  <h4 className={`font-bold text-sm sm:text-base font-mono ${
                    activeTheme === 'y2k' ? 'text-purple-950 font-extrabold' : 'text-purple-300'
                  }`}>{p.title}</h4>
                  <p className={`text-xs font-sans mt-1 leading-relaxed ${
                    activeTheme === 'y2k' ? 'text-zinc-800' : 'text-zinc-300'
                  }`}>{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
