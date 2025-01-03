import { translateLanguage, translateSkill } from './characters';
import { translatePatron } from './classes/warlock/warlock';
import { translateMonster } from './encounters/monsterTranslations';
import { getItem } from './equipment/equipment';
import { translateDamage } from './equipment/weapons';
import { NPC_RACES } from './npc/attrs/npcRaces';
import { translateSchool } from './spells/spellTranslations';
import { translateSpell } from './spells/spells';

export function t(key) {
  let translation = {
    // Classes
    barbarian: 'Bárbaro',
    bard: 'Bardo',
    cleric: 'Clérigo',
    druid: 'Druida',
    fighter: 'Guerrero',
    monk: 'Monje',
    paladin: 'Paladín',
    ranger: 'Explorador',
    rogue: 'Pícaro',
    sorcerer: 'Hechicero',
    warlock: 'Brujo',
    wizard: 'Mago',

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
    orc: 'Orco',
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

    // Government situations
    ['Tirano temido']: 'Gobernada por un tirano temido',
    ['Débil de voluntad manipulado por otros']:
      'Gobierno débil de voluntad manipulado por otros',
    ['Gobernante ilegítimo, se cuece una guerra civil']:
      'Gobernante ilegítimo, se cuece una guerra civil',
    ['Dominados o controlados por un monstruo poderoso']:
      'Dominados o controlados por un monstruo poderoso',
    ['Cábala anónima y misteriosa']:
      'Gobernada por una cábala anónima y misteriosa',
    ['Liderazgo disputado, lucha abierta']:
      'Liderazgo disputado, lucha abierta',
    ['Cábala que se hizo con el poder abiertamente']:
      'Gobernada por una cábala que se hizo con el poder abiertamente',
    ['Patán incompetente']: 'Liderados por un patán incompetente',
    ['En su lecho de muerte, los herederos compiten por el poder']:
      'Líder en su lecho de muerte, los herederos compiten por el poder',
    ['Respetado, justo y equitativo']: 'Gobierno respetado, justo y equitativo',
    ['Gobernado desde las sombras']: 'Gobernado desde las sombras',
    ['De voluntad férrea pero respetado']:
      'Gobierno de voluntad férrea pero respetado',
    ['Líder religioso']: 'Gobernada por un líder religioso',

    // Economies
    HUNTING: 'Caza',
    FISHING: 'Pesca',
    TRADING: 'Bienes manufacturados',
    WOODWORK: 'Carpintería',
    STEELWORK: 'Herrería',
    MAGIC: 'Magia',
    MINING: 'Minería',
    AGRICULTURE: 'Agricultura/ganadería',

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
    // medium: 'Armadura media',
    musicalInstruments: 'Instrumentos musicales',
    artisansTools: 'Herramientas artesanales',
    arcaneFocus: 'Foco arcano',
    druidicFocus: 'Foco druídico',
    ammunition: 'Munición',
    adventure: 'Aventura',
    clothes: 'Ropa',
    equipment: 'Equipamiento',
    thrown: 'Lanzable',
    reach: 'Alcance',
    twoHanded: 'A dos manos',
    loading: 'Requiere recarga',
    special: 'Ataque especial',
    light: 'Ligera',
    heavy: 'Pesada',
    finesse: 'Sutil',
    versatile: 'Versátil',
    stealthDisadvantage: 'Desventaja al sigilo',

    //Places
    village: 'Aldea',
    town: 'Pueblo',
    city: 'Ciudad',
    place: 'Lugar',
    npc: 'NPC',
    settlement: 'Asentamiento',

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
    hovel_short: 'Casucha',
    mid_home: 'Hogar de clase media',
    mid_home_short: 'Hogar clase media',
    upper_home: 'Hogar de clase alta',
    upper_home_short: 'Hogar clase alta',
    apartments: 'Edificio de apartamentos abarrotado',
    apartments_short: 'Apartamentos',
    orphanage: 'Orfanato',
    orphanage_short: 'Orfanato',
    slaves: 'Antro para esclavos oculto',
    slaves_short: 'Antro para esclavos',
    secret: 'Tapadera para una secta secreta',
    secret_short: 'Secta secreta',
    mansion: 'Mansión lujosa y bien protegida',
    mansion_short: 'Mansión',
    //    religious
    matter: 'Templo a Materia',
    matter_short: 'Templo a Materia',
    energy: 'Templo a Energía',
    energy_short: 'Templo a Energía',
    spirit: 'Templo a Espíritu',
    spirit_short: 'Templo a Espíritu',
    space: 'Templo a Espacio',
    space_short: 'Templo a Espacio',
    fake: 'Templo a una deidad falsa (dirigido por sacerdotes embusteros)',
    fake_short: 'Templo a deidad falsa',
    ascetic: 'Hogar de ascetas',
    ascetic_short: 'Hogar de ascetas',
    shrine: 'Santuario abandonado',
    shrine_short: 'Santuario abandonado',
    library: 'Biblioteca',
    library_short: 'Biblioteca',
    infernal: 'Santuario oculto dedicado a un infernal o deidad malvada',
    infernal_short: 'Santuario infernal',
    //    tavern
    noisy: 'Antro estridente',
    noisy_short: 'Antro estridente',
    quiet: 'Bar tranquilo y de perfil bajo',
    quiet_short: 'Bar tranquilo',
    guild_meeting: 'Lugar de reunión de un gremio',
    guild_meeting_short: 'Reunión de gremio',
    secret_meeting: 'Lugar de encuentro de una sociedad secreta (buena/mala)',
    secret_meeting_short: 'Sociedad secreta',
    dinner_club: 'Club de cenas de la clase alta',
    dinner_club_short: 'Club de cenas',
    bet_house: 'Casa de apuestas',
    bet_house_short: 'Casa de apuestas',
    race: 'Clientela de una raza o gremio concretos',
    race_short: 'Clientela concreta',
    members: 'Club solo para miembros',
    members_short: 'Club miembros',
    brothel: 'Burdel',
    brothel_short: 'Burdel',
    //    warehouse
    empty: 'Vacío o abandonado',
    empty_short: 'Vacío',
    protected: 'Bien protegido, productos valiosos',
    protected_short: 'Productos valiosos',
    cheap: 'Productos baratos',
    cheap_short: 'Productos baratos',
    bulk: 'Productos a granel',
    bulk_short: 'A granel',
    lifestock: 'Animales vivos',
    lifestock_short: 'Animales vivos',
    weapons: 'Armas o armaduras',
    weapons_short: 'Armas o armaduras',
    exotic: 'Bienes de una tierra lejana',
    exotic_short: 'Bienes exóticos',
    bootleggers: 'Cubil secreto de contrabandistas',
    bootleggers_short: 'Contrabandistas',
    //    shop
    pawnshop: 'Casa de empeños',
    pawnshop_short: 'Casa de empeños',
    herbolary: 'Hierbas/inciensos',
    herbolary_short: 'Hierbas/inciensos',
    grocery: 'Frutas/verduras',
    grocery_short: 'Frutas/verduras',
    salting: 'Comida en salazón',
    salting_short: 'Comida en salazón',
    pottery: 'Alfarero',
    pottery_short: 'Alfarero',
    undertaker: 'Enterrador',
    undertaker_short: 'Enterrador',
    binder: 'Librero',
    binder_short: 'Librero',
    lender: 'Prestamista',
    lender_short: 'Prestamista',
    armory: 'Armas/armaduras',
    armory_short: 'Armas/armaduras',
    candlestick: 'Candelero',
    candlestick_short: 'Candelero',
    blacksmith: 'Herrero',
    blacksmith_short: 'Herrero',
    carpenter: 'Carpintero',
    carpenter_short: 'Carpintero',
    tailor: 'Costurero/Sastre',
    tailor_short: 'Costurero/Sastre',
    jewelry: 'Joyero',
    jewelry_short: 'Joyero',
    bakery: 'Panadero',
    bakery_short: 'Panadero',
    cartographer: 'Cartógrafo',
    cartographer_short: 'Cartógrafo',
    ropemaker: 'Cordelero',
    ropemaker_short: 'Cordelero',
    workshop: 'Albañil',
    workshop_short: 'Albañil',
    scribe: 'Escriba',
    scribe_short: 'Escriba',

    //Users
    dm: 'Dungeon Master',
    player: 'Player',

    //Monsters
    gnoll: 'Gnoll',
    titan: 'Titán',
    goblinoid: 'Goblinoide',
    demon: 'Demonio',
    shapechanger: 'Cambiaformas',
    'yuan-ti': 'Yuan-ti',
    devil: 'Diablo',
    gnome: 'Gnomo',
    nagpa: 'Nagpa',
    elf: 'Elfo',
    derro: 'Derro',
    grung: 'Grung',
    yugoloth: 'Yugoloth',
    kenku: 'Kenku',
    'frost giant': 'Gigante de escarcha',
    gith: 'Gith',
    tortle: 'Tortle',
    sahuagin: 'Sahuagin',
    dwarf: 'Enano',
    'kuo-toa': 'Kuo-toa',
    'cloud giant': 'Gigante de las nubes',
    quaggoth: 'Quaggoth',
    merfolk: 'Sirénido',
    bullywug: 'Bullywug',
    'stone giant': 'Gigante de piedra',
    troglodyte: 'Troglodita',
    aarakocra: 'Aarakocra',
    firenewt: 'Salamen',
    kobold: 'Kóbold',
    human: 'Humano',
    grimlock: 'Grimlock',
    meazel: 'Meazel',
    lizardfolk: 'Hombre lagarto',
    'thri-kreen': 'Hri-kreen',
    'fire giant': 'Gigante de fuego',
    inevitables: 'Inevitables',
    xvart: 'Xvart',
    'hill giant': 'Gigante de las colinas',
    'storm giant': 'Gigante de las tormentas',

    //Backgrounds
    guild: 'Gremio',
    routines: 'Rutinas',
    favoriteScheme: 'Ardid favorito',
    criminalSpecialty: 'Especialidad criminal',
    outlanderOrigin: 'Origen',
    sageSpecialty: 'Especialidad',
    soldierSpecialty: 'Especialidad',

    //Encounters
    trivial: 'Trivial',
    easy: 'Fácil',
    medium: 'Normal',
    hard: 'Difícil',
    deadly: 'Mortal',
    impossible: 'Imposible',

    //Items
    rarity: 'Rareza',
    common: 'Común',
    uncommon: 'Infrecuente',
    rare: 'Raro',
    veryRare: 'Muy raro',
    legendary: 'Legendario',
    category: 'Categoría',
    ring: 'Anillo',
    armor: 'Armadura',
    weapon: 'Arma',
    staff: 'Bastón',
    wondrous: 'Objeto Maravilloso',
    scroll: 'Pergamino',
    potion: 'Poción',
    rod: 'Vara',
    wand: 'Varita',

    // Characteristics
    strength: 'Fuerza',
    dexterity: 'Destreza',
    constitution: 'Constitución',
    intelligence: 'Inteligencia',
    wisdom: 'Sabiduría',
    charisma: 'Carisma',
    str: 'Fuerza',
    dex: 'Destreza',
    con: 'Constitución',
    int: 'Inteligencia',
    wis: 'Sabiduría',
    cha: 'Carisma',

    // Dominions
    central_dominion: 'Dominios Centrales',
    human_dominion: 'Dominios Humanos',
    dwarven_dominion: 'Dominios Enanos',
    elven_dominion: 'Dominios Élficos',
    wildlands_north: 'Tierras salvajes del Norte',
    wildlands_south: 'Tierras salvajes del Sur',
    forgotten_dominions: 'Dominios Olvidados',

    // Ranger Fighting Styles
    archery: 'A distancia',
    defense: 'Defensa',
    dueling: 'Duelista',
    twoWeaponFighting: 'Lucha con Dos Armas',

    // Paladin Fighting Styles
    'great-Weapon-fighting': 'Lucha con Arma a dos Manos',
    protection: 'Protección',
    'two-weapon-fighting': 'Lucha con Dos Armas',

    // Metamagic
    carefulSpell: 'Conjuro Cuidadoso',
    distantSpell: 'Conjuro Distante',
    empoweredSpell: 'Conjuro Potenciado',
    extendedSpell: 'Ampliar Conjuro',
    heightenedSpell: 'Conjuro Aumentado',
    quickenedSpell: 'Conjuro Acelerado',
    subtleSpell: 'Conjuro sutil',
    twinnedSpell: 'Conjuro Duplicado',

    // Sacred oaths
    Devotion: 'Juramento de Devoción',
    Ancients: 'Juramento de los Ancestros',
    Vengeance: 'Juramento de Venganza',

    // Security
    militia: 'milicias',
    guards: 'guardias',
  }[key];

  if (translation) return translation;

  translation = NPC_RACES[key]?.translation;
  if (translation) return translation;

  translation = translateSpell(key);
  if (translation && translation.indexOf('[[<---') !== 0) return translation;

  translation = translateDamage(key);
  if (translation) return translation;

  translation = translateLanguage(key);
  if (translation && translation !== 'unknown language') return translation;

  translation = translateSkill(key);
  if (translation && translation !== 'unknown skill') return translation;

  translation = translateSchool(key);
  if (translation) return translation;

  translation = translateMonster(key);
  if (translation) return translation;

  translation = getItem(key)?.translation;
  if (translation) return translation;

  translation = translatePatron(key);
  if (translation) return translation;

  return `[---${key}---]`;
}
