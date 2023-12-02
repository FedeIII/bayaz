import { Link } from '@remix-run/react';
import { useContext } from 'react';
import MenuContext from '~/components/contexts/menuContext';

export function SideBar(props) {
  const { menuItems } = props;

  const menuContext = useContext(MenuContext) || {};
  const { hasMenu } = menuContext;

  if (!hasMenu) return null;

  return (
    <div className="app__sidebar">
      {menuItems.map(button => (
        <Link
          key={button.url}
          to={button.url}
          className={`${
            button.level === 0
              ? 'app__main-button'
              : button.level === 1
              ? 'app__secondary-button'
              : 'app__tertiary-button'
          }`}
        >
          {button.name}
        </Link>
      ))}
    </div>
  );
}
