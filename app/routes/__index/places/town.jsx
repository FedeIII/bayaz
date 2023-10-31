import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { TOWN, getPopulation } from '~/domain/places/places';
import {
  getTownAccommodation,
  getTownAccommodationTranslation,
  getTownCommerce,
  getTownGovernment,
  getTownReligion,
  getTownSecurity,
  getTownSecurityTranslation,
} from '~/domain/places/town';
import { t } from '~/domain/translations';
import { NPC_DEITIES, NPC_DEITIES_NAMES } from '~/domain/npc/attrs/npcFaith';
import random from '~/domain/random';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

function Town() {
  const [place, setPlace] = useState({});
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
    const accommodation = getTownAccommodation(population);
    const government = getTownGovernment();
    const security = getTownSecurity(population);
    const commerce = getTownCommerce();
    const religion = getTownReligion();

    setPlace(prevPlace => ({
      ...prevPlace,
      name: 'Placeholder Name',
      population,
      accommodation,
      government,
      security,
      commerce,
      religion,
    }));
  }, []);

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
            <span>Pueblo</span>
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
                  {getTownAccommodationTranslation(accommodation)}
                </span>
              </div>
            </>
          )}

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Gobierno:</span>{' '}
              {t(government)}
            </span>
          </div>

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Seguridad:</span>{' '}
              {getTownSecurityTranslation(security)}
            </span>
          </div>

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
              <span className={styles.traitTitle}>Comercio:</span> {t(commerce)}
            </span>
          </div>

          <hr className={styles.sectionDivider} />
          <div className={styles.trait}>
            <span>
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
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Town;
