import { Form, Link, useLoaderData } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';

import { getPlace, getPlaceByName, updatePlace } from '~/services/place.server';
import { getRegions } from '~/services/regions.server';
import { Title } from '~/components/form/title';
import HtmlInput from '~/components/inputs/htmlInput';
import withLoading from '~/components/HOCs/withLoading';

import styles from '~/components/filters.css';
import encounterStyles from '~/components/newEncounter.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: encounterStyles },
  ];
};

export const loader = async ({ params }) => {
  let [place, regions] = await Promise.all([getPlace(params.id), getRegions()]);

  if (!place) {
    place = await getPlaceByName(params.id);
    if (!place) {
      throw new Error('Place not found');
    }
    return redirect(`/places/generic/${place.id}`);
  }

  return json({ place, regions });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const group = formData.get('group');
  const name = formData.get('name');
  const img = formData.get('img');
  const description = formData.get('description');
  const notes = formData.get('notes');
  const belongsTo = formData.get('belongsTo') || null;
  const isRegion = formData.get('isRegion') === 'true';
  const isDominion = formData.get('isDominion') === 'true';
  const region = formData.get('region') || null;

  const place = await updatePlace(id, {
    group,
    name,
    img,
    description,
    notes,
    belongsTo: isDominion ? null : belongsTo,
    isRegion,
    isDominion,
    region,
  });

  return redirect(`/places/generic/${place.id}`);
};

function GenericPlace() {
  const { place: initPlace, regions } = useLoaderData();

  const formRef = useRef();

  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (initPlace?.id) {
      setPlace(initPlace);
    }
  }, [initPlace]);

  const descriptionRef = useRef(null);
  const notesRef = useRef(null);

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="id" value={place?.id || ''} hidden />

      <div className="places__buttons">
        <Link to="/places/generic/list" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar Lugar
        </button>
        <Link to="/places/generic/new" className="menus__back-button">
          ⇩ Nuevo Lugar
        </Link>
        <Link to="./present" target="_blank" className="places__save">
          ⇨ Presentar
        </Link>
        <Link to={`export`} target="_blank" className="places__save">
          ⇪ Exportar
        </Link>
      </div>

      <div className="places__horizontal-sections">
        <div className="places__vertical-sections">
          <div className="places__image-container">
            {place?.img ? (
              <>
                <img src={place?.img} className="places__image" width="100%" />
                <input
                  readOnly
                  type="text"
                  name="img"
                  value={place?.img || ''}
                  hidden
                />
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
                  value={place?.group}
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
                  value={place?.name}
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
                      checked={!!place?.isDominion}
                      value={!!place?.isDominion}
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
                    value={place?.belongsTo}
                    onChange={e =>
                      setPlace(p => ({ ...p, belongsTo: e.target.value }))
                    }
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
                  <label htmlFor="isRegion" className="places__input-label">
                    <input
                      type="checkbox"
                      name="isRegion"
                      id="isRegion"
                      checked={!!place?.isRegion}
                      value={!!place?.isRegion}
                      onChange={e =>
                        setPlace(p => ({ ...p, isRegion: !!e.target.checked }))
                      }
                    />{' '}
                    Es región
                  </label>
                </div>
              </div>

              {!!place?.isRegion && (
                <div className="places__vertical-sections">
                  Región:{' '}
                  <select
                    name="region"
                    value={place?.region}
                    onChange={e =>
                      setPlace(p => ({ ...p, region: e.target.value }))
                    }
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
                <HtmlInput
                  name="description"
                  value={place?.description}
                  htmlInputRef={descriptionRef}
                  className="places__trait-input"
                  onChange={() =>
                    setPlace(p => ({
                      ...p,
                      description: descriptionRef.current?.innerHTML,
                    }))
                  }
                />
              </div>
            </div>

            <hr className="places__section-divider" />
          </div>
        </div>

        <div className="places__notes">
          <h2 className="places__notes-title">Notas</h2>
          <HtmlInput
            name="notes"
            value={place?.notes}
            htmlInputRef={notesRef}
            className="places__notes-text"
            onChange={() =>
              setPlace(p => ({
                ...p,
                notes: notesRef.current?.innerHTML,
              }))
            }
          />
        </div>
      </div>
    </Form>
  );
}

export default withLoading(GenericPlace);
