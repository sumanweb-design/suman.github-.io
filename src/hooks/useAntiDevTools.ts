import { useEffect } from 'react';

export function useAntiDevTools() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      if (key === 'F12') { e.preventDefault(); return; }
      if (ctrl && shift && key === 'I') { e.preventDefault(); return; }
      if (ctrl && shift && key === 'J') { e.preventDefault(); return; }
      if (ctrl && shift && key === 'C') { e.preventDefault(); return; }
      if (ctrl && key === 'u') { e.preventDefault(); return; }
      if (ctrl && key === 's') { e.preventDefault(); return; }
      if (ctrl && key === 'a') { e.preventDefault(); return; }
      if (ctrl && key === 'p') { e.preventDefault(); return; }
    };

    const THRESHOLD = 160;
    let devToolsOpen = false;

    const detectDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const opened = widthDiff > THRESHOLD || heightDiff > THRESHOLD;

      if (opened && !devToolsOpen) {
        devToolsOpen = true;
        document.body.style.filter = 'blur(8px)';
        document.body.style.userSelect = 'none';
        document.body.style.pointerEvents = 'none';

        const overlay = document.createElement('div');
        overlay.id = 'devtools-overlay';
        overlay.style.cssText = `
          position:fixed;inset:0;z-index:999999;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          background:rgba(15,44,89,0.92);color:#fff;
          font-family:sans-serif;text-align:center;gap:12px;
          backdrop-filter:blur(4px);
        `;
        overlay.innerHTML = `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <h2 style="font-size:1.4rem;font-weight:700;margin:0">Access Restricted</h2>
          <p style="font-size:0.85rem;opacity:0.75;margin:0;max-width:280px;line-height:1.5">
            Developer tools are not permitted on this page.<br/>Please close DevTools to continue.
          </p>
        `;
        document.body.appendChild(overlay);
      }

      if (!opened && devToolsOpen) {
        devToolsOpen = false;
        document.body.style.filter = '';
        document.body.style.userSelect = '';
        document.body.style.pointerEvents = '';
        document.getElementById('devtools-overlay')?.remove();
      }
    };

    const intervalId = setInterval(detectDevTools, 1000);

    const onDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('dragstart', onDragStart);

    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('dragstart', onDragStart);
      clearInterval(intervalId);
      document.getElementById('devtools-overlay')?.remove();
      document.body.style.filter = '';
      document.body.style.userSelect = '';
      document.body.style.pointerEvents = '';
    };
  }, []);
}
