import { useContext } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import {
  addEventCompleted,
  endSession,
  getParty,
  startSession,
} from '~/services/party.server';
import { translateClass, translateRace } from '~/domain/characters';
import PartyContext from '~/components/contexts/partyContext';
import {
  getActiveSession,
  getEncounterXpForSession,
  getEventXpForSession,
} from '~/domain/party/party';
import { getEncounterXp, groupMonsters } from '~/domain/encounters/encounters';

import styles from '~/components/party.module.css';
import cardStyles from '~/components/cards/cards.module.css';
import { Card } from '~/components/cards/card';
import { getMonster } from '~/domain/encounters/monsters';

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
  const endSessionId = formData.get('sessionEnd');
  const newEvent = formData.get('newEvent');
  const sessionId = formData.get('sessionId');
  const sessionEventText = formData.get('sessionEventText');
  const sessionEventXp = formData.get('sessionEventXp');

  if (sessionStart === 'start') {
    await startSession(partyId);
  } else if (endSessionId) {
    await endSession(partyId, endSessionId);
  } else if (newEvent === 'newEvent') {
    await addEventCompleted(
      partyId,
      sessionId,
      sessionEventText,
      parseInt(sessionEventXp, 10)
    );
  }

  return redirect(`/party/${partyId}`);
};

function Session(props) {
  const { title, session = {}, pcs, children } = props;

  return (
    <Card title={title} key={session.id} className={styles.paleColor}>
      <div className={styles.sessionSection}>
        <h4 className={styles.sessionSectionTitle}>
          <span>Combates</span>
          <span>
            {getEncounterXpForSession(session, pcs)} xp (
            {getEncounterXpForSession(session, pcs) / pcs.length} por PC)
          </span>
        </h4>
        <ul className={styles.sessionSectionItems}>
          {session.monstersKilled.map((monsters, i) => (
            <li key={i}>
              <div className={styles.xpItem}>
                <span className={styles.sessionItemText}>
                  {groupMonsters(monsters.map(getMonster))}
                </span>
                <span className={styles.sessionItemXp}>
                  {getEncounterXp(monsters.map(getMonster), pcs)} xp
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.sessionSection}>
        <h4 className={styles.sessionSectionTitle}>
          <span>Eventos</span>
          <span>
            {getEventXpForSession(session)} xp (
            {getEventXpForSession(session) / pcs.length} por PC)
          </span>
        </h4>
        <ul className={styles.sessionSectionItems}>
          {session.eventsCompleted.map((event, i) => (
            <li key={i}>
              <div className={styles.xpItem}>
                <span className={styles.sessionItemText}>{event.text}</span>
                <span className={styles.sessionItemXp}>{event.xp} xp</span>
              </div>
            </li>
          ))}
          {children}
        </ul>
      </div>
    </Card>
  );
}

function CurrentSession(props) {
  const { session, pcs } = props;

  return (
    <div className={`${styles.partySection} ${styles.partySectionSingleItem}`}>
      <input readOnly type="text" name="sessionId" value={session.id} hidden />
      <Session title="Sesión" session={session} pcs={pcs}>
        <li>
          <div className={styles.xpItem}>
            <span className={styles.sessionItemText}>
              <textarea
                className={styles.newSessionEvent}
                name="sessionEventText"
              ></textarea>
            </span>
            <span
              className={`${styles.sessionItemXp} ${styles.sessionItemXpInput}`}
            >
              <input
                type="text"
                name="sessionEventXp"
                className={`${styles.newSessionEvent} ${styles.newSessionEventXp}`}
              />
            </span>
          </div>
        </li>

        <button
          type="submit"
          name="newEvent"
          value="newEvent"
          className={cardStyles.buttonCard}
        >
          Enviar
        </button>
      </Session>
    </div>
  );
}

function PreviousSessions(props) {
  const { sessions, pcs } = props;

  return (
    <div className={styles.partySection}>
      <h3>Sesiones anteriores</h3>
      <div className={cardStyles.cards}>
        {sessions
          .filter(s => s.finished)
          .map((session, i) => (
            <Session
              title={`Sesión ${i + 1}`}
              session={session}
              pcs={pcs}
              key={i}
            />
          ))}
      </div>
    </div>
  );
}

function PartyInfo() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  const partyContext = useContext(PartyContext) || {};

  function onStartSessionClick() {
    partyContext.setPartyIdState?.(id);
  }

  function onEndSessionClick() {
    partyContext.deletePartyIdState?.();
  }

  const activeSession = getActiveSession(party);
  const isActiveSessionFromThisParty = id === partyContext.partyIdState;

  return (
    <Form method="post">
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
            onClick={onStartSessionClick}
          >
            Empezar sesión
          </button>
        </div>
      )}
      {!!activeSession && (
        <div className={styles.partySection}>
          <button
            type="submit"
            name="sessionEnd"
            value={activeSession.id}
            className={cardStyles.buttonCard}
            onClick={onEndSessionClick}
          >
            Terminar sesión
          </button>
        </div>
      )}

      {isActiveSessionFromThisParty && !!activeSession && (
        <CurrentSession session={activeSession} pcs={pcs} />
      )}

      {!!party.sessions?.length && (
        <PreviousSessions sessions={party.sessions} pcs={pcs} />
      )}
    </Form>
  );
}

export default PartyInfo;
