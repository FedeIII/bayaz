import {
  translateDivineDomain,
  getDivineDomain,
  DIVINE_DOMAINS,
} from './cleric';
import {
  getAllHeavyArmors,
  getAllLightArmors,
  getAllMediumArmors,
} from './equipment/armors';
import { getItem } from './equipment/equipment';
import {
  getAllMartialMelee,
  getAllMartialRanged,
  getAllSimpleMelee,
  getAllSimpleRanged,
  getAllWeapons,
} from './equipment/weapons';
import { getSorcererOrigin, SORCERER_ORIGIN } from './sorcerer';
import { PATRONS } from './warlock';

export const RACES = {
  dwarf: {
    hills: {
      age: [40, 350],
      height: [110, 130],
      weight: [55, 100],
      size: 'M',
      speed: 8,
      statMods: {
        con: 2,
        wis: 1,
      },
      extraHitPoints: 1,
      conditionalSkills: {
        history: pc => [
          skillCheckBonus(
            { ...pc, skills: [...pc.skills, 'history'] },
            'history'
          ),
          'Piedra',
        ],
      },
      languages: ['common', 'dwarvish'],
      proficientItems: ['battleaxe', 'handaxe', 'lightHammer', 'warhammer'],
      traits: {
        savingThrows: {
          poison: 'advantage',
        },
        resistances: ['poison'],
        darkvision: 18,
      },
    },
    mountains: {
      age: [40, 350],
      height: [120, 150],
      weight: [55, 100],
      size: 'M',
      speed: 8,
      statMods: {
        str: 2,
        con: 2,
      },
      conditionalSkills: {
        history: pc => [
          skillCheckBonus(
            { ...pc, skills: [...pc.skills, 'history'] },
            'history'
          ),
          'Piedra',
        ],
      },
      proficientItems: [
        'battleaxe',
        'handaxe',
        'lightHammer',
        'warhammer',
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllMediumArmors().map(armor => armor.name),
      ],
      traits: {
        savingThrows: {
          poison: 'advantage',
        },
        resistances: ['poison'],
        darkvision: 18,
      },
    },
  },
  elf: {
    high: {
      age: [80, 750],
      height: [150, 180],
      weight: [40, 75],
      size: 'M',
      speed: 10,
      statMods: {
        dex: 2,
        int: 1,
      },
      skills: ['perception'],
      languages: ['common', 'elvish'],
      proficientItems: ['longsword', 'shortsword', 'longbow', 'shortbow'],
      traits: {
        savingThrows: {
          charm: 'advantage',
        },
        darkvision: 18,
        trance: true,
      },
      spellcastingAbility: 'int',
    },
    wood: {
      age: [80, 750],
      height: [150, 180],
      weight: [45, 80],
      size: 'M',
      speed: 11,
      statMods: {
        dex: 2,
        wis: 1,
      },
      skills: ['perception'],
      languages: ['common', 'elvish'],
      proficientItems: ['longsword', 'shortsword', 'longbow', 'shortbow'],
      traits: {
        savingThrows: {
          charm: 'advantage',
        },
        darkvision: 18,
        trance: true,
        maskOfTheWild: 'Máscara de la Espesura',
      },
    },
    drow: {
      age: [80, 750],
      height: [140, 170],
      weight: [35, 70],
      size: 'M',
      speed: 10,
      statMods: {
        dex: 2,
        cha: 1,
      },
      skills: ['perception'],
      languages: ['common', 'elvish'],
      proficientItems: ['rapier', 'shortsword', 'handCrossbow'],
      traits: {
        savingThrows: {
          charm: 'advantage',
        },
        darkvision: 36,
        trance: true,
        sunlightSensitivity: 'Sensibilidad a la Luz del Sol',
      },
      spellcastingAbility: 'cha',
    },
  },
  halfling: {
    lightfoot: {
      age: [18, 250],
      height: [80, 100],
      weight: [16, 20],
      size: 'S',
      speed: 8,
      statMods: {
        dex: 2,
        cha: 1,
      },
      languages: ['common', 'halfling'],
      traits: {
        lucky: 'Suertudo',
        brave: 'Valiente',
        nimble: 'Agilidad Mediana',
        naturallyStealthy: 'Sigiloso por Naturaleza',
      },
    },
    stout: {
      age: [18, 250],
      height: [80, 100],
      weight: [16, 20],
      size: 'S',
      speed: 8,
      statMods: {
        dex: 2,
        con: 1,
      },
      languages: ['common', 'halfling'],
      traits: {
        lucky: 'Suertudo',
        brave: 'Valiente',
        nimble: 'Agilidad Mediana',
        savingThrows: {
          poison: 'advantage',
        },
        resistances: ['poison'],
      },
    },
  },
  human: {
    subrace: {
      age: [16, 90],
      height: [150, 190],
      weight: [55, 120],
      size: 'M',
      speed: 10,
      statMods: {
        str: 1,
        dex: 1,
        con: 1,
        int: 1,
        wis: 1,
        cha: 1,
      },
      languages: ['common'],
    },
  },
  ['half-elf']: {
    subrace: {
      age: [16, 90],
      height: [150, 180],
      weight: [55, 120],
      size: 'M',
      speed: 10,
      statMods: {
        cha: 2,
      },
      languages: ['common', 'elvish'],
      traits: {
        darkvision: 18,
        savingThrows: {
          charm: 'advantage',
        },
      },
    },
  },
  ['half-orc']: {
    subrace: {
      age: [13, 75],
      height: [150, 200],
      weight: [65, 170],
      size: 'M',
      speed: 10,
      statMods: {
        str: 2,
        con: 1,
      },
      skills: ['intimidation'],
      languages: ['common', 'orc'],
      traits: {
        darkvision: 18,
        relentlessEndurance: 'Resistencia Incansable',
        savageAttacks: 'Ataques Salvajes',
      },
    },
  },
};

export const SUBRACES = {
  dwarf: ['hills', 'mountains'],
  elf: ['high', 'wood', 'drow'],
  halfling: ['lightfoot', 'stout'],
};

export function translateRace(race) {
  switch (race) {
    default:
    case 'human':
      return 'Humano';
    case 'dwarf':
      return 'Enano';
    case 'elf':
      return 'Elfo';
    case 'halfling':
      return 'Mediano';
    case 'half-elf':
      return 'Semielfo';
    case 'half-orc':
      return 'Semiorco';
    case 'hills':
      return 'de las Colinas';
    case 'mountains':
      return 'de las Montañas';
    case 'high':
      return 'Alto Elfo';
    case 'wood':
      return 'de los Bosques';
    case 'drow':
      return 'Oscuro';
    case 'lightfoot':
      return 'Piesligeros';
    case 'stout':
      return 'Fornido';
  }
}

export function getConditionalSkills(pc) {
  const {
    race,
    subrace,
    classAttrs: { skills: classSkills },
  } = pc;

  return (
    {
      ...RACES[race][subrace].conditionalSkills,
      ...classSkills.reduce(
        (conditionalClassSkills, skillName) => ({
          ...conditionalClassSkills,
          [skillName]: pc => {
            if (pc.pClass === 'cleric')
              return [translateDivineDomain(getDivineDomain(pc))];
            return [translateClass(pc.pClass)];
          },
        }),
        {}
      ),
    } || {}
  );
}

export const CLASSES = {
  barbarian: {
    initialHitPoints: 12,
    hitDice: '1d12',
    proficientStats: ['str', 'con'],
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllMediumArmors().map(armor => armor.name),
      'shield',
      ...getAllWeapons().map(weapon => weapon.name),
    ],
    pickSkills: 2,
    skillsToPick: [
      'athletics',
      'intimidation',
      'nature',
      'perception',
      'survival',
      'animal-handling',
    ],
    traits: {
      rage: 'Furia',
    },
  },
  bard: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficientStats: ['dex', 'cha'],
    pickSkills: 3,
    skillsToPick: [
      'athletics',
      'acrobatics',
      'sleight-of-hand',
      'stealth',
      'arcana',
      'history',
      'investigation',
      'nature',
      'religion',
      'animal-handling',
      'insight',
      'medicine',
      'perception',
      'survival',
      'deception',
      'intimidation',
      'performance',
      'persuasion',
    ],
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllSimpleMelee().map(weapon => weapon.name),
      ...getAllSimpleRanged().map(weapon => weapon.name),
      'handCrossbow',
      'longsword',
      'rapier',
      'shortsword',
    ],
    spellcastingAbility: 'cha',
    traits: {
      bardicInspiration: '1d6',
    },
  },
  cleric: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficientStats: ['wis', 'cha'],
    pickSkills: 2,
    skillsToPick: ['insight', 'history', 'medicine', 'persuasion', 'religion'],
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllMediumArmors().map(armor => armor.name),
      'shield',
      ...getAllSimpleMelee().map(weapon => weapon.name),
      ...getAllSimpleRanged().map(weapon => weapon.name),
    ],
  },
  druid: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficientStats: ['int', 'wis'],
    pickSkills: 2,
    skillsToPick: [
      'arcana',
      'insight',
      'medicine',
      'nature',
      'perception',
      'religion',
      'survival',
      'animal-handling',
    ],
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllMediumArmors().map(armor => armor.name),
      'shield',
      'quarterstaff',
      'scimitar',
      'club',
      'dagger',
      'dart',
      'sickle',
      'sling',
      'spear',
      'mace',
      'herbalismKit',
    ],
  },
  fighter: {
    initialHitPoints: 10,
    hitDice: '1d10',
    proficientStats: ['str', 'con'],
    pickSkills: 2,
    skillsToPick: [
      'acrobatics',
      'athletics',
      'insight',
      'history',
      'intimidation',
      'animal-handling',
      'perception',
      'survival',
    ],
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllMediumArmors().map(armor => armor.name),
      ...getAllHeavyArmors().map(armor => armor.name),
      'shield',
      ...getAllSimpleMelee().map(weapon => weapon.name),
      ...getAllSimpleRanged().map(weapon => weapon.name),
      ...getAllMartialMelee().map(weapon => weapon.name),
      ...getAllMartialRanged().map(weapon => weapon.name),
    ],
  },
  monk: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficientStats: ['str', 'dex'],
    pickSkills: 2,
    skillsToPick: [
      'acrobatics',
      'athletics',
      'insight',
      'history',
      'religion',
      'stealth',
    ],
    proficientItems: [
      ...getAllSimpleMelee().map(weapon => weapon.name),
      ...getAllSimpleRanged().map(weapon => weapon.name),
      'shortsword',
    ],
  },
  paladin: {
    initialHitPoints: 10,
    hitDice: '1d10',
    proficientStats: ['str', 'cha'],
    pickSkills: 2,
    skillsToPick: [
      'athletics',
      'insight',
      'intimidation',
      'medicine',
      'persuasion',
      'religion',
    ],
    proficiencies: {
      ['Sentido Divino']: pc =>
        `18m, ${getStatMod(getStat(pc, 'cha')) + 1} veces al día`,
      ['Imposición de Manos']: pc =>
        `Curación de ${
          pc.level * 5
        } Puntos de Golpe al día (5 puntos para curar enfermedad/veneno)`,
    },
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllMediumArmors().map(armor => armor.name),
      ...getAllHeavyArmors().map(armor => armor.name),
      'shield',
      ...getAllSimpleMelee().map(weapon => weapon.name),
      ...getAllSimpleRanged().map(weapon => weapon.name),
      ...getAllMartialMelee().map(weapon => weapon.name),
      ...getAllMartialRanged().map(weapon => weapon.name),
    ],
  },
  ranger: {
    initialHitPoints: 10,
    hitDice: '1d10',
    proficientStats: ['str', 'dex'],
    pickSkills: 3,
    skillsToPick: [
      'athletics',
      'insight',
      'animal-handling',
      'nature',
      'perception',
      'stealth',
      'survival',
    ],
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllMediumArmors().map(armor => armor.name),
      'shield',
      ...getAllSimpleMelee().map(weapon => weapon.name),
      ...getAllSimpleRanged().map(weapon => weapon.name),
      ...getAllMartialMelee().map(weapon => weapon.name),
      ...getAllMartialRanged().map(weapon => weapon.name),
    ],
  },
  rogue: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficientStats: ['dex', 'int'],
    pickSkills: 4,
    skillsToPick: [
      'athletics',
      'acrobatics',
      'insight',
      'deception',
      'performance',
      'intimidation',
      'investigation',
      'sleight-of-hand',
      'perception',
      'persuasion',
      'stealth',
    ],
    proficiencies: {
      ['Ataque Furtivo']: pc => `${Math.ceil(pc.level / 2)}d6 daño extra`,
    },
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllSimpleMelee().map(weapon => weapon.name),
      ...getAllSimpleRanged().map(weapon => weapon.name),
      'handCrossbow',
      'longsword',
      'rapier',
      'shortsword',
      'thievesTools',
    ],
  },
  sorcerer: {
    initialHitPoints: 6,
    hitDice: '1d6',
    proficientStats: ['con', 'cha'],
    pickSkills: 2,
    skillsToPick: [
      'arcana',
      'insight',
      'deception',
      'intimidation',
      'persuasion',
      'religion',
    ],
    proficientItems: [
      'dagger',
      'dart',
      'sling',
      'quarterstaff',
      'lightCrossbow',
    ],
  },
  warlock: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficientStats: ['wis', 'cha'],
    pickSkills: 2,
    skillsToPick: [
      'arcana',
      'deception',
      'history',
      'intimidation',
      'investigation',
      'nature',
      'religion',
    ],
    proficientItems: [
      ...getAllLightArmors().map(armor => armor.name),
      ...getAllSimpleMelee().map(armor => armor.name),
      ...getAllSimpleRanged().map(armor => armor.name),
    ],
    spellcastingAbility: 'cha',
  },
  wizard: {
    initialHitPoints: 6,
    hitDice: '1d6',
    proficientStats: ['int', 'wis'],
    pickSkills: 2,
    skillsToPick: [
      'arcana',
      'insight',
      'history',
      'investigation',
      'medicine',
      'religion',
    ],
    proficientItems: [
      'quarterstaff',
      'lightCrossbow',
      'dagger',
      'dart',
      'sling',
    ],
  },
};

export function getInitialHitPoints(pc) {
  const { pClass } = pc;
  return CLASSES[pClass].initialHitPoints + getExtraHitPoints(pc);
}

export function isProficientStat(stat, pClass) {
  return CLASSES[pClass].proficientStats.includes(stat);
}

export function getExtraHitPoints(pc) {
  const { race, subrace, pClass } = pc;
  return (
    (RACES[race][subrace].extraHitPoints || 0) +
    getStatMod(getStat(pc, 'con')) +
    (pClass === 'sorcerer' && getSorcererOrigin(pc)
      ? SORCERER_ORIGIN[getSorcererOrigin(pc)]?.extraHitPoints(pc) || 0
      : 0)
  );
}

export function statSavingThrow(stat, statValue, pClass, lvl) {
  return (
    getStatMod(statValue) +
    (isProficientStat(stat, pClass) ? getProficiencyBonus(lvl) : 0)
  );
}

export function translateClass(race) {
  switch (race) {
    case 'barbarian':
      return 'Bárbaro';
    case 'bard':
      return 'Bardo';
    case 'cleric':
      return 'Clérigo';
    case 'druid':
      return 'Druida';
    default:
    case 'fighter':
      return 'Guerrero';
    case 'monk':
      return 'Monje';
    case 'paladin':
      return 'Paladín';
    case 'ranger':
      return 'Explorador';
    case 'rogue':
      return 'Pícaro';
    case 'sorcerer':
      return 'Hechicero';
    case 'warlock':
      return 'Brujo';
    case 'wizard':
      return 'Mago';
  }
}

export const STATS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export function isStat(name) {
  return STATS.includes(name);
}

export function translateStat(stat) {
  switch (stat) {
    default:
    case 'str':
      return 'Fuerza';
    case 'dex':
      return 'Destreza';
    case 'con':
      return 'Constitución';
    case 'int':
      return 'Inteligencia';
    case 'wis':
      return 'Sabiduría';
    case 'cha':
      return 'Carisma';
  }
}

export function getStatRacialExtraPoints(stat, character) {
  const { race, subrace } = character;
  let mod = RACES[race][subrace].statMods?.[stat] || 0;

  return mod;
}

export function getStatMod(statValue) {
  return Math.floor(statValue / 2) - 5;
}

export function getProficiencyBonus(lvl) {
  if (lvl <= 4) return 2;
  if (lvl <= 8) return 3;
  if (lvl <= 13) return 4;
  if (lvl <= 16) return 5;
  return 6;
}

export function getStat(pc, statName) {
  const {
    stats = {},
    extraStats = {},
    halfElf: { extraStats: halfElfExtraStats = {} } = {},
  } = pc;

  return (
    (stats[statName] || 0) +
    (extraStats[statName] || 0) +
    (halfElfExtraStats[statName] || 0)
  );
}

export function getStats(pc) {
  return STATS.reduce(
    (allStats, statName) => ({
      ...allStats,
      [statName]: getStat(pc, statName),
    }),
    {}
  );
}

export const SKILLS = [
  { name: 'athletics', stat: 'str' },
  { name: 'acrobatics', stat: 'dex' },
  { name: 'sleight-of-hand', stat: 'dex' },
  { name: 'stealth', stat: 'dex' },
  { name: 'arcana', stat: 'int' },
  { name: 'history', stat: 'int' },
  { name: 'investigation', stat: 'int' },
  { name: 'nature', stat: 'int' },
  { name: 'religion', stat: 'int' },
  { name: 'animal-handling', stat: 'wis' },
  { name: 'insight', stat: 'wis' },
  { name: 'medicine', stat: 'wis' },
  { name: 'perception', stat: 'wis' },
  { name: 'survival', stat: 'wis' },
  { name: 'deception', stat: 'cha' },
  { name: 'intimidation', stat: 'cha' },
  { name: 'performance', stat: 'cha' },
  { name: 'persuasion', stat: 'cha' },
];

export function translateSkill(skillName) {
  switch (skillName) {
    case 'athletics':
      return 'Atletismo';
    case 'acrobatics':
      return 'Acrobacias';
    case 'sleight-of-hand':
      return 'Juego de Manos';
    case 'stealth':
      return 'Sigilo';
    case 'arcana':
      return 'Arcano';
    case 'history':
      return 'Historia';
    case 'investigation':
      return 'Investigación';
    case 'nature':
      return 'Naturaleza';
    case 'religion':
      return 'Religión';
    case 'animal-handling':
      return 'Manejo de animales';
    case 'insight':
      return 'Averiguar intenciones';
    case 'medicine':
      return 'Medicina';
    case 'perception':
      return 'Percepción';
    case 'survival':
      return 'Supervivencia';
    case 'deception':
      return 'Engañar';
    case 'intimidation':
      return 'Intimidación';
    case 'performance':
      return 'Interpretación';
    case 'persuasion':
      return 'Persuasión';
    case 'thieves-tools':
      return 'Herramientas de Ladrón';
    default:
      return 'unknown skill';
  }
}

export function getSkills(pc) {
  return [
    ...(pc.skills || []),
    ...(pc.halfElf?.skills || []),
    ...(pc.classAttrs?.skills || []),
  ];
}

export function isProficientSkill(pc, skillName) {
  return getSkills(pc).includes(skillName);
}

export function bonusForSkill(pc, skillName) {
  const { level } = pc;
  if (
    pc.classAttrs?.skills.includes(skillName) &&
    DIVINE_DOMAINS[getDivineDomain(pc)].specialSkillProficiencyBonus
  )
    return DIVINE_DOMAINS[getDivineDomain(pc)].specialSkillProficiencyBonus(
      getProficiencyBonus(pc.level)
    );

  if (pc.pClass === 'rogue' && pc.classAttrs?.expertSkills.includes(skillName))
    return 2 * getProficiencyBonus(level);

  return getProficiencyBonus(level);
}

export function specialProficiencyBonus(pc) {
  return DIVINE_DOMAINS[getDivineDomain(pc)].specialSkillProficiencyBonus(
    getProficiencyBonus(pc.level)
  );
}

export function skillCheckBonus(pc, skillName) {
  const statName = SKILLS.find(skill => skill.name === skillName).stat;
  return (
    getStatMod(getStat(pc, statName)) +
    (isProficientSkill(pc, skillName) ? bonusForSkill(pc, skillName) : 0)
  );
}

export const LANGUAGES = [
  'common',
  'dwarvish',
  'elvish',
  'giant',
  'gnomish',
  'goblin',
  'halfling',
  'orc',
];

export const EXOTIC_LANGUAGES = [
  'druidic',
  'thieves-cant',
  'abyssal',
  'celestial',
  'draconic',
  'deep-speech',
  'infernal',
  'primordial',
  'sylvan',
  'undercommon',
];

export function translateLanguage(language) {
  switch (language) {
    case 'common':
      return 'Común';
    case 'dwarvish':
      return 'Enano';
    case 'elvish':
      return 'Élfico';
    case 'giant':
      return 'Gigante';
    case 'gnomish':
      return 'Gnómico';
    case 'goblin':
      return 'Goblin';
    case 'halfling':
      return 'Mediano';
    case 'orc':
      return 'Orco';

    case 'druidic':
      return 'Druídico';
    case 'thieves-cant':
      return 'Jerga de Ladrones';
    case 'abyssal':
      return 'Abisal';
    case 'celestial':
      return 'Celestial';
    case 'draconic':
      return 'Dracónico';
    case 'deep-speech':
      return 'Habla Profunda';
    case 'infernal':
      return 'Infernal';
    case 'primordial':
      return 'Primordial';
    case 'sylvan':
      return 'Silvano';
    case 'undercommon':
      return 'Infracomún';
    default:
      return 'unknown language';
  }
}

export function setLanguages(race, subrace, pClass) {
  const languages = [...RACES[race][subrace].languages];
  if (pClass === 'druid') languages.push('druidic');
  if (pClass === 'rogue') languages.push('thieves-cant');

  return languages;
}

export const ALIGNMENTS = {
  ethics: ['L', 'Ne', 'C'],
  morals: ['G', 'Nm', 'E'],
};

export function getCarryingCapacity(pc) {
  return getStat(pc, 'str') * 5;
}

export function getEncumbrance(pc) {
  return getStat(pc, 'str') * 10;
}

export function getPassivePerception(pc) {
  return 10 + getStatMod(getStat(pc, 'wis'));
}

export function getItemProficiencies(pc) {
  const { race, subrace, pClass } = pc;

  const divineDomain = getDivineDomain(pc);

  return [
    ...(RACES[race][subrace].proficientItems || []),
    ...(CLASSES[pClass].proficientItems || []),
    ...(pc.proficientItems?.map(item => item.name) || []),
    ...((divineDomain ? DIVINE_DOMAINS[divineDomain].proficientItems : []) ||
      []),
  ];
}

export function getArmorClass(pc) {
  const { equipment, pClass } = pc;
  const armor = equipment.find(item => getItem(item.name)?.properties?.AC);
  const shield = equipment.find(
    item => getItem(item.name).subtype === 'shield'
  );

  if (pClass === 'barbarian' && !armor) {
    return 10 + getStatMod(getStat(pc, 'dex')) + getStatMod(getStat(pc, 'con'));
  }

  if (pClass === 'monk' && !armor && !shield) {
    return 10 + getStatMod(getStat(pc, 'dex')) + getStatMod(getStat(pc, 'wis'));
  }

  if (armor) return getItem(armor.name).properties.AC(getStats(pc));
  else return 10 * getStatMod(getStat(pc, 'dex'));
}

export function getExtraArmorClass(pc) {
  const shield = pc.equipment.find(
    item => getItem(item.name).subtype === 'shield'
  );
  if (shield) return getItem(shield.name).properties.AC(getStats(pc));
  else return 0;
}

export function getAttackBonus(pc, weapon) {
  const { subtype, properties: { finesse } = {} } = weapon;
  let statMod = 0;

  const strMod = getStatMod(getStat(pc, 'str'));
  const dexMod = getStatMod(getStat(pc, 'dex'));

  if (finesse) statMod = strMod > dexMod ? strMod : dexMod;
  else if (subtype === 'simpleMelee' || subtype === 'martialMelee')
    statMod = strMod;
  else if (subtype === 'simpleRanged' || subtype === 'martiaRanged')
    statMod = dexMod;

  const proficiencyBonus = getItemProficiencies(pc).includes(weapon.name)
    ? getProficiencyBonus(pc.level)
    : 0;

  return statMod + proficiencyBonus;
}

export function getDamageBonus(pc, weapon) {
  const { subtype, properties: { finesse } = {} } = weapon;
  let statMod = 0;

  const strMod = getStatMod(getStat(pc, 'str'));
  const dexMod = getStatMod(getStat(pc, 'dex'));

  if (finesse) statMod = strMod > dexMod ? strMod : dexMod;
  else if (subtype === 'simpleMelee' || subtype === 'martialMelee')
    statMod = strMod;
  else if (subtype === 'simpleRanged' || subtype === 'martiaRanged')
    statMod = dexMod;

  return statMod;
}

export function translateSavingThrowStatus(status) {
  if (status === 'advantage') return 'Ventaja';
  if (status === 'disadvantage') return 'Desventaja';
  return 'unknown saving throw status';
}

export function getTraits(pc) {
  const {
    race,
    subrace,
    pClass,
    classAttrs: { patron, divineDomain } = {},
  } = pc;

  return (
    {
      ...RACES[race][subrace].traits,
      ...CLASSES[pClass].traits,
      ...(pClass === 'warlock' ? PATRONS[patron]?.traits || {} : {}),
      ...(pClass === 'cleric'
        ? DIVINE_DOMAINS[divineDomain]?.traits || {}
        : {}),
    } || {}
  );
}
