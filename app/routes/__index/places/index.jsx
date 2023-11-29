import { Link } from '@remix-run/react';

function PlacesMenu() {
  return (
    <>
      <Link to="list" className="menus__main-option">
        <span className="menus__option-label">Lista de Asentamientos</span>
      </Link>
      <Link to="settlement" className="menus__main-option">
        <span className="menus__option-label">Generar Asentamiento</span>
      </Link>
      <Link to="building/list" className="menus__main-option">
        <span className="menus__option-label">Lista de Edificios</span>
      </Link>
      <Link to="building/new" className="menus__main-option">
        <span className="menus__option-label">Generar Edificio</span>
      </Link>
      <Link to="generic/list" className="menus__main-option">
        <span className="menus__option-label">Lista de Lugares</span>
      </Link>
      <Link to="generic/new" className="menus__main-option">
        <span className="menus__option-label">Generar Lugar</span>
      </Link>
    </>
  );
}

export default PlacesMenu;
