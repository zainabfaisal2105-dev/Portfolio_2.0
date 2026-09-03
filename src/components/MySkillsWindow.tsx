import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, X, Cpu } from 'lucide-react';
import { ThemeMode } from '../types';

interface SkillFile {
  title: string;
  desc: string;
  tag: string;
}

interface SkillFolder {
  name: string;
  files: SkillFile[];
}

const FOLDERS: SkillFolder[] = [
  {
    name: 'AI & MACHINE LEARNING',
    files: [
      {
        title: 'Machine Learning & Deep Learning',
        desc: 'Trained classification models using Scikit-learn, Pandas, and ResNet50 transfer learning across real-world datasets.',
        tag: 'Deepfake Detector',
      },
      {
        title: 'LLMs, RAG & Prompt Engineering',
        desc: 'Designed multi-engine LLM architectures with strict context grounding, evaluation harnesses, and citation-backed reasoning.',
        tag: 'TriCore AI',
      },
    ],
  },
  {
    name: 'DEVELOPMENT & LANGUAGES',
    files: [
      {
        title: 'C++ & Python',
        desc: 'Built console systems, automation scripts, and backend logic with custom data structures across both languages.',
        tag: 'Attendance System',
      },
      {
        title: 'Full-Stack Web Development',
        desc: 'React, TypeScript, and Tailwind for building interactive, multi-theme, animated interfaces.',
        tag: 'This Portfolio',
      },
    ],
  },
  {
    name: 'SYSTEMS & COMPUTER NETWORKS',
    files: [
      {
        title: 'Network Traffic Analysis & Scapy',
        desc: 'Interacted with raw network adapters in Python using Scapy to intercept DNS requests, evaluate IP packet logs, and audit TCP/UDP streams.',
        tag: 'Packet Sniffer Utility',
      },
      {
        title: 'Low-Level Machine Instructions (x86)',
        desc: 'Explored assembler registries, compiler flags, binary translations, and logic execution sequences.',
        tag: 'Microprocessor Emulator & Zainab.OS Terminal',
      },
    ],
  },
  {
    name: 'DATABASES & DATA STRUCTURES',
    files: [
      {
        title: 'SQL Server & Relational Design',
        desc: 'Architected normalized schemas with stored procedures, triggers, and transactional integrity.',
        tag: 'Delivery DB System',
      },
      {
        title: 'Data Structures & Algorithms',
        desc: 'Implemented Hash Tables and Linked Lists for O(1) average lookup performance in C++.',
        tag: 'Attendance System',
      },
    ],
  },
];

interface MySkillsWindowProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeMode;
}

export const MySkillsWindow: React.FC<MySkillsWindowProps> = ({ isOpen, onClose, activeTheme }) => {
  const [activeFolderIdx, setActiveFolderIdx] = useState(2); // default to Systems & Networks, matching reference

  const activeFolder = FOLDERS[activeFolderIdx];

  const isY2k = activeTheme === 'y2k';
  const isMyspace = activeTheme === 'myspace';

  const titleBarClass = isY2k
    ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-black border-black'
    : isMyspace
    ? 'bg-black text-[#b8bfc9] border-[#b8bfc9]/50'
    : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-black border-cyan-300';

  const windowClass = isY2k
    ? 'bg-[#f0e6ff] border-4 border-black shadow-[8px_8px_0px_0px_#000] text-black'
    : isMyspace
    ? 'bg-[#150f0a] border-2 border-[#b8bfc9] shadow-[8px_8px_0px_0px_#000] text-[#eef1f7]'
    : 'bg-[#0a0d16] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] text-white';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`fixed z-50 flex flex-col overflow-hidden font-mono rounded-xl
            inset-3 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
            sm:w-[90vw] sm:max-w-3xl sm:h-[500px] ${windowClass}`}
        >
          {/* Title bar */}
          <div className={`flex items-center justify-between px-4 py-2.5 border-b ${titleBarClass}`}>
            <span className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <Folder className="w-4 h-4" /> MySkills.sys
            </span>
            <button
              onClick={onClose}
              className={`w-5 h-5 flex items-center justify-center rounded border ${
                isY2k ? 'bg-white border-black text-black' : 'bg-black/30 border-current/40'
              }`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Body: folder list + detail pane */}
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            {/* Folder list */}
            <div
              className={`sm:w-64 shrink-0 p-3 space-y-1 overflow-y-auto border-b sm:border-b-0 sm:border-r ${
                isY2k ? 'border-black/20' : isMyspace ? 'border-[#b8bfc9]/20' : 'border-white/10'
              }`}
            >
              <span className={`block text-[10px] font-bold uppercase tracking-widest px-2 pb-1 ${
                isY2k ? 'text-zinc-800 font-extrabold' : isMyspace ? 'text-[#b8bfc9]/60' : 'text-zinc-500'
              }`}>Folders</span>
              {FOLDERS.map((folder, idx) => {
                const isActive = idx === activeFolderIdx;
                return (
                  <button
                    key={folder.name}
                    onClick={() => setActiveFolderIdx(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                      isActive
                        ? isY2k
                          ? 'bg-cyan-300 text-black border border-black'
                          : isMyspace
                          ? 'bg-[#b8bfc9]/20 text-[#b8bfc9] border border-[#b8bfc9]/50'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : isY2k
                        ? 'hover:bg-black/10 text-black font-bold'
                        : isMyspace
                        ? 'hover:bg-white/5 text-[#eef1f7]/70'
                        : 'hover:bg-white/5 text-zinc-300'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 shrink-0" />
                    {folder.name}
                  </button>
                );
              })}
            </div>

            {/* Detail pane */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 ${
                isY2k ? 'text-purple-900 font-extrabold' : isMyspace ? 'text-[#b8bfc9]' : 'text-purple-300'
              }`}>
                <Cpu className="w-4 h-4" /> {activeFolder.name}
              </div>
              {activeFolder.files.map((file) => (
                <div
                  key={file.title}
                  className={`p-3.5 rounded-lg border ${
                    isY2k
                      ? 'bg-white/70 border-black/20'
                      : isMyspace
                      ? 'bg-black/40 border-[#b8bfc9]/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h4 className={`font-bold text-xs sm:text-sm flex items-center gap-1.5 ${
                      isY2k ? 'text-black' : isMyspace ? 'text-[#eef1f7]' : 'text-cyan-300'
                    }`}>
                      <span className="text-[10px]">•</span> {file.title}
                    </h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      isY2k
                        ? 'bg-black text-white'
                        : isMyspace
                        ? 'bg-[#b8bfc9] text-black'
                        : 'bg-white/10 text-zinc-300'
                    }`}>
                      {file.tag}
                    </span>
                  </div>
                  <p className={`text-[11px] sm:text-xs leading-relaxed ${
                    isY2k ? 'text-zinc-800 font-medium' : isMyspace ? 'text-[#eef1f7]/75' : 'text-zinc-400'
                  }`}>
                    {file.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
