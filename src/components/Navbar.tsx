import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal as TerminalIcon,
  Heart,
  Moon,
  Sparkles,
  Menu,
  X,
  Code2,
  Cpu,
  Send,
  Zap,
  Laptop
} from 'lucide-react';
import { ThemeMode } from '../types';
import { AudioToggle } from './AudioToggle';

interface NavbarProps {
  activeTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenTerminal: () => void;
  onOpenEmailModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTheme,
  onThemeChange,
  onOpenTerminal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Security', href: '#security' },
    { name: 'AI Lab', href: '#ailab' },
    { name: 'Exploring', href: '#exploring' },
    { name: 'Contact', href: '#contact' },
  ];

  const myspaceNavLinks = [
    { name: 'home', href: '#home' },
    { name: 'abt me', href: '#about' },
    { name: 'my journey', href: '#journey' },
    { name: 'skills n stuff', href: '#skills' },
    { name: 'things i made', href: '#projects' },
    { name: 'security stuff', href: '#security' },
    { name: 'ai lab', href: '#ailab' },
    { name: 'whatever im up 2', href: '#exploring' },
    { name: 'contact info', href: '#contact' },
    { name: 'leave a msg', href: '#guestbook' },
  ];

  const displayLinks = activeTheme === 'myspace' ? myspaceNavLinks : navLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md transition-all duration-300 ${
        activeTheme === 'y2k'
          ? 'bg-gradient-to-r from-pink-300/90 via-purple-300/90 to-cyan-300/90 border-b-4 border-black text-black shadow-[0_4px_0_#000]'
          : activeTheme === 'myspace'
          ? 'bg-gradient-to-r from-[#232730] via-[#14161a] to-[#0d0e11] border-b-4 border-black text-[#eef1f7] shadow-[0_4px_0_#000]'
          : 'bg-[#05070a]/80 border-b border-cyan-500/20 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* ZF Logo / Branding */}
        <a
          href="#home"
          className="flex items-center gap-2 group cursor-pointer shrink-0"
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono transition-transform group-hover:scale-105 ${
              activeTheme === 'y2k'
                ? 'bg-black text-pink-300 border-2 border-white shadow-[2px_2px_0px_0px_#000]'
                : activeTheme === 'myspace'
                ? 'bg-[#1a1d23] text-[#8ea2c9] border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000]'
                : 'bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            }`}
          >
            ZF
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold tracking-wider text-xs sm:text-sm font-mono flex items-center gap-1">
              ZAINAB FAISAL
              {activeTheme === 'y2k' && <span className="text-xs">★</span>}
              {activeTheme === 'myspace' && <span className="text-[#8ea2c9] text-xs myspace-heart-pulse">♥</span>}
            </span>
            <span className={`text-[10px] opacity-70 tracking-widest font-mono ${activeTheme === 'myspace' ? 'text-[#c7ccd6]' : ''}`}>
              {activeTheme === 'myspace' ? 'a place 4 my stuff' : 'AI • SYSTEMS'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-3 2xl:gap-5 text-xs sm:text-sm font-medium">
          {displayLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors whitespace-nowrap hover:opacity-100 ${
                activeTheme === 'y2k'
                  ? 'text-black hover:text-pink-600 font-bold hover:underline'
                  : activeTheme === 'myspace'
                  ? 'text-[#c7ccd6] hover:text-[#8ea2c9] font-bold hover:underline decoration-[#8ea2c9]'
                  : 'text-zinc-400 hover:text-cyan-300'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Background Music Toggle (Y2K / MySpace only) */}
          <AudioToggle activeTheme={activeTheme} />

          {/* Hacking Terminal Trigger Button */}
          <button
            onClick={onOpenTerminal}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTheme === 'y2k'
                ? 'bg-cyan-400 text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]'
                : activeTheme === 'myspace'
                ? 'bg-[#1a1d23] text-[#8ea2c9] border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000]'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            }`}
          >
            <TerminalIcon className={`w-3.5 h-3.5 shrink-0 ${activeTheme === 'myspace' ? 'text-[#8ea2c9]' : 'text-emerald-500'}`} />
            <span className="hidden lg:inline">&gt;_ Terminal</span>
          </button>

          {/* 3 Theme Switcher */}
          <div
            className={`flex items-center p-1 rounded-xl border gap-1 font-mono text-[11px] backdrop-blur-sm ${
              activeTheme === 'myspace'
                ? 'bg-black/50 border-[#c7ccd6]/40'
                : activeTheme === 'y2k'
                ? 'bg-black/20 border-black/40'
                : 'bg-black/40 border-white/20'
            }`}
          >
            <button
              onClick={() => onThemeChange('neural')}
              title="Neural Night (AI Developer Mode)"
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeTheme === 'neural'
                  ? 'bg-cyan-500 text-black font-bold shadow-sm'
                  : activeTheme === 'myspace'
                  ? 'text-[#c7ccd6]/70 hover:text-[#c7ccd6] hover:bg-[#8ea2c9]/20'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span className="hidden xl:inline">Neural</span>
            </button>

            <button
              onClick={() => onThemeChange('myspace')}
              title="MySpace.profile (Early-2000s Personal Page Mode)"
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeTheme === 'myspace'
                  ? 'bg-[#8ea2c9] text-white font-bold shadow-sm'
                  : activeTheme === 'y2k'
                  ? 'text-black/70 hover:text-black hover:bg-black/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart className="w-3 h-3" />
              <span className="hidden xl:inline">MySpace</span>
            </button>

            <button
              onClick={() => onThemeChange('y2k')}
              title="Y2K.EXE (Retro MySpace Pixel Window Mode)"
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeTheme === 'y2k'
                  ? 'bg-black text-pink-300 font-bold shadow-sm'
                  : activeTheme === 'myspace'
                  ? 'text-[#c7ccd6]/70 hover:text-[#c7ccd6] hover:bg-[#8ea2c9]/20'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden xl:inline">Y2K.exe</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg xl:hidden transition-colors ${
              activeTheme === 'myspace' || activeTheme === 'y2k'
                ? 'hover:bg-black/10 text-black'
                : 'hover:bg-white/10 text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-b px-4 py-4 space-y-3 font-mono text-sm ${
              activeTheme === 'y2k'
                ? 'bg-pink-200 text-black border-black'
                : activeTheme === 'myspace'
                ? 'bg-[#1a1d23] text-[#eef1f7] border-black'
                : 'bg-[#080b12] text-white border-cyan-500/20'
            }`}
          >
            <div className="grid grid-cols-2 gap-2">
              {displayLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-black/10 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className={`w-full py-2 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                  'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                }`}
              >
                <TerminalIcon className="w-4 h-4 text-emerald-400" /> Open Hacking Terminal
              </button>
              <AudioToggle activeTheme={activeTheme} variant="mobile" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
