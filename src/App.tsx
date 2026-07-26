import { useState } from 'react';
import CONFIG from '../gitprofile.config';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/sections/Header';
import { Projects } from './components/sections/Projects';
import { Hackathons } from './components/sections/Hackathons';
import { Background } from './components/sections/Background';
import { Footer } from './components/sections/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CommandPalette } from './components/ui/CommandPalette';

const App = () => {
  const {
    customBio,
    social,
    resume,
    projects,
    experiences,
    educations,
    hackathons,
  } = CONFIG;

  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-zinc-400">
      <ScrollProgress />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 md:px-12 lg:px-16">
        <Header customBio={customBio} social={social} resume={resume} />
        <main>
          <ErrorBoundary>
            <Projects projects={projects} />
          </ErrorBoundary>
          <ErrorBoundary>
            <Hackathons hackathons={hackathons} />
          </ErrorBoundary>
          <ErrorBoundary>
            <Background experiences={experiences} educations={educations} />
          </ErrorBoundary>
        </main>
        <Footer onOpenPalette={() => setPaletteOpen(true)} />
      </div>

      <CommandPalette
        social={social}
        resume={resume}
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
      />
    </div>
  );
};

export default App;
