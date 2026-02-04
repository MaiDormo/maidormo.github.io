import { Fragment } from 'react';
import { SanitizedCertification } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils/helpers';
import { MdVerified } from 'react-icons/md';

const CertificationCard = ({
  certifications,
  loading,
}: {
  certifications: Array<SanitizedCertification>;
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    return (
      <div className="card shadow-lg bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                {skeleton({ widthCls: 'w-3/4', heightCls: 'h-6' })}
                {skeleton({ widthCls: 'w-1/2', heightCls: 'h-4' })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!loading && certifications.length === 0) return null;

  return (
    <Fragment>
      <div className="card bg-base-200 shadow-xl border border-base-300 p-6 mt-6">
        <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
          <MdVerified className="text-primary" />
          Certifications
        </h2>
        {loading ? (
          renderSkeleton()
        ) : (
          <div className="flex flex-col gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col border-l-2 border-primary/20 pl-4 py-1 hover:border-primary transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base-content">{cert.name}</h3>
                  {cert.year && (
                    <span className="text-xs text-base-content/60 font-mono">
                      {cert.year}
                    </span>
                  )}
                </div>
                {cert.body && (
                  <div className="text-sm text-base-content/70">
                    {cert.body}
                  </div>
                )}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary mt-1 hover:underline w-fit"
                  >
                    Verify Credential →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CertificationCard;
