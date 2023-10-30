import { Outlet } from '@remix-run/react';
import { getCurrentPcPage } from '~/utils/paths';

import styles from '~/components/characters/characters.module.css';

function Characters() {
  const pcName = getCurrentPcPage();
  return (
    <div className={styles.container}>
      <Outlet key={pcName} />
    </div>
  );
}

export default Characters;
