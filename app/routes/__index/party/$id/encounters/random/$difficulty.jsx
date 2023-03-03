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
import { useContext, useState } from 'react';
import EncounterContext from '~/components/contexts/encounterContext';

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
  const formData = await request.formData();
  const partyId = formData.get('partyId');

  return redirect(`/party/${partyId}/encounters/combat`);
};

function PartyInfo() {
  const { party, pcs, difficulty } = useLoaderData();
  const { id } = party;

  useAddMenuItems('/party', [
    { name: id, url: `/party/${id}`, level: 1 },
    { name: 'Encuentros', url: `/party/${id}/encounters`, level: 2 },
  ]);

  const [monsters, setMonsters] = useState(null);

  function selectEnvironment(env) {
    return () => {
      const monsterList = getRandomEncounter(pcs, difficulty, env);
      setMonsters(monsterList);
    };
  }

  const encounterContext = useContext(EncounterContext) || {};

  function onSubmit() {
    encounterContext.setMonsters(monsters);
  }

  return (
    <Form method="post" onSubmit={onSubmit}>
      <input readOnly type="text" name="partyId" value={id} hidden />
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
        {!!monsters && <div>{groupMonsters(monsters)}</div>}
        {!!monsters && (
          <div>
            <button type="submit">Empezar encuentro</button>
          </div>
        )}
      </div>
    </Form>
  );
}

export default PartyInfo;
