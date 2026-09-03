import { useState } from 'react';
import CONFIG from '../gitprofile.config';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Masthead } from './components/sections/Masthead';
import { Hero } from './components/sections/Hero';
import { Work } from './components/sections/Work';
import { Projects } from './components/sections/Projects';
import { Hackathons } from './components/sections/Hackathons';
import { Background } from './components/sections/Background';
import { Footer } from './components/sections/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CommandPalette } from './components/ui/CommandPalette';

const App = () => {
  const {
    now,
    headline,
    tagline,
    social,
    resume,
    projects,
    experiences,
    educations,
    hackathons,
    skills,
  } = CONFIG;

  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div id="top" className="relative min-h-screen bg-paper text-ink">
      <ScrollProgress />
      <Masthead resume={resume} />

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <Hero
          now={now}
          headline={headline}
          tagline={tagline}
          social={social}
          resume={resume}
        />
        <main>
          <ErrorBoundary>
            <Work experiences={experiences} />
          </ErrorBoundary>
          <ErrorBoundary>
            <Projects projects={projects} />
          </ErrorBoundary>
          <ErrorBoundary>
            <Hackathons hackathons={hackathons} />
          </ErrorBoundary>
          <ErrorBoundary>
            <Background educations={educations} skills={skills} />
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
