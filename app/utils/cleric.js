import { getItemProficiencies } from './characters';
import { ARMORS } from './equipment/armors';
import { EXPLORERS_PACK, PRIESTS_PACK } from './equipment/packs';
import { TOOLS } from './equipment/tools';
import { getAllSimpleMelee, getAllSimpleRanged, WEAPONS } from './equipment/weapons';

export const DIVINE_DOMAINS = {
  death: {},
  knowledge: {
    pickSkills: 2,
    skillsToPick: ['arcana', 'history', 'nature', 'religion'],
    specialSkillProficiencyBonus: bonus => 2 * bonus,
  },
  life: {},
  light: {},
  nature: {
    pickSkills: 1,
    skillsToPick: ['animal-handling', 'nature', 'survival'],
  },
  tempest: {},
  trickery: {},
  war: {},
};

export function translateDivineDomain(divineDomainName) {
  switch (divineDomainName) {
    case 'death':
      return 'Muerte';
    case 'knowledge':
      return 'Conocimiento';
    case 'life':
      return 'Vida';
    case 'light':
      return 'Luz';
    case 'nature':
      return 'Naturaleza';
    case 'tempest':
      return 'Tempestad';
    case 'trickery':
      return 'Superchería';
    case 'war':
      return 'Guerra';
    default:
      return 'unknown divine domain';
  }
}

export function getDivineDomain(pc) {
  return pc.classAttrs?.divineDomain;
}

export const CLERIC_EQUIPMENT = [
  {
    or: [
      WEAPONS.mace(),
      {
        item: WEAPONS.warhammer(),
        if: pc => getItemProficiencies(pc).includes('warhammer'),
      },
    ],
  },
  {
    or: [
      ARMORS.scaleMail(),
      ARMORS.leather(),
      {
        item: ARMORS.chainMail(),
        if: pc => getItemProficiencies(pc).includes('chainMail'),
      },
    ],
  },
  {
    or: [
      { and: [WEAPONS.lightCrossbow(), TOOLS.crossbowBolts({ amount: 20 })] },
      { or: [...getAllSimpleMelee(), ...getAllSimpleRanged()] },
    ],
  },
  { or: [PRIESTS_PACK, EXPLORERS_PACK] },
  ARMORS.shield(),
  TOOLS.holySymbol(),
];
