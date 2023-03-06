import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useContext, useEffect } from 'react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import PartyContext from '~/components/contexts/partyContext';
import { useValueFromStore } from '~/components/hooks/useStore';

import styles from '~/components/encounters.module.css';
import { getEncounter } from '~/services/encounter.server';

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

function PartyCombatForPlayers() {
  const { party, pcs, encounter } = useLoaderData();
  const { id: partyId } = party;
  const { id: encounterId } = encounter;

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

  const storeMonsters = useValueFromStore('monsters') || '[]';
  const monsters = JSON.parse(storeMonsters);

  return (
    <div className={styles.encounterContainer}>
      <h2>Combate</h2>
      <ul className={styles.monstersList}>
        {monsters.map(monster => (
          <li className={`${styles.monstersItem} ${styles[monster.health]}`}>
            {monster.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PartyCombatForPlayers;
