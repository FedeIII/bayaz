import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

import styles from '~/components/places.module.css';
import { CITY, getPopulation } from '~/utils/places';
import random from '~/utils/random';
import { getComerceTranslation, getGovernmentTranslation } from '~/utils/places';

function getGovernment() {
  return random.split(CITY.governments);
}

function getSecurity(population) {
  return random.roundTo(
    10,
    random.linearUniform({
      x: [CITY.minPopulation, CITY.maxPopulation],
      y: [CITY.minSecurity, CITY.maxSecurity],
      t: population,
    })
  );
}

function getComerce() {
  return random.split(CITY.comerce);
}

function getReligion() {
  return {
    temple: random.split([[33, 2], [33, 3], [33, 4]]),
    shrine: random.split([[33, 2], [33, 3], [33, 4]]),
  };
}

function getSecurityTranslation(security) {
  return security + ' guardias';
}

function getReligionTranslation(religion) {
  const { temple, shrine } = religion;

  const numberTranslationMap = {
    2: 'Dos',
    3: 'Tres',
    4: 'Cuatro',
  };

  return <>
    {!!temple && numberTranslationMap[temple] + ' templo' + (temple > 1 ? 's' : '')}
    {temple && shrine ? ' y ' : null}
    {!!shrine && numberTranslationMap[shrine] + ' santuario' + (shrine > 1 ? 's' : '')}
  </>
}

function City() {
  const [place, setPlace] = useState({ config: null });
  const {
    name,
    population,
    government,
    security = {},
    comerce,
    religion = {},
  } = place;

  useEffect(() => {
    const population = getPopulation(CITY);
    const government = getGovernment();
    const security = getSecurity(population);
    const comerce = getComerce();
    const religion = getReligion();

    setPlace((prevPlace) => ({
      ...prevPlace,
      name: 'Placeholder Name',
      population,
      government,
      security,
      comerce,
      religion,
    }));
  }, [setPlace]);

  return (
    <div className={styles.container}>
      <Link to="/places" className={styles.backButton}>
        {'<<'} Volver
      </Link>
      <div className={styles.placeSize}>Ciudad</div>
      <div className={styles.placeName}>{name}</div>
      <div className={styles.population}>Población: ~{population}</div>
      <div className={styles.population}>
        Gobierno: {getGovernmentTranslation(government)}
      </div>
      <div className={styles.population}>
        Seguridad: {getSecurityTranslation(security)}
      </div>
      <div className={styles.population}>
        Comercio: {getComerceTranslation(comerce)}
      </div>
      <div className={styles.population}>
        Religion: {getReligionTranslation(religion)}
      </div>
    </div>
  );
}

export default City;
