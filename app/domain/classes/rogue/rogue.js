import { CLASSES } from '~/domain/characters';
import { displayTrait } from '~/domain/display';
import { ARMORS } from '~/domain/equipment/armors';
import {
  BURGLARS_PACK,
  DUNGEONEERS_PACK,
  ENTERTAINERS_PACK,
  EXPLORERS_PACK,
} from '~/domain/equipment/packs';
import { TOOLS } from '~/domain/equipment/tools';
import { WEAPONS } from '~/domain/equipment/weapons';

export const ROGUE_EQUIPMENT = [
  { or: [WEAPONS.rapier(), WEAPONS.shortsword()] },
  { or: [WEAPONS.rapier(), WEAPONS.shortsword()] },
  {
    or: [
      { and: [WEAPONS.shortbow(), TOOLS.arrows({ amount: 20 })] },
      WEAPONS.shortsword(),
    ],
  },
  { or: [BURGLARS_PACK, DUNGEONEERS_PACK, EXPLORERS_PACK] },
  ARMORS.leather(),
  WEAPONS.dagger({ amount: 2 }),
  TOOLS.thievesTools(),
];

/* prettier-ignore */
export const SNEAK_ATTACK_DAMAGE = [
'1d6', '1d6', 
'2d6', '2d6', 
'3d6', '3d6', 
'4d6', '4d6', 
'5d6', '5d6', 
'6d6', '6d6', 
'7d6', '7d6', 
'8d6', '8d6', 
'9d6', '9d6', 
'10d6', '10d6', 
];

export const ROGISH_ARCHETYPES = ['arcaneTrickster', 'assassin', 'thief'];

export function translateRoguishArchetype(archetype) {
  if (archetype === 'arcaneTrickster') return 'Bribón Arcano';
  if (archetype === 'assassin') return 'Asesino';
  if (archetype === 'thief') return 'Ladrón';

  return 'unknown roguish arquetype';
}

export function getRoguishArchetype(pc) {
  return pc.classAttrs?.rogue?.roguishArchetype || null;
}

export function getRoguishArchetypeTraits(pc) {
  const { level } = pc;
  const roguishArchetype = getRoguishArchetype(pc);

  return Object.entries(
    Object.entries(CLASSES.rogue.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? {
              ...(levelSkills.roguishArchetype?.all?.traits || {}),
              ...(levelSkills.roguishArchetype?.[roguishArchetype]?.traits ||
                {}),
            }
          : {}),
      }),
      {}
    )
  ).filter(t => !!displayTrait(t[0], t[1], pc));
}

export function isArcaneTrickster(pc) {
  return getRoguishArchetype(pc) === 'arcaneTrickster';
}

export function getRogueProficiencies(pc) {
  const roguishArchetype = getRoguishArchetype(pc);

  return [
    ...(roguishArchetype === 'assassin'
      ? [ENTERTAINERS_PACK.items.disguiseKit().name, TOOLS.poisonersKit().name]
      : []),
  ];
}

export function getArcaneTricksterSpells(pc) {
  return pc.classAttrs?.rogue?.spellcasting || [];
}
