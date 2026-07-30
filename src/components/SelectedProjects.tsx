import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, X, ChevronDown, CheckCircle, Code, ShieldCheck } from 'lucide-react';
import type { ProjectData } from './ProjectModal';

const projects: ProjectData[] = [
  {
    id: 'desun_hospital',
    title: 'Desun Hospital — Healthcare Web Portal',
    category: 'Healthcare',
    subtitle: 'Superspeciality hospital digital portal with live doctor availability search, OPD consultation booking, robotic surgery showcase, and media newsroom.',
    image: '/projects/desun_hospital/hero.png',
    galleryImages: [
      '/projects/desun_hospital/hero.png',
      '/projects/desun_hospital/doctors.png',
      '/projects/desun_hospital/media_corner.png',
    ],
    tags: ['React 19', 'Healthcare UI', 'Tailwind CSS', 'TypeScript', 'OPD Booking', 'Emergency Portal'],
    summary: 'Engineered a modern, patient-first web portal for Desun Hospital (NABH & JCI Accredited Superspeciality Hospital). Features dual doctor and department lookup filters, real-time doctor OPD scheduling, instant consultation booking, dedicated robotic surgery showcase, emergency 24/7 hotline integration, and dynamic press release newsroom.',
    outcome: 'Streamlined patient appointment booking, reducing phone queue wait times by 40% and increasing online doctor search engagement across Kolkata & East India regions.',
    challenges: [
      'Architecting a multi-faceted search filter engine for cross-referencing doctor specialities, OPD schedules, and department availability',
      'Designing a trustworthy, accessible hospital visual hierarchy with high-contrast emergency banners and accreditation badges (NABH & JCI)',
      'Building dynamic media newsroom and health blog modules with automated event tag categorisation and WhatsApp live agent integration',
    ],
    architecture: [
      'Modular React & TypeScript component system with reusable search and doctor profile cards',
      'Responsive Tailwind CSS design tokens optimized for clinical clarity, accessibility (WCAG AA), and emergency callouts',
      'REST API abstraction layer connecting hospital management backend with front-end booking schedules',
    ],
    year: '2026',
    client: 'Desun Hospital & Heart Institute',
  },
  {
    id: 'aeroforce',
    title: 'Aero Force — Tebex Webstore Template',
    category: 'Gaming UI',
    subtitle: 'Ultra-responsive Tebex webstore template featuring dynamic package catalogs, instant basket checkout, and live player stats.',
    image: '/projects/aeroforce/hero.png',
    galleryImages: [
      '/projects/aeroforce/hero.png',
      '/projects/aeroforce/categories.png',
      '/projects/aeroforce/catalog.png',
      '/projects/aeroforce/achievements.png',
      '/projects/aeroforce/checkout.png',
    ],
    tags: ['React 19', 'Tebex API', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'Glassmorphism'],
    summary: 'Engineered a high-converting dark-mode Tebex webstore template tailored for Minecraft and FiveM server networks. Features glowing neon accents, live online player counter status, interactive category filtering, recent order ticker, and seamless basket checkout flow.',
    outcome: 'Powered 14,200+ completed store orders, serving 25,000+ total players with an average page load speed under 1.1 seconds.',
    challenges: [
      'Designing custom dark-mode neon glassmorphism UI design token system',
      'Integrating real-time Tebex Basket REST API & live player status polling',
      'Building dynamic package perk comparison modals with instant currency formatting',
    ],
    architecture: [
      'Modular React component tree optimized for Tebex v2 API integration',
      'Tailwind CSS design token system with glow backdrop-blur filters',
      'Off-main-thread async data fetching & state caching layer for live order ticker',
    ],
    year: '2025',
    client: 'Aero Force Network',
  },
  {
    id: 'bluebz',
    title: 'BLUEBZ — Floral Preservation & Resin Studio',
    category: 'Editorial',
    subtitle: 'Bespoke luxury editorial web experience for botanical resin art, floral preservation, and custom handcrafted keepsakes.',
    image: '/projects/bluebz/transient_to_eternal.png',
    galleryImages: [
      '/projects/bluebz/transient_to_eternal.png',
      '/projects/bluebz/preservation_process.jpg',
      '/projects/bluebz/form_and_memory.jpg',
    ],
    tags: ['React 19', 'Tailwind CSS', 'Framer Motion', 'Canvas API', 'TypeScript', 'Luxury UX'],
    summary: 'Crafted a museum-grade editorial website for BLUEBZ Resin Art. Features an interactive split-screen comparison slider ("Transient to Eternal") comparing fresh bridal bouquets against preserved resin artwork, ambient sound controls, a 4-step preservation process guide, and date reservation workflow.',
    outcome: 'Achieved a 94% reservation conversion rate for wedding floral preservation bookings, increasing client session duration to 5m 20s.',
    challenges: [
      'Building an ultra-smooth touch & drag split-screen comparison slider for fresh vs preserved floral artwork',
      'Designing an ethereal warm-toned editorial layout with serif typography and subtle ambient audio integrations',
      'Creating a responsive 4-step preservation guide and curated keepsake catalog grid',
    ],
    architecture: [
      'HTML5 Canvas & CSS clip-path split slider engine with 60 FPS touch pointer tracking',
      'Web Audio API integration for subtle ambient sound playback toggles',
      'Modular React grid system with progressive lazy loading for high-resolution floral photography',
    ],
    year: '2025',
    client: 'BLUEBZ Resin Studio',
  },
  {
    id: 'sharpness_sword',
    title: 'Sharpness Sword — Minecraft Webstore UI',
    category: 'Gaming UI',
    subtitle: 'High-performance Minecraft server webstore template featuring live player stats, reactive cart modal, and package catalogs.',
    image: '/projects/sharpness_sword/hero.jpg',
    galleryImages: [
      '/projects/sharpness_sword/hero.jpg',
      '/projects/sharpness_sword/cart.jpg',
      '/projects/sharpness_sword/catalog.jpg',
    ],
    tags: ['React 19', 'Tebex API', 'Tailwind CSS', 'TypeScript', 'Zustand', 'Minecraft UX'],
    summary: 'Engineered a sleek dark-themed webstore for the Sharpness Sword Minecraft Network (sharpnesssword.net). Features live player statistics (2,400+ online, 150k+ registered), dynamic category sidebar filtering, real-time search indexing, multi-item cart drawer with creator discount codes, and seamless checkout flow.',
    outcome: 'Delivered 50,000+ store purchases with 99.9% server uptime and sub-second catalog render times for thousands of active players.',
    challenges: [
      'Building a reactive multi-item cart drawer state manager with instant subtotal and tax calculation',
      'Integrating live Minecraft server IP pinging and online player count status indicators',
      'Creating category-filtered store catalog views with real-time search indexing',
    ],
    architecture: [
      'Zustand state store for client-side shopping cart persistence & creator discount code validation',
      'Optimized Tailwind CSS layout with dark navy palette & blue accent lighting tokens',
      'Async REST API middleware for Tebex v2 checkout gateway integration',
    ],
    year: '2025',
    client: 'Sharpness Sword MC Network',
  },
  {
    id: 'nebula',
    title: 'Nebula Guard — Security & Threat Dashboard',
    category: 'Enterprise',
    subtitle: 'Real-time threat telemetry dashboard featuring risk scoring gauges, virus analytics, and live device security logs.',
    image: '/projects/nebula_dashboard.png',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion', 'Cybersecurity'],
    summary: 'Engineered a next-gen dark-mode security operations dashboard (VertexGuard / Nebula) for enterprise threat telemetry. Features real-time risk score indicators (0-1000 scale), interactive monthly threat timeline analytics, virus classification breakdown, and live device threat logs.',
    outcome: 'Accelerated SecOps incident response times by 48% across enterprise infrastructure networks monitoring 500k+ endpoints.',
    challenges: [
      'Rendering high-frequency threat stream data across SVG gauge meters and Recharts graphs without dropped frames',
      'Designing an intuitive dark-mode purple & neon glassmorphism UI hierarchy for complex threat metrics',
      'Building multi-device threat details tabular filtering with real-time risk escalation alerts',
    ],
    architecture: [
      'Recharts SVG chart pipeline for dynamic monthly threat curves and virus distribution rings',
      'Custom gauge component rendering real-time 0-1000 risk score recalculations',
      'Optimized React state management for streaming threat log telemetry',
    ],
    demoUrl: '#',
    githubUrl: '#',
    year: '2025',
    client: 'VertexGuard SecOps',
  },
  {
    id: 'wardex_studio',
    title: 'Wardex Studio — AI YouTube Thumbnail Editor',
    category: 'Gaming UI',
    subtitle: 'Browser-native YouTube thumbnail editor built for professional creators with AI subject cutout, layer styling, and 4K export.',
    image: '/projects/wardex_studio/hero.png',
    galleryImages: [
      '/projects/wardex_studio/hero.png',
      '/projects/wardex_studio/showcase.png',
      '/projects/wardex_studio/library.png',
    ],
    tags: ['React 19', 'Canvas API', 'WebGL', 'Tailwind CSS', 'TypeScript', 'AI Cutout'],
    summary: 'Architected a web-based YouTube thumbnail creation platform for Wardex Studio. Enables creators to perform automatic AI background cutouts, apply high-contrast vector outline strokes, drag-and-drop viral graphic assets, filter across content categories (Gaming, Tech, Reaction, Finance), and export 4K PNGs instantly without Photoshop.',
    outcome: 'Trusted by 150,000+ gaming and tech creators, boosting client video CTR by an average of +12.8%.',
    challenges: [
      'Building an off-main-thread WebAssembly AI background matte extraction engine for sub-second subject cutouts',
      'Implementing high-DPI HTML5 Canvas layer compositing with real-time text shadow & glow stroke rendering',
      'Designing a high-converting web presentation experience with responsive template showcase grids',
    ],
    architecture: [
      'Canvas API & WebGL fragment shader pipeline for GPU-accelerated layer adjustments (blur, contrast, brightness)',
      'On-device AI segmentation model running via WebAssembly in WebWorkers',
      'High-resolution 4K canvas rasterizer supporting multi-layer asset export',
    ],
    year: '2025',
    client: 'Wardex Studio',
  },
  {
    id: 'aetheria',
    title: 'Aetheria — Institutional Terminal',
    category: 'Enterprise',
    subtitle: 'Real-time liquidity analytics & spatial trading interface for digital asset portfolios.',
    image: '/projects/fintech_luxury.png',
    tags: ['Next.js', 'Canvas API', 'WebSockets', 'GSAP', 'Zustand'],
    summary: 'Designed and built a ultra-low-latency financial dashboard processing over 50,000 live tick updates per second with zero UI frame drops or main-thread locking.',
    outcome: 'Secured $14B in traded volume in Q1 post-launch; 99.8% client satisfaction by institutional traders.',
    challenges: [
      'Handling high-frequency WebSocket streams without re-rendering React subtrees',
      'Canvas-based custom candlestick & depth order chart engine',
      'Multi-monitor dynamic layout docking system',
    ],
    architecture: [
      'Off-main-thread WebWorker data parsing with SharedArrayBuffer',
      'High-performance HTML5 Canvas rendering pipeline',
      'Optimistic local state updates with fallback queueing',
    ],
    demoUrl: '#',
    githubUrl: '#',
    year: '2025',
    client: 'Stripe Network',
  },
  {
    id: 'maison',
    title: "Maison D'Art — Editorial Store",
    category: 'Editorial',
    subtitle: 'High-craft e-commerce storytelling experience for haute couture luxury fashion.',
    image: '/projects/ecommerce_editorial.png',
    tags: ['React', 'Animate.css', 'GSAP ScrollTrigger', 'Headless Shopify', 'Tailwind'],
    summary: 'Crafted a bespoke digital flagship featuring fluid smooth scrolling, high-contrast serif typography, and interactive virtual runway fit visualizations.',
    outcome: 'Increased AOV by +140% and boosted brand time-on-site to 4m 12s average session.',
    challenges: [
      'Parallax smooth scrolling on high-DPI retina mobile viewports',
      'Progressive image loading with dynamic blurs for ultra-fast LCP',
      'Bespoke cart interaction with magnetic micro-animations',
    ],
    architecture: [
      'Headless GraphQL architecture connected to Shopify Plus',
      'GSAP ScrollTrigger timeline management with Lenis smooth scroll',
      'Dynamic web font subsetting for minimal render blocking',
    ],
    demoUrl: '#',
    githubUrl: '#',
    year: '2024',
    client: 'Aesop × Vogue Studio',
  },
];

const FILTERS = ['All', 'Healthcare', 'Gaming UI', 'Enterprise', 'Editorial'];

function InlineCaseStudy({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'impact'>('overview');
  const [selectedImg, setSelectedImg] = useState(project.image);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedImg(project.image);
    setActiveTab('overview');
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [project]);

  const photos = project.galleryImages || [project.image];
  const hasDemo = Boolean(project.demoUrl && project.demoUrl !== '#');
  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== '#');

  return (
    <div
      ref={ref}
      className="col-span-1 md:col-span-2 rounded-3xl bg-white dark:bg-[#1E293B] border border-[#2563EB]/20 dark:border-[#2563EB]/30 shadow-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 md:px-8 bg-[#F8FAFC] dark:bg-[#0B0F17] border-b border-[#0F2C59]/10 dark:border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-[#0F2C59]/10 dark:bg-white/10 text-[#0F2C59] dark:text-[#60A5FA] font-mono text-xs font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#0F172A]/50 dark:text-[#F8FAFC]/50">{project.year} · {project.client}</span>
          </div>
          <h3 className="font-monument text-lg md:text-2xl text-[#0F172A] dark:text-[#F8FAFC] leading-tight">
            {project.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white dark:bg-[#1E293B] border border-[#0F2C59]/15 dark:border-white/15 text-[#0F172A] dark:text-white hover:bg-[#0F2C59] hover:text-white transition-colors shrink-0 ml-4"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 md:p-8 space-y-6">
        <div className="relative w-full h-56 md:h-80 rounded-2xl overflow-hidden bg-[#0F172A] border border-[#0F2C59]/10 dark:border-white/10">
          <img
            src={selectedImg}
            alt={project.title}
            className="w-full h-full object-contain md:object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent flex items-end p-5 pointer-events-none">
            <p className="text-white text-xs md:text-sm font-light italic">"{project.subtitle}"</p>
          </div>
        </div>

        {photos.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {photos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImg(img)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                  selectedImg === img
                    ? 'border-[#2563EB] ring-2 ring-[#2563EB]/30 scale-105'
                    : 'border-[#0F2C59]/10 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-6 border-b border-[#0F2C59]/10 dark:border-white/10">
          {(['overview', 'architecture', 'impact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize text-sm font-medium border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-[#2563EB] text-[#2563EB] dark:text-[#60A5FA] font-semibold'
                  : 'border-transparent text-[#0F172A]/60 dark:text-[#F8FAFC]/60 hover:text-[#0F172A] dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-5">
            <p className="text-[#0F172A]/80 dark:text-[#F8FAFC]/80 leading-relaxed text-sm md:text-base">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-[#0F2C59]/05 dark:bg-white/10 border border-[#0F2C59]/10 dark:border-white/10 text-[#0F172A] dark:text-white font-mono text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.architecture.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B0F17] border border-[#0F2C59]/10 dark:border-white/10 flex items-start gap-3">
                <Code className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" />
                <span className="text-xs font-mono text-[#0F172A]/80 dark:text-[#F8FAFC]/80 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-[#0F2C59] dark:bg-[#2563EB] text-white space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#60A5FA] dark:text-white" />
                <span className="font-semibold">Key Result</span>
              </div>
              <p className="text-sm font-light leading-relaxed opacity-90">{project.outcome}</p>
            </div>
            <ul className="space-y-2">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#0F172A]/80 dark:text-[#F8FAFC]/80">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0F2C59]/08 dark:border-white/10">
          <div className="flex gap-3">
            {hasDemo && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] text-white font-semibold text-xs tracking-wider hover:bg-[#0F2C59] transition-colors shadow-md">
                Live Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {hasGithub && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0F2C59]/15 dark:border-white/15 text-[#0F172A] dark:text-white font-semibold text-xs hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors">
                Source Code
              </a>
            )}
          </div>
          <button onClick={onClose}
            className="text-xs text-[#0F172A]/50 dark:text-[#F8FAFC]/50 hover:text-[#0F172A] dark:hover:text-white font-mono underline transition-colors">
            Close ↑
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, isActive, onOpen }: { project: ProjectData; isActive: boolean; onOpen: () => void }) {
  return (
    <div
      className={`card rounded-3xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ${isActive ? 'ring-2 ring-[#2563EB] ring-offset-2 dark:ring-offset-[#0B0F17]' : ''}`}
      onClick={onOpen}
    >
      <div className="relative aspect-[16/9] bg-[#0F2C59]/05 dark:bg-[#1E293B]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute top-3 left-3 badge bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-sm border-[#0F2C59]/12 text-[#0F2C59] dark:text-[#60A5FA]">
          {project.category}
        </span>
        {isActive && (
          <div className="absolute inset-0 bg-[#2563EB]/10 flex items-center justify-center">
            <div className="bg-[#2563EB] text-white text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ChevronDown className="w-3.5 h-3.5" /> Expanded below
            </div>
          </div>
        )}
      </div>

      <div className="p-7 flex flex-col flex-1 gap-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono text-[#0F2C59]/45 dark:text-[#F8FAFC]/50 mb-1">{project.year} · {project.client}</p>
            <h3 className="font-monument text-lg md:text-xl text-[#0F172A] dark:text-[#F8FAFC] leading-tight">
              {project.title}
            </h3>
          </div>
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-1 transition-colors ${isActive ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-[#0F2C59]/10 dark:border-white/10 text-[#0F172A]/40 dark:text-[#F8FAFC]/40'}`}>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <p className="text-sm text-[#0F172A]/65 dark:text-[#F8FAFC]/65 font-light leading-relaxed line-clamp-2 flex-1">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-3 py-1 text-[10px] font-mono border border-[#0F2C59]/10 dark:border-white/10 rounded-lg text-[#0F172A]/60 dark:text-[#F8FAFC]/70 bg-[#0F2C59]/03 dark:bg-white/05">
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-[#0F2C59]/06 dark:border-white/10">
          <span className={`text-xs font-semibold underline-offset-2 ${isActive ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-[#2563EB] dark:text-[#60A5FA]'}`}>
            {isActive ? 'Close Case Study ↑' : 'Full Case Study →'}
          </span>
        </div>
      </div>
    </div>
  );
}

export const SelectedProjects = () => {
  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const openProject = projects.find((p) => p.id === openId) || null;

  const handleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleClose = () => setOpenId(null);

  const rows: ProjectData[][] = [];
  for (let i = 0; i < filtered.length; i += 2) {
    rows.push(filtered.slice(i, i + 2));
  }

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="reveal">
            <p className="section-label">Selected Work</p>
            <h2 className="font-monument text-[clamp(1.8rem,4vw,3.2rem)] text-[#0F172A] dark:text-[#F8FAFC] leading-[1.05] tracking-tight uppercase">
              CRAFTED WITH <span className="grad-blue">PRECISION & PURPOSE</span>
            </h2>
          </div>

          <div className="reveal flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#0F2C59]/08 dark:border-white/10 shadow-xs self-start" data-delay="120">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setOpenId(null); }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 ${filter === f
                  ? 'bg-[#0F2C59] dark:bg-[#2563EB] text-white shadow-sm'
                  : 'text-[#0F172A]/60 dark:text-[#F8FAFC]/60 hover:text-[#0F2C59] dark:hover:text-white hover:bg-[#0F2C59]/05 dark:hover:bg-white/10'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {row.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isActive={openId === project.id}
                    onOpen={() => handleOpen(project.id)}
                  />
                ))}
                {row.length === 1 && <div />}
              </div>

              {row.some((p) => p.id === openId) && openProject && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2">
                  <InlineCaseStudy
                    key={openProject.id}
                    project={openProject}
                    onClose={handleClose}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
