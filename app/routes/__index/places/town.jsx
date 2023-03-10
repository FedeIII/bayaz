import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { TOWN, getPopulation } from '~/domain/places';
import random from '~/domain/random';
import {
  COMMERCE,
  GOVERNMENTS,
  getCommerceTranslation,
  getGovernmentTranslation,
} from '~/domain/places';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

function getAccommodation() {
  const numberOfTaverns = random.invExp(...TOWN.taverns);

  return Array.from(Array(numberOfTaverns), (_, i) => 'Tavern ' + i);
}

function getGovernment() {
  return random.split(GOVERNMENTS);
}

function getSecurity(population) {
  return random.roundTo(
    10,
    random.linearUniform({
      x: TOWN.population,
      y: TOWN.security,
      t: population,
    })
  );
}

function getCommerce() {
  return random.split(COMMERCE);
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

function Town() {
  const [place, setPlace] = useState({ config: null });
  const {
    name,
    population,
    accommodation,
    government,
    security = {},
    commerce,
    religion = {},
  } = place;

  useEffect(() => {
    const population = getPopulation(TOWN);
    const accommodation = getAccommodation(population);
    const government = getGovernment();
    const security = getSecurity(population);
    const commerce = getCommerce();
    const religion = getReligion();

    setPlace((prevPlace) => ({
      ...prevPlace,
      name: 'Placeholder Name',
      population,
      accommodation,
      government,
      security,
      commerce,
      religion,
    }));
  }, [setPlace]);

  return (
    <div className={styles.container}>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>
      <div className={styles.placeSize}>Pueblo</div>
      <div className={styles.placeName}>{name}</div>
      <div className={styles.population}>Poblaci??n: ~{population}</div>
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
        Comercio: {getCommerceTranslation(commerce)}
      </div>
      <div className={styles.population}>
        Religion: {getReligionTranslation(religion)}
      </div>
    </div>
  );
}

export default Town;
