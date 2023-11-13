import { Link } from '@remix-run/react';

function PlacesMenu() {
  return (
    <>
      <Link to="list" className="menus__main-option">
        <span className="menus__option-label">Lista de Lugares</span>
      </Link>
      <Link to="random" className="menus__main-option">
        <span className="menus__option-label">Generar Lugar</span>
      </Link>
      <Link to="/" className="menus__main-option">
        <span className="menus__option-label">/</span>
      </Link>
    </>
  );
}

export default PlacesMenu;
