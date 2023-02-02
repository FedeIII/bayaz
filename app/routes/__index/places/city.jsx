import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

import styles from '~/components/places.module.css';
import { CITY, getPopulation } from '~/utils/places';
import random from '~/utils/random';
import {
  COMMERCE,
  GOVERNMENTS,
  getCommerceTranslation,
  getGovernmentTranslation,
} from '~/utils/places';

function getAccommodation() {
  const numberOfTaverns = random.invExp(...CITY.taverns);

  return Array.from(Array(numberOfTaverns), (_, i) => 'Tavern ' + i);
}

function getGovernment() {
  return random.split(GOVERNMENTS);
}

function getSecurity(population) {
  return random.roundTo(
    10,
    random.linearUniform({
      x: CITY.population,
      y: CITY.security,
      t: population,
    })
  );
}

function getCommerces() {
  const numberOfCommerces = random.invExp(...CITY.commerces);
  const commerces = [];
  while (commerces.length < numberOfCommerces) {
    const newCommerce = random.split(COMMERCE);
    if (!commerces.includes(newCommerce)) commerces.push(newCommerce);
  }

  return commerces;
}

function getReligion() {
  return {
    temple: random.split([
      [33, 2],
      [33, 3],
      [33, 4],
    ]),
    shrine: random.split([
      [33, 2],
      [33, 3],
      [33, 4],
    ]),
  };
}

function getAccommodationTranslation(accommodation = []) {
  return accommodation.join(', ');
}

function getSecurityTranslation(security) {
  return security + ' guardias';
}

function getCommercesTranslation(commerces = []) {
  return commerces.map(getCommerceTranslation).join(', ');
}

function getReligionTranslation(religion) {
  const { temple, shrine } = religion;

  const numberTranslationMap = {
    2: 'Dos',
    3: 'Tres',
    4: 'Cuatro',
  };

  return (
    <>
      {!!temple &&
        numberTranslationMap[temple] + ' templo' + (temple > 1 ? 's' : '')}
      {temple && shrine ? ' y ' : null}
      {!!shrine &&
        numberTranslationMap[shrine] + ' santuario' + (shrine > 1 ? 's' : '')}
    </>
  );
}

function City() {
  const [place, setPlace] = useState({ config: null });
  const {
    name,
    population,
    accommodation,
    government,
    security = {},
    commerces,
    religion = {},
  } = place;

  useEffect(() => {
    const population = getPopulation(CITY);
    const accommodation = getAccommodation(population);
    const government = getGovernment();
    const security = getSecurity(population);
    const commerces = getCommerces();
    const religion = getReligion();

    setPlace((prevPlace) => ({
      ...prevPlace,
      name: 'Placeholder Name',
      population,
      accommodation,
      government,
      security,
      commerces,
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
        Alojamiento: {getAccommodationTranslation(accommodation)}
      </div>
      <div className={styles.population}>
        Gobierno: {getGovernmentTranslation(government)}
      </div>
      <div className={styles.population}>
        Seguridad: {getSecurityTranslation(security)}
      </div>
      <div className={styles.population}>
        Comercio: {getCommercesTranslation(commerces)}
      </div>
      <div className={styles.population}>
        Religion: {getReligionTranslation(religion)}
      </div>
    </div>
  );
}

export default City;
