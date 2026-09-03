import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Sparkles,
  ExternalLink,
  Github,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Database,
  Terminal,
  Activity,
  ArrowRight
} from 'lucide-react';
import { ThemeMode, ProjectCaseStudy } from '../types';

interface ProjectsSectionProps {
  activeTheme: ThemeMode;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ activeTheme }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('tricore');

  const projects: ProjectCaseStudy[] = [
    {
      id: 'tricore',
      title: 'TRICORE AI',
      subtitle: 'Designing intelligence through control.',
      category: 'AI / LLM ARCHITECTURE',
      problem:
        'Standard one-size-fits-all AI interfaces fail at distinct tasks: generic models hallucinate on documents, lack deep research grounding, or run too slowly for rapid brainstorming.',
      approach:
        'Designed a specialized multi-engine LLM system separating creative ideation, document grounding, and deep research into three specialized processing engines.',
      technology: [
        'Prompt Engineering',
        'System Design',
        'RAG Architecture',
        'Temperature Control',
        'Token Optimization',
        'AI Evaluation',
        'Multi-theme UI',
      ],
      result:
        'Achieved zero-hallucination document Q&A on Lens engine, 3x faster response times on Spark, and citation-backed research traces on Core engine.',
      learned:
        'System constraints, prompt boundaries, and evaluation metrics matter far more than just switching raw foundation models.',
      quote: 'The model is not the product. The system around it is.',
      architecture: [
        {
          engine: 'Spark Engine',
          description: 'Fast creative assistant for rapid ideation & brainstorming.',
        },
        {
          engine: 'Lens Engine',
          description: 'RAG document assistant answering strictly from uploaded vector documents.',
        },
        {
          engine: 'Core Engine',
          description: 'Deep research engine with grounded web citations & multi-step reasoning.',
        },
      ],
    },
    {
      id: 'deepfake',
      title: 'Deepfake Detection System',
      subtitle: 'Exposing synthetic media using transfer learning.',
      category: 'COMPUTER VISION / ML',
      problem:
        'Generative AI models create highly convincing deepfake faces that bypass human scrutiny and traditional security filters.',
      approach:
        'Trained a convolutional neural network (CNN) leveraging ResNet50 transfer learning on benchmark facial manipulation datasets to detect subtle spatial artifacts.',
      technology: ['Python', 'CNN', 'ResNet50', 'Transfer Learning', 'OpenCV', 'PyTorch'],
      result: 'Achieved 84.76% classification accuracy and 0.927 Area Under Curve (AUC) on test datasets.',
      learned:
        'How fine-tuning specific upper layers of pre-trained vision models preserves feature extraction while adapting to subtle deepfake compression noise.',
      stats: [
        { label: 'Accuracy', value: '84.76%' },
        { label: 'AUC Score', value: '0.927' },
      ],
    },
    {
      id: 'packetsniffer',
      title: 'Packet Sniffer',
      subtitle: 'Watching the invisible conversations inside a network.',
      category: 'NETWORKS & SECURITY',
      problem:
        'Network telemetry is abstract and hidden from standard OS tools without low-level packet inspection.',
      approach:
        'Built a real-time command-line network traffic analyzer using Python and Scapy to intercept raw sockets and parse layer-3 and layer-4 protocol headers.',
      technology: ['Python', 'Scapy', 'TCP/IP', 'UDP', 'DNS Extraction', 'IP Analysis'],
      result: 'Capable of capturing, parsing, and filtering TCP, UDP, DNS, and ICMP frames live with minimal latency.',
      learned:
        'How network byte order (big-endian), IP header fields, and socket filters interact directly at the kernel boundary.',
      stats: [
        { label: 'Protocols', value: 'TCP / UDP / DNS' },
        { label: 'Mode', value: 'Real-Time Sniff' },
      ],
    },
    {
      id: 'classifier',
      title: 'Movie vs TV Show Classifier',
      subtitle: 'Predicting content type from metadata features.',
      category: 'MACHINE LEARNING',
      problem:
        'Automating content categorization across streaming platforms using unstructured text titles, descriptions, and cast lists.',
      approach:
        'Engineered NLP TF-IDF features from Netflix dataset, comparing Random Forest, Support Vector Machines (SVM), and Logistic Regression classifiers.',
      technology: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Random Forest', 'SVM', 'Logistic Regression'],
      result: 'Achieved 85% predictive accuracy with Random Forest ensemble classifier.',
      learned: 'Feature selection and data cleaning account for over 80% of real-world model precision gains.',
      stats: [{ label: 'Accuracy', value: '85.00%' }],
    },
    {
      id: 'deliverydb',
      title: 'Local Delivery Database System',
      subtitle: 'Relational data integrity & transactional procedures.',
      category: 'DATABASE ENGINEERING',
      problem:
        'Managing order dispatches, driver tracking, and inventory without transactional lockups or invalid states.',
      approach:
        'Architected a normalized SQL Server relational schema with stored procedures, automated triggers, views, and index optimizations.',
      technology: ['SQL Server', 'Stored Procedures', 'Triggers', 'Database Views', 'Indexes'],
      result: 'Streamlined order processing with atomic transactions and zero orphan records.',
      learned: 'How stored procedures offload heavy business rules directly to the database engine for maximum speed.',
    },
    {
      id: 'attendance',
      title: 'Attendance Management System',
      subtitle: 'High-performance memory structures in C++.',
      category: 'SYSTEMS & DATA STRUCTURES',
      problem:
        'Tracking student attendance logs securely with constant O(1) lookups and memory constraints.',
      approach:
        'Implemented a C++ console system backed by custom Hash Tables, Linked Lists, and encrypted credential authentication.',
      technology: ['C++', 'Linked Lists', 'Hash Tables', 'Authentication', 'File I/O'],
      result: 'O(1) average time complexity for student records lookup with persistent binary storage.',
      learned: 'Pointers, collision handling in hash tables, and precise memory allocation in native C++.',
    },
  ];

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <section id="projects" className="py-20 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${activeTheme === 'y2k' ? 'text-cyan-800' : 'text-cyan-400'}`}>
            <Code2 className="w-4 h-4" />
            <span>{activeTheme === 'myspace' ? 'things i made' : 'DEEP CASE STUDIES'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              activeTheme === 'y2k'
                ? 'drop-shadow-[2px_2px_0px_#3b82f6]'
                : activeTheme === 'myspace'
                ? 'text-[#c7ccd6] drop-shadow-[2px_2px_0px_#000] myspace-glow-text'
                : 'text-white'
            }`}
          >
            {activeTheme === 'myspace' ? (
              'stuff i actually built'
            ) : activeTheme === 'y2k' ? (
              <>
                <span className="text-purple-900">Engineering</span>{' '}
                <span className="text-pink-600">Projects</span>
              </>
            ) : (
              'Engineering Projects'
            )}
          </h2>
          <p className={`text-sm max-w-2xl ${activeTheme === 'y2k' ? 'text-zinc-700' : 'text-zinc-400'}`}>
            {activeTheme === 'myspace' ? 'made these cuz i wanted 2 see if i could lol. click around ig' : 'Detailed case studies focusing on problem formulation, architectural design, and lessons learned.'}
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {projects.map((p) => {
            const isSelected = p.id === selectedProjectId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? activeTheme === 'y2k'
                      ? 'bg-pink-400 text-black border-2 border-black shadow-[3px_3px_0px_0px_#000]'
                      : activeTheme === 'myspace'
                      ? 'bg-[#8ea2c9] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : activeTheme === 'myspace'
                    ? 'bg-[#1a1d23] hover:bg-[#1a1d23] text-[#c7ccd6] border border-black'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/10'
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        {/* Case Study Detailed View Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-10 rounded-2xl border ${
              activeTheme === 'y2k'
                ? 'bg-cyan-100 border-4 border-black shadow-[8px_8px_0px_0px_#000] text-black font-medium'
                : activeTheme === 'myspace'
                ? 'bg-[#1a1d23] border-4 border-black shadow-[8px_8px_0px_0px_#8ea2c9] text-[#eef1f7] font-medium'
                : 'bg-[#0a0e19] border-cyan-500/30 text-white shadow-[0_0_40px_rgba(6,182,212,0.1)]'
            }`}
          >
            {/* Top Bar Info */}
            <div className={`flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b ${
              activeTheme === 'y2k' ? 'border-black/20' : 'border-white/10'
            }`}>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  activeTheme === 'y2k'
                    ? 'bg-cyan-200 text-purple-900 border-cyan-500 font-extrabold'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {activeProject.category}
                </span>
                <h3 className={`text-2xl sm:text-4xl font-extrabold font-mono mt-2 ${
                  activeTheme === 'y2k' ? 'text-purple-950 font-extrabold' : 'text-white'
                }`}>{activeProject.title}</h3>
                <p className={`text-sm font-mono mt-1 ${
                  activeTheme === 'y2k' ? 'text-pink-700 font-bold' : 'text-cyan-400'
                }`}>"{activeProject.subtitle}"</p>
              </div>

              {/* Stats highlights */}
              {activeProject.stats && (
                <div className="flex items-center gap-3">
                  {activeProject.stats.map((s) => (
                    <div
                      key={s.label}
                      className={`px-4 py-2 rounded-xl border text-center ${
                        activeTheme === 'y2k'
                          ? 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]'
                          : 'bg-black/30 border-cyan-500/30 text-cyan-300'
                      }`}
                    >
                      <span className={`block text-[10px] uppercase ${activeTheme === 'y2k' ? 'text-zinc-700 font-bold' : 'text-zinc-400'}`}>{s.label}</span>
                      <span className={`text-lg font-bold ${activeTheme === 'y2k' ? 'text-purple-900 font-extrabold' : 'text-cyan-300'}`}>{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TriCore AI Architecture Showcase Box if TriCore selected */}
            {activeProject.architecture && (
              <div className={`mb-8 p-6 rounded-xl border space-y-4 ${
                activeTheme === 'y2k' ? 'bg-white border-2 border-black' : 'bg-black/40 border-cyan-500/30'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-xs uppercase ${
                  activeTheme === 'y2k' ? 'text-purple-900 font-extrabold' : 'text-cyan-400'
                }`}>
                  <Cpu className="w-4 h-4" />
                  <span>TRICORE MULTI-ENGINE ARCHITECTURE</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeProject.architecture.map((eng) => (
                    <div
                      key={eng.engine}
                      className={`p-4 rounded-lg border text-xs font-mono space-y-1 ${
                        activeTheme === 'y2k'
                          ? 'bg-cyan-50 border-2 border-black text-black'
                          : 'bg-cyan-950/30 border-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      <h4 className={`font-bold text-sm flex items-center gap-1.5 ${
                        activeTheme === 'y2k' ? 'text-purple-950 font-extrabold' : 'text-cyan-300'
                      }`}>
                        <Sparkles className={`w-3.5 h-3.5 ${activeTheme === 'y2k' ? 'text-pink-600' : 'text-cyan-500'}`} />
                        {eng.engine}
                      </h4>
                      <p className={`font-sans text-xs leading-relaxed ${
                        activeTheme === 'y2k' ? 'text-zinc-800' : 'text-zinc-300'
                      }`}>{eng.description}</p>
                    </div>
                  ))}
                </div>
                {activeProject.quote && (
                  <div className={`p-3 border-l-4 italic text-xs font-mono ${
                    activeTheme === 'y2k'
                      ? 'bg-cyan-200/50 border-cyan-700 text-cyan-950 font-bold'
                      : 'bg-cyan-500/10 border-cyan-400 text-cyan-200'
                  }`}>
                    "{activeProject.quote}"
                  </div>
                )}
              </div>
            )}

            {/* Problem & Approach Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans text-sm sm:text-base leading-relaxed mb-8">
              <div className="space-y-2">
                <h4 className={`font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 ${activeTheme === 'y2k' ? 'text-red-700 font-extrabold' : 'text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full inline-block ${activeTheme === 'y2k' ? 'bg-red-700' : 'bg-red-400'}`} /> {activeTheme === 'myspace' ? 'why i even made this' : 'Problem Formulation'}
                </h4>
                <p className={activeTheme === 'y2k' ? 'text-zinc-900' : 'text-zinc-300'}>{activeProject.problem}</p>
              </div>

              <div className="space-y-2">
                <h4 className={`font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 ${
                  activeTheme === 'y2k' ? 'text-blue-800 font-extrabold' : 'text-cyan-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full inline-block ${activeTheme === 'y2k' ? 'bg-cyan-700' : 'bg-cyan-400'}`} /> {activeTheme === 'myspace' ? 'how i did it' : 'System Approach'}
                </h4>
                <p className={activeTheme === 'y2k' ? 'text-zinc-900' : 'text-zinc-300'}>{activeProject.approach}</p>
              </div>
            </div>

            {/* Result & Learned Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans text-sm sm:text-base leading-relaxed mb-8">
              <div className="space-y-2">
                <h4 className={`font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 ${activeTheme === 'y2k' ? 'text-emerald-700 font-extrabold' : 'text-emerald-400'}`}>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${activeTheme === 'y2k' ? 'text-emerald-700' : 'text-emerald-400'}`} /> {activeTheme === 'myspace' ? 'did it actually work' : 'Quantitative Result'}
                </h4>
                <p className={activeTheme === 'y2k' ? 'text-zinc-900' : 'text-zinc-300'}>{activeProject.result}</p>
              </div>

              <div className="space-y-2">
                <h4 className={`font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 ${activeTheme === 'y2k' ? 'text-purple-800 font-extrabold' : 'text-purple-400'}`}>
                  <Sparkles className={`w-3.5 h-3.5 ${activeTheme === 'y2k' ? 'text-purple-700' : 'text-purple-400'}`} /> {activeTheme === 'myspace' ? 'random thoughts abt it' : 'Key Takeaway & Learning'}
                </h4>
                <p className={activeTheme === 'y2k' ? 'text-zinc-900' : 'text-zinc-300'}>{activeProject.learned}</p>
              </div>
            </div>

            {/* Technology Chips */}
            <div className={`pt-4 border-t flex flex-wrap items-center gap-2 ${
              activeTheme === 'y2k' ? 'border-black/20' : 'border-white/10'
            }`}>
              <span className={`text-xs font-mono mr-2 ${activeTheme === 'y2k' ? 'text-purple-900 font-extrabold' : 'text-zinc-400'}`}>TECH STACK:</span>
              {activeProject.technology.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border ${
                    activeTheme === 'y2k'
                      ? 'bg-white border-2 border-black text-purple-950 font-bold shadow-[2px_2px_0px_0px_#000]'
                      : 'bg-white/5 border-white/10 text-cyan-300'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
