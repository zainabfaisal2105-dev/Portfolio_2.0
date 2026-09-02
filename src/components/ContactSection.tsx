import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Send,
  MessageSquare
} from 'lucide-react';
import { ThemeMode } from '../types';

interface ContactSectionProps {
  activeTheme: ThemeMode;
  isModalMode?: boolean;
  onCloseModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  activeTheme,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('xanab2105@gmail.com');
      setCopiedEmail(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 relative font-mono scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <Mail className="w-4 h-4" />
            <span>{activeTheme === 'myspace' ? 'contact info' : 'CONNECT & COLLABORATE'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              activeTheme === 'y2k'
                ? 'text-black drop-shadow-[2px_2px_0px_#10b981]'
                : activeTheme === 'myspace'
                ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000]'
                : 'text-white'
            }`}
          >
            {activeTheme === 'myspace' ? "how 2 reach me :P" : "Let's Build Something Intelligent."}
          </h2>
          <p className="text-sm max-w-xl text-zinc-400">
            Reach out directly for AI architectures, computer systems collaboration, or technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Email Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              activeTheme === 'y2k'
                ? 'bg-pink-100 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black font-bold'
                : activeTheme === 'myspace'
                ? 'bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000] text-[#eef1f7]'
                : 'bg-[#0a0e1a] border-cyan-500/30 text-white shadow-[0_0_30px_rgba(6,182,212,0.1)]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                  PRIMARY EMAIL
                </span>
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold font-mono">Direct Inbox</h3>
              <p className="text-xs text-zinc-400 select-all font-mono break-all">
                xanab2105@gmail.com
              </p>
              <p className="text-xs text-zinc-500">
                Personal mailbox for research collaborations, projects, and queries.
              </p>
            </div>

            <div className="pt-6 space-y-2">
              <a
                href="mailto:xanab2105@gmail.com"
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Mail className="w-4 h-4" /> Open in Mail App
              </a>
              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}
              </button>
            </div>
          </motion.div>

          {/* LinkedIn Network Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              activeTheme === 'y2k'
                ? 'bg-blue-100 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black font-bold'
                : activeTheme === 'myspace'
                ? 'bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000] text-[#eef1f7]'
                : 'bg-[#0a0e1a] border-blue-500/30 text-white shadow-[0_0_30px_rgba(59,130,246,0.1)]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                  PROFESSIONAL
                </span>
                <Linkedin className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold font-mono">LinkedIn</h3>
              <p className="text-xs text-zinc-400 font-mono truncate">
                linkedin.com/in/zainab-faisal-001320406
              </p>
              <p className="text-xs text-zinc-500">
                Career journey, certifications, Panaversity updates, and connections.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="https://www.linkedin.com/in/zainab-faisal-001320406/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Linkedin className="w-4 h-4" /> View Profile <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* GitHub Repositories Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              activeTheme === 'y2k'
                ? 'bg-slate-100 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black font-bold'
                : activeTheme === 'myspace'
                ? 'bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000] text-[#eef1f7]'
                : 'bg-[#0a0e1a] border-slate-700/50 text-white shadow-[0_0_30px_rgba(142,162,201,0.1)]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] text-[#8ea2c9] font-bold border border-[#334155]">
                  CODE & BUILDS
                </span>
                <Github className="w-5 h-5 text-[#8ea2c9]" />
              </div>
              <h3 className="text-xl font-bold font-mono">GitHub</h3>
              <p className="text-xs text-zinc-400 font-mono truncate">
                github.com / zainabfaisal
              </p>
              <p className="text-xs text-zinc-500">
                Open-source repositories, AI experiments, and low-level system code.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md border border-[#475569]"
              >
                <Github className="w-4 h-4" /> View GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
