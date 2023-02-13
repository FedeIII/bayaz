import { EXPLORERS_PACK, SCHOLARS_PACK } from './equipment/packs';
import { getAllArcaneFocus, TOOLS } from './equipment/tools';
import { WEAPONS } from './equipment/weapons';

export const WIZARD_EQUIPMENT = [
  { or: [WEAPONS.quarterstaff(), WEAPONS.dagger()] },
  { or: [TOOLS.componentPouch(), ...getAllArcaneFocus()] },
  { or: [SCHOLARS_PACK, EXPLORERS_PACK] },
  TOOLS.spellbook(),
];
