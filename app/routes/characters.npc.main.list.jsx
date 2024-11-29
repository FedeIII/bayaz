import { Link, useLoaderData } from '@remix-run/react';

import { getNpcs } from '~/services/pc.server';
import { translateClass, translateRace } from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/party/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - NPCs Principales',
  },
];

export const loader = async ({ params }) => {
  const npcs = await getNpcs();
  if (!npcs?.length) {
    throw new Error('PCs not found');
  }
  return { npcs };
};

function NpcList() {
  const { npcs } = useLoaderData();

  useTitle('NPCs Principales');

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {npcs.map(npc => (
          <li className="party__character" key={npc.id}>
            <Link
              to={`/characters/pc/${npc.id}/summary`}
              className="party__pc-link"
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
    </>
  );
}

export default NpcList;
