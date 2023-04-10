import {
  getFavoredEnemies,
  getFavoredTerrains,
  translateFavoredEnemy,
  translateFavoredTerrain,
} from './ranger';

import appStyles from '~/components/app.module.css';

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

    default:
  }

  return null;
}
