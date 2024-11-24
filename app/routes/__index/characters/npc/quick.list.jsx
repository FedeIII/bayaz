import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import classNames from 'classnames';

import { getNpcs } from '~/services/npc.server';
import { translateRace } from '~/domain/characters';
import { getSettlementMap } from '~/services/settlements.server';
import { getDeityColorClass } from '~/domain/npc/attrs/npcFaith';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const npcs = await getNpcs();
  if (!npcs?.length) {
    throw new Error('NPCs not found');
  }
  const settlements = await getSettlementMap(
    Array.from(new Set(npcs.map(npc => npc.settlementId)))
  );
  return json({ npcs, settlements });
};

function NpcList() {
  const { npcs, settlements } = useLoaderData();

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {npcs.map(npc => (
          <li className="party__character" key={npc.id}>
            <Link to={`/characters/npc/${npc.id}`} className="party__pc-link">
              <div className="party__character-name">{npc.name}</div>
              <div className="party__party-data">{translateRace(npc.race)}</div>
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
    </>
  );
}

export default NpcList;
