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
import MenuContext from '~/components/contexts/menuContext';
import { getPartyMaxLevel } from '~/domain/party/party';
import {
  getMonstersFromEnvironment,
  groupByCR,
  isMonsterSuitable,
  Monster,
} from '~/domain/encounters/monsters';

import styles from '~/components/newEncounter.module.css';
import cardStyles from '~/components/cards/cards.module.css';

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
  const menuContext = useContext(MenuContext) || {};

  useEffect(() => {
    menuContext.setMenuTitle?.('Nuevo encuentro');
  }, []);

  const difficulties = ['easy', 'medium', 'hard', 'deadly'];
  const partyMaxLevel = getPartyMaxLevel(pcs);

  const [xpThreshold, setXpThreshold] = useState(null);
  const [monsterList, setMonsterList] = useState([]);
  const [filteredMonsterList, setFilteredMonsterList] = useState([]);
  const [encounterMonsters, setEncounterMonsters] = useState([]);
  const [filters, setFilters] = useState({ name: '', xp: 0 });

  useEffect(() => {
    setFilteredMonsterList(
      monsterList.filter(
        m =>
          Monster(m).translation.includes(filters.name) &&
          (!filters.xp || Monster(m).xp < filters.xp)
      )
    );
  }, [filters.name, filters.xp]);

  function selectEnvironment(env) {
    const monsters = getMonstersFromEnvironment(env);
    setMonsterList(monsters);
    setFilteredMonsterList(monsters);
  }

  const encounterXp = getEncounterXp(encounterMonsters);
  const encounterChallenge = getEncounterChallenge(encounterMonsters);
  const groupedFilteredMonsterList = groupByCR(filteredMonsterList);

  return (
    <Form method="post">
      <input readOnly type="text" name="partyId" value={party.id} hidden />
      <div className={styles.newEncounter}>
        <div className={styles.encounterSidebar}>
          <div className={styles.filterVertical}>
            <span className={styles.filterLabel}>Dificultad:</span>{' '}
            <div className={styles.filterOptions}>
              {difficulties.map(difficulty => {
                const difficultyXp = getPartyXpThreshold(pcs, difficulty);
                return (
                  <button
                    type="button"
                    className={`${cardStyles.buttonCard}`}
                    onClick={() => setXpThreshold(difficultyXp)}
                    key={difficulty}
                    data-selected={xpThreshold === difficultyXp}
                  >
                    <span>{translateDifficulty(difficulty)}</span>
                    <br />
                    <span>({difficultyXp} XP)</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles.filter}>
            <span className={styles.filterLabelInline}>Entorno:</span>{' '}
            <select
              className={`${cardStyles.buttonCard} ${cardStyles.buttonCardBig}`}
              onChange={e => selectEnvironment(e.target.value)}
              defaultValue="-"
            >
              <option value="-" disabled>
                -
              </option>
              {ENVIRONMENTS.map(env => (
                <option
                  className={styles.environmentButton}
                  value={env}
                  key={env}
                >
                  {translateEnvironments(env)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Filtros</span>
            <div className={styles.filters}>
              <label htmlFor="name" className={styles.filterItem}>
                <span>Nombre: </span>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  className={`${styles.filterInput} ${cardStyles.buttonCard}`}
                  onChange={e =>
                    setFilters(f => ({ ...f, name: e.target.value }))
                  }
                />
              </label>
              <label htmlFor="name" className={styles.filterItem}>
                <span>XP {'<'} </span>
                <input
                  type="number"
                  name="name"
                  value={filters.xp}
                  className={`${styles.filterInput} ${cardStyles.buttonCard}`}
                  onChange={e =>
                    setFilters(f => ({
                      ...f,
                      xp: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </label>
            </div>
          </div>
        </div>
        <div className={styles.encounterBody}>
          <ul>
            <span>Monstruos seleccionados</span> (
            <span
              className={
                encounterXp > xpThreshold
                  ? styles.encounterMetricWarning
                  : encounterXp === xpThreshold
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
          {!!filteredMonsterList.length && (
            <div className={styles.monsters}>
              {groupedFilteredMonsterList.map((monstersByCr, crIndex) => (
                <div className={styles.crGroup} key={crIndex}>
                  <span className={styles.crTitle}>CR {crIndex}</span>
                  <ul className={styles.crMonsters}>
                    {monstersByCr.map(monster => (
                      <li
                        className={`${styles.monsterButton}`}
                        data-suitable={isMonsterSuitable(
                          monster,
                          xpThreshold,
                          partyMaxLevel
                        )}
                        onClick={() =>
                          setEncounterMonsters(list => [...list, monster])
                        }
                        key={monster.name}
                      >
                        <span className={styles.monsterName}>
                          {Monster(monster).translation}
                        </span>{' '}
                        <span className={styles.monsterStats}>
                          ({Monster(monster).xp} XP, CR{' '}
                          {Monster(monster).challenge})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Form>
  );
}

export default PartyInfo;
