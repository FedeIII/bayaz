import { Outlet } from '@remix-run/react';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/places.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - Lugares',
  },
];

function Places() {
  useTitle('Lugares');

  return (
    <div className="places__container">
      <Outlet />
    </div>
  );
}

export default Places;
