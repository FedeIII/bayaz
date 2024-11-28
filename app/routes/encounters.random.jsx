import { json, redirect } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import {
  getCharacterXpThreshold,
  translateDifficulty,
} from '~/domain/encounters/encounters';

import styles from '~/components/randomEncounter.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = party.players.map(id => getPc(id));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ pcs });
};

function RandomEncounter() {
  const { pcs } = useLoaderData();

  return (
    <div className="encounters">
      <h2>Encuentro aleatorio</h2>
      Generar encuentro:
      <ul className="encounters__difficulty-list">
        <li className="encounters__difficulty-item">
          <Link to="easy" className="encounters__difficulty">
            {translateDifficulty('easy')} (
            {pcs.reduce(
              (xp, pc) => xp + getCharacterXpThreshold(pc.level, 'easy'),
              0
            )}{' '}
            xp)
          </Link>
        </li>
        <li className="encounters__difficulty-item">
          <Link to="medium" className="encounters__difficulty">
            {translateDifficulty('medium')} (
            {pcs.reduce(
              (xp, pc) => xp + getCharacterXpThreshold(pc.level, 'medium'),
              0
            )}{' '}
            xp)
          </Link>
        </li>
        <li className="encounters__difficulty-item">
          <Link to="hard" className="encounters__difficulty">
            {translateDifficulty('hard')} (
            {pcs.reduce(
              (xp, pc) => xp + getCharacterXpThreshold(pc.level, 'hard'),
              0
            )}{' '}
            xp)
          </Link>
        </li>
        <li className="encounters__difficulty-item">
          <Link to="deadly" className="encounters__difficulty">
            {translateDifficulty('deadly')} (
            {pcs.reduce(
              (xp, pc) => xp + getCharacterXpThreshold(pc.level, 'deadly'),
              0
            )}{' '}
            xp)
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default RandomEncounter;
