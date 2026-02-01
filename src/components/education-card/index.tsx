import React from 'react';
import { SanitizedEducation } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils/helpers';
import { FaGraduationCap } from 'react-icons/fa';

const ListItem = ({
  time,
  degree,
  institution,
  institutionLink,
  institutionLogo,
  score,
  description,
}: {
  time: React.ReactNode;
  degree?: React.ReactNode;
  institution?: React.ReactNode;
  institutionLink?: string;
  institutionLogo?: string;
  score?: string;
  description?: string;
}) => (
  <li className="mb-6 ml-4 last:mb-0 group">
    <div
      className="absolute w-3 h-3 bg-primary rounded-full border-2 border-base-100 mt-1.5 group-hover:scale-125 transition-transform duration-300"
      style={{ left: '-6.5px' }}
    ></div>
    <div className="my-0.5 text-xs text-base-content/60 font-medium uppercase tracking-wider">
      {time}
    </div>
    <h3 className="font-semibold text-base text-base-content mb-2 group-hover:text-primary transition-colors duration-300">
      {degree}
    </h3>
    <div className="mb-2 font-normal text-sm flex items-center gap-2">
      {institutionLogo && (
        <div className="w-10 h-10 rounded-lg bg-base-200 p-1.5 flex items-center justify-center group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-300">
          <img
            src={institutionLogo}
            alt={`${institution} logo`}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      {institutionLink ? (
        <a
          href={institutionLink}
          target="_blank"
          rel="noreferrer"
          className="text-base-content/80 hover:text-primary transition-colors duration-300 font-medium"
        >
          {institution}
        </a>
      ) : (
        <span className="text-base-content/80 font-medium">{institution}</span>
      )}
    </div>
    {score && (
      <div className="mb-2 text-sm text-base-content/70 bg-base-200/50 rounded-lg px-3 py-1.5 inline-block">
        <span className="font-semibold text-base-content">Final Score:</span>{' '}
        {score}
      </div>
    )}
    {description && (
      <div className="mt-2 text-sm text-base-content/70 leading-relaxed">
        {description}
      </div>
    )}
  </li>
);

const EducationCard = ({
  loading,
  educations,
}: {
  loading: boolean;
  educations: SanitizedEducation[];
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          time={skeleton({
            widthCls: 'w-5/12',
            heightCls: 'h-4',
          })}
          degree={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          institution={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />,
      );
    }

    return array;
  };

  return (
    <div className="card shadow-lg bg-base-100 border border-base-300 hover:border-primary/30 transition-all duration-300">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-3">
          {loading ? (
            skeleton({
              widthCls: 'w-8',
              heightCls: 'h-8',
              className: 'rounded-lg',
            })
          ) : (
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <FaGraduationCap className="text-lg text-primary" />
            </div>
          )}
          <h5 className="card-title text-lg">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-6' })
            ) : (
              <span className="text-base-content">Education</span>
            )}
          </h5>
        </div>
        <div className="text-base-content">
          <ol className="relative border-l-2 border-base-300/50 my-2 mx-2">
            {loading ? (
              renderSkeleton()
            ) : (
              <>
                {educations.map((item, index) => (
                  <ListItem
                    key={index}
                    time={`${item.from} - ${item.to}`}
                    degree={item.degree}
                    institution={item.institution}
                    institutionLink={item.institutionLink}
                    institutionLogo={item.institutionLogo}
                    score={item.score}
                    description={item.description}
                  />
                ))}
              </>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
