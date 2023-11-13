import {
  getFavoredEnemies,
  getFavoredTerrains,
  getHunterDefensiveTactics,
  getHunterMultiattack,
  getHuntersPrey,
  getRangerConclave,
  getRangerFightingStyle,
  getSuperiorHuntersDefense,
  hasToPickFavoredEnemies,
  hasToPickFavoredTerrain,
  translateFavoredEnemy,
  translateFavoredTerrain,
  translateHunterMultiattack,
  translateHuntersDefensiveTactics,
  translateHuntersPrey,
  translateRangerFightingStyle,
  translateSuperiorHuntersDefense,
} from './ranger';
import { getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function displayRangerTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'favoredEnemy':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">
            {getFavoredEnemies(pc).map(translateFavoredEnemy).join(', ')}
          </span>
          {hasToPickFavoredEnemies(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
        </>
      );

    case 'naturalExplorer':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">
            {getFavoredTerrains(pc).map(translateFavoredTerrain).join(', ')}
          </span>
          {hasToPickFavoredTerrain(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
        </>
      );

    case 'rangerFightingStyle':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          {!getRangerFightingStyle(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!getRangerFightingStyle(pc) && (
            <span className="app__small-text">
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
            <span className="sheet__pending-trait">(!)</span>
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
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!getHuntersPrey(pc) && (
            <span className="app__small-text">
              {translateHuntersPrey(getHuntersPrey(pc))}
            </span>
          )}
        </>
      );

    case 'defensiveTactics':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>
          .{' '}
          {!getHunterDefensiveTactics(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!getHunterDefensiveTactics(pc) && (
            <span className="app__small-text">
              {translateHuntersDefensiveTactics(getHunterDefensiveTactics(pc))}
            </span>
          )}
        </>
      );

    case 'multiattack':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>
          .{' '}
          {!getHunterMultiattack(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!getHunterMultiattack(pc) && (
            <span className="app__small-text">
              {translateHunterMultiattack(getHunterMultiattack(pc))}
            </span>
          )}
        </>
      );

    case 'superiorHuntersDefense':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>
          .{' '}
          {!getSuperiorHuntersDefense(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!getSuperiorHuntersDefense(pc) && (
            <span className="app__small-text">
              {translateSuperiorHuntersDefense(getSuperiorHuntersDefense(pc))}
            </span>
          )}
        </>
      );

    case 'foeSlayer':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>
          .{' '}
          <span className="app__small-text">
            {increment(getStatMod(getStat(pc, 'wis')))}
          </span>
        </>
      );

    default:
  }

  return null;
}
