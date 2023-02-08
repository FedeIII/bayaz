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
        history: pc =>
          skillCheckBonus(
            { ...pc, skills: [...pc.skills, 'history'] },
            'history'
          ),
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
        history: pc =>
          skillCheckBonus(
            { ...pc, skills: [...pc.skills, 'history'] },
            'history'
          ),
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
      return 'de las colinas';
    case 'mountains':
      return 'de las montañas';
    case 'high':
      return 'alto elfo';
    case 'wood':
      return 'de los bosques';
    case 'drow':
      return 'oscuro';
    case 'lightfoot':
      return 'piesligeros';
    case 'stout':
      return 'fornido';
  }
}

export function getConditionalSkills(pc) {
  const { race, subrace } = pc;

  return RACES[race][subrace].conditionalSkills || [];
}

export const CLASSES = {
  barbarian: {
    initialHitPoints: 12,
    hitDice: '1d12',
    proficiency: ['str', 'con'],
    pickSkills: 2,
    skillsToPick: [
      'athletics',
      'intimidation',
      'nature',
      'perception',
      'survival',
      'animal-handling',
    ],
  },
  bard: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficiency: ['dex', 'cha'],
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
  },
  cleric: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficiency: ['wis', 'cha'],
    pickSkills: 2,
    skillsToPick: ['insight', 'history', 'medicine', 'persuasion', 'religion'],
  },
  druid: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficiency: ['int', 'wis'],
    pickSkills: 2,
    skillsToPick: [
      'arcana',
      'insight',
      'medicine',
      'nature',
      'perception',
      'religion',
      'survival',
      'ani',
    ],
  },
  fighter: {
    initialHitPoints: 10,
    hitDice: '1d10',
    proficiency: ['str', 'con'],
  },
  monk: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficiency: ['str', 'dex'],
  },
  palading: {
    initialHitPoints: 10,
    hitDice: '1d10',
    proficiency: ['str', 'cha'],
  },
  ranger: {
    initialHitPoints: 10,
    hitDice: '1d10',
    proficiency: ['str', 'dex'],
  },
  rogue: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficiency: ['dex', 'int'],
  },
  sorcerer: {
    initialHitPoints: 6,
    hitDice: '1d6',
    proficiency: ['con', 'cha'],
  },
  warlock: {
    initialHitPoints: 8,
    hitDice: '1d8',
    proficiency: ['wis', 'cha'],
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
  },
  wizard: {
    initialHitPoints: 6,
    hitDice: '1d6',
    proficiency: ['int', 'wis'],
  },
};

export function getInitialHitPoints(pClass, race, subrace) {
  return CLASSES[pClass].initialHitPoints + getExtraHitPoints(race, subrace);
}

export function isProficientStat(stat, pClass) {
  return CLASSES[pClass].proficiency.includes(stat);
}

export function getExtraHitPoints(race, subrace) {
  return RACES[race][subrace].extraHitPoints || 0;
}

export function statSavingThrow(stat, statValue, pClass, lvl) {
  return (
    getStatMod(statValue) +
    (isProficientStat(stat, pClass) ? proficiencyBonus(lvl) : 0)
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

export function getStatExtraPoints(stat, character, extraPointStats) {
  const { race, subrace } = character;
  let mod = RACES[race][subrace].statMods?.[stat] || 0;
  mod += extraPointStats.filter(v => v === stat).length;

  return mod;
}

export function getStatMod(statValue) {
  return Math.floor(statValue / 2) - 5;
}

export function proficiencyBonus(lvl) {
  if (lvl <= 4) return 2;
  if (lvl <= 8) return 3;
  if (lvl <= 13) return 4;
  if (lvl <= 16) return 5;
  return 6;
}

export function stat(pc, statName) {
  const { stats, extraStats } = pc;

  return stats[statName] + extraStats[statName];
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
    default:
      return 'unknown skill';
  }
}

export function skills(pc) {
  return [
    ...(pc.skills || []),
    ...(pc.halfElf?.skills || []),
    ...(pc.classAttrs?.skills || []),
  ];
}

export function isProficientSkill(pc, skillName) {
  return skills(pc).includes(skillName);
}

export function skillCheckBonus(pc, skillName) {
  const { pClass, level } = pc;
  const statName = SKILLS.find(skill => skill.name === skillName).stat;
  return (
    statSavingThrow(statName, stat(pc, statName), pClass, level) +
    (isProficientSkill(pc, skillName) ? proficiencyBonus(level) : 0)
  );
}

export const PRIMAL_PATHS = ['berserker', 'totem-warrior'];

export function translatePrimalPath(primalPath) {
  if (primalPath === 'berserker') return 'Berserker';
  if (primalPath === 'totem-warrior') return 'Guerrero Totémico';
}

export const DIVINE_DOMAINS = {
  death: {},
  knowledge: {
    pickSkills: 2,
    // bonus x2
    skillsToPick: ['arcana', 'history', 'nature', 'religion'],
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

export const ALIGNMENTS = {
  ethics: ['L', 'Ne', 'C'],
  morals: ['G', 'Nm', 'E'],
};
