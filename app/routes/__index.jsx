import { Link, Outlet } from '@remix-run/react';
import { useContext } from 'react';
import styles from '~/components/app.module.css';
import MenuContext from '~/components/contexts/menuContext';

export default function Index() {
  const menuContext = useContext(MenuContext) || {};
  const { menuItems, hasMenu } = menuContext;

  return (
    <div className={styles.app}>
      {hasMenu && <header className={styles.header}>Bayaz</header>}
      <div className={hasMenu ? styles.body : styles.bodyFullScreen}>
        {hasMenu && (
          <div className={styles.sidebar}>
            {menuItems.map(button => (
              <Link
                to={button.url}
                className={`${
                  button.level === 0
                    ? styles.mainButton
                    : button.level === 1
                    ? styles.secondaryButton
                    : styles.tertiaryButton
                }`}
                key={button.url}
              >
                {button.name}
              </Link>
            ))}
          </div>
        )}
        <div className={hasMenu ? styles.content : styles.contentFullScreen}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
