import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useContext } from 'react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { getEncounter } from '~/services/encounter.server';
import { getMonsterImage } from '~/domain/encounters/monsters';
import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';
import { translateMonster } from '~/domain/encounters/monsterTranslations';
import MonstersContext from '~/components/contexts/monstersContext';

import styles from '~/components/randomEncounter.module.css';
import cardStyles from '~/components/cards/cards.module.css';

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

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs, encounter });
};

export const action = async ({ request }) => {
  return null;
};

function PartyCombatForPlayers() {
  const { party, pcs, encounter } = useLoaderData();
  const { id: partyId } = party;
  const { id: encounterId } = encounter;

  useRemoveMenu();

  const monstersContext = useContext(MonstersContext) || {};
  const { monstersState } = monstersContext;

  return (
    <div className={styles.encounterContainerFullScreen}>
      <h2 className={cardStyles.singleCard}>Combate</h2>
      <ul className={styles.monstersList}>
        {monstersState?.map((monster, i) => {
          const imgUrl = getMonsterImage(monster.name);
          return (
            <li
              className={styles.monstersItem}
              style={{
                order: i === 0 ? 2 : i % 2 ? 1 : 3,
                ...(i === 0 && { flexShrink: 1 }),
              }}
            >
              <span
                className={`${cardStyles.singleCard} ${styles[monster.health]}`}
              >
                {translateMonster(monster.name)}
              </span>
              {imgUrl && (
                <img
                  src={imgUrl}
                  className={`${styles.monsterImage} ${
                    styles[monster.health + 'Image']
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
