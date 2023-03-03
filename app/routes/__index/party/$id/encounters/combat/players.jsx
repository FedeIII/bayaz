import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getParty, getPc } from '~/services/pc.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';

import styles from '~/components/encounters.module.css';
import menuStyles from '~/components/menus.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import EncounterContext from '~/components/contexts/encounterContext';
import { groupMonsters } from '~/domain/encounters/encounters';
import PartyContext from '~/components/contexts/partyContext';

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs });
};

export const action = async ({ request }) => {
  return redirect(`/characters/pc/${name}/summary`);
};

function PartyCombatForPlayers() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  useAddMenuItems('/party', [
    { name: id, url: `/party/${id}`, level: 1 },
    { name: 'Encuentros', url: `/party/${id}/encounters`, level: 2 },
    { name: 'Combate', url: `/party/${id}/encounters/combat`, level: 2 },
  ]);

  const partyContext = useContext(PartyContext);
  useEffect(() => {
    partyContext.setPartyId(id);
  }, [id]);

  const encounterContext = useContext(EncounterContext);

  const store = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    const handler = () => setTest(store?.getItem('test'));
    window.addEventListener('storage', handler);

    return () => window.removeEventListener('test', handler);
  }, []);

  const [test, setTest] = useState(store?.getItem('test'));

  return (
    <div className={styles.encounterContainer}>
      <h2>Combate</h2>
      <p>{groupMonsters(encounterContext.monsters)}</p>
      <p>Test for players: {test}</p>
    </div>
  );
}

export default PartyCombatForPlayers;
