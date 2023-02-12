export const TOOLS = {
  shawn(props) {
    return {
      name: 'shawn',
      translation: 'Caramillo',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [2, 0, 0],
      weight: 0.5,
      ...props,
    };
  },
  horn(props) {
    return {
      name: 'horn',
      translation: 'Cuerno',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [3, 0, 0],
      weight: 1,
      ...props,
    };
  },
  dulcimer(props) {
    return {
      name: 'dulcimer',
      translation: 'Dulcimer',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [25, 0, 0],
      weight: 5,
      ...props,
    };
  },
  flute(props) {
    return {
      name: 'flute',
      translation: 'Flauta',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [2, 0, 0],
      weight: 0.5,
      ...props,
    };
  },
  panFlute(props) {
    return {
      name: 'panFlute',
      translation: 'Flauta de pan',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [12, 0, 0],
      weight: 1,
      ...props,
    };
  },
  bagpipes(props) {
    return {
      name: 'bagpipes',
      translation: 'Gaita',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [30, 0, 0],
      weight: 3,
      ...props,
    };
  },
  lute(props) {
    return {
      name: 'lute',
      translation: 'Laúd',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [35, 0, 0],
      weight: 1,
      ...props,
    };
  },
  lyre(props) {
    return {
      name: 'lyre',
      translation: 'Lira',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [30, 0, 0],
      weight: 1,
      ...props,
    };
  },
  drum(props) {
    return {
      name: 'drum',
      translation: 'Tambor',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [6, 0, 0],
      weight: 1.5,
      ...props,
    };
  },
  viol(props) {
    return {
      name: 'viol',
      translation: 'Viola',
      type: 'tool',
      subtype: 'musicalInstruments',
      price: [30, 0, 0],
      weight: 0.5,
      ...props,
    };
  },
  crossbowBolts(props) {
    return {
      name: 'crossbowBolts',
      translation: 'Virotes',
      type: 'tool',
      subtype: 'ammunition',
      price: [0, 0, 5],
      weight: 0.03,
      ...props,
    };
  },
  componentPouch(props) {
    return {
      name: 'componentPouch',
      translation: 'Bolsa de componentes',
      type: 'tool',
      subtype: 'adventure',
      price: [25, 0, 0],
      weight: 1,
      ...props,
    };
  },
  arcaneFocus(props) {
    return {
      name: 'arcaneFocus',
      translation: 'Foco arcano',
      type: 'tool',
      subtype: 'adventure',
      price: [11, 0, 0],
      weight: 1,
      ...props,
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
