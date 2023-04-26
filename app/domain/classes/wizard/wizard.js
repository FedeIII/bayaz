import { CLASSES } from '~/domain/characters';
import { EXPLORERS_PACK, SCHOLARS_PACK } from '../../equipment/packs';
import { getAllArcaneFocus, TOOLS } from '../../equipment/tools';
import { WEAPONS } from '../../equipment/weapons';
import { translateSchool } from '~/domain/spells/spellTranslations';
import { displayTrait } from '~/domain/display';

export const WIZARD_EQUIPMENT = [
  { or: [WEAPONS.quarterstaff(), WEAPONS.dagger()] },
  { or: [TOOLS.componentPouch(), ...getAllArcaneFocus()] },
  { or: [SCHOLARS_PACK, EXPLORERS_PACK] },
  TOOLS.spellbook(),
];

export function getArcaneTradition(pc) {
  return pc.classAttrs?.wizard?.arcaneTradition || null;
}

export function translateArcaneTradition(school) {
  return `Escuela de ${translateSchool(school)}`;
}

export function getArcaneTraditionTraits(pc) {
  const { level } = pc;
  const arcaneTradition = getArcaneTradition(pc);

  return Object.entries(
    Object.entries(CLASSES.wizard.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? {
              ...(levelSkills.arcaneTradition?.[arcaneTradition]?.traits || {}),
              ...(levelSkills.arcaneTradition?.all?.traits || {}),
            }
          : {}),
      }),
      {}
    )
  ).filter(t => !!displayTrait(t[0], t[1], pc));
}
