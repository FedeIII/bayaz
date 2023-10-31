import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { CITY, getPopulation } from '~/domain/places/places';
import {
  getCityAccommodation,
  getCityAccommodationTranslation,
  getCityCalamity,
  getCityCommerces,
  getCityGovernment,
  getCityKnownFor,
  getCityPlaceCharacteristics,
  getCityRaceRelationships,
  getCityReligion,
  getCitySecurity,
  getCitySecurityTranslation,
} from '~/domain/places/city';
import { t } from '~/domain/translations';
import { NPC_DEITIES, NPC_DEITIES_NAMES } from '~/domain/npc/attrs/npcFaith';
import random from '~/domain/random';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

function City() {
  const [place, setPlace] = useState({});
  const {
    name,
    population,
    accommodation,
    government,
    security = {},
    commerces,
    religion = {},
    raceRelationships,
    placeCharacteristics,
    knownFor,
    calamity,
  } = place;

  useEffect(() => {
    const population = getPopulation(CITY);
    const accommodation = getCityAccommodation(population);
    const government = getCityGovernment();
    const security = getCitySecurity(population);
    const commerces = getCityCommerces();
    const religion = getCityReligion();
    const raceRelationships = getCityRaceRelationships();
    const placeCharacteristics = getCityPlaceCharacteristics();
    const knownFor = getCityKnownFor();
    const calamity = getCityCalamity();

    setPlace(prevPlace => ({
      ...prevPlace,
      name: 'Placeholder Name',
      population,
      accommodation,
      government,
      security,
      commerces,
      religion,
      raceRelationships,
      placeCharacteristics,
      knownFor,
      calamity,
    }));
  }, [setPlace]);

  return (
    <>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <a href="/images/places/village/village1.png" target="_blank">
            <img
              src="/images/places/village/village1.png"
              className={styles.image}
            />
          </a>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>
            <span className={styles.titleCapital}>{name?.slice(0, 1)}</span>
            {name?.slice(1)}
          </h1>

          <hr className={styles.sectionDivider} />
          <div className={styles.subtitle}>
            <span>Ciudad</span>
            <span>
              <span className={styles.traitTitle}>Población:</span> ≈
              {population}
            </span>
          </div>

          {!!accommodation && (
            <>
              <hr className={styles.sectionDivider} />
              <div className={styles.trait}>
                <span>
                  <span className={styles.traitTitle}>Alojamientos:</span>{' '}
                  {getCityAccommodationTranslation(accommodation)}
                </span>
              </div>
            </>
          )}

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Gobierno:</span>{' '}
              {t(government?.[0])}. {government?.[1]}
            </span>
          </div>

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Seguridad:</span>{' '}
              {getCitySecurityTranslation(security)}
            </span>
          </div>

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Comercio:</span>{' '}
              {commerces?.map(t).join(', ')}
            </span>
          </div>

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span className={styles.traitTitle}>Religión:</span>{' '}
            <div className={styles.verticalSections}>
              {!!religion?.temple && (
                <ul className={styles.traitList}>
                  Templos:{' '}
                  {Array.from(Array(religion.temple), () => {
                    const deity = random.split(
                      NPC_DEITIES.filter(d => d[1] !== 'None')
                    );
                    return (
                      <li key={deity}>
                        {random.split(NPC_DEITIES_NAMES[deity])} ({t(deity)})
                      </li>
                    );
                  })}
                </ul>
              )}
              {!!religion?.shrine && (
                <ul className={styles.traitList}>
                  Santuarios:{' '}
                  {Array.from(Array(religion.shrine), () => {
                    const deity = random.split(
                      NPC_DEITIES.filter(d => d[1] !== 'None')
                    );
                    return (
                      <li key={deity}>
                        {random.split(NPC_DEITIES_NAMES[deity])} ({t(deity)})
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Relaciones entre razas:</span>{' '}
              {raceRelationships}
            </span>
          </div>

          {!!placeCharacteristics && (
            <>
              <hr className={styles.sectionDivider} />
              <div className={styles.trait}>
                <span>
                  <span className={styles.traitTitle}>
                    Características destacadas:
                  </span>{' '}
                  {placeCharacteristics}
                </span>
              </div>
            </>
          )}

          {!!knownFor && (
            <>
              <hr className={styles.sectionDivider} />
              <div className={styles.trait}>
                <span>
                  <span className={styles.traitTitle}>Conocido por:</span>{' '}
                  {knownFor}
                </span>
              </div>
            </>
          )}

          {!!calamity && (
            <>
              <hr className={styles.sectionDivider} />
              <div className={styles.trait}>
                <span>
                  <span className={styles.traitTitle}>Desgracia actual:</span>{' '}
                  {calamity}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default City;
