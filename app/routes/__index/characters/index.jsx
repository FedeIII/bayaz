import { Link } from '@remix-run/react';

import styles from '~/components/characters.module.css';
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
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
    </>
  );
}

export default CharactersMenu;
