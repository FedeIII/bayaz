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

import styles from '~/components/newEncounter.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

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
    <div className="encounter__sidebar">
      <div className="encounter__sidebar-content">
        <div className="encounter__sidebar-section">
          <div className="encounter__filter-vertical">
            <span className="encounter__filter-label">Party:</span>{' '}
            <div className="encounter__filter-options">
              {pcs.map(pc => (
                <span className="cards__button-card" key={pc.name}>
                  {pc.name}
                  <br />
                  Nivel {pc.level}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="encounter__sidebar-section">
          <div className="encounter__filter-vertical">
            <span className="encounter__filter-label">Dificultad:</span>{' '}
            <div className="encounter__filter-options">
              {DIFFICULTIES.map(difficulty => {
                const difficultyXp = getPartyXpThreshold(pcs, difficulty);
                return (
                  <button
                    type="button"
                    className="cards__button-card"
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
          <div className="encounter__filter">
            <span className="encounter__filter-label-inline">Entorno:</span>{' '}
            <select
              className="cards__button-card cards__button-card-big"
              onChange={e => selectEnvironment(e.target.value)}
              defaultValue="-"
            >
              <option value="">Todos</option>
              {ENVIRONMENTS.map(env => (
                <option
                  className="encounter__environment-button"
                  value={env}
                  key={env}
                >
                  {translateEnvironments(env)}
                </option>
              ))}
            </select>
          </div>
          <div className="encounter__filter-group">
            <span className="encounter__filter-label">Filtros</span>
            <div className="encounter__filter">
              <label htmlFor="name" className="encounter__filter-item">
                <span className="encounter__filter-name">Nombre: </span>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  className="encounter__filter-input cards__button-card"
                  onChange={e =>
                    setFilters(f => ({ ...f, name: e.target.value }))
                  }
                />
              </label>
              <label htmlFor="xp" className="encounter__filter-item">
                <span className="encounter__filter-name">xp {'<='} </span>
                <input
                  type="number"
                  name="xp"
                  value={filters.xp}
                  className="encounter__filter-input cards__button-card"
                  onChange={e =>
                    setFilters(f => ({
                      ...f,
                      xp: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </label>
              <label htmlFor="cr" className="encounter__filter-item">
                <span className="encounter__filter-name">CR {'<='} </span>
                <input
                  type="number"
                  name="cr"
                  value={filters.cr}
                  className="encounter__filter-input cards__button-card"
                  onChange={e =>
                    setFilters(f => ({
                      ...f,
                      cr: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </label>
              <label htmlFor="size" className="encounter__filter-item">
                <span className="encounter__filter-name">Tamaño</span>
                <select
                  type="number"
                  name="size"
                  value={filters.size}
                  className="encounter__filter-select cards__button-card"
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
    <div className="encounter__selected-monsters">
      <h3 className="encounter__selected-monsters-title">
        Monstruos seleccionados{' '}
        <div className="encounter__encounter-stats">
          (
          <span
            className={
              encounterXp > xpThreshold
                ? 'encounter__metric-warning'
                : encounterXp === xpThreshold
                ? 'encounter__metric-fit'
                : 'encounter__metric'
            }
          >
            {encounterXp} xp
          </span>
          ,{' '}
          <span
            className={
              encounterChallenge > partyMaxLevel
                ? 'encounter__metric-warning'
                : encounterChallenge === partyMaxLevel
                ? 'encounter__metric-fit'
                : 'encounter__metric'
            }
          >
            CR {encounterChallenge}
          </span>
          )
        </div>
      </h3>
      {!!encounterMonsters.length && (
        <div className="cards encounter__monsters">
          {sortByXp(encounterMonsters).map((m, i, all) => (
            <div
              className="cards__button-card"
              style={getMonsterPositionStyle(i, all.length)}
              onClick={() => removeMonsterFromEncounter(i)}
              key={m.name + i}
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
        <div className="encounter__submit">
          <button type="submit" className="cards__button-card">
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
    <div className="encounter__monsters">
      {monsterList.map((monstersByCr, crIndex) => (
        <div className="encounter__cr-group" key={crIndex}>
          <div
            className={
              !!encounterMonsters.length
                ? 'encounter__cr-header encounter__cr-header-down'
                : 'encounter__cr-header'
            }
          >
            <span className="encounter__cr-title">CR {crIndex}</span>
            <div className="encounter__cr-column-headers">
              {Array.from(Array(monstersByCr.length > 1 ? 2 : 1), (_, i) => (
                <div className="encounter__cr-xp-cr" key={i}>
                  <span className="encounter__cr-xp">xp</span>
                  {crIndex === 0 && <span className="encounter__cr-cr">CR</span>}
                </div>
              ))}
            </div>
          </div>
          <ul className="encounter__cr-monsters">
            {monstersByCr.map((monster, i) => (
              <li
                className="encounter__monster-button"
                data-suitable={isMonsterSuitable(
                  monster,
                  encounterMonsters.length,
                  numberOfPcs,
                  xpThreshold,
                  encounterXp,
                  partyMaxLevel
                )}
                onClick={() => addMonsterToEncounter(monster)}
                key={monster.name + i}
              >
                <div className="encounter__monster-info">
                  <span className="encounter__monster-name">
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
                  <div className="encounter__monster-stats">
                    <span className="encounter__monster-xp">
                      {Monster(monster).xp}
                    </span>
                    {crIndex === 0 && (
                      <span className="encounter__monster-cr">
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

      <div className="encounter">
        <Sidebar
          pcs={pcs}
          selectDifficulty={selectDifficulty}
          xpThreshold={xpThreshold}
          selectEnvironment={selectEnvironment}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="encounter__body">
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
