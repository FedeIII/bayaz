import { useEffect, useRef, useState } from 'react';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

import {
  CITY,
  COMMERCE,
  GOVERNMENTS,
  GOVERNMENT_SITUATION,
  PLACE_CALAMITY,
  PLACE_CHARACTERISTICS,
  PLACE_KNOWN_FOR,
  RACE_RELATIONSHIPS,
  getPopulation,
  randomSettlementName,
} from '~/domain/places/places';
import {
  getCityAccommodation,
  getCityCalamity,
  getCityCommerces,
  getCityGovernment,
  getCityKnownFor,
  getCityMagicShops,
  getCityPlaceCharacteristics,
  getCityRaceRelationships,
  getCityReligion,
  getCitySecurity,
  randomCityImage,
} from '~/domain/places/city';
import { t } from '~/domain/translations';
import { replaceAt } from '~/utils/insert';
import {
  createSettlement,
  getSettlement,
  updateSettlement,
} from '~/services/settlements.server';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async ({ request }) => {
  let city;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const rng = url.searchParams.get('rng');
  let files;

  if (id) {
    city = await getSettlement(id);
    if (!city) {
      throw new Error('Village not found');
    }
  } else {
    const path = await import('path');
    const fs = await import('fs/promises');
    const publicFolderPath = path.join(
      process.cwd(),
      'public/images/places/cities/'
    );
    try {
      files = await fs.readdir(publicFolderPath);
    } catch (error) {
      files = [];
    }
  }

  return json({ city, files, isNew: !id, rng });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  const attrs = {
    type: 'city',
    name: formData.get('name'),
    img: formData.get('img'),
    population: parseInt(formData.get('population'), 10),
    accommodation: formData.getAll('accommodation[]'),
    governmentType: formData.get('governmentType'),
    governmentSituation: formData.get('governmentSituation'),
    guards: parseInt(formData.get('security') || 0, 10),
    commerces: formData.getAll('commerces[]'),
    temples: formData.getAll('temples[]'),
    shrines: formData.getAll('shrines[]'),
    magicShops: parseInt(formData.get('magicShops'), 10),
    raceRelationships: formData.get('raceRelationships'),
    placeCharacteristics: formData.get('placeCharacteristics'),
    knownFor: formData.get('knownFor'),
    calamity: formData.get('calamity'),
    notes: formData.get('notes'),
  };

  let settlement;
  if (id) {
    settlement = await updateSettlement(id, attrs);
  } else {
    settlement = await createSettlement(attrs);
  }

  return redirect(`?id=${settlement.id}`);
};

function City() {
  const { city, files, isNew, rng } = useLoaderData();

  const [showNameInput, setShowNameInput] = useState(false);
  const nameRef = useRef();
  useEffect(() => {
    if (showNameInput) {
      nameRef.current.focus();
    }
  }, [showNameInput]);

  const notesRef = useRef();
  useEffect(() => {
    if (notesRef.current) {
      textareaCallback({ target: notesRef.current });
    }
  }, [notesRef.current]);

  const [place, setPlace] = useState({
    name: '',
    img: '',
    population: 0,
    accommodation: [],
    government: [],
    security: 0,
    commerces: [],
    religion: { temples: [], shrines: [] },
    magicShops: 0,
    raceRelationships: '',
    placeCharacteristics: '',
    knownFor: '',
    calamity: '',
  });

  useEffect(() => {
    if (isNew) {
      const population = getPopulation(CITY);
      const accommodation = getCityAccommodation(population);
      const government = getCityGovernment();
      const commerces = getCityCommerces();
      const religion = getCityReligion();
      const placeCharacteristics = getCityPlaceCharacteristics();

      setPlace({
        name: randomSettlementName(),
        img: randomCityImage(
          files,
          population,
          accommodation,
          government,
          commerces,
          religion,
          placeCharacteristics
        ),
        population,
        accommodation,
        government,
        security: getCitySecurity(population),
        commerces,
        religion,
        magicShops: getCityMagicShops(population),
        raceRelationships: getCityRaceRelationships(),
        placeCharacteristics,
        knownFor: getCityKnownFor(),
        calamity: getCityCalamity(),
      });
    } else if (isNew === false) {
      setPlace({
        name: city.name,
        img: city.img,
        population: city.population,
        accommodation: city.accommodation,
        government: [city.government.type, city.government.situation],
        security: city.security,
        commerces: city.commerces,
        religion: city.religion,
        magicShops: city.magicShops,
        raceRelationships: city.raceRelationships,
        placeCharacteristics: city.placeCharacteristics,
        knownFor: city.knownFor,
        calamity: city.calamity,
        notes: city.notes,
      });
    }
  }, [city, isNew, rng]);

  function onNameChange(e) {
    setPlace(p => ({ ...p, name: e.target.value }));
  }

  function onPopulationChange(e) {
    setPlace(p => ({ ...p, population: e.target.value }));
  }

  function onAccommodationChange(i, e) {
    setPlace(p => ({
      ...p,
      accommodation: replaceAt(i, accommodation, e.target.value),
    }));
  }

  function onGovernmentTypeChange(e) {
    setPlace(p => ({
      ...p,
      government: replaceAt(0, government, e.target.value),
    }));
  }

  function onGovernmentSituationChange(e) {
    setPlace(p => ({
      ...p,
      government: replaceAt(1, government, e.target.value),
    }));
  }

  function onSecurityChange(e) {
    setPlace(p => ({ ...p, security: e.target.value }));
  }

  function onCommerceChange(i, e) {
    setPlace(p => ({
      ...p,
      commerces: replaceAt(i, p.commerces, e.target.value),
    }));
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

  function onMagicShopsChange(e) {
    setPlace(p => ({ ...p, magicShops: e.target.value }));
  }

  function onRaceRelationshipsChange(e) {
    setPlace(p => ({ ...p, raceRelationships: e.target.value }));
  }

  function onPlaceCharacteristicsChange(e) {
    setPlace(p => ({ ...p, placeCharacteristics: e.target.value }));
  }

  function onKnownForChange(e) {
    setPlace(p => ({ ...p, knownFor: e.target.value }));
  }

  function onCalamityChange(e) {
    setPlace(p => ({ ...p, calamity: e.target.value }));
  }

  function onNotesChange(e) {
    setPlace(p => ({ ...p, notes: e.target.value }));
  }

  const {
    name,
    img,
    population,
    accommodation,
    government,
    security,
    commerces,
    religion = {},
    magicShops,
    raceRelationships,
    placeCharacteristics,
    knownFor,
    calamity,
    notes,
  } = place;

  return (
    <Form method="post">
      {!!city && (
        <input readOnly type="text" name="id" value={city.id} hidden />
      )}
      <div className={styles.buttons}>
        <Link to="../" className={menuStyles.backButton}>
          ⇦ Volver
        </Link>
        <button type="submit" className={styles.save}>
          ⇧ Guardar Ciudad
        </button>
        <Link to={`./?rng=${Math.random()}`} className={menuStyles.backButton}>
          ⇩ Nueva Ciudad
        </Link>
      </div>

      <div className={styles.horizontalSections}>
        <div className={styles.verticalSections}>
          {!!img && (
            <div className={styles.imageContainer}>
              <a href={`/images/places/cities/${img}`} target="_blank">
                <img
                  src={`/images/places/cities/${img}`}
                  className={styles.image}
                  width="100%"
                />
              </a>
              <input
                readOnly
                type="text"
                name="img"
                value={`/images/places/cities/${img}`}
                hidden
              />
            </div>
          )}

          <div className={styles.info}>
            <h1 className={styles.title}>
              <span
                style={{ display: showNameInput ? 'none' : 'inline' }}
                onClick={() => setShowNameInput(true)}
              >
                <span className={styles.titleCapital}>{name?.slice(0, 1)}</span>
                {name?.slice(1)}
              </span>
              <input
                ref={nameRef}
                type="text"
                name="name"
                value={name}
                className={styles.titleInput}
                style={{ display: showNameInput ? 'inline' : 'none' }}
                onBlur={() => setShowNameInput(false)}
                onChange={onNameChange}
              />
            </h1>

            <hr className={styles.sectionDivider} />
            <div className={styles.subtitle}>
              <span>Ciudad</span>
              <span>
                <span className={styles.traitTitle}>Población:</span> ≈
                <input
                  type="number"
                  name="population"
                  value={population}
                  onChange={onPopulationChange}
                  className={`${styles.traitInput} ${styles.numberInput4}`}
                />
              </span>
            </div>

            {!!accommodation && (
              <>
                <hr className={styles.sectionDivider} />
                <div className={styles.trait}>
                  <span className={styles.traitTitle}>Alojamientos:</span>{' '}
                  <ul className={styles.traitColumns}>
                    {accommodation.map((innName, i) => (
                      <li key={innName} className={styles.traitItem}>
                        <input
                          type="text"
                          name="accommodation[]"
                          value={accommodation[i]}
                          onChange={e => onAccommodationChange(i, e)}
                          className={styles.traitInput}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <hr className={styles.sectionDivider} />
            <div className={styles.trait}>
              <span className={styles.traitTitle}>Gobierno:</span>{' '}
              <select
                type="text"
                name="governmentType"
                value={government[0]}
                onChange={onGovernmentTypeChange}
                className={styles.traitSelect}
              >
                <option value="">-</option>
                {GOVERNMENTS.map(([_, govType]) => (
                  <option key={govType} value={govType}>
                    {t(govType)}
                  </option>
                ))}
              </select>
              <select
                type="text"
                name="governmentSituation"
                value={government[1]}
                onChange={onGovernmentSituationChange}
                className={styles.traitSelect}
              >
                <option value="">-</option>
                {GOVERNMENT_SITUATION.map(([_, govSituation]) => (
                  <option key={govSituation} value={govSituation}>
                    {govSituation}
                  </option>
                ))}
              </select>
            </div>

            <hr className={styles.sectionDivider} />
            <div className={styles.traitMultiple}>
              <span className={styles.traitMultiple}>
                <span className={styles.traitTitle}>Comercio:</span>{' '}
                <div className={styles.commerceList}>
                  {commerces.map((commerce, i) => (
                    <select
                      key={i}
                      type="text"
                      name="commerces[]"
                      value={commerce}
                      onChange={e => onCommerceChange(i, e)}
                      className={styles.traitSelect}
                    >
                      <option value="">-</option>
                      {COMMERCE.map(([_, com]) => (
                        <option key={com} value={com}>
                          {t(com)}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
              </span>
              {!!magicShops && (
                <span className={styles.sharedTraitGreedy}>
                  <span className={styles.traitTitle}>Tiendas:</span>{' '}
                  <input
                    type="number"
                    name="magicShops"
                    value={magicShops}
                    onChange={onMagicShopsChange}
                    className={`${styles.traitInput} ${styles.numberInput1}`}
                  />
                </span>
              )}
              <span className={styles.sharedTraitGreedy}>
                <span className={styles.traitTitle}>Seguridad:</span>{' '}
                <input
                  type="number"
                  name="security"
                  value={security}
                  onChange={onSecurityChange}
                  className={`${styles.traitInput} ${styles.numberInput2}`}
                />{' '}
                guardias
              </span>
            </div>

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

            <hr className={styles.sectionDivider} />
            <div className={styles.trait}>
              <span>
                <span className={styles.traitTitle}>
                  Relaciones entre razas:
                </span>{' '}
                <select
                  type="text"
                  name="raceRelationships"
                  value={raceRelationships}
                  onChange={onRaceRelationshipsChange}
                  className={styles.traitSelect}
                >
                  <option value="">-</option>
                  {RACE_RELATIONSHIPS.map(([_, raceRel]) => (
                    <option key={raceRel} value={raceRel}>
                      {raceRel}
                    </option>
                  ))}
                </select>
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
                    <select
                      type="text"
                      name="placeCharacteristics"
                      value={placeCharacteristics}
                      onChange={onPlaceCharacteristicsChange}
                      className={styles.traitSelect}
                    >
                      <option value="">-</option>
                      {PLACE_CHARACTERISTICS.map(placeChar => (
                        <option key={placeChar} value={placeChar}>
                          {placeChar}
                        </option>
                      ))}
                    </select>
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
                    <select
                      type="text"
                      name="knownFor"
                      value={knownFor}
                      onChange={onKnownForChange}
                      className={styles.traitSelect}
                    >
                      <option value="">-</option>
                      {PLACE_KNOWN_FOR.map(kF => (
                        <option key={kF} value={kF}>
                          {kF}
                        </option>
                      ))}
                    </select>
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
                    <select
                      type="text"
                      name="calamity"
                      value={calamity}
                      onChange={onCalamityChange}
                      className={styles.traitSelect}
                    >
                      <option value="">-</option>
                      {PLACE_CALAMITY.map(([_, calam]) => (
                        <option key={calam} value={calam}>
                          {calam}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.notes}>
          <h2 className={styles.notesTitle}>Notas</h2>
          <textarea
            ref={notesRef}
            name="notes"
            value={notes}
            className={styles.notesText}
            onChange={onNotesChange}
            onInput={textareaCallback}
          ></textarea>
        </div>
      </div>
    </Form>
  );
}

export default City;
