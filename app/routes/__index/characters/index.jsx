import { Link } from '@remix-run/react';

import styles from '~/components/characters/characters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function CharactersMenu() {
  return (
    <>
      <Link to="pc/new" className="menus__main-option">
        <span className="menus__option-label">Nuevo Jugador</span>
      </Link>
      <Link to="pc/all" className="menus__main-option">
        <span className="menus__option-label">Todos los Jugadores</span>
      </Link>
      <Link to="npc" className="menus__main-option">
        <span className="menus__option-label">Personajes No Jugadores</span>
      </Link>
    </>
  );
}

export default CharactersMenu;
