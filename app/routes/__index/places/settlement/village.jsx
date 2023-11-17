import { useEffect, useRef, useState } from 'react';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

import { getSettlementImages } from '~/services/s3.server';
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
  randomVillageImage,
} from '~/domain/places/village';
import { createSettlement } from '~/services/settlements.server';
import { replaceAt } from '~/utils/insert';
import { Title } from '~/components/form/title';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const rng = url.searchParams.get('rng');
  let files;

  try {
    files = await getSettlementImages('village');
  } catch {
    files = [];
  }

  return json({ files, rng });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const attrs = {
    type: 'village',
    name: formData.get('name'),
    img: formData.get('img'),
    population: parseInt(formData.get('population'), 10),
    accommodation: formData.getAll('accommodation[]'),
    guards: parseInt(formData.get('guards') || 0, 10),
    militia: parseInt(formData.get('militia') || 0, 10),
    temples: formData.getAll('temples[]'),
    shrines: formData.getAll('shrines[]'),
    notes: formData.get('notes'),
  };

  const settlement = await createSettlement(attrs);

  return redirect(`/places/settlement/${settlement.id}`);
};

function Village() {
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
    accommodation: '',
    government: false,
    security: { guards: 0, militia: 0 },
    religion: { temples: [], shrines: [] },
    notes: '',
  });

  useEffect(() => {
    const population = getPopulation(VILLAGE);
    const accommodation = getVillageAccommodation(population);
    const religion = getVillageReligion();
    const img = randomVillageImage(files, population, accommodation, religion);

    setPlace(old => ({
      ...old,
      name: randomSettlementName(),
      img,
      population,
      accommodation,
      government: getVillageGovernment(),
      security: getVillageSecurity(population),
      religion,
    }));
  }, [rng]);

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

  function onNotesChange(e) {
    setPlace(p => ({ ...p, notes: e.target.value }));
  }

  const {
    name,
    img,
    population,
    accommodation,
    government,
    security = {},
    religion = {},
    notes,
  } = place;

  return (
    <Form method="post">
      <div className="places__buttons">
        <Link to="../" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar Aldea
        </button>
        <Link to={`./?rng=${Math.random()}`} className="menus__back-button">
          ⇩ Nueva Aldea
        </Link>
      </div>

      <div className="places__horizontal-sections">
        <div className="places__vertical-sections">
          {!!img && (
            <div className="places__image-container">
              <img src={img} className="places__image" width="100%" />
              <input readOnly type="text" name="img" value={img} hidden />
            </div>
          )}

          <div className="places__info">
            <Title inputName="name" value={name} onChange={onNameChange} />

            <hr className="places__section-divider" />
            <div className="places__subtitle">
              <span>Aldea</span>
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
                  <span>
                    <span className="places__trait-title">Alojamientos:</span>{' '}
                    <input
                      type="text"
                      name="accommodation[]"
                      value={accommodation}
                      onChange={onAccommodationChange}
                      className="places__trait-input"
                    />
                  </span>
                </div>
              </>
            )}

            <hr className="places__section-divider" />
            <div className="places__trait-multiple">
              <span>
                <span className="places__trait-title">Gobierno:</span> Alguacil{' '}
                {!government && 'no '}presente
              </span>
              <span>
                <span className="places__trait-title">Seguridad:</span>{' '}
                {security.guards && (
                  <span>
                    <input
                      type="number"
                      name="guards"
                      value={security.guards}
                      onChange={onSecurityGuardsChange}
                      className="places__trait-input places__trait-input--number-1"
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
                      className="places__trait-input places__trait-input--number-1"
                    />{' '}
                    milicias
                  </span>
                )}
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

            <hr className="places__section-divider" />
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

export default Village;
