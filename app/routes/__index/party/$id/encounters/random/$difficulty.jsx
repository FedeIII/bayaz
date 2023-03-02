import { json, redirect } from '@remix-run/node';
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react';

import { getParty, getPc } from '~/services/pc.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import {
  ENVIRONMENTS,
  getRandomEncounter,
  groupMonsters,
  translateDifficulty,
  translateEnvironments,
} from '~/domain/encounters/encounters';

import styles from '~/components/encounters.module.css';
import { useState } from 'react';

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs, difficulty: params.difficulty });
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
  const { party, pcs, difficulty } = useLoaderData();
  const { id } = party;

  useAddMenuItems('/party', [
    { name: 'Encuentros', url: `/party/${id}/encounters`, level: 1 },
  ]);

  const [monsters, setMonsters] = useState(null);

  function selectEnvironment(env) {
    return () => {
      setMonsters(groupMonsters(getRandomEncounter(pcs, difficulty, env)));
    };
  }

  return (
    <div className={styles.encounterContainer}>
      <h2>Encuentro {translateDifficulty(difficulty)}</h2>
      <div>
        <h3>Entorno:</h3>
        <ul className={styles.encounterDifficultyList}>
          {ENVIRONMENTS.map(env => (
            <li className={styles.environment} key={env}>
              <button
                className={styles.environmentButton}
                type="button"
                onClick={selectEnvironment(env)}
              >
                {translateEnvironments(env)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {!!monsters && <div>{monsters}</div>}
    </div>
  );
}

export default PartyInfo;
