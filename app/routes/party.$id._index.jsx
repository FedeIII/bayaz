import { useContext, useEffect, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { addXp, getPc } from '~/services/pc.server';
import {
  addEventCompleted,
  endSession,
  getParty,
  startSession,
} from '~/services/party.server';
import {
  getExperience,
  translateClass,
  translateRace,
} from '~/domain/characters';
import PartyContext from '~/components/contexts/partyContext';
import {
  getActiveSession,
  getEncounterXpForSession,
  getEventXpForSession,
  getXpForSessionPerPc,
} from '~/domain/party/party';
import { getEncounterXp, groupMonsters } from '~/domain/encounters/encounters';
import { Card } from '~/components/cards/card';
import { getMonster } from '~/domain/encounters/monsters';
import { concurrentRequests } from '~/utils/concurrentRequests';

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = await concurrentRequests(party.players, pcId => getPc(pcId));

  return json({ party, pcs });
};

async function endSessionAction(formData) {
  const partyId = formData.get('partyId');
  const endSessionId = formData.get('sessionEnd');

  const partyRequest = getParty(partyId);
  const endSessionRequest = endSession(partyId, endSessionId);

  const party = await partyRequest;
  const currentSession = party.sessions.find(s => s.id === endSessionId);
  const pcExp = getXpForSessionPerPc(currentSession, party.players.length);

  await concurrentRequests(party.players, pcId => addXp(pcId, pcExp));

  await endSessionRequest;
}

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
    await endSessionAction(formData);
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

  const encounterXp = getEncounterXpForSession(session, pcs.length);

  return (
    <Card title={title} key={session.id} className="party__pale-color">
      <div className="party__session-section">
        <h4 className="party__session-section-title">
          <span>Combates</span>
          <span>
            {encounterXp} xp ({getExperience({ exp: encounterXp / pcs.length })}{' '}
            por PC)
          </span>
        </h4>
        <ul className="party__session-section-items">
          {session.monstersKilled.map((monsters, i) => (
            <li key={i}>
              <div className="party__xp-item">
                <span className="party__session-item-text">
                  {groupMonsters(monsters.map(getMonster))}
                </span>
                <span className="party__session-item-xp">
                  {getEncounterXp(monsters.map(getMonster), pcs.length)} xp
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="party__session-section">
        <h4 className="party__session-section-title">
          <span>Eventos</span>
          <span>
            {getEventXpForSession(session)} xp (
            {getEventXpForSession(session) / pcs.length} por PC)
          </span>
        </h4>
        <ul className="party__session-section-items">
          {session.eventsCompleted.map((event, i) => (
            <li key={i}>
              <div className="party__xp-item">
                <span className="party__session-item-text">{event.text}</span>
                <span className="party__session-item-xp">{event.xp} xp</span>
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
    <div className="party__party-section party__party-section-single-item">
      <input readOnly type="text" name="sessionId" value={session.id} hidden />
      <Session title="Sesión" session={session} pcs={pcs}>
        <li>
          <div className="party__xp-item">
            <span className="party__session-item-text">
              <textarea
                className="party__new-session-event"
                name="sessionEventText"
              ></textarea>
            </span>
            <span className="party__session-item-xp party__session-item-xp-input">
              <input
                type="text"
                name="sessionEventXp"
                className="party__new-session-event party__new-session-event-xp"
              />
            </span>
          </div>
        </li>

        <button
          type="submit"
          name="newEvent"
          value="newEvent"
          className="cards__button-card"
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
    <div className="party__party-section">
      <h3>Sesiones anteriores</h3>
      <div className="cards party__previous-sessions">
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
    partyContext.setPcIdsState?.(party.players);
  }

  function onEndSessionClick() {
    partyContext.deletePartyIdState?.();
    partyContext.deletePcIdsState?.();
  }

  const [activeSession, setActiveSession] = useState(getActiveSession(party));
  useEffect(() => {
    setActiveSession(getActiveSession(party));
  }, [party]);

  const [isActiveSessionFromThisParty, setIsActiveSessionFromThisParty] =
    useState(false);
  useEffect(() => {
    setIsActiveSessionFromThisParty(id === partyContext.partyIdState);
  }, [id, partyContext.partyIdState]);

  return (
    <Form method="post">
      <input readOnly type="text" name="partyId" value={id} hidden />
      <h2>Party</h2>

      <div className="party__party-section">
        Miembros:
        <ul className="party__party-members-list">
          {pcs.map(pc => (
            <li className="party__character" key={pc.id}>
              <Link
                to={`/characters/pc/${pc.id}/summary`}
                className="party__party-link party__party-link-list"
              >
                <div className="party__character-name">{pc.name}</div>
                <div className="party__party-data">
                  {translateRace(pc.race)}
                  {pc.subrace !== 'subrace' &&
                    ` - ${translateRace(pc.subrace)}`}
                </div>
                <div className="party__party-data">
                  {translateClass(pc.pClass)}
                </div>
                <div className="party__party-data">Nivel {pc.level}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {!activeSession && (
        <div className="party__party-section">
          <button
            type="submit"
            name="sessionStart"
            value="start"
            className="cards__button-card"
            onClick={onStartSessionClick}
          >
            Empezar sesión
          </button>
        </div>
      )}
      {!!activeSession && (
        <div className="party__party-section">
          <button
            type="submit"
            name="sessionEnd"
            value={activeSession.id}
            className="cards__button-card"
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
