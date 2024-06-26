import {
  getFavoredEnemies,
  getFavoredTerrains,
  getHunterDefensiveTactics,
  getHunterMultiattack,
  getHuntersPrey,
  getIsRangerFightingStyleSettled,
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
  translateSuperiorHuntersDefense,
} from './ranger';
import { getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import { ChooseTrait } from '~/components/summary/skillStates';
import { t } from '~/domain/translations';

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
          {hasToPickFavoredEnemies(pc) && <ChooseTrait />}
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
          {hasToPickFavoredTerrain(pc) && <ChooseTrait />}
        </>
      );

    case 'rangerFightingStyle':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          {!!getRangerFightingStyle(pc) && (
            <span className="app__small-text">
              {t(getRangerFightingStyle(pc))}
            </span>
          )}
          {!getIsRangerFightingStyleSettled(pc) && <ChooseTrait />}
        </>
      );

    case 'rangerConclave':
      return (
        !getRangerConclave(pc) && (
          <>
            <strong>{trait}</strong>
            <ChooseTrait />
          </>
        )
      );

    case 'huntersPrey':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>
          . {!getHuntersPrey(pc) && <ChooseTrait />}
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
          . {!getHunterDefensiveTactics(pc) && <ChooseTrait />}
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
          . {!getHunterMultiattack(pc) && <ChooseTrait />}
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
          . {!getSuperiorHuntersDefense(pc) && <ChooseTrait />}
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
