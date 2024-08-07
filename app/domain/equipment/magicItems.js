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
  spellScroll(props) {
    const translation = props?.spellName
      ? `Pergamino de ${t(props?.spellName)}`
      : `Pergamino de Conjuro`;
    return {
      name: 'spellScroll',
      type: 'scroll',
      subtype: props?.spellLevel || 0,
      translation,
      unidentifiedName: translation,
      rarity: 'common',
      price: { gp: getScrollGoldPieces(props?.spellLevel || 0) },
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

function getScrollGoldPieces(spellLevel) {
  return {
    0: 50,
    1: 70,
    2: 100,
    3: 260,
    4: 500,
    5: 2300,
    6: 5000,
    7: 18000,
    8: 50000,
    9: 100000,
  }[spellLevel];
}

const LOCKETS = {
  burningShadows(props) {
    return {
      name: 'burningShadows',
      type: 'locket',
      translation: 'Colgante de Sombras Abrasadoras',
      unidentifiedName: 'Colgante misterioso',
      rarity: 'rare',
      price: { gp: 2000 },
      weight: 0.02,
      description: () => `<p>Requiere sintonización</p>
    <p>Una vez al día, el portador puede lanzar el conjuro Represión Infernal a nivel 2 sin gastar espacio de conjuro</p>`,
      dmDescription: () =>
        `<p><u>Maldito:</u> Cada vez que el portador hace un ataque cuerpo a cuerpo, tiene que superar una tirada de salvación de Constitución DC10 o recibir 1d4 puntos de daño necrótico</p>`,
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
  ...LOCKETS,
};
