import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, TerminalIcon } from './components/icons';
import { portfolioData } from './components/data';
import { AnimatedTitle, GlowStyle } from './components/animation';
import { GameModal, VideoModal } from './components/games';
import { About, Skills, Projects, Games, Experience, Education, Footer } from './components/ui';
import { Terminal } from './components/terminal';

// MAIN APP COMPONENT
export default function App() {
  const [isTerminalView, setIsTerminalView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const toggleView = () => setIsTerminalView(!isTerminalView);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleLaunchGame = (game) => {
    setIsTerminalView(false);
    setActiveGame(game);
  }

  if (isTerminalView) {
    return <Terminal onExit={() => setIsTerminalView(false)} onLaunchGame={handleLaunchGame} />;
  }

  return (
    <>
      <GlowStyle />
      <GameModal game={activeGame} onClose={() => setActiveGame(null)} />
      <VideoModal youtubeId={activeVideoId} onClose={() => setActiveVideoId(null)} />
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          
          <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/80 dark:bg-slate-900/80">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex justify-between items-center py-4">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">{portfolioData.name}</h1>
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-teal-500 dark:hover:text-teal-400">About</a>
                  <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="hover:text-teal-500 dark:hover:text-teal-400">Skills</a>
                  <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-teal-500 dark:hover:text-teal-400">Projects</a>
                  <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="hover:text-teal-500 dark:hover:text-teal-400">Experience</a>
                  <a href="#education" onClick={(e) => handleNavClick(e, 'education')} className="hover:text-teal-500 dark:hover:text-teal-400">Education</a>
                  <a href="#games" onClick={(e) => handleNavClick(e, 'games')} className="hover:text-teal-500 dark:hover:text-teal-400">Games</a>
                </nav>
                {/* <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400">
                  {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button> */}
                <button onClick={toggleView} className="text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400" title="Switch to Terminal View">
                  <TerminalIcon />
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-24">
            <div className="mb-16">
              <AnimatedTitle title={portfolioData.title} />
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Crafting digital experiences, one line of code at a time.</p>
            </div>
            
            <About />
            <Skills />
            <Projects onVideoSelect={setActiveVideoId} />
            <Experience />
            <Education />
            <Games onGameSelect={setActiveGame} />
          </main>
          
          <Footer />
        </div>
      </div>
    </>
  );
}