import { Fragment } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { FaFolder } from 'react-icons/fa';
import { skeleton } from '../../utils/helpers';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';

const ExternalProjectCard = ({
  externalProjects,
  loading,
}: {
  externalProjects: SanitizedExternalProject[];
  loading: boolean;
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
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-base-content group-hover:text-primary transition-colors duration-300 flex-1 text-left">
                      {item.title}
                      {item.featured && (
                        <span className="ml-2 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </h2>
                  </div>

                  <p className="text-base-content/70 text-sm leading-relaxed text-left mb-4">
                    {item.description}
                  </p>

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

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mb-4 list-disc pl-5 text-xs text-base-content/80 text-left">
                      {item.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}

                  {item.metrics && item.metrics.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2 justify-start">
                      {item.metrics.map((metric, i) => (
                        <span
                          key={i}
                          className="badge badge-xs badge-accent px-2 py-1 rounded inline-flex items-center gap-1"
                        >
                          <span
                            className="metric-dot"
                            aria-hidden="true"
                          ></span>
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.decision && (
                    <div className="mb-4 text-xs text-base-content/70 text-left">
                      <span className="font-semibold text-base-content/80">
                        Decision:
                      </span>
                      {item.decision}
                    </div>
                  )}

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
          {/* Main OS Window Header */}
          <div className="bg-base-300/50 px-6 py-3 border-b border-base-300 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/20"></div>
              </div>
              <div className="text-xs font-mono text-base-content/40 flex items-center gap-2 overflow-hidden">
                <FaFolder size={12} className="flex-shrink-0" />
                <span className="tracking-wide truncate">~/projects</span>
              </div>
            </div>
          </div>

          <div className="card-body p-6 sm:p-8">
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
