interface FooterProps {
  onOpenPalette: () => void;
}

export const Footer = ({ onOpenPalette }: FooterProps) => (
  <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-zinc-800 pt-7 font-mono text-[11.5px] text-zinc-600">
    <span>© {new Date().getFullYear()} Elia Gatti</span>
    <button
      type="button"
      onClick={onOpenPalette}
      className="cursor-pointer text-zinc-700 transition-colors hover:text-emerald-400"
    >
      press / to jump anywhere
    </button>
  </footer>
);
