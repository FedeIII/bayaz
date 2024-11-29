import { useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { useTitle } from '~/components/hooks/useTitle';
import PcsTable from '~/components/party/pcsTable';

import styles from '~/components/party/party.css';
import charactersStyles from '~/components/characters/characters.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: charactersStyles },
  ];
};

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = await Promise.all(party.players.map(pcId => getPc(pcId)));

  return { pcs, party };
};

function PartyPcs() {
  const { pcs, party } = useLoaderData();

  useTitle(`Party ${party.name}`);

  return (
    <>
      <h2>Party</h2>
      <div className="party__pcs-table-container">
        <PcsTable pcs={pcs} />
      </div>
    </>
  );
}

export default PartyPcs;
