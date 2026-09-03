import React, { useEffect, useState } from 'react';
import { Terminal as TerminalIcon, Folder, Monitor } from 'lucide-react';
import { ThemeMode } from '../types';
import { MySkillsWindow } from './MySkillsWindow';

interface OSDesktopProps {
  activeTheme: ThemeMode;
  onOpenTerminal: () => void;
}

export const OSDesktop: React.FC<OSDesktopProps> = ({ activeTheme, onOpenTerminal }) => {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const isY2k = activeTheme === 'y2k';
  const isMyspace = activeTheme === 'myspace';

  const activeTasks = isSkillsOpen ? 1 : 0;

  const panelClass = isY2k
    ? 'bg-[#f0e6ff] border-4 border-black shadow-[6px_6px_0px_0px_#000] text-black'
    : isMyspace
    ? 'bg-[#150f0a] border-2 border-[#b8bfc9] shadow-[6px_6px_0px_0px_#000] text-[#eef1f7]'
    : 'bg-[#05070c] border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.12)] text-white';

  const titleBarClass = isY2k
    ? 'border-black text-black'
    : isMyspace
    ? 'border-[#b8bfc9]/40 text-[#b8bfc9]'
    : 'border-cyan-500/20 text-cyan-300';

  const iconBase = 'w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all cursor-pointer';

  const iconClass = (isActive: boolean) =>
    isY2k
      ? `${iconBase} border-2 border-black ${isActive ? 'bg-cyan-300' : 'bg-white hover:bg-cyan-100'}`
      : isMyspace
      ? `${iconBase} border-2 ${isActive ? 'bg-[#b8bfc9]/20 border-[#b8bfc9]' : 'bg-black/40 border-[#b8bfc9]/30 hover:border-[#b8bfc9]'}`
      : `${iconBase} border ${isActive ? 'bg-cyan-500/20 border-cyan-400' : 'bg-black/40 border-cyan-500/20 hover:border-cyan-400/60'}`;

  return (
    <>
      <div className={`rounded-2xl overflow-hidden font-mono text-xs ${panelClass}`}>
        {/* Title bar */}
        <div className={`flex items-center justify-between px-3 py-2 border-b ${titleBarClass}`}>
          <span className="flex items-center gap-1.5 font-bold">
            <Monitor className="w-3.5 h-3.5" /> Zainab.OS Core (v2.0)
          </span>
          <span className={`flex items-center gap-3 text-[10px] ${isY2k ? 'text-zinc-800 font-bold' : 'opacity-80'}`}>
            <span>Active Tasks: {activeTasks}</span>
            <span>
              {now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })}{' '}
              {now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
            </span>
          </span>
        </div>

        {/* Icon dock */}
        <div className="p-4 flex items-center gap-4">
          <button onClick={onOpenTerminal} className={iconClass(false)}>
            <TerminalIcon className="w-5 h-5" />
            Terminal_
          </button>
          <button onClick={() => setIsSkillsOpen(true)} className={iconClass(isSkillsOpen)}>
            <Folder className="w-5 h-5" />
            MySkills_
          </button>
        </div>
      </div>

      <MySkillsWindow isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} activeTheme={activeTheme} />
    </>
  );
};
