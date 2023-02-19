import { getAllArtisansTools, TOOLS } from './equipment/tools';
import { PRIESTS_PACK } from './equipment/packs';

export const GUILDS = [
  'alchemists',
  'armorers',
  'brewers',
  'calligraphers',
  'carpenters',
  'cartographers',
  'cobblers',
  'cooks',
  'glassblowers',
  'jewelers',
  'leatherworkers',
  'masons',
  'painters',
  'potters',
  'shipwrights',
  'smiths',
  'tinkers',
  'wagonMakers',
  'weavers',
  'woodcarvers',
];

export const BACKGROUNDS = {
  acolyte: {
    skills: ['insight', 'religion'],
    languages: 2,
    equipment: [
      TOOLS.holySymbol(),
      TOOLS.prayerbook(),
      PRIESTS_PACK.items.incenseBlocks({ amount: 5 }),
      PRIESTS_PACK.items.vestments(),
      TOOLS.commonClothes(),
    ],
    money: [15, 0, 0],
    traits: {
      shelterOfTheFaithful: 'Refugio de los Fieles',
    },
  },
  guildArtisan: {
    skills: ['insight', 'persuasion'],
    languages: 1,
    proficientItems: [
      {
        or: getAllArtisansTools(),
      },
    ],
    equipment: [
      {
        or: getAllArtisansTools(),
      },
      TOOLS.guildIntroductionLetter(),
      TOOLS.commonClothes(),
    ],
    money: [15, 0, 0],
    select: {
      guild: { items: GUILDS, translate: translateGuild },
    },
    traits: {
      guildMembership: 'Membresía del Gremio',
    },
  },
  entertainer: {},
  charlatan: {},
  criminal: {},
  hermit: {},
  outlander: {},
  folkHero: {},
  urchin: {},
  sailor: {},
  noble: {},
  sage: {},
  soldier: {},
};

export function translateBackground(background) {
  switch (background) {
    case 'acolyte':
      return 'Acólito';
    case 'guildArtisan':
      return 'Artesano Gremial';
    case 'entertainer':
      return 'Artista';
    case 'charlatan':
      return 'Charlatán';
    case 'criminal':
      return 'Criminal';
    case 'hermit':
      return 'Ermitaño';
    case 'outlander':
      return 'Forastero';
    case 'folkHero':
      return 'Héroe del Pueblo';
    case 'urchin':
      return 'Huérfano';
    case 'sailor':
      return 'Marinero';
    case 'noble':
      return 'Noble';
    case 'sage':
      return 'Sabio';
    case 'soldier':
      return 'Soldado';

    default:
      return 'unknown background';
  }
}

export function translateGuild(guild) {
  switch (guild) {
    case 'alchemists':
      return 'Alquimistas y boticarios';
    case 'armorers':
      return 'Armeros, cerrajeros y orfebres';
    case 'brewers':
      return 'Cerveceros, destiladores y vinateros';
    case 'calligraphers':
      return 'Calígrafos, escribas y escribanos';
    case 'carpenters':
      return 'Carpinteros, techadores y yeseros';
    case 'cartographers':
      return 'Cartógrafos, topógrafo y delineantes';
    case 'cobblers':
      return 'Zapateros y remendones';
    case 'cooks':
      return 'Cocineros y panaderos';
    case 'glassblowers':
      return 'Vidrieros y sopladores de vidrio';
    case 'jewelers':
      return 'Joyeros y talladores de gemas';
    case 'leatherworkers':
      return 'Desolladores, peleteros y curtidores';
    case 'masons':
      return 'Albañiles y canteros';
    case 'painters':
      return 'Pintores, rotulistas y retratistas';
    case 'potters':
      return 'Alfareros y azulejeros';
    case 'shipwrights':
      return 'Carpinteros de barcos y fabricantes de velas';
    case 'smiths':
      return 'Herreros y forjadores';
    case 'tinkers':
      return 'Hojalateros, estañeros y vertedores';
    case 'wagonMakers':
      return 'Fabricantes de ruedas y vagones';
    case 'weavers':
      return 'Tejedores y tintoreros';
    case 'woodcarvers':
      return 'Talladores, toneleros y fabricantes de arcos';

    default:
      break;
  }
}
