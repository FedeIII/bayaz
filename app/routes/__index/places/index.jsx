import { Link } from "@remix-run/react";

import styles from "~/components/places.module.css";

function SizeSelect() {
  return (
    <>
      <Link to="village" className={`${styles.mainOption} ${styles.village}`}>
        <span className={styles.optionLabel}>Aldea</span>
      </Link>
      <Link to="town" className={`${styles.mainOption} ${styles.town}`}>
        <span className={styles.optionLabel}>Pueblo</span>
      </Link>
      <Link to="city" className={`${styles.mainOption} ${styles.city}`}>
        <span className={styles.optionLabel}>Ciudad</span>
      </Link>
    </>
  );
}

export default SizeSelect;
