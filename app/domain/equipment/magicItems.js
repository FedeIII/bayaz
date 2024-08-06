import { getChildrenText } from '~/utils/getChildrenText';
import { getSpell } from '../spells/getSpells';
import { t } from '../translations';

const POTIONS = {
  healing(props) {
    return {
      name: 'healing',
      type: 'potion',
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
      type: 'potion',
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
      type: 'potion',
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
      type: 'potion',
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

const SCROLLS = {
  spell0(props) {
    return {
      name: 'spell0',
      type: 'scroll',
      subtype: 0,
      translation: props?.spellName
        ? `Pergamino de ${t(props?.spellName)}`
        : `Pergamino de Truco`,
      unidentifiedName: props?.spellName
        ? `Pergamino de ${t(props?.spellName)}`
        : `Pergamino de Truco`,
      rarity: 'common',
      price: { gp: 50 },
      weight: 0.05,
      description: () => {
        const spell = getSpell(props?.spellName);
        return props?.identified && spell
          ? getChildrenText('', spell.desc)
          : null;
      },
      ...props,
    };
  },
};

export function isSameScroll(item1, item2) {
  return (
    item1.spellName && item2.spellName && item1.spellName === item2.spellName
  );
}

export const MAGIC_ITEMS = {
  ...POTIONS,
  ...SCROLLS,
};
