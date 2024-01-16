import { json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { translateClass, translateRace } from '~/domain/characters';
import { concurrentRequests } from '~/utils/concurrentRequests';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const group = await getParty(params.id);
  if (!group || !group.npcs) {
    throw new Error('Group not found');
  }

  const npcs = await concurrentRequests(group.players, pcId => getPc(pcId));

  return json({ group, npcs });
};

function GroupInfo() {
  const { group, npcs } = useLoaderData();
  const { id } = group;

  return (
    <Form method="post">
      <input readOnly type="text" name="partyId" value={id} hidden />
      <h2>{group.name}</h2>

      <div className="party__party-section">
        Miembros:
        <ul className="party__party-members-list">
          {npcs.map(npc => (
            <li className="party__character" key={npc.id}>
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
    </Form>
  );
}

export default GroupInfo;
