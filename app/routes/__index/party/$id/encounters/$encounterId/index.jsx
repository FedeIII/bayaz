import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { useContext, useEffect } from 'react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import PartyContext from '~/components/contexts/partyContext';
import { getMonsters } from '~/domain/encounters/monsters';
import { translateMonster } from '~/domain/encounters/monsterTranslations';
import { Card } from '~/components/cards/card';
import { damageMonster, getEncounter } from '~/services/encounter.server';
import { ShrinkBar } from '~/components/indicators/shrinkBar';

import styles from '~/components/encounters.module.css';
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

  const partyId = formData.get('partyId');
  const encounterId = formData.get('encounterId');
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

  useAddMenuItems('/party', [
    { name: partyId, url: `/party/${partyId}`, level: 1 },
    { name: 'Encuentros', url: `/party/${partyId}/encounters`, level: 2 },
    {
      name: 'Combate',
      url: `/party/${partyId}/encounters/${encounterId}`,
      level: 2,
    },
  ]);

  const partyContext = useContext(PartyContext);
  useEffect(() => {
    partyContext.setPartyId(partyId);
  }, [partyId]);

  const monsters = getMonsters(monstersStats.map(m => m.name));

  return (
    <Form method="post" className={styles.encounterContainer}>
      <input
        readOnly
        type="text"
        name="encounterId"
        value={encounterId}
        hidden
      />
      <input readOnly type="text" name="partyId" value={partyId} hidden />

      <h2>Combate</h2>
      <div className={cardStyles.cards}>
        {monsters?.map((monster, i) => {
          const { hp, maxHp, id: monsterId } = monstersStats[i] || {};
          const isAlive = hp > 0;

          return (
            <Card
              title={translateMonster(monster.name)}
              key={monster.name + '-' + i}
            >
              {isAlive && (
                <div>
                  HP:{' '}
                  <ShrinkBar
                    cursorPos={hp}
                    maxValue={maxHp}
                    midValue={maxHp / 2}
                    lowValue={maxHp / 5}
                  />
                </div>
              )}
              {!isAlive && (
                <div className={styles.death}>
                  <span className={styles.deathIcon}>☠</span> Muerto
                </div>
              )}
              {isAlive && (
                <div className={styles.damage}>
                  <button name="damage" value={monsterId}>
                    Daño
                  </button>
                  <input type="text" name={`damage-${monsterId}`} className={styles.damageInput} />
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <p className={styles.encounterButtons}>
        <Link
          to={`/party/${partyId}/encounters/${encounterId}/players`}
          className={styles.encounterButton}
          target="_blank"
        >
          Mostrar Combate
        </Link>
      </p>
    </Form>
  );
}

export default PartyCombat;
