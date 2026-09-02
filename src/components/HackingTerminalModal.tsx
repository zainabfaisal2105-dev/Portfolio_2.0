import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal as TerminalIcon,
  X,
  Send,
  Sparkles
} from 'lucide-react';
import { ThemeMode } from '../types';

interface TerminalEntry {
  command: string;
  output: string;
  timestamp: string;
  isAi?: boolean;
  isError?: boolean;
}

interface HackingTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenEmailModal?: () => void;
}

export const HackingTerminalModal: React.FC<HackingTerminalModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onThemeChange,
  onOpenEmailModal,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      command: 'init',
      output: `===================================================================
 ZAINAB.SYS INTERACTIVE HACKING TERMINAL v2.6 [UMT AI LAB]
===================================================================
Welcome, Agent! Type 'help' to see all available hacking commands.
Quick commands: [whoami] [skills] [projects] [cat resume.txt] [matrix] [email]`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  // Matrix Rain Animation Canvas Effect
  useEffect(() => {
    if (!isMatrixActive || !matrixCanvasRef.current) return;
    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ZAINAB_AI_SYSTEMS_LLM_RAG_PROMPT_ENGINEERING_UMT_2026';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 7, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = activeTheme === 'y2k' ? '#f43f5e' : '#10b981';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMatrixActive, activeTheme]);

  const executeCommand = async (cmdToRun?: string) => {
    const rawCmd = (cmdToRun || inputVal).trim();
    if (!rawCmd) return;

    const timeStr = new Date().toLocaleTimeString();
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);
    setInputVal('');

    const lowerCmd = rawCmd.toLowerCase();

    // Client-side quick command interceptions
    if (lowerCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (lowerCmd === 'matrix') {
      setIsMatrixActive((prev) => !prev);
      setHistory((prev) => [
        ...prev,
        {
          command: rawCmd,
          output: `[SYSTEM]: Matrix cyber rain effect ${
            !isMatrixActive ? 'ENGAGED' : 'DISENGAGED'
          }. Type 'matrix' again to toggle.`,
          timestamp: timeStr,
        },
      ]);
      return;
    }

    if (lowerCmd.startsWith('theme')) {
      const mode = lowerCmd.split(' ')[1] as ThemeMode;
      if (mode === 'neural' || mode === 'myspace' || mode === 'y2k') {
        onThemeChange(mode);
        setHistory((prev) => [
          ...prev,
          {
            command: rawCmd,
            output: `[SYSTEM]: Portfolio theme switched to '${mode.toUpperCase()}'.`,
            timestamp: timeStr,
          },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            command: rawCmd,
            output: `[USAGE]: theme <neural | myspace | y2k>`,
            timestamp: timeStr,
          },
        ]);
      }
      return;
    }

    if (lowerCmd === 'email' || lowerCmd === 'contact') {
      if (onOpenEmailModal) {
        onOpenEmailModal();
      }
      setHistory((prev) => [
        ...prev,
        {
          command: rawCmd,
          output: `[SYSTEM]: Opening Quantum Mail Dispatcher for direct email transmission to xanab2105@gmail.com...`,
          timestamp: timeStr,
        },
      ]);
      return;
    }

    // Built-in commands resolve fully client-side, so the terminal always
    // works even when this portfolio is deployed as a static site with no
    // backend running. Only free-form queries touch the server, and even
    // that falls back gracefully instead of showing a scary error.
    const CLIENT_COMMANDS: Record<string, string> = {
      help: `======================================================
 ZAINAB.SYS INTERACTIVE TERMINAL v2.6.0
======================================================
Available Commands:
  help        - Display this menu
  whoami      - Identity check & core philosophy
  skills      - View technical layer architecture
  projects    - List case studies & AI systems
  contact     - Send instant email to Zainab
  matrix      - Trigger digital rain visual mode
  tricore     - Inspect TriCore AI engine architecture
  clear       - Clear terminal buffer
  theme       - Switch portfolio theme [neural | myspace | y2k]
  sudo        - Request root privileges
  cat resume.txt / cat about.txt - Read files
======================================================`,
      whoami: `[USER]: Visitor / Recruiter / Fellow Researcher
[IDENTITY]: Zainab Faisal | BS CS @ UMT
[PHILOSOPHY]: "Understanding machines from the inside out."
[STATUS]: Exploring AI systems, LLM architectures, and low-level computer networks.`,
      skills: `LAYER 1: SYSTEMS FOUNDATION -> Assembly, Computer Architecture, OS, Low-level concepts
LAYER 2: SOFTWARE ENGR     -> C++, Python, SQL, Data Structures & Algorithms
LAYER 3: INTELLIGENCE      -> ML, Deep Learning (ResNet50), Scikit-learn, Pandas, NumPy, LLMs, RAG, Prompt Engineering
LAYER 4: NETWORKS & SEC    -> Computer Networks, Packet Analysis, Scapy, TCP/UDP/DNS, Security Fundamentals`,
      projects: `[1] TRICORE AI           - Multi-engine LLM system (Spark, Lens, Core)
[2] Deepfake Detection   - CNN baseline + ResNet50 transfer learning
[3] Packet Sniffer       - Real-time network analyzer (Python, Scapy, TCP/UDP/DNS)
[4] Movie vs TV Show     - Classifier with Netflix dataset (Random Forest)
[5] Delivery DB System   - SQL Server, 11 tables, stored procedures & triggers
[6] Attendance System    - C++ systems project`,
      ls: `[1] TRICORE AI           - Multi-engine LLM system (Spark, Lens, Core)
[2] Deepfake Detection   - CNN baseline + ResNet50 transfer learning
[3] Packet Sniffer       - Real-time network analyzer (Python, Scapy, TCP/UDP/DNS)
[4] Movie vs TV Show     - Classifier with Netflix dataset (Random Forest)
[5] Delivery DB System   - SQL Server, 11 tables, stored procedures & triggers
[6] Attendance System    - C++ systems project`,
      tricore: `TRICORE AI ARCHITECTURE:
- SPARK ENGINE : Fast creative assistant for rapid ideation.
- LENS ENGINE  : RAG document assistant with strict context grounding.
- CORE ENGINE  : Deep research engine with citations & reasoning traces.
"The model is not the product. The system around it is."`,
      sudo: `[SUDO]: Root access requested.
[SECURITY]: Access granted! You now have unrestricted access to Zainab's digital laboratory.
Type 'matrix' to engage full cyber mode or 'contact' to send a high-priority dispatch!`,
      'cat resume.txt': `------------------------------------------------------
ZAINAB FAISAL - RESUME SUMMARY
------------------------------------------------------
Education : BS Computer Science @ UMT (University of Management & Technology)
Focus     : AI Systems, LLM Prompt Engineering, Networks & Computer Architecture
Projects  : TriCore AI, Deepfake Detection, Packet Sniffer, Movie Classifier
Current   : SQA Intern @ Grayphite
Email     : xanab2105@gmail.com
------------------------------------------------------`,
      resume: `------------------------------------------------------
ZAINAB FAISAL - RESUME SUMMARY
------------------------------------------------------
Education : BS Computer Science @ UMT (University of Management & Technology)
Focus     : AI Systems, LLM Prompt Engineering, Networks & Computer Architecture
Projects  : TriCore AI, Deepfake Detection, Packet Sniffer, Movie Classifier
Current   : SQA Intern @ Grayphite
Email     : xanab2105@gmail.com
------------------------------------------------------`,
      'cat about.txt': `"My interest in computer science started from understanding what happens beneath the surface. From memory, instructions, and architecture to networks and artificial intelligence. I enjoy moving between layers: low-level systems, software engineering, and intelligent applications."`,
      about: `"My interest in computer science started from understanding what happens beneath the surface. From memory, instructions, and architecture to networks and artificial intelligence. I enjoy moving between layers: low-level systems, software engineering, and intelligent applications."`,
    };

    if (CLIENT_COMMANDS[lowerCmd]) {
      setHistory((prev) => [
        ...prev,
        { command: rawCmd, output: CLIENT_COMMANDS[lowerCmd], timestamp: timeStr },
      ]);
      return;
    }

    // Free-form query: try the optional server backend (only present when
    // this is deployed with the Node/Express server running), otherwise
    // fall back to a friendly canned response instead of an error.
    setIsLoading(true);
    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: rawCmd }),
      });
      if (!res.ok) throw new Error('backend unavailable');
      const data = await res.json();
      setHistory((prev) => [
        ...prev,
        {
          command: rawCmd,
          output: data.output || 'Command executed.',
          timestamp: timeStr,
        },
      ]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        {
          command: rawCmd,
          output: `[ZAINAB.SYS]: '${rawCmd}' isn't a recognized command. Type 'help' to see everything this terminal can do.`,
          timestamp: timeStr,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <>
      {/* Optional Matrix Canvas Overlay */}
      {isMatrixActive && (
        <canvas
          ref={matrixCanvasRef}
          className="fixed inset-0 z-40 pointer-events-none opacity-40"
        />
      )}

      {/* Floating Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="terminal-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className={`fixed z-50 flex flex-col shadow-2xl transition-all duration-300 overflow-hidden font-mono ${
              isMaximized
                ? 'inset-4 sm:inset-8 rounded-2xl'
                : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[680px] h-[520px] rounded-2xl'
            } ${
              activeTheme === 'y2k'
                ? 'bg-[#181028] border-4 border-[#000000] shadow-[8px_8px_0px_0px_#f43f5e]'
                : activeTheme === 'myspace'
                ? 'bg-[#1a1d23] border-4 border-black text-[#eef1f7] shadow-[8px_8px_0px_0px_#8ea2c9]'
                : 'bg-[#0a0d14] border border-cyan-500/40 text-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.15)]'
            }`}
          >
            {/* Header Window Bar */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b select-none ${
                activeTheme === 'y2k'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-black font-bold'
                  : activeTheme === 'myspace'
                  ? 'bg-[#8ea2c9] text-white border-black font-bold'
                  : 'bg-[#06080e] text-cyan-400 border-cyan-500/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:opacity-80 flex items-center justify-center text-[8px] text-black font-bold"
                  >
                    ✕
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:opacity-80 flex items-center justify-center text-[8px] text-black font-bold"
                  >
                    −
                  </button>
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:opacity-80 flex items-center justify-center text-[8px] text-black font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="ml-2 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                  <TerminalIcon className="w-4 h-4 text-emerald-400" />
                  ZAINAB_HACK_TERMINAL v2.6 -- (UMT AI LAB)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMatrixActive((prev) => !prev)}
                  className={`px-2 py-0.5 text-[10px] rounded border transition-all ${
                    isMatrixActive
                      ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                      : 'bg-zinc-800/80 text-zinc-300 border-zinc-600 hover:bg-zinc-700'
                  }`}
                  title="Toggle Matrix Rain"
                >
                  {isMatrixActive ? '⚡ MATRIX ON' : '🌧 MATRIX'}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Command Shortcuts Toolbar */}
            <div className="px-3 py-2 bg-black/40 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
              <span className="text-zinc-500 shrink-0 text-[10px] uppercase font-bold">Quick:</span>
              {['help', 'whoami', 'skills', 'projects', 'cat resume.txt', 'tricore', 'email', 'matrix', 'clear'].map(
                (cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="px-2 py-0.5 rounded bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-[11px] shrink-0 transition-all active:scale-95 cursor-pointer"
                  >
                    {cmd}
                  </button>
                )
              )}
            </div>

            {/* Terminal Console Output Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm font-mono leading-relaxed">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <span className="text-emerald-400">zainab@umt-lab:~$</span>
                    <span>{item.command}</span>
                    <span className="ml-auto text-[10px] text-zinc-500">{item.timestamp}</span>
                  </div>
                  <div
                    className={`p-2.5 rounded-lg whitespace-pre-wrap ${
                      item.isError
                        ? 'bg-red-950/40 text-red-300 border border-red-500/30'
                        : activeTheme === 'y2k'
                        ? 'bg-purple-950/40 text-pink-300 border border-pink-500/20'
                        : activeTheme === 'myspace'
                        ? 'bg-[#1a1d23] text-[#c7ccd6] border border-[#9aa4b8]'
                        : 'bg-zinc-900/60 text-zinc-300 border border-white/5'
                    }`}
                  >
                    {item.output}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-emerald-400 py-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Processing AI system response...</span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Command Prompt Input Area */}
            <div className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2">
              <span className="text-emerald-400 font-bold shrink-0">zainab@umt-lab:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command (e.g. 'help', 'skills', 'projects', 'email')..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm placeholder:text-zinc-600"
              />
              <button
                onClick={() => executeCommand()}
                disabled={isLoading}
                className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
