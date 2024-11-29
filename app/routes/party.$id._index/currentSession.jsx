import { Session } from './session';

export function CurrentSession(props) {
  const { session, pcs } = props;

  return (
    <div className="party__party-section party__party-section-single-item">
      <input readOnly type="text" name="sessionId" value={session.id} hidden />
      <Session title="Sesión" session={session} pcs={pcs}>
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

        <button
          type="submit"
          name="newEvent"
          value="newEvent"
          className="cards__button-card"
        >
          Enviar
        </button>

        <div className="party__session-section">
          <h4 className="party__session-section-title">Notas</h4>
          <textarea
            className="party__new-session-notes"
            name="sessionNotes"
            defaultValue={session.notes}
            rows="10"
          ></textarea>
          <button
            type="submit"
            name="addNotes"
            value="addNotes"
            className="cards__button-card"
          >
            Enviar
          </button>
        </div>
      </Session>
    </div>
  );
}
