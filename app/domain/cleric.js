import { getItemProficiencies } from './characters';
import { ARMORS, getAllHeavyArmors } from './equipment/armors';
import { EXPLORERS_PACK, PRIESTS_PACK } from './equipment/packs';
import { TOOLS } from './equipment/tools';
import {
  getAllMartialMelee,
  getAllMartialRanged,
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from './equipment/weapons';

export const DIVINE_DOMAINS = {
  knowledge: {
    pickSkills: 2,
    skillsToPick: ['arcana', 'history', 'nature', 'religion'],
    specialSkillProficiencyBonus: bonus => 2 * bonus,
  },
  life: {
    proficientItems: [...getAllHeavyArmors().map(item => item.name)],
    traits: {
      discipleOfLife: 'Discípulo de la Vida',
    },
  },
  light: {
    traits: {
      wardingFlare: 'Fulgor Protector',
    },
  },
  nature: {
    pickSkills: 1,
    skillsToPick: ['animal-handling', 'nature', 'survival'],
    proficientItems: [...getAllHeavyArmors().map(item => item.name)],
  },
  tempest: {
    proficientItems: [
      ...getAllMartialMelee().map(item => item.name),
      ...getAllMartialRanged().map(item => item.name),
      ...getAllHeavyArmors().map(item => item.name),
    ],
    traits: {
      wrathOfTheStorm: 'Ira de la Tormenta',
    },
  },
  trickery: {
    traits: {
      blessingOfTheTrickster: 'Bendición del Tramposo',
    },
  },
  war: {
    proficientItems: [
      ...getAllMartialMelee().map(item => item.name),
      ...getAllMartialRanged().map(item => item.name),
      ...getAllHeavyArmors().map(item => item.name),
    ],
    traits: {
      warCleric: 'Inspiración de Clérico de Guerra',
    },
  },
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
  return pc.classAttrs?.cleric?.divineDomain;
}

export function CLERIC_EQUIPMENT() {
  return [
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
}
