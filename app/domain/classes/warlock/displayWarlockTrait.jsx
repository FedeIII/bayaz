import { getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import {
  getInvocation,
  getPactBoon,
  getTomeRituals,
  getTomeSpells,
  hasToLearnArcanum,
  hasToLearnTomeSpells,
  hasToSelectInvocations,
  translatePactBoon,
} from './warlock';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function displayWarlockTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'darkOnesBlessing': {
      return (
        <>
          <u>{trait}:</u> {increment(getStatMod(getStat(pc, 'cha')) + pc.level)}{' '}
          Puntos de Golpe temporales
        </>
      );
    }

    case 'eldritchInvocations': {
      if (hasToSelectInvocations(pc)) {
        return (
          <>
            {trait}
            <span className="sheet__pending-trait">(!)</span>
          </>
        );
      } else {
        return false;
      }
    }

    case 'pactBoon': {
      const boon = getPactBoon(pc);
      const tomeSpells = getTomeSpells(pc);
      return (
        <>
          <u>{trait}</u>
          {!boon && <span className="sheet__pending-trait">(!)</span>}
          {!!boon && <>: {translatePactBoon(boon)}</>}
          {hasToLearnTomeSpells(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
        </>
      );
    }

    case 'mysticArcanum': {
      return (
        <>
          {trait}
          {hasToLearnArcanum(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
        </>
      );
    }

    default:
  }

  return null;
}

export function displayInvocation(invocationName, invocationTitle, pc) {
  if (invocationName === 'bookOfAncientSecrets') {
    const tomeRituals = getTomeRituals(pc);
    return (
      <>
        {getInvocation(invocationName).translation}
        {!tomeRituals.length && (
          <span className="sheet__pending-trait">(!)</span>
        )}
      </>
    );
  }

  return getInvocation(invocationName).translation;
}
