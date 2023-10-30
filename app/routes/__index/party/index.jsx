import { Link } from '@remix-run/react';

import menuStyles from '~/components/menus.module.css';

function PartyMenu() {
  return (
    <>
      <Link to="new" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Nueva Party</span>
      </Link>
      <Link to="list" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Parties</span>
      </Link>
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
    </>
  );
}

export default PartyMenu;
