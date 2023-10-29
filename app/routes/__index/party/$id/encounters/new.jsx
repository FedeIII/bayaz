import { useEffect, useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import {
  DIFFICULTIES,
  ENVIRONMENTS,
  getEncounterChallenge,
  getEncounterXp,
  getMonsterPositionStyle,
  getPartyXpThreshold,
  translateDifficulty,
  translateEnvironments,
} from '~/domain/encounters/encounters';
import { getPartyMaxLevel } from '~/domain/party/party';
import {
  getMonsterHitPoints,
  getMonsters,
  getMonstersFromEnvironment,
  groupByCR,
  isMonsterSuitable,
  Monster,
  MONSTER_SIZES,
  sortByXp,
  translateSize,
} from '~/domain/encounters/monsters';
import { rollDice } from '~/domain/random';
import { createEncounter } from '~/services/encounter.server';
import { useTitle } from '~/components/hooks/useTitle';
import { useCharacterItems } from '~/components/modal/useCharacterItems';
import { CharacterModal } from '~/components/modal/characterModal';
import { CharacterItem } from '~/components/modal/characterItem';

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

function Sidebar(props) {
  const {
    pcs,
    selectDifficulty,
    xpThreshold,
    selectEnvironment,
    filters,
    setFilters,
  } = props;

  return (
    <div className={styles.encounterSidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarSection}>
          <div className={styles.filterVertical}>
            <span className={styles.filterLabel}>Party:</span>{' '}
            <div className={styles.filterOptions}>
              {pcs.map(pc => (
                <span className={`${cardStyles.buttonCard}`} key={pc.name}>
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
              {DIFFICULTIES.map(difficulty => {
                const difficultyXp = getPartyXpThreshold(pcs, difficulty);
                return (
                  <button
                    type="button"
                    className={`${cardStyles.buttonCard}`}
                    onClick={() => selectDifficulty(difficulty)}
                    key={difficulty}
                    data-selected={xpThreshold === difficultyXp}
                  >
                    <span>{translateDifficulty(difficulty)}</span>
                    <br />
                    <span>({difficultyXp} xp)</span>
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
              <option value="">Todos</option>
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
              <label htmlFor="xp" className={styles.filterItem}>
                <span className={styles.filterName}>xp {'<='} </span>
                <input
                  type="number"
                  name="xp"
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
              <label htmlFor="cr" className={styles.filterItem}>
                <span className={styles.filterName}>CR {'<='} </span>
                <input
                  type="number"
                  name="cr"
                  value={filters.cr}
                  className={`${styles.filterInput} ${cardStyles.buttonCard}`}
                  onChange={e =>
                    setFilters(f => ({
                      ...f,
                      cr: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </label>
              <label htmlFor="size" className={styles.filterItem}>
                <span className={styles.filterName}>Tamaño</span>
                <select
                  type="number"
                  name="size"
                  value={filters.size}
                  className={`${styles.filterSelect} ${cardStyles.buttonCard}`}
                  onChange={e =>
                    setFilters(f => ({
                      ...f,
                      size: e.target.value,
                    }))
                  }
                >
                  <option value="">Todos</option>
                  {MONSTER_SIZES.map(size => (
                    <option value={size} key={size}>
                      {translateSize(size)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectedMonsters(props) {
  const {
    xpThreshold,
    partyMaxLevel,
    encounterMonsters,
    encounterXp,
    removeMonsterFromEncounter,
  } = props;

  const encounterChallenge = getEncounterChallenge(encounterMonsters);

  return (
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
            {encounterXp} xp
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
        <div className={`${cardStyles.cards} ${styles.encounterMonsters}`}>
          {sortByXp(encounterMonsters).map((m, i, all) => (
            <div
              className={cardStyles.buttonCard}
              style={getMonsterPositionStyle(i, all.length)}
              onClick={() => removeMonsterFromEncounter(i)}
            >
              {Monster(m).translation}
            </div>
          ))}
        </div>
      )}
      {!!encounterMonsters.length && (
        <input
          readOnly
          type="text"
          name="monsters"
          value={encounterMonsters.map(m => Monster(m).name).join('|')}
          hidden
        />
      )}
      {!!encounterMonsters.length && (
        <div className={styles.submit}>
          <button type="submit" className={cardStyles.buttonCard}>
            Crear
          </button>
        </div>
      )}
    </div>
  );
}

function MonsterCatalog(props) {
  const {
    numberOfPcs,
    monsterList,
    encounterMonsters,
    xpThreshold,
    encounterXp,
    partyMaxLevel,
    addMonsterToEncounter,
    monsterRefs,
    openMonsterModal,
  } = props;

  return (
    <div className={styles.monsters}>
      {monsterList.map((monstersByCr, crIndex) => (
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
              {Array.from(Array(monstersByCr.length > 1 ? 2 : 1), () => (
                <div className={styles.crXpCr}>
                  <span className={styles.crXp}>xp</span>
                  {crIndex === 0 && <span className={styles.crCr}>CR</span>}
                </div>
              ))}
            </div>
          </div>
          <ul className={styles.crMonsters}>
            {monstersByCr.map(monster => (
              <li
                className={`${styles.monsterButton}`}
                data-suitable={isMonsterSuitable(
                  monster,
                  encounterMonsters.length,
                  numberOfPcs,
                  xpThreshold,
                  encounterXp,
                  partyMaxLevel
                )}
                onClick={() => addMonsterToEncounter(monster)}
                key={monster.name}
              >
                <div className={styles.monsterInfo}>
                  <span className={styles.monsterName}>
                    <CharacterItem
                      ref={monsterRefs[Monster(monster).name][0]}
                      character={Monster(monster)}
                      charSection={Monster(monster).name}
                      openModal={openMonsterModal(
                        Monster(monster),
                        Monster(monster).name
                      )}
                      openOnRightClick
                    />
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
  );
}

function NewEncounter() {
  const { party, pcs } = useLoaderData();

  useTitle('Nuevo encuentro');

  const partyMaxLevel = getPartyMaxLevel(pcs);
  const allMonsters = getMonstersFromEnvironment();

  const [xpThreshold, setXpThreshold] = useState(null);
  const [encounterXp, setEncounterXp] = useState(null);
  const [monsterList, setMonsterList] = useState(allMonsters);
  const [filteredMonsterList, setFilteredMonsterList] = useState([]);
  const [encounterMonsters, setEncounterMonsters] = useState([]);
  const [filters, setFilters] = useState({ name: '', xp: 0, cr: 0, size: '' });

  function selectDifficulty(difficulty) {
    const difficultyXp = getPartyXpThreshold(pcs, difficulty);
    setXpThreshold(difficultyXp);
  }

  useEffect(() => selectDifficulty('medium'), []);

  useEffect(() => {
    setEncounterXp(getEncounterXp(encounterMonsters, pcs.length));
  }, [encounterMonsters]);

  function addMonsterToEncounter(monster) {
    setEncounterMonsters(list => [...list, monster]);
  }

  function removeMonsterFromEncounter(monsterIndex) {
    setEncounterMonsters(list => [
      ...list.slice(0, monsterIndex),
      ...list.slice(monsterIndex + 1),
    ]);
  }

  useEffect(() => {
    setFilteredMonsterList(
      monsterList.filter(
        m =>
          Monster(m)
            .translation.toLowerCase()
            .includes(filters.name.toLowerCase()) &&
          (!filters.xp || Monster(m).xp <= filters.xp) &&
          (!filters.cr || Monster(m).challenge <= filters.cr) &&
          (!filters.size || Monster(m).size === filters.size)
      )
    );
  }, [filters.name, filters.xp, filters.cr, filters.size]);

  function selectEnvironment(env) {
    const monsters = getMonstersFromEnvironment(env);
    setMonsterList(monsters);
    setFilteredMonsterList(monsters);
  }

  const groupedFilteredMonsterList = groupByCR(filteredMonsterList);

  const [monsterRefs, setMonsterRefs] = useState(
    allMonsters.reduce((refs, m) => ({ ...refs, [m.name]: [useRef()] }), {})
  );

  const [
    monsterModalContent,
    closeMonsterModal,
    openMonsterModal,
    selectedMonsterRef,
    setSelectedMonsterRef,
  ] = useCharacterItems(monsterRefs);

  const formRef = useRef(null);

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="partyId" value={party.id} hidden />

      {monsterModalContent && (
        <CharacterModal
          elRef={selectedMonsterRef}
          formRef={formRef}
          closeModal={closeMonsterModal}
        >
          {monsterModalContent}
        </CharacterModal>
      )}

      <div className={styles.newEncounter}>
        <Sidebar
          pcs={pcs}
          selectDifficulty={selectDifficulty}
          xpThreshold={xpThreshold}
          selectEnvironment={selectEnvironment}
          filters={filters}
          setFilters={setFilters}
        />
        <div className={styles.encounterBody}>
          <SelectedMonsters
            xpThreshold={xpThreshold}
            partyMaxLevel={partyMaxLevel}
            encounterMonsters={encounterMonsters}
            encounterXp={encounterXp}
            removeMonsterFromEncounter={removeMonsterFromEncounter}
          />
          {!!filteredMonsterList.length && (
            <MonsterCatalog
              numberOfPcs={pcs.length}
              monsterList={groupedFilteredMonsterList}
              encounterMonsters={encounterMonsters}
              xpThreshold={xpThreshold}
              encounterXp={encounterXp}
              partyMaxLevel={partyMaxLevel}
              addMonsterToEncounter={addMonsterToEncounter}
              monsterRefs={monsterRefs}
              openMonsterModal={openMonsterModal}
            />
          )}
        </div>
      </div>
    </Form>
  );
}

export default NewEncounter;
