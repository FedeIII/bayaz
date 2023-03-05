import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useContext, useEffect, useState } from 'react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import PartyContext from '~/components/contexts/partyContext';
import { getMonsterHitPoints, getMonsters } from '~/domain/encounters/monsters';
import { translateMonster } from '~/domain/encounters/monsterTranslations';
import { useValueFromStore } from '~/components/hooks/useStore';
import { Card } from '~/components/cards/card';
import { rollDice } from '~/domain/random';
import { getEncounter } from '~/services/encounter.server';

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
  return redirect(`/characters/pc/${name}/summary`);
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
    <div className={styles.encounterContainer}>
      <h2>Combate</h2>
      <div className={cardStyles.cards}>
        {monsters?.map((monster, i) => (
          <Card
            title={translateMonster(monster.name)}
            key={monster.name + '-' + i}
          >
            <div>HP: {monstersStats[i]?.hp}</div>
          </Card>
        ))}
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
    </div>
  );
}

export default PartyCombat;
