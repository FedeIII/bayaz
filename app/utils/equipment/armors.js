import { getStatMod } from '../characters';

export const ARMORS = {
  padded() {
    return {
      name: 'padded',
      translation: 'Armadura acolchada',
      type: 'armor',
      subtype: 'light',
      price: [5, 0, 0],
      weight: 4,
      properties: {
        AC: ({ dex }) => 11 + getStatMod(dex),
        stealthDisadvantage: true,
      },
    };
  },
  leather() {
    return {
      name: 'leather',
      translation: 'Armadura de cuero',
      type: 'armor',
      subtype: 'light',
      price: [10, 0, 0],
      weight: 5,
      properties: {
        AC: ({ dex }) => 11 + getStatMod(dex),
      },
    };
  },
  studdedLeather() {
    return {
      name: 'studdedLeather',
      translation: 'Armadura de cuero tachonado',
      type: 'armor',
      subtype: 'light',
      price: [45, 0, 0],
      weight: 6.5,
      properties: {
        AC: ({ dex }) => 12 + getStatMod(dex),
      },
    };
  },
  hide() {
    return {
      name: 'hide',
      translation: 'Armadura de pieles',
      type: 'armor',
      subtype: 'medium',
      price: [10, 0, 0],
      weight: 6,
      properties: {
        AC: ({ dex }) => (12 + getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
      },
    };
  },
  chainShirt() {
    return {
      name: 'chainShirt',
      translation: 'Camisote de mallas',
      type: 'armor',
      subtype: 'medium',
      price: [50, 0, 0],
      weight: 10,
      properties: {
        AC: ({ dex }) => (13 + getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
      },
    };
  },
  scaleMail() {
    return {
      name: 'scaleMail',
      translation: 'Cota de escamas',
      type: 'armor',
      subtype: 'medium',
      price: [50, 0, 0],
      weight: 22,
      properties: {
        AC: ({ dex }) => (14 + getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
        stealthDisadvantage: true,
      },
    };
  },
  breastplate() {
    return {
      name: 'breastplate',
      translation: 'Coraza',
      type: 'armor',
      subtype: 'medium',
      price: [400, 0, 0],
      weight: 10,
      properties: {
        AC: ({ dex }) => (14 + getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
      },
    };
  },
  halfPlate() {
    return {
      name: 'halfPlate',
      translation: 'Semiplacas',
      type: 'armor',
      subtype: 'medium',
      price: [750, 0, 0],
      weight: 20,
      properties: {
        AC: ({ dex }) => (15 + getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
        stealthDisadvantage: true,
      },
    };
  },
  ringMail() {
    return {
      name: 'ringMail',
      translation: 'Cota de anillas',
      type: 'armor',
      subtype: 'heavy',
      price: [30, 0, 0],
      weight: 20,
      properties: {
        AC: () => 14,
        stealthDisadvantage: true,
      },
    };
  },
  chainMail() {
    return {
      name: 'chainMail',
      translation: 'Cota de mallas',
      type: 'armor',
      subtype: 'heavy',
      price: [75, 0, 0],
      weight: 25,
      properties: {
        AC: () => 16,
        stealthDisadvantage: true,
        strength: 13,
      },
    };
  },
  splint() {
    return {
      name: 'splint',
      translation: 'Armadura de bandas',
      type: 'armor',
      subtype: 'heavy',
      price: [200, 0, 0],
      weight: 30,
      properties: {
        AC: () => 17,
        stealthDisadvantage: true,
        strength: 15,
      },
    };
  },
  plate() {
    return {
      name: 'plate',
      translation: 'Armadura de placas',
      type: 'armor',
      subtype: 'heavy',
      price: [1500, 0, 0],
      weight: 32,
      properties: {
        AC: () => 18,
        stealthDisadvantage: true,
        strength: 15,
      },
    };
  },
  shield() {
    return {
      name: 'shield',
      translation: 'Escudo',
      type: 'armor',
      subtype: 'shield',
      price: [10, 0, 0],
      weight: 3,
      properties: {
        AC: () => 2,
      },
    };
  },
};

export function translateArmor(armor) {
  if (typeof armor === 'object') return armor.translation;
  return TOOLS[armor]().translation;
}

export function getAllLightArmors() {
  return Object.entries(ARMORS)
    .filter(([name, builder]) => builder().subtype === 'light')
    .map(([name, builder]) => builder());
}

export function getAllMediumArmors() {
  return Object.entries(ARMORS)
    .filter(([name, builder]) => builder().subtype === 'medium')
    .map(([name, builder]) => builder());
}

export function getAllHeavyArmors() {
  return Object.entries(ARMORS)
    .filter(([name, builder]) => builder().subtype === 'heavy')
    .map(([name, builder]) => builder());
}

export function getAllShileds() {
  return Object.entries(ARMORS)
    .filter(([name, builder]) => builder().subtype === 'shield')
    .map(([name, builder]) => builder());
}
