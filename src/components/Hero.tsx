import { useEffect, useState, useRef } from 'react';
import { ArrowDown, ArrowRight, Award, ShieldCheck } from 'lucide-react';

const WORDS = ['art and code.', 'design and data.', 'beauty and speed.', 'emotion and logic.'];

const TypewriterWord = () => {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const word = WORDS[wordIndex];
    const delay = isDeleting ? 45 : 85;
    const pause = isDeleting ? 0 : 2200;

    if (!isDeleting && displayed === word) {
      timeoutRef.current = window.setTimeout(() => setIsDeleting(true), pause);
      return;
    }
    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setDisplayed(isDeleting ? displayed.slice(0, -1) : word.slice(0, displayed.length + 1));
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <span className="inline-grid grid-cols-1 grid-rows-1 align-baseline grad-blue font-display ml-2">
      <span className="col-start-1 row-start-1 invisible select-none pointer-events-none" aria-hidden="true">
        emotion and logic.
        <span className="inline-block w-1 h-[0.85em] ml-1" />
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        {displayed}
        <span className="inline-block w-1 h-[0.85em] bg-[#2563EB] ml-1 animate-pulse align-middle" />
      </span>
    </span>
  );
};

const StatCard = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <div className="reveal" data-delay={delay}>
    <div className="flex flex-col">
      <span className="font-monument text-2xl md:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">{value}</span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F172A]/50 dark:text-[#F8FAFC]/50 mt-1">{label}</span>
    </div>
  </div>
);

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-20 md:pt-28 pb-20 overflow-hidden noise"
    >
      <div className="blob blob-blue absolute -top-32 -left-24 w-[600px] h-[600px] pulse-glow" />
      <div className="blob blob-navy absolute bottom-0 right-0 w-[500px] h-[500px] pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="blob blob-pale absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]" style={{ animationDelay: '6s' }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-10">
        <div className="space-y-9">
          <div className="reveal" data-delay="0">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Ready to work
            </div>
          </div>

          <div className="reveal" data-delay="80">
            <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] text-[#0F172A] dark:text-[#F8FAFC] tracking-tight font-bold leading-[1.05]">
              Engineering digital experiences that blur the line between
              <TypewriterWord />
            </h1>
          </div>

          <div className="reveal" data-delay="160">
            <p className="text-lg md:text-xl text-[#0F172A]/70 dark:text-[#F8FAFC]/70 font-sans font-light leading-relaxed max-w-2xl">
              Hi, I'm Suman. I am a passionate Frontend Web Developer crafting fast, responsive, and visually engaging web applications with modern UI design principles.
            </p>
          </div>

          <div className="reveal flex flex-wrap items-center gap-4 pt-2" data-delay="240">
            <a
              href="#projects"
              className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0F2C59] dark:bg-[#2563EB] text-white font-semibold text-sm tracking-wide shadow-xl"
            >
              Explore My Work
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-[#0F2C59]/15 dark:border-white/15 text-[#0F172A] dark:text-white font-semibold text-sm hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-[#60A5FA] hover:bg-white dark:hover:bg-[#1E293B] transition-all duration-300 bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-sm"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-8 border-t border-[#0F2C59]/08 dark:border-white/10">
            <div className="flex flex-wrap items-start gap-12 md:gap-16">
              <StatCard value="2y+" label="Frontend Experience" delay={300} />
              <StatCard value="20+" label="Projects Delivered" delay={380} />
              <StatCard value="100%" label="Responsive UI" delay={460} />
            </div>
          </div>

          <div className="reveal flex flex-wrap items-center gap-6 text-xs text-[#0F172A]/60 dark:text-[#F8FAFC]/60 font-mono pt-2" data-delay="520">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2563EB]" />
              Pixel-Perfect Responsive Design
            </span>
            <span className="w-px h-4 bg-[#0F2C59]/15 dark:bg-white/15" />
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              Modern Frontend Architecture
            </span>
          </div>

        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F172A] dark:text-[#F8FAFC]">Scroll</span>
        <div className="w-px h-8 bg-[#0F2C59] dark:bg-[#2563EB]" />
      </div>
    </section>
  );
};
