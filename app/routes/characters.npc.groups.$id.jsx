import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { translateClass, translateRace } from '~/domain/characters';
import { concurrentRequests } from '~/utils/concurrentRequests';
import { createNpcsEncounter } from '~/domain/mutations/partyMutations';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = ({ data }) => [
  {
    title: `Kandrax - ${data.group?.name}`,
  },
];

export const loader = async ({ params }) => {
  const group = await getParty(params.id);
  if (!group || !group.npcs) {
    throw new Error('Group not found');
  }

  const npcs = await concurrentRequests(group.players, pcId => getPc(pcId));

  return json({ group, npcs });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const name = formData.get('name');
  const npcIds = formData.getAll('npcs[]');

  const encounter = await createNpcsEncounter({
    id,
    name,
    npcs: npcIds,
  });

  return redirect(`/encounters/${encounter.id}`);
};

function GroupInfo() {
  const { group, npcs } = useLoaderData();
  const { id, name } = group;

  useTitle(name);

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={id} hidden />
      <input readOnly type="text" name="name" value={name} hidden />
      <h2>{group.name}</h2>

      <div className="party__party-section">
        Miembros:
        <ul className="party__party-members-list">
          {npcs.map(npc => (
            <li className="party__character" key={npc.id}>
              <input readOnly type="text" name="npcs[]" value={npc.id} hidden />
              <Link
                to={`/characters/pc/${npc.id}/summary`}
                className="party__party-link party__party-link-list"
              >
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
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="party__party-section">
        <button
          type="submit"
          name="combat"
          value="start"
          className="cards__button-card"
        >
          Combate
        </button>
      </div>
    </Form>
  );
}

export default GroupInfo;
