import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';
import App from './App.tsx';
import './assets/index.css';

// Easter egg for fellow devs — intentional, not debug output
console.log(
  '%celia@local:~$ %c./greet-visitor',
  'color:#10b981;font-family:monospace;font-size:12px;font-weight:bold',
  'color:#a1a1aa;font-family:monospace;font-size:12px',
);
console.log(
  '%cCurious? Source lives at https://github.com/MaiDormo/maidormo.github.io\nPress / (or ⌘K) on the page to jump anywhere.',
  'color:#71717a;font-family:monospace;font-size:12px',
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
