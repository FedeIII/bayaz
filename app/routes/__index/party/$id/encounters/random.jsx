import { json, redirect } from '@remix-run/node';
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react';

import { getParty, getPc } from '~/services/pc.server';
import { translateClass, translateRace } from '~/domain/characters';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import {
  getCharacterXpThreshold,
  translateDifficulty,
} from '~/domain/encounters/encounters';

import styles from '~/components/encounters.module.css';
import { useContext, useEffect } from 'react';
import PartyContext from '~/components/contexts/partyContext';

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
  const { id } = party;

  useAddMenuItems('/party', [
    { name: id, url: `/party/${id}`, level: 1 },
    { name: 'Encuentros', url: `/party/${id}/encounters`, level: 2 },
  ]);

  const partyContext = useContext(PartyContext);
  useEffect(() => {
    partyContext.setPartyId(id);
  }, [id]);

  return (
    <div className={styles.encounters}>
      <h2>Encuentro aleatorio</h2>
      Generar encuentro:
      <ul className={styles.encounterDifficultyList}>
        <li className={styles.encounterDifficultyItem}>
          <Link to="easy" className={styles.encounterDifficulty}>
            {translateDifficulty('easy')} (
            {pcs.reduce(
              (xp, pc) => xp + getCharacterXpThreshold(pc, 'easy'),
              0
            )}{' '}
            XP)
          </Link>
        </li>
        <li className={styles.encounterDifficultyItem}>
          <Link to="medium" className={styles.encounterDifficulty}>
            {translateDifficulty('medium')} (
            {pcs.reduce(
              (xp, pc) => xp + getCharacterXpThreshold(pc, 'medium'),
              0
            )}{' '}
            XP)
          </Link>
        </li>
        <li className={styles.encounterDifficultyItem}>
          <Link to="hard" className={styles.encounterDifficulty}>
            {translateDifficulty('hard')} (
            {pcs.reduce(
              (xp, pc) => xp + getCharacterXpThreshold(pc, 'hard'),
              0
            )}{' '}
            XP)
          </Link>
        </li>
        <li className={styles.encounterDifficultyItem}>
          <Link to="deadly" className={styles.encounterDifficulty}>
            {translateDifficulty('deadly')} (
            {pcs.reduce(
              (xp, pc) => xp + getCharacterXpThreshold(pc, 'deadly'),
              0
            )}{' '}
            XP)
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default PartyInfo;
