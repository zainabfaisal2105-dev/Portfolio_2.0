import React from 'react';
import { motion } from 'motion/react';
import { Layers, Cpu, Code2, Brain, Shield, Terminal as TerminalIcon } from 'lucide-react';
import { ThemeMode, SkillLayer } from '../types';

interface SkillsSectionProps {
  activeTheme: ThemeMode;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ activeTheme }) => {
  const skillLayers: SkillLayer[] = [
    {
      layer: 1,
      title: 'SYSTEMS FOUNDATION',
      subtitle: 'Understanding hardware execution & memory instructions',
      color: 'border-blue-500/40 text-blue-400 bg-blue-950/20',
      skills: ['Assembly', 'Computer Architecture', 'Operating Systems', 'Low-level Memory & Registers'],
    },
    {
      layer: 2,
      title: 'SOFTWARE ENGINEERING',
      subtitle: 'Object-oriented programming, data structures & algorithms',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
      skills: ['C++', 'Python', 'SQL', 'Data Structures & Algorithms'],
    },
    {
      layer: 3,
      title: 'INTELLIGENCE & LLM ARCHITECTURES',
      subtitle: 'Machine learning models, neural networks & generative AI controls',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20',
      skills: ['Machine Learning', 'Deep Learning (ResNet50)', 'Scikit-learn', 'Pandas', 'NumPy', 'LLMs', 'RAG', 'Prompt Engineering'],
    },
    {
      layer: 4,
      title: 'NETWORKS & SECURITY CURIOSITY',
      subtitle: 'Packet inspection, network protocols & defensive concepts',
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/20',
      skills: ['Computer Networks', 'Packet Analysis', 'Scapy', 'TCP/UDP/DNS Protocols', 'Security Fundamentals'],
    },
  ];

  return (
    <section id="skills" className="py-20 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="space-y-2 mb-12">
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${activeTheme === 'y2k' ? 'text-cyan-800' : 'text-cyan-400'}`}>
            <Layers className="w-4 h-4" />
            <span>{activeTheme === 'myspace' ? 'skills n stuff' : 'FULL-STACK STACK ARCHITECTURE'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              activeTheme === 'y2k'
                ? 'drop-shadow-[2px_2px_0px_#06b6d4]'
                : activeTheme === 'myspace'
                ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                : 'text-white'
            }`}
          >
            {activeTheme === 'myspace' ? (
              'stuff i can actually do'
            ) : activeTheme === 'y2k' ? (
              <>
                <span className="text-purple-900">Technical Skill</span>{' '}
                <span className="text-cyan-800">Layers</span>
              </>
            ) : (
              'Technical Skill Layers'
            )}
          </h2>
          <p className={`text-xs sm:text-sm max-w-2xl ${activeTheme === 'y2k' ? 'text-zinc-700' : 'text-zinc-400'}`}>
            {activeTheme === 'myspace' ? 'organized by vibe not by percentage bars lol, those are fake anyway' : 'Organized as architectural abstraction layers rather than generic percentage bars.'}
          </p>
        </div>

        {/* Skill Layers Stack */}
        <div className="space-y-6">
          {skillLayers.map((layer, idx) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border transition-all ${
                activeTheme === 'y2k'
                  ? 'bg-cyan-100 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black'
                  : activeTheme === 'myspace'
                  ? 'bg-[#1a1d23] border-2 border-black shadow-[4px_4px_0px_0px_#8ea2c9] text-[#eef1f7] hover:border-[#8ea2c9]'
                  : 'bg-[#0a0d16] border-white/10 text-white hover:border-cyan-500/30'
              }`}
            >
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b pb-3 ${
                activeTheme === 'myspace' ? 'border-[#9aa4b8]' : activeTheme === 'y2k' ? 'border-black/20' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold font-mono border ${
                    activeTheme === 'myspace'
                      ? 'bg-[#8ea2c9]/15 text-[#8ea2c9] border-[#8ea2c9]/40'
                      : activeTheme === 'y2k'
                      ? idx === 0
                        ? 'bg-blue-100 text-blue-900 border-blue-400 font-extrabold'
                        : idx === 1
                        ? 'bg-purple-100 text-purple-900 border-purple-400 font-extrabold'
                        : idx === 2
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold'
                        : 'bg-pink-100 text-pink-900 border-pink-400 font-extrabold'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  }`}>
                    LAYER {layer.layer}
                  </span>
                  <h3 className={`text-base sm:text-lg font-bold font-mono ${
                    activeTheme === 'myspace'
                      ? 'text-[#eef1f7]'
                      : activeTheme === 'y2k'
                      ? idx === 0
                        ? 'text-blue-950 font-extrabold'
                        : idx === 1
                        ? 'text-purple-950 font-extrabold'
                        : idx === 2
                        ? 'text-emerald-950 font-extrabold'
                        : 'text-pink-950 font-extrabold'
                      : 'text-white'
                  }`}>{layer.title}</h3>
                </div>
                <span className={`text-xs font-mono ${
                  activeTheme === 'myspace'
                    ? 'text-[#c7ccd6]'
                    : activeTheme === 'y2k'
                    ? idx === 0
                      ? 'text-blue-800 font-bold'
                      : idx === 1
                      ? 'text-purple-800 font-bold'
                      : idx === 2
                      ? 'text-emerald-800 font-bold'
                      : 'text-pink-700 font-bold'
                    : 'text-zinc-400'
                }`}>{layer.subtitle}</span>
              </div>

              {/* Skills Chip Matrix */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {layer.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold font-mono border transition-all hover:scale-105 cursor-default ${
                      activeTheme === 'y2k'
                        ? 'bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]'
                        : activeTheme === 'myspace'
                        ? 'bg-[#1a1d23] text-[#8ea2c9] border-2 border-[#9aa4b8] hover:border-[#8ea2c9]'
                        : 'bg-[#101625] text-cyan-200 border-cyan-500/30 hover:border-cyan-400'
                    }`}
                  >
                    <span className={activeTheme === 'y2k' ? (
                      idx === 0 ? 'text-blue-600' : idx === 1 ? 'text-purple-600' : idx === 2 ? 'text-emerald-600' : 'text-pink-600'
                    ) : ''}>⚡</span>{' '}
                    <span className={activeTheme === 'y2k' ? 'text-zinc-950 font-bold' : ''}>{skill}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
