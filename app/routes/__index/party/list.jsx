import { json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getParties } from '~/services/party.server';

import styles from '~/components/party.module.css';
import { useContext } from 'react';
import PartyContext from '~/components/contexts/partyContext';

export const loader = async ({ params }) => {
  const parties = await getParties();
  if (!parties) {
    throw new Error('Party not found');
  }

  return json({ parties });
};

export const action = async ({ request }) => {
  return null;
};

function PartyList() {
  const { parties } = useLoaderData();

  const partyContext = useContext(PartyContext) || {};

  return (
    <Form method="post">
      <h2>Parties</h2>

      <ul className={styles.partyList}>
        {parties.map(party => (
          <li className={styles.party} key={party.id}>
            <Link
              to={`/party/${party.id}`}
              className={styles.partyLink}
              data-selected={party.id === partyContext.partyIdState}
            >
              <h3 className={styles.partySessionTitle}>
                {party.id === partyContext.partyIdState && 'Sesión activa'}
              </h3>
              <ul className={styles.partyMembers}>
                {party.players.map(playerName => (
                  <li className={styles.partyMember} key={playerName}>
                    {playerName}
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
