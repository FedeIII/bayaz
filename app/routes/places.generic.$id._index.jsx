import { Form, Link, useOutletContext } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { redirect } from '@remix-run/node';

import { updatePlace } from '~/services/place.server';
import { Title } from '~/components/form/title';
import HtmlInput from '~/components/inputs/htmlInput';
import withLoading from '~/components/HOCs/withLoading';
import { getFromStore } from '~/components/hooks/useStore';
import { usePresentTab } from '~/components/contexts/presentTabContext';

import styles from '~/components/filters.css';
import encounterStyles from '~/components/newEncounter.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: encounterStyles },
  ];
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
  const doc = formData.get('doc') || null;

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
    doc,
  });

  return redirect(`/places/generic/${place.id}`);
};

function GenericPlace() {
  const { place: initPlace, regions } = useOutletContext();

  const formRef = useRef();

  const [place, setPlace] = useState(null);

  const { showInPresentationWindow } = usePresentTab();
  const partyId = getFromStore('partyId');

  useEffect(() => {
    if (initPlace?.id) {
      setPlace(initPlace);
    }
  }, [initPlace]);

  const handlePresent = () => {
    if (partyId) {
      showInPresentationWindow('place', place.name, place.img, partyId);
    } else if (place?.id) {
      window.open(`./${place?.id}/players`, '_blank');
    }
  };

  return (
    <Form method="post" ref={formRef} className="places__container">
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
        <button type="button" onClick={handlePresent} className="places__save">
          ⇨ Presentar
        </button>
        <Link to={`export`} target="_blank" className="places__save">
          ⇪ Exportar
        </Link>
        {place?.doc && (
          <a href={place.doc} target="_blank" className="places__save">
            <span className="app__text-big" style={{ marginTop: '-10px' }}>
              ⇫
            </span>{' '}
            Doc
          </a>
        )}
      </div>

      <div className="places__horizontal-sections">
        <div className="places__vertical-sections">
          <div className="places__image-container">
            {place?.img && (
              <img src={place?.img} className="places__image" width="100%" />
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

            <div className="places__vertical-sections">
              <div className="places__subtitle places__subtitle--left">
                <span
                  className="places__trait-title"
                  style={{ marginRight: '8px' }}
                >
                  Img:
                </span>
                <input
                  type="text"
                  name="img"
                  value={place?.img}
                  onChange={e => setPlace(p => ({ ...p, img: e.target.value }))}
                  className="places__trait-input"
                />
              </div>

              <div className="places__subtitle places__subtitle--right">
                <span
                  className="places__trait-title"
                  style={{ marginRight: '8px' }}
                >
                  Doc:
                </span>
                <input
                  type="text"
                  name="doc"
                  value={place?.doc}
                  onChange={e => setPlace(p => ({ ...p, doc: e.target.value }))}
                  className="places__trait-input"
                />
              </div>
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
                  onChange={value =>
                    setPlace(p => ({
                      ...p,
                      description: value,
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
            onChange={value =>
              setPlace(p => ({
                ...p,
                notes: value,
              }))
            }
          />
        </div>
      </div>
    </Form>
  );
}

export default withLoading(GenericPlace);
