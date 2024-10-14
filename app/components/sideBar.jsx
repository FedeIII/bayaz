import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { useContext, Fragment } from 'react';
import MenuContext from '~/components/contexts/menuContext';

export function SideBar(props) {
  const { menuItems, location: staticLocation, state } = props;

  const menuContext = useContext(MenuContext) || {};
  const { hasMenu } = menuContext;

  if (!hasMenu) return null;

  let location = staticLocation;
  if (typeof window !== 'undefined') {
    const url = new URL(window?.location.href);
    location =
      url.pathname === '/'
        ? '/'
        : url.pathname[url.pathname.length - 1] === '/'
        ? url.pathname.slice(0, -1)
        : url.pathname;
  }

  return (
    <div
      className={classNames('app__sidebar', { 'app__sidebar--closed': !state })}
    >
      {state &&
        menuItems.map(menuItem => {
          const isSelected =
            (location === '/' && menuItem.url === '/') ||
            (menuItem.url !== '/' && location.includes(menuItem.url));

          return (
            <Fragment key={menuItem.pc + menuItem.name}>
              {!!menuItem.header && (
                <span className="app__button-label">{menuItem.header}</span>
              )}
              <Link
                to={menuItem.url}
                className={`app__button ${
                  menuItem.level === 0 ? 'app__main-button' : ''
                } ${
                  isSelected
                    ? menuItem.level === 0
                      ? 'app__button-selected'
                      : 'app__secondary-button app__button-selected'
                    : menuItem.level === 0
                    ? ''
                    : 'app__secondary-button'
                }`}
              >
                <span className="app__button-shadow">
                  {isSelected ? '●' : '○'} {menuItem.name}
                </span>
              </Link>
            </Fragment>
          );
        })}
      {!state &&
        menuItems
          .filter(menuItem => menuItem.collapsedIcon)
          .map(menuItem => {
            const isSelected =
              (location === '/' && menuItem.url === '/') ||
              (menuItem.url !== '/' && location.includes(menuItem.url));

            return (
              <Link
                key={menuItem.url}
                to={menuItem.url}
                className={classNames(
                  'app__button',
                  'app__secondary-button',
                  'app__button--closed-sidebar',
                  { 'app__button-selected': isSelected }
                )}
              >
                <span className="app__button-shadow app__button-shadow--closed-sidebar">
                  {menuItem.collapsedIcon}
                </span>
              </Link>
            );
          })}
    </div>
  );
}
