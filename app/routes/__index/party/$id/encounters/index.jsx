import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';

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

  return (
    <>
      <Link to="random" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Encuentro aleatorio</span>
      </Link>
      <Link to="new" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Crear encuentro</span>
      </Link>
      <Link to="list" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Lista de encuentros</span>
      </Link>
    </>
  );
}

export default PartyEncounters;
