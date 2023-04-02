import { getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import { getInvocation, hasToSelectInvocations } from './warlock';

import sheetStyles from '~/components/sheet.module.css';

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
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        );
      } else {
        return false;
      }
    }

    default:
  }

  return null;
}

export function displayInvocation(invocationName, invocationTitle, pc) {
  return getInvocation(invocationName).translation;
}
