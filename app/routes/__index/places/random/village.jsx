import { useEffect, useState } from 'react';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

import {
  VILLAGE,
  getPopulation,
  randomSettlementName,
} from '~/domain/places/places';
import {
  getVillageAccommodation,
  getVillageGovernment,
  getVillageReligion,
  getVillageSecurity,
} from '~/domain/places/village';
import { createSettlement, getSettlement } from '~/services/settlements.server';
import { replaceAt } from '~/utils/insert';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

export const loader = async ({ request }) => {
  let village;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (id) {
    village = await getSettlement(id);
    if (!village) {
      throw new Error('Village not found');
    }
  }

  return json({ village, isNew: !id });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const population = formData.get('population');
  const accommodation = formData.get('accommodation');
  const guards = formData.get('guards');
  const militia = formData.get('militia');
  const temples = formData.getAll('temples[]');
  const shrines = formData.getAll('shrines[]');

  const settlement = await createSettlement({
    type: 'village',
    name,
    population: parseInt(population, 10),
    accommodation: [accommodation],
    guards: parseInt(guards || 0, 10),
    militia: parseInt(militia || 0, 10),
    temples,
    shrines,
  });

  return redirect(`?id=${settlement.id}`);
};

function Village() {
  const { village, isNew } = useLoaderData();

  const [place, setPlace] = useState({
    name: '',
    population: 0,
    accommodation: '',
    government: false,
    security: { guards: 0, militia: 0 },
    religion: { temples: [], shrines: [] },
  });

  useEffect(() => {
    if (isNew) {
      const population = getPopulation(VILLAGE);

      setPlace({
        name: randomSettlementName(),
        population,
        accommodation: getVillageAccommodation(population),
        government: getVillageGovernment(),
        security: getVillageSecurity(population),
        religion: getVillageReligion(),
      });
    } else if (isNew === false) {
      setPlace({
        name: village.name,
        population: village.population,
        accommodation: village.accommodation[0],
        government: getVillageGovernment(),
        security: { [village.securityType]: village.security },
        religion: village.religion,
      });
    }
  }, [village, isNew]);

  function onNameChange(e) {
    setPlace(p => ({ ...p, name: e.target.value }));
  }

  function onPopulationChange(e) {
    setPlace(p => ({ ...p, population: e.target.value }));
  }

  function onAccommodationChange(e) {
    setPlace(p => ({ ...p, accommodation: e.target.value }));
  }

  function onSecurityGuardsChange(e) {
    setPlace(p => ({ ...p, security: { guards: e.target.value } }));
  }

  function onSecurityMilitiaChange(e) {
    setPlace(p => ({ ...p, security: { militia: e.target.value } }));
  }

  function onTempleNameChange(i, e) {
    setPlace(p => ({
      ...p,
      religion: { temples: replaceAt(i, religion.temples, e.target.value) },
    }));
  }

  function onShrineNameChange(i, e) {
    setPlace(p => ({
      ...p,
      religion: { shrines: replaceAt(i, religion.shrines, e.target.value) },
    }));
  }

  const {
    name,
    population,
    accommodation,
    government,
    security = {},
    religion = {},
  } = place;

  return (
    <Form method="post">
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>
      <button type="submit">Guardar Aldea</button>
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
            {/* <span className={styles.titleCapital}>{name?.slice(0, 1)}</span>
            {name?.slice(1)} */}
            <input
              type="text"
              name="name"
              value={name}
              className={styles.titleInput}
              onChange={onNameChange}
            />
          </h1>

          <hr className={styles.sectionDivider} />
          <div className={styles.subtitle}>
            <span>Aldea</span>
            <span>
              <span className={styles.traitTitle}>Población:</span> ≈
              <input
                type="number"
                name="population"
                value={population}
                onChange={onPopulationChange}
                className={`${styles.traitInput} ${styles.numberInput3}`}
              />
            </span>
          </div>

          {!!accommodation && (
            <>
              <hr className={styles.sectionDivider} />
              <div className={styles.trait}>
                <span>
                  <span className={styles.traitTitle}>Alojamientos:</span>{' '}
                  <input
                    type="text"
                    name="accommodation"
                    value={accommodation}
                    onChange={onAccommodationChange}
                    className={styles.traitInput}
                  />
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
              {security.guards && (
                <span>
                  <input
                    type="number"
                    name="guards"
                    value={security.guards}
                    onChange={onSecurityGuardsChange}
                    className={`${styles.traitInput} ${styles.numberInput1}`}
                  />{' '}
                  guardias
                </span>
              )}
              {security.militia && (
                <span>
                  <input
                    type="number"
                    name="militia"
                    value={security.militia}
                    onChange={onSecurityMilitiaChange}
                    className={`${styles.traitInput} ${styles.numberInput1}`}
                  />{' '}
                  milicias
                </span>
              )}
            </span>
          </div>

          {!!(religion.temples?.length || religion.shrines?.length) && (
            <>
              <hr className={styles.sectionDivider} />
              <div className={styles.trait}>
                <span className={styles.traitTitle}>Religión:</span>{' '}
                <div className={styles.verticalSections}>
                  {!!religion.temples?.length && (
                    <ul className={styles.traitList}>
                      Templos:{' '}
                      {religion.temples.map((deityName, i) => (
                        <li key={i}>
                          <input
                            type="text"
                            name="temples[]"
                            value={deityName}
                            onChange={e => onTempleNameChange(i, e)}
                            className={styles.traitInput}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  {!!religion.shrines?.length && (
                    <ul className={styles.traitList}>
                      Santuarios:{' '}
                      {religion.shrines.map((deityName, i) => (
                        <li key={i}>
                          <input
                            type="text"
                            name="shrines[]"
                            value={deityName}
                            onChange={e => onShrineNameChange(i, e)}
                            className={styles.traitInput}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Form>
  );
}

export default Village;
