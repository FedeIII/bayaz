import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

import random from "~/utils/random";
import styles from "~/components/places.module.css";
import { VILLAGE, getPopulation } from "~/utils/places";

const noOp = () => {};

function getVillageSecurity(population) {
  const security = {};

  const securityAmount = random.roundTo(
    1,
    random.linearUniform({
      x: [VILLAGE.minPopulation, VILLAGE.maxPopulation],
      y: [VILLAGE.minSecurity, VILLAGE.maxSecurity],
      t: population,
    })
  );

  random.split([
    [50, () => (security.guards = securityAmount)],
    [50, () => (security.militia = securityAmount)],
  ]);

  return security;
}

function getVillageReligion() {
  const religion = {
    temple: 0,
    shrine: 0,
  };
  random.split([
    [50, noOp],
    [25, () => (religion.temple += 1)],
    [25, () => (religion.shrine += 1)],
  ]);
  random.split([
    [50, noOp],
    [25, () => (religion.temple += 1)],
    [25, () => (religion.shrine += 1)],
  ]);
  return religion;
}

function Village() {
  const [place, setPlace] = useState({ config: null });
  const { name, population, government, security = {}, religion = {} } = place;

  useEffect(() => {
    const population = getPopulation(VILLAGE);
    const government = random.split([
      [50, true],
      [50, false],
    ]);
    const security = getVillageSecurity(population);
    const religion = getVillageReligion();

    setPlace((prevPlace) => ({
      ...prevPlace,
      name: "Placeholder Name",
      population,
      government,
      security,
      religion,
    }));
  }, [setPlace]);

  return (
    <div className={styles.container}>
      <Link to="/places" className={styles.backButton}>
        {"<<"} Volver
      </Link>
      <div className={styles.data}>Aldea</div>
      <div className={styles.data}>{name}</div>
      <div className={styles.data}>Población: ~{population}</div>
      <div className={styles.data}>
        Gobierno: Alguacil {!government && "no "}presente
      </div>
      <div className={styles.data}>
        <span>Seguridad: </span>
        {security.guards && <span>{security.guards} guardias</span>}
        {security.militia && <span>{security.militia} milicias</span>}
      </div>
      {!!(religion.temple || religion.shrine) && (
        <div className={styles.data}>
          Religión:{" "}
          {religion.temple === 2
            ? "Dos templos"
            : religion.temple === 1
            ? "Un templo"
            : null}
          {religion.temple && religion.shrine ? " y " : null}
          {religion.shrine === 2
            ? "Dos santuarios"
            : religion.shrine === 1
            ? "Un santuario"
            : null}
        </div>
      )}
    </div>
  );
}

export default Village;
