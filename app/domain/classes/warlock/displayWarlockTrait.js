import { getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';

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

    default:
  }

  return null;
}
