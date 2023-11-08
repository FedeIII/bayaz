import { useEffect, useRef, useState } from 'react';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

import {
  COMMERCE,
  GOVERNMENTS,
  GOVERNMENT_SITUATION,
  PLACE_CALAMITY,
  PLACE_CHARACTERISTICS,
  PLACE_KNOWN_FOR,
  RACE_RELATIONSHIPS,
} from '~/domain/places/places';
import { getSettlement, updateSettlement } from '~/services/settlements.server';
import { replaceAt } from '~/utils/insert';
import { t } from '~/domain/translations';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async ({ params }) => {
  let place;
  let files;
  place = await getSettlement(params.id);
  if (!place) {
    throw new Error('Village not found');
  }

  const path = await import('path');
  const fs = await import('fs/promises');
  const publicFolderPath = path.join(
    process.cwd(),
    `public/images/places/${place.type}/`
  );
  try {
    files = await fs.readdir(publicFolderPath);
  } catch (error) {
    files = [];
  }

  return json({ place, files });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  const attrs = {
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

  const settlement = await updateSettlement(id, attrs);

  return redirect(`/places/${settlement.id}`);
};

function PlaceScreen() {
  const { place, files } = useLoaderData();

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

  const [placeState, setPlaceState] = useState({
    name: '',
    img: '',
    population: 0,
    accommodation: [],
    government: [],
    securityType: undefined,
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
    setPlaceState(old => ({
      ...old,
      name: place.name,
      img: place.img,
      population: place.population,
      accommodation: place.accommodation,
      government: [place.government?.type, place.government?.situation],
      securityType: place.securityType,
      security: place.security,
      commerces: place.commerces,
      religion: place.religion,
      magicShops: place.magicShops,
      raceRelationships: place.raceRelationships,
      placeCharacteristics: place.placeCharacteristics,
      knownFor: place.knownFor,
      calamity: place.calamity,
      notes: place.notes,
    }));
  }, [place]);

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
    securityType,
    security,
    commerces,
    religion = {},
    magicShops,
    raceRelationships,
    placeCharacteristics,
    knownFor,
    calamity,
    notes,
  } = placeState;

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={place.id} hidden />
      <div className={styles.buttons}>
        <Link to="../" className={menuStyles.backButton}>
          ⇦ Volver
        </Link>
        <button type="submit" className={styles.save}>
          ⇧ Guardar
        </button>
        <Link
          to={`/places/random/${place.type}`}
          className={menuStyles.backButton}
        >
          ⇩ Nuevo
        </Link>
        <Link to={`players`} target="_blank" className={styles.save}>
          ⇨ Presentar
        </Link>
      </div>

      <div className={styles.horizontalSections}>
        <div className={styles.verticalSections}>
          {!!img && (
            <div className={styles.imageContainer}>
              <img
                src={`/images/places/${img}`}
                className={styles.image}
                width="100%"
              />
              <input readOnly type="text" name="img" value={img} hidden />
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

            {!!accommodation?.length && (
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

            {!!(government.length && government[0]) && (
              <>
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
              </>
            )}

            <hr className={styles.sectionDivider} />
            <div className={styles.traitMultiple}>
              {!!commerces?.length && (
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
              )}
              {!commerces && (
                <span>
                  <span className={styles.traitTitle}>Gobierno:</span> Alguacil{' '}
                  {Math.random() > 0.5 && 'no '}presente
                </span>
              )}
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
                {securityType === 'militia' ? 'milicias' : 'guardias'}
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

            {!!raceRelationships && (
              <>
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
              </>
            )}

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

export default PlaceScreen;
