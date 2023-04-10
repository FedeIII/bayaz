import {
  getFavoredEnemies,
  getFavoredTerrains,
  getHuntersPrey,
  getRangerConclave,
  getRangerFightingStyle,
  translateFavoredEnemy,
  translateFavoredTerrain,
  translateHuntersPrey,
  translateRangerFightingStyle,
} from './ranger';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayRangerTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'favoredEnemy':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {getFavoredEnemies(pc).map(translateFavoredEnemy).join(', ')}
          </span>
        </>
      );

    case 'naturalExplorer':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {getFavoredTerrains(pc).map(translateFavoredTerrain).join(', ')}
          </span>
        </>
      );

    case 'fightingStyle':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          {!getRangerFightingStyle(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
          {!!getRangerFightingStyle(pc) && (
            <span className={appStyles.smallText}>
              {translateRangerFightingStyle(getRangerFightingStyle(pc))}
            </span>
          )}
        </>
      );

    case 'rangerConclave':
      return (
        !getRangerConclave(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'huntersPrey':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>
          .{' '}
          {!getHuntersPrey(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
          {!!getHuntersPrey(pc) && (
            <span className={appStyles.smallText}>
              {translateHuntersPrey(getHuntersPrey(pc))}
            </span>
          )}
        </>
      );

    default:
  }

  return null;
}
