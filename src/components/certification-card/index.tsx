import React from 'react';
import { SanitizedCertification } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { FaCertificate } from 'react-icons/fa';

const ListItem = ({
  year,
  name,
  body,
  link,
}: {
  year?: React.ReactNode;
  name?: React.ReactNode;
  body?: React.ReactNode;
  link?: string;
}) => (
  <li className="mb-6 ml-4 last:mb-0 group">
    <div
      className="absolute w-3 h-3 bg-primary rounded-full border-2 border-base-100 mt-1.5 group-hover:scale-125 transition-transform duration-300"
      style={{ left: '-6.5px' }}
    ></div>
    <div className="my-0.5 text-xs text-base-content/60 font-medium uppercase tracking-wider">{year}</div>
    <div className="font-semibold text-base text-base-content group-hover:text-primary transition-colors duration-300">
      <a 
        href={link} 
        target="_blank" 
        rel="noreferrer"
        className="hover:underline"
      >
        {name}
      </a>
    </div>
    <h3 className="mt-1 font-normal text-sm text-base-content/70 leading-relaxed">{body}</h3>
  </li>
);

const CertificationCard = ({
  certifications,
  loading,
}: {
  certifications: SanitizedCertification[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          year={skeleton({
            widthCls: 'w-5/12',
            heightCls: 'h-4',
          })}
          name={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          body={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
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
            skeleton({ widthCls: 'w-8', heightCls: 'h-8', className: 'rounded-lg' })
          ) : (
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <FaCertificate className="text-lg text-primary" />
            </div>
          )}
          <h5 className="card-title text-lg">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-6' })
            ) : (
              <span className="text-base-content">Certifications</span>
            )}
          </h5>
        </div>
        <div className="text-base-content">
          <ol className="relative border-l-2 border-base-300/50 my-2 mx-2">
            {loading ? (
              renderSkeleton()
            ) : (
              <>
                {certifications.map((certification, index) => (
                  <ListItem
                    key={index}
                    year={certification.year}
                    name={certification.name}
                    body={certification.body}
                    link={certification.link}
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

export default CertificationCard;
