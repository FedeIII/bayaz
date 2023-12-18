import { Link } from '@remix-run/react';
import { useContext } from 'react';
import MenuContext from '~/components/contexts/menuContext';

export function SideBar(props) {
  const { menuItems, location: staticLocation } = props;

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
    <div className="app__sidebar">
      {menuItems.map(button => {
        const isSelected =
          (location === '/' && button.url === '/') ||
          (button.url !== '/' && location.includes(button.url));

        return (
          <Link
            key={button.url}
            to={button.url}
            className={`${button.level === 0 ? 'app__main-button' : ''} ${
              isSelected
                ? button.level === 0
                  ? 'app__button-selected'
                  : 'app__secondary-button app__button-selected'
                : button.level === 0
                ? ''
                : 'app__secondary-button'
            }`}
          >
            {isSelected ? '●' : '○'} {button.name}
          </Link>
        );
      })}
    </div>
  );
}
