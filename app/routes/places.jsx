import { Outlet } from '@remix-run/react';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/places.css';
import cardsStyles from '~/components/cards/cards.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: cardsStyles },
  ];
};

export const meta = () => [
  {
    title: 'Kandrax - Lugares',
  },
];

function Places() {
  useTitle('Lugares');

  return <Outlet />;
}

export default Places;
