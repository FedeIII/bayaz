import { Link } from '@remix-run/react';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

function PlacesMenu() {
  return (
    <>
      <Link to="list" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Lista de Lugares</span>
      </Link>
      <Link to="random" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Generar Lugar</span>
      </Link>
      <Link to="/" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
    </>
  );
}

export default PlacesMenu;
