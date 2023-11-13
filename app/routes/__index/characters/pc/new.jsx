import { Link, Outlet } from '@remix-run/react';

function NewPC() {
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
