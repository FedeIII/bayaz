export const RACES = {
  dwarf: {
    hills: {
      age: [40, 350],
      height: [110, 130],
      weight: [55, 100],
      size: 'M',
      speed: 8,
    },
    mountains: {
      age: [40, 350],
      height: [120, 150],
      weight: [55, 100],
      size: 'M',
      speed: 8,
    },
  },
  elf: {
    high: {
      age: [80, 750],
      height: [150, 180],
      weight: [40, 75],
      size: 'M',
      speed: 10,
    },
    wood: {
      age: [80, 750],
      height: [150, 180],
      weight: [45, 80],
      size: 'M',
      speed: 11,
    },
    drow: {
      age: [80, 750],
      height: [140, 170],
      weight: [35, 70],
      size: 'M',
      speed: 10,
    },
  },
  halfling: {
    lightfoot: {
      age: [18, 250],
      height: [80, 100],
      weight: [16, 20],
      size: 'S',
      speed: 8,
    },
    stout: {
      age: [18, 250],
      height: [80, 100],
      weight: [16, 20],
      size: 'S',
      speed: 8,
    },
  },
  human: {
    subrace: {
      age: [16, 90],
      height: [150, 190],
      weight: [55, 120],
      size: 'M',
      speed: 10,
    },
  },
  ['half-elf']: {
    subrace: {
      age: [16, 90],
      height: [150, 180],
      weight: [55, 120],
      size: 'M',
      speed: 10,
    },
  },
  ['half-orc']: {
    subrace: {
      age: [13, 75],
      height: [150, 200],
      weight: [65, 170],
      size: 'M',
      speed: 10,
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

export const CLASSES = {
  barbarian: {
    hitPoints: '1d12',
  },
  bard: {
    hitPoints: '1d8',
  },
  cleric: {
    hitPoints: '1d8',
  },
  druid: {
    hitPoints: '1d8',
  },
  fighter: {
    hitPoints: '1d10',
  },
  monk: {
    hitPoints: '1d8',
  },
  palading: {
    hitPoints: '1d10',
  },
  ranger: {
    hitPoints: '1d10',
  },
  rogue: {
    hitPoints: '1d8',
  },
  sorcerer: {
    hitPoints: '1d6',
  },
  warlock: {
    hitPoints: '1d8',
  },
  wizard: {
    hitPoints: '1d6',
  },
};

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

export const ALIGNMENTS = {
  ethics: ['L', 'Ne', 'C'],
  morals: ['G', 'Nm', 'E'],
};
