import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import {
  ENVIRONMENTS,
  getRandomEncounter,
  groupMonsters,
  translateDifficulty,
  translateEnvironments,
} from '~/domain/encounters/encounters';
import { createEncounter } from '~/services/encounter.server';
import { getMonsterHitPoints, getMonsters } from '~/domain/encounters/monsters';
import { rollDice } from '~/domain/random';

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = party.players.map(id => getPc(id));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs, difficulty: params.difficulty });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const partyId = formData.get('partyId');
  const monstersNames = formData.get('monsters');

  const monsters = getMonsters(monstersNames).map(monster => {
    const maxHp = rollDice(getMonsterHitPoints(monster));
    return {
      name: monster.name,
      maxHp,
      hp: maxHp,
    };
  });

  const encounter = await createEncounter(partyId, monsters);

  return redirect(`/party/${partyId}/encounters/${encounter.id}`);
};

function RandomEncounterDifficulty() {
  const { party, pcs, difficulty } = useLoaderData();
  const { id } = party;

  const [monsters, setMonsters] = useState(null);

  function selectEnvironment(env) {
    return () => {
      const monsterList = getRandomEncounter(
        pcs.map(pc => pc.level),
        difficulty,
        env
      );
      setMonsters(monsterList);
    };
  }

  return (
    <Form method="post">
      <input readOnly type="text" name="partyId" value={id} hidden />
      <div className="encounters__container">
        <h2>Encuentro {translateDifficulty(difficulty)}</h2>
        <div>
          <h3>Entorno:</h3>
          <ul className="encounters__difficulty-list">
            {ENVIRONMENTS.map(env => (
              <li className="encounters__environment" key={env}>
                <button
                  className="encounters__environment-button"
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
          <input
            readOnly
            type="text"
            name="monsters"
            value={monsters.map(monster => monster?.name).join('|')}
            hidden
          />
        )}
        {!!monsters && (
          <div>
            <button type="submit">Empezar encuentro</button>
          </div>
        )}
      </div>
    </Form>
  );
}

export default RandomEncounterDifficulty;
