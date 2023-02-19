export const EXPLORERS_PACK = {
  price: [10, 0, 0],
  packName: 'explorers-pack',
  translation: 'Equipo de Explorador',
  items: {
    backpack(props) {
      return {
        name: 'backpack',
        translation: 'Mochila',
        type: 'adventure',
        ...props,
      };
    },
    bedroll(props) {
      return {
        name: 'bedroll',
        translation: 'Saco',
        type: 'adventure',
        ...props,
      };
    },
    messKit(props) {
      return {
        name: 'messKit',
        translation: 'Equipo de cocina',
        type: 'adventure',
        ...props,
      };
    },
    tinderbox(props) {
      return {
        name: 'tinderbox',
        translation: 'Yesquero',
        type: 'adventure',
        ...props,
      };
    },
    torches(props) {
      return {
        name: 'torches',
        translation: 'Antorchas',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    waterskin(props) {
      return {
        name: 'waterskin',
        translation: 'Odre',
        type: 'adventure',
        ...props,
      };
    },
    hempenRope(props) {
      return {
        name: 'hempenRope',
        translation: 'Cuerda de cáñamo',
        type: 'adventure',
        amount: 50,
        ...props,
      };
    },
  },
};

export const DIPLOMATS_PACK = {
  price: [39, 0, 0],
  packName: 'diplomats-pack',
  translation: 'Equipo de Diplomático',
  items: {
    chest(props) {
      return {
        name: 'chest',
        translation: 'Cofre',
        type: 'adventure',
        ...props,
      };
    },
    cases(props) {
      return {
        name: 'cases',
        translation: 'Estuches de mapas y pergaminos',
        type: 'adventure',
        amount: 2,
        ...props,
      };
    },
    fineClothes(props) {
      return {
        name: 'fineClothes',
        translation: 'Conjunto de ropa fina',
        type: 'adventure',
        ...props,
      };
    },
    inkBottle(props) {
      return {
        name: 'inkBottle',
        translation: 'Frasco de tinta',
        type: 'adventure',
        ...props,
      };
    },
    inkPen(props) {
      return {
        name: 'inkPen',
        translation: 'Pluma',
        type: 'adventure',
        ...props,
      };
    },
    lamp(props) {
      return {
        name: 'lamp',
        translation: 'Lámpara',
        type: 'adventure',
        ...props,
      };
    },
    oilFlasks(props) {
      return {
        name: 'oilFlasks',
        translation: 'Frascos de aceite',
        type: 'adventure',
        amount: 2,
        ...props,
      };
    },
    paperSheets(props) {
      return {
        name: 'paperSheets',
        translation: 'Hojas de papel',
        type: 'adventure',
        amount: 5,
        ...props,
      };
    },
    perfumeVial(props) {
      return {
        name: 'perfumeVial',
        translation: 'Frasco de perfume',
        type: 'adventure',
        ...props,
      };
    },
    sealingWax(props) {
      return {
        name: 'sealingWax',
        translation: 'Lacre',
        type: 'adventure',
        ...props,
      };
    },
    soap(props) {
      return {
        name: 'soap',
        translation: 'Jabón',
        type: 'adventure',
        ...props,
      };
    },
  },
};

export const ENTERTAINERS_PACK = {
  price: [40, 0, 0],
  packName: 'entertainers-pack',
  translation: 'Equipo de Actor',
  items: {
    backpack(props) {
      return {
        name: 'backpack',
        translation: 'Mochila',
        type: 'adventure',
        ...props,
      };
    },
    bedroll(props) {
      return {
        name: 'bedroll',
        translation: 'Saco',
        type: 'adventure',
        ...props,
      };
    },
    costumes(props) {
      return {
        name: 'costumes',
        translation: 'Trajes',
        type: 'adventure',
        amount: 2,
        ...props,
      };
    },
    candles(props) {
      return {
        name: 'candles',
        translation: 'velas',
        type: 'adventure',
        amount: 5,
        ...props,
      };
    },
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 5,
        ...props,
      };
    },
    waterskin(props) {
      return {
        name: 'waterskin',
        translation: 'Odre',
        type: 'adventure',
        ...props,
      };
    },
    disguiseKit(props) {
      return {
        name: 'disguiseKit',
        translation: 'Kit de disfraz',
        type: 'adventure',
        ...props,
      };
    },
  },
};

export const SCHOLARS_PACK = {
  price: [40, 0, 0],
  packName: 'scholars-pack',
  translation: 'Equipo de Erudito',
  items: {
    backpack(props) {
      return {
        name: 'backpack',
        translation: 'Mochila',
        type: 'adventure',
        ...props,
      };
    },
    loreBook(props) {
      return {
        name: 'loreBook',
        translation: 'Libro de conocimiento',
        type: 'adventure',
        ...props,
      };
    },
    inkBottle(props) {
      return {
        name: 'inkBottle',
        translation: 'Frasco de tinta',
        type: 'adventure',
        ...props,
      };
    },
    inkPen(props) {
      return {
        name: 'inkPen',
        translation: 'Pluma',
        type: 'adventure',
        ...props,
      };
    },
    cases(props) {
      return {
        name: 'cases',
        translation: 'Estuches de mapas y pergaminos',
        type: 'adventure',
        amount: 10,
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
  price: [12, 0, 0],
  packName: 'dungeoneers-pack',
  translation: 'Equipo para Dungeons',
  items: {
    backpack(props) {
      return {
        name: 'backpack',
        translation: 'Mochila',
        type: 'adventure',
        ...props,
      };
    },
    crowbar(props) {
      return {
        name: 'crowbar',
        translation: 'Palanca',
        type: 'adventure',
        ...props,
      };
    },
    hammer(props) {
      return {
        name: 'hammer',
        translation: 'Martillo',
        type: 'adventure',
        ...props,
      };
    },
    pitons(props) {
      return {
        name: 'pitons',
        translation: 'Pitones',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    torches(props) {
      return {
        name: 'torches',
        translation: 'Antorchas',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    tinderbox(props) {
      return {
        name: 'tinderbox',
        translation: 'Yesquero',
        type: 'adventure',
        ...props,
      };
    },
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    waterskin(props) {
      return {
        name: 'waterskin',
        translation: 'Odre',
        type: 'adventure',
        ...props,
      };
    },
    hempenRope(props) {
      return {
        name: 'hempenRope',
        translation: 'Cuerda de cáñamo',
        type: 'adventure',
        amount: 50,
        ...props,
      };
    },
  },
};

export const PRIESTS_PACK = {
  price: [19, 0, 0],
  packName: 'priests-pack',
  translation: 'Equipo de Sacerdote',
  items: {
    backpack(props) {
      return {
        name: 'backpack',
        translation: 'Mochila',
        type: 'adventure',
        ...props,
      };
    },
    blanket(props) {
      return {
        name: 'blanket',
        translation: 'Manta',
        type: 'adventure',
        ...props,
      };
    },
    candles(props) {
      return {
        name: 'candles',
        translation: 'Velas',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    tinderbox(props) {
      return {
        name: 'tinderbox',
        translation: 'Yesquero',
        type: 'adventure',
        ...props,
      };
    },
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
        ...props,
      };
    },
    waterskin(props) {
      return {
        name: 'waterskin',
        translation: 'Odre',
        type: 'adventure',
        ...props,
      };
    },
  },
};

export const BURGLARS_PACK = {
  price: [16, 0, 0],
  packName: 'burglars-pack',
  translation: 'Equipo de Ladrón',
  items: {
    backpack(props) {
      return {
        name: 'backpack',
        translation: 'Mochila',
        type: 'adventure',
        ...props,
      };
    },
    ballBearings(props) {
      return {
        name: 'ballBearings',
        translation: 'Bola de rodamientos',
        type: 'adventure',
        amount: 1000,
        ...props,
      };
    },
    hilo(props) {
      return {
        name: 'hilo',
        translation: 'Cuerda',
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
        ...props,
      };
    },
    candles(props) {
      return {
        name: 'candles',
        translation: 'Velas',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    crowbar(props) {
      return {
        name: 'crowbar',
        translation: 'Palanca',
        type: 'adventure',
        ...props,
      };
    },
    hammer(props) {
      return {
        name: 'hammer',
        translation: 'Martillo',
        type: 'adventure',
        ...props,
      };
    },
    pitons(props) {
      return {
        name: 'pitons',
        translation: 'Pitones',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    hoodedLantern(props) {
      return {
        name: 'hoodedLantern',
        translation: 'Linterna con capucha',
        type: 'adventure',
        ...props,
      };
    },
    oilFlasks(props) {
      return {
        name: 'oilFlasks',
        translation: 'Frascos de aceite',
        type: 'adventure',
        amount: 10,
        ...props,
      };
    },
    rations(props) {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 5,
        ...props,
      };
    },
    tinderbox(props) {
      return {
        name: 'tinderbox',
        translation: 'Yesquero',
        type: 'adventure',
        ...props,
      };
    },
    waterskin(props) {
      return {
        name: 'waterskin',
        translation: 'Odre',
        type: 'adventure',
        amount: 5,
        ...props,
      };
    },
    hempenRope(props) {
      return {
        name: 'hempenRope',
        translation: 'Cuerda de cáñamo',
        type: 'adventure',
        amount: 15,
        ...props,
      };
    },
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
      return 'unknown pack name';
  }
}
