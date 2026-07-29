import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark';
      if (saved) return saved;
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleScroll = useCallback(() => {
    const sections = ['hero', 'projects', 'skills', 'about'];
    const offset = window.innerHeight * 0.35;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= offset && bottom > offset) {
          setActiveSection(id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Work', id: 'projects' },
    { label: 'Stack', id: 'skills' },
    { label: 'About', id: 'about' },
  ];

  return (
    <>
      <ScrollProgress />
      <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex w-44" />

          <nav className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border border-[#0F2C59]/15 dark:border-white/10 shadow-lg shadow-[#0F2C59]/5 transition-all duration-300">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? 'bg-[#0F2C59] dark:bg-[#2563EB] text-white shadow-sm font-bold'
                      : 'text-[#0F172A]/70 dark:text-[#F8FAFC]/70 hover:text-[#0F2C59] dark:hover:text-white hover:bg-[#0F2C59]/05 dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 dark:bg-[#1E293B]/80 border border-[#0F2C59]/15 dark:border-white/10 text-[#0F172A] dark:text-white hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-[#60A5FA] shadow-md transition-all duration-300"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#0F2C59] transition-transform duration-300" />
              )}
            </button>

            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F2C59] dark:bg-[#2563EB] text-white text-xs font-bold shadow-lg shadow-[#0F2C59]/15 hover:bg-[#2563EB] dark:hover:bg-[#3B82F6] hover:scale-105 transition-all duration-300"
            >
              <span>Get in Touch</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
