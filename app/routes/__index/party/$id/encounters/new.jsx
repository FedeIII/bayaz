import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import {
  getPartyXpThreshold,
  translateDifficulty,
} from '~/domain/encounters/encounters';
import XpContext from '~/components/contexts/xpContext';

import styles from '~/components/encounters.module.css';

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs });
};

export const action = async ({ request }) => {
  return redirect(`/characters/pc/${name}/summary`);
};

function PartyInfo() {
  const { party, pcs } = useLoaderData();

  const [xp, setXp] = useState(null);

  const difficulties = ['easy', 'medium', 'hard', 'deadly'];

  return (
    <XpContext.Provider value={{ xp, setXp }}>
      <div className={styles.encounters}>
        <h2>Nuevo encuentro</h2>
        Crear encuentro:
        <ul className={styles.encounterDifficultyList}>
          {difficulties.map(difficulty => {
            const difficultyXp = getPartyXpThreshold(pcs, difficulty);
            return (
              <li className={styles.encounterDifficultyItem} key={difficulty}>
                <Link
                  to={difficulty}
                  className={styles.encounterDifficulty}
                  onClick={() => setXp(difficultyXp)}
                >
                  {translateDifficulty(difficulty)} ({difficultyXp} XP)
                </Link>
              </li>
            );
          })}
        </ul>
        <Outlet />
      </div>
    </XpContext.Provider>
  );
}

export default PartyInfo;
