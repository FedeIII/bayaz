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

const AMULETS = {
  burningShadows(props) {
    return {
      name: 'burningShadows',
      type: 'amulet',
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
      type: 'amulet',
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
  amuletOfTheDead(props) {
    return {
      name: 'amuletOfTheDead',
      type: 'amulet',
      translation: 'Amuleto de los Muertos',
      unidentifiedName: 'Amuleto de Calavera',
      rarity: 'rare',
      price: { gp: 500 },
      weight: 0.02,
      maxCharges: 1,
      description: () => `<p>Require sintonización</p>
      <p>Este amuleto posee una carga. Mientras lleves puesto este amuleto, puedes usar una acción y gastar su carga para lanzar el conjuro <i>hablar con los muertos</i></p>
      <p>El amuleto tiene un 20% de probabilidades de recuperar su carga cada mañana. Cada vez que se quede sin cargas, tira 1d20. Con un 1 el amuleto se destruye.</p>`,
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
  ringOfSpellStoring(props) {
    return {
      name: 'ringOfSpellStoring',
      type: 'ring',
      translation: 'Anillo de almacenamiento de conjuros',
      unidentifiedName: 'Anillo difuso',
      rarity: 'rare',
      price: { gp: 4500 },
      weight: 0.02,
      maxCharges: 5,
      description: () => `<p>Require sintonización</p>
      <p>Este anillo almacena conjuros lanzados sobre él, hasta que un portador sintonizado con este objeto decida usarlos. Puede guardar conjuros que sumen en total 5 niveles de conjuro. Cuando lo encuentras, tiene 1d6 - 1 niveles de conjuros elegidos por el DM.</p>
      <p>Cualquier criatura puede lanzar un conjuro de niveles 1 a 5 en el anillo tocándolo mientras lanza el conjuro. Este no tendrá efecto, pero quedará almacenado en el anillo. Si no puede almacenarse el conjuro, este se desperdicia sin efecto. El nivel del espacio utilizado para lanzar el conjuro determina cuanto espacio utiliza.</p>
      <p>Mientras lleves puesto el anillo, puedes lanzar cualquiera de los conjuros almacenados. El conjuro emplea el nivel del espacio, CD de la salvación ele conjuro, bonificador de ataque y aptitud mágica del lanzador original, pero por lo demás se comporta como si tú lo hubieras lanzado. Un conjuro lanzado desde el anillo deja de ocupar espacio en él.</p>`,
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

export const WONDROUS = {
  bagOfHolding(props) {
    return {
      name: 'bagOfHolding',
      type: 'wondrous',
      inventory: 'treasure',
      translation: 'Bolsa de Contención',
      unidentifiedName: 'Bolsa misteriosa',
      rarity: 'uncommon',
      price: { gp: 600 },
      weight: 7,
      bonus: {
        encumbrance: 227,
      },
      description: () =>
        `<p>Esta bolsa posee un espacio interior considerablemente mayor que sus dimensiones exteriores, que son de 60cm de diámetro en la abertura y 1.3m de profundidad. La bolsa puede contener hasta 227 kg, con un volumen máximo de 64 pies cúbicos. Siempre pesará 15 libras, independientemente del contenido. Sacar un objeto de la bolsa cuesta una acción</p>`,
      dmDescription:
        () => `<p>Si se sobrecarga, perfora o rasga la bolsa. esta se rompe por completo y queda destruida, quedando sus contenidos dispersos por el Plano Astral. Si se pone la bolsa del revés, los contenidos serán volcados al exterior, sin quedar dañados, pero la bolsa debe volver a pone rse en su posición inicial antes de poder ser usada de nuevo. Las criaturas dentro de la bolsa que necesiten respirar pueden sobrevivir un número de minutos igual a 10 dividido entre el número de criaturas albergadas (mínimo 1 minuto), tiempo tras el cual comenzarán a a hogarse.</p>
      <p>Poner una bolsa de contención dentro del espacio extradimensional creado por un morral práctico de Heward, un agujero portátil u objeto similar destruye instantáneamente ambos objetos y abre un portal al Plano Astral. Se creará en el sitio donde un objeto se metió de ntro del otro. Cualquier criatura que se encuentre a 10 pies del portal será absorbida a través de este a una localización aleatoria en el Plano Astral. Después, el portal se cierra. Solo funciona en un sentido y no puede ser reabierto.</p>`,
      ...props,
    };
  },
  hatOfDisguise(props) {
    return {
      name: 'hatOfDisguise',
      type: 'wondrous',
      inventory: 'equipment',
      translation: 'Sombrero de disfraz',
      unidentifiedName: 'Sombrero andrajoso',
      rarity: 'uncommon',
      price: { gp: 400 },
      weight: 0.25,
      description: () =>
        `<p>Requiere sintonización</p>
        <p>Mientras lleves este sombrero, puedes utilizar una acción para lanzar a voluntad el conjuro <u>disfrazarse</u> sobre ti mismo. El conjuro termina si dejas de vestir el sombrero.</p>`,
      ...props,
    };
  },
  cloakOfElvenkind(props) {
    return {
      name: 'cloakOfElvenkind',
      type: 'wondrous',
      inventory: 'equipment',
      translation: 'Capa élfica',
      unidentifiedName: 'Capa cambiante',
      rarity: 'uncommon',
      price: { gp: 500 },
      weight: 0.5,
      description: () =>
        `<p>Requiere sintonización</p>
        <p>Mientras lleves esta capa y tengas la capucha puesta, las pruebas de Sabiduría (Percepción) para verte sufrirán desventaja, mientras que tú tendrás ventaja en pruebas de Destreza (Sigilo) para esconderte, ya que el color de la capa varía para camuflarte. Es necesaria una acción para ponerte o quita rte la capucha.</p>`,
      ...props,
    };
  },
  pearlOfPower(props) {
    return {
      name: 'pearlOfPower',
      type: 'wondrous',
      inventory: 'equipment',
      translation: 'Perla de poder',
      unidentifiedName: 'Perla iridiscente',
      rarity: 'uncommon',
      price: { gp: 600 },
      weight: 0.02,
      maxCharges: 1,
      description: () =>
        `<p>Requiere sintonización con un lanzador de conjuros</p>
        <p>Mientras esta perla esté en tu poder, puedes usar una acción para pronunciar su palabra de activación y recuperar un espacio de conjuro empleado. Si el espacio era de nivel 4 o más, el que recuperas es de nivel 3. Esta propiedad no puede volver a utilizarse hasta el siguiente amanecer.</p>`,
      ...props,
    };
  },
  bootsOfElvenkind(props) {
    return {
      name: 'bootsOfElvenkind',
      type: 'wondrous',
      inventory: 'equipment',
      translation: 'Botas élficas',
      unidentifiedName: 'Botas adornadas con hojas',
      rarity: 'uncommon',
      price: { gp: 500 },
      weight: 0.5,
      maxCharges: 1,
      description: () =>
        `<p>Mientras calces estas botas, tus pasos no harán ruido, independientemente de la superficie que pises. También tendrás ventaja en pruebas de Destreza (Sigilo) que requieran moverse silenciosamente.</p>`,
      ...props,
    };
  },
};

export const MAGIC_ITEMS = {
  ...POTIONS,
  ...SCROLLS,
  ...AMULETS,
  ...RINGS,
  ...WANDS,
  ...WONDROUS,
};
