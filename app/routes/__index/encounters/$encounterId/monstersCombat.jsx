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
import { replaceAt } from '~/utils/array';
import { rollDice } from '~/domain/random';
import { useTitle } from '~/components/hooks/useTitle';
import NumericInput from '~/components/inputs/numeric';
import { useMemo, useState } from 'react';

export function MonstersCombat(props) {
  const {
    refsList,
    openCharacterModal,
    initiativesList,
    initiatives,
    setInitiatives,
    hover,
    setHover,
    resetInitiatives,
    setMobInitiatives,
    pcs,
    partyId,
    updatePcs,
  } = props;

  const { encounter } = useLoaderData();
  const { id: encounterId, monsters: monstersStats } = encounter;

  useTitle(`${encounter.group} - ${encounter.name}`);

  const monsters = sortByXp(
    getMonsters(
      monstersStats.map(m => m.name),
      monstersStats.map(m => m.nick)
    )
  );

  const initNotes = useMemo(
    () => Array(monsters.length).fill(null),
    [monsters.length]
  );

  const [notes, setNotes] = useState(initNotes);

  return (
    <>
      <div className="encounters__initiative-menu">
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
              onClick={setMobInitiatives}
            >
              Lanzar
            </button>
          </div>
          <ol className="encounters__initiative-list">
            {initiativesList.map((obj, i) => (
              <li
                className="encounters__initiative-item"
                onMouseEnter={() =>
                  setHover(old => ({ ...old, [obj.type]: obj.index }))
                }
                onMouseLeave={() =>
                  setHover(old => ({ ...old, [obj.type]: null }))
                }
                key={i}
              >
                (<span>{obj.value}</span>) <span>{obj.name}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="encounters__container">
        <h2>Enemigos</h2>
        <div className="cards encounters__monster-list">
          {monsters?.map((monster, i, all) => {
            const { hp, maxHp, id: monsterId } = monstersStats[i] || {};
            const isAlive = hp > 0;

            return (
              <Card
                title={() => (
                  <CharacterItem
                    ref={refsList.mobs.current[i]}
                    character={Monster(monster.name)}
                    nick={monster.nick}
                    charSection="mobs"
                    charIndex={i}
                    openModal={openCharacterModal(
                      Monster(monster.name),
                      'mobs',
                      i
                    )}
                  />
                )}
                className={`encounters__character-card ${
                  hover.mobs === i
                    ? 'encounters__character-card--highlight'
                    : ''
                }`}
                titleClass="encounters__character-name"
                key={monster.nick || monster.name + '-' + i}
                style={getMonsterPositionStyle(i, all.length)}
              >
                {isAlive && (
                  <div className="encounters__bar">
                    HP{' '}
                    <ShrinkBar
                      cursorPos={hp}
                      maxValue={maxHp}
                      midValue={hurtHP(monstersStats[i])}
                      lowValue={badlyHurtHP(monstersStats[i])}
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
                        onClick={() =>
                          setInitiatives(old => ({
                            ...old,
                            monsters: replaceAt(
                              i,
                              old.monsters,
                              rollDice('1d20')
                            ),
                          }))
                        }
                      >
                        Iniciativa{' '}
                        <NumericInput
                          name={`initiative-${monsterId}`}
                          value={initiatives.mobs[i]}
                          onChange={e =>
                            setInitiatives(old => ({
                              ...old,
                              monsters: replaceAt(
                                i,
                                old.monsters,
                                e.target.value
                              ),
                            }))
                          }
                          styleName="encounters__initiative-input cards__button-card"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <textarea
                  className="encounters__notes"
                  name={`notes-${monsterId}`}
                  defaultValue={''}
                  value={notes[i]}
                  onChange={e =>
                    setNotes(old => replaceAt(i, old, e.target.value))
                  }
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
                const isAlive = pc.hitPoints > -maxHitPoints;
                const acBreakdown = getAcBreakdown(pc);
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
                        : ''
                    }`}
                    titleClass="encounters__character-name"
                    key={pc.id}
                    style={getMonsterPositionStyle(pcIndex, all.length)}
                  >
                    {isAlive && (
                      <>
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
                            <span className="encounters__death-icon">☠</span>{' '}
                            Muerto
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
                                  onChange={e =>
                                    setInitiatives(old => ({
                                      ...old,
                                      pcs: replaceAt(
                                        pcIndex,
                                        old.pcs,
                                        e.target.value
                                      ),
                                    }))
                                  }
                                  styleName="encounters__initiative-input cards__button-card"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <textarea
                          className="encounters__notes"
                          name={`notes-${pc.id}`}
                          defaultValue={''}
                        ></textarea>
                      </>
                    )}
                  </Card>
                );
              })}
            </div>

            <p className="encounters__buttons-row">
              <Link
                to={`/party/${partyId}/encounters/${encounterId}/players`}
                className="encounters__damage-button cards__button-card"
                target="_blank"
              >
                Mostrar Combate
              </Link>
              <button
                name="endCombat"
                value="true"
                className="encounters__damage-button cards__button-card"
              >
                Terminar Combate
              </button>
            </p>
          </>
        )}
      </div>
    </>
  );
}
