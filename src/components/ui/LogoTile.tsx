import { useState } from 'react';

interface LogoTileProps {
  /** Optional image. Prefer a self-hosted path in /public over a remote URL. */
  src?: string;
  /** Company or institution name — its initial is the fallback glyph. */
  name: string;
}

const BOX =
  'h-[34px] w-[34px] shrink-0 rounded-md border border-zinc-800 bg-zinc-950';

/**
 * Timeline badge. Falls back to a monogram when there is no logo, or when the
 * one we were given fails to load — a third-party image host going away should
 * degrade to a styled initial, not leave an empty bordered square on the page.
 */
export const LogoTile = ({ src, name }: LogoTileProps) => {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div
        aria-hidden="true"
        className={`${BOX} flex items-center justify-center font-mono text-sm font-semibold text-emerald-500/70`}
      >
        {name.trim().charAt(0).toUpperCase() || '·'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={34}
      height={34}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      className={`${BOX} object-contain`}
    />
  );
};
