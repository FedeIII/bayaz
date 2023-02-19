import { TOOLS } from './equipment/tools';
import { PRIESTS_PACK } from './equipment/packs';

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
    equipment: [
      {
        or: Object.values(TOOLS)
          .filter(tool => tool().subtype === 'artisansTools')
          .map(tool => tool()),
      },
    ],
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
