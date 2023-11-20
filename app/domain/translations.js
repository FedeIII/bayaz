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
    ammunition: 'Munición',
    adventure: 'Aventura',
    clothes: 'Ropa',
    equipment: 'Equipamiento',

    //Settlements
    village: 'Aldea',
    town: 'Pueblo',
    city: 'Ciudad',

    //Buildings
    //  types
    residence: 'Residencia',
    religious: 'Religioso',
    tavern: 'Taberna',
    warehouse: 'Almacén',
    shop: 'Tienda',
    //  subtypes
    //    residence
    hovel: 'Casucha abandonada',
    mid_home: 'Hogar de clase media',
    upper_home: 'Hogar de clase alta',
    apartments: 'Edificio de apartamentos abarrotado',
    orphanage: 'Orfanato',
    slaves: 'Antro para esclavos oculto',
    secret: 'Tapadera para una secta secreta',
    mansion: 'Mansión lujosa y bien protegida',
    //    religious
    matter: 'Templo a Materia',
    energy: 'Templo a Energía',
    spirit: 'Templo a Espíritu',
    space: 'Templo a Espacio',
    fake: 'Templo a una deidad falsa (dirigido por sacerdotes embusteros)',
    ascetic: 'Hogar de ascetas',
    shrine: 'Santuario abandonado',
    library: 'Biblioteca',
    infernal: 'Santuario oculto dedicado a un infernal o deidad malvada',
    //    tavern
    noisy: 'Antro estridente',
    quiet: 'Bar tranquilo y de perfil bajo',
    guild: 'Lugar de reunión de un gremio',
    secret_meeting: 'Lugar de encuentro de una sociedad secreta (buena/mala)',
    dinner_club: 'Club de cenas de la clase alta',
    bet_house: 'Casa de apuestas',
    race: 'Clientela de una raza o gremio concretos',
    members: 'Club solo para miembros',
    brothel: 'Burdel',
    //    warehouse
    empty: 'Vacío o abandonado',
    protected: 'Bien protegido, productos valiosos',
    cheap: 'Productos baratos',
    bulk: 'Productos a granel',
    lifestock: 'Animales vivos',
    weapons: 'Armas o armaduras',
    exotic: 'Bienes de una tierra lejana',
    bootleggers: 'Cubil secreto de contrabandistas',
    //    shop
    pawnshop: 'Casa de empeños',
    herbolary: 'Hierbas/inciensos',
    grocery: 'Frutas/verduras',
    salting: 'Comida en salazón',
    pottery: 'Alfarero',
    undertaker: 'Enterrador',
    binder: 'Librero',
    lender: 'Prestamista',
    armory: 'Armas/armaduras',
    candlestick: 'Candelero',
    blacksmith: 'Herrero',
    carpenter: 'Carpintero',
    tailor: 'Costurero/Sastre',
    jewelry: 'Joyero',
    bakery: 'Panadero',
    cartographer: 'Cartógrafo',
    ropemaker: 'Cordelero',
    workshop: 'Albañil',
    scribe: 'Escriba',

    //Users
    dm: 'Dungeon Master',
    player: 'Player',
  }[key];

  if (translation) return translation;

  // Races
  translation = NPC_RACES[key]?.translation;

  if (translation) return translation;

  translation = getItem(key)?.translation;

  if (translation) return translation;

  return 'Unknown translation';
}
