import { useContext, useEffect } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
import { translateClass, translateRace } from '~/domain/characters';
import PartyContext from '~/components/contexts/partyContext';

import styles from '~/components/party.module.css';

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

function PartyInfo() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  const partyContext = useContext(PartyContext) || {};
  const { setPartyIdState } = partyContext;
  useEffect(() => {
    setPartyIdState(id);
  }, [id]);

  return (
    <Form method="post">
      <h2>Party</h2>

      <div className={styles.partySection}>
        Miembros:
        <ul className={styles.partyMembersList}>
          {pcs.map(pc => (
            <li className={styles.character} key={pc.name}>
              <Link
                to={`/characters/pc/${pc.name}/summary`}
                className={styles.partyLink}
              >
                <div className={styles.characterName}>{pc.name}</div>
                <div className={styles.partyData}>
                  {translateRace(pc.race)}
                  {pc.subrace !== 'subrace' &&
                    ` - ${translateRace(pc.subrace)}`}
                </div>
                <div className={styles.partyData}>
                  {translateClass(pc.pClass)}
                </div>
                <div className={styles.partyData}>Nivel {pc.level}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Form>
  );
}

export default PartyInfo;
