import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

import {
  CITY,
  getPopulation,
  randomSettlementName,
} from '~/domain/places/places';
import {
  getCityAccommodation,
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

    setPlace(prevPlace => ({
      ...prevPlace,
      name: randomSettlementName(),
      population,
      accommodation: getCityAccommodation(population),
      government: getCityGovernment(),
      security: getCitySecurity(population),
      commerces: getCityCommerces(),
      religion: getCityReligion(),
      raceRelationships: getCityRaceRelationships(),
      placeCharacteristics: getCityPlaceCharacteristics(),
      knownFor: getCityKnownFor(),
      calamity: getCityCalamity(),
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

          {!!accommodation?.length && (
            <>
              <hr className={styles.sectionDivider} />
              <div className={styles.trait}>
                <span className={styles.traitTitle}>Alojamientos:</span>{' '}
                <ul className={styles.traitColumns}>
                  {accommodation.map(innName => (
                    <li key={innName} className={styles.traitItem}>
                      {innName}
                    </li>
                  ))}
                </ul>
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
                  {Array.from(Array(religion.temple), (_, i) => {
                    const deity = random.split(
                      NPC_DEITIES.filter(d => d[1] !== 'None')
                    );
                    return (
                      <li key={i}>
                        {random.split(NPC_DEITIES_NAMES[deity])} ({t(deity)})
                      </li>
                    );
                  })}
                </ul>
              )}
              {!!religion?.shrine && (
                <ul className={styles.traitList}>
                  Santuarios:{' '}
                  {Array.from(Array(religion.shrine), (_, i) => {
                    const deity = random.split(
                      NPC_DEITIES.filter(d => d[1] !== 'None')
                    );
                    return (
                      <li key={i}>
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
