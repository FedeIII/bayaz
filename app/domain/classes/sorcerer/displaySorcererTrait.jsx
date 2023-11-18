import { getStat, getStatMod } from '~/domain/characters';
import {
  getDragonAncestor,
  getMetamagic,
  hasToLearnMetamagic,
  translateDragonAncestor,
  translateMetamagic,
} from './sorcerer';
import { getSorcereryPoints } from '~/domain/spells/sorcerer';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function displaySorcererTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'dragonAncestor': {
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>{' '}
          <span className="app__small-text">
            {translateDragonAncestor(getDragonAncestor(pc))}
          </span>
        </>
      );
    }

    case 'draconicResilience':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>{' '}
          <span className="app__small-text">
            Sin armadura: AC {13 + getStatMod(getStat(pc, 'dex'))}
          </span>
        </>
      );

    case 'tidesOfChaos':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>{' '}
          <span className="app__small-text">
            1 vez entre descansos prolongados.
          </span>
        </>
      );

    case 'fontOfMagic':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>{' '}
          <span className="app__small-text">
            {getSorcereryPoints(pc)} Puntos de Hechicería
          </span>
        </>
      );

    case 'metamagic':
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>{' '}
          {hasToLearnMetamagic(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!hasToLearnMetamagic(pc) && (
            <span className="app__small-text">
              {getMetamagic(pc).map(translateMetamagic).join(', ')}
            </span>
          )}
        </>
      );

    default:
  }

  return null;
}
