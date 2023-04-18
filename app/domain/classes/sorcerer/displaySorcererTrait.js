import { getStat, getStatMod } from '~/domain/characters';
import { getDragonAncestor, translateDragonAncestor } from './sorcerer';
import { getSorcereryPoints } from '~/domain/spells/sorcerer';

import appStyles from '~/components/app.module.css';

export function displaySorcererTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'dragonAncestor': {
      return (
        <>
          <strong>
            <u>{trait}</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
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
          <span className={appStyles.smallText}>
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
          <span className={appStyles.smallText}>
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
          <span className={appStyles.smallText}>
            {getSorcereryPoints(pc)} Puntos de Hechicería
          </span>
        </>
      );

    default:
  }

  return null;
}
