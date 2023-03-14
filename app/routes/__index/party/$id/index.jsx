import { useContext } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { endSession, getParty, startSession } from '~/services/party.server';
import { translateClass, translateRace } from '~/domain/characters';
import PartyContext from '~/components/contexts/partyContext';
import {
  getActiveSession,
  getAllMonstersKilled,
  getEncounterXpForSession,
} from '~/domain/party/party';
import { groupMonsters } from '~/domain/encounters/encounters';

import styles from '~/components/party.module.css';
import cardStyles from '~/components/cards/cards.module.css';
import { Card } from '~/components/cards/card';

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
  const formData = await request.formData();
  const partyId = formData.get('partyId');
  const sessionStart = formData.get('sessionStart');
  const sessionId = formData.get('sessionEnd');

  if (sessionStart === 'start') {
    await startSession(partyId);
  } else if (sessionId) {
    await endSession(partyId, sessionId);
  }

  return redirect(`/party/${partyId}`);
};

function PartyInfo() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  const partyContext = useContext(PartyContext) || {};

  function startSession(data) {
    if ([].slice.call(data.target).find(node => node.name === 'sessionStart')) {
      partyContext.setPartyIdState?.(id);
    } else if (
      [].slice.call(data.target).find(node => node.name === 'sessionEnd')
    ) {
      partyContext.deletePartyIdState?.();
    }
  }

  const activeSession = getActiveSession(party);
  const isActiveSessionFromThisParty = id === partyContext.partyIdState;

  return (
    <Form method="post" onSubmit={startSession}>
      <input readOnly type="text" name="partyId" value={id} hidden />
      <h2>Party</h2>

      <div className={styles.partySection}>
        Miembros:
        <ul className={styles.partyMembersList}>
          {pcs.map(pc => (
            <li className={styles.character} key={pc.name}>
              <Link
                to={`/characters/pc/${pc.name}/summary`}
                className={`${styles.partyLink} ${styles.partyLinkList}`}
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

      {!activeSession && (
        <div className={styles.partySection}>
          <button
            type="submit"
            name="sessionStart"
            value="start"
            className={cardStyles.buttonCard}
          >
            Empezar sesión
          </button>
        </div>
      )}
      {isActiveSessionFromThisParty && !!activeSession && (
        <div className={styles.partySection}>
          <button
            type="submit"
            name="sessionEnd"
            value={activeSession.id}
            className={cardStyles.buttonCard}
          >
            Terminar sesión
          </button>
        </div>
      )}

      {isActiveSessionFromThisParty && !!activeSession && (
        <div className={styles.partySection}>
          <h3>Sesión</h3>
          {!!activeSession.monstersKilled?.length && (
            <div>
              Monstruos matados:{' '}
              {groupMonsters(getAllMonstersKilled(activeSession))}
            </div>
          )}
          {!!activeSession.eventsCompleted?.length && (
            <div>
              Eventos completados:
              <ul>
                {activeSession.eventsCompleted.map((event, i) => (
                  <li key={i}>{event}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className={styles.partySection}>
        <h3>Sesiones anteriores</h3>
        <div className={cardStyles.cards}>
          {party.sessions
            .filter(s => s.finished)
            .map((session, i) => (
              <Card title={`Sesión ${i + 1}`} key={session.id}>
                <div>
                  <h4 className={styles.sessionSection}>
                    Experiencia por encuentros:
                  </h4>
                  <ul className={styles.sessionSectionItems}>
                    <li>
                      {getEncounterXpForSession(session, pcs)} XP (
                      {getEncounterXpForSession(session, pcs) / pcs.length} por
                      PC)
                    </li>
                    <li>{groupMonsters(getAllMonstersKilled(session))}</li>
                  </ul>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </Form>
  );
}

export default PartyInfo;
