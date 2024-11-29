import { useContext, useEffect, useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { addXp, getPc } from '~/services/pc.server';
import {
  addEventCompleted,
  endSession,
  getParty,
  startSession,
  setNotesToSession,
} from '~/services/party.server';
import PartyContext from '~/components/contexts/partyContext';
import { getActiveSession, getXpForSessionPerPc } from '~/domain/party/party';
import { concurrentRequests } from '~/utils/concurrentRequests';
import { useTitle } from '~/components/hooks/useTitle';
import PcsTable from '~/components/party/pcsTable';
import { CurrentSession } from './currentSession';
import { PreviousSessions } from './previousSessions';

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

  const pcs = await concurrentRequests(party.players, pcId => getPc(pcId));

  return { party, pcs };
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
  const addNotes = formData.get('addNotes');
  const sessionNotes = formData.get('sessionNotes');

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
  } else if (addNotes === 'addNotes') {
    await setNotesToSession(partyId, sessionId, sessionNotes);
  }

  return redirect(`/party/${partyId}`);
};

function PartyInfo() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  useTitle(`Party ${party.name}`);

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
      <h2>
        Party {party.name}{' '}
        {activeSession && (
          <span className="party__party-session-title-active">
            (Sesión activa)
          </span>
        )}
      </h2>

      <div className="party__pcs-table-container">
        <PcsTable pcs={pcs} />
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
