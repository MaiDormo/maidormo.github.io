interface DecisionProps {
  text: string;
  className?: string;
}

/** The one engineering call worth remembering, set as a serif pull quote. */
export const Decision = ({ text, className = '' }: DecisionProps) => (
  <aside className={`border-l border-accent pl-5 ${className}`}>
    <div className="mb-1 font-mono text-[10.5px] tracking-[0.14em] text-ink-3 uppercase">
      key decision
    </div>
    <p className="max-w-[56ch] font-serif text-[1.3rem] leading-snug text-ink italic text-pretty">
      {text}
    </p>
  </aside>
);
