import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import {
  createRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getPc, healPc } from '~/services/pc.server';
import { addMonstersKilled, getParty } from '~/services/party.server';
import {
  Monster,
  badlyHurtHP,
  getMonsters,
  health,
  hurtHP,
  sortByXp,
} from '~/domain/encounters/monsters';
import { Card } from '~/components/cards/card';
import {
  damageMonster,
  getEncounter,
  healMonster,
} from '~/services/encounter.server';
import { ShrinkBar } from '~/components/indicators/shrinkBar';
import MonstersContext from '~/components/contexts/monstersContext';
import { getMonsterPositionStyle } from '~/domain/encounters/encounters';
import { getActiveSession } from '~/domain/party/party';
import { getMaxHitPoints } from '~/domain/characters';
import { damagePc } from '~/domain/mutations/characterMutations';
import { MultiLevelBar } from '~/components/indicators/multiLevelBar';
import { getAcBreakdown } from '~/domain/display';
import usePcsFromSession from '~/components/hooks/usePcsFromSession';
import { useCharacterItems } from '~/components/modal/useCharacterItems';
import { CharacterItem } from '~/components/modal/characterItem';
import { CharacterModal } from '~/components/modal/characterModal';
import { replaceAt } from '~/utils/insert';
import { translateMonster } from '~/domain/encounters/monsterTranslations';
import { rollDice } from '~/domain/random';
import { useTitle } from '~/components/hooks/useTitle';
import {
  isNpcHurt,
  npcBadlyHurtHP,
  npcHealth,
  npcsToMonsters,
} from '~/domain/npc/npc';
import { endPartyEncounter } from '~/domain/mutations/partyMutations';
import NumericInput from '~/components/inputs/numeric';

import styles from '~/components/randomEncounter.css';
import charactersStyles from '~/components/characters/characters.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: charactersStyles },
  ];
};

export const loader = async ({ params }) => {
  const encounter = await getEncounter(params.encounterId);

  let npcs;
  if (encounter.npcs?.length) {
    npcs = await Promise.all(encounter.npcs.map(getPc));
  }

  return json({ encounter, npcs });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const endCombat = formData.get('endCombat');
  const encounterId = formData.get('encounterId');
  const partyId = formData.get('partyId');
  const isNpcs = formData.get('isNpcs');

  const encounter = await getEncounter(encounterId);

  if (partyId) {
    const party = await getParty(partyId);

    const activeSession = getActiveSession(party);

    const mobsKilled = encounter.monsters
      .filter(m => m.hp <= 0)
      .map(m => m.name);

    if (endCombat) {
      if (mobsKilled.length) {
        await Promise.all([
          addMonstersKilled(partyId, activeSession.id, mobsKilled),
        ]);
      }

      await endPartyEncounter(partyId);

      return redirect(`/party/${partyId}`);
    }
  }

  let updatedEncounter = encounter;

  const damagedMonsterId = formData.get('damage');
  const damage = formData.get(`damage-${damagedMonsterId}`);
  const healMonsterId = formData.get('heal');
  const heal = formData.get(`heal-${healMonsterId}`);

  if (isNpcs) {
    if (damagedMonsterId && damage) {
      updatedEncounter = await damagePc(damagedMonsterId, parseInt(damage, 10));
    }

    if (healMonsterId && heal) {
      updatedEncounter = await healPc(healMonsterId, parseInt(heal, 10));
    }
  } else {
    if (damagedMonsterId && damage) {
      updatedEncounter = await damageMonster(
        encounterId,
        damagedMonsterId,
        parseInt(damage, 10)
      );
    }

    if (healMonsterId && heal) {
      updatedEncounter = await healMonster(
        encounterId,
        healMonsterId,
        parseInt(heal, 10)
      );
    }
  }

  const damagePcId = formData.get('pc-damage');
  const pcDamage = formData.get(`pc-damage-${damagePcId}`);
  if (damagePcId && pcDamage) {
    await damagePc(damagePcId, parseInt(pcDamage, 10));
  }

  const healPcId = formData.get('pc-heal');
  const pcHeal = formData.get(`pc-heal-${healPcId}`);
  if (healPcId && pcHeal) {
    await healPc(healPcId, parseInt(pcHeal, 10));
  }

  return json({ encounter: updatedEncounter });
};

function MonstersCombat(props) {
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
                className={`encounters__character-card ${hover.mobs === i
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
                    className={`encounters__character-card ${hover.pcs === pcIndex
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

function NpcsCombat(props) {
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
                className={`encounters__character-card ${hover.mobs === i
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
                    className={`encounters__character-card ${hover.pcs === pcIndex
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

function PartyCombat() {
  const { encounter, npcs } = useLoaderData();
  const { id: encounterId, monsters } = encounter;
  const [pcs, partyId, updatePcs] = usePcsFromSession();

  const isNpcs = !!npcs?.length;
  const mobs = isNpcs ? npcs : monsters;

  const monsterContext = useContext(MonstersContext) || {};
  const {
    monstersState,
    setMonstersState,
    deleteMonstersState,
    setEncounterIdState,
    deleteEncounterIdState,
  } = monsterContext;

  function onSubmit(data) {
    if ([].slice.call(data.target).find(node => node.name === 'endCombat')) {
      deleteMonstersState();
      deleteEncounterIdState();
    }
  }

  const [refsList, setRefsList] = useState({
    mobs: useRef(monsters.map(createRef)),
  });

  const [
    characterModalContent,
    closeCharacterModal,
    openCharacterModal,
    selectedCharacterRef,
    setSelectedCharacterRef,
  ] = useCharacterItems(refsList);

  const [initiatives, setInitiatives] = useState({
    mobs: mobs.map((_, i) => monstersState?.[i]?.initiative || 0),
    pcs: pcs.map(pc => pc.initiative || 0),
  });

  useEffect(() => {
    setInitiatives(old => ({
      mobs: mobs.map((_, i) => old.mobs[i] || 0),
      pcs: pcs.map(pc => pc.initiative || 0),
    }));
  }, [mobs, pcs]);

  useEffect(() => {
    setEncounterIdState(encounterId);
    setMonstersState(
      mobs.map((mob, i) => ({
        name: mob.name,
        health: isNpcs ? npcHealth(mob) : health(mob),
        initiative: initiatives.mobs[i],
      }))
    );
  }, [encounterId, mobs, initiatives.mobs]);

  const initiativesList = useMemo(() => {
    return [
      ...initiatives.mobs
        .map((mobInitiative, i) => ({
          type: 'mobs',
          name: isNpcs
            ? mobs[i].name
            : mobs[i].nick || translateMonster(mobs[i].name),
          value: mobInitiative,
          index: i,
        }))
        .filter((_, i) => (isNpcs ? npcs[i].hitPoints : monsters[i].hp > 0)),
      ...initiatives.pcs
        .map((pcInitiative, i) => ({
          type: 'pcs',
          name: pcs[i].name,
          value: pcInitiative,
          index: i,
        }))
        .filter((_, i) => pcs[i].hitPoints > 0),
    ].sort((a, b) => b.value - a.value);
  }, [initiatives.mobs, initiatives.pcs, mobs, pcs]);

  function resetInitiatives() {
    setInitiatives({
      mobs: mobs.map(() => 0),
      pcs: pcs.map(pc => pc.initiative || 0),
    });
  }

  function setMobInitiatives() {
    setInitiatives(old => ({
      ...old,
      mobs: mobs.map(() => rollDice('1d20')),
    }));
  }

  const [hover, setHover] = useState({
    mobs: null,
    pcs: null,
  });

  const formRef = useRef(null);

  return (
    <Form
      method="post"
      className="encounters__form"
      onSubmit={onSubmit}
      ref={formRef}
    >
      <input
        readOnly
        type="text"
        name="encounterId"
        value={encounterId}
        hidden
      />
      <input readOnly type="text" name="partyId" value={partyId} hidden />

      {characterModalContent && (
        <CharacterModal
          elRef={selectedCharacterRef}
          formRef={formRef}
          closeModal={closeCharacterModal}
        >
          {characterModalContent}
        </CharacterModal>
      )}

      {isNpcs && (
        <NpcsCombat
          refsList={refsList}
          openCharacterModal={openCharacterModal}
          initiativesList={initiativesList}
          initiatives={initiatives}
          setInitiatives={setInitiatives}
          hover={hover}
          setHover={setHover}
          resetInitiatives={resetInitiatives}
          setMobInitiatives={setMobInitiatives}
          pcs={pcs}
          partyId={partyId}
          updatePcs={updatePcs}
        />
      )}

      {!isNpcs && (
        <MonstersCombat
          refsList={refsList}
          openCharacterModal={openCharacterModal}
          initiativesList={initiativesList}
          initiatives={initiatives}
          setInitiatives={setInitiatives}
          hover={hover}
          setHover={setHover}
          resetInitiatives={resetInitiatives}
          setMobInitiatives={setMobInitiatives}
          pcs={pcs}
          partyId={partyId}
          updatePcs={updatePcs}
        />
      )}
    </Form>
  );
}

export default PartyCombat;
