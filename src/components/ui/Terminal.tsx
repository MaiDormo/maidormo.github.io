import { useEffect, useRef, useState } from 'react';
import CONFIG from '../../../gitprofile.config';
import { buildFileSystem, listDir, DIRS } from './terminal-fs';

const { social, resume } = CONFIG;
const FILES = buildFileSystem();

const PROMPT = 'elia@local:~$';
const SECTIONS = ['projects', 'hackathons', 'background'];
const COMMANDS = ['help', 'whoami', 'ls', 'cd', 'cat', 'open', 'sudo', 'clear'];
const MAX_LINES = 18;

type LineKind = 'input' | 'output' | 'error' | 'comment';

interface LineSpec {
  text: string;
  kind: LineKind;
}

// Stable ids keep React keys constant when old lines scroll off (MAX_LINES),
// so aria-live announces only new output instead of the whole transcript.
interface Line extends LineSpec {
  id: number;
}

// The session arrives with ./whoami already run — the page below is its output
const INITIAL_LINES: Line[] = [
  { id: 0, text: `${PROMPT} ./whoami`, kind: 'input' },
  { id: 1, text: '# profile rendered below ↓', kind: 'comment' },
  {
    id: 2,
    text: "# type 'help' for commands — or press / to focus",
    kind: 'comment',
  },
];

export const Terminal = () => {
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusOnSlash = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        e.key === '/' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        target?.tagName !== 'INPUT' &&
        target?.tagName !== 'TEXTAREA' &&
        !target?.isContentEditable
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', focusOnSlash);
    return () => window.removeEventListener('keydown', focusOnSlash);
  }, []);

  const nextLineId = useRef(INITIAL_LINES.length);

  const print = (entries: LineSpec[]) =>
    setLines((prev) =>
      [
        ...prev,
        ...entries.map((entry) => ({ ...entry, id: nextLineId.current++ })),
      ].slice(-MAX_LINES),
    );

  const output = (text: string): LineSpec => ({ text, kind: 'output' });
  const error = (text: string): LineSpec => ({ text, kind: 'error' });

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const echo: LineSpec = { text: `${PROMPT} ${cmd}`, kind: 'input' };
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ');
    let out: LineSpec[] = [];

    switch (name) {
      case 'help':
        out = [
          'whoami            who is this guy',
          'ls [dir]          list contents',
          'cd <section>      jump to a section',
          'cat <file>        print a file (tab completes)',
          'cat cv.pdf        open the resume',
          'open <target>     github | linkedin | email',
          'sudo hire-me      try it',
          'clear             clear terminal',
        ].map(output);
        break;
      case 'whoami':
        out = [
          'Software Engineer — GPU & HPC.',
          'Interning @ Bitmovin · M.S. CS @ University of Trento.',
        ].map(output);
        break;
      case 'ls': {
        const dir = arg.replace(/\/$/, '');
        if (!dir) {
          out = [output('projects/  hackathons/  background/  cv.pdf')];
        } else if ((DIRS as readonly string[]).includes(dir)) {
          out = [output(listDir(FILES, dir).join('  '))];
        } else if (dir === 'cv.pdf') {
          out = [output('cv.pdf')];
        } else {
          out = [
            error(`ls: cannot access '${arg}': No such file or directory`),
          ];
        }
        break;
      }
      case 'cd': {
        const target = arg.replace(/\/$/, '');
        if (SECTIONS.includes(target)) {
          document.getElementById(target)?.scrollIntoView({
            behavior: 'smooth',
          });
        } else {
          out = [error(`bash: cd: ${arg || '~'}: No such file or directory`)];
        }
        break;
      }
      case 'cat': {
        if (arg === 'cv.pdf') {
          window.open(resume.fileUrl, '_blank', 'noopener,noreferrer');
          out = [output('opening cv.pdf...')];
        } else {
          const file = FILES.get(arg.replace(/^\.\//, ''));
          out = file
            ? file.map(output)
            : [error(`cat: ${arg || ''}: No such file or directory`)];
        }
        break;
      }
      case 'open':
        if (arg === 'github') {
          window.open(
            `https://github.com/${social.github}`,
            '_blank',
            'noopener,noreferrer',
          );
          out = [output('opening github...')];
        } else if (arg === 'linkedin') {
          window.open(
            `https://linkedin.com/in/${social.linkedin}`,
            '_blank',
            'noopener,noreferrer',
          );
          out = [output('opening linkedin...')];
        } else if (arg === 'email') {
          window.location.href = `mailto:${social.email}`;
          out = [output(`composing mail to ${social.email}...`)];
        } else {
          out = [
            error(`open: unknown target '${arg}' — github | linkedin | email`),
          ];
        }
        break;
      case 'sudo':
        out =
          arg === 'hire-me'
            ? [
                output('[sudo] permission granted.'),
                output(`→ ${social.email}`),
              ]
            : [error(`sudo: ${arg || ''}: not permitted (nice try)`)];
        break;
      case 'clear':
        setLines([]);
        return;
      default:
        out = [error(`bash: ${name}: command not found — try 'help'`)];
    }
    print([echo, ...out]);
  };

  const complete = () => {
    const parts = input.split(/\s+/);
    if (parts.length <= 1) {
      const match = COMMANDS.find((c) => c.startsWith(parts[0] ?? ''));
      if (match && parts[0]) setInput(`${match} `);
      return;
    }
    const pool =
      parts[0] === 'cd'
        ? SECTIONS
        : parts[0] === 'ls'
          ? [...DIRS.map((d) => `${d}/`), 'cv.pdf']
          : parts[0] === 'cat'
            ? ['cv.pdf', ...FILES.keys()]
            : [];
    const match = pool.find((s) => s.startsWith(parts[parts.length - 1]));
    if (match) setInput(`${parts.slice(0, -1).join(' ')} ${match}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      complete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = historyIndex < 0 ? history.length - 1 : historyIndex - 1;
      if (next >= 0 && history[next] !== undefined) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex + 1;
      if (next >= history.length || historyIndex < 0) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  return (
    <div className="hack-panel rounded-md overflow-hidden mb-8 max-w-2xl font-mono text-sm">
      {/* Window title bar */}
      <div
        className="relative flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border-b border-zinc-800 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
        <span className="absolute left-1/2 -translate-x-1/2 text-xs text-zinc-500 select-none">
          elia@local: ~
        </span>
      </div>

      {/* Window body */}
      <div
        className="px-4 py-3 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div role="log" aria-live="polite">
          {lines.map((line) => (
            <div
              key={line.id}
              className={
                line.kind === 'input'
                  ? 'text-emerald-500'
                  : line.kind === 'error'
                    ? 'text-red-400/90 whitespace-pre-wrap'
                    : line.kind === 'comment'
                      ? 'text-zinc-500 whitespace-pre-wrap'
                      : 'text-zinc-400 whitespace-pre-wrap'
              }
            >
              {line.text}
            </div>
          ))}
        </div>
        <label className="flex items-center gap-2 cursor-text">
          <span className="text-emerald-500 shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Interactive terminal — type 'help' for commands"
            placeholder="type a command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent text-emerald-400 caret-emerald-500 placeholder-zinc-600 outline-none"
          />
        </label>
      </div>
    </div>
  );
};
