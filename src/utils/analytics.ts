import { hotjar } from 'react-hotjar';

export const setupHotjar = (hotjarConfig?: {
  id?: string;
  snippetVersion?: number;
}): void => {
  if (!hotjarConfig?.id) return;
  const snippetVersion = hotjarConfig?.snippetVersion || 6;
  try {
    hotjar.initialize({ id: Number(hotjarConfig.id), sv: snippetVersion });
  } catch (err) {
    // fail silently if hotjar isn't available in the env
    // console.warn('Hotjar init failed', err);
  }
};

type EventParams = { [key: string]: string };

export const ga = {
  event(action: string, params: EventParams): void {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)?.gtag('event', action, params);
    } catch (error) {
      // silent
    }
  },
};
