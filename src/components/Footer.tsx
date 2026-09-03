import React from 'react';
import { Terminal, Heart, Code2, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface FooterProps {
  activeTheme: ThemeMode;
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ activeTheme, onOpenTerminal }) => {
  return (
    <footer
      className={`py-12 border-t font-mono text-xs transition-colors ${
        activeTheme === 'y2k'
          ? 'bg-pink-300 border-black text-black font-bold'
          : activeTheme === 'myspace'
          ? 'bg-[#1a1d23] border-black text-[#eef1f7] font-bold border-t-4'
          : 'bg-[#04060a] border-cyan-500/20 text-zinc-400'
      }`}
    >
      {activeTheme === 'y2k' && (
        <div className="border-y-2 border-black bg-cyan-300 py-1.5 mb-8 overflow-hidden">
          <span className="marquee-track text-[11px] font-extrabold tracking-wider text-black">
            ★ THANKS FOR VISITING ZAINAB.SYS ★ BUILT WITH CURIOSITY ★ BEST VIEWED AT 1024x768 ★ SIGN THE GUESTBOOK BELOW ★ POWERED BY TRICORE AI ★&nbsp;
          </span>
        </div>
      )}
      {activeTheme === 'myspace' && (
        <div className="border-y-2 border-black bg-[#8ea2c9] text-[#c7ccd6] py-1.5 mb-8 overflow-hidden">
          <span className="marquee-track text-[11px] font-extrabold tracking-wider">
            ✦ thanx 4 stopping by my page ✦ add me as a friend lol ✦ coded this w/ way 2 many late nights ✦ ily if ur still reading this ✦&nbsp;
          </span>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-bold text-sm flex items-center justify-center sm:justify-start gap-1.5">
            <span>
              {activeTheme === 'myspace' ? (
                'made by zainab (obviously)'
              ) : activeTheme === 'y2k' ? (
                <>
                  <span className="text-purple-950">Designed and Developed by</span>{' '}
                  <span className="text-pink-700 font-extrabold">Zainab Faisal</span>
                </>
              ) : (
                'Designed and Developed by Zainab Faisal'
              )}
            </span>
            {activeTheme === 'y2k' && <span className="text-pink-600 font-bold">♥</span>}
            {activeTheme === 'myspace' && <span className="text-[#8ea2c9] myspace-heart-pulse">✦</span>}
          </p>
          <p className={`text-[11px] ${activeTheme === 'y2k' ? 'text-zinc-900 font-semibold' : 'opacity-80'}`}>
            {activeTheme === 'myspace' ? 'cs student @ UMT who codes 2 much lol' : 'Built with curiosity, AI, and code. BS CS @ UMT (University of Management and Technology).'}
          </p>
          {activeTheme === 'myspace' && (
            <p className="text-[10px] opacity-70 pt-1">myspace.com/zainabfaisal.profile</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {activeTheme === 'y2k' && (
            <div className="flex items-center gap-1.5 bg-black text-lime-400 px-2 py-1 border-2 border-black rounded">
              <span className="text-[9px] uppercase tracking-wider text-lime-500 mr-1">Visitors:</span>
              <span className="hit-counter-digit font-mono text-xs tracking-widest">0 0 4 2 0 6</span>
            </div>
          )}
          {activeTheme === 'myspace' && (
            <div className="flex items-center gap-1.5 bg-[#1a1d23] text-[#8ea2c9] px-2 py-1 border-2 border-black">
              <span className="text-[9px] uppercase tracking-wider text-[#8ea2c9] mr-1">ppl who stalked my page:</span>
              <span className="hit-counter-digit font-mono text-xs tracking-widest">1 2 8 4 3</span>
            </div>
          )}
          <button
            onClick={onOpenTerminal}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
              activeTheme === 'y2k'
                ? 'bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-zinc-100'
                : activeTheme === 'myspace'
                ? 'bg-[#1a1d23] text-[#8ea2c9] border-2 border-black rounded-full'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{activeTheme === 'myspace' ? 'poke terminal' : 'zainab.terminal'}</span>
          </button>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
};
