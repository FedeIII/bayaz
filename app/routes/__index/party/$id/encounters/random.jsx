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
  // const formData = await request.formData();
  // const name = formData.get('name');
  // const pClass = formData.get('pClass');
  // const packName = formData.get('pack');

  // const equipment = getEquipmentComboData({
  //   formData,
  //   numberOfEquipmentOptions: CLASS_EQUIPMENT[pClass].length,
  //   otherInputNames: ['items'],
  // });

  // const pc = await getPc(name);

  // await updatePc({
  //   name,
  //   items: distributeItems(pc, equipment),
  //   pack: packName,
  // });

  return redirect(`/characters/pc/${name}/summary`);
};

function PartyInfo() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  useAddMenuItems('/party', [
    { name: 'Encuentros', url: `/party/${id}/encounters`, level: 1 },
  ]);

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
