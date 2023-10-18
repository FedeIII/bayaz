import { getStat, getStatMod } from '~/domain/characters';
import { getPaladinFightingStyle } from './paladin';
import { translateFightingStyle } from '../fighter/fighter';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayPaladinTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'divineSense':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            18m, {getStatMod(getStat(pc, 'cha')) + 1} veces al día
          </span>
        </>
      );

    case 'layOnHands':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>{pc.level * 5} HP</span>
        </>
      );

    case 'fightingStyle': {
      const fightingStyle = getPaladinFightingStyle(pc);
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          {!fightingStyle && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
          {!!fightingStyle && (
            <span className={appStyles.smallText}>
              {translateFightingStyle(fightingStyle)}
            </span>
          )}
        </>
      );
    }

    default:
  }

  return null;
}
