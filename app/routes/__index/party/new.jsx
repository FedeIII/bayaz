import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

import { getPcs } from '~/services/pc.server';
import { createParty } from '~/services/party.server';
import { translateClass, translateRace } from '~/domain/characters';

export const action = async ({ request }) => {
  const formData = await request.formData();

  const pcs = formData.getAll('pcs[]');

  const party = await createParty(pcs);

  return redirect(`/party/${party.id}`);
};

export const loader = async ({ params }) => {
  const pcs = await getPcs();
  if (!pcs?.length) {
    throw new Error('PCs not found');
  }
  return json({ pcs });
};

function NewParty() {
  const { pcs } = useLoaderData();

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <Form method="post">
        Escoge personajes:
        <div className="party__character-list">
          {pcs.map(pc => (
            <label
              htmlFor={pc.name}
              className="party__select-character"
              key={pc.id}
            >
              <input
                type="checkbox"
                name="pcs[]"
                value={pc.id}
                id={pc.id}
                className="party__character-check"
              />
              <div className="party__character-name">{pc.name}</div>
              <div className="party__party-data">
                {translateRace(pc.race)}
                {pc.subrace !== 'subrace' && ` - ${translateRace(pc.subrace)}`}
              </div>
              <div className="party__party-data">
                {translateClass(pc.pClass)}
              </div>
              <div className="party__party-data">Nivel {pc.level}</div>
            </label>
          ))}
        </div>
        <button type="submit">Continuar</button>
      </Form>
    </>
  );
}

export default NewParty;
