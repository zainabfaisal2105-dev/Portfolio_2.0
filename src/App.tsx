import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechJourney } from './components/TechJourney';
import { SkillsSection } from './components/SkillsSection';
import { SecuritySection } from './components/SecuritySection';
import { ProjectsSection } from './components/ProjectsSection';
import { AiPhilosophySection } from './components/AiPhilosophySection';
import { CurrentlyExploring } from './components/CurrentlyExploring';
import { ContactSection } from './components/ContactSection';
import { GuestbookSection } from './components/GuestbookSection';
import { Footer } from './components/Footer';
import { HackingTerminalModal } from './components/HackingTerminalModal';
import { ThemeMode } from './types';
import { X } from 'lucide-react';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>('neural');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Background Theme Styling Classes
  const getThemeClass = () => {
    switch (activeTheme) {
      case 'y2k':
        return 'bg-[#f0e6ff] text-black selection:bg-pink-400 selection:text-black font-mono';
      case 'myspace':
        return 'bg-gradient-to-b from-[#14161a] via-[#1a1d23] to-[#0d0e11] text-[#c7ccd6] selection:bg-[#8ea2c9] selection:text-white font-sans';
      case 'neural':
      default:
        return 'bg-[#05070c] text-zinc-100 selection:bg-cyan-500 selection:text-black font-sans';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${getThemeClass()} ${activeTheme === 'myspace' ? 'myspace-tiled-bg' : ''}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Navigation Bar */}
        <Navbar
          activeTheme={activeTheme}
          onThemeChange={setActiveTheme}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenEmailModal={() => setIsEmailModalOpen(true)}
        />

        {/* Main Portfolio Sections */}
        <main className="space-y-12">
          <HeroSection
            activeTheme={activeTheme}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenEmailModal={() => setIsEmailModalOpen(true)}
          />

          <AboutSection activeTheme={activeTheme} />

          <TechJourney activeTheme={activeTheme} />

          <SkillsSection activeTheme={activeTheme} />

          <SecuritySection activeTheme={activeTheme} />

          <ProjectsSection activeTheme={activeTheme} />

          <AiPhilosophySection activeTheme={activeTheme} />

          <CurrentlyExploring activeTheme={activeTheme} />

          <ContactSection activeTheme={activeTheme} />

          {activeTheme === 'myspace' && <GuestbookSection />}
        </main>

        {/* Footer */}
        <Footer
          activeTheme={activeTheme}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Floating Hacking Terminal Modal */}
        <HackingTerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          activeTheme={activeTheme}
          onThemeChange={setActiveTheme}
          onOpenEmailModal={() => {
            setIsTerminalOpen(false);
            setIsEmailModalOpen(true);
          }}
        />

        {/* Direct Email Modal Popup */}
        <AnimatePresence>
          {isEmailModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setIsEmailModalOpen(false)}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all cursor-pointer ${
                    'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
                <ContactSection
                  activeTheme={activeTheme}
                  isModalMode={true}
                  onCloseModal={() => setIsEmailModalOpen(false)}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
