import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { useEffect, useRef, useState } from 'react';
import { createPlace } from '~/services/place.server';
import { getRegions } from '~/services/regions.server';
import { Title } from '~/components/form/title';

import styles from '~/components/newEncounter.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async () => {
  const regions = await getRegions();

  return json({ regions });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const group = formData.get('group');
  const name = formData.get('name');
  const img = formData.get('img');
  const description = formData.get('description');
  const notes = formData.get('notes');
  const belongsTo = formData.get('belongsTo') || null;
  const isRegion = formData.get('isRegion') === 'true';
  const isDominion = formData.get('isDominion') === 'true';
  const region = formData.get('region') || null;

  const place = await createPlace({
    group,
    name,
    img,
    description,
    notes,
    belongsTo,
    isRegion,
    isDominion,
    region,
  });

  return redirect(`/places/generic/${place.id}`);
};

function GenerateGenericPlace() {
  const { regions } = useLoaderData();
  const formRef = useRef();

  const [place, setPlace] = useState({
    group: '',
    name: '',
    img: '',
    description: '',
    notes: '',
    belongsTo: null,
    isRegion: false,
    isDominion: false,
    region: null,
  });

  const descriptionRef = useRef();
  useEffect(() => {
    if (descriptionRef.current) {
      textareaCallback({ target: descriptionRef.current });
    }
  }, [descriptionRef.current]);

  const notesRef = useRef();
  useEffect(() => {
    if (notesRef.current) {
      textareaCallback({ target: notesRef.current });
    }
  }, [notesRef.current]);

  return (
    <Form method="post" ref={formRef}>
      <div className="places__buttons">
        <Link to="../" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar Lugar
        </button>
      </div>

      <div className="places__horizontal-sections">
        <div className="places__vertical-sections">
          <div className="places__image-container">
            {place.img ? (
              <>
                <img src={''} className="places__image" width="100%" />
                <input readOnly type="text" name="img" value={''} hidden />
              </>
            ) : (
              <>
                Imagen: <input type="text" name="img" />
              </>
            )}
          </div>

          <div className="places__info">
            <div className="places__group-title">
              <label htmlFor="group">
                <span className="encounter__header-input-title">Grupo</span>{' '}
                <Title
                  inputName="group"
                  className="encounter__group"
                  inputClass="encounter__name encounter__filter-input cards__button-card"
                  value={place.group}
                  onChange={e =>
                    setPlace(p => ({ ...p, group: e.target.value }))
                  }
                />
              </label>
              <label htmlFor="name" className="encounter__title-name">
                <span className="encounter__header-input-title">Nombre</span>{' '}
                <Title
                  inputName="name"
                  className="encounter__group"
                  inputClass="encounter__name encounter__filter-input cards__button-card"
                  value={place.name}
                  onChange={e =>
                    setPlace(p => ({ ...p, name: e.target.value }))
                  }
                />
              </label>
            </div>

            <hr className="places__section-divider" />

            <div className="places__trait">
              <div className="places__horizontal-sections">
                <div className="places__trait-title">
                  <label htmlFor="isDominion" className="places__input-label">
                    <input
                      type="checkbox"
                      name="isDominion"
                      id="isDominion"
                      checked={!!place.isDominion}
                      value={!!place.isDominion}
                      onChange={() =>
                        setPlace(p => ({ ...p, isDominion: !p.isDominion }))
                      }
                    />{' '}
                    Son Dominios
                  </label>
                </div>
              </div>
              {!place?.isDominion && (
                <div className="places__vertical-sections places__vertical-sections--main">
                  Pertenece a:{' '}
                  <select
                    name="belongsTo"
                    defaultValue="-"
                    className="places__trait-select"
                  >
                    <option value="-" disabled></option>
                    {regions.map(region => (
                      <option value={region.id} key={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <br />

            <div className="places__trait">
              <div className="places__horizontal-sections">
                <div className="places__trait-title">
                  <label htmFor="isRegion" className="places__input-label">
                    <input
                      type="checkbox"
                      name="isRegion"
                      id="isRegion"
                      checked={!!place.isRegion}
                      value={!!place.isRegion}
                      onChange={() =>
                        setPlace(p => ({ ...p, isRegion: !p.isRegion }))
                      }
                    />{' '}
                    Es región
                  </label>
                </div>
              </div>

              {!!place.isRegion && (
                <div className="places__vertical-sections">
                  Región:{' '}
                  <select
                    name="region"
                    defaultValue="-"
                    className="places__trait-select"
                  >
                    <option value="-" disabled></option>
                    {regions.map(region => (
                      <option value={region.id} key={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <hr className="places__section-divider" />

            <div className="places__trait">
              <div className="places__horizontal-sections">
                <div className="places__trait-title">Descripción</div>
                <textarea
                  ref={descriptionRef}
                  name="description"
                  value={place.description}
                  className="places__trait-input"
                  onChange={e =>
                    setPlace(p => ({ ...p, description: e.target.value }))
                  }
                  onInput={textareaCallback}
                ></textarea>
              </div>
            </div>

            <hr className="places__section-divider" />
          </div>
        </div>

        <div className="places__notes">
          <h2 className="places__notes-title">Notas</h2>
          <textarea
            ref={notesRef}
            name="notes"
            value={place.notes}
            className="places__notes-text"
            onChange={e => setPlace(p => ({ ...p, notes: e.target.value }))}
            onInput={textareaCallback}
          ></textarea>
        </div>
      </div>
    </Form>
  );
}

export default GenerateGenericPlace;
