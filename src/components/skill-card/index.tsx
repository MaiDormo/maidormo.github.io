import { Fragment } from 'react';
import { SanitizedSkillCategory } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils/helpers';
import { FaTerminal, FaCode, FaServer, FaDatabase } from 'react-icons/fa';

const SkillCard = ({
  skills,
  loading,
}: {
  skills: Array<string> | Array<SanitizedSkillCategory>;
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    return (
      <div className="card shadow-lg bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="mb-4">
            {skeleton({
              widthCls: 'w-32',
              heightCls: 'h-6',
              className: 'mb-4',
            })}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  {skeleton({
                    widthCls: 'w-20',
                    heightCls: 'h-6',
                    className: 'rounded-full',
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getIconForCategory = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('language')) return <FaCode className="text-primary" />;
    if (lower.includes('framework'))
      return <FaCode className="text-secondary" />;
    if (lower.includes('infra')) return <FaServer className="text-accent" />;
    if (lower.includes('concept'))
      return <FaDatabase className="text-base-content" />;
    return <FaTerminal className="text-base-content" />;
  };

  const renderCategorizedSkills = (
    categories: Array<SanitizedSkillCategory>,
  ) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-base-100/50 p-4 rounded-lg border border-base-300 hover:border-primary/50 transition-colors"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60 mb-3 flex items-center gap-2">
              {getIconForCategory(category.category)}
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {category.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="badge badge-sm badge-outline border-base-content/20 text-base-content/90 font-mono text-xs p-2 bg-base-100 hover:bg-base-content hover:text-base-100 transition-colors cursor-default"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFlatSkills = (flatSkills: Array<string>) => (
    <div className="flex flex-wrap gap-2">
      {flatSkills.map((skill, index) => (
        <div
          key={index}
          className="badge badge-lg badge-outline border-base-content/20 text-base-content/80 p-4 font-mono hover:bg-primary hover:text-primary-content hover:border-primary transition-all cursor-default"
        >
          {skill}
        </div>
      ))}
    </div>
  );

  // Determine if skills is categorized or flat
  const isCategorized = (
    skills: Array<string> | Array<SanitizedSkillCategory>,
  ): skills is Array<SanitizedSkillCategory> => {
    return skills.length > 0 && typeof skills[0] !== 'string';
  };

  if (!loading && skills.length === 0) return null;

  return (
    <Fragment>
      <div className="card bg-base-200 shadow-xl border border-base-300">
        {/* Terminal Header */}
        <div className="bg-base-300/50 px-6 py-3 border-b border-base-300 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/20"></div>
            </div>
            <div className="text-xs font-mono text-base-content/40 flex items-center gap-2">
              <FaTerminal size={12} />
              <span className="tracking-wide">~/toolbox</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            renderSkeleton()
          ) : (
            <div>
              {isCategorized(skills)
                ? renderCategorizedSkills(skills)
                : renderFlatSkills(skills as Array<string>)}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SkillCard;
