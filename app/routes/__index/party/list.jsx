import { json } from '@remix-run/node';
import { useContext } from 'react';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getParties } from '~/services/party.server';
import PartyContext from '~/components/contexts/partyContext';
import { concurrentRequests } from '~/utils/concurrentRequests';
import { getPc } from '~/services/pc.server';

export const loader = async ({ params }) => {
  const parties = await getParties();
  if (!parties) {
    throw new Error('Party not found');
  }

  const partiesPcs = await Promise.all(
    parties.map(party => concurrentRequests(party.players, id => getPc(id)))
  );

  return json({ parties, partiesPcs });
};

export const action = async ({ request }) => {
  return null;
};

function PartyList() {
  const { parties, partiesPcs } = useLoaderData();

  const partyContext = useContext(PartyContext) || {};

  return (
    <Form method="post">
      <h2>Parties</h2>

      <ul className="party__party-list">
        {parties.map((party, i) => (
          <li className="party" key={party.id}>
            <Link
              to={`/party/${party.id}`}
              className="party__party-link"
              data-selected={party.id === partyContext.partyIdState}
            >
              <h3 className="party__party-session-title">
                {party.id === partyContext.partyIdState && 'Sesión activa'}
              </h3>
              <ul className="party__party-members">
                {partiesPcs[i].map(pc => (
                  <li className="party__party-member" key={pc.name}>
                    {pc.name}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </Form>
  );
}

export default PartyList;
