import { Link, useLoaderData } from '@remix-run/react';
import {
  Monster,
  badlyHurtHP,
  getMonsters,
  hurtHP,
  sortByXp,
} from '~/domain/encounters/monsters';
import { Card } from '~/components/cards/card';
import { ShrinkBar } from '~/components/indicators/shrinkBar';
import { getMonsterPositionStyle } from '~/domain/encounters/encounters';
import { getMaxHitPoints } from '~/domain/characters';
import { MultiLevelBar } from '~/components/indicators/multiLevelBar';
import { getAcBreakdown } from '~/domain/display';
import { CharacterItem } from '~/components/modal/characterItem';
import { useTitle } from '~/components/hooks/useTitle';
import NumericInput from '~/components/inputs/numeric';
import { useState } from 'react';
import { getMonstersFromEnvironment } from '~/domain/encounters/monsters';
import classNames from 'classnames';

export function MonstersCombat(props) {
  const {
    refsList,
    MAX_SEARCH_MOBS,
    openCharacterModal,
    initiativesList,
    initiatives,
    setMonsterRandomInitiative,
    setMonsterInitiative,
    setLocalPcInitiative,
    setRemotePcInitiative,
    setEncounterNotes,
    hover,
    setHover,
    resetInitiatives,
    setMobInitiatives,
    pcs,
    partyId,
    updatePcs,
    addMonsterToEncounter,
    addNpcToEncounter,
  } = props;

  const { encounter, allNpcs } = useLoaderData();
  const {
    id: encounterId,
    monsters: monstersStats,
    notes: initNotes = {},
  } = encounter;

  useTitle(`${encounter.group} - ${encounter.name}`);

  const monsters = sortByXp(
    getMonsters(
      monstersStats.map(m => m.name),
      monstersStats.map(m => m.nick)
    )
  );

  const [notes, setNotes] = useState(initNotes);
  const [newMonsterName, setNewMonsterName] = useState('');
  const [isCombatStarted, setIsCombatStarted] = useState(false);
  const [turn, setTurn] = useState(null);

  function nextTurn() {
    if (turn === null) {
      setTurn(0);
    } else {
      setTurn(t => {
        const nextTurn = t + 1;
        if (nextTurn >= initiativesList.length) {
          return 0;
        } else {
          return nextTurn;
        }
      });
    }
    setIsCombatStarted(true);
  }
  const allMonsters = getMonstersFromEnvironment();

  const filteredMonsters = allMonsters.filter(
    monster =>
      monster.name.toLowerCase().includes(newMonsterName.toLowerCase()) ||
      Monster(monster)
        .translation?.toLowerCase()
        .includes(newMonsterName.toLowerCase())
  );

  const filteredNpcs = allNpcs.filter(npc =>
    npc.name.toLowerCase().includes(newMonsterName.toLowerCase())
  );

  function onNotesChange(characterId, newNotes) {
    setNotes(old => ({ ...old, [characterId]: newNotes }));
  }

  function saveNotes() {
    setEncounterNotes(encounterId, notes);
  }

  function handleAddMonster(monsterName) {
    setNewMonsterName('');
    addMonsterToEncounter(monsterName);
  }

  function handleAddNpc(npcName) {
    setNewMonsterName('');
    addNpcToEncounter(npcName);
  }

  return (
    <>
      <div className="encounters__initiative-menu">
        <p className="encounters__buttons-row">
          <button
            type="button"
            name="startCombat"
            className="encounters__damage-button cards__button-card"
            onClick={nextTurn}
          >
            {turn === null ? 'Empezar Combate' : 'Siguiente Turno'}
          </button>
          <button
            name="endCombat"
            value="true"
            className="encounters__damage-button cards__button-card"
            disabled={!isCombatStarted}
          >
            Terminar Combate
          </button>
        </p>
        <Card title="Iniciativa">
          <div className="encounters__initiative-buttons">
            <button
              type="button"
              className="encounters__damage-button cards__button-card"
              onClick={updatePcs}
            >
              Actualizar
            </button>
            <button
              type="button"
              className="encounters__damage-button cards__button-card"
              onClick={resetInitiatives}
            >
              Reiniciar
            </button>
            <button
              type="button"
              className="encounters__damage-button cards__button-card"
              onClick={setMobInitiatives(
                monsters.map(m => m.details.stats.dex)
              )}
            >
              Lanzar
            </button>
          </div>
          <ol className="encounters__initiative-list">
            {initiativesList.map((obj, initiativeIndex) => (
              <li
                className={classNames('encounters__initiative-item', {
                  'encounters__initiative-item--turn': initiativeIndex === turn,
                })}
                onMouseEnter={() =>
                  setHover(old => ({ ...old, [obj.type]: obj.index }))
                }
                onMouseLeave={() =>
                  setHover(old => ({ ...old, [obj.type]: null }))
                }
                key={initiativeIndex}
              >
                (<span>{obj.value}</span>) <span>{obj.name}</span>
              </li>
            ))}
          </ol>
        </Card>
        <Card title="Añadir NPC">
          <input
            type="text"
            value={newMonsterName}
            onChange={e => setNewMonsterName(e.target.value)}
            placeholder="Buscar NPC..."
            className="encounters__monster-search"
          />
          <ul className="encounters__initiative-list">
            {newMonsterName &&
              filteredMonsters
                .slice(0, MAX_SEARCH_MOBS)
                .map((monster, monsterIndex) => (
                  <li
                    key={monster.name}
                    onClick={() => handleAddMonster(monster.name)}
                    className="encounters__initiative-item"
                  >
                    <CharacterItem
                      ref={refsList.searchMobs.current[monsterIndex]}
                      character={Monster(monster)}
                      nick={monster.nick}
                      openModal={openCharacterModal(
                        Monster(monster),
                        'searchMobs',
                        monsterIndex
                      )}
                      openOnRightClick
                    />
                  </li>
                ))}
            {newMonsterName &&
              filteredNpcs.map(npc => (
                <li
                  key={npc.id}
                  onClick={() => handleAddNpc(npc.name)}
                  className="encounters__initiative-item"
                >
                  {npc.name}
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <div className="encounters__container">
        <h2>Enemigos</h2>
        <div className="cards encounters__monster-list">
          {monsters?.map((monster, monsterIndex, all) => {
            const {
              hp,
              maxHp,
              id: monsterId,
            } = monstersStats[monsterIndex] || {};
            const isAlive = hp > 0;

            return (
              <Card
                title={() => (
                  <CharacterItem
                    ref={refsList.mobs.current[monsterIndex]}
                    character={Monster(monster.name)}
                    nick={monster.nick}
                    openModal={openCharacterModal(
                      Monster(monster.name),
                      'mobs',
                      monsterIndex
                    )}
                    openOnRightClick
                  />
                )}
                className={`encounters__character-card ${
                  hover.mobs === monsterIndex
                    ? 'encounters__character-card--highlight'
                    : Object.values(initiativesList)[turn]?.name ===
                      monster.nick
                    ? 'encounters__character-card--turn'
                    : ''
                }`}
                titleClass="encounters__character-name"
                key={monster.nick || monster.name + '-' + monsterIndex}
                style={getMonsterPositionStyle(monsterIndex, all.length)}
              >
                {isAlive && (
                  <div className="encounters__bar">
                    HP{' '}
                    <ShrinkBar
                      cursorPos={hp}
                      maxValue={maxHp}
                      midValue={hurtHP(monstersStats[monsterIndex])}
                      lowValue={badlyHurtHP(monstersStats[monsterIndex])}
                    />
                  </div>
                )}
                {!isAlive && (
                  <div className="encounters__death">
                    <span className="encounters__death-icon">☠</span> Muerto
                  </div>
                )}
                <div className="encounters__buttons">
                  <div className="encounters__buttons-column">
                    {isAlive && (
                      <div className="encounters__button-container">
                        <button
                          name="damage"
                          value={monsterId}
                          className="encounters__damage-button cards__button-card"
                        >
                          Daño
                        </button>
                        <input
                          type="text"
                          name={`damage-${monsterId}`}
                          className="encounters__damage-input cards__button-card"
                        />
                      </div>
                    )}
                    <div className="encounters__button-container">
                      <button
                        name="heal"
                        value={monsterId}
                        className="encounters__damage-button cards__button-card"
                      >
                        Curación
                      </button>
                      <input
                        type="text"
                        name={`heal-${monsterId}`}
                        className="encounters__damage-input cards__button-card"
                      />
                    </div>
                  </div>

                  <div className="encounters__buttons-column">
                    <div className="encounters__button-container">
                      <label
                        htmlFor={`initiative-${monsterId}`}
                        className="encounters__initiative-label"
                        onClick={setMonsterRandomInitiative(
                          monsterIndex,
                          monsters[monsterIndex].details.stats.dex
                        )}
                      >
                        Iniciativa{' '}
                        <NumericInput
                          name={`initiative-${monsterId}`}
                          value={initiatives.mobs[monsterIndex]}
                          onClick={e => e.stopPropagation()}
                          onChange={setMonsterInitiative(monsterIndex)}
                          styleName="encounters__initiative-input cards__button-card"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <textarea
                  className="encounters__notes"
                  name={`notes-${monsterId}`}
                  value={notes[monsterId]}
                  onChange={e => onNotesChange(monsterId, e.target.value)}
                  onBlur={saveNotes}
                ></textarea>
              </Card>
            );
          })}
        </div>

        {!!pcs?.length && (
          <>
            <h2>PCs</h2>
            <div className="cards encounters__monster-list">
              {pcs.map((pc, pcIndex, all) => {
                const maxHitPoints = getMaxHitPoints(pc);
                const acBreakdown = getAcBreakdown(pc);
                const isAlive = pc.hitPoints > -maxHitPoints;
                let tag = acBreakdown.base;
                const levels = [
                  ...(tag > 10
                    ? [
                        {
                          size: Math.floor(10 / 2),
                          thickness: 0,
                          tag: 10,
                          tooltip: 'Base',
                          style: { color: 'var(--color-x-pale)' },
                        },
                        {
                          size: Math.floor((acBreakdown.base - 10) / 2),
                          thickness: 1,
                          tag,
                          tooltip: acBreakdown.title,
                          style: { color: 'var(--color-x-pale)' },
                        },
                      ]
                    : [
                        {
                          size: Math.floor(acBreakdown.base / 2),
                          thickness: 0,
                          tag,
                          tooltip: 'Base',
                          style: { color: 'var(--color-x-pale)' },
                        },
                      ]),
                  ...acBreakdown.extras.reduce((lvls, extra, extraIndex) => {
                    tag += extra.ac === '(+2)' ? 2 : Number(extra.ac || 0);
                    return [
                      ...lvls,
                      {
                        size: 3 * parseInt(extra.ac?.slice(1), 10),
                        thickness: extraIndex + 1,
                        tag,
                        tooltip: extra.title,
                        style: { color: 'var(--color-x-blue-ink)' },
                      },
                    ];
                  }, []),
                ];

                return (
                  <Card
                    title={pc.name}
                    className={`encounters__character-card ${
                      hover.pcs === pcIndex
                        ? 'encounters__character-card--highlight'
                        : Object.values(initiativesList)[turn]?.name === pc.name
                        ? 'encounters__character-card--turn'
                        : ''
                    }`}
                    titleClass="encounters__character-name"
                    key={pc.id}
                    style={getMonsterPositionStyle(pcIndex, all.length)}
                  >
                    {' '}
                    <div className="encounters__bar">
                      HP{' '}
                      <ShrinkBar
                        cursorPos={pc.hitPoints}
                        extraValue={pc.temporaryHitPoints}
                        maxValue={maxHitPoints}
                        midValue={maxHitPoints / 2}
                        lowValue={maxHitPoints / 5}
                      />
                    </div>
                    <div className="encounters__bar">
                      AC <MultiLevelBar levels={levels} />
                    </div>
                    {!isAlive && (
                      <div className="encounters__death">
                        <span className="encounters__death-icon">☠</span> Muerto
                      </div>
                    )}
                    <div className="encounters__buttons">
                      <div className="encounters__buttons-column">
                        <div className="encounters__button-container">
                          <button
                            name="pc-damage"
                            value={pc.id}
                            className="encounters__damage-button cards__button-card"
                          >
                            Daño
                          </button>
                          <input
                            type="text"
                            name={`pc-damage-${pc.id}`}
                            className="encounters__damage-input cards__button-card"
                          />
                        </div>
                        <div className="encounters__buttons-container">
                          <button
                            name="pc-heal"
                            value={pc.id}
                            className="encounters__damage-button cards__button-card"
                          >
                            Curación
                          </button>
                          <input
                            type="text"
                            name={`pc-heal-${pc.id}`}
                            className="encounters__damage-input cards__button-card"
                          />
                        </div>
                      </div>
                      <div className="encounters__buttons-column">
                        <div className="encounters__button-container">
                          <label
                            htmlFor={`initiative-${pc.id}`}
                            className="encounters__initiative-label"
                          >
                            Iniciativa{' '}
                            <NumericInput
                              name={`initiative-${pc.id}`}
                              value={initiatives.pcs[pcIndex]}
                              onChange={setLocalPcInitiative(pcIndex)}
                              onBlur={setRemotePcInitiative(pcIndex)}
                              styleName="encounters__initiative-input cards__button-card"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <textarea
                      className="encounters__notes"
                      name={`notes-${pc.id}`}
                      value={notes[pc.id]}
                      onChange={e => onNotesChange(pc.id, e.target.value)}
                      onBlur={saveNotes}
                    ></textarea>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
