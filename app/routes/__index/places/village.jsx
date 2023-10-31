import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

import { VILLAGE, getPopulation, randomSettlementName } from '~/domain/places/places';
import {
  getVillageAccommodation,
  getVillageGovernment,
  getVillageReligion,
  getVillageReligionTranslation,
  getVillageSecurity,
} from '~/domain/places/village';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

function Village() {
  const [place, setPlace] = useState({});

  useEffect(() => {
    const population = getPopulation(VILLAGE);

    setPlace({
      name: randomSettlementName(),
      population,
      accommodation: getVillageAccommodation(population),
      government: getVillageGovernment(),
      security: getVillageSecurity(population),
      religion: getVillageReligion(),
    });
  }, []);

  const {
    name,
    population,
    accommodation,
    government,
    security = {},
    religion = {},
  } = place;

  return (
    <>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>
      <div className={styles.verticalSections}>
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
            <span>Aldea</span>
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
                  {accommodation}
                </span>
              </div>
            </>
          )}

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Gobierno:</span> Alguacil{' '}
              {!government && 'no '}presente
            </span>
          </div>

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Seguridad:</span>{' '}
              {security.guards && <span>{security.guards} guardias</span>}
              {security.militia && <span>{security.militia} milicias</span>}
            </span>
          </div>

          {!!(religion.temple || religion.shrine) && (
            <>
              <hr className={styles.sectionDivider} />
              <div className={styles.trait}>
                <span>
                  <span className={styles.traitTitle}>Religión:</span>{' '}
                  {getVillageReligionTranslation(religion)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Village;
