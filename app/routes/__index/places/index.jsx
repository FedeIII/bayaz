import { Link } from '@remix-run/react';

function PlacesMenu() {
  return (
    <>
      <Link to="list" className="menus__main-option">
        <span className="menus__option-label">Lista de Lugares</span>
      </Link>
      <Link to="settlement" className="menus__main-option">
        <span className="menus__option-label">Generar Asentamiento</span>
      </Link>
      <Link to="building/new" className="menus__main-option">
        <span className="menus__option-label">Generar Edificio</span>
      </Link>
    </>
  );
}

export default PlacesMenu;
