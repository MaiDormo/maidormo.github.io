import { Fragment } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { skeleton } from '../../utils';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';

const ExternalProjectCard = ({
  externalProjects,
  header,
  loading,
}: {
  externalProjects: SanitizedExternalProject[];
  header: string;
  loading: boolean;
  googleAnalyticId?: string;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < externalProjects.length; index++) {
      array.push(
        <div
          className="card shadow-lg bg-base-100 border border-base-300 break-inside-avoid mb-6 w-full inline-block"
          key={index}
        >
          <div className="p-6 w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="flex items-start px-2">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        widthCls: 'w-32',
                        heightCls: 'h-6',
                        className: 'mb-3 mx-auto',
                      })}
                    </h2>
                    <div className="avatar w-full mb-4">
                      <div className="w-24 h-24 mask mask-squircle mx-auto">
                        {skeleton({
                          widthCls: 'w-full',
                          heightCls: 'h-full',
                          shape: '',
                        })}
                      </div>
                    </div>
                    <div className="mt-2">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto mb-2',
                      })}
                    </div>
                    <div className="mt-2 flex items-center flex-wrap justify-center">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderExternalProjects = () => {
    return externalProjects.map((item, index) => (
      <div
        className={`card shadow-lg bg-base-100 cursor-pointer border border-base-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group break-inside-avoid mb-6 w-full inline-block align-top ${
          item.featured ? ' ring-2 ring-primary/40' : ''
        }`}
        key={index}
      >
        <div className="p-6 w-full">
          {/* Screenshot/GIF */}
          {item.imageUrl && (
            <div className="mb-3 flex justify-center">
              <img
                src={item.imageUrl}
                alt={`${item.title} screenshot`}
                className="w-full h-auto max-h-60 object-cover rounded-lg border border-base-300 shadow-sm"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex items-center flex-col">
            <div className="w-full">
              <div className="px-2">
                <div className="text-center w-full">
                  
                  {/* Title Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-base-content group-hover:text-primary transition-colors duration-300 flex-1 text-left">
                      {item.title}
                      {item.featured && (
                        <span className="ml-2 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </h2>
                    {/* Icon removed from here */}
                  </div>

                  <p className="text-base-content/70 text-sm leading-relaxed text-left mb-4">
                    {item.description}
                  </p>
                  
                  {/* Tech stack */}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2 justify-start">
                      {item.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="badge badge-xs bg-primary/10 text-primary font-medium px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mb-4 list-disc pl-5 text-xs text-base-content/80 text-left">
                      {item.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}

                  {/* Demo/Code buttons */}
                  <div className="flex gap-2 justify-start">
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-xs btn-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MdOpenInNew className="text-base" />
                        Live Demo
                      </a>
                    )}
                    {item.codeUrl && (
                      <a
                        href={item.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-xs btn-outline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MdOpenInNew className="text-base" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {loading ? (
                  skeleton({
                    widthCls: 'w-12',
                    heightCls: 'h-12',
                    className: 'rounded-xl',
                  })
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl border border-primary/20">
                    <MdOpenInNew className="text-2xl text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-base-content">
                    {loading
                      ? skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                      : header}
                  </h3>
                  <div className="text-base-content/60 text-sm mt-1">
                    {loading
                      ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
                      : `${externalProjects.length} ${
                          externalProjects.length === 1 ? 'project' : 'projects'
                        }`}
                  </div>
                </div>
              </div>
            </div>
            
            {/* MOSAIC/MASONRY LAYOUT CONTAINER */}
            <div className="columns-1 md:columns-2 gap-6">
              {loading ? renderSkeleton() : renderExternalProjects()}
            </div>
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExternalProjectCard;