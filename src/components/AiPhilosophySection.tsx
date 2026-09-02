import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Sliders, ArrowRight, ShieldAlert, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { ThemeMode } from '../types';

interface AiPhilosophySectionProps {
  activeTheme: ThemeMode;
}

export const AiPhilosophySection: React.FC<AiPhilosophySectionProps> = ({ activeTheme }) => {
  const [temperature, setTemperature] = useState(0.2);
  const [ragContextLimit, setRagContextLimit] = useState(4);
  const [strictGroundedness, setStrictGroundedness] = useState(true);

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
          <div className="flex items-center gap-2 text-xs text-purple-400 font-bold uppercase tracking-widest">
            <Brain className="w-4 h-4" />
            <span>{activeTheme === 'myspace' ? 'my AI opinions lol' : 'AI SYSTEM ARCHITECTURE PHILOSOPHY'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              activeTheme === 'y2k'
                ? 'text-black drop-shadow-[2px_2px_0px_#a855f7]'
                : activeTheme === 'myspace'
                ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                : 'text-white'
            }`}
          >
            {activeTheme === 'myspace' ? 'how i actually build AI stuff' : 'How I Build AI Systems'}
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
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
            'text-purple-400'
          }`}>
            <Zap className="w-4 h-4" /> TRICORE CONTROL PIPELINE
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              'bg-purple-950/40 border-purple-500/30 text-white'
            }`}>
              <span className={`text-[10px] font-bold block ${'text-purple-300'}`}>STEP 1</span>
              <span className={`font-bold text-sm block ${'text-white'}`}>Prompt</span>
              <span className={`text-[11px] block ${'text-slate-300'}`}>Structured system instructions & constraints</span>
            </div>

            <div className={`hidden md:flex justify-center ${'text-purple-400'}`}>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              'bg-cyan-950/40 border-cyan-500/30 text-white'
            }`}>
              <span className={`text-[10px] font-bold block ${'text-cyan-300'}`}>STEP 2</span>
              <span className={`font-bold text-sm block ${'text-white'}`}>Context</span>
              <span className={`text-[11px] block ${'text-slate-300'}`}>RAG vector similarity chunk injection</span>
            </div>

            <div className={`hidden md:flex justify-center ${'text-cyan-400'}`}>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              'bg-emerald-950/40 border-emerald-500/30 text-white'
            }`}>
              <span className={`text-[10px] font-bold block ${'text-emerald-300'}`}>STEP 3</span>
              <span className={`font-bold text-sm block ${'text-white'}`}>Model</span>
              <span className={`text-[11px] block ${'text-slate-300'}`}>Temperature & parameter execution</span>
            </div>

            <div className={`hidden md:flex justify-center ${'text-emerald-400'}`}>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              'bg-pink-950/40 border-pink-500/30 text-white'
            }`}>
              <span className={`text-[10px] font-bold block ${'text-pink-300'}`}>STEP 4</span>
              <span className={`font-bold text-sm block ${'text-white'}`}>Evaluation</span>
              <span className={`text-[11px] block ${'text-slate-300'}`}>Citation validation & hallucination check</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Control Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 5 Pillars */}
          <div className="lg:col-span-7 space-y-3">
            {pillars.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`p-4 rounded-xl border transition-all ${
                  activeTheme === 'y2k'
                    ? 'bg-purple-100 border-2 border-black text-black font-bold shadow-[3px_3px_0px_0px_#000]'
                    : activeTheme === 'myspace'
                    ? 'bg-[#1a1d23] border-2 border-black text-[#eef1f7] font-bold shadow-[3px_3px_0px_0px_#8ea2c9] hover:border-[#8ea2c9]'
                    : 'bg-[#0b0e18] border-white/10 text-white hover:border-purple-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className={`font-bold text-sm sm:text-base font-mono ${
                      'text-purple-300'
                    }`}>{p.title}</h4>
                    <p className={`text-xs font-sans mt-0.5 ${
                      'text-zinc-300'
                    }`}>{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Parameters Simulator Box */}
          <div
            className={`lg:col-span-5 p-6 rounded-2xl border ${
              activeTheme === 'y2k'
                ? 'bg-pink-100 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black font-bold'
                : activeTheme === 'myspace'
                ? 'bg-[#1a1d23] border-4 border-black shadow-[6px_6px_0px_0px_#8ea2c9] text-[#eef1f7] font-bold'
                : 'bg-[#0d1222] border-purple-500/30 text-white shadow-[0_0_30px_rgba(168,85,247,0.15)]'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
              'border-white/10'
            }`}>
              <span className={`text-xs font-bold font-mono flex items-center gap-1.5 ${
                'text-purple-400'
              }`}>
                <Sliders className="w-4 h-4" /> CONTROLLER SIMULATOR
              </span>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">STATUS: OPTIMIZED</span>
            </div>

            <div className="space-y-5 text-xs font-mono">
              {/* Temperature Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>Temperature ({temperature})</span>
                  <span className={'text-purple-400 font-bold'}>
                    {temperature < 0.3 ? 'Deterministic' : temperature < 0.7 ? 'Balanced' : 'Creative'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* RAG Context Chunks Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>RAG Vector Chunks ({ragContextLimit})</span>
                  <span className={'text-cyan-400 font-bold'}>{ragContextLimit * 512} tokens</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={ragContextLimit}
                  onChange={(e) => setRagContextLimit(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Strict Groundedness Toggle */}
              <div className={`flex items-center justify-between p-3 rounded-lg border ${
                'bg-black/30 border-white/10'
              }`}>
                <span>Strict Grounding Guardrail</span>
                <button
                  onClick={() => setStrictGroundedness(!strictGroundedness)}
                  className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    strictGroundedness ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {strictGroundedness ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* Simulation Result Output */}
              <div className={`p-3 rounded-xl border text-[11px] space-y-1 font-mono ${
                'bg-black/50 border-purple-500/20 text-zinc-300'
              }`}>
                <div className={'text-purple-300 font-bold'}>Estimated System Output Profile:</div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Hallucination Risk: {strictGroundedness ? '< 0.1%' : '~ 12.4%'}</span>
                </div>
                <div className={'text-zinc-400'}>
                  Response Latency: ~{(120 + ragContextLimit * 25).toFixed(0)} ms
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
