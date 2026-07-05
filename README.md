# Suman Verse Portfolio

Suman Verse is a premium, high-end personal portfolio website built with pure vanilla HTML5, CSS3, and JavaScript. The site incorporates modern UI/UX paradigms like glassmorphism, 3D card tilt physics, fluid canvas particle simulations, and a custom lightbox showreel.

---

## 🎨 Design System

- **Background:** Carbon Black (`#0B0B0B`)
- **Primary Color:** Electric Blue (`#00E5FF`)
- **Secondary Color:** Crimson Red (`#FF1744`)
- **Visual Aesthetic:** Liquid Glass + Translucent Layering (backdrop blur, subtle borders, deep glow shadows).
- **Typography:**
  - Headings: `Orbitron` (Futuristic tech style)
  - Body: `Outfit` (Clean, highly legible sans-serif)

---

## 🛠️ Features

1. **Fluid Canvas Background:** Floating organic glow particles that drift dynamically and respond gently to cursor positions.
2. **Interactive 3D Card Tilt:** Hovering over cards recalculates angles based on cursor offset and tilts the cards in 3D perspective space.
3. **Responsive Hamburger Navigation:** Translucent navigation bar that slides out a full-screen drawer menu on mobile displays.
4. **Copy-to-Clipboard Integrations:** Instantly copies Suman's email (`sumanverse95@gmail.com`) and Discord username (`vortexyrn playz`) with a custom toast notification pop-up.
5. **Video Showcase Lightbox:** Keyboard and screen-reader accessible modal layout that plays videos directly over the works gallery.
6. **SEO Setup:** Completed with Person JSON-LD schemas, OpenGraph card tags, `robots.txt`, and a structured `sitemap.xml`.

---

## 📂 File Architecture

```text
SUMAN VERSE/
├── assets/
│   ├── logo.png               # Custom generated portfolio avatar logo
│   ├── project_nebula.png     # Gallery card mock asset
│   ├── project_nova.png       # Gallery card mock asset
│   └── project_quantum.png    # Gallery card mock asset
├── index.html                 # Hero home, About, and Why Me panel
├── works.html                 # Interactive case studies and video showreel
├── contact.html               # Clipboard buttons and direct communication form
├── style.css                  # Unified CSS styles and responsiveness breakpoints
├── script.js                  # Canvas simulation, 3D card tilts, and lightbox modal logic
├── manifest.json              # Mobile standalone PWA app configurations
├── robots.txt                 # Bot indexing instructions
└── sitemap.xml                # SEO crawl layout sitemap
```

---

## 🚀 How to Run Locally

Since this project relies exclusively on vanilla technologies with no build steps or bundlers, you can run it directly:

1. Open `index.html` in any modern web browser.
2. For optimal results (canvas and dynamic features), serve it using a local HTTP server:
   - Python: `python -m http.server 8000`
   - Node: `npx serve .`
   - VS Code: Use the "Live Server" extension.
