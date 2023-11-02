import { getItem } from './equipment/equipment';
import { NPC_RACES } from './npc/attrs/npcRaces';

export function t(key) {
  let translation = {
    // Sizes
    Tiny: 'Diminuto',
    Small: 'Pequeño',
    Medium: 'Mediano',
    Large: 'Grande',
    Huge: 'Enorme',
    Gargantuan: 'Gigantesco',

    // Alignments
    LG: 'Legal bueno',
    NG: 'Neutral bueno',
    CG: 'Caótico bueno',
    LN: 'Legal neutral',
    NN: 'Neutral',
    N: 'Neutral',
    CN: 'Caótico neutral',
    LE: 'Legal malvado',
    NE: 'Neutral malvado',
    CE: 'Caótico malvado',

    // Character types
    orc: 'orco',
    Humanoid: 'Humanoide',
    Fey: 'Feérico',
    Fiend: 'Infernal',
    Monstrosity: 'Monstruos',
    Undead: 'No-muerto',
    Beast: 'Bestia',
    Celestial: 'Celestial',
    Plant: 'Planta',
    Aberration: 'Aberración',
    Elemental: 'Elemental',
    Ooze: 'Cieno',
    Dragon: 'Dragón',
    Construct: 'Constructo',
    Giant: 'Gigante',
    Male: 'Varón',
    Female: 'Hembra',
    Matter: 'Materia',
    Energy: 'Energía',
    Spirit: 'Espiritu',
    Space: 'Espacio',
    None: 'Ninguno',

    // Governments
    DEMOCRACY: 'Democracia',
    DICTATORSHIP: 'Dictadura',
    FEUDALISM: 'Feudal',
    GERONTOCRACY: 'Gerontocracia',
    MAGOCRACY: 'Magocracia',
    MILITOCRACY: 'Militocracia',
    OLIGARCHY: 'Oligarquía',
    MERITOCRACY: 'Meritocracia',
    PLUTOCRACY: 'Plutarquía',
    REPUBLIC: 'República',
    TEOCRACY: 'Teocracia',

    // Economies
    FISHING: 'Pesca',
    TRADING: 'Bienes manufacturados',
    WOODWORK: 'Carpintería',
    STEELWORK: 'Herrería',
    MAGIC: 'Magia',
    MINING: 'Minería',

    // Items
    simpleWeapons: 'Armas simples',
    simpleMelee: 'Arma simple c/c',
    simpleRanged: 'Arma simple a distancia',
    martialWeapons: 'Armas marciales',
    martialMelee: 'Arma marcial c/c',
    martialRanged: 'Arma marcial a distancia',
    lightArmors: 'Armaduras ligeras',
    mediumArmors: 'Armaduras medias',
    heavyArmors: 'Armaduras pesadas',
    light: 'Armadura ligera',
    medium: 'Armadura media',
    heavy: 'Armadura pesada',
    musicalInstruments: 'Instrumentos musicales',
    artisansTools: 'Herramientas artesanales',
    arcaneFocus: 'Foco arcano',
    druidicFocus: 'Foco druídico',
    druidicFocus: 'Foco druídico',
    ammunition: 'Munición',
    adventure: 'Aventura',
    clothes: 'Ropa',
    equipment: 'Equipamiento',

    //Settlements
    village: 'Aldea',
    town: 'Pueblo',
    ciudad: 'Ciudad',
  }[key];

  if (translation) return translation;

  // Races
  translation = NPC_RACES[key]?.translation;

  if (translation) return translation;

  translation = getItem(key)?.translation;

  if (translation) return translation;

  return 'Unknown translation';
}
