/* ============================================================
   SUMAN VERSE — main script
   Pure vanilla JavaScript. No frameworks, no Node.js.
   Scroll progress · Counter animation · Staggered reveals
   Hero parallax · Lightbox gallery · Video player
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initScrollReveal();
  initContactActions();
  initLightbox();
  initScrollProgress();
  initCounters();
  initHeroParallax();
});



/* ============================================================
   2. NAVIGATION
   ============================================================ */
function initNav() {
  var toggle = document.querySelector('.menu-toggle');
  var menu   = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   3. SCROLL REVEAL (staggered)
   ============================================================ */
function initScrollReveal() {
  var els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.10 });

  els.forEach(function (el) { io.observe(el); });

  /* Stagger children inside grid containers */
  document.querySelectorAll('.gallery-grid, .values-list, .contact-cards-layout').forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.09) + 's';
    });
  });
}

/* ============================================================
   4. CONTACT ACTIONS
   ============================================================ */
function initContactActions() {
  var emailCard   = document.getElementById('email-card');
  var discordCard = document.getElementById('discord-card');

  if (emailCard) {
    function handleEmail() {
      navigator.clipboard.writeText('sumanverse95@gmail.com')
        .then(function () { showToast('Email copied to clipboard'); })
        .catch(function () {});
      setTimeout(function () { window.open('mailto:sumanverse95@gmail.com', '_self'); }, 800);
    }
    emailCard.addEventListener('click', handleEmail);
    emailCard.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') handleEmail();
    });
  }

  if (discordCard) {
    function handleDiscord() {
      var msg = 'Hi Suman! I reached out through your Suman Verse portfolio and would love to get in touch about a project.';
      navigator.clipboard.writeText(msg)
        .then(function () { showToast('Opening Discord… Starter message copied!'); })
        .catch(function () { showToast('Opening Discord…'); });
      setTimeout(function () {
        window.open('https://discord.com/users/1130046717878878272', '_blank');
      }, 1000);
    }
    discordCard.addEventListener('click', handleDiscord);
    discordCard.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') handleDiscord();
    });
  }
}

function showToast(message) {
  document.querySelectorAll('.toast').forEach(function (t) { t.remove(); });
  var toast = document.createElement('div');
  toast.className   = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { toast.classList.add('show'); });
  });
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 400);
  }, 3200);
}

/* ============================================================
   5. LIGHTBOX
   ============================================================ */
function initLightbox() {
  var lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Media viewer');
    lb.innerHTML =
      '<div class="lightbox-inner">' +
        '<button class="lightbox-close" aria-label="Close viewer">&times;</button>' +
        '<button class="lightbox-nav-btn prev" aria-label="Previous image">&lt;</button>' +
        '<div id="lb-media"></div>' +
        '<button class="lightbox-nav-btn next" aria-label="Next image">&gt;</button>' +
        '<div class="lightbox-caption">' +
          '<h3 id="lb-title"></h3>' +
          '<p  id="lb-desc"></p>' +
          '<div id="lb-counter" class="lightbox-counter"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(lb);
  }

  var lbMedia = lb.querySelector('#lb-media');
  var lbTitle = lb.querySelector('#lb-title');
  var lbDesc  = lb.querySelector('#lb-desc');
  var lbClose = lb.querySelector('.lightbox-close');
  var btnPrev = lb.querySelector('.lightbox-nav-btn.prev');
  var btnNext = lb.querySelector('.lightbox-nav-btn.next');
  var lbCount = lb.querySelector('#lb-counter');

  var galleryImages = [];
  var activeIndex = 0;

  function openLB(html, title, desc, images, index) {
    lbMedia.innerHTML     = html;
    lbTitle.textContent   = title;
    lbDesc.textContent    = desc;
    
    if (images && images.length > 1) {
      galleryImages = images;
      activeIndex = index || 0;
      btnPrev.style.display = 'flex';
      btnNext.style.display = 'flex';
      updateGalleryImage();
    } else {
      galleryImages = [];
      btnPrev.style.display = 'none';
      btnNext.style.display = 'none';
      lbCount.textContent = '';
    }

    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function updateGalleryImage() {
    if (galleryImages.length === 0) return;
    var src = galleryImages[activeIndex];
    lbMedia.innerHTML = '<img src="' + src + '" alt="' + lbTitle.textContent + ' image ' + (activeIndex + 1) + '" class="lightbox-img">';
    lbCount.textContent = (activeIndex + 1) + ' / ' + galleryImages.length;
  }

  function nextImage() {
    if (galleryImages.length === 0) return;
    activeIndex = (activeIndex + 1) % galleryImages.length;
    updateGalleryImage();
  }

  function prevImage() {
    if (galleryImages.length === 0) return;
    activeIndex = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
  }

  function closeLB() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    var v = lbMedia.querySelector('video, iframe');
    if (v) v.src = '';
    lbMedia.innerHTML = '';
    galleryImages = [];
  }

  lbClose.addEventListener('click', closeLB);
  btnPrev.addEventListener('click', function(e) { e.stopPropagation(); prevImage(); });
  btnNext.addEventListener('click', function(e) { e.stopPropagation(); nextImage(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });
  
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowRight' || e.key === 'Right') nextImage();
    if (e.key === 'ArrowLeft' || e.key === 'Left') prevImage();
  });

  document.querySelectorAll('.project-card[data-lightbox]').forEach(function (card) {
    card.addEventListener('click', function () {
      var title = (card.querySelector('.project-name')  || {}).textContent || '';
      var desc  = (card.querySelector('.project-blurb') || {}).textContent || '';
      var galleryStr = card.dataset.gallery || '';
      
      if (galleryStr) {
        var images = galleryStr.split(',');
        openLB('', title, desc, images, 0);
      } else {
        var imgEl = card.querySelector('.project-image');
        var src   = card.dataset.imgSrc || (imgEl ? imgEl.src : '');
        openLB('<img src="' + src + '" alt="' + title + '" class="lightbox-img">', title, desc);
      }
    });
  });

  document.querySelectorAll('.video-wrap[data-video]').forEach(function (wrap) {
    wrap.addEventListener('click', function () {
      var title = wrap.dataset.title || '';
      var desc  = wrap.dataset.desc  || '';
      var src   = wrap.dataset.video || '';
      var html  =
        '<video controls autoplay class="lightbox-video" style="width:min(800px,88vw)">' +
          '<source src="' + src + '" type="video/mp4">' +
        '</video>';
      openLB(html, title, desc);
    });
  });
}

/* ============================================================
   7. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    var total    = document.documentElement.scrollHeight - window.innerHeight;
    var pct      = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ============================================================
   8. COUNTER ANIMATION (stat numbers count up on scroll-in)
   ============================================================ */
function initCounters() {
  var counters = document.querySelectorAll('.stat-value');
  if (!counters.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el     = entry.target;
      var raw    = el.textContent.trim();
      var num    = parseFloat(raw.replace(/[^0-9.]/g, ''));
      var suffix = raw.replace(/[0-9.]/g, '');
      if (isNaN(num)) return;

      var duration  = 1600;
      var startTime = performance.now();

      function tick(now) {
        var elapsed  = now - startTime;
        var progress = Math.min(elapsed / duration, 1);
        /* ease-out cubic */
        var eased   = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * num) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { io.observe(c); });
}

/* ============================================================
   9. HERO PARALLAX (subtle mouse-depth)
   ============================================================ */
function initHeroParallax() {
  var title = document.querySelector('.hero-title');
  if (!title) return;

  var ticking = false;
  document.addEventListener('mousemove', function (e) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var cx = window.innerWidth  / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;
      title.style.transform = 'translate(' + (dx * 5) + 'px, ' + (dy * 3) + 'px)';
      ticking = false;
    });
  }, { passive: true });
}
