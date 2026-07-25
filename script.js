document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initContactActions();
  initLightbox();
  initScrollProgress();
  initCounters();
  initHeroParallax();
});

// Navigation toggle & mobile menu
function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// Scroll reveal animations
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));

  document.querySelectorAll('.gallery-grid, .values-list, .contact-cards-layout').forEach(grid => {
    Array.from(grid.children).forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.09}s`;
    });
  });
}

// Contact card interactions & clipboard actions
function initContactActions() {
  const emailCard = document.getElementById('email-card');
  const discordCard = document.getElementById('discord-card');
  const whatsappCard = document.getElementById('whatsapp-card');

  if (emailCard) {
    const handleEmail = () => {
      navigator.clipboard.writeText('sumanverse95@gmail.com')
        .then(() => showToast('Email copied to clipboard'))
        .catch(() => {});
      setTimeout(() => window.open('mailto:sumanverse95@gmail.com', '_self'), 800);
    };
    emailCard.addEventListener('click', handleEmail);
    emailCard.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') handleEmail();
    });
  }

  if (discordCard) {
    const handleDiscord = () => {
      const msg = 'Hi Suman! I reached out through your Suman Verse portfolio and would love to get in touch about a project.';
      navigator.clipboard.writeText(msg)
        .then(() => showToast('Opening Discord… Starter message copied!'))
        .catch(() => showToast('Opening Discord…'));
      setTimeout(() => {
        window.open('https://discord.com/users/1130046717878878272', '_blank');
      }, 1000);
    };
    discordCard.addEventListener('click', handleDiscord);
    discordCard.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') handleDiscord();
    });
  }

  if (whatsappCard) {
    const handleWhatsApp = () => {
      const msg = 'Hi Suman! I reached out through your Suman Verse portfolio and would love to chat about a project.';
      const url = `https://wa.me/639078989078?text=${encodeURIComponent(msg)}`;
      showToast('Opening WhatsApp…');
      setTimeout(() => window.open(url, '_blank'), 800);
    };
    whatsappCard.addEventListener('click', handleWhatsApp);
    whatsappCard.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') handleWhatsApp();
    });
  }
}

function showToast(message) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Lightbox modal for projects and videos
function initLightbox() {
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Media viewer');
    lightbox.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="Close viewer">&times;</button>
        <button class="lightbox-nav-btn prev" aria-label="Previous image">&lt;</button>
        <div id="lb-media"></div>
        <button class="lightbox-nav-btn next" aria-label="Next image">&gt;</button>
        <div class="lightbox-caption">
          <h3 id="lb-title"></h3>
          <p id="lb-desc"></p>
          <div id="lb-counter" class="lightbox-counter"></div>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lbMedia = lightbox.querySelector('#lb-media');
  const lbTitle = lightbox.querySelector('#lb-title');
  const lbDesc = lightbox.querySelector('#lb-desc');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-nav-btn.prev');
  const btnNext = lightbox.querySelector('.lightbox-nav-btn.next');
  const lbCount = lightbox.querySelector('#lb-counter');

  let galleryImages = [];
  let activeIndex = 0;

  const updateGalleryImage = () => {
    if (!galleryImages.length) return;
    const src = galleryImages[activeIndex];
    lbMedia.innerHTML = `<img src="${src}" alt="${lbTitle.textContent} image ${activeIndex + 1}" class="lightbox-img">`;
    lbCount.textContent = `${activeIndex + 1} / ${galleryImages.length}`;
  };

  const nextImage = () => {
    if (!galleryImages.length) return;
    activeIndex = (activeIndex + 1) % galleryImages.length;
    updateGalleryImage();
  };

  const prevImage = () => {
    if (!galleryImages.length) return;
    activeIndex = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
  };

  const openLightbox = (html, title, desc, images, index = 0) => {
    lbMedia.innerHTML = html;
    lbTitle.textContent = title;
    lbDesc.textContent = desc;

    if (images && images.length > 1) {
      galleryImages = images;
      activeIndex = index;
      btnPrev.style.display = 'flex';
      btnNext.style.display = 'flex';
      updateGalleryImage();
    } else {
      galleryImages = [];
      btnPrev.style.display = 'none';
      btnNext.style.display = 'none';
      lbCount.textContent = '';
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    const mediaItem = lbMedia.querySelector('video, iframe');
    if (mediaItem) mediaItem.src = '';
    lbMedia.innerHTML = '';
    galleryImages = [];
  };

  lbClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', e => { e.stopPropagation(); prevImage(); });
  btnNext.addEventListener('click', e => { e.stopPropagation(); nextImage(); });
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' || e.key === 'Right') nextImage();
    if (e.key === 'ArrowLeft' || e.key === 'Left') prevImage();
  });

  document.querySelectorAll('.project-card[data-lightbox]').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.project-name')?.textContent || '';
      const desc = card.querySelector('.project-blurb')?.textContent || '';
      const galleryStr = card.dataset.gallery || '';

      if (galleryStr) {
        const images = galleryStr.split(',');
        openLightbox('', title, desc, images, 0);
      } else {
        const imgEl = card.querySelector('.project-image');
        const src = card.dataset.imgSrc || (imgEl ? imgEl.src : '');
        openLightbox(`<img src="${src}" alt="${title}" class="lightbox-img">`, title, desc);
      }
    });
  });

  document.querySelectorAll('.video-wrap[data-video]').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const title = wrap.dataset.title || '';
      const desc = wrap.dataset.desc || '';
      const src = wrap.dataset.video || '';
      const html = `
        <video controls autoplay class="lightbox-video" style="width:min(800px,88vw)">
          <source src="${src}" type="video/mp4">
        </video>
      `;
      openLightbox(html, title, desc);
    });
  });
}

// Progress bar indicating scroll depth
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = `${pct}%`;
  }, { passive: true });
}

// Animated stats counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-value');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');
      if (isNaN(num)) return;

      const duration = 1600;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * num) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// Subtle parallax effect on hero element
function initHeroParallax() {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  let ticking = false;
  document.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      title.style.transform = `translate(${dx * 5}px, ${dy * 3}px)`;
      ticking = false;
    });
  }, { passive: true });
}
