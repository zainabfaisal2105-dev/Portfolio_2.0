import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Bot, Code, Search, Cpu, Layers } from 'lucide-react';
import { ThemeMode } from '../types';

interface AboutSectionProps {
  activeTheme: ThemeMode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ activeTheme }) => {
  const infoElements = [
    {
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      title: 'BS Computer Science @ UMT',
      desc: 'University of Management and Technology (UMT)',
    },
    {
      icon: <Bot className="w-5 h-5 text-purple-400" />,
      title: 'AI Systems Explorer',
      desc: 'LLMs, Prompt Engineering, RAG Architectures',
    },
    {
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      title: 'Software Developer',
      desc: 'Full-stack, Python, C++, Web & Databases',
    },
    {
      icon: <Search className="w-5 h-5 text-amber-400" />,
      title: 'Systems Thinker',
      desc: 'Architecture, Assembly, Networks & Security',
    },
  ];

  const myspaceInfoElements = [
    {
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      title: 'cs student @ UMT lol',
      desc: 'yes im actually in skool while making this',
    },
    {
      icon: <Bot className="w-5 h-5 text-purple-400" />,
      title: 'AI obsessed fr',
      desc: 'LLMs, prompts, RAG... i love this stuff idk',
    },
    {
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      title: 'i make things',
      desc: 'python, c++, react, whatever gets it done',
    },
    {
      icon: <Search className="w-5 h-5 text-amber-400" />,
      title: 'nosy about systems',
      desc: 'how stuff works under the hood... networks n security 2',
    },
  ];

  const displayInfoElements = activeTheme === 'myspace' ? myspaceInfoElements : infoElements;

  return (
    <section id="about" className="py-20 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="space-y-2 mb-12">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>{activeTheme === 'myspace' ? 'xX_about_me_Xx' : 'CORE IDENTITY'}</span>
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
            {activeTheme === 'myspace' ? 'stuff about me i guess' : 'How I Think About Technology'}
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Statement Box */}
          {activeTheme === 'myspace' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-[#1a1d23] border-4 border-black shadow-[6px_6px_0px_0px_#8ea2c9] flex flex-col overflow-hidden"
            >
              <div className="bg-[#8ea2c9] text-white px-4 py-2 font-mono font-bold text-sm border-b-2 border-black">
                about me :&lt;
              </div>
              <div className="myspace-glitter-bg p-6 sm:p-8 space-y-5 text-sm sm:text-base leading-relaxed font-sans text-[#eef1f7] flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="font-bold text-base sm:text-lg font-mono text-[#8ea2c9]">
                    heyyy!! im zainab :P im a cs girl who spends wayyy 2 much time making stuff on the computer lol
                  </p>
                  <p>
                    i got into this whole cs thing cuz i wanted 2 know whats actually happening under the hood... like from memory n instructions all the way up to AI. idk it just makes sense 2 me
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-mono">
                    <p><strong className="text-[#9aa4b8]">interests:</strong> computers, AI, staying up way 2 late, figuring stuff out</p>
                    <p><strong className="text-[#9aa4b8]">who i'd like 2 meet:</strong> cool ppl who dont say "k"</p>
                    <p><strong className="text-[#9aa4b8]">currently:</strong> procrastinating (jk... mostly)</p>
                    <p><strong className="text-[#9aa4b8]">random:</strong> i h8 mornings</p>
                  </div>
                  <p>
                    i move between <strong className="text-[#c7ccd6]">low-level systems</strong>, <strong className="text-[#9aa4b8]">software eng</strong>, n <strong className="text-[#8ea2c9]">AI stuff</strong> cuz why pick just one lol
                  </p>
                </div>
                <div className="pt-6 mt-2 border-t-2 border-[#9aa4b8] flex items-center justify-between text-xs font-mono text-[#eef1f7]/80">
                  <span>zainab -- UMT CS lab (probably)</span>
                  <span className="text-[#9aa4b8] font-bold">● online rn</span>
                </div>
              </div>
            </motion.div>
          ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-7 p-8 rounded-2xl flex flex-col justify-between ${
              activeTheme === 'y2k'
                ? 'bg-purple-100 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black'
                : 'bg-[#0a0e18] border border-cyan-500/20 text-zinc-300 shadow-[0_0_30px_rgba(6,182,212,0.1)]'
            }`}
          >
            <div className="space-y-6 text-base sm:text-lg leading-relaxed font-sans">
              <p className={`font-bold text-lg sm:text-xl font-mono ${'text-cyan-400'}`}>
                "My interest in computer science started from understanding what happens beneath the surface."
              </p>
              <p className={'text-zinc-300'}>
                From memory, instructions, and architecture to networks and artificial intelligence.
              </p>
              <p className={'text-zinc-300'}>
                I enjoy moving between layers: <strong className={'text-purple-400'}>low-level systems</strong>, <strong className={'text-cyan-400'}>software engineering</strong>, and <strong className={'text-emerald-400'}>intelligent applications</strong>.
              </p>
              <p className={'text-zinc-300'}>
                Currently exploring AI systems, LLM applications, and agentic AI.
              </p>
            </div>

            {/* Quote Footer Tag */}
            <div className={`pt-6 mt-6 border-t flex items-center justify-between text-xs font-mono ${
              'border-white/10 text-zinc-400'
            }`}>
              <span>Zainab Faisal -- UMT CS Lab</span>
              <span className={'text-emerald-400'}>● Systems Active</span>
            </div>
          </motion.div>
          )}

          {/* Info Cards Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {displayInfoElements.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-5 rounded-xl flex items-start gap-4 transition-all hover:translate-x-1 ${
                  activeTheme === 'y2k'
                    ? 'bg-cyan-200 border-2 border-black shadow-[4px_4px_0px_0px_#000] text-black font-bold'
                    : activeTheme === 'myspace'
                    ? 'bg-[#1a1d23] border-2 border-black shadow-[3px_3px_0px_0px_#8ea2c9] text-[#eef1f7] font-bold hover:border-[#8ea2c9]'
                    : 'bg-[#0c101c] border border-white/10 text-white hover:border-cyan-500/40'
                }`}
              >
                <div className="p-2.5 rounded-lg bg-black/20 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base font-mono">{item.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
