import { Form, Link, useLoaderData } from '@remix-run/react';
import { redirect } from '@remix-run/node';

import { getNpcs } from '~/services/pc.server';
import { createParty } from '~/services/party.server';
import { translateClass, translateRace } from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/party/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - Nuevo grupo de NPCs',
  },
];

export const action = async ({ request }) => {
  const formData = await request.formData();

  const npcs = formData.getAll('npcs[]');

  const party = await createParty(npcs, true);

  return redirect(`/characters/npc/groups/${party.id}`);
};

export const loader = async ({ params }) => {
  const npcs = await getNpcs();
  if (!npcs?.length) {
    throw new Error('PCs not found');
  }
  return { npcs };
};

function NewGroup() {
  const { npcs } = useLoaderData();
  useTitle('Nuevo grupo de NPCs');

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <Form method="post">
        Escoge personajes:
        <div className="party__character-list">
          {npcs.map(npc => (
            <label
              htmlFor={npc.name}
              className="party__select-character"
              key={npc.id}
            >
              <input
                type="checkbox"
                name="npcs[]"
                value={npc.id}
                id={npc.id}
                className="party__character-check"
              />
              <div className="party__character-name">{npc.name}</div>
              <div className="party__party-data">
                {translateRace(npc.race)}
                {npc.subrace !== 'subrace' &&
                  ` - ${translateRace(npc.subrace)}`}
              </div>
              <div className="party__party-data">
                {translateClass(npc.pClass)}
              </div>
              <div className="party__party-data">Nivel {npc.level}</div>
            </label>
          ))}
        </div>
        <button type="submit">Continuar</button>
      </Form>
    </>
  );
}

export default NewGroup;
