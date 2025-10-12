import { useEffect, useState } from 'react';
import LazyImage from '../lazy-image';
import { PiNewspaper } from 'react-icons/pi';
import { getDevPost, getMediumPost } from '@arifszn/blog-js';
import { formatDistance } from 'date-fns';
import { SanitizedBlog } from '../../interfaces/sanitized-config';
import { ga, skeleton } from '../../utils';
import { Article } from '../../interfaces/article';

const BlogCard = ({
  loading,
  blog,
  googleAnalyticsId,
}: {
  loading: boolean;
  blog: SanitizedBlog;
  googleAnalyticsId?: string;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (blog.source === 'medium') {
      getMediumPost({
        user: blog.username,
      }).then((res) => {
        setArticles(res);
      });
    } else if (blog.source === 'dev') {
      getDevPost({
        user: blog.username,
      }).then((res) => {
        setArticles(res);
      });
    }
  }, [blog.source, blog.username]);

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < blog.limit; index++) {
      array.push(
        <div className="card shadow-lg bg-base-100 border border-base-300" key={index}>
          <div className="p-6 h-full w-full">
            <div className="flex items-center flex-col md:flex-row gap-4">
              <div className="avatar flex-shrink-0">
                <div className="w-24 h-24 mask mask-squircle">
                  {skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-start">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-6',
                        className: 'mb-2',
                      })}
                    </h2>
                    {skeleton({
                      widthCls: 'w-24',
                      heightCls: 'h-3',
                      className: 'mb-3',
                    })}
                    <div>
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mb-2',
                      })}
                    </div>
                    <div className="mt-3 flex items-center flex-wrap gap-2">
                      {skeleton({
                        widthCls: 'w-20',
                        heightCls: 'h-4',
                      })}
                      {skeleton({
                        widthCls: 'w-20',
                        heightCls: 'h-4',
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

  const renderArticles = () => {
    return articles && articles.length ? (
      articles.slice(0, blog.limit).map((article, index) => (
        <a
          className="card shadow-lg bg-base-100 cursor-pointer border border-base-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          key={index}
          href={article.link}
          onClick={(e) => {
            e.preventDefault();

            try {
              if (googleAnalyticsId) {
                ga.event('Click Blog Post', {
                  post: article.title,
                });
              }
            } catch (error) {
              console.error(error);
            }

            window?.open(article.link, '_blank');
          }}
        >
          <div className="p-6 h-full w-full">
            <div className="flex items-center flex-col md:flex-row gap-4">
              <div className="avatar flex-shrink-0 opacity-90">
                <div className="w-24 h-24 mask mask-squircle ring-2 ring-base-300 group-hover:ring-primary/30 transition-all duration-300">
                  <LazyImage
                    src={article.thumbnail}
                    alt={'thumbnail'}
                    placeholder={skeleton({
                      widthCls: 'w-full',
                      heightCls: 'h-full',
                      shape: '',
                    })}
                  />
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-start">
                  <div className="text-center md:text-left w-full">
                    <h2 className="font-semibold text-base text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
                      {article.title}
                    </h2>
                    <p className="text-base-content/60 text-xs mb-2">
                      📅 {formatDistance(article.publishedAt, new Date(), {
                        addSuffix: true,
                      })}
                    </p>
                    <p className="text-base-content/70 text-sm line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>
                    <div className="mt-3 flex items-center flex-wrap justify-center md:justify-start gap-2">
                      {article.categories.slice(0, 3).map((category, index2) => (
                        <div
                          className="py-1 px-3 text-xs rounded-full bg-base-200 text-base-content/70 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                          key={index2}
                        >
                          #{category}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))
    ) : (
      <div className="text-center py-12">
        <PiNewspaper className="mx-auto h-16 w-16 text-base-content/20" />
        <p className="mt-3 text-sm text-base-content/50">
          No recent posts available
        </p>
      </div>
    );
  };

  return (
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
                  <PiNewspaper className="text-2xl text-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-base-content">
                  {loading
                    ? skeleton({ widthCls: 'w-28', heightCls: 'h-8' })
                    : 'My Articles'}
                </h3>
                <div className="text-base-content/60 text-sm mt-1">
                  {loading
                    ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
                    : 'Recent blog posts'}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {loading || !articles ? renderSkeleton() : renderArticles()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
