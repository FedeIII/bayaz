import { useContext, useEffect, useRef, useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';

import {
  DIFFICULTIES,
  ENVIRONMENTS,
  getEncounterChallenge,
  getEncounterDifficulty,
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
import random, { rollDice } from '~/domain/random';
import { createEncounter } from '~/services/encounter.server';
import { useTitle } from '~/components/hooks/useTitle';
import { useCharacterItems } from '~/components/modal/useCharacterItems';
import { CharacterModal } from '~/components/modal/characterModal';
import { CharacterItem } from '~/components/modal/characterItem';
import { replaceAt } from '~/utils/insert';
import useAmount from '~/components/hooks/useAmount';
import { t } from '~/domain/translations';
import { Title } from '~/components/form/title';

import styles from '~/components/newEncounter.css';
import placesStyles from '~/components/places.css';
import PartyTemplateContext from '~/components/contexts/partyTemplateContext';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: placesStyles },
  ];
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const encounterGroup = formData.get('encounterGroup');
  const encounterName = formData.get('encounterName');
  const monstersNames = formData.get('monsters');

  const monsters = getMonsters(monstersNames).map(monster => {
    const maxHp = rollDice(getMonsterHitPoints(monster));
    return {
      name: monster.name,
      maxHp,
      hp: maxHp,
    };
  });

  const encounter = await createEncounter(
    encounterGroup,
    encounterName,
    monsters
  );

  return redirect(`/encounters/${encounter.id}`);
};

function Sidebar(props) {
  const {
    pcLevels,
    setPcLevels,
    selectDifficulty,
    xpThreshold,
    selectEnvironment,
    filters,
    setFilters,
  } = props;

  const [setPcLevelsAmount, reducePcLevelsAmount, increasePcLevelsAmount] =
    useAmount(
      pcLevels,
      () => pcLevels[pcLevels.length - 1] || 1,
      setPcLevels,
      20
    );

  useEffect(() => {
    setPcLevelsAmount(pcLevels.length);
  }, [pcLevels]);

  return (
    <div className="encounter__sidebar">
      <div className="encounter__sidebar-content">
        <div className="encounter__sidebar-section">
          <div className="encounter__filter-vertical">
            <div className="encounter__filter-title">
              <span className="encounter__filter-label">Party levels</span>{' '}
              <div className="places__trait-modifiers">
                <button
                  type="button"
                  className="places__trait-button"
                  onClick={reducePcLevelsAmount}
                >
                  -
                </button>
                <button
                  type="button"
                  className="places__trait-button"
                  onClick={increasePcLevelsAmount}
                >
                  +
                </button>
              </div>
            </div>
            <div className="encounter__filter-options">
              {pcLevels.map((level, i) => (
                <span>
                  <input
                    key={i}
                    className="encounter__input-number"
                    type="number"
                    value={level}
                    onChange={e =>
                      setPcLevels(old =>
                        replaceAt(i, old, parseInt(e.target.value, 10) || 1)
                      )
                    }
                  />
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
                const difficultyXp = getPartyXpThreshold(pcLevels, difficulty);
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
            <div className="encounter__filter encounter__filter--columns">
              <label htmlFor="mobName" className="encounter__filter-item">
                <span className="encounter__filter-name">Nombre: </span>
                <input
                  type="text"
                  id="mobName"
                  name="mobName"
                  value={filters.mobName}
                  className="encounter__filter-input cards__button-card"
                  onChange={e =>
                    setFilters(f => ({ ...f, mobName: e.target.value }))
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
                <span className="encounter__filter-name">CR {'>='} </span>
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
    pcLevels,
    xpThreshold,
    partyMaxLevel,
    encounterMonsters,
    encounterXp,
    removeMonsterFromEncounter,
  } = props;

  const encounterChallenge = getEncounterChallenge(encounterMonsters);

  return (
    <div className="encounter__selected-monsters">
      <div className="encounter__header">
        <div className="encounter__header-inputs">
          <label htmlFor="encounterGroup">
            <span className="encounter__header-input-title">Grupo</span>{' '}
            <Title
              inputName="encounterGroup"
              className="encounter__group"
              inputClass="encounter__name encounter__filter-input cards__button-card"
            />
          </label>
          <label htmlFor="encounterName" className="encounter__title-name">
            <span className="encounter__header-input-title">Nombre</span>{' '}
            <Title
              inputName="encounterName"
              className="encounter__selected-monsters-title"
              inputClass="encounter__name encounter__filter-input cards__button-card"
            />
          </label>
        </div>
        <div className="encounter__stats">
          <div className="encounter__stat">
            {t(getEncounterDifficulty(encounterMonsters, pcLevels))}
          </div>

          <div className="encounter__stat">
            <span
              className={`encounter__stat-label ${
                encounterXp > xpThreshold
                  ? 'encounter__metric-warning'
                  : encounterXp === xpThreshold
                  ? 'encounter__metric-fit'
                  : 'encounter__metric'
              }`}
            >
              {encounterXp} xp (
              {random.roundTo(1, encounterXp / pcLevels.length)} xp / pc)
            </span>
          </div>

          <div className="encounter__stat">
            <span
              className={`encounter__stat-label ${
                encounterChallenge > partyMaxLevel
                  ? 'encounter__metric-warning'
                  : encounterChallenge === partyMaxLevel
                  ? 'encounter__metric-fit'
                  : 'encounter__metric'
              }`}
            >
              CR {encounterChallenge}
            </span>
          </div>
        </div>
      </div>
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
                  {crIndex === 0 && (
                    <span className="encounter__cr-cr">CR</span>
                  )}
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
  useTitle('Nuevo encuentro');

  const partyTemplateContext = useContext(PartyTemplateContext) || {};
  const { partyTemplateState, setPartyTemplateState } = partyTemplateContext;

  const [pcLevels, setPcLevels] = useState(partyTemplateState || [1, 1, 1, 1]);

  useEffect(() => {
    setPartyTemplateState(pcLevels);
  }, [pcLevels]);

  const partyMaxLevel = getPartyMaxLevel(pcLevels);
  const allMonsters = getMonstersFromEnvironment();

  const [xpThreshold, setXpThreshold] = useState(null);
  const [encounterXp, setEncounterXp] = useState(null);
  const [monsterList, setMonsterList] = useState(allMonsters);
  const [filteredMonsterList, setFilteredMonsterList] = useState([]);
  const [encounterMonsters, setEncounterMonsters] = useState([]);
  const [filters, setFilters] = useState({
    mobName: '',
    xp: 0,
    cr: 0,
    size: '',
  });

  function selectDifficulty(difficulty) {
    const difficultyXp = getPartyXpThreshold(pcLevels, difficulty);
    setXpThreshold(difficultyXp);
  }

  useEffect(() => selectDifficulty('medium'), []);

  useEffect(() => {
    setEncounterXp(getEncounterXp(encounterMonsters, pcLevels.length));
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
            .includes(filters.mobName.toLowerCase()) &&
          (!filters.xp || Monster(m).xp <= filters.xp) &&
          (!filters.cr || Monster(m).challenge >= filters.cr) &&
          (!filters.size || Monster(m).size === filters.size)
      )
    );
  }, [filters.mobName, filters.xp, filters.cr, filters.size]);

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
    <Form method="post" ref={formRef} className="encounter__wrapper">
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
          pcLevels={pcLevels}
          setPcLevels={setPcLevels}
          selectDifficulty={selectDifficulty}
          xpThreshold={xpThreshold}
          selectEnvironment={selectEnvironment}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="encounter__body">
          <SelectedMonsters
            pcLevels={pcLevels}
            xpThreshold={xpThreshold}
            partyMaxLevel={partyMaxLevel}
            encounterMonsters={encounterMonsters}
            encounterXp={encounterXp}
            removeMonsterFromEncounter={removeMonsterFromEncounter}
          />
          {!!filteredMonsterList.length && (
            <MonsterCatalog
              numberOfPcs={pcLevels.length}
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
