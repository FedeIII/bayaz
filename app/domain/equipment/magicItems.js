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

export function isSameScroll(item1, item2) {
  return (
    item1.spellName && item2.spellName && item1.spellName === item2.spellName
  );
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
  hobgoblinAmuletOfLuck(props) {
    return {
      name: 'hobgoblinAmuletOfLuck',
      type: 'locket',
      translation: 'Amuleto Hobgoblin de la Suerte',
      unidentifiedName: 'Amuleto Hobgoblin',
      rarity: 'rare',
      price: { gp: 2000 },
      weight: 0.02,
      description: () => `<p>Requiere sintonización</p>
    <p>Una vez al día, el portador puede repetir una tirada de salvación o prueba de habilidad antes de saber el resultado de la misma.</p>`,
      ...props,
    };
  },
};

const RINGS = {
  ramRing(props) {
    return {
      name: 'ramRing',
      type: 'ring',
      translation: 'Anillo del Carnero',
      unidentifiedName: 'Anillo con cuernos',
      rarity: 'rare',
      price: { gp: 1000 },
      weight: 0.05,
      maxCharges: 3,
      description: () => `<p>Require sintonización</p>
      <p>Este anillo tiene 3 cargas, y recupera 1d3 cargas empleadas cada día, al amanecer. Mientras lo lleves, puedes utilizar una acción y gastar de 1 a 3 cargas para atacar a una criatura que puedas ver y que se encuentre a 60 pies o menos de ti. El anillo produce una cabeza de carne ro espectral, que hace su tirada de ataque con un bonificador de +7. Si impacta, el objetivo recibe 2d10 de daño de fuerza por cada carga gastada y es empujado 5 pies en dirección contraria a ti.</p>
      <p>De forma alternativa, puedes utilizar una acción y gastar 1 de las 3 cargas del anillo para intentar romper un objeto que puedas ver, esté situado a 60 pies o menos de ti y no lleve o vista nadie. El anillo realiza una prueba de Fuerza con un bonificador de +5 por cada carga que gastes.</p>`,
      ...props,
    };
  },
};

const WANDS = {
  wandOfBinding(props) {
    return {
      name: 'wandOfBinding',
      type: 'wand',
      translation: 'Varita de atadura',
      unidentifiedName: 'Varita de cadena',
      rarity: 'rare',
      price: { gp: 2000 },
      weight: 0.5,
      maxCharges: 7,
      description: () => `<p>Requiere sintonización</p>
    <p>Esta varita tiene 7 cargas, utilizables para las propiedades siguientes. Recupera 1d6 + 1 cargas empleadas cada día, al amanecer. Si gastas la última carga, tira 1d20. Si obtienes un 1, la varita se convierte en cenizas y es destruida.</p>
    <p><b><u>Conjuros.</u></b> Mientras empuñes la varita, puedes usar una acción para gastar algunas de sus cargas en lanzar uno de los siguientes conjuros (con salvación CD 17): inmovilizar monstruo (5 cargas) o inmovilizar persona (2 cargas).</p>
    <p><b><u>Escape asistido.</u></b> Mientras empuñes la varita, puedes usar tu reacción para gastar 1 carga y disfrutar de ventaja en una tirada de salvación que realices para evitar quedar paralizado o apresado, o puedes emplear 1 carga para obtener ventaja en cualquier prueba hecha para escapar de un agarre.</p>`,
      ...props,
    };
  },
};

export const MAGIC_ITEMS = {
  ...POTIONS,
  ...SCROLLS,
  ...LOCKETS,
  ...RINGS,
  ...WANDS,
};
