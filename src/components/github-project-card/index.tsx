import { Fragment } from 'react';
import { AiOutlineFork, AiOutlineStar, AiOutlineGithub } from 'react-icons/ai';
import { MdInsertLink } from 'react-icons/md';
import { ga, getLanguageColor, skeleton } from '../../utils';
import { GithubProject } from '../../interfaces/github-project';

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  googleAnalyticsId,
}: {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  googleAnalyticsId?: string;
}) => {
  if (!loading && githubProjects.length === 0) {
    return;
  }

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < limit; index++) {
      array.push(
        <div className="card shadow-lg bg-base-100 border border-base-300 hover:border-primary/30 transition-all duration-300" key={index}>
          <div className="flex justify-between flex-col p-6 h-full w-full">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span>
                  <h5 className="card-title text-lg">
                    {skeleton({
                      widthCls: 'w-32',
                      heightCls: 'h-6',
                      className: 'mb-1',
                    })}
                  </h5>
                </span>
              </div>
              <div className="mb-4 mt-2">
                {skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-4',
                  className: 'mb-2',
                })}
                {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-2' })}
                {skeleton({ widthCls: 'w-3/4', heightCls: 'h-4' })}
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-base-300">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
                <span className="flex items-center gap-1">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
              </div>
              <div>
                <span className="flex items-center gap-1">
                  {skeleton({ widthCls: 'w-16', heightCls: 'h-4' })}
                </span>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderProjects = () => {
    return githubProjects.map((item, index) => (
      <a
        className="card shadow-lg bg-base-100 cursor-pointer border border-base-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        href={item.html_url}
        key={index}
        onClick={(e) => {
          e.preventDefault();

          try {
            if (googleAnalyticsId) {
              ga.event('Click project', { project: item.name });
            }
          } catch (error) {
            console.error(error);
          }

          window?.open(item.html_url, '_blank');
        }}
      >
        <div className="flex justify-between flex-col p-6 h-full w-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="card-title text-lg tracking-wide flex text-base-content group-hover:text-primary transition-colors duration-300 items-center gap-2">
                <AiOutlineGithub className="text-xl flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </div>
              <MdInsertLink className="text-xl text-base-content/40 group-hover:text-primary group-hover:rotate-45 transition-all duration-300 flex-shrink-0" />
            </div>
            <p className="mb-4 text-base-content/70 text-sm line-clamp-3 leading-relaxed">
              {item.description || 'No description available'}
            </p>
          </div>
          <div className="flex justify-between items-center text-sm text-base-content/60 pt-4 border-t border-base-300">
            <div className="flex gap-4">
              <span className="flex items-center gap-1 hover:text-warning transition-colors">
                <AiOutlineStar className="text-base" />
                <span className="font-medium">{item.stargazers_count}</span>
              </span>
              <span className="flex items-center gap-1 hover:text-info transition-colors">
                <AiOutlineFork className="text-base" />
                <span className="font-medium">{item.forks_count}</span>
              </span>
            </div>
            {item.language && (
              <div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-200 group-hover:bg-base-300 transition-colors">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: getLanguageColor(item.language) }}
                  />
                  <span className="text-xs font-medium">{item.language}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body p-6 sm:p-8">
            {/* Enhanced Header Section */}
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
                    <AiOutlineGithub className="text-2xl text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-base-content">
                    {loading
                      ? skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
                      : header}
                  </h3>
                  <div className="text-base-content/60 text-sm mt-1">
                    {loading
                      ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
                      : `${githubProjects.length} ${githubProjects.length === 1 ? 'repository' : 'repositories'}`}
                  </div>
                </div>
              </div>
              {!loading && githubProjects.length > 0 && (
                <a
                  href={githubProjects[0]?.html_url?.split('/').slice(0, 4).join('/') || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm gap-2 hover:btn-primary transition-all duration-300"
                >
                  <AiOutlineGithub className="text-lg" />
                  <span>View All</span>
                </a>
              )}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {loading ? renderSkeleton() : renderProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GithubProjectCard;
