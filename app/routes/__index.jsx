import { Link, Outlet } from '@remix-run/react';
import { useContext } from 'react';
import styles from '~/components/app.module.css';
import MenuContext from '~/components/contexts/menuContext';

export default function Index() {
  const menuContext = useContext(MenuContext) || {};
  const { menuItems } = menuContext;

  return (
    <div className={styles.app}>
      <header className={styles.header}>Bayaz</header>
      <div className={styles.body}>
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
              key={button.name}
            >
              {button.name}
            </Link>
          ))}
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
