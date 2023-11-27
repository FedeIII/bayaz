import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { useContext, useEffect } from 'react';

import { getPc, healPc } from '~/services/pc.server';
import { addMonstersKilled, getParty } from '~/services/party.server';
import {
  badlyHurtHP,
  getMonsters,
  health,
  hurtHP,
  sortByXp,
} from '~/domain/encounters/monsters';
import { translateMonster } from '~/domain/encounters/monsterTranslations';
import { Card } from '~/components/cards/card';
import {
  damageMonster,
  deleteEncounter,
  getEncounter,
  healMonster,
} from '~/services/encounter.server';
import { ShrinkBar } from '~/components/indicators/shrinkBar';
import MonstersContext from '~/components/contexts/monstersContext';
import { getMonsterPositionStyle } from '~/domain/encounters/encounters';
import { getActiveSession } from '~/domain/party/party';
import { getExtraArmorClass, getMaxHitPoints } from '~/domain/characters';
import { damagePc } from '~/domain/characterMutations';
import { MultiLevelBar } from '~/components/indicators/multiLevelBar';
import { getAcBreakdown } from '~/domain/display';

import styles from '~/components/randomEncounter.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const [party, encounter] = await Promise.all([
    getParty(params.id),
    getEncounter(params.encounterId),
  ]);

  if (!party) {
    throw new Error('Party not found');
  }

  if (!encounter) {
    throw new Error('Encounter not found');
  }

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs, encounter });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const endCombat = formData.get('endCombat');
  const encounterId = formData.get('encounterId');
  const partyId = formData.get('partyId');

  const [party, encounter] = await Promise.all([
    getParty(partyId),
    getEncounter(encounterId),
  ]);

  const activeSession = getActiveSession(party);

  if (endCombat) {
    await Promise.all([
      addMonstersKilled(
        partyId,
        activeSession.id,
        encounter.monsters.map(m => m.name)
      ),
      deleteEncounter(encounterId),
    ]);
    return redirect(`/party/${partyId}/encounters`);
  }

  let updatedEncounter = encounter;

  const damagedMonsterId = formData.get('damage');
  const damage = formData.get(`damage-${damagedMonsterId}`);
  if (damagedMonsterId && damage) {
    updatedEncounter = await damageMonster(
      encounterId,
      damagedMonsterId,
      parseInt(damage, 10)
    );
  }

  const healMonsterId = formData.get('heal');
  const heal = formData.get(`heal-${healMonsterId}`);
  if (healMonsterId && heal) {
    updatedEncounter = await healMonster(
      encounterId,
      healMonsterId,
      parseInt(heal, 10)
    );
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

function PartyCombat() {
  const { party, pcs, encounter } = useLoaderData();
  const { id: partyId } = party;
  const { monsters: monstersStats, id: encounterId } = encounter;

  const monsterContext = useContext(MonstersContext) || {};
  const {
    setMonstersState,
    deleteMonstersState,
    setEncounterIdState,
    deleteEncounterIdState,
  } = monsterContext;

  useEffect(() => {
    setEncounterIdState(encounterId);
    setMonstersState(
      monstersStats.map(m => ({ name: m.name, health: health(m) }))
    );
  }, [encounterId, monstersStats]);

  const monsters = getMonsters(monstersStats.map(m => m.name));

  function onSubmit(data) {
    if ([].slice.call(data.target).find(node => node.name === 'endCombat')) {
      deleteMonstersState();
      deleteEncounterIdState();
    }
  }

  return (
    <Form method="post" className="encounters__container" onSubmit={onSubmit}>
      <input
        readOnly
        type="text"
        name="encounterId"
        value={encounterId}
        hidden
      />
      <input readOnly type="text" name="partyId" value={partyId} hidden />

      <h2>Enemigos</h2>
      <div className="cards encounters__monster-list">
        {sortByXp(monsters)?.map((monster, i, all) => {
          const { hp, maxHp, id: monsterId } = monstersStats[i] || {};
          const isAlive = hp > 0;

          return (
            <Card
              title={translateMonster(monster.name)}
              key={monster.name + '-' + i}
              style={getMonsterPositionStyle(i, all.length)}
            >
              {isAlive && (
                <div>
                  HP:{' '}
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
              {isAlive && (
                <div className="encounters__button-container">
                  <button name="damage" value={monsterId}>
                    Daño
                  </button>
                  <input
                    type="text"
                    name={`damage-${monsterId}`}
                    className="encounters__damage-input"
                  />
                </div>
              )}
              <div className="encounters__button-container">
                <button name="heal" value={monsterId}>
                  Curación
                </button>
                <input
                  type="text"
                  name={`heal-${monsterId}`}
                  className="encounters__damage-input"
                />
              </div>
            </Card>
          );
        })}
      </div>

      <h2>PCs</h2>
      <div className="cards encounters__monster-list">
        {pcs.map((pc, pcIndex, all) => {
          const maxHitPoints = getMaxHitPoints(pc);
          const isAlive = pc.hitPoints > -maxHitPoints;
          const acBreakdown = getAcBreakdown(pc);
          const extraAc = getExtraArmorClass(pc);
          let tag = acBreakdown.base;
          const levels = [
            ...(tag > 10
              ? [
                  {
                    size: Math.floor(10 / 2),
                    thickness: 0,
                    tag: 10,
                    style: { color: 'var(--color-x-pale)' },
                  },
                  {
                    size: Math.floor((acBreakdown.base - 10) / 2),
                    thickness: 1,
                    tag,
                    style: { color: 'var(--color-x-pale)' },
                  },
                ]
              : [
                  {
                    size: Math.floor(acBreakdown.base / 2),
                    thickness: 0,
                    tag,
                    style: { color: 'var(--color-x-pale)' },
                  },
                ]),
            ...acBreakdown.extras.reduce((lvls, extra, extraIndex) => {
              tag += parseInt(extra.ac.slice(1), 10);
              return [
                ...lvls,
                {
                  size: 3 * parseInt(extra.ac.slice(1), 10),
                  thickness: extraIndex + 1,
                  tag,
                  style: { color: 'var(--color-x-blue-ink)' },
                },
              ];
            }, []),
            ...(!!extraAc
              ? [
                  {
                    size: 3 * extraAc,
                    thickness: 3,
                    tag: tag + extraAc,
                    style: { color: 'var(--color-x-blue-ink)' },
                  },
                ]
              : []),
          ];

          return (
            <Card
              title={pc.name}
              key={pc.id}
              style={getMonsterPositionStyle(pcIndex, all.length)}
            >
              {isAlive && (
                <>
                  {' '}
                  <div className="encounters__bar">
                    HP:{' '}
                    <ShrinkBar
                      cursorPos={pc.hitPoints}
                      extraValue={pc.temporaryHitPoints}
                      maxValue={maxHitPoints}
                      midValue={maxHitPoints / 2}
                      lowValue={maxHitPoints / 5}
                    />
                  </div>
                  <div className="encounters__bar">
                    AC: <MultiLevelBar levels={levels} />
                  </div>
                  <div className="encounters__button-container">
                    <button name="pc-damage" value={pc.id}>
                      Daño
                    </button>
                    <input
                      type="text"
                      name={`pc-damage-${pc.id}`}
                      className="encounters__damage-input"
                    />
                  </div>
                </>
              )}
              {!isAlive && (
                <div className="encounters__death">
                  <span className="encounters__death-icon">☠</span> Muerto
                </div>
              )}
              <div className="encounters__button-container">
                <button name="pc-heal" value={pc.id}>
                  Curación
                </button>
                <input
                  type="text"
                  name={`pc-heal-${pc.id}`}
                  className="encounters__damage-input"
                />
              </div>
            </Card>
          );
        })}
      </div>

      <p className="encounters__buttons-row">
        <Link
          to={`/party/${partyId}/encounters/${encounterId}/players`}
          className="cards__button-card"
          target="_blank"
        >
          Mostrar Combate
        </Link>
        <button
          name="endCombat"
          value="true"
          className="cards__button-card"
        >
          Terminar Combate
        </button>
      </p>
    </Form>
  );
}

export default PartyCombat;
