import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Radio, Activity, Eye } from 'lucide-react';
import { ThemeMode } from '../types';

interface SecuritySectionProps {
  activeTheme: ThemeMode;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ activeTheme }) => {
  const securityExploration = [
    {
      title: 'Network Security Concepts',
      desc: 'Understanding handshake mechanics, encryption, protocols (TCP, UDP, DNS, TLS), and traffic dynamics.',
      icon: <Radio className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: 'Packet Analysis & Inspection',
      desc: 'Real-time packet sniffing using Scapy and Python to analyze network communications line by line.',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'System Behavior & Integrity',
      desc: 'Studying assembly registers, buffer constraints, memory allocation, and OS-level security protections.',
      icon: <Eye className="w-5 h-5 text-purple-400" />,
    },
    {
      title: 'Security Fundamentals',
      desc: 'Exploring foundational defensive principles, authentication hashing, and threat modeling.',
      icon: <Lock className="w-5 h-5 text-pink-400" />,
    },
  ];

  return (
    <section id="security" className="py-20 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="space-y-2 mb-12">
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${activeTheme === 'y2k' ? 'text-emerald-800' : 'text-emerald-400'}`}>
            <ShieldCheck className="w-4 h-4" />
            <span>{activeTheme === 'myspace' ? 'nosy about security lol' : 'SYSTEM DEFENSE & CURIOSITY'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              activeTheme === 'y2k'
                ? 'drop-shadow-[2px_2px_0px_#10b981]'
                : activeTheme === 'myspace'
                ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                : 'text-white'
            }`}
          >
            {activeTheme === 'myspace' ? (
              'security stuff i think about'
            ) : activeTheme === 'y2k' ? (
              <>
                <span className="text-purple-900">Security</span>{' '}
                <span className="text-emerald-700">Curiosity</span>
              </>
            ) : (
              'Security Curiosity'
            )}
          </h2>
          <p className={`text-sm max-w-2xl ${activeTheme === 'y2k' ? 'text-zinc-700' : 'text-zinc-400'}`}>
            {activeTheme === 'myspace' ? (
              'idk i just like knowing how stuff breaks n how 2 stop it lol'
            ) : activeTheme === 'y2k' ? (
              <>
                "I am interested in understanding how <span className="text-blue-800 font-bold">systems communicate</span>, <span className="text-pink-600 font-bold">fail</span>, and can be <span className="text-emerald-700 font-bold">protected</span>."
              </>
            ) : (
              '"I am interested in understanding how systems communicate, fail, and can be protected."'
            )}
          </p>
        </div>

        {/* 2x2 Grid of Exploration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityExploration.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border transition-all ${
                activeTheme === 'y2k'
                  ? 'bg-purple-100 border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black font-bold'
                  : activeTheme === 'myspace'
                  ? 'bg-[#1a1d23] border-2 border-black shadow-[4px_4px_0px_0px_#8ea2c9] text-[#eef1f7] font-bold hover:border-[#8ea2c9]'
                  : 'bg-[#090d16] border-emerald-500/20 text-white hover:border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl shrink-0 ${'bg-black/20'}`}>
                  {item.icon}
                </div>
                <h3 className={`text-lg font-bold font-mono ${
                  activeTheme === 'y2k'
                    ? idx === 0
                      ? 'text-cyan-950 font-extrabold'
                      : idx === 1
                      ? 'text-purple-950 font-extrabold'
                      : idx === 2
                      ? 'text-emerald-950 font-extrabold'
                      : 'text-pink-950 font-extrabold'
                    : ''
                }`}>{item.title}</h3>
              </div>
              <p className={`text-xs sm:text-sm font-sans leading-relaxed ${
                activeTheme === 'y2k' ? 'text-zinc-800' : 'text-zinc-300'
              }`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
