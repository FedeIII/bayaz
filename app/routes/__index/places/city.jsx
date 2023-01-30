import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import styles from "~/components/places.module.css";
import { CITY, getPopulation } from "~/utils/places";

function City() {
  const [place, setPlace] = useState({ config: null });

  useEffect(() => {
    setPlace((prevPlace) => ({
      ...prevPlace,
      name: "Placeholder Name",
      population: getPopulation(CITY),
    }));
  }, [setPlace]);

  return (
    <div className={styles.container}>
      <Link to="/places" className={styles.backButton}>
        {"<<"} Volver
      </Link>
      <div className={styles.placeSize}>Ciudad</div>
      <div className={styles.placeName}>{place.name}</div>
      <div className={styles.population}>Población: ~{place.population}</div>
    </div>
  );
}

export default City;
