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
  TOWN,
  VILLAGE,
  getPopulation,
  getSettlementAccommodation,
  getSettlementCalamity,
  getSettlementCommerces,
  getSettlementGovernment,
  getSettlementKnownFor,
  getSettlementMagicShops,
  getSettlementPlaceCharacteristics,
  getSettlementRaceRelationships,
  getSettlementReligion,
  getSettlementSecurity,
  randomSettlementImage,
  randomSettlementName,
} from '~/domain/places/places';
import {
  createSettlement,
  getSettlement,
  updateSettlement,
} from '~/services/settlements.server';
import { replaceAt } from '~/utils/insert';
import { t } from '~/domain/translations';
import { Title } from '~/components/form/title';
import { getSettlementImages } from '~/services/s3.server';
import { getVillageSecurityType } from '~/domain/places/village';

const TYPES = {
  city: CITY,
  town: TOWN,
  village: VILLAGE,
};

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async ({ params, request }) => {
  const url = new URL(request.url);
  const rng = url.searchParams.get('rng');

  let place;
  let files;
  let type;
  let id;
  if (['city', 'town', 'village'].includes(params.id)) {
    id = null;
    place = null;
    type = params.id;
    try {
      files = await getSettlementImages(type);
    } catch {
      files = [];
    }
  } else {
    id = params.id;
    place = await getSettlement(id);
    type = place.type;
    if (!place) {
      throw new Error('Village not found');
    }
    try {
      files = await getSettlementImages(type);
    } catch {
      files = [];
    }
  }

  return json({ place, id, type, files, rng });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  const attrs = {
    type: formData.get('type'),
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

  return redirect(`/places/settlement/${settlement.id}`);
};

function SettlementScreen() {
  const { place, id, type: typeParam, files, rng } = useLoaderData();

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
    type: '',
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
    if (id) {
      setPlaceState(old => ({
        ...old,
        type: typeParam,
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
    }
  }, [place]);

  useEffect(() => {
    if (typeParam) {
      const population = getPopulation(TYPES[typeParam]);
      const accommodation = getSettlementAccommodation(typeParam, population);
      const government = getSettlementGovernment(typeParam);
      const commerces = getSettlementCommerces(typeParam);
      const religion = getSettlementReligion(typeParam);
      const placeCharacteristics = getSettlementPlaceCharacteristics(typeParam);
      const img = randomSettlementImage(typeParam, {
        files,
        population,
        accommodation,
        government,
        commerces,
        religion,
        placeCharacteristics,
      });

      setPlaceState({
        name: randomSettlementName(),
        img,
        population,
        accommodation,
        government,
        security: getSettlementSecurity(typeParam, population),
        securityType:
          typeParam === 'village' ? getVillageSecurityType(population) : 'guards',
        commerces,
        religion,
        magicShops: getSettlementMagicShops(typeParam, population),
        raceRelationships: getSettlementRaceRelationships(typeParam),
        placeCharacteristics,
        knownFor: getSettlementKnownFor(typeParam),
        calamity: getSettlementCalamity(typeParam),
      });
    }
  }, [rng, typeParam]);

  const {
    type,
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

  function onNameChange(e) {
    setPlaceState(p => ({ ...p, name: e.target.value }));
  }

  function onPopulationChange(e) {
    setPlaceState(p => ({ ...p, population: e.target.value }));
  }

  function onAccommodationChange(i, e) {
    setPlaceState(p => ({
      ...p,
      accommodation: replaceAt(i, accommodation, e.target.value),
    }));
  }

  function onGovernmentTypeChange(e) {
    setPlaceState(p => ({
      ...p,
      government: replaceAt(0, government, e.target.value),
    }));
  }

  function onGovernmentSituationChange(e) {
    setPlaceState(p => ({
      ...p,
      government: replaceAt(1, government, e.target.value),
    }));
  }

  function onSecurityChange(e) {
    setPlaceState(p => ({ ...p, security: e.target.value }));
  }

  function onCommerceChange(i, e) {
    setPlaceState(p => ({
      ...p,
      commerces: replaceAt(i, p.commerces, e.target.value),
    }));
  }

  function onTempleNameChange(i, e) {
    setPlaceState(p => ({
      ...p,
      religion: { temples: replaceAt(i, religion.temples, e.target.value) },
    }));
  }

  function onShrineNameChange(i, e) {
    setPlaceState(p => ({
      ...p,
      religion: { shrines: replaceAt(i, religion.shrines, e.target.value) },
    }));
  }

  function onMagicShopsChange(e) {
    setPlaceState(p => ({ ...p, magicShops: e.target.value }));
  }

  function onRaceRelationshipsChange(e) {
    setPlaceState(p => ({ ...p, raceRelationships: e.target.value }));
  }

  function onPlaceCharacteristicsChange(e) {
    setPlaceState(p => ({ ...p, placeCharacteristics: e.target.value }));
  }

  function onKnownForChange(e) {
    setPlaceState(p => ({ ...p, knownFor: e.target.value }));
  }

  function onCalamityChange(e) {
    setPlaceState(p => ({ ...p, calamity: e.target.value }));
  }

  function onNotesChange(e) {
    setPlaceState(p => ({ ...p, notes: e.target.value }));
  }

  function onImageClick() {
    setPlaceState(p => ({
      ...p,
      img: randomSettlementImage(type, {
        files,
        population,
        accommodation,
        government,
        commerces,
        religion,
        placeCharacteristics,
      }),
    }));
  }

  function onNameReroll() {
    setPlaceState(p => ({ ...p, name: randomSettlementName() }));
  }

  return (
    <Form method="post">
      {!!id && <input readOnly type="text" name="id" value={id} hidden />}
      <div className="places__buttons">
        <Link to="../" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar
        </button>
        <Link to={`./?rng=${Math.random()}`} className="menus__back-button">
          ⇩ Nuevo
        </Link>
        <Link to={`players`} target="_blank" className="places__save">
          ⇨ Presentar
        </Link>
      </div>

      <div className="places__horizontal-sections">
        <div className="places__vertical-sections">
          {!!img && (
            <div className="places__image-container">
              <span className="places__image-overlay" onClick={onImageClick}>
                ⟳
              </span>
              <img src={img} className="places__image" width="100%" />
              <input readOnly type="text" name="img" value={img} hidden />
            </div>
          )}

          <div className="places__info">
            <Title
              inputName="name"
              value={name}
              onChange={onNameChange}
              onReroll={onNameReroll}
            />

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

            {!!accommodation?.length && (
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
                          value={innName}
                          onChange={e => onAccommodationChange(i, e)}
                          className="places__trait-input"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {!!(government.length && government[0]) && (
              <>
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
              </>
            )}

            <hr className="places__section-divider" />
            <div className="places__trait-multiple">
              {!!commerces?.length && (
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
              )}
              {!commerces && (
                <span>
                  <span className="places__trait-title">Gobierno:</span>{' '}
                  Alguacil {Math.random() > 0.5 && 'no '}presente
                </span>
              )}
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
                {securityType === 'militia' ? 'milicias' : 'guardias'}
              </span>
            </div>

            {!!(religion.temples?.length || religion.shrines?.length) && (
              <>
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
              </>
            )}

            {!!raceRelationships && (
              <>
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
              </>
            )}

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

export default SettlementScreen;
