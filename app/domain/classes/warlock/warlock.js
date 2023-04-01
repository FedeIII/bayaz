import { SCHOLARS_PACK, DUNGEONEERS_PACK } from '../../equipment/packs';
import { ARMORS } from '../../equipment/armors';
import { getAllArcaneFocus, TOOLS } from '../../equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from '../../equipment/weapons';
import { CLASSES } from '~/domain/characters';

export const WARLOCK_EQUIPMENT = [
  {
    or: [
      { and: [WEAPONS.lightCrossbow(), TOOLS.crossbowBolts({ amount: 20 })] },
      { or: [...getAllSimpleMelee(), ...getAllSimpleRanged()] },
    ],
  },
  { or: [TOOLS.componentPouch(), ...getAllArcaneFocus()] },
  { or: [SCHOLARS_PACK, DUNGEONEERS_PACK] },
  ARMORS.leather(),
  { or: getAllSimpleMelee() },
  WEAPONS.dagger({ amount: 2 }),
];

export function translatePatron(patron) {
  if (patron === 'archfey') return 'Archihada';
  if (patron === 'fiend') return 'El Diablo';
  if (patron === 'greatOldOne') return 'El Gran Antiguo';
}

export const PATRONS = {
  archfey: {
    traits: {
      feyPresence: 'Presencia Feérica',
    },
  },
  fiend: {
    traits: {
      darkOnesBlessing: 'Bendición del Oscuro',
    },
  },
  greatOldOne: {
    traits: {
      awakenedMind: 'Mente Despierta',
    },
  },
};

export function getWarlockPatron(pc) {
  return pc.classAttrs?.warlock?.patron;
}

export function getWarlockPatronTraits(pc) {
  const { level } = pc;

  const patron = getWarlockPatron(pc);

  return Object.entries(
    Object.entries(CLASSES.warlock.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.patron?.[patron]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}
