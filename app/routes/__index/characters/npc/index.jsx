import { Link } from '@remix-run/react';

function NpcMenu() {
  return (
    <>
      <Link to="./list" className="menus__main-option">
        <span className="menus__option-label">Lista de NPCs</span>
      </Link>
      <Link to="./quick" className="menus__main-option">
        <span className="menus__option-label">Crear NPC Rápido</span>
      </Link>
      <Link to="" className="menus__main-option">
        <span className="menus__option-label">/</span>
      </Link>
    </>
  );
}

export default NpcMenu;
