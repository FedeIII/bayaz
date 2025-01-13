import { getTotalAttackBonus } from '../characters';
import { getItem } from './equipment';

export function WEAPONS() {
  return {
    club(props) {
      return {
        name: 'club',
        translation: 'Clava',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: { gp: 0, sp: 1, cp: 0 },
        damage: ['1d4', 'bludgeoning'],
        weight: 1,
        properties: { light: true },
        ...props,
      };
    },
    dagger(props) {
      return {
        name: 'dagger',
        translation: 'Daga',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: { gp: 2, sp: 0, cp: 0 },
        damage: ['1d4', 'piercing'],
        weight: 0.5,
        properties: { finesse: true, light: true, thrown: [5, 20] },
        ...props,
      };
    },
    greatclub(props) {
      return {
        name: 'greatclub',
        translation: 'Gran clava',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: { gp: 0, sp: 2, cp: 0 },
        damage: ['1d8', 'bludgeoning'],
        weight: 5,
        properties: { twoHanded: true },
        ...props,
      };
    },
    handaxe(props) {
      return {
        name: 'handaxe',
        translation: 'Hacha de mano',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: { gp: 5, sp: 0, cp: 0 },
        damage: ['1d6', 'slashing'],
        weight: 1,
        properties: { light: true, thrown: [5, 20] },
        ...props,
      };
    },
    javelin(props) {
      return {
        name: 'javelin',
        translation: 'Jabalina',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: { gp: 0, sp: 5, cp: 0 },
        damage: ['1d6', 'piercing'],
        weight: 1,
        properties: { thrown: [10, 40] },
        ...props,
      };
    },
    lightHammer(props) {
      return {
        name: 'lightHammer',
        translation: 'Martillo ligero',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: { gp: 2, sp: 0, cp: 0 },
        damage: ['1d4', 'bludgeoning'],
        weight: 1,
        properties: { light: true, thrown: [5, 20] },
        ...props,
      };
    },
    mace(props) {
      return {
        name: 'mace',
        translation: 'Maza',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: { gp: 5, sp: 0, cp: 0 },
        damage: ['1d6', 'bludgeoning'],
        weight: 2,
        properties: {},
        ...props,
      };
    },
    quarterstaff(props) {
      return {
        name: 'quarterstaff',
        translation: 'Bastón',
        type: 'weapon',
        subtype: 'simpleMelee',
        subsubtype: 'polearm',
        price: { gp: 0, sp: 2, cp: 0 },
        damage: ['1d6', 'bludgeoning'],
        weight: 2,
        properties: { versatile: '1d8' },
        ...props,
      };
    },
    sickle(props) {
      return {
        name: 'sickle',
        translation: 'Hoz',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: { gp: 1, sp: 0, cp: 0 },
        damage: ['1d4', 'slashing'],
        weight: 1,
        properties: { light: true },
        ...props,
      };
    },
    spear(props) {
      return {
        name: 'spear',
        translation: 'Lanza',
        type: 'weapon',
        subtype: 'simpleMelee',
        subsubtype: 'polearm',
        price: { gp: 1, sp: 0, cp: 0 },
        damage: ['1d6', 'piercing'],
        weight: 1.5,
        properties: { thrown: [6, 20], versatile: '1d8' },
        ...props,
      };
    },
    unnarmed(props) {
      return {
        name: 'unnarmed',
        translation: 'Golpe desarmado',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: 0,
        damage: ['1d1', 'bludgeoning'],
        weight: 0,
        properties: {},
        ...props,
      };
    },
    martialArts(props) {
      return {
        name: 'martialArts',
        translation: 'Golpe desarmado (Artes Marciales)',
        type: 'weapon',
        subtype: 'simpleMelee',
        price: 0,
        damage: ['-', 'bludgeoning'],
        weight: 0,
        properties: {},
        ...props,
      };
    },
    lightCrossbow(props) {
      return {
        name: 'lightCrossbow',
        translation: 'Ballesta ligera',
        type: 'weapon',
        subtype: 'simpleRanged',
        subsubtype: 'crossbow',
        ammoType: 'bolts',
        price: { gp: 25, sp: 0, cp: 0 },
        damage: ['1d8', 'piercing'],
        weight: 2.5,
        properties: { ammunition: [80, 320], loading: true, twoHanded: true },
        ...props,
      };
    },
    dart(props) {
      return {
        name: 'dart',
        translation: 'Dardo',
        type: 'weapon',
        subtype: 'simpleRanged',
        ammoType: 'darts',
        price: { gp: 0, sp: 0, cp: 5 },
        damage: ['1d4', 'piercing'],
        weight: 0.1,
        properties: { finesse: true, thrown: [5, 20] },
        ...props,
      };
    },
    shortbow(props) {
      return {
        name: 'shortbow',
        translation: 'Arco corto',
        type: 'weapon',
        subtype: 'simpleRanged',
        ammoType: 'arrows',
        price: { gp: 25, sp: 0, cp: 0 },
        damage: ['1d6', 'piercing'],
        weight: 1,
        properties: { ammunition: [80, 320], twoHanded: true },
        ...props,
      };
    },
    sling(props) {
      return {
        name: 'sling',
        translation: 'Honda',
        type: 'weapon',
        subtype: 'simpleRanged',
        ammoType: 'pebbles',
        price: { gp: 0, sp: 1, cp: 0 },
        damage: ['1d4', 'bludgeoning'],
        weight: 0,
        properties: { ammunition: [30, 120] },
        ...props,
      };
    },
    battleaxe(props) {
      return {
        name: 'battleaxe',
        translation: 'Hacha de batalla',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 10, sp: 0, cp: 0 },
        damage: ['1d8', 'slashing'],
        weight: 2,
        properties: { versatile: '1d10' },
        ...props,
      };
    },
    flail(props) {
      return {
        name: 'flail',
        translation: 'Mayal',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 10, sp: 0, cp: 0 },
        damage: ['1d8', 'bludgeoning'],
        weight: 1,
        properties: {},
        ...props,
      };
    },
    glaive(props) {
      return {
        name: 'glaive',
        translation: 'Guja',
        type: 'weapon',
        subtype: 'martialMelee',
        subsubtype: 'polearm',
        price: { gp: 20, sp: 0, cp: 0 },
        damage: ['1d10', 'slashing'],
        weight: 3,
        properties: { heavy: true, reach: true, twoHanded: true },
        ...props,
      };
    },
    greataxe(props) {
      return {
        name: 'greataxe',
        translation: 'Gran hacha',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 30, sp: 0, cp: 0 },
        damage: ['1d12', 'slashing'],
        weight: 3.5,
        properties: { heavy: true, twoHanded: true },
        ...props,
      };
    },
    greatsword(props) {
      return {
        name: 'greatsword',
        translation: 'Espadón',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 50, sp: 0, cp: 0 },
        damage: ['2d6', 'slashing'],
        weight: 3,
        properties: { heavy: true, twoHanded: true },
        ...props,
      };
    },
    greatsword1(props) {
      return WEAPONS().greatsword({
        name: 'greatsword1',
        translation: 'Espadón (+1)',
        rarity: 'uncommon',
        price: { gp: 250 },
        identified: true,
        bonus: {
          damage: 1,
        },
        ...props,
      });
    },
    halberd(props) {
      return {
        name: 'halberd',
        translation: 'Alabarda',
        type: 'weapon',
        subtype: 'martialMelee',
        subsubtype: 'polearm',
        price: { gp: 20, sp: 0, cp: 0 },
        damage: ['1d10', 'slashing'],
        weight: 3,
        properties: { heavy: true, reach: true, twoHanded: true },
        ...props,
      };
    },
    lance(props) {
      return {
        name: 'lance',
        translation: 'Lanza de caballería',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 10, sp: 0, cp: 0 },
        damage: ['1d12', 'piercing'],
        weight: 3,
        properties: { reach: true, special: true },
        ...props,
      };
    },
    longsword(props) {
      return {
        name: 'longsword',
        translation: 'Espada larga',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 15, sp: 0, cp: 0 },
        damage: ['1d8', 'slashing'],
        weight: 1.5,
        properties: { versatile: '1d10' },
        ...props,
      };
    },
    maul(props) {
      return {
        name: 'maul',
        translation: 'Atarraga',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 10, sp: 0, cp: 0 },
        damage: ['2d6', 'bludgeoning'],
        weight: 5,
        properties: { heavy: true, twoHanded: true },
        ...props,
      };
    },
    morningstar(props) {
      return {
        name: 'morningstar',
        translation: 'Lucero del alba',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 15, sp: 0, cp: 0 },
        damage: ['1d8', 'piercing'],
        weight: 2,
        properties: {},
        ...props,
      };
    },
    pike(props) {
      return {
        name: 'pike',
        translation: 'Pica',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 5, sp: 0, cp: 0 },
        damage: ['1d10', 'piercing'],
        weight: 9,
        properties: { heavy: true, reach: true, twoHanded: true },
        ...props,
      };
    },
    rapier(props) {
      return {
        name: 'rapier',
        translation: 'Estoque',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 25, sp: 0, cp: 0 },
        damage: ['1d8', 'piercing'],
        weight: 1,
        properties: { finesse: true },
        ...props,
      };
    },
    scimitar(props) {
      return {
        name: 'scimitar',
        translation: 'Cimitarra',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 25, sp: 0, cp: 0 },
        damage: ['1d6', 'slashing'],
        weight: 1.5,
        properties: { finesse: true, light: true },
        ...props,
      };
    },
    shortsword(props) {
      return {
        name: 'shortsword',
        translation: 'Espada corta',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 10, sp: 0, cp: 0 },
        damage: ['1d6', 'piercing'],
        weight: 1,
        properties: { finesse: true, light: true },
        ...props,
      };
    },
    trident(props) {
      return {
        name: 'trident',
        translation: 'Tridente',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 5, sp: 0, cp: 0 },
        damage: ['1d6', 'piercing'],
        weight: 2,
        properties: { thrown: [6, 20], versatile: '1d8' },
        ...props,
      };
    },
    trident1(props) {
      return WEAPONS().trident({
        name: 'trident1',
        translation: 'Tridente (+1)',
        rarity: 'uncommon',
        price: { gp: 250 },
        identified: true,
        bonus: {
          damage: 1,
        },
        ...props,
      });
    },
    warPick(props) {
      return {
        name: 'warPick',
        translation: 'Pica de guerra',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 5, sp: 0, cp: 0 },
        damage: ['1d8', 'piercing'],
        weight: 1,
        properties: {},
        ...props,
      };
    },
    warhammer(props) {
      return {
        name: 'warhammer',
        translation: 'Martillo de guerra',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 15, sp: 0, cp: 0 },
        damage: ['1d8', 'bludgeoning'],
        weight: 1,
        properties: { versatile: '1d10' },
        ...props,
      };
    },
    warhammer1(props) {
      return WEAPONS().warhammer({
        name: 'warhammer1',
        translation: 'Martillo de guerra (+1)',
        rarity: 'uncommon',
        price: { gp: 250 },
        identified: true,
        bonus: {
          damage: 1,
        },
        ...props,
      });
    },
    whip(props) {
      return {
        name: 'whip',
        translation: 'Látigo',
        type: 'weapon',
        subtype: 'martialMelee',
        price: { gp: 2, sp: 0, cp: 0 },
        damage: ['1d4', 'slashing'],
        weight: 1.5,
        properties: { finesse: true, reach: true },
        ...props,
      };
    },
    blowgun(props) {
      return {
        name: 'blowgun',
        translation: 'Cerbatana',
        type: 'weapon',
        subtype: 'martialRanged',
        ammoType: 'darts',
        price: { gp: 10, sp: 0, cp: 0 },
        damage: ['1d1', 'piercing'],
        weight: 0.5,
        properties: { ammunition: [25, 100], loading: true },
        ...props,
      };
    },
    handCrossbow(props) {
      return {
        name: 'handCrossbow',
        translation: 'Ballesta de mano',
        type: 'weapon',
        subtype: 'martialRanged',
        subsubtype: 'crossbow',
        ammoType: 'bolts',
        price: { gp: 75, sp: 0, cp: 0 },
        damage: ['1d6', 'piercing'],
        weight: 1.5,
        properties: { ammunition: [30, 120], light: true, loading: true },
        ...props,
      };
    },
    heavyCrossbow(props) {
      return {
        name: 'heavyCrossbow',
        translation: 'Ballesta pesada',
        type: 'weapon',
        subtype: 'martialRanged',
        subsubtype: 'crossbow',
        ammoType: 'bolts',
        price: { gp: 50, sp: 0, cp: 0 },
        damage: ['1d10', 'piercing'],
        weight: 9,
        properties: {
          ammunition: [100, 400],
          heavy: true,
          loading: true,
          twoHanded: true,
        },
        ...props,
      };
    },
    longbow(props) {
      return {
        name: 'longbow',
        translation: 'Arco largo',
        type: 'weapon',
        subtype: 'martialRanged',
        ammoType: 'arrows',
        price: { gp: 50, sp: 0, cp: 0 },
        damage: ['1d8', 'piercing'],
        weight: 1,
        properties: { ammunition: [150, 600], heavy: true, twoHanded: true },
        ...props,
      };
    },
    net(props) {
      return {
        name: 'net',
        translation: 'Red',
        type: 'weapon',
        subtype: 'martialRanged',
        ammoType: 'none',
        price: { gp: 1, sp: 0, cp: 0 },
        damage: ['—', '3'],
        weight: 1.5,
        properties: { special: true, thrown: [5, 15] },
        ...props,
      };
    },

    // MAGIC WEAPONS

    sylvanBlade(props) {
      return WEAPONS().dagger({
        name: 'sylvanBlade',
        translation: 'Hoja Silvana',
        unidentifiedName: 'Daga ceremonial',
        rarity: 'uncommon',
        price: { gp: 450, sp: 0, cp: 0 },
        bonus: {
          damage: 1,
        },
        description: pc => {
          let wIndex = null;
          const pWeapon = pc.items.weapons.find((pW, i) => {
            if (pW.name === 'sylvanBlade') {
              wIndex = i;
              return true;
            }
            return false;
          });
          return `<p>Bonificador de +1 al ataque y al daño</p>
          <p>Una vez al día, puedes usar un ataque exitoso con la daga para lanzar Enmarañar (tirada de salvación DC${
            8 +
            getTotalAttackBonus(
              pc,
              pc.items.weapons,
              WEAPONS().sylvanBlade(pWeapon),
              wIndex
            )
          }).</p>
            <p>Adicionalmente, tienes ventaja en las pruebas de Naturaleza mientras lleves la daga.</p>`;
        },
        ...props,
      });
    },

    sylvanThorn(props) {
      return WEAPONS().sylvanBlade({
        name: 'sylvanThorn',
        translation: 'Espina Silvana',
        unidentifiedName: 'Daga ceremonial oscura',
        rarity: 'rare',
        price: { gp: 650, sp: 0, cp: 0 },
        description: pc => {
          let wIndex = null;
          const pWeapon = pc.items.weapons.find((pW, i) => {
            if (pW.name === 'sylvanThorn') {
              wIndex = i;
              return true;
            }
            return false;
          });
          return `<p>Bonificador de +1 al ataque y al daño</p>
          <p>Una vez al día, puedes usar un ataque exitoso con la daga para lanzar <u>Enmarañar (tirada de salvación DC${
            8 +
            getTotalAttackBonus(
              pc,
              pc.items.weapons,
              WEAPONS().sylvanBlade(pWeapon),
              wIndex
            )
          })</u>. Si el objetivo falla la tirada, sufre también <u>1d4</u> de daño <u>Perforante</u> adicional.</p>
            <p>Adicionalmente, tienes ventaja en las pruebas de Naturaleza mientras lleves la daga.</p>`;
        },
        ...props,
      });
    },
  };
}

export const ALL_WEAPONS = Object.keys(WEAPONS());

export function translateWeapon(weapon) {
  if (typeof weapon === 'object') return weapon.translation;
  return WEAPONS()[weapon]().translation;
}

export function getAllSimpleMelee(props) {
  return Object.entries(WEAPONS())
    .filter(([name, builder]) => builder().subtype === 'simpleMelee')
    .map(([name, builder]) => builder(props));
}

export function getAllSimpleRanged(props) {
  return Object.entries(WEAPONS())
    .filter(([name, builder]) => builder().subtype === 'simpleRanged')
    .map(([name, builder]) => builder(props));
}

export function getAllMartialMelee(props) {
  return Object.entries(WEAPONS())
    .filter(([name, builder]) => builder().subtype === 'martialMelee')
    .map(([name, builder]) => builder(props));
}

export function getAllMartialRanged(props) {
  return Object.entries(WEAPONS())
    .filter(([name, builder]) => builder().subtype === 'martialRanged')
    .map(([name, builder]) => builder(props));
}

export function getAllWeapons(props) {
  return [
    ...getAllSimpleMelee(props),
    ...getAllSimpleRanged(props),
    ...getAllMartialMelee(props),
    ...getAllMartialRanged(props),
  ];
}

export function isMeleeWeapon(w) {
  const weapon = getItem(w);
  return ['simpleMelee', 'martialMelee'].includes(weapon.subtype);
}

export function isRangedWeapon(w) {
  const weapon = getItem(w);
  return ['simpleRanged', 'martialRanged'].includes(weapon.subtype);
}

export function translateDamage(damage) {
  switch (damage) {
    case 'acid':
      return 'Ácido';
    case 'bludgeoning':
      return 'Contundente';
    case 'frost':
      return 'Frío';
    case 'fire':
      return 'Fuego';
    case 'force':
      return 'Fuerza';
    case 'lightning':
      return 'Relámpago';
    case 'negrotic':
      return 'Necrótico';
    case 'piercing':
      return 'Perforante';
    case 'poison':
      return 'Veneno';
    case 'psychic':
      return 'Psíquico';
    case 'radiant':
      return 'Radiante';
    case 'slashing':
      return 'Cortante';
    case 'thunder':
      return 'Trueno';
    case 'charm':
      return 'Encantamiento';

    default:
      break;
  }
}
