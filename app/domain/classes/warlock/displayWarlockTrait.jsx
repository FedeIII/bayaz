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
import { ChooseTrait } from '~/components/summary/skillStates';

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
            <ChooseTrait />
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
          {!boon && <ChooseTrait />}
          {!!boon && <>: {translatePactBoon(boon)}</>}
          {hasToLearnTomeSpells(pc) && (
            <ChooseTrait />
          )}
        </>
      );
    }

    case 'mysticArcanum': {
      return (
        <>
          {trait}
          {hasToLearnArcanum(pc) && (
            <ChooseTrait />
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
          <ChooseTrait />
        )}
      </>
    );
  }

  return getInvocation(invocationName).translation;
}
