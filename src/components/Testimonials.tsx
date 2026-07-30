import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Building2, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Suman has an impressive eye for detail and frontend design. He transformed our web interface into a responsive, lightning-fast experience with pixel-perfect accuracy.",
    author: 'Marcus Vance',
    role: 'Lead UI Engineer',
    company: 'TechFlow Design Studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    result: '100% Mobile Responsive',
  },
  {
    quote: "Working with Suman was smooth and efficient. His attention to micro-interactions, clean HTML/CSS, and responsive layouts made our website launch a huge success.",
    author: 'Elena Rostova',
    role: 'Head of Product Design',
    company: 'Nexus Creative Agency',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    result: '99/100 Lighthouse Perf',
  },
  {
    quote: "Suman is a reliable frontend developer who takes pride in writing clean, well-structured React and TypeScript code. Highly recommended for any web project!",
    author: 'David Chen',
    role: 'Senior Project Lead',
    company: 'Vanguard Web Labs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    result: 'Fast Turnaround',
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((dir: 1 | -1) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 200);
  }, [animating]);

  useEffect(() => {
    const timer = setInterval(() => go(1), 7000);
    return () => clearInterval(timer);
  }, [go]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EFF6FF]/25 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="reveal">
            <p className="section-label">Peer Endorsements</p>
            <h2 className="font-monument text-[clamp(1.8rem,4vw,3.2rem)] text-[#0F172A] tracking-tight uppercase">
              WORDS FROM <span className="grad-blue">INDUSTRY LEADERS</span>
            </h2>
          </div>

          <div className="reveal flex items-center gap-3" data-delay="100">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-xl glass border border-[#0F2C59]/10 text-[#0F172A] hover:bg-[#0F2C59] hover:text-white hover:border-[#0F2C59] transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 rounded-xl glass border border-[#0F2C59]/10 text-[#0F172A] hover:bg-[#0F2C59] hover:text-white hover:border-[#0F2C59] transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        <div className="reveal">
          <div
            className="relative card rounded-3xl p-8 md:p-14 transition-opacity duration-200"
            style={{ opacity: animating ? 0 : 1 }}
          >
            <Quote className="absolute top-8 right-8 md:top-12 md:right-12 w-24 h-24 text-[#0F2C59]/04" />
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <blockquote className="font-serif text-2xl md:text-4xl text-[#0F172A]/85 leading-[1.35] font-normal mb-10 max-w-4xl">
              "{t.quote}"
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-[#0F2C59]/06">
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#2563EB]/30"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-[#0F172A]">{t.author}</p>
                  <p className="text-xs text-[#0F172A]/55 font-mono mt-0.5">
                    {t.role} · <span className="text-[#2563EB] font-semibold">{t.company}</span>
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0F2C59] text-white text-sm font-semibold">
                <Building2 className="w-4 h-4 text-[#60A5FA]" />
                {t.result}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 200); }}
              className={`rounded-full transition-all duration-400 ${current === i ? 'w-8 h-2 bg-[#2563EB]' : 'w-2 h-2 bg-[#0F2C59]/20 hover:bg-[#0F2C59]/40'
                }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
