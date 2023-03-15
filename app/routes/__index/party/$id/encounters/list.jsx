import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { getEncounters } from '~/services/encounter.server';

import styles from '~/components/encounterList.module.css';
import cardStyles from '~/components/cards/cards.module.css';
import { useTitle } from '~/components/hooks/useTitle';
import { getMonsters, Monster } from '~/domain/encounters/monsters';
import {
  getEncounterChallenge,
  getEncounterDifficulty,
  getEncounterXp,
  groupMonsters,
  translateDifficulty,
} from '~/domain/encounters/encounters';
import { getPartyMaxLevel } from '~/domain/party/party';

export const loader = async ({ params }) => {
  const [party, encounters] = await Promise.all([
    getParty(params.id),
    getEncounters(params.id),
  ]);

  if (!party) {
    throw new Error('Party not found');
  }

  if (!encounters) {
    throw new Error('Encounter not found');
  }

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs, encounters });
};

export const action = async ({ request }) => {
  return null;
};

function EncounterList() {
  const { party, pcs, encounters } = useLoaderData();
  const { id: partyId } = party;

  useTitle('Lista de encuentros');

  return (
    <div className={styles.encounterList}>
      <div className={styles.party}>
        <h3 className={styles.partyLabel}>Party</h3>{' '}
        <div className={styles.partyMembers}>
          {pcs.map(pc => (
            <span className={`${cardStyles.buttonCard}`} key={pc.name}>
              {pc.name}
              <br />
              Nivel {pc.level}
            </span>
          ))}
        </div>
      </div>
      <div className={`${cardStyles.cards} ${styles.encounters}`}>
        {encounters.map(encounter => {
          const difficulty = getEncounterDifficulty(
            getMonsters(encounter.monsters),
            pcs
          );
          const monsters = getMonsters(encounter.monsters);
          const partyMaxLevel = getPartyMaxLevel(pcs);
          const challenge = getEncounterChallenge(monsters);

          return (
            <Link
              to={`/party/${partyId}/encounters/${encounter.id}`}
              className={`${cardStyles.buttonCard} ${styles.encounter}`}
              key={encounter.id}
            >
              <div className={styles.encounterMonsters}>
                {groupMonsters(monsters)}
              </div>
              <div className={styles.encounterSection}>
                <span className={styles[difficulty]}>
                  {translateDifficulty(difficulty)} (
                  {getEncounterXp(monsters, pcs.length)} xp)
                </span>
                <span
                  className={
                    partyMaxLevel < challenge
                      ? styles.deadly
                      : partyMaxLevel === challenge
                      ? styles.medium
                      : styles.easy
                  }
                >
                  CR {challenge}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EncounterList;
