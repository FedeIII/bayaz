import { Session } from './session';

export function PreviousSessions(props) {
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
            >
              {session.notes && (
                <div className="party__session-section">
                  <h4 className="party__session-section-title">Notas</h4>
                  {session.notes.split('\n').map((note, i) => (
                    <p key={i}>{note}</p>
                  ))}
                </div>
              )}
            </Session>
          ))}
      </div>
    </div>
  );
}
