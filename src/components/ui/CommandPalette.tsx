import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Config } from '../../types';

const SECTIONS = ['projects', 'hackathons', 'background'] as const;

interface CommandPaletteProps {
  social: Config['social'];
  resume: Config['resume'];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Command = { kind: string; label: string; run: () => void };

const FOCUSABLE = 'input, button, [href], [tabindex]:not([tabindex="-1"])';

/** Replaces the old fake terminal: `/` or ⌘K to jump, open, or copy. */
export const CommandPalette = ({
  social,
  resume,
  open,
  onOpenChange,
}: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery('');
  }, [onOpenChange]);

  const jump = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      close();
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 24,
          behavior: 'smooth',
        });
      }
    },
    [close],
  );

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = SECTIONS.map((id) => ({
      kind: 'goto',
      label: `~/${id}`,
      run: () => jump(id),
    }));
    list.push({
      kind: 'goto',
      label: '~/ (top)',
      run: () => {
        close();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
    list.push({
      kind: 'open',
      label: `github.com/${social.github}`,
      run: () => {
        window.open(
          `https://github.com/${social.github}`,
          '_blank',
          'noopener,noreferrer',
        );
        close();
      },
    });
    list.push({
      kind: 'open',
      label: `linkedin.com/in/${social.linkedin}`,
      run: () => {
        window.open(
          `https://linkedin.com/in/${social.linkedin}`,
          '_blank',
          'noopener,noreferrer',
        );
        close();
      },
    });
    if (social.strava) {
      list.push({
        kind: 'open',
        label: 'strava profile',
        run: () => {
          window.open(
            `https://www.strava.com/athletes/${social.strava}`,
            '_blank',
            'noopener,noreferrer',
          );
          close();
        },
      });
    }
    list.push({
      kind: 'open',
      label: 'CV (pdf)',
      run: () => {
        window.open(resume.fileUrl, '_blank', 'noopener,noreferrer');
        close();
      },
    });
    list.push({
      kind: 'copy',
      label: social.email,
      run: () => {
        navigator.clipboard?.writeText(social.email).catch(() => {});
        close();
      },
    });
    list.push({
      kind: 'mail',
      label: 'compose email',
      run: () => {
        window.location.href = `mailto:${social.email}`;
        close();
      },
    });
    return list;
  }, [social, resume, jump, close]);

  const matched = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? commands.filter((c) => `${c.kind} ${c.label}`.toLowerCase().includes(q))
      : commands;
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = /^(input|textarea)$/i.test(target?.tagName || '');
      if (e.key === 'Escape' && open) {
        close();
        return;
      }
      if (
        !open &&
        !typing &&
        (e.key === '/' ||
          ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'))
      ) {
        e.preventDefault();
        onOpenChange(true);
        setQuery('');
        return;
      }
      if (open && e.key === 'Enter' && matched[0]) {
        e.preventDefault();
        matched[0].run();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, matched, close, onOpenChange]);

  // Move focus into the dialog on open, and hand it back to the opener on close.
  useEffect(() => {
    if (open) {
      restoreFocusTo.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
      return;
    }
    restoreFocusTo.current?.focus?.();
    restoreFocusTo.current = null;
  }, [open]);

  /** Keep Tab cycling inside the dialog while it owns the screen. */
  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const nodes = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
    );
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-200 flex items-start justify-center bg-black/70 px-5 pt-[12vh] backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapFocus}
        className="w-full max-w-[520px] overflow-hidden rounded-lg border border-zinc-800 bg-[#050505]"
        style={{
          boxShadow:
            '0 24px 80px rgba(0,0,0,.9), 0 0 60px rgba(16,185,129,.06)',
        }}
      >
        <div className="flex items-center gap-2.5 border-b border-zinc-900 p-4 font-mono">
          <span aria-hidden="true" className="text-sm text-emerald-500">
            $
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="jump to, open, copy…"
            aria-label="Command"
            className="flex-1 bg-transparent text-sm text-zinc-200 outline-none"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close command palette"
            className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10.5px] text-zinc-600 transition-colors hover:text-zinc-300"
          >
            esc
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-1.5">
          {matched.map((cmd, i) => (
            <button
              key={cmd.kind + cmd.label}
              type="button"
              onClick={cmd.run}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-mono text-sm transition-colors hover:bg-zinc-900 ${
                i === 0 ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-300'
              }`}
            >
              <span className="w-12 shrink-0 text-[11px] text-zinc-700">
                {cmd.kind}
              </span>
              <span className="flex-1">{cmd.label}</span>
              {/* Enter runs the top match — only mark that row. */}
              {i === 0 && (
                <span aria-hidden="true" className="text-[11px] text-zinc-600">
                  ↵
                </span>
              )}
            </button>
          ))}
          {matched.length === 0 && (
            <div className="px-3 py-4 font-mono text-xs text-zinc-600">
              no matching command
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
