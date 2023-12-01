import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useContext } from 'react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { getEncounter } from '~/services/encounter.server';
import { getMonsterImage } from '~/domain/encounters/monsters';
import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';
import { translateMonster } from '~/domain/encounters/monsterTranslations';
import MonstersContext from '~/components/contexts/monstersContext';
import { getMonsterPositionStyle } from '~/domain/encounters/encounters';

import styles from '~/components/randomEncounter.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const [party, encounter] = await Promise.all([
    getParty(params.id),
    getEncounter(params.encounterId),
  ]);

  if (!party) {
    throw new Error('Party not found');
  }

  if (!encounter) {
    throw new Error('Encounter not found');
  }

  const pcs = party.players.map(id => getPc(id));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs, encounter });
};

export const action = async ({ request }) => {
  return null;
};

function PartyCombatForPlayers() {
  const { party, pcs, encounter } = useLoaderData();

  useRemoveMenu();

  const monstersContext = useContext(MonstersContext) || {};
  const { monstersState } = monstersContext;

  return (
    <div className="encounters__container-full-screen">
      <h2 className="cards__single-card encounters__title">Combate</h2>
      <ul className="encounters__monsters-list">
        {monstersState?.map((monster, i, all) => {
          const imgUrl = getMonsterImage(monster.name);
          return (
            <li
              className="encounters__monsters-item"
              style={getMonsterPositionStyle(i, all.length)}
            >
              <span
                className={`cards__single-card encounters__${monster.health}`}
              >
                {translateMonster(monster.name)}
              </span>
              {imgUrl && (
                <img
                  src={imgUrl}
                  className={`encounters__monster-image encounters__${
                    monster.health + 'Image'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PartyCombatForPlayers;
