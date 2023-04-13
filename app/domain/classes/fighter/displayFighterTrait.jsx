import {
  getCombatSuperiorityManeuvers,
  getFightingStyle,
  getMartialArchetype,
  getStudentOfWar,
  hasToLearnCombatSuperiorityManeuvers,
  translateCombatSuperiorityManeuvers,
  translateFightingStyle,
} from './fighter';
import { hasToLearnKnightSpell } from '~/domain/spells/fighter';
import { getItem } from '~/domain/equipment/equipment';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayFighterTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'fightingStyle':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          {!getFightingStyle(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
          {!!getFightingStyle(pc) && (
            <span className={appStyles.smallText}>
              {translateFightingStyle(getFightingStyle(pc))}
            </span>
          )}
        </>
      );

    case 'actionSurge':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          {pc.level >= 17 ? 'Dos veces ' : 'Una vez '}entre descansos.
        </>
      );

    case 'martialArchetype':
      return (
        !getMartialArchetype(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'knightSpell':
      return (
        <>
          <strong>{trait}</strong>
          {hasToLearnKnightSpell(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
        </>
      );

    case 'improvedCritical':
      return (
        <>
          <u>{trait}.</u>{' '}
          <span className={appStyles.smallText}>Crits con 19 y 20</span>
        </>
      );

    case 'combatSuperiority':
      return (
        <>
          <u>{trait}.</u>{' '}
          {hasToLearnCombatSuperiorityManeuvers(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
          {!!getCombatSuperiorityManeuvers(pc).length && (
            <ul className={appStyles.smallText}>
              {getCombatSuperiorityManeuvers(pc).map(maneuver => (
                <li key={maneuver}>
                  {translateCombatSuperiorityManeuvers(maneuver)}
                </li>
              ))}
            </ul>
          )}
        </>
      );

    case 'studentOfWar':
      return (
        <>
          <u>{trait}.</u>{' '}
          {!getStudentOfWar(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
          {!!getStudentOfWar(pc) && (
            <span className={appStyles.smallText}>
              {getItem(getStudentOfWar(pc).name).translation}
            </span>
          )}
        </>
      );

    default:
  }

  return null;
}
