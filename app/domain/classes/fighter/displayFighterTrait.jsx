import {
  getAllFightingStyles,
  getCombatSuperiorityDice,
  getCombatSuperiorityManeuvers,
  getExtraFightingStyle,
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
          {!getAllFightingStyles(pc).length && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
          {!!getAllFightingStyles(pc).length && (
            <span className={appStyles.smallText}>
              {getAllFightingStyles(pc).map(translateFightingStyle).join(', ')}
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
          <span className={appStyles.smallText}>
            {getCombatSuperiorityDice(pc)}
          </span>
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

    case 'extraAttack':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {pc.level >= 20 ? '4' : pc.level >= 11 ? '3' : '2'} ataques
          </span>
        </>
      );

    case 'indomitable': {
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {pc.level >= 17 ? '3' : pc.level >= 13 ? '2' : '1'} ve
            {pc.level >= 13 ? 'ces' : 'z'} entre descansos prolongados.
          </span>
        </>
      );
    }

    case 'extraFightingStyle':
      return (
        !getExtraFightingStyle(pc) && (
          <>
            <u>{trait}.</u>{' '}
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    default:
  }

  return null;
}
