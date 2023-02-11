export const EXPLORER_PACK = {
  price: [10, 0, 0],
  packName: 'explorer-pack',
  translation: 'Equipo de explorador',
  items: {
    backpack() {
      return {
        name: 'backpack',
        translation: 'Mochila',
        type: 'adventure',
      };
    },
    bedroll() {
      return {
        name: 'bedroll',
        translation: 'Saco',
        type: 'adventure',
      };
    },
    messKit() {
      return {
        name: 'messKit',
        translation: 'Equipo de cocina',
        type: 'adventure',
      };
    },
    tinderbox() {
      return {
        name: 'tinderbox',
        translation: 'Yesquero',
        type: 'adventure',
      };
    },
    torches() {
      return {
        name: 'torches',
        translation: 'Antorchas',
        type: 'adventure',
        amount: 10,
      };
    },
    rations() {
      return {
        name: 'rations',
        translation: 'Raciones',
        type: 'adventure',
        amount: 10,
      };
    },
    waterskin() {
      return {
        name: 'waterskin',
        translation: 'Odre',
        type: 'adventure',
      };
    },
    hempenRope() {
      return {
        name: 'hempenRope',
        translation: 'Cuerda de cáñamo',
        type: 'adventure',
        amount: 50,
      };
    },
  },
};

export function getExplorerPackItems() {
  return Object.values(EXPLORER_PACK.items).map(item => item());
}
