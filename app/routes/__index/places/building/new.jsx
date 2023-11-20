import { Form, Link, useActionData, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { useEffect, useRef, useState } from 'react';

import { t } from '~/domain/translations';
import { removeItem } from '~/utils/insert';
import { BUILDING_TYPES, createRandomBuilding } from '~/domain/places/building';
import { createBuilding } from '~/services/building.server';
import BuildingDetails from '~/components/places/buildingDetails';
import { getBuildingImages } from '~/services/s3.server';
import random from '~/domain/random';

import styles from '~/components/filters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'save') {
    const img = formData.get('img');
    const type = formData.get('type');
    const typeTranslation = formData.get('typeTranslation');
    const subtype = formData.get('subtype');
    const subtypeTranslation = formData.get('subtypeTranslation');
    const variant = formData.get('variant');
    const notes = formData.get('notes');

    const attrs = {
      img,
      type,
      typeTranslation,
      subtype,
      subtypeTranslation,
      variant,
      notes,
    };

    const place = await createBuilding(attrs);

    return redirect(`/places/building/${place.id}`);
  } else if (action === 'create') {
    const typeFilter = formData.getAll('typeFilter[]');
    const randomBuilding = createRandomBuilding({
      types: typeFilter,
    });
    randomBuilding.typeTranslation = t(randomBuilding.type);
    randomBuilding.subtypeTranslation = t(randomBuilding.subtype);
    randomBuilding.notes = '';

    try {
      files = await getBuildingImages(randomBuilding);
    } catch {
      files = [];
    }

    randomBuilding.img = random.element(files);

    return json({ building: randomBuilding });
  }
};

function Sidebar(props) {
  const { filters, setFilters } = props;

  function onTypeSelect(e) {
    const type = e.target.value;
    if (type === 'all') {
      setFilters(f => ({
        ...f,
        types: e.target.checked ? BUILDING_TYPES : [],
      }));
    }

    if (filters.types.includes(type)) {
      return setFilters(f => ({
        ...f,
        types: removeItem(r => r === type, f.types),
      }));
    }

    return setFilters(f => ({ ...f, types: [...f.types, type] }));
  }

  return (
    <div className="filters__sidebar filters__sidebar--float">
      <div className="filters__sidebarContent">
        <div className="filters__sidebarSection">
          <div className="filters__filterVertical">
            <div className="filters__filterOptions">
              <button
                type="submit"
                name="action"
                value="create"
                className="cards__button-card"
              >
                Crear Edificio
              </button>
            </div>
          </div>
        </div>

        <div className="filters__sidebarSection">
          <div className="filters__filterVertical">
            <div className="filters__filterLabel">
              <span className="filters__filterTitle">Tipo:</span>{' '}
              <label className="filters__filterOption">
                <input
                  type="checkbox"
                  name="typeFilter[]"
                  value="all"
                  className="cards__button-card"
                  onClick={onTypeSelect}
                />
                <span>Todos</span>
              </label>
            </div>{' '}
            <div className="filters__filterOptionsTwoColumns">
              {BUILDING_TYPES.map(type => {
                return (
                  <label className="filters__filterOption" key={type}>
                    <input
                      key={type}
                      type="checkbox"
                      name="typeFilter[]"
                      value={type}
                      checked={filters.types.includes(type)}
                      className="cards__button-card"
                      onChange={onTypeSelect}
                    />
                    <span>{t(type)}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenerateBuilding() {
  const { building: initBuilding } = useActionData() || {};
  const formRef = useRef();

  const [building, setBuilding] = useState(initBuilding);

  useEffect(() => {
    if (initBuilding) {
      return setBuilding(initBuilding);
    }
  }, [initBuilding]);

  const [filters, setFilters] = useState({
    types: [],
  });

  return (
    <Form method="post" ref={formRef}>
      <div className="places__buttons">
        <Link to="../" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button
          type="submit"
          name="action"
          value="save"
          className="places__save"
        >
          ⇧ Guardar Edificio
        </button>
      </div>

      <Sidebar filters={filters} setFilters={setFilters} />

      {!!building && (
        <BuildingDetails building={building} setBuilding={setBuilding} />
      )}
    </Form>
  );
}

export default GenerateBuilding;
