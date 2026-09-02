import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, Cloud, Lock, Compass, Award } from 'lucide-react';
import { ThemeMode, CertificationItem } from '../types';

interface CurrentlyExploringProps {
  activeTheme: ThemeMode;
}

export const CurrentlyExploring: React.FC<CurrentlyExploringProps> = ({ activeTheme }) => {
  const exploringItems = [
    { name: 'Agentic AI Systems', desc: 'Autonomous multi-agent orchestration, tool calling, and planning loops.', icon: <Bot className="w-5 h-5 text-cyan-400" /> },
    { name: 'LLM Applications & RAG', desc: 'Advanced hybrid retrieval, reranking algorithms, and evaluation harnesses.', icon: <Sparkles className="w-5 h-5 text-purple-400" /> },
    { name: 'Reinforcement Learning', desc: 'Reward modeling, policy optimization, and alignment constraints.', icon: <Compass className="w-5 h-5 text-emerald-400" /> },
    { name: 'Cybersecurity Foundations', desc: 'Offensive & defensive protocol analysis, packet inspection, and system hardening.', icon: <Lock className="w-5 h-5 text-indigo-400" /> },
    { name: 'Cloud Computing', desc: 'Scalable cloud infrastructure, containerization, and microservices.', icon: <Cloud className="w-5 h-5 text-blue-400" /> },
  ];

  const certifications: CertificationItem[] = [
    {
      title: 'Building Software with Generative AI',
      issuer: 'ICFCS 2026 International Conference',
      badge: 'ICFCS 2026',
      description: 'Hands-on architectural certification on LLM integrations & generative software paradigms.',
    },
    {
      title: 'AWS Foundations Workshop',
      issuer: 'ICFCS 2026 Workshop',
      badge: 'AWS CLOUD',
      description: 'Cloud fundamentals, S3, IAM, serverless computing, and AWS deployment pipelines.',
    },
    {
      title: 'YEF Youth Flagship Program',
      issuer: 'Youth Empowerment Foundation',
      badge: 'LEADERSHIP',
      description: 'Leadership, technical innovation, and collaborative software initiative execution.',
    },
  ];

  return (
    <section id="exploring" className="py-20 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Currently Exploring Section */}
        <div>
          <div className="space-y-2 mb-10">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>{activeTheme === 'myspace' ? 'what ive been up 2' : 'LIVING RESEARCH HORIZON'}</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                activeTheme === 'y2k'
                  ? 'text-black drop-shadow-[2px_2px_0px_#ec4899]'
                  : activeTheme === 'myspace'
                  ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                  : 'text-white'
              }`}
            >
              {activeTheme === 'myspace' ? "stuff im into rn" : "What I'm Exploring"}
            </h2>
          </div>

          {/* Panaversity Highlight Banner */}
          <div className={`mb-8 p-6 rounded-2xl border font-mono ${
            activeTheme === 'y2k'
              ? 'bg-pink-200 border-4 border-black text-black shadow-[6px_6px_0px_0px_#000]'
              : activeTheme === 'myspace'
              ? 'bg-[#1a1d23] border-4 border-black text-[#eef1f7] shadow-[6px_6px_0px_0px_#8ea2c9]'
              : 'bg-gradient-to-r from-cyan-950/60 via-purple-950/60 to-indigo-950/60 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  activeTheme === 'myspace' ? 'bg-[#8ea2c9] text-black' : 'bg-cyan-500 text-black'
                }`}>
                  {activeTheme === 'myspace' ? "currently doing this lol" : 'ENROLLED / PARTICIPATING'}
                </span>
                <h3 className={`text-lg sm:text-xl font-bold font-mono mt-1 ${
                  activeTheme === 'myspace' ? 'text-[#eef1f7]' : 'text-white'
                }`}>
                  Panaversity Agentic AI Architect Program
                </h3>
                <p className={`text-xs font-sans ${
                  activeTheme === 'myspace' ? 'text-[#c7ccd6]/80' : 'text-slate-300'
                }`}>
                  {activeTheme === 'myspace' ? 'basically learning how 2 make ai agents that actually do stuff on their own. its a lot but i luv it' : 'Deep diving into autonomous multi-agent frameworks, LangGraph, AutoGen, and modern AI architecture.'}
                </p>
              </div>
              <Sparkles className={`w-8 h-8 shrink-0 animate-pulse ${
                activeTheme === 'myspace' ? 'text-[#8ea2c9]' : 'text-cyan-400'
              }`} />
            </div>
          </div>

          {/* Exploring Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exploringItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`p-5 rounded-xl border transition-all ${
                  activeTheme === 'y2k'
                    ? 'bg-purple-100 border-2 border-black shadow-[4px_4px_0px_0px_#000] text-black font-bold'
                    : activeTheme === 'myspace'
                    ? 'bg-[#1a1d23] border-2 border-black shadow-[4px_4px_0px_0px_#8ea2c9] text-[#eef1f7] font-bold hover:border-[#8ea2c9]'
                    : 'bg-[#0a0d17] border-white/10 text-white hover:border-cyan-500/30'
                }`}
              >
                <div className={`p-2.5 rounded-lg w-fit mb-3 ${
                  'bg-black/30'
                }`}>
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm sm:text-base font-mono mb-1">{item.name}</h4>
                <p className={`text-xs font-sans ${'text-zinc-400'}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="space-y-2 mb-10">
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
              'text-purple-400'
            }`}>
              <Award className="w-4 h-4" />
              <span>{activeTheme === 'myspace' ? 'random achievements ig' : 'HONORS & CREDENTIALS'}</span>
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
              {activeTheme === 'myspace' ? 'certs n stuff i got' : 'Certifications & Honors'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border transition-all ${
                  activeTheme === 'y2k'
                    ? 'bg-cyan-100 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black font-bold'
                    : activeTheme === 'myspace'
                    ? 'bg-[#1a1d23] border-4 border-black shadow-[6px_6px_0px_0px_#8ea2c9] text-[#eef1f7] font-bold'
                    : 'bg-[#0b0f1b] border-purple-500/20 text-white shadow-[0_0_20px_rgba(168,85,247,0.08)]'
                }`}
              >
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono border ${
                    'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  }`}>
                    {cert.badge}
                  </span>
                  <Award className={`w-5 h-5 shrink-0 ${'text-purple-400'}`} />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-mono mb-1">{cert.title}</h3>
                <p className={`text-xs font-mono mb-2 ${'text-cyan-400'}`}>{cert.issuer}</p>
                <p className={`text-xs font-sans leading-relaxed ${'text-zinc-400'}`}>{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
