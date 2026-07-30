import { Compass, Lightbulb, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

const pillars = [
  {
    icon: Compass,
    title: 'Design as Engineering',
    body: 'Great UI is the physical manifestation of software architecture. Spacing rhythm, motion physics, and typography dictate user intent and product clarity — not decoration.',
    n: '01',
  },
  {
    icon: Lightbulb,
    title: 'Code as Catalyst',
    body: 'Milliseconds matter. Zero layout shifts, intuitive micro-interactions, and conversion-optimised flows directly lower CAC and compound brand equity over time.',
    n: '02',
  },
  {
    icon: Zap,
    title: 'Luxury Through Restraint',
    body: 'The finest products leave nothing superfluous. I eliminate clichés, bloated libraries, and decorative noise to leave only purposeful motion and editorial whitespace.',
    n: '03',
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="blob blob-pale absolute -bottom-40 -left-40 w-[600px] h-[600px] opacity-60 pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5 reveal">
            <p className="section-label">Mindset & Philosophy</p>
            <h2 className="font-monument text-[clamp(1.8rem,4vw,3.2rem)] text-[#0F172A] dark:text-[#F8FAFC] leading-[1.05] tracking-tight uppercase">
              WHERE RIGOR MEETS <span className="grad-blue">ARTISTIC INTENT</span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-5 reveal" data-delay="120">
            <p className="text-base md:text-lg text-[#0F172A]/70 dark:text-[#F8FAFC]/70 font-light leading-relaxed">
              I'm Suman — a dedicated Frontend Web Developer with over 2y+ experience building modern, responsive, and user-centric web applications.
            </p>
            <p className="text-base text-[#0F172A]/65 dark:text-[#F8FAFC]/65 font-light leading-relaxed">
              I focus on transforming design concepts into clean, high-performance code. My goal is to build web experiences that look great, run smoothly across all devices, and solve real user problems.
            </p>

            <blockquote className="relative pl-5 border-l-2 border-[#2563EB] mt-6">
              <p className="font-serif text-xl italic text-[#0F172A]/80 dark:text-[#F8FAFC]/80 leading-snug">
                "Great web development is where clean code meets intuitive design — making every click feel effortless and engaging."
              </p>
              <footer className="text-[10px] font-mono uppercase tracking-widest text-[#2563EB] font-bold mt-3">
                — Suman | Frontend Developer
              </footer>
            </blockquote>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors mt-2 group"
            >
              Let's work together
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="divider mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="reveal card rounded-3xl p-8 flex flex-col gap-6" data-delay={i * 100}>
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0F2C59]/06 dark:bg-white/10 text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-[#0F2C59]/30 dark:text-white/30 font-bold tracking-widest">{p.n}</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-monument text-lg text-[#0F172A] dark:text-[#F8FAFC] mb-3 leading-tight">{p.title}</h3>
                  <p className="text-sm text-[#0F172A]/65 dark:text-[#F8FAFC]/65 font-light leading-relaxed">{p.body}</p>
                </div>

                <div className="pt-4 border-t border-[#0F2C59]/06 dark:border-white/10 flex items-center gap-2 text-[10px] font-mono text-[#0F2C59]/45 dark:text-[#F8FAFC]/45">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                  Applied principle
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
