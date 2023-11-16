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

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const rng = url.searchParams.get('rng');
  let files;

  const path = await import('path');
  const fs = await import('fs/promises');
  const publicFolderPath = path.join(
    process.cwd(),
    'public/images/places/city/'
  );
  try {
    files = await fs.readdir(publicFolderPath);
  } catch (error) {
    files = [];
  }

  return json({ files, rng });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

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

  const settlement = await createSettlement(attrs);

  return redirect(`/places/settlement/${settlement.id}`);
};

function City() {
  const { files, rng } = useLoaderData();

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
    const population = getPopulation(CITY);
    const accommodation = getCityAccommodation(population);
    const government = getCityGovernment();
    const commerces = getCityCommerces();
    const religion = getCityReligion();
    const placeCharacteristics = getCityPlaceCharacteristics();
    const img = randomCityImage(
      files,
      population,
      accommodation,
      government,
      commerces,
      religion,
      placeCharacteristics
    );

    setPlace({
      name: randomSettlementName(),
      img,
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
  }, [rng]);

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
      <div className="places__buttons">
        <Link to="../" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar Ciudad
        </button>
        <Link to={`./?rng=${Math.random()}`} className="menus__back-button">
          ⇩ Nueva Ciudad
        </Link>
      </div>

      <div className="places__horizontal-sections">
        <div className="places__vertical-sections">
          {!!img && (
            <div className="places__image">
              <a href={`/images/places/${img}`} target="_blank">
                <img
                  src={`/images/places/${img}`}
                  className="places__image"
                  width="100%"
                />
              </a>
              <input readOnly type="text" name="img" value={img} hidden />
            </div>
          )}

          <div className="places__info">
            <Title inputName="name" value={name} onChange={onNameChange} />

            <hr className="places__section-divider" />
            <div className="places__subtitle">
              <span>Ciudad</span>
              <span>
                <span className="places__trait-title">Población:</span> ≈
                <input
                  type="number"
                  name="population"
                  value={population}
                  onChange={onPopulationChange}
                  className="places__trait-input places__trait-input--number-4"
                />
              </span>
            </div>

            {!!accommodation && (
              <>
                <hr className="places__section-divider" />
                <div className="places__trait">
                  <span className="places__trait-title">Alojamientos:</span>{' '}
                  <ul className="places__trait-columns">
                    {accommodation.map((innName, i) => (
                      <li key={innName} className="places__trait-item">
                        <input
                          type="text"
                          name="accommodation[]"
                          value={accommodation[i]}
                          onChange={e => onAccommodationChange(i, e)}
                          className="places__trait-input"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <hr className="places__section-divider" />
            <div className="places__trait">
              <span className="places__trait-title">Gobierno:</span>{' '}
              <select
                type="text"
                name="governmentType"
                value={government[0]}
                onChange={onGovernmentTypeChange}
                className="places__trait-select"
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
                className="places__trait-select"
              >
                <option value="">-</option>
                {GOVERNMENT_SITUATION.map(([_, govSituation]) => (
                  <option key={govSituation} value={govSituation}>
                    {govSituation}
                  </option>
                ))}
              </select>
            </div>

            <hr className="places__section-divider" />
            <div className="places__trait-multiple">
              <span className="places__trait-multiple">
                <span className="places__trait-title">Comercio:</span>{' '}
                <div className="places__commerce-list">
                  {commerces.map((commerce, i) => (
                    <select
                      key={i}
                      type="text"
                      name="commerces[]"
                      value={commerce}
                      onChange={e => onCommerceChange(i, e)}
                      className="places__trait-select"
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
                <span className="places__shared-trait-greedy">
                  <span className="places__trait-title">Tiendas:</span>{' '}
                  <input
                    type="number"
                    name="magicShops"
                    value={magicShops}
                    onChange={onMagicShopsChange}
                    className="places__trait-input places__trait-input--number-1"
                  />
                </span>
              )}
              <span className="places__shared-trait-greedy">
                <span className="places__trait-title">Seguridad:</span>{' '}
                <input
                  type="number"
                  name="security"
                  value={security}
                  onChange={onSecurityChange}
                  className="places__trait-input places__trait-input--number-2"
                />{' '}
                guardias
              </span>
            </div>

            <hr className="places__section-divider" />
            <div className="places__trait">
              <span className="places__trait-title">Religión:</span>{' '}
              <div className="places__vertical-sections">
                {!!religion.temples?.length && (
                  <ul className="places__trait-list">
                    Templos:{' '}
                    {religion.temples.map((deityName, i) => (
                      <li key={i}>
                        <input
                          type="text"
                          name="temples[]"
                          value={deityName}
                          onChange={e => onTempleNameChange(i, e)}
                          className="places__trait-input"
                        />
                      </li>
                    ))}
                  </ul>
                )}
                {!!religion.shrines?.length && (
                  <ul className="places__trait-list">
                    Santuarios:{' '}
                    {religion.shrines.map((deityName, i) => (
                      <li key={i}>
                        <input
                          type="text"
                          name="shrines[]"
                          value={deityName}
                          onChange={e => onShrineNameChange(i, e)}
                          className="places__trait-input"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <hr className="places__section-divider" />
            <div className="places__trait">
              <span>
                <span className="places__trait-title">
                  Relaciones entre razas:
                </span>{' '}
                <select
                  type="text"
                  name="raceRelationships"
                  value={raceRelationships}
                  onChange={onRaceRelationshipsChange}
                  className="places__trait-select"
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
                <hr className="places__section-divider" />
                <div className="places__trait">
                  <span>
                    <span className="places__trait-title">
                      Características destacadas:
                    </span>{' '}
                    <select
                      type="text"
                      name="placeCharacteristics"
                      value={placeCharacteristics}
                      onChange={onPlaceCharacteristicsChange}
                      className="places__trait-select"
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
                <hr className="places__section-divider" />
                <div className="places__trait">
                  <span>
                    <span className="places__trait-title">Conocido por:</span>{' '}
                    <select
                      type="text"
                      name="knownFor"
                      value={knownFor}
                      onChange={onKnownForChange}
                      className="places__trait-select"
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
                <hr className="places__section-divider" />
                <div className="places__trait">
                  <span>
                    <span className="places__trait-title">
                      Desgracia actual:
                    </span>{' '}
                    <select
                      type="text"
                      name="calamity"
                      value={calamity}
                      onChange={onCalamityChange}
                      className="places__trait-select"
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

        <div className="places__notes">
          <h2 className="places__notes-title">Notas</h2>
          <textarea
            ref={notesRef}
            name="notes"
            value={notes}
            className="places__notes-text"
            onChange={onNotesChange}
            onInput={textareaCallback}
          ></textarea>
        </div>
      </div>
    </Form>
  );
}

export default City;
