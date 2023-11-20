import { Form, Link, useLoaderData } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';

import BuildingDetails from '~/components/places/buildingDetails';
import { getBuilding, updateBuilding } from '~/services/building.server';

import styles from '~/components/filters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const building = await getBuilding(params.id);
  if (!building) {
    throw new Error('Building not found');
  }

  return json({ building });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const img = formData.get('img');
  const id = formData.get('id');
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

  const place = await updateBuilding(id, attrs);

  return redirect(`/places/building/${place.id}`);
};

function GenerateBuilding() {
  const { building: loadedBuilding } = useLoaderData();

  const formRef = useRef();

  const [building, setBuilding] = useState(null);

  useEffect(() => {
    if (loadedBuilding?.id) {
      setBuilding(loadedBuilding);
    }
  }, [loadedBuilding]);

  return (
    <Form method="post" ref={formRef}>
      <div className="places__buttons">
        <Link to="../" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar Edificio
        </button>
        <Link to="/places/building/new" className="menus__back-button">
          ⇩ Nuevo Edificio
        </Link>
      </div>
      <BuildingDetails building={building} setBuilding={setBuilding} />
    </Form>
  );
}

export default GenerateBuilding;
