import { Link, Outlet } from '@remix-run/react';
import { useTitle } from '~/components/hooks/useTitle';

export const meta = () => [
  {
    title: 'Kandrax - Nuevo PC',
  },
];

function NewPC() {
  useTitle('Nuevo PC');

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <Outlet />
    </>
  );
}

export default NewPC;
