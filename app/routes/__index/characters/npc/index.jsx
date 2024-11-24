import { Link } from '@remix-run/react';

function NpcMenu() {
  return (
    <>
      <Link to="./main/list" className="menus__main-option">
        <span className="menus__option-label">Lista de NPCs</span>
      </Link>
      <Link to="./quick/list" className="menus__main-option">
        <span className="menus__option-label">Lista de NPCs Rápidos</span>
      </Link>
      <Link to="./quick" className="menus__main-option">
        <span className="menus__option-label">Crear NPC Rápido</span>
      </Link>
      <Link to="./groups" className="menus__main-option">
        <span className="menus__option-label">Grupos de NPCs</span>
      </Link>
      <Link to="./groups/new" className="menus__main-option">
        <span className="menus__option-label">Crear grupo</span>
      </Link>
    </>
  );
}

export default NpcMenu;
