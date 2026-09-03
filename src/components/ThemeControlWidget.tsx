import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Heart, Sparkles, X } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeControlWidgetProps {
  activeTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const ThemeControlWidget: React.FC<ThemeControlWidgetProps> = ({
  activeTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-xs select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`mb-2 p-3 border-2 shadow-[4px_4px_0px_0px_#000] w-64 ${
              activeTheme === 'myspace'
                ? 'bg-[#101726] border-[#8ea2c9] text-[#eef1f7]'
                : activeTheme === 'y2k'
                ? 'bg-pink-100 border-black text-black'
                : 'bg-[#080d1a] border-cyan-500/40 text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-current/30 font-bold">
              <span className={`flex items-center gap-1.5 ${activeTheme === 'y2k' ? 'text-purple-900 font-extrabold' : ''}`}>
                <span>★</span> SELECT PAGE SKIN <span>★</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 cursor-pointer p-0.5"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => {
                  onThemeChange('neural');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 border flex items-center justify-between cursor-pointer font-bold transition-all ${
                  activeTheme === 'neural'
                    ? 'bg-cyan-500 text-black border-white'
                    : activeTheme === 'y2k'
                    ? 'bg-white hover:bg-zinc-100 border-black text-black'
                    : 'bg-black/30 hover:bg-black/50 border-white/20 text-zinc-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Moon className="w-3.5 h-3.5" />
                  <span>DARK</span>
                </span>
                {activeTheme === 'neural' && <span>✓</span>}
              </button>

              <button
                onClick={() => {
                  onThemeChange('y2k');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 border flex items-center justify-between cursor-pointer font-bold transition-all ${
                  activeTheme === 'y2k'
                    ? 'bg-pink-400 text-black border-black'
                    : 'bg-black/30 hover:bg-black/50 border-white/20 text-zinc-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PASTELSPACE</span>
                </span>
                {activeTheme === 'y2k' && <span>✓</span>}
              </button>

              <button
                onClick={() => {
                  onThemeChange('myspace');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 border flex items-center justify-between cursor-pointer font-bold transition-all ${
                  activeTheme === 'myspace'
                    ? 'bg-[#8ea2c9] text-black border-white'
                    : activeTheme === 'y2k'
                    ? 'bg-white hover:bg-zinc-100 border-black text-black'
                    : 'bg-black/30 hover:bg-black/50 border-[#8ea2c9]/40 text-[#c7ccd6]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>MYSPACE</span>
                </span>
                {activeTheme === 'myspace' && <span>✓</span>}
              </button>
            </div>

            <p className={`text-[10px] pt-2 text-center ${activeTheme === 'y2k' ? 'text-zinc-800 font-semibold' : 'opacity-70'}`}>
              switching skins preserves all project data & contact features
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 border-2 shadow-[3px_3px_0px_0px_#000] font-bold flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5 ${
          activeTheme === 'myspace'
            ? 'bg-[#182238] border-[#8ea2c9] text-[#eef1f7] hover:bg-[#202d4a]'
            : activeTheme === 'y2k'
            ? 'bg-pink-300 border-black text-black hover:bg-pink-400'
            : 'bg-[#090e1d] border-cyan-500/40 text-cyan-300 hover:bg-[#0f172e]'
        }`}
        title="Change Portfolio Skin / Theme"
      >
        <span className={activeTheme === 'y2k' ? 'text-black' : 'text-cyan-400'}>★</span>
        <span>[ change skin: <strong className="underline decoration-dotted">{activeTheme === 'neural' ? 'DARK' : activeTheme === 'y2k' ? 'PASTELSPACE' : 'MYSPACE'}</strong> ▾ ]</span>
      </button>
    </div>
  );
};
