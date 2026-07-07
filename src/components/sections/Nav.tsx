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
      className="sticky top-0 z-50 mb-12 border-b border-zinc-800 bg-black/70 backdrop-blur-md font-mono text-xs sm:text-sm"
    >
      <div className="flex flex-wrap items-center gap-1.5 py-2.5">
        <span className="hidden sm:inline px-2 py-1 text-emerald-400 shrink-0 select-none">
          [maidormo]
        </span>
        {SECTIONS.map((id, index) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`px-2 py-1 shrink-0 transition-colors ${
                isActive
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800'
              }`}
            >
              {index}:{id}
              {isActive ? '*' : ''}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
