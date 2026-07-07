import CONFIG from '../../../gitprofile.config';

export const DIRS = ['projects', 'hackathons', 'background'] as const;

const slugify = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Titles that normalize to the same slug get -2, -3… so no entry is silently lost
const makeUniqueSlugger = () => {
  const used = new Set<string>();
  return (title: string): string => {
    const base = slugify(title);
    let slug = base;
    let n = 2;
    while (used.has(slug)) {
      slug = `${base}-${n}`;
      n += 1;
    }
    used.add(slug);
    return slug;
  };
};

const FULL_ENTRY_HINT = '→ full entry below';

/** Virtual filesystem derived from the site config — always in sync with the page. */
export const buildFileSystem = (): Map<string, string[]> => {
  const files = new Map<string, string[]>();
  const uniqueSlug = makeUniqueSlugger();

  for (const project of CONFIG.projects) {
    files.set(
      `projects/${uniqueSlug(project.title)}.md`,
      [
        `# ${project.title}`,
        project.description ?? '',
        `tech: ${project.techStack.join(', ')}`,
        project.codeUrl ? `code: ${project.codeUrl}` : '',
        FULL_ENTRY_HINT,
      ].filter(Boolean),
    );
  }

  for (const hackathon of CONFIG.hackathons) {
    files.set(`hackathons/${uniqueSlug(hackathon.title)}.md`, [
      `# ${hackathon.title} — ${hackathon.event} (${hackathon.date})`,
      hackathon.description,
      `tech: ${hackathon.techStack.join(', ')}`,
      FULL_ENTRY_HINT,
    ]);
  }

  files.set('background/experience.md', [
    '# experience',
    ...CONFIG.experiences.map(
      (exp) => `[${exp.from} - ${exp.to}] ${exp.position} @ ${exp.company}`,
    ),
    FULL_ENTRY_HINT,
  ]);

  files.set('background/education.md', [
    '# education',
    ...CONFIG.educations.map(
      (edu) => `[${edu.from} - ${edu.to}] ${edu.degree} @ ${edu.institution}`,
    ),
    FULL_ENTRY_HINT,
  ]);

  return files;
};

export const listDir = (files: Map<string, string[]>, dir: string): string[] =>
  [...files.keys()]
    .filter((path) => path.startsWith(`${dir}/`))
    .map((path) => path.slice(dir.length + 1));
