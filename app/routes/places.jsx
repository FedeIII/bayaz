import { Outlet } from '@remix-run/react';

import styles from '~/components/places.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function Places() {
  return (
    <div className="places__container">
      <Outlet />
    </div>
  );
}

export default Places;
