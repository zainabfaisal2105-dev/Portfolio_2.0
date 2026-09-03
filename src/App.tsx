import React, { useState } from 'react';
import { motion } from 'motion/react';
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
import { Footer } from './components/Footer';
import { MySpaceProfile } from './components/MySpaceProfile';
import { ThemeControlWidget } from './components/ThemeControlWidget';
import { HackingTerminalModal } from './components/HackingTerminalModal';
import { ThemeMode } from './types';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>('neural');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Background Theme Styling Classes
  const getThemeClass = () => {
    switch (activeTheme) {
      case 'y2k':
        return 'bg-[#f0e6ff] text-black selection:bg-pink-400 selection:text-black font-mono';
      case 'myspace':
        return 'bg-[#070b16] text-[#c7ccd6] selection:bg-[#8ea2c9] selection:text-black font-sans';
      case 'neural':
      default:
        return 'bg-[#05070c] text-zinc-100 selection:bg-cyan-500 selection:text-black font-sans';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${getThemeClass()}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {activeTheme === 'myspace' ? (
          /* Dedicated Authentic 2000s Personal MySpace Profile Layout */
          <MySpaceProfile
            activeTheme={activeTheme}
            onThemeChange={setActiveTheme}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        ) : (
          /* Neural & Y2K Theme Section Flow */
          <>
            <Navbar
              activeTheme={activeTheme}
              onThemeChange={setActiveTheme}
              onOpenTerminal={() => setIsTerminalOpen(true)}
            />

            <main className="space-y-12">
              <HeroSection
                activeTheme={activeTheme}
                onOpenTerminal={() => setIsTerminalOpen(true)}
              />

              <AboutSection activeTheme={activeTheme} />

              <TechJourney activeTheme={activeTheme} />

              <SkillsSection activeTheme={activeTheme} />

              <SecuritySection activeTheme={activeTheme} />

              <ProjectsSection activeTheme={activeTheme} />

              <AiPhilosophySection activeTheme={activeTheme} />

              <CurrentlyExploring activeTheme={activeTheme} />

              <ContactSection activeTheme={activeTheme} />
            </main>

            <Footer
              activeTheme={activeTheme}
              onOpenTerminal={() => setIsTerminalOpen(true)}
            />
          </>
        )}

        {/* Persistent Floating Old-Web Skin Switcher Widget */}
        <ThemeControlWidget
          activeTheme={activeTheme}
          onThemeChange={setActiveTheme}
        />

        {/* Floating Hacking Terminal Modal */}
        <HackingTerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          activeTheme={activeTheme}
          onThemeChange={setActiveTheme}
        />
      </motion.div>
    </div>
  );
}
