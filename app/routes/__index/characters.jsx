import { Outlet } from '@remix-run/react';
import styles from '~/components/characters.module.css';
import { getCurrentPcPage } from '~/utils/paths';

function Characters() {
  const pcName = getCurrentPcPage();
  return (
    <div className={styles.container}>
      <Outlet key={pcName} />
    </div>
  );
}

export default Characters;
