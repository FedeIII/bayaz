import { getPrimalPath, getSpiritTotem, getAspectOfTheBeast, getTotemicAttunement } from './barbarian';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function displayBarbarianTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'primalPath':
      return (
        !getPrimalPath(pc) && (
          <>
            <strong>{trait}</strong>
            <span className="sheet__pending-trait">(!)</span>
          </>
        )
      );

    case 'totemSpirit': {
      const { totemType, animal } = getSpiritTotem(pc);
      return (
        <>
          {trait}
          {!totemType && <span className="sheet__pending-trait">(!)</span>}
          {!!animal && (
            <>
              {': '}
              <strong>{animal}</strong>
            </>
          )}
        </>
      );
    }

    case 'aspectOfTheBeast': {
      const { totemType, animal } = getAspectOfTheBeast(pc);
      return (
        <>
          <strong>{trait}</strong>
          {!totemType && <span className="sheet__pending-trait">(!)</span>}
          {!!animal && (
            <>
              {': '}
              <strong>{animal}</strong>
            </>
          )}
        </>
      );
    }

    case 'brutalCritical': {
      const { level } = pc;
      return (
        <>
          <u>{trait}:</u>{' '}
          {level >= 17 ? '+3 Dados' : level >= 13 ? '+2 Dados' : '+1 Dado'}
        </>
      );
    }

    case 'totemicAttunement': {
      const { totemType, animal } = getTotemicAttunement(pc);
      return (
        <>
          <strong>{trait}</strong>
          {!totemType && <span className="sheet__pending-trait">(!)</span>}
          {!!animal && (
            <>
              {': '}
              <strong>{animal}</strong>
            </>
          )}
        </>
      );
    }

    default:
  }

  return null;
}
