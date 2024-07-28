import { Link, useLoaderData } from '@remix-run/react';
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
import { isNpcHurt, npcBadlyHurtHP, npcsToMonsters } from '~/domain/npc/npc';
import NumericInput from '~/components/inputs/numeric';

export function NpcsCombat(props) {
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

  const { encounter, npcs } = useLoaderData();
  const { id: encounterId } = encounter;

  useTitle(encounter.name);

  return (
    <>
      <input readOnly type="text" name="isNpcs" value="true" hidden />

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
          {npcs?.map((npc, i, all) => {
            const { hitPoints: hp } = npc || {};
            const maxHp = getMaxHitPoints(npc);
            const isAlive = hp > 0;

            return (
              <Card
                title={() => (
                  <CharacterItem
                    ref={refsList.mobs.current[i]}
                    character={npc}
                    charSection="mobs"
                    charIndex={i}
                    openModal={openCharacterModal(
                      npcsToMonsters([npc])[0],
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
                key={npc.name + '-' + i}
                style={getMonsterPositionStyle(i, all.length)}
              >
                {isAlive && (
                  <div className="encounters__bar">
                    HP{' '}
                    <ShrinkBar
                      cursorPos={hp}
                      maxValue={maxHp}
                      midValue={isNpcHurt(npc)}
                      lowValue={npcBadlyHurtHP(npc)}
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
                          value={npc.id}
                          className="encounters__damage-button cards__button-card"
                        >
                          Daño
                        </button>
                        <input
                          type="text"
                          name={`damage-${npc.id}`}
                          className="encounters__damage-input cards__button-card"
                        />
                      </div>
                    )}
                    <div className="encounters__button-container">
                      <button
                        name="heal"
                        value={npc.id}
                        className="encounters__damage-button cards__button-card"
                      >
                        Curación
                      </button>
                      <input
                        type="text"
                        name={`heal-${npc.id}`}
                        className="encounters__damage-input cards__button-card"
                      />
                    </div>
                  </div>

                  <div className="encounters__buttons-column">
                    <div className="encounters__button-container">
                      <label
                        htmlFor={`initiative-${npc.id}`}
                        className="encounters__initiative-label"
                        onClick={() =>
                          setInitiatives(old => ({
                            ...old,
                            mobs: replaceAt(i, old.mobs, rollDice('1d20')),
                          }))
                        }
                      >
                        Iniciativa{' '}
                        <NumericInput
                          name={`initiative-${npc.id}`}
                          value={initiatives.mobs[i]}
                          onChange={e =>
                            setInitiatives(old => ({
                              ...old,
                              mobs: replaceAt(i, old.mobs, e.target.value),
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
                  name={`notes-${npc.id}`}
                  defaultValue={''}
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
