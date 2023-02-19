export const TOOLS = {
  // MUSICAL INSTRUMENTS
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

  // ARTISANS TOOLS
  alchemistsSupplies(props) {
    return {
      name: 'alchemistsSupplies',
      translation: 'Materiales alquímicos',
      type: 'tools',
      subtype: 'artisansTools',
      price: [50, 0, 0],
      weight: 4,
      ...props,
    };
  },
  brewersSupplies(props) {
    return {
      name: 'brewersSupplies',
      translation: 'Materiales de cervecería',
      type: 'tool',
      subtype: 'artisansTools',
      price: [20, 0, 0],
      weight: 4.5,
      ...props,
    };
  },
  calligraphersSupplies(props) {
    return {
      name: 'calligraphersSupplies',
      translation: 'Materiales de caligrafía',
      type: 'tool',
      subtype: 'artisansTools',
      price: [10, 0, 0],
      weight: 2.5,
      ...props,
    };
  },
  carpentersTools(props) {
    return {
      name: 'carpentersTools',
      translation: 'Herramientas de carpintero',
      type: 'tool',
      subtype: 'artisansTools',
      price: [8, 0, 0],
      weight: 3,
      ...props,
    };
  },
  cartographersTools(props) {
    return {
      name: 'cartographersTools',
      translation: 'Herramientas de cartógrafo',
      type: 'tool',
      subtype: 'artisansTools',
      price: [15, 0, 0],
      weight: 3,
      ...props,
    };
  },
  cobblersTools(props) {
    return {
      name: 'cobblersTools',
      translation: 'Herramientas de zapatero',
      type: 'tool',
      subtype: 'artisansTools',
      price: [5, 0, 0],
      weight: 2.5,
      ...props,
    };
  },
  cooksUtensils(props) {
    return {
      name: 'cooksUtensils',
      translation: 'Utensilios de cocina',
      type: 'tool',
      subtype: 'artisansTools',
      price: [1, 0, 0],
      weight: 4,
      ...props,
    };
  },
  glassblowersTools(props) {
    return {
      name: 'glassblowersTools',
      translation: 'Herramientas de soplador de vidrio',
      type: 'tool',
      subtype: 'artisansTools',
      price: [30, 0, 0],
      weight: 2.5,
      ...props,
    };
  },
  jewelersTools(props) {
    return {
      name: 'jewelersTools',
      translation: 'Herramientas de joyero',
      type: 'tool',
      subtype: 'artisansTools',
      price: [25, 0, 0],
      weight: 1,
      ...props,
    };
  },
  leatherworkersTools(props) {
    return {
      name: 'leatherworkersTools',
      translation: 'Herramientas de peletero',
      type: 'tool',
      subtype: 'artisansTools',
      price: [5, 0, 0],
      weight: 2.5,
      ...props,
    };
  },
  masonsTools(props) {
    return {
      name: 'masonsTools',
      translation: 'Herramientas de albañil',
      type: 'tool',
      subtype: 'artisansTools',
      price: [10, 0, 0],
      weight: 4,
      ...props,
    };
  },
  paintersSupplies(props) {
    return {
      name: 'paintersSupplies',
      translation: 'Materiales de pintor',
      type: 'tool',
      subtype: 'artisansTools',
      price: [10, 0, 0],
      weight: 2.5,
      ...props,
    };
  },
  pottersTools(props) {
    return {
      name: 'pottersTools',
      translation: 'Herramientas de alfarero',
      type: 'tool',
      subtype: 'artisansTools',
      price: [10, 0, 0],
      weight: 1.5,
      ...props,
    };
  },
  smithsTools(props) {
    return {
      name: 'smithsTools',
      translation: 'Herramientas de herrero',
      type: 'tool',
      subtype: 'artisansTools',
      price: [20, 0, 0],
      weight: 4,
      ...props,
    };
  },
  tinkersTools(props) {
    return {
      name: 'tinkersTools',
      translation: 'Herramientas de hojalatero',
      type: 'tool',
      subtype: 'artisansTools',
      price: [50, 0, 0],
      weight: 5,
      ...props,
    };
  },
  weaversTools(props) {
    return {
      name: 'weaversTools',
      translation: 'Herramientas de tejedor',
      type: 'tool',
      subtype: 'artisansTools',
      price: [1, 0, 0],
      weight: 2.5,
      ...props,
    };
  },
  woodcarversTools(props) {
    return {
      name: 'woodcarversTools',
      translation: 'Herramientas de tallista',
      type: 'tool',
      subtype: 'artisansTools',
      price: [1, 0, 0],
      weight: 2.5,
      ...props,
    };
  },

  //ARCANE FOCUS
  rod(props) {
    return {
      name: 'rod',
      translation: 'Cetro (Foco arcano)',
      type: 'tool',
      subtype: 'arcaneFocus',
      price: [10, 0, 0],
      weight: 1,
      ...props,
    };
  },
  crystal(props) {
    return {
      name: 'crystal',
      translation: 'Cristal (Foco arcano)',
      type: 'tool',
      subtype: 'arcaneFocus',
      price: [10, 0, 0],
      weight: 0.5,
      ...props,
    };
  },
  orb(props) {
    return {
      name: 'orb',
      translation: 'Orbe (Foco arcano)',
      type: 'tool',
      subtype: 'arcaneFocus',
      price: [20, 0, 0],
      weight: 1.5,
      ...props,
    };
  },
  staff(props) {
    return {
      name: 'staff',
      translation: 'Vara (Foco arcano)',
      type: 'tool',
      subtype: 'arcaneFocus',
      price: [5, 0, 0],
      weight: 2,
      ...props,
    };
  },
  wand(props) {
    return {
      name: 'wand',
      translation: 'Varita (Foco arcano)',
      type: 'tool',
      subtype: 'arcaneFocus',
      price: [10, 0, 0],
      weight: 0.5,
      ...props,
    };
  },

  //DRUIDIC FOCUS
  mistletoeSprig(props) {
    return {
      name: 'mistletoeSprig',
      translation: 'Ramita de muérdago (Foco druídico)',
      type: 'tool',
      subtype: 'druidicFocus',
      price: [1, 0, 0],
      weight: 0,
      ...props,
    };
  },
  totem(props) {
    return {
      name: 'totem',
      translation: 'Tótem (Foco druídico)',
      type: 'tool',
      subtype: 'druidicFocus',
      price: [1, 0, 0],
      weight: 0,
      ...props,
    };
  },
  woodenStaff(props) {
    return {
      name: 'woodenStaff',
      translation: 'Vara de madera (Foco druídico)',
      type: 'tool',
      subtype: 'druidicFocus',
      price: [5, 0, 0],
      weight: 2,
      ...props,
    };
  },
  yewWand(props) {
    return {
      name: 'yewWand',
      translation: 'Varita de tejo (Foco druídico)',
      type: 'tool',
      subtype: 'druidicFocus',
      price: [10, 0, 0],
      weight: 0.5,
      ...props,
    };
  },

  //AMMUNITION
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
  arrows(props) {
    return {
      name: 'arrows',
      translation: 'Flechas',
      type: 'tool',
      subtype: 'ammunition',
      price: [0, 0, 5],
      weight: 0.05,
      ...props,
    };
  },

  //OTHERS
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
  holySymbol(props) {
    return {
      name: 'holySymbol',
      translation: 'Símbolo sagrado',
      type: 'tool',
      subtype: 'adventure',
      price: [0, 0, 0],
      weight: 0.1,
      ...props,
    };
  },
  herbalismKit(props) {
    return {
      name: 'herbalismKit',
      translation: 'Kit de herbolistería',
      type: 'tool',
      subtype: 'adventure',
      price: [5, 0, 0],
      weight: 1.5,
      ...props,
    };
  },
  spellbook(props) {
    return {
      name: 'spellbook',
      translation: 'Libro de conjuros',
      type: 'tool',
      subtype: 'adventure',
      price: [50, 0, 0],
      weight: 1.5,
      ...props,
    };
  },
  thievesTools(props) {
    return {
      name: 'thievesTools',
      translation: 'Herramientas de ladrón',
      type: 'tool',
      subtype: 'adventure',
      price: [25, 0, 0],
      weight: 0.5,
      ...props,
    };
  },
  prayerbook(props) {
    return {
      name: 'prayerbook',
      translation: 'Libro de oraciones',
      type: 'tool',
      subtype: 'adventure',
      price: [1, 0, 0],
      weight: 0.5,
      ...props,
    };
  },
  commonClothes(props) {
    return {
      name: 'commonClothes',
      translation: 'Conjunto de ropa común',
      type: 'tool',
      subtype: 'adventure',
      price: [0, 5, 0],
      weight: 0.5,
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

export function getAllArtisansTools() {
  return Object.entries(TOOLS)
    .filter(([name, builder]) => builder().subtype === 'artisansTools')
    .map(([name, builder]) => builder());
}

export function getAllArcaneFocus() {
  return Object.entries(TOOLS)
    .filter(([name, builder]) => builder().subtype === 'arcaneFocus')
    .map(([name, builder]) => builder());
}

export function getAllDruidicFocus() {
  return Object.entries(TOOLS)
    .filter(([name, builder]) => builder().subtype === 'arcaneFocus')
    .map(([name, builder]) => builder());
}
