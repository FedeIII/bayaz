import { Link } from "@remix-run/react";

import styles from "~/components/places.module.css";
import menuStyles from "~/components/menus.module.css";

function SizeSelect() {
  return (
    <>
      <Link to="village" className={`${menuStyles.mainOption} ${styles.village}`}>
        <span className={menuStyles.optionLabel}>Aldea</span>
      </Link>
      <Link to="town" className={`${menuStyles.mainOption} ${styles.town}`}>
        <span className={menuStyles.optionLabel}>Pueblo</span>
      </Link>
      <Link to="city" className={`${menuStyles.mainOption} ${styles.city}`}>
        <span className={menuStyles.optionLabel}>Ciudad</span>
      </Link>
    </>
  );
}

export default SizeSelect;
