import { useContext, useEffect, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import {
  ENVIRONMENTS,
  getEncounterChallenge,
  getEncounterXp,
  getPartyXpThreshold,
  groupMonsters,
  translateDifficulty,
  translateEnvironments,
} from '~/domain/encounters/encounters';
import { createEncounter } from '~/services/encounter.server';
import {
  getMonsterHitPoints,
  getMonsters,
  getMonstersFromEnvironment,
  isMonsterSuitable,
  Monster,
} from '~/domain/encounters/monsters';
import { rollDice } from '~/domain/random';
import XpContext from '~/components/contexts/xpContext';
import { getPartyMaxLevel } from '~/domain/party/party';

import styles from '~/components/encounters.module.css';

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

function PartyInfo() {
  const { party, pcs, difficulty } = useLoaderData();
  const { id } = party;

  const xpContext = useContext(XpContext) || {};
  const partyMaxLevel = getPartyMaxLevel(pcs);

  useEffect(() => {
    xpContext.setXp?.(getPartyXpThreshold(pcs, difficulty));
  }, []);

  const [environment, setEnvironment] = useState(null);
  const [monsterList, setMonsterList] = useState([]);
  const [filteredMonsterList, setFilteredMonsterList] = useState([]);
  const [encounterMonsters, setEncounterMonsters] = useState([]);
  const [filters, setFilters] = useState({ name: '', xp: 0 });

  useEffect(() => {
    setFilteredMonsterList(
      monsterList.filter(
        m =>
          Monster(m).translation.includes(filters.name) &&
          (filters.xp === 0 || Monster(m).xp < filters.xp)
      )
    );
  }, [filters.name, filters.xp]);

  function selectEnvironment(env) {
    return () => {
      const monsters = getMonstersFromEnvironment(env);
      setMonsterList(monsters);
      setFilteredMonsterList(monsters);
      setEnvironment(env);
    };
  }

  const encounterXp = getEncounterXp(encounterMonsters);
  const encounterChallenge = getEncounterChallenge(encounterMonsters);

  return (
    <Form method="post">
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
                  data-selected={environment === env}
                >
                  {translateEnvironments(env)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* {!!monsters && (
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
        )} */}
        <ul>
          <span>Monstruos seleccionados</span> (
          <span
            className={
              encounterXp > xpContext.xp
                ? styles.encounterMetricWarning
                : encounterXp === xpContext.xp
                ? styles.encounterMetricFit
                : styles.encounterMetric
            }
          >
            {encounterXp} XP
          </span>
          ,{' '}
          <span
            className={
              encounterChallenge > partyMaxLevel
                ? styles.encounterMetricWarning
                : encounterChallenge === partyMaxLevel
                ? styles.encounterMetricFit
                : styles.encounterMetric
            }
          >
            CR {encounterChallenge}
          </span>
          )
          <br />
          {groupMonsters(encounterMonsters)}
        </ul>
        <div>
          <h3>Filtros</h3>
          <label htmlFor="name">
            <span>Nombre: </span>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
            />
          </label>
          <label htmlFor="name">
            <span>XP {'<'} </span>
            <input
              type="number"
              name="name"
              value={filters.xp}
              onChange={e =>
                setFilters(f => ({ ...f, xp: parseInt(e.target.value, 10) }))
              }
            />
          </label>
        </div>
        <ul>
          {!!filteredMonsterList.length && (
            <div>
              {filteredMonsterList.map(monster => (
                <li key={monster.name}>
                  <button
                    type="button"
                    className={styles.environmentButton}
                    data-suitable={isMonsterSuitable(
                      monster,
                      xpContext.xp,
                      partyMaxLevel
                    )}
                    onClick={() =>
                      setEncounterMonsters(list => [...list, monster])
                    }
                  >
                    {Monster(monster).translation}
                  </button>{' '}
                  <span>
                    ({Monster(monster).xp} XP, CR {Monster(monster).challenge})
                  </span>
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>
    </Form>
  );
}

export default PartyInfo;
