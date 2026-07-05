/* ============================================================
   SUMAN VERSE — main script
   Pure vanilla JavaScript. No frameworks, no Node.js.
   Galaxy canvas · Cursor glow · Scroll progress
   Counter animation · Staggered reveals · Hero parallax
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initGalaxy();
  initNav();
  initScrollReveal();
  initContactActions();
  initLightbox();
  initCursorGlow();
  initScrollProgress();
  initCounters();
  initHeroParallax();
});

/* ============================================================
   1. GALAXY STARFIELD CANVAS
   ============================================================ */
function initGalaxy() {
  var canvas = document.getElementById('galaxy-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W = canvas.width  = window.innerWidth;
  var H = canvas.height = window.innerHeight;
  var nebulaCanvas;

  window.addEventListener('resize', function () {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildNebula();
  }, { passive: true });

  /* ── Stars ── */
  var STAR_COUNT = Math.min(Math.floor((W * H) / 2800), 600);
  var stars = [];

  function Star() {
    this.reset(true);
  }

  Star.prototype.reset = function (initial) {
    this.x    = Math.random() * W;
    this.y    = initial ? Math.random() * H : -2;
    this.size = Math.random() * 1.8 + 0.2;
    this.baseOpacity = Math.random() * 0.65 + 0.15;
    this.opacity = this.baseOpacity;
    this.twinkleSpeed = Math.random() * 0.015 + 0.004;
    this.twinklePhase = Math.random() * Math.PI * 2;
    var roll = Math.random();
    var hue = roll < 0.12 ? 195 : roll < 0.22 ? 260 : 0;
    var sat = hue === 0 ? 0 : 80;
    this.color = 'hsl(' + hue + ',' + sat + '%,92%)';
  };

  Star.prototype.update = function (t) {
    this.opacity = this.baseOpacity + Math.sin(t * this.twinkleSpeed + this.twinklePhase) * (this.baseOpacity * 0.45);
  };

  Star.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.fill();
  };

  for (var i = 0; i < STAR_COUNT; i++) stars.push(new Star());

  /* ── Shooting stars ── */
  var SHOOT_MIN = 2500;
  var SHOOT_MAX = 6500;
  var nextShoot = Date.now() + randBetween(SHOOT_MIN, SHOOT_MAX);
  var shooters  = [];

  function ShootingStar() {
    this.x     = W * 0.4 + Math.random() * W * 0.6;
    this.y     = Math.random() * H * 0.4;
    var angle  = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
    var speed  = randBetween(10, 18);
    this.vx    = -Math.cos(angle) * speed;
    this.vy    =  Math.sin(angle) * speed;
    this.len   = randBetween(90, 200);
    this.life  = 1;
    this.decay = randBetween(0.02, 0.04);
    this.width = Math.random() * 1.4 + 0.5;
    this.hue   = Math.random() < 0.6 ? '0, 210, 255' : '160, 100, 255';
  }

  ShootingStar.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  };

  ShootingStar.prototype.draw = function () {
    var tail = {
      x: this.x - this.vx * (this.len / 10),
      y: this.y - this.vy * (this.len / 10)
    };
    var grad = ctx.createLinearGradient(tail.x, tail.y, this.x, this.y);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(1, 'rgba(' + this.hue + ', ' + (this.life * 0.9) + ')');
    ctx.beginPath();
    ctx.moveTo(tail.x, tail.y);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = this.width;
    ctx.globalAlpha = this.life;
    ctx.stroke();
  };

  ShootingStar.prototype.isDead = function () {
    return this.life <= 0 || this.x < -100 || this.y > H + 100;
  };

  /* ── Nebula ── */
  function buildNebula() {
    nebulaCanvas = document.createElement('canvas');
    nebulaCanvas.width  = W;
    nebulaCanvas.height = H;
    var nc = nebulaCanvas.getContext('2d');

    var blobs = [
      { cx: W * 0.15, cy: H * 0.20, r: W * 0.30, h: 210, s: 80, l: 20, a: 0.07 },
      { cx: W * 0.82, cy: H * 0.72, r: W * 0.32, h: 260, s: 65, l: 22, a: 0.06 },
      { cx: W * 0.55, cy: H * 0.45, r: W * 0.22, h: 195, s: 60, l: 28, a: 0.04 }
    ];

    blobs.forEach(function (b) {
      var g = nc.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, b.r);
      g.addColorStop(0,   'hsla(' + b.h + ',' + b.s + '%,' + b.l + '%,' + b.a + ')');
      g.addColorStop(0.5, 'hsla(' + b.h + ',' + b.s + '%,' + (b.l * 0.6) + '%,' + (b.a * 0.4) + ')');
      g.addColorStop(1,   'hsla(0,0%,0%,0)');
      nc.fillStyle = g;
      nc.fillRect(0, 0, W, H);
    });
  }

  buildNebula();

  var frame = 0;

  function tick() {
    var t = frame++;
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);

    var bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0,    '#04040e');
    bg.addColorStop(0.45, '#060610');
    bg.addColorStop(1,    '#050508');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    if (nebulaCanvas) {
      ctx.globalAlpha = 1;
      ctx.drawImage(nebulaCanvas, 0, 0);
    }

    stars.forEach(function (s) { s.update(t); s.draw(); });
    ctx.globalAlpha = 1;

    var now = Date.now();
    if (now >= nextShoot) {
      shooters.push(new ShootingStar());
      nextShoot = now + randBetween(SHOOT_MIN, SHOOT_MAX);
    }

    for (var j = shooters.length - 1; j >= 0; j--) {
      shooters[j].update();
      shooters[j].draw();
      if (shooters[j].isDead()) shooters.splice(j, 1);
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}

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
        '<div id="lb-media"></div>' +
        '<div class="lightbox-caption">' +
          '<h3 id="lb-title"></h3>' +
          '<p  id="lb-desc"></p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(lb);
  }

  var lbMedia = lb.querySelector('#lb-media');
  var lbTitle = lb.querySelector('#lb-title');
  var lbDesc  = lb.querySelector('#lb-desc');
  var lbClose = lb.querySelector('.lightbox-close');

  function openLB(html, title, desc) {
    lbMedia.innerHTML     = html;
    lbTitle.textContent   = title;
    lbDesc.textContent    = desc;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLB() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    var v = lbMedia.querySelector('video, iframe');
    if (v) v.src = '';
    lbMedia.innerHTML = '';
  }

  lbClose.addEventListener('click', closeLB);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLB();
  });

  document.querySelectorAll('.project-card[data-lightbox]').forEach(function (card) {
    card.addEventListener('click', function () {
      var imgEl = card.querySelector('.project-image');
      var src   = card.dataset.imgSrc || (imgEl ? imgEl.src : '');
      var title = (card.querySelector('.project-name')  || {}).textContent || '';
      var desc  = (card.querySelector('.project-blurb') || {}).textContent || '';
      openLB('<img src="' + src + '" alt="' + title + '" class="lightbox-img">', title, desc);
    });
  });

  document.querySelectorAll('.video-wrap[data-video]').forEach(function (wrap) {
    wrap.addEventListener('click', function () {
      var title = wrap.dataset.title || '';
      var desc  = wrap.dataset.desc  || '';
      var html  =
        '<video controls autoplay class="lightbox-video" style="width:min(800px,88vw)">' +
          '<source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">' +
        '</video>';
      openLB(html, title, desc);
    });
  });
}

/* ============================================================
   6. CURSOR GLOW ORB
   ============================================================ */
function initCursorGlow() {
  var orb = document.getElementById('cursor-glow');
  if (!orb) return;

  var mouseX = window.innerWidth  / 2;
  var mouseY = window.innerHeight / 2;
  var orbX   = mouseX;
  var orbY   = mouseY;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateOrb() {
    orbX = lerp(orbX, mouseX, 0.07);
    orbY = lerp(orbY, mouseY, 0.07);
    orb.style.left = orbX + 'px';
    orb.style.top  = orbY + 'px';
    requestAnimationFrame(animateOrb);
  }

  animateOrb();
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
