import { getFightingStyle, translateFightingStyle } from './fighter';

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

    default:
  }

  return null;
}
