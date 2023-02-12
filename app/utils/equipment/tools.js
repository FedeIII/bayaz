export const TOOLS = {
  shawn() {
    return {
      name: 'shawn',
      translation: 'Caramillo',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [2, 0, 0],
      weight: 0.5,
    };
  },
  horn() {
    return {
      name: 'horn',
      translation: 'Cuerno',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [3, 0, 0],
      weight: 1,
    };
  },
  dulcimer() {
    return {
      name: 'dulcimer',
      translation: 'Dulcimer',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [25, 0, 0],
      weight: 5,
    };
  },
  flute() {
    return {
      name: 'flute',
      translation: 'Flauta',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [2, 0, 0],
      weight: 0.5,
    };
  },
  panFlute() {
    return {
      name: 'panFlute',
      translation: 'Flauta de pan',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [12, 0, 0],
      weight: 1,
    };
  },
  bagpipes() {
    return {
      name: 'bagpipes',
      translation: 'Gaita',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [30, 0, 0],
      weight: 3,
    };
  },
  lute() {
    return {
      name: 'lute',
      translation: 'Laúd',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [35, 0, 0],
      weight: 1,
    };
  },
  lyre() {
    return {
      name: 'lyre',
      translation: 'Lira',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [30, 0, 0],
      weight: 1,
    };
  },
  drum() {
    return {
      name: 'drum',
      translation: 'Tambor',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [6, 0, 0],
      weight: 1.5,
    };
  },
  viol() {
    return {
      name: 'viol',
      translation: 'Viola',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [30, 0, 0],
      weight: 0.5,
    };
  },
  crossbowBolts() {
    return {
      name: 'crossbowBolts',
      translation: 'Virotes',
      type: 'tool',
      subtype: 'ammunition',
      price: [0, 0, 5],
      weight: 0.03,
    };
  },
  componentPouch() {
    return {
      name: 'componentPouch',
      translation: 'Bolsa de componentes',
      type: 'tool',
      subtype: 'adventure',
      price: [25, 0, 0],
      weight: 1,
    };
  },
  arcaneFocus() {
    return {
      name: 'arcaneFocus',
      translation: 'Foco arcano',
      type: 'tool',
      subtype: 'adventure',
      price: [11, 0, 0],
      weight: 1,
    };
  },
};

export function translateTool(tool) {
  if (typeof tool === 'object') return tool.translation;
  return TOOLS[tool]().translation;
}

export function getAllMusicalInstruments() {
  return Object.entries(TOOLS)
    .filter(([name, builder]) => builder().subtype === 'musicalInstruments')
    .map(([name, builder]) => builder());
}
