import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Cpu, GitBranch, ArrowUpRight } from 'lucide-react';
import { ThemeMode, JourneyItem } from '../types';

interface TechJourneyProps {
  activeTheme: ThemeMode;
}

export const TechJourney: React.FC<TechJourneyProps> = ({ activeTheme }) => {
  const journey: JourneyItem[] = [
    {
      year: '2023',
      title: 'Started BS Computer Science @ UMT',
      subtitle: 'Foundation Phase',
      items: [
        'Explored C++, Data Structures, Assembly & Computer Architecture',
        'Built fundamental understanding of memory management & instructions',
        'Mastered Object-Oriented Programming & core OS principles',
      ],
    },
    {
      year: '2025',
      title: 'Built Machine Learning & Data Systems',
      subtitle: 'Applied Intelligence',
      items: [
        'Developed classification models (Random Forest, SVM, ResNet50)',
        'Built packet sniffer for real-time network traffic analysis with Scapy',
        'Designed SQL Server local delivery database with stored procedures',
      ],
    },
    {
      year: '2026',
      title: 'Moved into Generative AI & Prompt Engineering',
      subtitle: 'LLM Systems Focus',
      items: [
        'Mastered RAG (Retrieval-Augmented Generation) architectures',
        'Engineered temperature controls & token optimization strategies',
        'Explored Agentic AI paradigms & Panaversity Agentic AI Architect Program',
      ],
    },
    {
      year: '2026',
      title: 'Built TriCore AI Multi-Engine Architecture',
      subtitle: 'Flagship System',
      items: [
        'Spark Engine: Fast creative ideation assistant',
        'Lens Engine: Strict RAG document research assistant',
        'Core Engine: Deep research with grounded citations & reasoning traces',
      ],
      highlight: true,
    },
    {
      year: 'FUTURE',
      title: 'Exploring Frontiers',
      subtitle: 'Continuous Horizon',
      items: [
        'Advanced Agentic AI & Autonomous Workflows',
        'Cybersecurity Foundations & Offensive/Defensive System Analysis',
        'Reinforcement Learning & Alignment Controls',
      ],
    },
  ];

  return (
    <section id="journey" className="py-20 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="space-y-2 mb-16">
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${activeTheme === 'y2k' ? 'text-purple-800' : 'text-purple-400'}`}>
            <Compass className="w-4 h-4" />
            <span>EVOLUTIONARY TRAJECTORY</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              activeTheme === 'y2k'
                ? 'drop-shadow-[2px_2px_0px_#8b5cf6]'
                : activeTheme === 'myspace'
                ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                : 'text-white'
            }`}
          >
            {activeTheme === 'myspace' ? (
              'how i got here lol'
            ) : activeTheme === 'y2k' ? (
              <>
                <span className="text-purple-900">Tech Journey</span>{' '}
                <span className="text-pink-600">Timeline</span>
              </>
            ) : (
              'Tech Journey Timeline'
            )}
          </h2>
        </div>

        {/* Timeline Container */}
        <div className={`relative border-l-2 ml-4 sm:ml-8 space-y-12 ${
          activeTheme === 'myspace' ? 'border-[#9aa4b8]/60' : activeTheme === 'y2k' ? 'border-black' : 'border-cyan-500/30'
        }`}>
          {journey.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Node Point */}
              <div
                className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-transform group-hover:scale-125 ${
                  item.highlight
                    ? activeTheme === 'myspace'
                      ? 'bg-[#8ea2c9] text-white shadow-[0_0_15px_#8ea2c9] border-2 border-black'
                      : 'bg-cyan-400 text-black shadow-[0_0_20px_#06b6d4]'
                    : activeTheme === 'y2k'
                    ? 'bg-pink-400 text-black border-2 border-black'
                    : activeTheme === 'myspace'
                    ? 'bg-[#1a1d23] text-[#8ea2c9] border-2 border-black'
                    : 'bg-zinc-800 text-cyan-400 border border-cyan-500/40'
                }`}
              >
                {item.year === 'FUTURE' ? '★' : item.year.slice(2)}
              </div>

              {/* Timeline Card */}
              <div
                className={`p-6 rounded-2xl border transition-all ${
                  item.highlight
                    ? activeTheme === 'y2k'
                      ? 'bg-cyan-200 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black'
                      : activeTheme === 'myspace'
                      ? 'bg-[#1a1d23] border-2 border-black shadow-[6px_6px_0px_0px_#8ea2c9] text-[#eef1f7]'
                      : 'bg-[#0d1527] border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] text-white'
                    : activeTheme === 'y2k'
                    ? 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] text-black'
                    : activeTheme === 'myspace'
                    ? 'bg-[#1a1d23]/90 border-[#9aa4b8] text-[#eef1f7] hover:border-[#8ea2c9]'
                    : 'bg-[#0a0d17] border-white/10 text-zinc-300 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    activeTheme === 'myspace'
                      ? 'bg-[#8ea2c9]/15 text-[#8ea2c9] border-[#8ea2c9]/40'
                      : activeTheme === 'y2k'
                      ? idx === 2
                        ? 'bg-pink-100 text-pink-900 border-pink-400 font-extrabold'
                        : 'bg-cyan-100 text-cyan-900 border-cyan-400 font-extrabold'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  }`}>
                    {item.year}
                  </span>
                  <span className={`text-xs font-semibold ${
                    activeTheme === 'myspace'
                      ? 'text-[#9aa4b8]'
                      : activeTheme === 'y2k'
                      ? idx === 0
                        ? 'text-purple-800 font-extrabold'
                        : idx === 1
                        ? 'text-blue-800 font-extrabold'
                        : idx === 2
                        ? 'text-pink-600 font-extrabold'
                        : 'text-emerald-700 font-extrabold'
                      : 'text-purple-400'
                  }`}>{item.subtitle}</span>
                </div>

                <h3 className={`text-lg sm:text-xl font-bold font-mono mb-3 ${
                  activeTheme === 'myspace'
                    ? 'text-[#eef1f7]'
                    : activeTheme === 'y2k'
                    ? idx === 0
                      ? 'text-purple-950 font-extrabold'
                      : idx === 1
                      ? 'text-blue-950 font-extrabold'
                      : idx === 2
                      ? 'text-pink-950 font-extrabold'
                      : 'text-emerald-950 font-extrabold'
                    : 'text-white'
                }`}>{item.title}</h3>

                <ul className={`space-y-2 text-xs sm:text-sm font-sans ${
                  activeTheme === 'myspace' ? 'text-[#c7ccd6]/90' : activeTheme === 'y2k' ? 'text-zinc-800' : 'text-zinc-300'
                }`}>
                  {item.items.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className={
                        activeTheme === 'myspace'
                          ? 'text-[#8ea2c9] select-none'
                          : activeTheme === 'y2k'
                          ? idx === 0
                            ? 'text-purple-700 font-extrabold select-none'
                            : idx === 1
                            ? 'text-blue-700 font-extrabold select-none'
                            : idx === 2
                            ? 'text-pink-600 font-extrabold select-none'
                            : 'text-emerald-700 font-extrabold select-none'
                          : 'text-cyan-400 select-none'
                      }>›</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
