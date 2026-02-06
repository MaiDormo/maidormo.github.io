import { useState } from 'react';
// ...existing code...
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillMediumSquare,
} from 'react-icons/ai';
import { CgDribbble } from 'react-icons/cg';
import {
  FaBehanceSquare,
  FaBuilding,
  FaDev,
  FaFacebook,
  FaGlobe,
  FaLinkedin,
  FaMastodon,
  FaReddit,
  FaStackOverflow,
  FaTelegram,
  FaYoutube,
  FaStrava,
} from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';
import { RiDiscordFill, RiMailFill, RiPhoneFill } from 'react-icons/ri';
import { SiResearchgate, SiX, SiUdemy } from 'react-icons/si';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils/helpers';

type Props = {
  profile: Profile | null;
  loading: boolean;
  social: SanitizedSocial;
  github: SanitizedGithub;
  avatarRing?: boolean;
  resumeFileUrl?: string;
  customBio?: string;
};

const isCompanyMention = (company: string): boolean => {
  return company.startsWith('@') && !company.includes(' ');
};

const companyLink = (company: string): string => {
  return `https://github.com/${company.substring(1)}`;
};

const getFormattedMastodonValue = (
  mastodonValue: string,
  isLink: boolean,
): string => {
  const [username, server] = mastodonValue.split('@');

  if (isLink) {
    return `https://${server}/@${username}`;
  } else {
    return `${username}@${server}`;
  }
};

const ListItem: React.FC<{
  icon: React.ReactNode;
  link?: string;
}> = ({ icon, link }) => {
  return (
    <div className="flex items-center justify-center p-2">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-3xl md:text-4xl text-base-content/70 hover:text-primary transition-colors duration-300"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '2.5rem',
          }}
        >
          {icon}
        </a>
      ) : (
        <span
          className="text-3xl md:text-4xl text-base-content/70"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '2.5rem',
          }}
        >
          {icon}
        </span>
      )}
    </div>
  );
};

/**
 * Renders the details card component.
 *
 * @param {Object} profile - The profile object.
 * @param {boolean} loading - Indicates whether the data is loading.
 * @param {Object} social - The social object.
 * @param {Object} github - The GitHub object.
 * @return {JSX.Element} The details card component.
 */
const DetailsCard = ({
  profile,
  loading,
  social,
  github,
  avatarRing = true,
  resumeFileUrl,
  customBio,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const renderSkeleton = (): React.ReactNode[] => {
    const array = [];
    for (let index = 0; index < 4; index++) {
      array.push(
        <ListItem
          key={index}
          icon={skeleton({ widthCls: 'w-4', heightCls: 'h-4' })}
        />,
      );
    }
    return array;
  };

  // Collect all icon/link pairs
  const iconLinks: Array<{ icon: React.ReactNode; link?: string }> = [];

  if (profile?.company && isCompanyMention(profile.company.trim())) {
    iconLinks.push({
      icon: <FaBuilding />,
      link: companyLink(profile.company.trim()),
    });
  }
  if (github?.username) {
    iconLinks.push({
      icon: <AiFillGithub />,
      link: `https://github.com/${github.username}`,
    });
  }
  if (social?.researchGate) {
    iconLinks.push({
      icon: <SiResearchgate />,
      link: `https://www.researchgate.net/profile/${social.researchGate}`,
    });
  }
  if (social?.x) {
    iconLinks.push({ icon: <SiX />, link: `https://x.com/${social.x}` });
  }
  if (social?.mastodon) {
    iconLinks.push({
      icon: <FaMastodon />,
      link: getFormattedMastodonValue(social.mastodon, true),
    });
  }
  if (social?.linkedin) {
    iconLinks.push({
      icon: <FaLinkedin />,
      link: `https://www.linkedin.com/in/${social.linkedin}`,
    });
  }
  if (social?.dribbble) {
    iconLinks.push({
      icon: <CgDribbble />,
      link: `https://dribbble.com/${social.dribbble}`,
    });
  }
  if (social?.behance) {
    iconLinks.push({
      icon: <FaBehanceSquare />,
      link: `https://www.behance.net/${social.behance}`,
    });
  }
  if (social?.facebook) {
    iconLinks.push({
      icon: <FaFacebook />,
      link: `https://www.facebook.com/${social.facebook}`,
    });
  }
  if (social?.instagram) {
    iconLinks.push({
      icon: <AiFillInstagram />,
      link: `https://www.instagram.com/${social.instagram}`,
    });
  }
  if (social?.reddit) {
    iconLinks.push({
      icon: <FaReddit />,
      link: `https://www.reddit.com/user/${social.reddit}`,
    });
  }
  if (social?.threads) {
    iconLinks.push({
      icon: <FaSquareThreads />,
      link: `https://www.threads.net/@${social.threads.replace('@', '')}`,
    });
  }
  if (social?.youtube) {
    iconLinks.push({
      icon: <FaYoutube />,
      link: `https://www.youtube.com/@${social.youtube}`,
    });
  }
  if (social?.udemy) {
    iconLinks.push({
      icon: <SiUdemy />,
      link: `https://www.udemy.com/user/${social.udemy}`,
    });
  }
  if (social?.medium) {
    iconLinks.push({
      icon: <AiFillMediumSquare />,
      link: `https://medium.com/@${social.medium}`,
    });
  }
  if (social?.dev) {
    iconLinks.push({ icon: <FaDev />, link: `https://dev.to/${social.dev}` });
  }
  if (social?.stackoverflow) {
    iconLinks.push({
      icon: <FaStackOverflow />,
      link: `https://stackoverflow.com/users/${social.stackoverflow}`,
    });
  }
  if (social?.website) {
    iconLinks.push({
      icon: <FaGlobe />,
      link: !social.website.startsWith('http')
        ? `http://${social.website}`
        : social.website,
    });
  }
  if (social?.telegram) {
    iconLinks.push({
      icon: <FaTelegram />,
      link: `https://t.me/${social.telegram}`,
    });
  }
  if (social?.phone) {
    iconLinks.push({ icon: <RiPhoneFill />, link: `tel:${social.phone}` });
  }
  if (social?.email) {
    iconLinks.push({ icon: <RiMailFill />, link: `mailto:${social.email}` });
  }
  if (social?.discord) {
    iconLinks.push({
      icon: <RiDiscordFill />,
      link: `https://discord.com/app`,
    });
  }
  if (social?.strava) {
    iconLinks.push({
      icon: <FaStrava />,
      link: `https://www.strava.com/athletes/${social.strava}`,
    });
  }

  return (
    <div className="card bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-200">
      <div className="card-body p-5">
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
                    (typeof avatarRing !== 'undefined' ? avatarRing : true)
                      ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2'
                      : ''
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/fallback.png';
                    }}
                  />
                </div>

                {/* Back Face */}
                <div
                  className={`absolute inset-0 rounded-full overflow-hidden ${
                    (typeof avatarRing !== 'undefined' ? avatarRing : true)
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
                : typeof customBio !== 'undefined' && customBio
                  ? customBio
                  : profile.bio}
            </div>
          </div>
          {typeof resumeFileUrl !== 'undefined' &&
            resumeFileUrl &&
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
        <div className="flex flex-row flex-wrap gap-2 justify-center items-center mt-4">
          {loading || !profile
            ? renderSkeleton()
            : iconLinks.map((item, idx) => (
                <ListItem key={idx} icon={item.icon} link={item.link} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
