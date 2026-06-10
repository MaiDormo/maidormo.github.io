import { SystemStatus } from '../../types';

interface FooterProps {
  systemStatus: SystemStatus;
}

export const Footer = ({ systemStatus }: FooterProps) => {
  return (
    <footer
      className="pt-8 border-t border-dashed border-zinc-800 text-xs text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in-up"
      style={{ animationDelay: '0.3s' }}
    >
      <p className="font-mono text-zinc-500">
        © {new Date().getFullYear()} Elia Gatti.{' '}
        <span className="hidden md:inline">SYSTEM_READY</span>
      </p>
      <div className="flex gap-4">
        {systemStatus?.display && (
          <div className="flex items-center gap-4 font-mono hack-badge px-4 py-2">
            <span className="hidden md:inline text-zinc-500">
              REG: <span className="text-zinc-400">{systemStatus.region}</span>
            </span>
            <span className="hidden md:inline text-zinc-500">
              UP: <span className="text-zinc-400">{systemStatus.uptime}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold tracking-wide">
                SYS_NOMINAL
              </span>
              <span className="w-2 h-2 bg-emerald-500 animate-blink"></span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
