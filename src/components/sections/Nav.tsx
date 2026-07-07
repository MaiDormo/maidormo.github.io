import { useEffect, useState } from 'react';

const SECTIONS = ['projects', 'hackathons', 'background'] as const;

export const Nav = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Nothing highlighted while the hero is still in view
    const TOP_ZONE_PX = 100;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY > TOP_ZONE_PX) {
            setActiveSection(entry.target.id);
          } else if (
            !entry.isIntersecting &&
            entry.boundingClientRect.top > 0
          ) {
            // Scrolled back above this section: clear it (only if still active)
            setActiveSection((prev) => (prev === entry.target.id ? '' : prev));
          }
        }
      },
      // Active when the section crosses a band near the top of the viewport
      { rootMargin: '-15% 0px -65% 0px' },
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    const clearNearTop = () => {
      if (window.scrollY <= TOP_ZONE_PX) setActiveSection('');
    };
    window.addEventListener('scroll', clearNearTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', clearNearTop);
    };
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-0 z-50 mb-12 py-3 border-b border-zinc-800 bg-black/60 backdrop-blur-md font-mono text-sm flex flex-wrap items-center gap-3"
    >
      {SECTIONS.map((id) => {
        const isActive = activeSection === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? 'true' : undefined}
            className={`hack-badge px-3 py-1.5 transition-colors ${
              isActive
                ? 'text-emerald-400 border-emerald-500/50 bg-emerald-500/5'
                : 'text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50'
            }`}
          >
            <span className="text-emerald-500">~/</span>
            {id}
          </a>
        );
      })}
    </nav>
  );
};
