import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { useContext, useEffect } from 'react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
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
} from '~/services/encounter.server';
import { ShrinkBar } from '~/components/indicators/shrinkBar';
import MonstersContext from '~/components/contexts/monstersContext';
import { getMonsterPositionStyle } from '~/domain/encounters/encounters';

import styles from '~/components/randomEncounter.module.css';
import cardStyles from '~/components/cards/cards.module.css';

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

  if (endCombat) {
    await deleteEncounter(encounterId);
    return redirect(`/party/${partyId}/encounters`);
  }

  const damagedMonsterId = formData.get('damage');
  const damage = formData.get(`damage-${damagedMonsterId}`);

  const updatedEncounter = await damageMonster(
    encounterId,
    damagedMonsterId,
    damage
  );

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

      <h2>Combate</h2>
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
