import { skeleton } from '../../utils';
import { SanitizedSkillCategory } from '../../interfaces/sanitized-config';
import { FaCode } from 'react-icons/fa';

const SkillCard = ({
  loading,
  skills,
}: {
  loading: boolean;
  skills: string[] | SanitizedSkillCategory[];
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 12; index++) {
      array.push(
        <div key={index}>
          {skeleton({ widthCls: 'w-16', heightCls: 'h-4', className: 'm-1' })}
        </div>,
      );
    }

    return array;
  };

  const isBadgeFormat = (skills: string[] | SanitizedSkillCategory[]): skills is SanitizedSkillCategory[] => {
    return skills.length > 0 && typeof skills[0] === 'object' && 'category' in skills[0];
  };

  const renderBadges = () => {
    if (isBadgeFormat(skills)) {
      return skills.map((skillCategory, categoryIndex) => (
        <div key={categoryIndex} className="mb-6 last:mb-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h6 className="text-base font-semibold text-base-content">
              {skillCategory.category}
            </h6>
          </div>
          <div className="flex flex-wrap gap-2 pl-3">
            {skillCategory.badges.map((badge, badgeIndex) => (
              <div
                key={badgeIndex}
                className="transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
              >
                <img
                  src={badge}
                  alt={`${skillCategory.category} badge`}
                  className="h-7 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      ));
    } else {
      // Fallback for old string array format
      return (
        <div className="-m-1 flex flex-wrap justify-center gap-2">
          {(skills as string[]).map((skill, index) => (
            <div 
              key={index} 
              className="badge badge-primary badge-sm hover:badge-outline transition-all duration-300 hover:scale-105"
            >
              {skill}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="card shadow-lg bg-base-100 border border-base-300 hover:border-primary/30 transition-all duration-300">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-2">
          {loading ? (
            skeleton({ widthCls: 'w-8', heightCls: 'h-8', className: 'rounded-lg' })
          ) : (
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <FaCode className="text-lg text-primary" />
            </div>
          )}
          <h5 className="card-title text-lg">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-6' })
            ) : (
              <span className="text-base-content">Tech Stack</span>
            )}
          </h5>
        </div>
        <div className="pt-2">
          {loading ? (
            <div className="-m-1 flex flex-wrap justify-center gap-2">
              {renderSkeleton()}
            </div>
          ) : (
            renderBadges()
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
