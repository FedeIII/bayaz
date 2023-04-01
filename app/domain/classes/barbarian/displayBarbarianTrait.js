import sheetStyles from '~/components/sheet.module.css';
import { getPrimalPath, getSpiritTotem, getAspectOfTheBeast, getTotemicAttunement } from './barbarian';


export function displayBarbarianTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'primalPath':
      return (
        !getPrimalPath(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'totemSpirit': {
      const { totemType, animal } = getSpiritTotem(pc);
      return (
        <>
          {trait}
          {!totemType && <span className={sheetStyles.pendingTrait}>(!)</span>}
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
          {!totemType && <span className={sheetStyles.pendingTrait}>(!)</span>}
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
          {!totemType && <span className={sheetStyles.pendingTrait}>(!)</span>}
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
