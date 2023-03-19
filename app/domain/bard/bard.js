import { DIPLOMATS_PACK, ENTERTAINERS_PACK } from '../equipment/packs';
import { ARMORS } from '../equipment/armors';
import { getAllMusicalInstruments } from '../equipment/tools';
import { getAllSimpleMelee, WEAPONS } from '../equipment/weapons';
import { getStat, getStatMod } from '../characters';

export const BARD_EQUIPMENT = [
  { or: [WEAPONS.rapier(), WEAPONS.longsword(), ...getAllSimpleMelee()] },
  { or: [DIPLOMATS_PACK, ENTERTAINERS_PACK] },
  { or: getAllMusicalInstruments() },
  ARMORS.leather(),
  WEAPONS.dagger(),
];

export function displayBardTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'bardicInspiration': {
      const { level } = pc;
      const die =
        level >= 15
          ? '1d12'
          : level >= 10
          ? '1d10'
          : level >= 5
          ? '1d8'
          : '1d6';
      return (
        <>
          <u>Inspiración de Bardo:</u> {getStatMod(getStat(pc, 'cha'))} veces al
          día. {die}
        </>
      );
    }

    case 'songOfRest':
      return (
        <>
          <u>{trait}.</u> +{' '}
          {pc.level >= 17
            ? '1d12'
            : pc.level >= 13
            ? '1d10'
            : pc.level >= 9
            ? '1d8'
            : '1d6'}{' '}
          Puntos de Golpe
        </>
      );

    default:
  }

  return null;
}
