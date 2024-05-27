import { CLASSES } from '~/domain/characters';
import { DUNGEONEERS_PACK, EXPLORERS_PACK } from '../../equipment/packs';
import { getAllArcaneFocus, TOOLS } from '../../equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from '../../equipment/weapons';
import { displayTrait } from '~/domain/display';

export const SORCERER_ORIGINS = ['draconicBloodline', 'wildMagic'];

export function translateSorcererOrigin(origin) {
  switch (origin) {
    case 'draconicBloodline':
      return 'Línea de sangre Dracónica';
    case 'wildMagic':
      return 'Magia Salvaje';

    default:
      return 'unknown sorcerer origin';
  }
}

export function getSorcererOrigin(pc) {
  return pc.classAttrs?.sorcerer?.sorcererOrigin || null;
}

export function isDraconicBloodline(pc) {
  return getSorcererOrigin(pc) === 'draconicBloodline';
}

export const DRAGON_ANCESTORS = ['acid', 'cold', 'fire', 'lightning', 'poison'];

export function translateDragonAncestor(ancestor) {
  switch (ancestor) {
    case 'acid':
      return 'Dragón de Ácido';
    case 'cold':
      return 'Dragón de Frío';
    case 'fire':
      return 'Dragón de Fuego';
    case 'lightning':
      return 'Dragón Eléctrico';
    case 'poison':
      return 'Dragón Venenoso';

    default:
      return 'unknown dragon ancestor';
  }
}

export function getDragonAncestor(pc) {
  return pc.classAttrs?.sorcerer?.dragonAncestor || null;
}

export const SORCERER_EQUIPMENT = [
  {
    or: [
      {
        and: [WEAPONS().lightCrossbow(), TOOLS().crossbowBolts({ amount: 20 })],
      },
      ...getAllSimpleMelee(),
      ...getAllSimpleRanged(),
    ],
  },
  { or: [TOOLS().componentPouch(), ...getAllArcaneFocus()] },
  { or: [DUNGEONEERS_PACK, EXPLORERS_PACK] },
];

export function getSorcererOriginTraits(pc) {
  const { level } = pc;
  const sorcererOrigin = getSorcererOrigin(pc);

  return Object.entries(
    Object.entries(CLASSES().sorcerer.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.sorcererOrigin?.[sorcererOrigin]?.traits || {}
          : {}),
      }),
      {}
    )
  ).filter(t => !!displayTrait(t[0], t[1], pc));
}

export const METAMAGIC = [
  'carefulSpell',
  'distantSpell',
  'empoweredSpell',
  'extendedSpell',
  'heightenedSpell',
  'quickenedSpell',
  'subtleSpell',
  'twinnedSpell',
];

export function getMetamagic(pc) {
  return pc.classAttrs?.sorcerer?.metamagic || [];
}

export function translateMetamagic(metamagic) {
  switch (metamagic) {
    case 'carefulSpell':
      return 'Conjuro Cuidadoso';
    case 'distantSpell':
      return 'Conjuro Distante';
    case 'empoweredSpell':
      return 'Conjuro Potenciado';
    case 'extendedSpell':
      return 'Ampliar Conjuro';
    case 'heightenedSpell':
      return 'Conjuro Aumentado';
    case 'quickenedSpell':
      return 'Conjuro Acelerado';
    case 'subtleSpell':
      return 'Conjuro sutil';
    case 'twinnedSpell':
      return 'Conjuro Duplicado';

    default:
      return 'unknown metamagic';
  }
}

function getMaxMetamagic(pc) {
  const { level } = pc;

  return level >= 17 ? 4 : level >= 10 ? 3 : 2;
}

export function hasToLearnMetamagic(pc) {
  const { pClass } = pc;

  return pClass === 'sorcerer' && getMaxMetamagic(pc) > getMetamagic(pc).length;
}

export function getMetamagicAmountToLearn(pc) {
  const { pClass } = pc;

  if (pClass !== 'sorcerer') return 0;

  return getMaxMetamagic(pc) - getMetamagic(pc).length;
}

export function getTidesOfChaos(pc) {
  return pc.classAttrs?.sorcerer?.tidesOfChaos || 0;
}

export function getMaxTidesOfChaos() {
  return 1;
}
