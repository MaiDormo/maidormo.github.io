import { useState } from 'react';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils/helpers';
import LazyImage from '../lazy-image';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
  customBio?: string;
}

/**
 * Renders an AvatarCard component.
 * @param profile - The profile object.
 * @param loading - A boolean indicating if the profile is loading.
 * @param avatarRing - A boolean indicating if the avatar should have a ring.
 * @param resumeFileUrl - The URL of the resume file.
 * @param customBio - Optional custom bio text to override GitHub bio.
 * @returns JSX element representing the AvatarCard.
 */
const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
  customBio,
}): React.JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="card shadow-lg bg-base-100 border border-base-300 hover:border-primary/30 transition-all duration-300">
      <div className="grid place-items-center py-8">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-32 h-32">
              {skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            </div>
          </div>
        ) : (
          <div
            className="w-32 h-32 mx-auto mb-8"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="relative w-full h-full transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'rotateX(180deg)' : 'rotateX(0deg)',
              }}
            >
              {/* Front Face */}
              <div
                className={`absolute inset-0 rounded-full overflow-hidden ${
                  avatarRing
                    ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2'
                    : ''
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <LazyImage
                  src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                  alt={profile.name}
                  rest={{ className: 'w-full h-full object-cover' }}
                  placeholder={skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                />
              </div>

              {/* Back Face */}
              <div
                className={`absolute inset-0 rounded-full overflow-hidden ${
                  avatarRing
                    ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2'
                    : ''
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateX(180deg)',
                }}
              >
                <img
                  src="/other_profile_image.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl mb-3">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content">{profile.name}</span>
            )}
          </h5>
          <div className="mt-3 text-base-content/70 font-mono text-sm leading-relaxed">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : customBio || profile.bio}
          </div>
        </div>
        {resumeFileUrl &&
          (loading ? (
            <div className="mt-6">
              {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
            </div>
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              className="btn btn-primary btn-sm text-xs mt-6 gap-2 hover:scale-105 transition-transform duration-300"
              rel="noreferrer noopener"
              onClick={(e) => {
                e.preventDefault();
                window.open(resumeFileUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Resume
            </a>
          ))}
      </div>
    </div>
  );
};

export default AvatarCard;
