import React, { Fragment } from 'react';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { MdWork } from 'react-icons/md';

const ListItem = ({
  time,
  position,
  company,
  companyLink,
  companyLogo,
  description,
  technologies,
}: {
  time: React.ReactNode;
  position?: React.ReactNode;
  company?: React.ReactNode;
  companyLink?: string;
  companyLogo?: string;
  description?: string;
  technologies?: string[];
}) => (
  <li className="mb-6 ml-4 last:mb-0 group" style={{ fontFamily: 'Montserrat, sans-serif' }}>
    <div
      className="absolute w-3 h-3 bg-primary rounded-full border-2 border-base-100 mt-1.5 group-hover:scale-110 transition-transform duration-200"
      style={{ left: '-6.5px' }}
    ></div>
    <div className="my-0.5 text-xs text-base-content/60 font-medium uppercase tracking-wider" style={{ letterSpacing: '0.08em' }}>{time}</div>
    <h3 className="font-semibold text-base text-base-content mb-2 group-hover:text-primary transition-colors duration-200">{position}</h3>
    <div className="mb-2 font-normal text-sm flex items-center gap-2">
      {companyLogo && (
        <div className="w-10 h-10 rounded-lg bg-base-200 p-1.5 flex items-center justify-center group-hover:ring-2 group-hover:ring-primary/20 transition-all duration-200">
          <img
            src={companyLogo}
            alt={`${company} logo`}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <a 
        href={companyLink} 
        target="_blank" 
        rel="noreferrer"
        className="text-base-content/80 hover:text-primary transition-colors duration-200 font-medium"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {company}
      </a>
    </div>
    {description && (
      <div className="mb-2 text-sm text-base-content/70 whitespace-pre-line" style={{ fontFamily: 'Montserrat, sans-serif' }}>{description}</div>
    )}
    {technologies && technologies.length > 0 && (
      <div className="mb-2 text-xs text-base-content/60">
        <span className="font-semibold">Technologies:</span> {technologies.join(', ')}
      </div>
    )}
  </li>
);

const ExperienceCard = ({
  experiences,
  loading,
}: {
  experiences: SanitizedExperience[];
  loading: boolean;
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
          position={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          company={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />,
      );
    }

    return array;
  };
  return (
    <div className="card bg-white border border-base-200 hover:border-primary/30 transition-all duration-200" style={{ fontFamily: 'Montserrat, sans-serif', boxShadow: '0 2px 8px rgba(44,62,80,0.03)' }}>
      <div className="card-body p-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="flex items-center gap-3 mb-3">
          {loading ? (
            skeleton({ widthCls: 'w-8', heightCls: 'h-8', className: 'rounded-lg' })
          ) : (
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <MdWork className="text-lg text-primary" />
            </div>
          )}
          <h5 className="card-title text-lg">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-6' })
            ) : (
              <span className="text-base-content">Experience</span>
            )}
          </h5>
        </div>
        <div className="text-base-content">
          <ol className="relative border-l-2 border-base-300/50 my-2 mx-2">
            {loading ? (
              renderSkeleton()
            ) : (
              <Fragment>
                {experiences.map((experience, index) => (
                  <ListItem
                    key={index}
                    time={`${experience.from} - ${experience.to}`}
                    position={experience.position}
                    company={experience.company}
                    companyLink={experience.companyLink}
                    companyLogo={experience.companyLogo}
                    description={experience.description}
                    technologies={experience.technologies}
                  />
                ))}
              </Fragment>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
