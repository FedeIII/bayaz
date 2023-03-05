import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getParty, getPc } from '~/services/pc.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';

import styles from '~/components/encounters.module.css';
import menuStyles from '~/components/menus.module.css';
import { useContext, useEffect, useState } from 'react';
import { groupMonsters } from '~/domain/encounters/encounters';
import PartyContext from '~/components/contexts/partyContext';
import { getMonstersFromStore } from '~/domain/encounters/monsters';

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

function PartyCombat() {
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

  useEffect(() => {
    const handler = () => setMonsters(getMonstersFromStore());
    window.addEventListener('storage', handler);

    return () => window.removeEventListener('monsters', handler);
  }, []);

  const [monsters, setMonsters] = useState(getMonstersFromStore());

  return (
    <div className={styles.encounterContainer}>
      <h2>Combate</h2>
      <p>{groupMonsters(monsters)}</p>
      <p className={styles.encounterButtons}>
        <Link
          to={`/party/${id}/encounters/combat/players`}
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
