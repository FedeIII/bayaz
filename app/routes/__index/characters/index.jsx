import { Link } from '@remix-run/react';

import menuStyles from '~/components/menus.module.css';

function CharactersMenu() {
  return (
    <>
      <Link to="pc/new" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Nuevo Jugador</span>
      </Link>
      <Link to="pc/all" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Todos los Jugadores</span>
      </Link>
      <Link to="npc" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Personajes No Jugadores</span>
      </Link>
    </>
  );
}

export default CharactersMenu;
