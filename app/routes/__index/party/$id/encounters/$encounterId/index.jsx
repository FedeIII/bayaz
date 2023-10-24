import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { useContext, useEffect } from 'react';

import { damagePc, getPc, healPc } from '~/services/pc.server';
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

import styles from '~/components/randomEncounter.module.css';
import cardStyles from '~/components/cards/cards.module.css';
import { getActiveSession } from '~/domain/party/party';
import { getMaxHitPoints } from '~/domain/characters';

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

  const damagePcName = formData.get('pc-damage');
  const pcDamage = formData.get(`pc-damage-${damagePcName}`);
  if (damagePcName && pcDamage) {
    await damagePc(damagePcName, parseInt(pcDamage, 10));
  }

  const healPcName = formData.get('pc-heal');
  const pcHeal = formData.get(`pc-heal-${healPcName}`);
  if (healPcName && pcHeal) {
    await healPc(healPcName, parseInt(pcHeal, 10));
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
    <Form
      method="post"
      className={styles.encounterContainer}
      onSubmit={onSubmit}
    >
      <input
        readOnly
        type="text"
        name="encounterId"
        value={encounterId}
        hidden
      />
      <input readOnly type="text" name="partyId" value={partyId} hidden />

      <h2>Enemigos</h2>
      <div className={`${cardStyles.cards} ${styles.monsterList}`}>
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
                <div className={styles.death}>
                  <span className={styles.deathIcon}>☠</span> Muerto
                </div>
              )}
              {isAlive && (
                <div className={styles.buttonContainer}>
                  <button name="damage" value={monsterId}>
                    Daño
                  </button>
                  <input
                    type="text"
                    name={`damage-${monsterId}`}
                    className={styles.damageInput}
                  />
                </div>
              )}
              <div className={styles.buttonContainer}>
                <button name="heal" value={monsterId}>
                  Curación
                </button>
                <input
                  type="text"
                  name={`heal-${monsterId}`}
                  className={styles.damageInput}
                />
              </div>
            </Card>
          );
        })}
      </div>

      <h2>PCs</h2>
      <div className={`${cardStyles.cards} ${styles.monsterList}`}>
        {pcs.map((pc, i, all) => {
          const maxHitPoints = getMaxHitPoints(pc);
          const isAlive = pc.hitPoints > -maxHitPoints;

          return (
            <Card
              title={pc.name}
              key={pc.name}
              style={getMonsterPositionStyle(i, all.length)}
            >
              {isAlive && (
                <>
                  {' '}
                  <div>
                    HP:{' '}
                    <ShrinkBar
                      cursorPos={pc.hitPoints}
                      maxValue={maxHitPoints}
                      midValue={maxHitPoints / 2}
                      lowValue={maxHitPoints / 5}
                    />
                  </div>
                  <div className={styles.buttonContainer}>
                    <button name="pc-damage" value={pc.name}>
                      Daño
                    </button>
                    <input
                      type="text"
                      name={`pc-damage-${pc.name}`}
                      className={styles.damageInput}
                    />
                  </div>
                </>
              )}
              {!isAlive && (
                <div className={styles.death}>
                  <span className={styles.deathIcon}>☠</span> Muerto
                </div>
              )}
              <div className={styles.buttonContainer}>
                <button name="pc-heal" value={pc.name}>
                  Curación
                </button>
                <input
                  type="text"
                  name={`pc-heal-${pc.name}`}
                  className={styles.damageInput}
                />
              </div>
            </Card>
          );
        })}
      </div>

      <p className={styles.buttonsRow}>
        <Link
          to={`/party/${partyId}/encounters/${encounterId}/players`}
          className={cardStyles.buttonCard}
          target="_blank"
        >
          Mostrar Combate
        </Link>
        <button name="endCombat" value="true" className={cardStyles.buttonCard}>
          Terminar Combate
        </button>
      </p>
    </Form>
  );
}

export default PartyCombat;
