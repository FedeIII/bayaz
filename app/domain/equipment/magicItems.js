export const POTIONS = {
  healing(props) {
    return {
      name: 'healing',
      translation: 'Poción de Curación',
      unidentifiedName: 'Poción',
      rarity: 'common',
      price: { gp: 50 },
      weight: 0.25,
      description: () =>
        `Cuando bebes esta poción recuperas 2d4 + 2 puntos de golpe`,
      ...props,
    };
  },

  greaterHealing(props) {
    return {
      name: 'greaterHealing',
      translation: 'Poción de Curación mayor',
      unidentifiedName: 'Poción',
      rarity: 'uncommon',
      price: { gp: 200 },
      weight: 0.25,
      description: () =>
        `Cuando bebes esta poción recuperas 4d4 + 4 puntos de golpe`,
      ...props,
    };
  },

  superiorHealing(props) {
    return {
      name: 'superiorHealing',
      translation: 'Poción de Curación superior',
      unidentifiedName: 'Poción',
      rarity: 'rare',
      price: { gp: 2000 },
      weight: 0.25,
      description: () =>
        `Cuando bebes esta poción recuperas 8d4 + 8 puntos de golpe`,
      ...props,
    };
  },

  supremeHealing(props) {
    return {
      name: 'supremeHealing',
      translation: 'Poción de Curación suprema',
      unidentifiedName: 'Poción',
      rarity: 'veryRare',
      price: { gp: 20000 },
      weight: 0.25,
      description: () =>
        `Cuando bebes esta poción recuperas 10d4 + 20 puntos de golpe`,
      ...props,
    };
  },
};

export const MAGIC_ITEMS = {
  ...POTIONS,
};
