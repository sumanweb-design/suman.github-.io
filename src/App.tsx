import { useScrollReveal } from './hooks/useScrollReveal';
import { useAntiDevTools } from './hooks/useAntiDevTools';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AchievementRibbon } from './components/AchievementRibbon';
import { SelectedProjects } from './components/SelectedProjects';
import { InteractiveSkills } from './components/InteractiveSkills';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  useScrollReveal();
  useAntiDevTools();

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0B0F17] text-[#0F172A] dark:text-[#F8FAFC] overflow-x-hidden transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <AchievementRibbon />
        <SelectedProjects />
        <InteractiveSkills />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
