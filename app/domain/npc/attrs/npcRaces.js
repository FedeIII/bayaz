export const NPC_RACES = {
  human: {
    name: 'human',
    translation: 'Humano',
    probabilityWeight: 200,
    names: ['Dragonborn', 'Human', 'Tiefling'],
  },
  dwarf: {
    name: 'dwarf',
    translation: 'Enano',
    probabilityWeight: 60,
    names: ['Dwarf'],
  },
  elf: {
    name: 'elf',
    translation: 'Elfo',
    probabilityWeight: 60,
    names: ['Elf'],
  },
  halfling: {
    name: 'halfling',
    translation: 'Mediano',
    probabilityWeight: 40,
    names: ['Halfling'],
  },
  'half-elf': {
    name: 'half-elf',
    translation: 'Semielfo',
    probabilityWeight: 20,
    names: ['Human', 'Elf'],
  },
  'half-orc': {
    name: 'half-orc',
    translation: 'Semiorco',
    probabilityWeight: 20,
    names: ['Half-Orc', 'Gith', 'Human.Niger-Congo'],
  },
  gnome: {
    name: 'gnome',
    translation: 'Gnomo',
    probabilityWeight: 16,
    names: ['Gnome'],
  },
  orc: {
    name: 'orc',
    translation: 'Orco',
    probabilityWeight: 10,
    names: ['Half-Orc', 'Gith', 'Human.Niger-Congo'],
  },
  goblin: {
    name: 'goblin',
    translation: 'Goblin',
    probabilityWeight: 10,
    names: ['Goblin', 'Gith', 'Human.Chinese', 'Human.Slavic'],
  },
  bugbear: {
    name: 'bugbear',
    translation: 'Osgo',
    probabilityWeight: 6,
    names: ['Half-Orc', 'Gith', 'Human.Niger-Congo', 'Human.Slavic'],
  },
  triton: {
    name: 'triton',
    translation: 'Tritón',
    probabilityWeight: 2,
    names: ['Tiefling', 'Gith', 'Human'],
  },
  satyr: {
    name: 'satyr',
    translation: 'Sátiro',
    probabilityWeight: 2,
    names: ['Satyr'],
  },
  lizardfolk: {
    name: 'lizardfolk',
    translation: 'Hombre lagarto',
    probabilityWeight: 2,
    names: ['Lizardfolk'],
  },
  kobold: {
    name: 'kobold',
    translation: 'Kóbold',
    probabilityWeight: 2,
    names: [
      'Tiefling',
      'Gith',
      'Half-Orc',
      'Human.Indian',
      'Human.Slavic',
      'Lizardfolk',
    ],
  },
  hobgoblin: {
    name: 'hobgoblin',
    translation: 'Hobgoblin',
    probabilityWeight: 2,
    names: [
      'Tiefling',
      'Gith',
      'Half-Orc',
      'Human.Niger-Congo',
      'Human.Slavic',
      'Human.Egyptian',
    ],
  },
  fairy: {
    name: 'fairy',
    translation: 'Hada',
    probabilityWeight: 2,
    names: ['Fairy'],
  },
  changeling: {
    name: 'changeling',
    translation: 'Cambiaformas',
    probabilityWeight: 1,
    names: ['Dragonborn', 'Human', 'Tiefling'],
  },
  minotaur: {
    name: 'minotaur',
    translation: 'Minotauro',
    probabilityWeight: 1,
    names: [
      'Minotaur',
      'Human.Egyptian',
      'Human.Greek',
    ],
  },
  centaur: {
    name: 'centaur',
    translation: 'Centauro',
    probabilityWeight: 1,
    names: [
      'Centaur',
      'Human.Egyptian',
      'Human.Greek',
    ],
  },
};

export const NPC_RACES_LIST = Object.keys(NPC_RACES);
