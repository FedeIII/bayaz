import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import styles from "~/components/places.module.css";
import { TOWN, getPopulation } from "~/utils/places";

function Town() {
  const [place, setPlace] = useState({ config: null });

  useEffect(() => {
    setPlace((prevPlace) => ({
      ...prevPlace,
      name: "Placeholder Name",
      population: getPopulation(TOWN),
    }));
  }, [setPlace]);

  return (
    <div className={styles.container}>
      <Link to="/places" className={styles.backButton}>
        {"<<"} Volver
      </Link>
      <div className={styles.placeSize}>Pueblo</div>
      <div className={styles.placeName}>{place.name}</div>
      <div className={styles.population}>Población: ~{place.population}</div>
    </div>
  );
}

export default Town;
