import { Card } from '~/components/cards/card';
import {
  getExperience
} from '~/domain/characters';
import { getEncounterXp, groupMonsters } from '~/domain/encounters/encounters';
import { getMonster } from '~/domain/encounters/monsters';
import {
  getEncounterXpForSession,
  getEventXpForSession
} from '~/domain/party/party';

export function Session(props) {
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
        </ul>
      </div>
      {children}
    </Card>
  );
}
