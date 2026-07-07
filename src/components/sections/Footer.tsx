import { SystemStatus } from '../../types';

interface FooterProps {
  systemStatus: SystemStatus;
}

export const Footer = ({ systemStatus }: FooterProps) => {
  return (
    <footer
      className="pt-8 border-t border-dashed border-zinc-800 text-xs text-zinc-400 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in-up"
      style={{ animationDelay: '0.3s' }}
    >
      <p className="font-mono">© {new Date().getFullYear()} Elia Gatti</p>
      {systemStatus?.display && (
        <div className="flex items-center gap-4 font-mono hack-badge px-4 py-2">
          <span className="hidden md:inline">
            rev: <span className="text-zinc-300">{__COMMIT_HASH__}</span>
          </span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline">
            built: <span className="text-zinc-300">{__BUILD_DATE__}</span>
          </span>
          <span className="hidden lg:inline text-zinc-600">|</span>
          <span className="hidden lg:inline">
            reg: <span className="text-zinc-300">{systemStatus.region}</span>
          </span>
          <span className="text-zinc-600">|</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-500 font-bold tracking-wide">
              SYS_NOMINAL
            </span>
          </span>
        </div>
      )}
    </footer>
  );
};
