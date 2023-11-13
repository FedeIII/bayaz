import { Link } from '@remix-run/react';

function PartyMenu() {
  return (
    <>
      <Link to="new" className="menus__main-option">
        <span className="menus__option-label">Nueva Party</span>
      </Link>
      <Link to="list" className="menus__main-option">
        <span className="menus__option-label">Parties</span>
      </Link>
      <Link to="" className="menus__main-option">
        <span className="menus__option-label">/</span>
      </Link>
    </>
  );
}

export default PartyMenu;
