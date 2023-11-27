import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs });
};

function PartyEncounters() {
  return (
    <>
      <Link to="random" className="menus__main-option">
        <span className="menus__option-label">Encuentro aleatorio</span>
      </Link>
      <Link to="new" className="menus__main-option">
        <span className="menus__option-label">Crear encuentro</span>
      </Link>
      <Link to="list" className="menus__main-option">
        <span className="menus__option-label">Lista de encuentros</span>
      </Link>
    </>
  );
}

export default PartyEncounters;
