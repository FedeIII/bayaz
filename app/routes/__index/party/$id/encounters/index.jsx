import { useContext, useEffect } from 'react';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import PartyContext from '~/components/contexts/partyContext';

import menuStyles from '~/components/menus.module.css';

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

function PartyEncounters() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  useAddMenuItems('/party', [
    { name: id, url: `/party/${id}`, level: 1 },
    { name: 'Encuentros', url: `/party/${id}/encounters`, level: 2 },
  ]);

  const partyContext = useContext(PartyContext);
  useEffect(() => {
    partyContext.setPartyId(id);
  }, [id]);

  return (
    <>
      <Link to="random" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Encuentro aleatorio</span>
      </Link>
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
    </>
  );
}

export default PartyEncounters;
