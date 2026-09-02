import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Star,
  Sparkles,
  Terminal as TerminalIcon,
  Send,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  MessageSquare,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Lock,
  Sliders,
  Award,
  Zap,
  Radio,
  FileCode,
  Share2,
  UserPlus,
  Bookmark,
  Users,
  AlertCircle,
  Play,
  Pause,
  Volume2,
  HelpCircle,
  Clock,
  Flame,
  Bug,
  Smile,
  RefreshCw,
  Lightbulb,
  Pin
} from 'lucide-react';
import { ThemeMode, ProjectCaseStudy, CertificationItem } from '../types';
import { AudioToggle } from './AudioToggle';
import { GuestbookSection } from './GuestbookSection';
import { StarryInspoBackground } from './StarryInspoBackground';

interface MySpaceProfileProps {
  activeTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenTerminal: () => void;
  onOpenEmailModal: () => void;
}

export const MySpaceProfile: React.FC<MySpaceProfileProps> = ({
  activeTheme,
  onThemeChange,
  onOpenTerminal,
  onOpenEmailModal,
}) => {
  // Interactive States
  const [selectedProjectId, setSelectedProjectId] = useState<string>('tricore');
  const [activeEngine, setActiveEngine] = useState<'spark' | 'lens' | 'core'>('spark');
  const [temperature, setTemperature] = useState(0.2);
  const [ragContextLimit, setRagContextLimit] = useState(4);
  const [strictGroundedness, setStrictGroundedness] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [friendToast, setFriendToast] = useState<string | null>(null);

  // Interactive Mood Picker
  const MOOD_OPTIONS = [
    { label: 'confused but productive', icon: '⚡' },
    { label: 'caffeinated at 2am', icon: '☕' },
    { label: 'staring at a semicolon', icon: '👀' },
    { label: 'pretending i understand pointers', icon: '🧠' },
    { label: 'listening to one song on loop for 6 hours', icon: '🎧' },
    { label: 'accidentally fixed a bug by deleting random code', icon: '✨' },
    { label: 'fighting with CSS alignment', icon: '📐' }
  ];
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);

  // Past Me vs Current Me interactive scenario tab
  const [activeDialogueIndex, setActiveDialogueIndex] = useState(0);
  const DIALOGUES = [
    {
      title: '1. The 2AM Coding Epiphany',
      past: {
        speaker: 'PAST ME (2008 vibe)',
        text: 'if i stay up until 4am and rewrite this entire codebase from scratch without any planning, it will definitely work first try and i will be a legendary hacker.',
        reaction: '😎 (fueled purely by optimism & cold chai)'
      },
      current: {
        speaker: 'CURRENT ME',
        text: 'i have now broken 14 things that were working fine 20 minutes ago, my terminal is throwing red errors in languages i don\'t even speak, and i need to be awake in 3 hours.',
        reaction: '💀 (staring at git diff with immense regret)'
      }
    },
    {
      title: '2. Estimating Project Deadlines',
      past: {
        speaker: 'PAST ME',
        text: 'how hard could this feature be? it\'s literally just an if-statement and a loop. give me 15 minutes max.',
        reaction: '✌️ (utterly unbothered)'
      },
      current: {
        speaker: 'CURRENT ME (4 days later)',
        text: 'it was not just an if-statement. it required rewriting the entire database schema, setting up asynchronous socket listeners, and fighting an obscure race condition.',
        reaction: '😭 (documenting 40 edge cases in Jira)'
      }
    },
    {
      title: '3. Reading Compiler Errors',
      past: {
        speaker: 'PAST ME',
        text: 'the compiler is lying. my code is mathematically flawless. it must be an operating system glitch.',
        reaction: '🧐 (blaming the hardware)'
      },
      current: {
        speaker: 'CURRENT ME',
        text: 'i forgot a closing bracket on line 12.',
        reaction: '🤦‍♀️ (apologizing to the compiler internally)'
      }
    },
    {
      title: '4. Designing this MySpace Page',
      past: {
        speaker: 'PAST ME',
        text: 'i will add 40 animated pixel stars, 6 glitter badges, a custom marquee, and 8 different shades of dark blue navy.',
        reaction: '🎨 (HTML wizard mode)'
      },
      current: {
        speaker: 'CURRENT ME',
        text: 'why did i spend 3 hours aligning a 2-pixel border around my top 8 friends box when i have an AI exam tomorrow?',
        reaction: '💖 (worth it tbh, it looks amazing)'
      }
    }
  ];

  // Interactive Sticky Peel Notes
  const [stickyNotes, setStickyNotes] = useState([
    {
      id: 'note_1',
      title: '📌 NOTE TO SELF:',
      text: 'do not touch working code just to "make it cleaner" at 1:45am. it will not get cleaner.',
      peeled: false,
      color: 'bg-amber-950/80 border-amber-300/80 text-amber-200'
    },
    {
      id: 'note_2',
      title: '⚡ SCIENTIFIC FACT:',
      text: 'printing "HERE 1", "HERE 2", "WHY IS IT REACHING HERE" is a valid enterprise testing methodology.',
      peeled: false,
      color: 'bg-cyan-950/80 border-cyan-300/80 text-cyan-200'
    },
    {
      id: 'note_3',
      title: '👀 CRITICAL OBSERVATION:',
      text: 'the probability of a bug existing is directly proportional to how proud you are of the function you just wrote.',
      peeled: false,
      color: 'bg-pink-950/80 border-pink-300/80 text-pink-200'
    }
  ]);

  const toggleStickyPeel = (id: string) => {
    setStickyNotes(prev =>
      prev.map(note => note.id === id ? { ...note, peeled: !note.peeled } : note)
    );
  };

  // Fake Music Player widget state
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  // Toast trigger
  const triggerToast = (msg: string) => {
    setFriendToast(msg);
    setTimeout(() => setFriendToast(null), 3500);
  };

  const handleAddFriend = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    triggerToast('★ added 2 ur top friends lol <3');
  };

  const handleForward = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('★ copied page link 2 clipboard!! send it 2 ur friends lol');
    } else {
      triggerToast('★ share url: ' + window.location.href);
    }
  };

  const handleAddFavorite = () => {
    triggerToast('★ added 2 favorites! thanx <3');
  };

  // Projects data with comedic, authentic teenage framing + deep serious technical breakdown
  const projects: ProjectCaseStudy[] = [
    {
      id: 'tricore',
      title: 'TriCore AI',
      subtitle: 'look what i built lol (this one got WAY out of hand)',
      category: 'AI / LLM SYSTEMS',
      problem:
        'Standard one-size-fits-all AI interfaces fail at distinct tasks: generic models hallucinate on complex documents, lack deep research grounding, or run too slowly for rapid brainstorming.',
      approach:
        'i built a specialized 3-engine multi-agent architecture separating rapid ideation (Spark), document vector grounding (Lens), and deep multi-step research (Core) into distinct processing pipelines with strict parameter controls.',
      technology: [
        'Prompt Engineering',
        'System Design',
        'RAG Architecture',
        'Temperature Control',
        'Token Optimization',
        'AI Evaluation',
      ],
      result:
        'zero-hallucination document answers on Lens engine, 3x faster response times on Spark, and citation-backed research traces on Core engine.',
      learned:
        'prompt boundaries, evaluation metrics, and system constraints matter 100x more than just swapping the raw foundation model.',
      quote: 'the model is not the product. the system around it is.',
      architecture: [
        {
          engine: 'Spark Engine',
          description: 'fast creative assistant for rapid ideation & brainstorming with low latency.',
        },
        {
          engine: 'Lens Engine',
          description: 'strict RAG document assistant answering strictly from uploaded vector documents.',
        },
        {
          engine: 'Core Engine',
          description: 'deep research engine with grounded web citations & multi-step reasoning traces.',
        },
      ],
    },
    {
      id: 'packetsniffer',
      title: 'Packet Sniffer',
      subtitle: 'i taught my computer to be nosy lol',
      category: 'NETWORKS & SECURITY',
      problem:
        'network traffic is invisible and abstract unless you inspect raw packet headers at the socket level.',
      approach:
        'built a real-time command-line network traffic analyzer in Python using Scapy to intercept raw sockets and parse Layer 3 and Layer 4 protocol headers directly.',
      technology: ['Python', 'Scapy', 'TCP/IP', 'UDP', 'DNS Extraction', 'Raw Sockets'],
      result: 'captures, parses, and filters live TCP, UDP, DNS, and ICMP frames in real-time with minimal latency.',
      learned:
        'how network byte order (big-endian), IP checksums, and socket filters actually work right at the OS kernel boundary.',
      stats: [
        { label: 'Protocols', value: 'TCP / UDP / DNS' },
        { label: 'Mode', value: 'Real-Time Sniff' },
      ],
    },
    {
      id: 'deepfake',
      title: 'Deepfake Detection System',
      subtitle: 'apparently computers can lie now',
      category: 'COMPUTER VISION / ML',
      problem:
        'generative AI creates creepy-realistic fake faces that bypass standard security filters and human eyes.',
      approach:
        'trained a Convolutional Neural Network using ResNet50 transfer learning on benchmark facial manipulation datasets to spot subtle spatial compression artifacts.',
      technology: ['Python', 'CNN', 'ResNet50', 'Transfer Learning', 'OpenCV', 'PyTorch'],
      result: 'hit 84.76% classification accuracy and 0.927 AUC score on validation datasets.',
      learned:
        'fine-tuning specific upper layers while freezing early feature extractors is the key to catching subtle compression noise without overfitting.',
      stats: [
        { label: 'Accuracy', value: '84.76%' },
        { label: 'AUC Score', value: '0.927' },
      ],
    },
    {
      id: 'classifier',
      title: 'Movie vs TV Show Classifier',
      subtitle: 'teaching python to guess what you are watching',
      category: 'MACHINE LEARNING',
      problem:
        'categorizing streaming library entries automatically using messy text descriptions, cast lists, and metadata.',
      approach:
        'engineered NLP TF-IDF features from streaming datasets and compared Random Forest, SVM, and Logistic Regression models.',
      technology: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Random Forest', 'TF-IDF'],
      result: 'achieved 85.00% predictive accuracy with an ensemble Random Forest classifier.',
      learned: 'data cleaning and feature engineering account for 80% of real-world model accuracy.',
      stats: [{ label: 'Accuracy', value: '85.00%' }],
    },
    {
      id: 'deliverydb',
      title: 'Local Delivery Database System',
      subtitle: 'sql stored procedures so things dont explode',
      category: 'DATABASE ENGINEERING',
      problem:
        'managing dispatches, driver tracking, and live inventory without transactional lockups or orphan records.',
      approach:
        'architected a normalized SQL Server relational schema with ACID stored procedures, automated triggers, indexed views, and foreign key constraints.',
      technology: ['SQL Server', 'Stored Procedures', 'Triggers', 'Database Views', 'ACID Transactions'],
      result: 'guaranteed data integrity with automated triggers and zero orphan dispatch records.',
      learned: 'stored procedures offload heavy business rules right to the database engine for maximum speed.',
    },
    {
      id: 'attendance',
      title: 'Attendance Management System',
      subtitle: 'this started as a normal project... it did not remain normal',
      category: 'SYSTEMS & DATA STRUCTURES',
      problem:
        'tracking student records securely with constant O(1) lookups and strict memory constraints.',
      approach:
        'implemented a native C++ console system backed by custom Hash Tables with collision chaining and binary file I/O.',
      technology: ['C++', 'Custom Hash Tables', 'Linked Lists', 'Binary File I/O', 'Pointers'],
      result: 'achieved O(1) average lookup time with minimal memory footprint.',
      learned: 'pointers, collision handling, and manual memory management in native C++.',
    },
  ];

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Top 8 friends data (Comedic, relatable developer companions)
  const topFriends = [
    { name: 'my laptop', role: 'held by tape', icon: '💻', note: 'running 47 tabs' },
    { name: 'google', role: 'answers choices', icon: '🔍', note: 'my actual brain' },
    { name: 'stack overflow', role: 'legal guardian', icon: '📚', note: 'since 2018 <3' },
    { name: 'the terminal', role: 'bestie', icon: '📟', note: 'looks intimidating' },
    { name: 'chai / coffee', role: 'pure fuel', icon: '☕', note: '2am essential' },
    { name: 'tab #47', role: 'dont close me', icon: '📑', note: 'crucial doc' },
    { name: 'pytest', role: 'the truth hurts', icon: '🧪', note: '12 failed, 1 passed' },
    { name: 'tom from myspace', role: 'everyone\'s pal', icon: '👤', note: 'classic <3' },
  ];

  // Certifications
  const certs: CertificationItem[] = [
    {
      title: 'Building Software with Generative AI',
      issuer: 'ICFCS 2026 International Conference',
      badge: 'ICFCS 2026',
      description: 'Hands-on architectural certification on LLM integrations & generative software paradigms.',
    },
    {
      title: 'AWS Foundations Workshop',
      issuer: 'ICFCS 2026 Workshop',
      badge: 'AWS CLOUD',
      description: 'Cloud fundamentals, S3, IAM, serverless computing, and AWS deployment pipelines.',
    },
    {
      title: 'YEF Youth Flagship Program',
      issuer: 'Youth Empowerment Foundation',
      badge: 'LEADERSHIP',
      description: 'Leadership, technical innovation, and collaborative software initiative execution.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-[#c7ccd6] font-sans selection:bg-[#8ea2c9] selection:text-black relative pb-20">
      {/* Dense authentic background matching the stars inspo */}
      <StarryInspoBackground />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {friendToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#162035] text-[#eef1f7] px-4 py-2 border-2 border-[#8ea2c9] shadow-[4px_4px_0px_0px_#000] font-mono text-xs font-bold"
          >
            {friendToast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 pt-16 sm:pt-20">
        
        {/* Top Old-Web Chrome / Navigation Bar */}
        <div className="mb-4 bg-[#0d1424] border-2 border-[#2b3959] text-xs font-mono p-2 shadow-[4px_4px_0px_0px_#000]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2b3959] pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[#8ea2c9] font-bold">MySpace.com</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[#eef1f7] font-bold">Zainab's Space</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[#8ea2c9] text-[10px]">~*~ (¯`·._.·[ zainab ]·._.·´¯) ~*~</span>
            </div>

            {/* Old-Web Persistent Theme Switcher */}
            <div className="flex items-center gap-1.5 bg-[#070b16] px-2 py-1 border border-[#3b4d75]">
              <span className="text-[10px] text-amber-300 font-bold">★ [ SKINS ]:</span>
              <button
                onClick={() => onThemeChange('myspace')}
                className="px-1.5 py-0.5 bg-[#8ea2c9] text-black font-bold hover:underline cursor-pointer"
                title="Current theme: MySpace Profile"
              >
                myspace ♥
              </button>
              <button
                onClick={() => onThemeChange('neural')}
                className="px-1.5 py-0.5 text-zinc-400 hover:text-white hover:underline cursor-pointer"
                title="Switch to Neural Night"
              >
                neural
              </button>
              <button
                onClick={() => onThemeChange('y2k')}
                className="px-1.5 py-0.5 text-zinc-400 hover:text-white hover:underline cursor-pointer"
                title="Switch to Y2K.exe"
              >
                y2k.exe
              </button>
            </div>
          </div>

          {/* Old-web horizontal sub-links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] text-[#8ea2c9]">
            <a href="#about" className="hover:underline hover:text-white">[ Home ]</a>
            <a href="#pastvspresent" className="hover:underline hover:text-amber-300 font-bold">[ Past Me vs Now ]</a>
            <a href="#interests" className="hover:underline hover:text-white">[ Interests ]</a>
            <a href="#skills" className="hover:underline hover:text-white">[ Skills ]</a>
            <a href="#projects" className="hover:underline hover:text-white">[ My Stuff ]</a>
            <a href="#ailab" className="hover:underline hover:text-white">[ AI Lab ]</a>
            <a href="#sqa" className="hover:underline hover:text-white">[ SQA Stuff ]</a>
            <a href="#friends" className="hover:underline hover:text-white">[ Top 8 ]</a>
            <a href="#theories" className="hover:underline hover:text-pink-300">[ Stupid Theories ]</a>
            <a href="#guestbook" className="hover:underline hover:text-white">[ Wall & Comments ]</a>
            <button onClick={onOpenTerminal} className="hover:underline text-emerald-400 cursor-pointer font-bold">[ &gt;_ Terminal ]</button>
          </div>
        </div>

        {/* Header Marquee Banner */}
        <div className="bg-[#121c33] border-2 border-[#2b3959] py-1.5 px-3 mb-6 overflow-hidden text-xs font-mono text-[#8ea2c9] shadow-[3px_3px_0px_0px_#000]">
          <span className="marquee-track font-bold">
            ✦☆✦ welcome 2 my page :P ✦☆✦ idk why ur here but hi lol ✦☆✦ coded this at 2am instead of sleeping ✦☆✦ pls don't judge the layout i spent WAY too long on this ✦☆✦ leave a comment or send a message down below &lt;3 ✦☆✦
          </span>
        </div>

        {/* MAIN PROFILE 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Profile info, ASL, Music Player, Contact, Interests, Top 8, Badges */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Main Profile Card */}
            <div className="bg-[#0e1628] border-2 border-[#2f3e63] p-4 shadow-[4px_4px_0px_0px_#000] space-y-4">
              <div className="border-b-2 border-[#2f3e63] pb-2">
                <h1 className="text-2xl font-bold font-mono text-[#eef1f7] tracking-wide flex items-center justify-between">
                  <span>ZAINAB</span>
                  <span className="text-xs text-[#8ea2c9] font-normal">♥ (online)</span>
                </h1>
                <p className="text-xs font-mono text-[#8ea2c9] italic mt-0.5">
                  "why write 5 lines of code when u can spend 4 hours automating it"
                </p>
              </div>

              {/* Profile Avatar / Photo Area */}
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <div className="relative group shrink-0">
                  <div className="w-36 h-44 bg-[#080d1a] border-2 border-[#8ea2c9] p-1 flex flex-col items-center justify-center text-center shadow-[3px_3px_0px_0px_#000]">
                    {showPhoto ? (
                      <img
                        src="/zainab.jpg"
                        alt="Zainab Faisal"
                        className="w-full h-full object-cover"
                        onError={() => setShowPhoto(false)}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2 text-center space-y-2">
                        <span className="text-3xl">x_x</span>
                        <p className="text-[10px] font-mono font-bold text-[#eef1f7] leading-tight">
                          NO.<br />camera shy sry lol
                        </p>
                        <button
                          onClick={() => setShowPhoto(true)}
                          className="text-[9px] font-mono px-2 py-0.5 bg-[#8ea2c9] text-black font-bold hover:underline cursor-pointer"
                        >
                          [ show pic anyway ]
                        </button>
                      </div>
                    )}
                  </div>
                  {showPhoto && (
                    <button
                      onClick={() => setShowPhoto(false)}
                      className="mt-1 text-[9px] font-mono text-[#8ea2c9] hover:underline block text-center w-full cursor-pointer"
                    >
                      [ hide pic ]
                    </button>
                  )}
                </div>

                {/* ASL & Quick Meta (Comedic, Private, No Sensitive PII) */}
                <div className="space-y-1.5 text-xs font-mono text-[#c7ccd6] flex-1">
                  <p className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    <strong className="text-white">Status:</strong> online probably
                  </p>
                  <p><strong className="text-white">Mental Status:</strong> debatable</p>
                  <p><strong className="text-white">Location:</strong> somewhere with wifi</p>
                  <p><strong className="text-white">Occupation:</strong> computer science & breaking code</p>
                  <p><strong className="text-white">Open Tabs:</strong> 47 (don't ask)</p>
                  
                  {/* Interactive Mood Line */}
                  <div className="pt-1">
                    <button
                      onClick={() => setCurrentMoodIndex((prev) => (prev + 1) % MOOD_OPTIONS.length)}
                      className="text-left w-full p-1 bg-[#141e35] border border-[#2f3e63] hover:border-amber-300 transition-colors cursor-pointer group"
                      title="Click to cycle Zainab's mood!"
                    >
                      <div className="text-[9px] text-[#8ea2c9] flex items-center justify-between">
                        <span>[ MOOD SELECTOR (click 2 change) ]:</span>
                        <RefreshCw className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform text-amber-300" />
                      </div>
                      <span className="text-[11px] text-[#eef1f7] font-bold">
                        {MOOD_OPTIONS[currentMoodIndex].icon} ~*~ {MOOD_OPTIONS[currentMoodIndex].label} ~*~
                      </span>
                    </button>
                  </div>

                  <p className="text-[10px] text-[#8ea2c9] pt-1">
                    <strong>last login:</strong> 2day (never logged out)
                  </p>
                </div>
              </div>

              {/* Extended Network Notice */}
              <div className="bg-[#141f38] border border-[#3b4d75] p-2 text-center text-xs font-mono text-[#eef1f7]">
                ★ <strong>Zainab</strong> is in your extended network (probably because you both stay up late debugging) ★
              </div>

              {/* Classic 8-Button Contact Table */}
              <div className="border border-[#2f3e63] bg-[#090f1d] p-2 space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8ea2c9] border-b border-[#2f3e63] pb-1">
                  Contacting Zainab
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                  <button
                    onClick={onOpenEmailModal}
                    className="p-1.5 bg-[#141e33] hover:bg-[#1f2e4d] border border-[#2f3e63] text-[#8ea2c9] hover:text-white flex items-center gap-1.5 font-bold cursor-pointer text-left"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" /> Send Message
                  </button>
                  <button
                    onClick={handleAddFriend}
                    className="p-1.5 bg-[#141e33] hover:bg-[#1f2e4d] border border-[#2f3e63] text-[#8ea2c9] hover:text-white flex items-center gap-1.5 font-bold cursor-pointer text-left"
                  >
                    <UserPlus className="w-3.5 h-3.5 shrink-0" /> Add to Friends
                  </button>
                  <button
                    onClick={handleForward}
                    className="p-1.5 bg-[#141e33] hover:bg-[#1f2e4d] border border-[#2f3e63] text-[#8ea2c9] hover:text-white flex items-center gap-1.5 font-bold cursor-pointer text-left"
                  >
                    <Share2 className="w-3.5 h-3.5 shrink-0" /> Forward Friend
                  </button>
                  <button
                    onClick={handleAddFavorite}
                    className="p-1.5 bg-[#141e33] hover:bg-[#1f2e4d] border border-[#2f3e63] text-[#8ea2c9] hover:text-white flex items-center gap-1.5 font-bold cursor-pointer text-left"
                  >
                    <Bookmark className="w-3.5 h-3.5 shrink-0" /> Add Favorites
                  </button>
                  <a
                    href="#guestbook"
                    className="p-1.5 bg-[#141e33] hover:bg-[#1f2e4d] border border-[#2f3e63] text-[#8ea2c9] hover:text-white flex items-center gap-1.5 font-bold"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" /> Leave Comment
                  </a>
                  <button
                    onClick={() => triggerToast("★ added 2 'zainab\'s 2am debugging club' lol")}
                    className="p-1.5 bg-[#141e33] hover:bg-[#1f2e4d] border border-[#2f3e63] text-[#8ea2c9] hover:text-white flex items-center gap-1.5 font-bold cursor-pointer text-left"
                  >
                    <Users className="w-3.5 h-3.5 shrink-0" /> Add to Group
                  </button>
                  <button
                    onClick={() => triggerToast("★ why would u block me :( sry lol")}
                    className="p-1.5 bg-[#141e33] hover:bg-[#1f2e4d] border border-[#2f3e63] text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-bold cursor-pointer text-left col-span-2 text-center justify-center"
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0" /> Block User (pls don't)
                  </button>
                </div>
              </div>

              {/* MySpace URL */}
              <div className="text-[11px] font-mono bg-[#090f1d] border border-[#2f3e63] p-2 text-center text-[#c7ccd6]">
                <strong className="text-white">MySpace URL:</strong><br />
                <span className="text-[#8ea2c9] select-all">http://myspace.com/zainab_faisal</span>
              </div>
            </div>

            {/* 2. Retro Music Player Widget */}
            <div className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-3 py-1.5 font-mono font-bold text-xs text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-amber-300" />
                  <span>Zainab's Music Player (v2.0)</span>
                </div>
                <span className="text-[9px] text-emerald-400 font-mono">[ 128 kbps mp3 ]</span>
              </div>
              <div className="p-3 bg-[#080d1a] space-y-2.5 font-mono">
                <div className="p-2 bg-[#050812] border border-[#253352] flex items-center justify-between">
                  <div className="truncate mr-2">
                    <span className="text-[10px] text-zinc-500 block">NOW PLAYING:</span>
                    <span className="text-xs text-[#8ea2c9] font-bold truncate block">
                      Track 01 - something i'll listen to 400 times (official loop)
                    </span>
                  </div>
                  {/* Retro Equalizer Bars */}
                  <div className="flex items-end gap-0.5 h-4 shrink-0">
                    <span className="w-1 bg-[#8ea2c9] animate-bounce" style={{ height: '60%', animationDelay: '0.1s' }} />
                    <span className="w-1 bg-amber-300 animate-bounce" style={{ height: '100%', animationDelay: '0.3s' }} />
                    <span className="w-1 bg-cyan-400 animate-bounce" style={{ height: '40%', animationDelay: '0.2s' }} />
                    <span className="w-1 bg-pink-400 animate-bounce" style={{ height: '80%', animationDelay: '0.4s' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#c7ccd6] px-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                      className="px-2 py-0.5 bg-[#182542] border border-[#2f3e63] text-[#eef1f7] hover:bg-[#22355e] cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                    >
                      {isPlayingMusic ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      {isPlayingMusic ? 'PAUSE' : 'PLAY'}
                    </button>
                    <span className="text-[10px] text-zinc-400">02:47 / ∞</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                    <Volume2 className="w-3 h-3" />
                    <span>VOL: [||||||||--]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Interests & Faves Box */}
            <div id="interests" className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-3 py-1.5 font-mono font-bold text-xs text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <span>Zainab's Interests</span>
                <span className="text-[10px] text-[#8ea2c9]">~*~ faves ~*~</span>
              </div>
              <div className="p-4 space-y-3 text-xs font-mono">
                <div className="border-b border-[#212c47] pb-2">
                  <strong className="text-[#8ea2c9] block mb-0.5">General</strong>
                  <p className="text-[#c7ccd6] leading-relaxed">
                    computers, AI systems, staying up way 2 late, low-level CPU stuff, networks, finding bugs where there definitely shouldn't be bugs lol
                  </p>
                </div>
                <div className="border-b border-[#212c47] pb-2">
                  <strong className="text-[#8ea2c9] block mb-0.5">Music</strong>
                  <p className="text-[#c7ccd6] leading-relaxed">
                    the same 3 songs on repeat, indie rock, lo-fi, synthwave, anything that plays while i stare at code for 4 hours
                  </p>
                </div>
                <div className="border-b border-[#212c47] pb-2">
                  <strong className="text-[#8ea2c9] block mb-0.5">Movies / Shows</strong>
                  <p className="text-[#c7ccd6] leading-relaxed">
                    mr robot, the matrix, sci-fi movies where the terminal screens actually make sense lol
                  </p>
                </div>
                <div>
                  <strong className="text-[#8ea2c9] block mb-0.5">Heroes</strong>
                  <p className="text-[#c7ccd6] leading-relaxed">
                    ada lovelace, grace hopper, whoever invented ctrl+z, that one person on stackoverflow who answered my exact error in 2011 &lt;3
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Top 8 Friends Box */}
            <div id="friends" className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-3 py-1.5 font-mono font-bold text-xs text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <span>Zainab's Friend Space (Top 8)</span>
                <span className="text-[10px] text-[#8ea2c9]">[ 8 ]</span>
              </div>
              <div className="p-3">
                <p className="text-[11px] font-mono text-[#c7ccd6] mb-3 text-center">
                  Zainab has <strong className="text-[#8ea2c9]">8</strong> friends. (the only ones that matter lol)
                </p>
                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  {topFriends.map((f) => (
                    <div key={f.name} className="p-1 bg-[#090f1d] border border-[#253352] hover:border-[#8ea2c9] transition-colors">
                      <span className="text-xl block mb-0.5">{f.icon}</span>
                      <strong className="text-[10px] text-[#eef1f7] block truncate">{f.name}</strong>
                      <span className="text-[8px] text-[#8ea2c9] block truncate">{f.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Comedic Observational Theories Box */}
            <div id="theories" className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-3 py-1.5 font-mono font-bold text-xs text-pink-300 border-b border-[#2f3e63] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                  <span>Stupid Theories I'm Convinced Of</span>
                </div>
                <span className="text-[9px] text-zinc-400">100% peer reviewed</span>
              </div>
              <div className="p-3.5 space-y-2.5 font-mono text-xs">
                <div className="p-2 bg-[#090f1d] border border-[#253352] space-y-1">
                  <strong className="text-amber-300 block text-[11px]">1. The Stare Method:</strong>
                  <p className="text-[#c7ccd6] text-[11px]">
                    If you stare at the compiler error for 3 minutes without touching the keyboard, it gets nervous and fixes itself.
                  </p>
                </div>
                <div className="p-2 bg-[#090f1d] border border-[#253352] space-y-1">
                  <strong className="text-cyan-300 block text-[11px]">2. Observer Effect:</strong>
                  <p className="text-[#c7ccd6] text-[11px]">
                    Code runs 40% faster when nobody is watching you demo it. The second someone stands behind you, it crashes immediately.
                  </p>
                </div>
                <div className="p-2 bg-[#090f1d] border border-[#253352] space-y-1">
                  <strong className="text-emerald-300 block text-[11px]">3. The 2AM Rule:</strong>
                  <p className="text-[#c7ccd6] text-[11px]">
                    Any solution thought of between 1:00 AM and 4:00 AM will look like ancient alien hieroglyphics by 9:00 AM.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Retro Badges & Fictional Stalker Counter */}
            <div className="bg-[#0e1628] border-2 border-[#2f3e63] p-3 shadow-[4px_4px_0px_0px_#000] text-center space-y-3 font-mono">
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[9px] font-bold">
                <span className="px-2 py-0.5 bg-black border border-[#8ea2c9] text-[#8ea2c9]">☕ 100% CHAI POWERED</span>
                <span className="px-2 py-0.5 bg-black border border-emerald-400 text-emerald-400">✓ PYTHON & C++ VALID</span>
                <span className="px-2 py-0.5 bg-black border border-pink-400 text-pink-300">★ 800x600 RECOMMENDED</span>
                <span className="px-2 py-0.5 bg-black border border-amber-400 text-amber-300">🚧 UNDER CONSTRUCTION ALWAYS 🚧</span>
              </div>

              <div className="pt-2 border-t border-[#212c47] space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[10px] text-[#c7ccd6]">ppl who stalked my page:</span>
                  <span className="hit-counter-digit px-2 py-0.5 bg-black text-[#8ea2c9] border border-[#3b4d75] font-bold text-xs tracking-widest">
                    0 1 2 8 4 3
                  </span>
                </div>
                <p className="text-[9px] text-zinc-500 italic">
                  (94% of which were me hitting refresh to test my CSS alignment lol)
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: About me, Past vs Present, Skills, Projects, AI Lab, Rabbit Hole, Timeline, Guestbook */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-6">

            {/* 1. "about me" Section (Comedic, Self-Aware, Sincere Passion) */}
            <div id="about" className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-4 py-2 font-mono font-bold text-sm text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <span>xX_about me_Xx</span>
                <span className="text-xs text-[#8ea2c9]">~*~ read this ig ~*~</span>
              </div>
              <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-[#eef1f7]">
                <p className="font-mono font-bold text-[#8ea2c9] text-sm sm:text-base">
                  heyyy!! welcome 2 my page :P idk why ur here but hi lol
                </p>

                <p>
                  i'm zainab. i spend way too much time figuring out why things work when i could probably just leave them alone.
                </p>

                <p>
                  currently studying computer science + making things that occasionally work on the first try (extremely rare lol).
                </p>

                <p>
                  i got into computers because i wanted to understand what's actually happening beneath all the abstraction—like literally from CPU instructions and memory registers all the way up to neural networks, autonomous agents, and AI systems. why choose just one layer when you can explore the whole stack?
                </p>

                {/* Things I Like vs Things I Don't Like (Observational Comedic Contrast) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                  <div className="bg-[#090f1d] border border-[#253352] p-3 space-y-1">
                    <strong className="text-emerald-400 block font-bold mb-1">things i like:</strong>
                    <p className="text-[#c7ccd6]">› computers & low-level rabbit holes</p>
                    <p className="text-[#c7ccd6]">› building stuff from scratch</p>
                    <p className="text-[#c7ccd6]">› finding bugs that make no sense at 2am</p>
                    <p className="text-[#c7ccd6]">› clean commits & fast code</p>
                    <p className="text-[#c7ccd6]">› when something actually compiles</p>
                  </div>

                  <div className="bg-[#090f1d] border border-[#253352] p-3 space-y-1">
                    <strong className="text-rose-400 block font-bold mb-1">things i don't like:</strong>
                    <p className="text-[#c7ccd6]">› code that works and nobody knows why</p>
                    <p className="text-[#c7ccd6]">› people who say "it should be easy"</p>
                    <p className="text-[#c7ccd6]">› 8am anything</p>
                    <p className="text-[#c7ccd6]">› merge conflicts</p>
                    <p className="text-[#c7ccd6]">› when it works on my machine only</p>
                  </div>
                </div>

                <div className="pt-2 font-mono text-xs text-[#8ea2c9] border-t border-[#212c47]">
                  <strong>who i'd like 2 meet:</strong> anyone who likes building weird technical projects, talking about AI systems without buzzwords, or debating whether C++ or Python is more fun &lt;3
                </div>
              </div>
            </div>

            {/* 2. "PAST ME vs CURRENT ME" (Younger Zainab as a Recurring Comedic Character) */}
            <div id="pastvspresent" className="bg-[#0e1628] border-2 border-amber-300/80 shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#1a253e] px-4 py-2 font-mono font-bold text-sm text-amber-300 border-b border-amber-300/40 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>PAST ME vs CURRENT ME (a tragedy in 4 acts)</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">[ character study ]</span>
              </div>
              <div className="p-4 sm:p-5 space-y-4 font-mono text-xs">
                <p className="text-zinc-300 text-xs">
                  every developer is actually two different people: past self (overconfident, writes chaotic code) and current self (staring in horror at what past self did).
                </p>

                {/* Scenario Tabs */}
                <div className="flex flex-wrap gap-1.5 border-b border-[#212c47] pb-2.5">
                  {DIALOGUES.map((d, idx) => (
                    <button
                      key={d.title}
                      onClick={() => setActiveDialogueIndex(idx)}
                      className={`px-2.5 py-1 text-[11px] font-bold cursor-pointer transition-colors ${
                        activeDialogueIndex === idx
                          ? 'bg-amber-300 text-black shadow-[2px_2px_0px_0px_#000]'
                          : 'bg-[#090f1d] text-[#8ea2c9] border border-[#2f3e63] hover:bg-[#141e35]'
                      }`}
                    >
                      {d.title}
                    </button>
                  ))}
                </div>

                {/* Active Dialogue Comparison Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Past Me Card */}
                  <div className="p-3.5 bg-[#090f1d] border-2 border-[#8ea2c9]/60 space-y-2 relative">
                    <span className="px-2 py-0.5 bg-[#8ea2c9] text-black font-bold text-[9px] uppercase">
                      {DIALOGUES[activeDialogueIndex].past.speaker}
                    </span>
                    <p className="text-[#eef1f7] text-xs font-sans leading-relaxed">
                      "{DIALOGUES[activeDialogueIndex].past.text}"
                    </p>
                    <div className="text-[10px] text-[#8ea2c9] italic border-t border-[#212c47] pt-1.5">
                      {DIALOGUES[activeDialogueIndex].past.reaction}
                    </div>
                  </div>

                  {/* Current Me Card */}
                  <div className="p-3.5 bg-[#121a2f] border-2 border-amber-300/70 space-y-2 relative">
                    <span className="px-2 py-0.5 bg-amber-300 text-black font-bold text-[9px] uppercase">
                      {DIALOGUES[activeDialogueIndex].current.speaker}
                    </span>
                    <p className="text-[#eef1f7] text-xs font-sans leading-relaxed">
                      "{DIALOGUES[activeDialogueIndex].current.text}"
                    </p>
                    <div className="text-[10px] text-amber-300 italic border-t border-[#212c47] pt-1.5">
                      {DIALOGUES[activeDialogueIndex].current.reaction}
                    </div>
                  </div>
                </div>

                {/* Interactive Clickable Sticky Notes */}
                <div className="pt-2 border-t border-[#212c47] space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span className="font-bold text-[#8ea2c9]">★ SCRAPBOOK STICKY NOTES (click 2 peel):</span>
                    <span>3 notes</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {stickyNotes.map((note) => (
                      <button
                        key={note.id}
                        onClick={() => toggleStickyPeel(note.id)}
                        className={`p-2.5 border text-left cursor-pointer transition-all ${note.color} ${
                          note.peeled ? 'opacity-50 line-through' : 'hover:scale-[1.02] shadow-[2px_2px_0px_0px_#000]'
                        }`}
                      >
                        <strong className="block text-[10px] font-bold mb-1">{note.title}</strong>
                        <p className="text-[10px] leading-tight font-sans">{note.text}</p>
                        <span className="text-[8px] opacity-70 block mt-1">
                          {note.peeled ? '[ peeled off ]' : '[ click to peel ]'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. "things i know kinda well / computer stuff" (Skills & Stack + SQA) */}
            <div id="skills" className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-4 py-2 font-mono font-bold text-sm text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <span>things i know kinda well</span>
                <span className="text-xs text-[#8ea2c9]">~*~ skills n stuff ~*~</span>
              </div>
              <div className="p-5 space-y-4 font-mono text-xs">
                
                {/* SQA Special Highlight Card */}
                <div id="sqa" className="p-4 bg-[#141e35] border-2 border-[#8ea2c9] shadow-[3px_3px_0px_0px_#000] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[#8ea2c9] text-black font-bold text-[10px] uppercase">
                      ★ CURRENTLY DOING SQA STUFF TOO ★
                    </span>
                    <span className="text-[10px] text-[#8ea2c9]">Software Quality Assurance</span>
                  </div>
                  <p className="font-sans text-xs text-[#eef1f7] leading-relaxed">
                    not just coding—im also deeply into breaking things properly and making sure software actually survives production lol.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      'Exploratory Testing',
                      'SRS / Requirements Analysis',
                      'Test Scenarios & Test Cases',
                      'RTM / Traceability Matrix',
                      'Defect Identification & Reporting',
                      'Jira',
                      'Functional Testing',
                      'Positive & Negative Test Execution',
                      'STLC (Software Testing Life Cycle)',
                    ].map((sqa) => (
                      <span key={sqa} className="px-2 py-0.5 bg-[#090f1d] border border-[#3b4d75] text-[#8ea2c9] text-[10px] font-bold">
                        ⚡ {sqa}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Layers Stack */}
                <div className="space-y-3 pt-1">
                  <div className="bg-[#090f1d] border border-[#253352] p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[#8ea2c9] font-bold">
                      <span>LAYER 1: Systems & Low-Level</span>
                      <span className="text-[10px] text-zinc-500">how hardware executes</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Assembly', 'Computer Architecture', 'Operating Systems', 'Memory Registers & Stack'].map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-[#141f36] text-[#c7ccd6] text-[11px] border border-[#2f3e63]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#090f1d] border border-[#253352] p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span>LAYER 2: Software Engineering & Core Code</span>
                      <span className="text-[10px] text-zinc-500">data structures & systems</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['C++', 'Python', 'SQL & Stored Procedures', 'Data Structures & Algorithms', 'OOP Architecture'].map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-[#141f36] text-[#c7ccd6] text-[11px] border border-[#2f3e63]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#090f1d] border border-[#253352] p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-cyan-400 font-bold">
                      <span>LAYER 3: AI & LLM Architectures</span>
                      <span className="text-[10px] text-zinc-500">my current obsession</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['LLMs', 'RAG Architectures', 'Prompt Engineering', 'ResNet50 CNN', 'Scikit-learn', 'Temperature Controls', 'Token Optimization'].map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-[#141f36] text-[#c7ccd6] text-[11px] border border-[#2f3e63]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#090f1d] border border-[#253352] p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-purple-400 font-bold">
                      <span>LAYER 4: Networks & Security Curiosity</span>
                      <span className="text-[10px] text-zinc-500">watching packets fly</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Packet Sniffing', 'Scapy', 'TCP/IP & UDP', 'DNS Protocol Analysis', 'Raw Socket Inspection', 'Defensive Fundamentals'].map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-[#141f36] text-[#c7ccd6] text-[11px] border border-[#2f3e63]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. "my stuff / look what i built lol" (Projects with Personality + Deep Rigor) */}
            <div id="projects" className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-4 py-2 font-mono font-bold text-sm text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <span>my stuff (things i've made)</span>
                <span className="text-xs text-[#8ea2c9]">~*~ click around ig ~*~</span>
              </div>
              <div className="p-5 space-y-4">
                
                {/* Project Selector Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#212c47] font-mono text-xs">
                  {projects.map((p) => {
                    const isSelected = p.id === selectedProjectId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProjectId(p.id)}
                        className={`px-3 py-1.5 shrink-0 border transition-all cursor-pointer font-bold ${
                          isSelected
                            ? 'bg-[#8ea2c9] text-black border-white shadow-[2px_2px_0px_0px_#000]'
                            : 'bg-[#090f1d] text-[#c7ccd6] border-[#253352] hover:border-[#8ea2c9]'
                        }`}
                      >
                        {p.title}
                      </button>
                    );
                  })}
                </div>

                {/* Active Project Case Box */}
                <div className="bg-[#090f1d] border border-[#253352] p-5 space-y-4 font-mono">
                  <div className="border-b border-[#212c47] pb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 bg-[#141f36] text-[#8ea2c9] border border-[#3b4d75] font-bold uppercase">
                        {activeProject.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#eef1f7] mt-1.5">{activeProject.title}</h3>
                      <p className="text-xs text-[#8ea2c9] italic">"{activeProject.subtitle}"</p>
                    </div>

                    {activeProject.stats && (
                      <div className="flex items-center gap-2">
                        {activeProject.stats.map((s) => (
                          <div key={s.label} className="px-2.5 py-1 bg-[#141f36] border border-[#2f3e63] text-center">
                            <span className="text-[9px] text-zinc-400 block">{s.label}</span>
                            <span className="text-xs font-bold text-[#8ea2c9]">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* TriCore AI Interactive 3-Engine Switcher if TriCore selected */}
                  {activeProject.id === 'tricore' && (
                    <div className="p-3 bg-[#11192e] border border-[#2f3e63] space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#8ea2c9]">
                        <span>★ TRICORE MULTI-ENGINE ARCHITECTURE</span>
                        <span className="text-[10px] text-zinc-400">3 engines &gt; 1 model</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => setActiveEngine('spark')}
                          className={`p-2 text-left border cursor-pointer ${
                            activeEngine === 'spark' ? 'bg-[#8ea2c9] text-black border-white font-bold' : 'bg-[#090f1d] text-[#c7ccd6] border-[#253352]'
                          }`}
                        >
                          <span className="block text-[11px] font-bold">⚡ Spark</span>
                          <span className="text-[9px] opacity-80 block truncate">Fast Ideation</span>
                        </button>
                        <button
                          onClick={() => setActiveEngine('lens')}
                          className={`p-2 text-left border cursor-pointer ${
                            activeEngine === 'lens' ? 'bg-[#8ea2c9] text-black border-white font-bold' : 'bg-[#090f1d] text-[#c7ccd6] border-[#253352]'
                          }`}
                        >
                          <span className="block text-[11px] font-bold">🔍 Lens</span>
                          <span className="text-[9px] opacity-80 block truncate">Vector RAG</span>
                        </button>
                        <button
                          onClick={() => setActiveEngine('core')}
                          className={`p-2 text-left border cursor-pointer ${
                            activeEngine === 'core' ? 'bg-[#8ea2c9] text-black border-white font-bold' : 'bg-[#090f1d] text-[#c7ccd6] border-[#253352]'
                          }`}
                        >
                          <span className="block text-[11px] font-bold">🧠 Core</span>
                          <span className="text-[9px] opacity-80 block truncate">Deep Research</span>
                        </button>
                      </div>
                      <p className="text-xs font-sans text-[#eef1f7] bg-[#090f1d] p-2.5 border border-[#253352]">
                        {activeEngine === 'spark' && "⚡ Spark Engine: configured for low latency, creative brainstorming, and rapid conversational flow without heavy vector retrieval overhead."}
                        {activeEngine === 'lens' && "🔍 Lens Engine: strict Retrieval-Augmented Generation (RAG) bounded strictly to uploaded documents to prevent hallucinations."}
                        {activeEngine === 'core' && "🧠 Core Engine: deep multi-step reasoning with web citations and transparent thought traces for complex technical queries."}
                      </p>
                    </div>
                  )}

                  {/* Problem & Approach */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <strong className="font-mono text-rose-400 block font-bold">why i made this:</strong>
                      <p className="text-[#c7ccd6] leading-relaxed">{activeProject.problem}</p>
                    </div>
                    <div className="space-y-1">
                      <strong className="font-mono text-cyan-400 block font-bold">how i did it:</strong>
                      <p className="text-[#c7ccd6] leading-relaxed">{activeProject.approach}</p>
                    </div>
                  </div>

                  {/* Result & Learned */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans pt-2 border-t border-[#212c47]">
                    <div className="space-y-1">
                      <strong className="font-mono text-emerald-400 block font-bold">did it work?:</strong>
                      <p className="text-[#c7ccd6] leading-relaxed">{activeProject.result}</p>
                    </div>
                    <div className="space-y-1">
                      <strong className="font-mono text-purple-400 block font-bold">random takeaway:</strong>
                      <p className="text-[#c7ccd6] leading-relaxed">{activeProject.learned}</p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 border-t border-[#212c47] flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="text-zinc-500 mr-1">TECH:</span>
                    {activeProject.technology.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#141f36] border border-[#2f3e63] text-[#8ea2c9]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. "how i think about AI" (AI Lab & Parameter Sandbox) */}
            <div id="ailab" className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-4 py-2 font-mono font-bold text-sm text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <span>how i think about AI</span>
                <span className="text-xs text-[#8ea2c9]">~*~ not just prompt magic ~*~</span>
              </div>
              <div className="p-5 space-y-4 font-mono text-xs">
                <p className="font-sans text-xs sm:text-sm text-[#eef1f7] leading-relaxed">
                  "u cant just slap an API call on a prompt and call it an intelligent system lol... true AI engineering is about putting deterministic control guardrails around stochastic models."
                </p>

                {/* Interactive Parameter Sandbox */}
                <div className="bg-[#090f1d] border border-[#253352] p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#212c47] pb-2 text-[#8ea2c9] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" /> PARAMETER CONTROLLER SIMULATOR
                    </span>
                    <span className="text-[10px] text-emerald-400">READY</span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>Temperature: <strong className="text-[#8ea2c9]">{temperature}</strong></span>
                        <span className="text-zinc-400">
                          {temperature < 0.3 ? 'Deterministic / Strict' : temperature < 0.7 ? 'Balanced' : 'Creative / 2am energy'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="1.0"
                        step="0.05"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full accent-[#8ea2c9] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>RAG Vector Context Chunks: <strong className="text-[#8ea2c9]">{ragContextLimit}</strong></span>
                        <span className="text-zinc-400">{ragContextLimit * 512} tokens</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={ragContextLimit}
                        onChange={(e) => setRagContextLimit(parseInt(e.target.value))}
                        className="w-full accent-[#8ea2c9] cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-2 bg-[#141f36] border border-[#2f3e63]">
                      <span className="text-[11px]">Strict Grounding Guardrail:</span>
                      <button
                        onClick={() => setStrictGroundedness(!strictGroundedness)}
                        className={`px-2 py-0.5 text-[10px] font-bold cursor-pointer ${
                          strictGroundedness ? 'bg-emerald-500 text-black' : 'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {strictGroundedness ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>

                    <div className="p-2.5 bg-[#0e1628] border border-[#212c47] text-[11px] space-y-1">
                      <span className="text-[#8ea2c9] block font-bold">Estimated System Profile:</span>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Hallucination Risk: {strictGroundedness ? '&lt; 0.1%' : '~ 12.4%'}</span>
                      </div>
                      <div className="text-zinc-400">
                        Response Latency: ~{(120 + ragContextLimit * 25).toFixed(0)} ms
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. "things i'm falling down a rabbit hole about" (Panaversity & Certifications) */}
            <div className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-4 py-2 font-mono font-bold text-sm text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <span>things i'm falling down a rabbit hole about</span>
                <span className="text-xs text-[#8ea2c9]">~*~ exploring rn ~*~</span>
              </div>
              <div className="p-5 space-y-4 font-mono text-xs">
                
                {/* Panaversity Highlight */}
                <div className="p-3.5 bg-[#141f36] border border-[#3b4d75] space-y-1.5">
                  <span className="px-2 py-0.5 bg-[#8ea2c9] text-black font-bold text-[9px] uppercase">
                    CURRENTLY PARTICIPATING
                  </span>
                  <h4 className="text-sm font-bold text-[#eef1f7]">
                    Panaversity Agentic AI Architect Program
                  </h4>
                  <p className="font-sans text-xs text-[#c7ccd6]">
                    basically learning how to make multi-agent systems that coordinate, call tools, and plan steps on their own. it gets intense but i love it lol.
                  </p>
                </div>

                {/* Certifications & Honors */}
                <div className="space-y-2 pt-1">
                  <span className="text-[#8ea2c9] font-bold block">★ Certifications & Honors:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {certs.map((c) => (
                      <div key={c.title} className="p-2.5 bg-[#090f1d] border border-[#253352] space-y-1">
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#141f36] text-[#8ea2c9] font-bold border border-[#2f3e63] inline-block">
                          {c.badge}
                        </span>
                        <strong className="text-xs text-[#eef1f7] block">{c.title}</strong>
                        <span className="text-[10px] text-zinc-400 block">{c.issuer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 7. "my timeline / how i got here" */}
            <div className="bg-[#0e1628] border-2 border-[#2f3e63] shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-[#182542] px-4 py-2 font-mono font-bold text-sm text-[#eef1f7] border-b border-[#2f3e63] flex items-center justify-between">
                <span>my timeline / how i got here</span>
                <span className="text-xs text-[#8ea2c9]">~*~ history ~*~</span>
              </div>
              <div className="p-5 space-y-3 font-mono text-xs">
                <div className="border-l-2 border-[#8ea2c9]/40 pl-3 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#8ea2c9]">early days: computer science foundations</span>
                    <p className="text-[#c7ccd6] text-[11px] font-sans">
                      fell in love with C++, data structures, assembly, and finding out what hardware is actually doing under the hood.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#8ea2c9]">deepening craft: machine learning & networks</span>
                    <p className="text-[#c7ccd6] text-[11px] font-sans">
                      built ResNet50 deepfake detector, raw packet sniffer in Scapy, and SQL Server delivery database with stored procedures.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#8ea2c9]">present: generative AI & TriCore AI systems</span>
                    <p className="text-[#c7ccd6] text-[11px] font-sans">
                      architected TriCore AI multi-engine system, mastered RAG and prompt engineering, joined Panaversity Agentic AI program.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-300">future: agentic coordination & software testing</span>
                    <p className="text-[#c7ccd6] text-[11px] font-sans">
                      autonomous agent workflows, rigorous software testing automation, and building systems that actually survive real-world chaos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Status Updates & Guestbook */}
            <div id="guestbook">
              <GuestbookSection />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t-2 border-[#2b3959] text-center font-mono text-xs text-[#8ea2c9] space-y-2">
          <p className="flex items-center justify-center gap-2">
            <span>© 2026 Zainab Faisal</span>
            <span>•</span>
            <span>Computer Science & Systems</span>
            <span>•</span>
            <button onClick={onOpenTerminal} className="text-emerald-400 hover:underline cursor-pointer">
              [ poke terminal ]
            </button>
          </p>
          <p className="text-[10px] text-zinc-500">
            pls dont judge the layout lol... coded with react, css starlight, and caffeine at 2am &lt;3
          </p>
        </div>
      </div>
    </div>
  );
};
