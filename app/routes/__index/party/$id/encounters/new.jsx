import { useContext, useEffect, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import {
  ENVIRONMENTS,
  getEncounterChallenge,
  getEncounterXp,
  getMonsterPositionStyle,
  getPartyXpThreshold,
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
  sortByXp,
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
          (!filters.xp || Monster(m).xp <= filters.xp)
      )
    );
  }, [filters.name, filters.xp]);

  function selectEnvironment(env) {
    const monsters = getMonstersFromEnvironment(env);
    setMonsterList(monsters);
    setFilteredMonsterList(monsters);
  }

  const encounterXp = getEncounterXp(encounterMonsters, pcs);
  const encounterChallenge = getEncounterChallenge(encounterMonsters);
  const groupedFilteredMonsterList = groupByCR(filteredMonsterList);

  return (
    <Form method="post">
      <input readOnly type="text" name="partyId" value={party.id} hidden />
      <div className={styles.newEncounter}>
        <div className={styles.encounterSidebar}>
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarSection}>
              <div className={styles.filterVertical}>
                <span className={styles.filterLabel}>Party:</span>{' '}
                <div className={styles.filterOptions}>
                  {pcs.map(pc => (
                    <span className={`${cardStyles.buttonCard}`}>
                      {pc.name}
                      <br />
                      Nivel {pc.level}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.sidebarSection}>
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
                    <span className={styles.filterName}>Nombre: </span>
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
                    <span className={styles.filterName}>XP {'<='} </span>
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
          </div>
        </div>
        <div className={styles.encounterBody}>
          <div className={styles.selectedMonsters}>
            <h3 className={styles.selectedMonstersTitle}>
              Monstruos seleccionados{' '}
              <div className={styles.encounterStats}>
                (
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
              </div>
            </h3>
            {!!encounterMonsters.length && (
              <div
                className={`${cardStyles.cards} ${styles.encounterMonsters}`}
              >
                {sortByXp(encounterMonsters).map((m, i) => (
                  <div
                    className={cardStyles.buttonCard}
                    style={getMonsterPositionStyle(i)}
                    onClick={() =>
                      setEncounterMonsters(list => [
                        ...list.slice(0, i),
                        ...list.slice(i + 1),
                      ])
                    }
                  >
                    {Monster(m).translation}
                  </div>
                ))}
              </div>
            )}
          </div>
          {!!filteredMonsterList.length && (
            <div className={styles.monsters}>
              {groupedFilteredMonsterList.map((monstersByCr, crIndex) => (
                <div className={styles.crGroup} key={crIndex}>
                  <div
                    className={
                      !!encounterMonsters.length
                        ? `${styles.crHeader} ${styles.crHeaderDown}`
                        : styles.crHeader
                    }
                  >
                    <span className={styles.crTitle}>CR {crIndex}</span>
                    <div className={styles.crColumnHeaders}>
                      {Array.from(
                        Array(monstersByCr.length > 1 ? 2 : 1),
                        () => (
                          <div className={styles.crXpCr}>
                            <span className={styles.crXp}>XP</span>
                            {crIndex === 0 && (
                              <span className={styles.crCr}>CR</span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <ul className={styles.crMonsters}>
                    {sortByXp(monstersByCr).map(monster => (
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
                        <div className={styles.monsterInfo}>
                          <span className={styles.monsterName}>
                            {Monster(monster).translation}
                          </span>{' '}
                          <div className={styles.monsterStats}>
                            <span className={styles.monsterXp}>
                              {Monster(monster).xp}
                            </span>
                            {crIndex === 0 && (
                              <span className={styles.monsterCr}>
                                {Monster(monster).challenge}
                              </span>
                            )}
                          </div>
                        </div>
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
