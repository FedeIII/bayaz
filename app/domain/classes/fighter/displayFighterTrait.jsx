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
import { increment } from '~/domain/display';
import { getStat, getStatMod } from '~/domain/characters';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayFighterTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'secondWind':
      return (
        <>
          <u>{trait}.</u> Recupera 1d10 + {pc.level} al día como acción
          adicional.
        </>
      );

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
          <span className={appStyles.smallText}>
            Crits con {pc.level >= 15 ? '18' : '19'} y 20
          </span>
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

    case 'warMagic':
      return (
        <>
          {trait}
          {pc.level >= 18 ? ' Mejorada' : ''}
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

    case 'arcaneCharge':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>Teletransporte a 9m</span>
        </>
      );

    case 'survivor':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {increment(5 + getStatMod(getStat(pc, 'con')))} HP/turno
          </span>
        </>
      );

    default:
  }

  return null;
}
