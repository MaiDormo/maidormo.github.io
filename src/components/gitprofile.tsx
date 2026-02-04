import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import '../assets/index.css';
import { getInitialTheme } from '../utils/theme';
import { setupHotjar } from '../utils/analytics';
import { getSanitizedConfig } from '../utils/sanitizer';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import ErrorPage from './error-page';
import { DEFAULT_THEMES } from '../constants/default-themes';
import { BG_COLOR } from '../constants';
import { Profile } from '../interfaces/profile';
import DetailsCard from './details-card';
import ExperienceCard from './experience-card';
import EducationCard from './education-card';
import ExternalProjectCard from './external-project-card';
import SkillCard from './skill-card';
import CertificationCard from './certification-card';
import Footer from './footer';

/**
 * Renders the GitProfile component.
 *
 * @param {Object} config - the configuration object
 * @return {JSX.Element} the rendered GitProfile component
 */
const GitProfile: React.FC<{ config: Config }> = ({ config }) => {
  // Compute the sanitized configuration once and memoize it for readability.
  // This replaces the previous pattern of using `useState` to hold a static value.
  const sanitizedConfig = useMemo<SanitizedConfig | Record<string, never>>(
    () => getSanitizedConfig(config),
    [config],
  );
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadData = useCallback(async () => {
    // Fetch user profile from GitHub and set local state.
    const fetchUserProfile = async () => {
      const response = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`,
      );
      return response.data;
    };

    try {
      setLoading(true);

      const data = await fetchUserProfile();

      setProfile({
        avatar: data.avatar_url,
        name: data.name || ' ',
        bio: data.bio || '',
        location: data.location || '',
        company: data.company || '',
      });

      if (!sanitizedConfig.projects.github.display) {
        return;
      }
    } catch (error) {
      handleError(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  }, [
    sanitizedConfig.github.username,
    sanitizedConfig.projects.github.display,
  ]);

  useEffect(() => {
    if (Object.keys(sanitizedConfig).length === 0) {
      setError(INVALID_CONFIG_ERROR);
    } else {
      setError(null);
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig, loadData]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleError = (error: AxiosError | Error): void => {
    // Centralized error handling with clearer steps and small helpers.
    console.error('Error:', error);

    const unknownError = () => setError(GENERIC_ERROR);

    // Attempt to extract rate-limit reset as a human-friendly string.
    const getResetString = (): string | null => {
      try {
        const resetHeader =
          error instanceof AxiosError
            ? error.response?.headers?.['x-ratelimit-reset']
            : undefined;
        if (!resetHeader) return null;
        return formatDistance(
          new Date(Number(resetHeader) * 1000),
          new Date(),
          { addSuffix: true },
        );
      } catch {
        return null;
      }
    };

    const setErrorByStatus = (status?: number) => {
      switch (status) {
        case 403:
          setError(setTooManyRequestError(getResetString() || ''));
          break;
        case 404:
          setError(INVALID_GITHUB_USERNAME_ERROR);
          break;
        default:
          unknownError();
          break;
      }
    };

    if (error instanceof AxiosError) {
      try {
        setErrorByStatus(error.response?.status);
      } catch {
        unknownError();
      }
    } else {
      unknownError();
    }
  };

  return (
    <div className="fade-in h-screen">
      {error ? (
        <ErrorPage
          status={error.status}
          title={error.title}
          subTitle={error.subTitle}
        />
      ) : (
        <>
          <div className={`p-4 lg:p-10 min-h-full ${BG_COLOR}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
              <div className="col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  <DetailsCard
                    profile={profile}
                    loading={loading}
                    github={sanitizedConfig.github}
                    social={sanitizedConfig.social}
                    avatarRing={sanitizedConfig.themeConfig.displayAvatarRing}
                    resumeFileUrl={sanitizedConfig.resume.fileUrl}
                    customBio={sanitizedConfig.customBio}
                  />
                  {sanitizedConfig.experiences.length !== 0 && (
                    <ExperienceCard
                      loading={loading}
                      experiences={sanitizedConfig.experiences}
                    />
                  )}

                  {sanitizedConfig.educations.length !== 0 && (
                    <EducationCard
                      loading={loading}
                      educations={sanitizedConfig.educations}
                    />
                  )}

                  {sanitizedConfig.certifications.length !== 0 && (
                    <CertificationCard
                      loading={loading}
                      certifications={sanitizedConfig.certifications}
                    />
                  )}
                </div>
              </div>
              <div className="lg:col-span-2 col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  <SkillCard
                    loading={loading}
                    skills={sanitizedConfig.skills}
                  />

                  {sanitizedConfig.projects.external.projects.length !== 0 && (
                    <ExternalProjectCard
                      loading={loading}
                      externalProjects={
                        sanitizedConfig.projects.external.projects
                      }
                    />
                  )}
                </div>
              </div>
              <Footer content={sanitizedConfig.footer} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GitProfile;
