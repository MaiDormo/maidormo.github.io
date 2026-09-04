interface FooterProps {
  onOpenPalette: () => void;
}

export const Footer = ({ onOpenPalette }: FooterProps) => (
  <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ink pt-6 pb-16 font-mono text-meta text-ink-3">
    <span>© {new Date().getFullYear()} Elia Gatti</span>
    <button
      type="button"
      onClick={onOpenPalette}
      className="inline-flex min-h-[44px] cursor-pointer items-center transition-colors hover:text-accent print:hidden"
    >
      <span className="hidden sm:inline">press / to jump anywhere</span>
      <span className="sm:hidden">tap to jump anywhere</span>
    </button>
  </footer>
);
