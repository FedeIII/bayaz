function backpack(props) {
  return {
    name: 'backpack',
    translation: 'Mochila',
    type: 'adventure',
    price: { gp: 2, sp: 0, cp: 0 },
    weight: 2.5,
    ...props,
  };
}

function bedroll(props) {
  return {
    name: 'bedroll',
    translation: 'Saco',
    type: 'adventure',
    price: { gp: 1, sp: 0, cp: 0 },
    weight: 3.5,
    ...props,
  };
}

function tinderbox(props) {
  return {
    name: 'tinderbox',
    translation: 'Yesquero',
    type: 'adventure',
    price: { gp: 0, sp: 5, cp: 0 },
    weight: 0.5,
    ...props,
  };
}

function torches(props) {
  return {
    name: 'torches',
    translation: 'Antorchas',
    type: 'adventure',
    amount: 10,
    weight: 0.5,
    ...props,
  };
}

function waterskin(props) {
  return {
    name: 'waterskin',
    translation: 'Odre',
    type: 'adventure',
    price: { gp: 0, sp: 2, cp: 0 },
    weight: 2.5,
    ...props,
  };
}

function hempenRope(props) {
  return {
    name: 'hempenRope',
    translation: 'Cuerda de cáñamo',
    type: 'adventure',
    amount: 15,
    price: { gp: 0, sp: 0, cp: 5 },
    weight: 0.3,
    ...props,
  };
}

function crowbar(props) {
  return {
    name: 'crowbar',
    translation: 'Palanca',
    type: 'adventure',
    price: { gp: 2, sp: 0, cp: 0 },
    weight: 2.5,
    ...props,
  };
}

function hammer(props) {
  return {
    name: 'hammer',
    translation: 'Martillo',
    type: 'adventure',
    price: { gp: 1, sp: 0, cp: 0 },
    weight: 1.5,
    ...props,
  };
}

function pitons(props) {
  return {
    name: 'pitons',
    translation: 'Pitones',
    type: 'adventure',
    amount: 10,
    price: { gp: 0, sp: 0, cp: 5 },
    weight: 0.2,
    ...props,
  };
}

export const EXPLORERS_PACK = {
  price: { gp: 10, sp: 0, cp: 0 },
  packName: 'explorers-pack',
  translation: 'Equipo de Explorador',
  items: {
    backpack,
    bedroll,
    messKit(props) {
      return {
        name: 'messKit',
        translation: 'Equipo de cocina',
        type: 'adventure',
        weight: 0.5,
        ...props,
      };
    },
    tinderbox,
    torches,
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 10,
        price: { gp: 0, sp: 5, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    waterskin,
    hempenRope,
  },
};

export const DIPLOMATS_PACK = {
  price: { gp: 39, sp: 0, cp: 0 },
  packName: 'diplomats-pack',
  translation: 'Equipo de Diplomático',
  items: {
    chest(props) {
      return {
        name: 'chest',
        translation: 'Cofre',
        type: 'adventure',
        price: { gp: 5, sp: 0, cp: 0 },
        weight: 12,
        ...props,
      };
    },
    cases(props) {
      return {
        name: 'cases',
        translation: 'Estuches de mapas y pergaminos',
        type: 'adventure',
        amount: 2,
        price: { gp: 1, sp: 0, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    fineClothes(props) {
      return {
        name: 'fineClothes',
        translation: 'Conjunto de ropa fina',
        type: 'adventure',
        subtype: 'clothes',
        price: { gp: 15, sp: 0, cp: 0 },
        weight: 3,
        ...props,
      };
    },
    inkBottle(props) {
      return {
        name: 'inkBottle',
        translation: 'Frasco de tinta',
        type: 'adventure',
        price: { gp: 10, sp: 0, cp: 0 },
        ...props,
      };
    },
    inkPen(props) {
      return {
        name: 'inkPen',
        translation: 'Pluma',
        type: 'adventure',
        price: { gp: 0, sp: 0, cp: 2 },
        ...props,
      };
    },
    lamp(props) {
      return {
        name: 'lamp',
        translation: 'Lámpara',
        type: 'adventure',
        price: { gp: 0, sp: 5, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    oilFlasks(props) {
      return {
        name: 'oilFlasks',
        translation: 'Frascos de aceite',
        type: 'adventure',
        amount: 2,
        price: { gp: 0, sp: 1, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    paperSheets(props) {
      return {
        name: 'paperSheets',
        translation: 'Hojas de papel',
        type: 'adventure',
        amount: 5,
        price: { gp: 0, sp: 2, cp: 0 },
        ...props,
      };
    },
    perfumeVial(props) {
      return {
        name: 'perfumeVial',
        translation: 'Frasco de perfume',
        type: 'adventure',
        price: { gp: 5, sp: 0, cp: 0 },
        ...props,
      };
    },
    sealingWax(props) {
      return {
        name: 'sealingWax',
        translation: 'Lacre',
        type: 'adventure',
        price: { gp: 0, sp: 5, cp: 0 },
        ...props,
      };
    },
    soap(props) {
      return {
        name: 'soap',
        translation: 'Jabón',
        type: 'adventure',
        price: { gp: 0, sp: 0, cp: 2 },
        ...props,
      };
    },
  },
};

export const ENTERTAINERS_PACK = {
  price: { gp: 40, sp: 0, cp: 0 },
  packName: 'entertainers-pack',
  translation: 'Equipo de Actor',
  items: {
    backpack,
    bedroll,
    costumes(props) {
      return {
        name: 'costumes',
        translation: 'Trajes',
        type: 'adventure',
        amount: 2,
        price: { gp: 5, sp: 0, cp: 0 },
        weight: 2,
        ...props,
      };
    },
    candles(props) {
      return {
        name: 'candles',
        translation: 'velas',
        type: 'adventure',
        amount: 5,
        price: { gp: 0, sp: 0, cp: 1 },
        ...props,
      };
    },
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 5,
        price: { gp: 0, sp: 5, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    waterskin,
    disguiseKit(props) {
      return {
        name: 'disguiseKit',
        translation: 'Kit de disfraz',
        type: 'adventure',
        subtype: 'clothes',
        price: { gp: 25, sp: 0, cp: 0 },
        weight: 1.5,
        ...props,
      };
    },
  },
};

export const SCHOLARS_PACK = {
  price: { gp: 40, sp: 0, cp: 0 },
  packName: 'scholars-pack',
  translation: 'Equipo de Erudito',
  items: {
    backpack,
    loreBook(props) {
      return {
        name: 'loreBook',
        translation: 'Libro de conocimiento',
        type: 'adventure',
        price: { gp: 25, sp: 0, cp: 0 },
        weight: 2.5,
        ...props,
      };
    },
    inkBottle(props) {
      return {
        name: 'inkBottle',
        translation: 'Frasco de tinta',
        type: 'adventure',
        price: { gp: 10, sp: 0, cp: 0 },
        ...props,
      };
    },
    inkPen(props) {
      return {
        name: 'inkPen',
        translation: 'Pluma',
        type: 'adventure',
        price: { gp: 0, sp: 0, cp: 2 },
        ...props,
      };
    },
    cases(props) {
      return {
        name: 'cases',
        translation: 'Estuches de mapas y pergaminos',
        type: 'adventure',
        amount: 10,
        price: { gp: 1, sp: 0, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    sandBag(props) {
      return {
        name: 'sandBag',
        translation: 'Bolsa de arena',
        type: 'adventure',
        ...props,
      };
    },
  },
};

export const DUNGEONEERS_PACK = {
  price: { gp: 12, sp: 0, cp: 0 },
  packName: 'dungeoneers-pack',
  translation: 'Equipo para Dungeons',
  items: {
    backpack,
    crowbar,
    hammer,
    pitons,
    torches,
    tinderbox,
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 10,
        price: { gp: 0, sp: 5, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    waterskin,
    hempenRope,
  },
};

export const PRIESTS_PACK = {
  price: { gp: 19, sp: 0, cp: 0 },
  packName: 'priests-pack',
  translation: 'Equipo de Sacerdote',
  items: {
    backpack,
    blanket(props) {
      return {
        name: 'blanket',
        translation: 'Manta',
        type: 'adventure',
        price: { gp: 0, sp: 5, cp: 0 },
        weight: 1.5,
        ...props,
      };
    },
    candles(props) {
      return {
        name: 'candles',
        translation: 'Velas',
        type: 'adventure',
        amount: 10,
        price: { gp: 0, sp: 0, cp: 1 },
        ...props,
      };
    },
    tinderbox,
    incenseBlocks(props) {
      return {
        name: 'incenseBlocks',
        translation: 'Barras de incienso',
        type: 'adventure',
        amount: 2,
        ...props,
      };
    },
    censer(props) {
      return {
        name: 'censer',
        translation: 'Incensario',
        type: 'adventure',
        ...props,
      };
    },
    vestments(props) {
      return {
        name: 'vestments',
        translation: 'Vestimentas',
        type: 'adventure',
        ...props,
      };
    },
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 2,
        price: { gp: 0, sp: 5, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    waterskin,
  },
};

export const BURGLARS_PACK = {
  price: { gp: 16, sp: 0, cp: 0 },
  packName: 'burglars-pack',
  translation: 'Equipo de Ladrón',
  items: {
    backpack,
    ballBearings(props) {
      return {
        name: 'ballBearings',
        translation: 'Bola de rodamientos',
        type: 'adventure',
        amount: 1000,
        price: { gp: 0, sp: 0, cp: 1 },
        ...props,
      };
    },
    string(props) {
      return {
        name: 'string',
        translation: 'hilo',
        type: 'adventure',
        amount: 3,
        ...props,
      };
    },
    bell(props) {
      return {
        name: 'bell',
        translation: 'Campana',
        type: 'adventure',
        price: { gp: 1, sp: 0, cp: 0 },
        ...props,
      };
    },
    candles(props) {
      return {
        name: 'candles',
        translation: 'Velas',
        type: 'adventure',
        amount: 10,
        price: { gp: 0, sp: 0, cp: 1 },
        ...props,
      };
    },
    crowbar,
    hammer,
    pitons,
    hoodedLantern(props) {
      return {
        name: 'hoodedLantern',
        translation: 'Linterna con capucha',
        type: 'adventure',
        price: { gp: 5, sp: 0, cp: 0 },
        weight: 1,
        ...props,
      };
    },
    oilFlasks(props) {
      return {
        name: 'oilFlasks',
        translation: 'Frascos de aceite',
        type: 'adventure',
        amount: 10,
        price: { gp: 0, sp: 1, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 5,
        price: { gp: 0, sp: 5, cp: 0 },
        weight: 0.5,
        ...props,
      };
    },
    tinderbox,
    waterskin,
    hempenRope,
  },
};

export function getExplorersPackItems() {
  return Object.values(EXPLORERS_PACK.items).map(item => item());
}

export function getDiplomatsPackItems() {
  return Object.values(DIPLOMATS_PACK.items).map(item => item());
}

export function getEntertainersPackItems() {
  return Object.values(ENTERTAINERS_PACK.items).map(item => item());
}

export function getScholarsPackItems() {
  return Object.values(SCHOLARS_PACK.items).map(item => item());
}

export function getDungeoneersPackItems() {
  return Object.values(DUNGEONEERS_PACK.items).map(item => item());
}

export function getPriestsPackItems() {
  return Object.values(PRIESTS_PACK.items).map(item => item());
}

export function getBurglarsPackItems() {
  return Object.values(BURGLARS_PACK.items).map(item => item());
}

export const PACKS = [
  EXPLORERS_PACK,
  DIPLOMATS_PACK,
  ENTERTAINERS_PACK,
  SCHOLARS_PACK,
  DUNGEONEERS_PACK,
  PRIESTS_PACK,
  BURGLARS_PACK,
];

export function getAllPackItems() {
  return PACKS.reduce((allItems, pack) => ({ ...allItems, ...pack.items }), {});
}

export function getPackItems(packName) {
  switch (packName) {
    case 'explorers-pack':
      return getExplorersPackItems();
    case 'diplomats-pack':
      return getDiplomatsPackItems();
    case 'entertainers-pack':
      return getEntertainersPackItems();
    case 'scholars-pack':
      return getScholarsPackItems();
    case 'dungeoneers-pack':
      return getDungeoneersPackItems();
    case 'priests-pack':
      return getPriestsPackItems();
    case 'burglars-pack':
      return getBurglarsPackItems();

    default:
      return [];
  }
}
