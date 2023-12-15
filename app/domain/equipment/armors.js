import { getStatMod } from '../characters';

export function ARMORS() {
  return {
    padded(props) {
      return {
        name: 'padded',
        translation: 'Armadura acolchada',
        type: 'armor',
        subtype: 'light',
        price: { gp: 5, sp: 0, cp: 0 },
        weight: 4,
        properties: {
          AC: ({ dex }) => 11 + getStatMod(dex),
          stealthDisadvantage: true,
        },
        ...props,
      };
    },
    leather(props) {
      return {
        name: 'leather',
        translation: 'Armadura de cuero',
        type: 'armor',
        subtype: 'light',
        price: { gp: 10, sp: 0, cp: 0 },
        weight: 5,
        properties: {
          AC: ({ dex }) => 11 + getStatMod(dex),
        },
        ...props,
      };
    },
    studdedLeather(props) {
      return {
        name: 'studdedLeather',
        translation: 'Armadura de cuero tachonado',
        type: 'armor',
        subtype: 'light',
        price: { gp: 45, sp: 0, cp: 0 },
        weight: 6.5,
        properties: {
          AC: ({ dex }) => 12 + getStatMod(dex),
        },
        ...props,
      };
    },
    hide(props) {
      return {
        name: 'hide',
        translation: 'Armadura de pieles',
        type: 'armor',
        subtype: 'medium',
        price: { gp: 10, sp: 0, cp: 0 },
        weight: 6,
        properties: {
          AC: ({ dex }) => 12 + (getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
        },
        ...props,
      };
    },
    chainShirt(props) {
      return {
        name: 'chainShirt',
        translation: 'Camisote de mallas',
        type: 'armor',
        subtype: 'medium',
        price: { gp: 50, sp: 0, cp: 0 },
        weight: 10,
        properties: {
          AC: ({ dex }) => 13 + (getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
        },
        ...props,
      };
    },
    scaleMail(props) {
      return {
        name: 'scaleMail',
        translation: 'Cota de escamas',
        type: 'armor',
        subtype: 'medium',
        price: { gp: 50, sp: 0, cp: 0 },
        weight: 22,
        properties: {
          AC: ({ dex }) => 14 + (getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
          stealthDisadvantage: true,
        },
        ...props,
      };
    },
    breastplate(props) {
      return {
        name: 'breastplate',
        translation: 'Coraza',
        type: 'armor',
        subtype: 'medium',
        price: { gp: 400, sp: 0, cp: 0 },
        weight: 10,
        properties: {
          AC: ({ dex }) => 14 + (getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
        },
        ...props,
      };
    },
    halfPlate(props) {
      return {
        name: 'halfPlate',
        translation: 'Semiplacas',
        type: 'armor',
        subtype: 'medium',
        price: { gp: 750, sp: 0, cp: 0 },
        weight: 20,
        properties: {
          AC: ({ dex }) => 15 + (getStatMod(dex) > 2 ? 2 : getStatMod(dex)),
          stealthDisadvantage: true,
        },
        ...props,
      };
    },
    ringMail(props) {
      return {
        name: 'ringMail',
        translation: 'Cota de anillas',
        type: 'armor',
        subtype: 'heavy',
        price: { gp: 30, sp: 0, cp: 0 },
        weight: 20,
        properties: {
          AC: () => 14,
          stealthDisadvantage: true,
        },
        ...props,
      };
    },
    chainMail(props) {
      return {
        name: 'chainMail',
        translation: 'Cota de mallas',
        type: 'armor',
        subtype: 'heavy',
        price: { gp: 75, sp: 0, cp: 0 },
        weight: 25,
        properties: {
          AC: () => 16,
          stealthDisadvantage: true,
          strength: 13,
        },
        ...props,
      };
    },
    splint(props) {
      return {
        name: 'splint',
        translation: 'Armadura de bandas',
        type: 'armor',
        subtype: 'heavy',
        price: { gp: 200, sp: 0, cp: 0 },
        weight: 30,
        properties: {
          AC: () => 17,
          stealthDisadvantage: true,
          strength: 15,
        },
        ...props,
      };
    },
    plate(props) {
      return {
        name: 'plate',
        translation: 'Armadura de placas',
        type: 'armor',
        subtype: 'heavy',
        price: { gp: 1500, sp: 0, cp: 0 },
        weight: 32,
        properties: {
          AC: () => 18,
          stealthDisadvantage: true,
          strength: 15,
        },
        ...props,
      };
    },
    shield(props) {
      return {
        name: 'shield',
        translation: 'Escudo',
        type: 'armor',
        subtype: 'shield',
        price: { gp: 10, sp: 0, cp: 0 },
        weight: 3,
        properties: {
          AC: () => 2,
        },
        ...props,
      };
    },
  };
}

export const ALL_ARMORS = Object.keys(ARMORS());

export function translateArmor(armor) {
  if (typeof armor === 'object') return armor.translation;
  return ARMORS()[armor]().translation;
}

export function getAllLightArmors() {
  return Object.entries(ARMORS())
    .filter(([name, builder]) => builder().subtype === 'light')
    .map(([name, builder]) => builder());
}

export function getAllMediumArmors() {
  return Object.entries(ARMORS())
    .filter(([name, builder]) => builder().subtype === 'medium')
    .map(([name, builder]) => builder());
}

export function getAllHeavyArmors() {
  return Object.entries(ARMORS())
    .filter(([name, builder]) => builder().subtype === 'heavy')
    .map(([name, builder]) => builder());
}

export function getAllShileds() {
  return Object.entries(ARMORS)
    .filter(([name, builder]) => builder().subtype === 'shield')
    .map(([name, builder]) => builder());
}
