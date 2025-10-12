import { RiDice4Line } from 'react-icons/ri';
import { SanitizedThemeConfig } from '../../interfaces/sanitized-config';
import { LOCAL_STORAGE_KEY_NAME } from '../../constants';
import { skeleton } from '../../utils';
import { MouseEvent } from 'react';

/**
 * Renders a theme changer component.
 *
 * @param {Object} props - The props object.
 * @param {string} props.theme - The current theme.
 * @param {function} props.setTheme - A function to set the theme.
 * @param {boolean} props.loading - Whether the component is in a loading state.
 * @param {SanitizedThemeConfig} props.themeConfig - The theme configuration object.
 * @return {JSX.Element} The rendered theme changer component.
 */
const ThemeChanger = ({
  theme,
  setTheme,
  loading,
  themeConfig,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  themeConfig: SanitizedThemeConfig;
}) => {
  const changeTheme = (
    e: MouseEvent<HTMLAnchorElement>,
    selectedTheme: string,
  ) => {
    e.preventDefault();

    document.querySelector('html')?.setAttribute('data-theme', selectedTheme);

    typeof window !== 'undefined' &&
      localStorage.setItem(LOCAL_STORAGE_KEY_NAME, selectedTheme);

    setTheme(selectedTheme);
  };

  return (
    <div className="card overflow-visible shadow-lg bg-base-100 border border-base-300 hover:border-primary/30 transition-all duration-300">
      <div className="flex-row items-center space-x-4 flex pl-6 pr-2 py-4">
        <div className="flex-1">
          <h5 className="card-title text-lg">
            {loading ? (
              skeleton({
                widthCls: 'w-20',
                heightCls: 'h-6',
                className: 'mb-1',
              })
            ) : (
              <span className="text-base-content">Theme</span>
            )}
          </h5>
          <span className="text-base-content/60 capitalize text-sm">
            {loading
              ? skeleton({ widthCls: 'w-16', heightCls: 'h-5' })
              : theme === themeConfig.defaultTheme
                ? 'Default'
                : theme}
          </span>
        </div>
        <div className="flex-0">
          {loading ? (
            skeleton({
              widthCls: 'w-12',
              heightCls: 'h-10',
              className: 'mr-6',
            })
          ) : (
            <div title="Change Theme" className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost m-1 normal-case text-base-content/70 hover:text-primary flex items-center whitespace-nowrap transition-colors duration-300"
              >
                <RiDice4Line className="inline-block w-5 h-5 stroke-current" />
              </div>
              <div
                tabIndex={0}
                className="mt-16 overflow-y-auto shadow-2xl top-px dropdown-content max-h-96 min-w-max rounded-lg bg-base-200 border border-base-300 text-base-content z-10"
              >
                <ul className="p-4 menu menu-sm">
                  {[
                    themeConfig.defaultTheme,
                    ...themeConfig.themes.filter(
                      (item) => item !== themeConfig.defaultTheme,
                    ),
                  ].map((item, index) => (
                    <li key={index}>
                      {}
                      <a
                        onClick={(e) => changeTheme(e, item)}
                        className={`${theme === item ? 'active bg-primary/10 text-primary' : 'hover:bg-base-300'} rounded-lg transition-colors duration-300`}
                      >
                        <span className="capitalize">
                          {item === themeConfig.defaultTheme ? 'Default' : item}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeChanger;
