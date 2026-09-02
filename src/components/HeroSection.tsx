import React from 'react';
import { motion } from 'motion/react';
import {
  Terminal as TerminalIcon,
  Send,
  Download,
  Sparkles,
  Cpu,
  ArrowRight,
  Heart,
  Star,
  CheckCircle2,
  ShieldCheck,
  Brain
} from 'lucide-react';
import { ThemeMode } from '../types';
import { ZAINAB_INFO } from '../assets/zainabPhoto';
import { OSDesktop } from './OSDesktop';

interface HeroSectionProps {
  activeTheme: ThemeMode;
  onOpenTerminal: () => void;
  onOpenEmailModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeTheme,
  onOpenTerminal,
  onOpenEmailModal,
}) => {
  const floatingBadges = [
    { name: 'Python', color: 'from-amber-500 to-yellow-500', pos: 'top-2 -left-4 sm:-left-8' },
    { name: 'AI', color: 'from-cyan-500 to-blue-500', pos: 'top-12 -right-4 sm:-right-8' },
    { name: 'Machine Learning', color: 'from-purple-500 to-pink-500', pos: 'top-32 -left-6 sm:-left-12' },
    { name: 'LLMs', color: 'from-emerald-500 to-teal-500', pos: 'bottom-28 -right-6 sm:-right-10' },
    { name: 'RAG', color: 'from-indigo-500 to-violet-500', pos: 'bottom-12 -left-4 sm:-left-8' },
    { name: 'Prompt Engineering', color: 'from-rose-500 to-red-500', pos: '-bottom-4 right-2 sm:right-6' },
    { name: 'Assembly', color: 'from-blue-600 to-cyan-600', pos: 'top-1/2 -right-8' },
    { name: 'Networks', color: 'from-teal-600 to-emerald-600', pos: 'top-2/3 -left-8' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Decorators based on active theme */}
      {activeTheme === 'neural' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#080d16_1px,transparent_1px),linear-gradient(to_bottom,#080d16_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        </div>
      )}

      {activeTheme === 'y2k' && (
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]" />
      )}

      {activeTheme === 'myspace' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #9aa4b8 0, #9aa4b8 2px, transparent 2px, transparent 22px), repeating-linear-gradient(-45deg, #ffe27a 0, #ffe27a 2px, transparent 2px, transparent 22px)',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full text-xs font-mono tracking-wide"
            >
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                  activeTheme === 'y2k'
                    ? 'bg-pink-300 text-black border-black font-bold shadow-[2px_2px_0px_0px_#000]'
                    : activeTheme === 'myspace'
                    ? 'bg-[#8ea2c9] text-white border-black font-bold shadow-[2px_2px_0px_0px_#000] rounded-full'
                    : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{activeTheme === 'myspace' ? 'cs kid @ UMT' : 'BS CS Student @ UMT'}</span>
                <span className="opacity-40">•</span>
                <span className={activeTheme === 'myspace' ? 'text-white/90 font-semibold' : 'text-purple-400 font-semibold'}>{activeTheme === 'myspace' ? 'code + chaos' : 'AI • ML • Systems'}</span>
              </div>
            </motion.div>

            {/* Large Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1
                className={`text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight font-mono ${
                  activeTheme === 'y2k'
                    ? 'text-black drop-shadow-[3px_3px_0px_#f43f5e] glitch-hover cursor-default'
                    : activeTheme === 'myspace'
                    ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                    : 'text-white'
                }`}
              >
                ZAINAB FAISAL
              </h1>

              <p
                className={`text-xl sm:text-2xl font-bold font-mono tracking-wide ${
                  activeTheme === 'y2k'
                    ? 'text-pink-600'
                    : activeTheme === 'myspace'
                    ? 'text-[#9aa4b8]'
                    : 'text-cyan-400'
                }`}
              >
                "{activeTheme === 'myspace' ? 'i make computers do stuff... idk how 2 explain it lol' : 'I study how machines think, communicate, and learn.'}"
              </p>
            </motion.div>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                activeTheme === 'y2k'
                  ? 'text-black font-medium'
                  : activeTheme === 'myspace'
                  ? 'text-[#c7ccd6]/90'
                  : 'text-zinc-300'
              }`}
            >
              {activeTheme === 'myspace' ? (
                <>heyyy!! im zainab :P im a cs girl who spends wayyy 2 much time making stuff on the computer lol. rn im obsessed w/ AI, networks, n figuring out how systems actually work under the hood. made a whole LLM thing called <strong className="text-[#8ea2c9] font-mono">TriCore AI</strong> cuz i wanted 2 see if i could... spent wayyy 2 long on it but honestly i kinda love it &lt;3</>
              ) : (
                <>Exploring technology from low-level computer architecture and networks to intelligent AI systems.
              Building specialized LLM architectures like <strong className="text-cyan-400 font-mono">TriCore AI</strong> and exploring security concepts from first principles.</>
              )}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2 font-mono"
            >
              <a
                href="#projects"
                className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTheme === 'y2k'
                    ? 'bg-cyan-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5'
                    : activeTheme === 'myspace'
                    ? 'bg-[#8ea2c9] text-white border-2 border-black rounded-full shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                }`}
              >
                {activeTheme === 'myspace' ? 'my stuff' : 'Explore My Work'} <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenTerminal}
                className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTheme === 'y2k'
                    ? 'bg-purple-300 text-black border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5'
                    : activeTheme === 'myspace'
                    ? 'bg-[#1a1d23] text-[#8ea2c9] border-2 border-black rounded-full shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                }`}
              >
                <TerminalIcon className={`w-4 h-4 ${activeTheme === 'myspace' ? 'text-[#8ea2c9]' : 'text-emerald-600'}`} />
                {activeTheme === 'myspace' ? 'poke my terminal' : 'Open Terminal'}
              </button>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`grid grid-cols-3 gap-4 pt-4 border-t max-w-xl text-xs font-mono ${
                activeTheme === 'myspace' ? 'border-[#eef1f7]/20' : 'border-white/10'
              }`}
            >
              <div>
                <span className={`block text-[10px] font-bold ${activeTheme === 'myspace' ? 'text-[#c7ccd6]/80' : 'text-zinc-500'}`}>{activeTheme === 'myspace' ? 'skool' : 'DEGREE'}</span>
                <span className={`font-bold text-xs sm:text-sm ${activeTheme === 'myspace' ? 'text-[#8ea2c9]' : 'text-cyan-400'}`}>BS CS @ UMT</span>
              </div>
              <div>
                <span className={`block text-[10px] font-bold ${activeTheme === 'myspace' ? 'text-[#c7ccd6]/80' : 'text-zinc-500'}`}>{activeTheme === 'myspace' ? 'obsessed w/' : 'FOCUS'}</span>
                <span className={`font-bold text-xs sm:text-sm ${activeTheme === 'myspace' ? 'text-[#8ea2c9]' : 'text-purple-400'}`}>AI & LLM Architecture</span>
              </div>
              <div>
                <span className={`block text-[10px] font-bold ${activeTheme === 'myspace' ? 'text-[#c7ccd6]/80' : 'text-zinc-500'}`}>{activeTheme === 'myspace' ? 'rn' : 'SYSTEM'}</span>
                <span className={`font-bold text-xs sm:text-sm ${activeTheme === 'myspace' ? 'text-[#8ea2c9]' : 'text-emerald-400'}`}>{activeTheme === 'myspace' ? 'zainab.OS is online lol' : 'Zainab.OS Online'}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Image & Floating Skill Badges */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            {/* Y2K Retro Window Card Style (Matches uploaded image aesthetic) */}
            {activeTheme === 'y2k' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-sm bg-cyan-200 border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-lg p-3 overflow-hidden font-mono"
              >
                {/* Header Window Bar */}
                <div className="bg-pink-500 text-white border-2 border-black p-2 mb-3 flex items-center justify-between font-bold text-xs shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex items-center gap-1">
                    <span>ZAINAB.SYS</span>
                  </div>
                  <div className="bg-yellow-300 text-black px-2 py-0.5 border border-black text-[10px] flex items-center gap-1">
                    <span className="sparkle-spin inline-block">✦</span>
                    LOOKING FOR ATTENTION !!!
                  </div>
                  <div className="flex gap-1 text-black font-extrabold">
                    <span>_</span>
                    <span>□</span>
                    <span>x</span>
                  </div>
                </div>

                {/* Main Card Content */}
                <div className="bg-white border-2 border-black p-3 space-y-3 shadow-[2px_2px_0px_0px_#000]">
                  <div className="relative group overflow-hidden rounded border-2 border-black">
                    <img
                      src="/zainab.jpg"
                      onError={(e) => {
                        // Fallback SVG generator if image file loading
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      alt="Zainab Faisal"
                      className="w-full h-64 object-cover object-top"
                    />
                    <div className="p-3 bg-pink-100 border-t-2 border-black text-center font-bold text-xs text-black">
                      ZAINAB FAISAL ♥ BS CS STUDENT @ UMT
                    </div>
                  </div>

                  {/* Retro Badges & Stats */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                    <div className="bg-purple-200 border-2 border-black p-1.5 rounded">
                      <span className="block text-[9px] text-zinc-600">MBTI</span>
                      <span>INTJ-A / CYBER</span>
                    </div>
                    <div className="bg-yellow-200 border-2 border-black p-1.5 rounded">
                      <span className="block text-[9px] text-zinc-600">CONSTELLATION</span>
                      <span>TAURUS / AI</span>
                    </div>
                  </div>

                  <div className="bg-cyan-100 border-2 border-black p-2 text-center text-[10px] text-black font-bold">
                    ★ Status: Running on Caffeine + Clean Commits ★
                  </div>
                </div>
              </motion.div>
            ) : activeTheme === 'myspace' ? (
              /* MySpace.profile — charcoal/navy/silver starry nostalgia card */
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: -1.5 }}
                className="relative w-full max-w-sm bg-[#1a1d23] border-4 border-black shadow-[10px_10px_0px_0px_#8ea2c9] p-0 overflow-hidden font-sans"
              >
                {/* Classic OS-style title bar */}
                <div className="bg-[#8ea2c9] text-white px-3 py-1.5 flex items-center justify-between font-bold text-[11px] font-mono border-b-4 border-black">
                  <span>xX_me_Xx</span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c7ccd6] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9aa4b8] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0f9b6e] inline-block" />
                  </div>
                </div>

                {/* Scrolling marquee ticker — peak 2000s signature */}
                <div className="bg-black border-b-4 border-[#c7ccd6] py-1 overflow-hidden">
                  <span className="marquee-track text-[11px] font-mono font-bold text-[#c7ccd6]">
                    ✦☆✦ heyyy thanx 4 stopping by my page ✦☆✦ add me as a friend lol ✦☆✦ currently online probably ✦☆✦ leave me a msg down there!! ✦☆✦
                  </span>
                </div>

                <div className="myspace-glitter-bg p-4 space-y-4">
                  {/* No pics -- personality-driven placeholder instead of a photo */}
                  <div className="flex justify-center">
                    <div className="relative bg-[#0d0e11] p-6 border-2 border-black shadow-[4px_4px_0px_0px_#c7ccd6] -rotate-1 w-48 flex flex-col items-center justify-center text-center gap-2">
                      <span className="text-3xl">x_x</span>
                      <span className="text-[11px] font-mono font-bold text-[#c7ccd6] leading-snug">
                        NO. i don't have pics.<br />stop asking. lol
                      </span>
                      <span className="text-[9px] font-mono text-[#8ea2c9]">camera shy sry</span>
                    </div>
                  </div>

                  {/* Profile info block, mimicking classic "name / age / status" list */}
                  <div className="bg-[#1a1d23] border-2 border-[#c7ccd6] p-2.5 text-[11px] font-mono space-y-0.5 text-[#eef1f7]">
                    <p className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0f9b6e] shadow-[0_0_6px_#0f9b6e] myspace-heart-pulse" />
                      <strong className="text-[#c7ccd6]">status:</strong> online probably lol
                    </p>
                    <p><strong className="text-[#c7ccd6]">name:</strong> zainab</p>
                    <p><strong className="text-[#c7ccd6]">mood:</strong> ~*~ procrastinating ~*~</p>
                    <p><strong className="text-[#c7ccd6]">currently listening 2:</strong> something sad... obviously &lt;3</p>
                    <p><strong className="text-[#c7ccd6]">last login:</strong> 2day</p>
                  </div>

                  {/* Decorative sticker badges */}
                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono font-bold pt-1">
                    <span className="bg-[#0f9b6e] text-black px-2 py-1 border-2 border-black rotate-1">★ CS NERD</span>
                    <span className="bg-[#c7ccd6] text-black px-2 py-1 border-2 border-black -rotate-1">✦ up l8 coding</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Neural Night / Clean Room Mode Portrait Frame */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-sm"
              >
                {/* Glowing ring container */}
                <div
                  className={`relative rounded-3xl p-2 transition-all overflow-hidden ${
                    'bg-[#0a0f1d] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)]'
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/10">
                    {/* Render Zainab's actual photo or clean futuristic avatar fallback */}
                    <img
                      src="/zainab.jpg"
                      alt="Zainab Faisal"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500"
                    />

                    {/* Overlay Tag */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-xs font-mono text-white flex items-center justify-between">
                      <div>
                        <span className="font-bold block text-cyan-400">Zainab Faisal</span>
                        <span className="text-[10px] text-zinc-400">BS CS Student @ UMT</span>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Floating Animated Skill Badges around profile */}
            {floatingBadges.map((badge, idx) => (
              <motion.div
                key={badge.name}
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3 + idx * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.2,
                }}
                className={`absolute ${badge.pos} hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold shadow-lg backdrop-blur-md border ${
                  activeTheme === 'y2k'
                    ? 'bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000]'
                    : activeTheme === 'myspace'
                    ? 'bg-[#8ea2c9] text-white border-2 border-black rounded-full shadow-[3px_3px_0px_0px_#000]'
                    : 'bg-black/80 text-white border-white/20'
                }`}
              >
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${badge.color}`} />
                <span>{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Zainab.OS Desktop Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-2xl mx-auto lg:mx-0 mt-12"
        >
          <OSDesktop activeTheme={activeTheme} onOpenTerminal={onOpenTerminal} />
        </motion.div>
      </div>
    </section>
  );
};
