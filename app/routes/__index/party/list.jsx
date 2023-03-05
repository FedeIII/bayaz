import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getParties } from '~/services/party.server';

import styles from '~/components/party.module.css';

export const loader = async ({ params }) => {
  const parties = await getParties();
  if (!parties) {
    throw new Error('Party not found');
  }

  return json({ parties });
};

export const action = async ({ request }) => {
  return redirect(`/characters/pc/${name}/summary`);
};

function PartyList() {
  const { parties } = useLoaderData();

  return (
    <Form method="post">
      <h2>Parties</h2>

      <ul className={styles.partyList}>
        {parties.map(party => (
          <li className={styles.party} key={party.id}>
            <Link to={`/party/${party.id}`} className={styles.partyLink}>
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
