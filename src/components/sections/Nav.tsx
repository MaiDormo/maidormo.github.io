export const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 mb-12 py-3 border-b border-zinc-800 bg-black/60 backdrop-blur-md font-mono text-sm flex flex-wrap gap-6">
      <a
        href="#projects"
        className="text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <span className="text-emerald-500">~/</span> projects
      </a>
      <a
        href="#hackathons"
        className="text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <span className="text-emerald-500">~/</span> hackathons
      </a>
      <a
        href="#background"
        className="text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <span className="text-emerald-500">~/</span> background
      </a>
    </nav>
  );
};
