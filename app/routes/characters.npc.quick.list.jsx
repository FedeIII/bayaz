import { Link, useLoaderData } from '@remix-run/react';
import classNames from 'classnames';

import { getNpcsBySubdominions } from '~/services/npc.server';
import { translateRace } from '~/domain/characters';
import { getSettlementMap } from '~/services/settlements.server';
import { getDeityColorClass } from '~/domain/npc/attrs/npcFaith';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - NPCs Rápidos',
  },
];

export const loader = async ({ params }) => {
  const npcsBySubdominions = await getNpcsBySubdominions();
  if (!npcsBySubdominions?.length) {
    throw new Error('NPCs not found');
  }
  const settlements = await getSettlementMap(
    Array.from(
      new Set(
        npcsBySubdominions.flatMap(([_, npcs]) =>
          npcs.map(npc => npc.settlementId)
        )
      )
    )
  );
  return { npcsBySubdominions, settlements };
};

function NpcList() {
  const { npcsBySubdominions, settlements } = useLoaderData();

  useTitle('NPCs Rápidos');

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {npcsBySubdominions.map(([subdominionName, npcs]) => (
          <li className="party__character-npc-group" key={subdominionName}>
            <h2 className="party__character-list-title">{subdominionName}</h2>
            <ul>
              {npcs.map(npc => (
                <li className="party__character" key={npc.id}>
                  <Link
                    to={`/characters/npc/${npc.id}`}
                    className="party__pc-link"
                  >
                    <div className="party__character-name">{npc.name}</div>
                    <div className="party__party-data">
                      {translateRace(npc.race)}
                    </div>
                    <div className="party__party-data">
                      {settlements[npc.settlementId]?.name}
                    </div>
                    <div
                      className={classNames(
                        'party__party-data',
                        getDeityColorClass(npc.faith.deityName)
                      )}
                    >
                      {npc.faith.deityName}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NpcList;
