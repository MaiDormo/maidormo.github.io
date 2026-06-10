import CONFIG from '../gitprofile.config';
import { Header } from './components/sections/Header';
import { Nav } from './components/sections/Nav';
import { Projects } from './components/sections/Projects';
import { Hackathons } from './components/sections/Hackathons';
import { Background } from './components/sections/Background';
import { Footer } from './components/sections/Footer';

const App = () => {
  const {
    customBio,
    social,
    resume,
    projects,
    experiences,
    educations,
    hackathons,
    systemStatus,
  } = CONFIG;

  return (
    <div className="relative min-h-screen bg-black text-zinc-400 overflow-hidden">
      <div className="relative z-10 p-6 md:p-12 lg:p-24 max-w-4xl mx-auto">
        <Header customBio={customBio} social={social} resume={resume} />
        <Nav />
        <main>
          <Projects projects={projects} />
          <Hackathons hackathons={hackathons} />
          <Background experiences={experiences} educations={educations} />
        </main>
        <Footer systemStatus={systemStatus} />
      </div>
    </div>
  );
};

export default App;
