import { useEffect, useRef, useState } from 'react';

const METRICS = [
  { value: 2, suffix: 'y+', label: 'Years Experience', sub: 'Building modern frontend web applications' },
  { value: 20, suffix: '+', label: 'Projects Built', sub: 'Responsive websites & interactive UIs' },
  { value: 99, suffix: '', label: 'Lighthouse Score', sub: 'Optimized performance & accessibility' },
  { value: 100, suffix: '%', label: 'Responsive UI', sub: 'Mobile-first design for all screens' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setN(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export const AchievementRibbon = () => {
  return (
    <section id="achievements" className="py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="relative rounded-3xl overflow-hidden border border-[#0F2C59]/08 dark:border-white/10 shadow-xl noise">
          <div className="absolute inset-0 bg-[#0F2C59] dark:bg-[#0F172A]" />
          <div className="blob blob-blue absolute -top-20 -right-20 w-80 h-80 opacity-30" />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <div
                key={i}
                className={`group p-8 md:p-10 flex flex-col gap-3 reveal ${
                  i < METRICS.length - 1 ? 'border-r border-white/08' : ''
                } ${i >= 2 ? 'border-t border-white/08 lg:border-t-0' : ''} hover:bg-white/06 transition-colors duration-300`}
                data-delay={i * 80}
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="font-monument text-3xl md:text-4xl text-white font-bold tracking-tight">
                  <Counter target={m.value} suffix={m.suffix} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white/90">{m.label}</p>
                  <p className="text-[11px] text-white/45 font-light mt-0.5 leading-snug">{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
