import { SCHOLARS_PACK, DUNGEONEERS_PACK } from './equipment/packs';
import { ARMORS } from './equipment/armors';
import { getAllArcaneFocus, TOOLS } from './equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from './equipment/weapons';

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


