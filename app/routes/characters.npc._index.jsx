import { Link } from '@remix-run/react';
import { useTitle } from '~/components/hooks/useTitle';

export const meta = () => [
  {
    title: 'Kandrax - NPCs',
  },
];

function NpcMenu() {
  useTitle('NPCs');

  return (
    <>
      <Link to="./main/list" className="menus__main-option">
        <span className="menus__option-label">Lista de NPCs</span>
      </Link>
      <Link to="./quick/list" className="menus__main-option">
        <span className="menus__option-label">Lista de NPCs Rápidos</span>
      </Link>
      <Link to="./quick/new" className="menus__main-option">
        <span className="menus__option-label">Crear NPC Rápido</span>
      </Link>
      <Link to="./groups/list" className="menus__main-option">
        <span className="menus__option-label">Grupos de NPCs</span>
      </Link>
      <Link to="./groups/new" className="menus__main-option">
        <span className="menus__option-label">Crear grupo</span>
      </Link>
    </>
  );
}

export default NpcMenu;
