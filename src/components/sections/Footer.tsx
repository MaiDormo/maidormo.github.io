interface FooterProps {
  onOpenPalette: () => void;
}

export const Footer = ({ onOpenPalette }: FooterProps) => (
  <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ink pt-6 pb-16 font-mono text-meta text-ink-3">
    <span>© {new Date().getFullYear()} Elia Gatti</span>
    <button
      type="button"
      onClick={onOpenPalette}
      className="cursor-pointer transition-colors hover:text-accent"
    >
      press / to jump anywhere
    </button>
  </footer>
);
