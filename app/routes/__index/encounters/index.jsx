import { Link } from '@remix-run/react';

function PartyEncounters() {
  return (
    <div className="menus__container">
      <Link to="random" className="menus__main-option">
        <span className="menus__option-label">Encuentro aleatorio</span>
      </Link>
      <Link to="new" className="menus__main-option">
        <span className="menus__option-label">Crear encuentro</span>
      </Link>
      <Link to="list" className="menus__main-option">
        <span className="menus__option-label">Lista de encuentros</span>
      </Link>
    </div>
  );
}

export default PartyEncounters;
