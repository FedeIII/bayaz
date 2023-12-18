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

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

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
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!getAllFightingStyles(pc).length && (
            <span className="app__small-text">
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
            <span className="sheet__pending-trait">(!)</span>
          </>
        )
      );

    case 'knightSpell':
      return (
        <>
          <strong>{trait}</strong>
          {hasToLearnKnightSpell(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
        </>
      );

    case 'improvedCritical':
      return (
        <>
          <u>{trait}.</u>{' '}
          <span className="app__small-text">
            Crits con {pc.level >= 15 ? '18' : '19'} y 20
          </span>
        </>
      );

    case 'combatSuperiority':
      return (
        <>
          <u>{trait}.</u>{' '}
          <span className="app__small-text">
            {getCombatSuperiorityDice(pc)}
          </span>
          {hasToLearnCombatSuperiorityManeuvers(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!getCombatSuperiorityManeuvers(pc).length && (
            <ul className="app__small-text">
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
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!getStudentOfWar(pc) && (
            <span className="app__small-text">
              {getItem(getStudentOfWar(pc)).translation}
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
          <span className="app__small-text">
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
          <span className="app__small-text">
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
            <u>{trait}.</u> <span className="sheet__pending-trait">(!)</span>
          </>
        )
      );

    case 'arcaneCharge':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">Teletransporte a 9m</span>
        </>
      );

    case 'survivor':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">
            {increment(5 + getStatMod(getStat(pc, 'con')))} HP/turno
          </span>
        </>
      );

    default:
  }

  return null;
}
