import { BACKGROUNDS } from './backgrounds';
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
import {
  canBeAlwaysEquipped,
  getItem,
  unifyEquipment,
} from './equipment/equipment';
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
        maskOfTheWild: 'M??scara de la Espesura',
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
      return 'de las Monta??as';
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
    spellcastingAbility: 'wis',
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
    spellcastingAbility: 'wis',
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
    traits: {
      secondWind: 'Nuevas Energ??as',
    },
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
        `18m, ${getStatMod(getStat(pc, 'cha')) + 1} veces al d??a`,
      ['Imposici??n de Manos']: pc =>
        `Curaci??n de ${
          pc.level * 5
        } Puntos de Golpe al d??a (5 puntos para curar enfermedad/veneno)`,
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
    spellcastingAbility: 'wis',
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
      ['Ataque Furtivo']: pc => `${Math.ceil(pc.level / 2)}d6 da??o extra`,
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
    spellcastingAbility: 'cha',
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
    spellcastingAbility: 'int',
    traits: {
      arcaneRecovery: 'Recuperaci??n Arcana',
    },
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
      return 'B??rbaro';
    case 'bard':
      return 'Bardo';
    case 'cleric':
      return 'Cl??rigo';
    case 'druid':
      return 'Druida';
    default:
    case 'fighter':
      return 'Guerrero';
    case 'monk':
      return 'Monje';
    case 'paladin':
      return 'Palad??n';
    case 'ranger':
      return 'Explorador';
    case 'rogue':
      return 'P??caro';
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
      return 'Constituci??n';
    case 'int':
      return 'Inteligencia';
    case 'wis':
      return 'Sabidur??a';
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
      return 'Investigaci??n';
    case 'nature':
      return 'Naturaleza';
    case 'religion':
      return 'Religi??n';
    case 'animal-handling':
      return 'Manejo de animales';
    case 'insight':
      return 'Averiguar intenciones';
    case 'medicine':
      return 'Medicina';
    case 'perception':
      return 'Percepci??n';
    case 'survival':
      return 'Supervivencia';
    case 'deception':
      return 'Enga??ar';
    case 'intimidation':
      return 'Intimidaci??n';
    case 'performance':
      return 'Interpretaci??n';
    case 'persuasion':
      return 'Persuasi??n';
    case 'thieves-tools':
      return 'Herramientas de Ladr??n';
    default:
      return 'unknown skill';
  }
}

export function getSkills(pc) {
  return [
    ...(pc.skills || []),
    ...(pc.halfElf?.skills || []),
    ...(pc.classAttrs?.skills || []),
    ...(pc.sbackground?.skills || []),
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
      return 'Com??n';
    case 'dwarvish':
      return 'Enano';
    case 'elvish':
      return '??lfico';
    case 'giant':
      return 'Gigante';
    case 'gnomish':
      return 'Gn??mico';
    case 'goblin':
      return 'Goblin';
    case 'halfling':
      return 'Mediano';
    case 'orc':
      return 'Orco';

    case 'druidic':
      return 'Dru??dico';
    case 'thieves-cant':
      return 'Jerga de Ladrones';
    case 'abyssal':
      return 'Abisal';
    case 'celestial':
      return 'Celestial';
    case 'draconic':
      return 'Drac??nico';
    case 'deep-speech':
      return 'Habla Profunda';
    case 'infernal':
      return 'Infernal';
    case 'primordial':
      return 'Primordial';
    case 'sylvan':
      return 'Silvano';
    case 'undercommon':
      return 'Infracom??n';
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

// ENCUMBRANCES

// 4 * 10 * 0.45 = 18
// 6 * 10 * 0.45 = 27
// 8 * 10 * 0.45 = 36
// 10 * 10 * 0.45 = 45
// 12 * 10 * 0.45 = 54
// 14 * 10 * 0.45 = 63
// 16 * 10 * 0.45 = 72
// 18 * 10 * 0.45 = 81
// 20 * 10 * 0.45 = 90


// 4 * 15 * 0.45 = 27
// 6 * 15 * 0.45 = 40.5
// 8 * 15 * 0.45 = 54
// 10 * 15 * 0.45 = 67.5
// 12 * 15 * 0.45 = 81
// 14 * 15 * 0.45 = 94.5
// 16 * 15 * 0.45 = 108
// 18 * 15 * 0.45 = 121.5
// 20 * 15 * 0.45 = 135

export function getLightEncumbrance(pc) {
  return getStat(pc, 'str') * 10 * 0.45;
}

export function getHeavyEncumbrance(pc) {
  return getStat(pc, 'str') * 15 * 0.45;
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

export function getItemArmorClass(pc, itemName) {
  return getItem(itemName).properties.AC(getStats(pc));
}

export function getArmorClass(pc) {
  const {
    items: {
      equipment: { armor: pArmor = {}, shield: pShield = {} },
    },
    pClass,
  } = pc;
  const armor = pArmor && getItem(pArmor.name);
  const shield = pShield && getItem(pShield.name);

  if (pClass === 'barbarian' && !armor) {
    return 10 + getStatMod(getStat(pc, 'dex')) + getStatMod(getStat(pc, 'con'));
  }

  if (pClass === 'monk' && !armor && !shield) {
    return 10 + getStatMod(getStat(pc, 'dex')) + getStatMod(getStat(pc, 'wis'));
  }

  if (armor) return getItemArmorClass(pc, armor.name);
  else return 10 + getStatMod(getStat(pc, 'dex'));
}

export function getExtraArmorClass(pc) {
  const shield = getItem(pc.items.equipment.shield?.name);
  if (shield) return shield.properties.AC(getStats(pc));
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
    background = {},
  } = pc;

  return (
    {
      ...RACES[race][subrace].traits,
      ...CLASSES[pClass].traits,
      ...(pClass === 'warlock' ? PATRONS[patron]?.traits || {} : {}),
      ...(pClass === 'cleric'
        ? DIVINE_DOMAINS[divineDomain]?.traits || {}
        : {}),
      ...(BACKGROUNDS[background.name]?.traits || {}),
    } || {}
  );
}

export function translateMoney(money) {
  if (!money) return '-';
  return money
    .map((coin, i) => {
      if (i === 0 && coin) return coin + ' Oro';
      if (i === 1 && coin) return coin + ' Plata';
      if (i === 2 && coin) return coin + ' Cobre';
    })
    .filter(v => v)
    .join(', ');
}

export function distributeItems(pc, items) {
  const unifiedItems = unifyEquipment(items);
  const {
    items: { weapons: pWeapons, equipment: pEquipment, treasure: pTreasure },
  } = pc;

  return unifiedItems.reduce(
    (distributedItems, pItem) => {
      const item = getItem(pItem.name);

      if (item.type === 'weapon') {
        if (distributedItems.weapons.length < 3) {
          distributedItems.weapons.push(pItem);
        } else {
          distributedItems.treasure.weapons.push(pItem);
        }
      } else if (item.subtype === 'shield') {
        if (!distributedItems.equipment.shield) {
          distributedItems.equipment.shield = pItem;
        } else {
          distributedItems.treasure.armors.push(pItem);
        }
      } else if (item.type === 'armor') {
        if (!distributedItems.equipment.armor) {
          distributedItems.equipment.armor = pItem;
        } else {
          distributedItems.treasure.armors.push(pItem);
        }
      } else if (item.subtype === 'ammunition') {
        distributedItems.equipment.ammunition.push(pItem);
      } else if (canBeAlwaysEquipped(item)) {
        distributedItems.equipment.others.push(pItem);
      } else {
        distributedItems.treasure.others.push(pItem);
      }

      return distributedItems;
    },
    {
      weapons: [...pWeapons],
      equipment: {
        armor: pEquipment.armor,
        shield: pEquipment.shield,
        ammunition: [...pEquipment.ammunition],
        others: [...pEquipment.others],
      },
      treasure: {
        weapons: [...pTreasure.weapons],
        armors: [...pTreasure.armors],
        others: [...pTreasure.others],
      },
    }
  );
}

export function hasExtraWeapons(pc) {
  const {
    items: { treasure },
  } = pc;

  return treasure.weapons.length !== 0;
}

export function getExtraWeapons(pc) {
  const {
    items: { treasure },
  } = pc;

  return treasure.weapons;
}

export function getEquipmentWeight(pc) {
  return Object.values(pc.items).reduce((encumbrance, section) => {
    return (
      encumbrance +
      Object.values(section).reduce((sectionEncumbrance, subsection) => {
        return (
          sectionEncumbrance +
          (Array.isArray(subsection)
            ? subsection.reduce((subsectionEncumbrance, item) => {
                return (
                  subsectionEncumbrance +
                  (getItem(item?.name)?.weight || 0) * (item?.amount || 1)
                );
              }, 0)
            : (getItem(subsection?.name)?.weight || 0) *
              (subsection?.amount || 1))
        );
      }, 0)
    );
  }, 0);
}
