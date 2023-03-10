import {
  getAllArtisansTools,
  getAllMusicalInstruments,
  TOOLS,
} from './equipment/tools';
import {
  PRIESTS_PACK,
  ENTERTAINERS_PACK,
  DIPLOMATS_PACK,
  DUNGEONEERS_PACK,
} from './equipment/packs';
import { WEAPONS } from './equipment/weapons';

export const ARTISAN_GUILDS = [
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

export const ENTERTAINER_ROUTINES = [
  'actor',
  'dancer',
  'fireEater',
  'gladiator',
  'jester',
  'juggler',
  'instrumentalist',
  'poet',
  'singer',
  'storyteller',
  'tumbler',
];

export const CHARLATAN_FAVORITE_SCHEMES = [
  'cheat',
  'forge',
  'prey',
  'identity',
  'sleight-of-hand',
  'junk',
];

export const CRIMINAL_SPECIALTY = [
  'blackmailer',
  'burglar',
  'enforcer',
  'fence',
  'highwayRobber',
  'hiredKiller',
  'pickpocket',
  'smuggler',
];

export const OUTLANDER_ORIGIN = [
  'forester',
  'trapper',
  'homesteader',
  'guide',
  'exile',
  'bountyHunter',
  'pilgrim',
  'tribalNomad',
  'hunterGatherer',
  'tribalMarauder',
];

export const SAGE_SPECIALTY = [
  'alchemist',
  'astronomer',
  'discreditedAcademic',
  'librarian',
  'professor',
  'researcher',
  'wizardsApprentice',
  'scribe',
];

export const SOLDIER_SPECIALTY = [
  'officer',
  'scout',
  'infantry',
  'cavalry',
  'healer',
  'quartermaster',
  'standardBearer',
  'supportStaff',
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
      guild: { items: ARTISAN_GUILDS, translate: translateGuild },
    },
    traits: {
      guildMembership: 'Membres??a del Gremio',
    },
  },
  entertainer: {
    skills: ['acrobatics', 'performance'],
    proficientItems: [
      ENTERTAINERS_PACK.items.disguiseKit(),
      { or: getAllMusicalInstruments() },
    ],
    equipment: [
      { or: getAllMusicalInstruments() },
      TOOLS.admirerFavor(),
      ENTERTAINERS_PACK.items.disguiseKit(),
    ],
    money: [15, 0, 0],
    select: {
      routines: {
        items: ENTERTAINER_ROUTINES,
        translate: translateRoutine,
        amount: 3,
      },
    },
    traits: {
      byPopularDemand: 'A Petici??n Popular',
    },
  },
  charlatan: {
    skills: ['deception', 'sleight-of-hand'],
    proficientItems: [
      ENTERTAINERS_PACK.items.disguiseKit(),
      TOOLS.forgeryKit(),
    ],
    equipment: [
      DIPLOMATS_PACK.items.fineClothes(),
      ENTERTAINERS_PACK.items.disguiseKit(),
      TOOLS.conTools(),
    ],
    money: [15, 0, 0],
    select: {
      favoriteScheme: {
        items: CHARLATAN_FAVORITE_SCHEMES,
        translate: translateFavoriteScheme,
      },
    },
    traits: {
      falseIdentity: 'Identidad Falsa',
    },
  },
  criminal: {
    skills: ['deception', 'stealth'],
    proficientItems: [TOOLS.gamingSet(), TOOLS.thievesTools()],
    equipment: [DUNGEONEERS_PACK.items.crowbar(), TOOLS.layLowClothes()],
    money: [15, 0, 0],
    select: {
      criminalSpecialty: {
        items: CRIMINAL_SPECIALTY,
        translate: translateCriminalSpecialty,
      },
    },
    traits: {
      criminalContact: 'Contacto Criminal',
    },
  },
  hermit: {
    skills: ['medicine', 'religion'],
    proficientItems: [TOOLS.herbalismKit()],
    languages: 1,
    equipment: [
      TOOLS.scrollCase(),
      TOOLS.winterBlanket(),
      TOOLS.commonClothes(),
      TOOLS.herbalismKit(),
    ],
    money: [5, 0, 0],
    traits: {
      discovery: 'Descubrimiento',
    },
  },
  outlander: {
    skills: ['athletics', 'survival'],
    proficientItems: [{ or: getAllMusicalInstruments() }],
    languages: 1,
    equipment: [
      WEAPONS.quarterstaff(),
      TOOLS.huntingTrap(),
      TOOLS.animalTrophy(),
      TOOLS.commonClothes(),
    ],
    money: [10, 0, 0],
    select: {
      outlanderOrigin: {
        items: OUTLANDER_ORIGIN,
        translate: translateOutlanderOrigin,
      },
    },
    traits: {
      wanderer: 'Viajero',
    },
  },
  folkHero: {
    skills: ['animal-handling', 'survival'],
    proficientItems: [{ or: getAllArtisansTools() }],
    equipment: [
      { or: getAllArtisansTools() },
      TOOLS.shovel(),
      TOOLS.ironPot(),
      TOOLS.commonClothes(),
    ],
    money: [10, 0, 0],
    trait: {
      rusticHospitality: 'Hospitalidad R??stica',
    },
  },
  urchin: {
    skills: ['sleight-of-hand', 'stealth'],
    proficientItems: [
      ENTERTAINERS_PACK.items.disguiseKit(),
      TOOLS.thievesTools(),
    ],
    equipment: [
      TOOLS.smallKnife(),
      TOOLS.cityMap(),
      TOOLS.petMouse(),
      TOOLS.parentsToken(),
      TOOLS.commonClothes(),
    ],
    money: [10, 0, 0],
    traits: {
      citySecrets: 'Secretos de la Ciudad',
    },
  },
  sailor: {
    skills: ['athletics', 'preception'],
    proficientItems: [TOOLS.navigatorsTools()],
    equipment: [
      WEAPONS.club(),
      TOOLS.silkRope({ amount: 15 }),
      TOOLS.luckyCharm(),
      TOOLS.commonClothes(),
    ],
    money: [10, 0, 0],
    traits: {
      shipsPassage: 'Pasage Mar??timo',
    },
  },
  noble: {
    skills: ['history', 'persuasion'],
    proficientItems: [TOOLS.gamingSet()],
    languages: 1,
    equipment: [
      DIPLOMATS_PACK.items.fineClothes(),
      TOOLS.signedRing(),
      TOOLS.pedigreeScroll(),
    ],
    money: [25, 0, 0],
    traits: {
      positionOfPrivilege: 'Posici??n de Privilegio',
    },
  },
  sage: {
    skills: ['arcana', 'history'],
    languages: 2,
    equipment: [
      DIPLOMATS_PACK.items.inkBottle(),
      DIPLOMATS_PACK.items.inkPen(),
      TOOLS.smallKnife(),
      TOOLS.personalLetter(),
      TOOLS.commonClothes(),
    ],
    money: [10, 0, 0],
    select: {
      sageSpecialty: {
        items: SAGE_SPECIALTY,
        translate: translateSageSpecialty,
      },
    },
    traits: {
      researcher: 'Investigador',
    },
  },
  soldier: {
    skills: ['athletics', 'intimidation'],
    proficientItems: [TOOLS.gamingSet()],
    equipment: [
      TOOLS.rankInsignia(),
      TOOLS.enemyTrophy(),
      TOOLS.gamingSet(),
      TOOLS.commonClothes(),
    ],
    money: [10, 0, 0],
    select: {
      soldierSpecialty: {
        items: SOLDIER_SPECIALTY,
        translate: translateSoldierSpecialty,
      },
    },
    traits: {
      militaryRank: 'Rango Militar',
    },
  },
};

export function translateBackground(background) {
  switch (background) {
    case 'acolyte':
      return 'Ac??lito';
    case 'guildArtisan':
      return 'Artesano Gremial';
    case 'entertainer':
      return 'Artista';
    case 'charlatan':
      return 'Charlat??n';
    case 'criminal':
      return 'Criminal';
    case 'hermit':
      return 'Ermita??o';
    case 'outlander':
      return 'Forastero';
    case 'folkHero':
      return 'H??roe del Pueblo';
    case 'urchin':
      return 'Hu??rfano';
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
      return 'Cal??grafos, escribas y escribanos';
    case 'carpenters':
      return 'Carpinteros, techadores y yeseros';
    case 'cartographers':
      return 'Cart??grafos, top??grafo y delineantes';
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
      return 'Alba??iles y canteros';
    case 'painters':
      return 'Pintores, rotulistas y retratistas';
    case 'potters':
      return 'Alfareros y azulejeros';
    case 'shipwrights':
      return 'Carpinteros de barcos y fabricantes de velas';
    case 'smiths':
      return 'Herreros y forjadores';
    case 'tinkers':
      return 'Hojalateros, esta??eros y vertedores';
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

export function translateRoutine(routine) {
  switch (routine) {
    case 'actor':
      return 'Actor';
    case 'dancer':
      return 'Bailar??n';
    case 'fireEater':
      return 'Tragafuegos';
    case 'gladiator':
      return 'Gladiador';
    case 'jester':
      return 'Buf??n';
    case 'juggler':
      return 'Malabarista';
    case 'instrumentalist':
      return 'Instrumentista';
    case 'poet':
      return 'Poeta';
    case 'singer':
      return 'Cantante';
    case 'storyteller':
      return 'Narrador';
    case 'tumbler':
      return 'Acr??bata';

    default:
      break;
  }
}

export function translateFavoriteScheme(favoriteScheme) {
  switch (favoriteScheme) {
    case 'cheat':
      return 'Hago trampa en los juegos de azar.';
    case 'forge':
      return 'Falsifico monedas o documentos';
    case 'prey':
      return 'Me introduzco en la vida de la gente para aprovecharme de su debilidad y "asegurar" sus fortunas';
    case 'identity':
      return 'Cambio de identidad con tanta facilidad como cambio de ropa';
    case 'sleight-of-hand':
      return 'Hago estafas de prestidigitador en las esquinas de las calles.';
    case 'junk':
      return 'Convenzo a la gente de que la basura sin valor bien vale su dinero duramente ganado.';

    default:
      break;
  }
}

export function translateCriminalSpecialty(specialty) {
  switch (specialty) {
    case 'blackmailer':
      return 'Chantajista';
    case 'burglar':
      return 'Ladr??n';
    case 'enforcer':
      return 'Sicario';
    case 'fence':
      return 'Mat??n';
    case 'highwayRobber':
      return 'Asaltador de caminos';
    case 'hiredKiller':
      return 'Asesino a sueldo';
    case 'pickpocket':
      return 'Carterista';
    case 'smuggler':
      return 'Contrabandista';

    default:
      break;
  }
}

export function translateOutlanderOrigin(origin) {
  switch (origin) {
    case 'forester':
      return 'Guardabosques';
    case 'trapper':
      return 'Trampero';
    case 'homesteader':
      return 'Colono';
    case 'guide':
      return 'Gu??a';
    case 'exile':
      return 'Exiliado';
    case 'bountyHunter':
      return 'Cazarrecompensas';
    case 'pilgrim':
      return 'Peregrino';
    case 'tribalNomad':
      return 'N??mada';
    case 'hunterGatherer':
      return 'Cazador-recolector';
    case 'tribalMarauder':
      return 'Saqueador';

    default:
      break;
  }
}

export function translateSageSpecialty(specialty) {
  switch (specialty) {
    case 'alchemist':
      return 'Alquimista';
    case 'astronomer':
      return 'Astr??nomo';
    case 'discreditedAcademic':
      return 'Acad??mico desacreditado';
    case 'librarian':
      return 'Bibliotecario';
    case 'professor':
      return 'Profesor';
    case 'researcher':
      return 'Investigador';
    case 'wizardsApprentice':
      return 'Aprendiz de mago';
    case 'scribe':
      return 'Escriba';

    default:
      break;
  }
}

export function translateSoldierSpecialty(specialty) {
  switch (specialty) {
    case 'officer':
      return 'Oficial';
    case 'scout':
      return 'Explorador';
    case 'infantry':
      return 'Infanter??a';
    case 'cavalry':
      return 'Caballer??a';
    case 'healer':
      return 'Sanador';
    case 'quartermaster':
      return 'Intendente';
    case 'standardBearer':
      return 'Portaestandartes';
    case 'supportStaff':
      return 'Personal de Apoyo (cocinero, herrero, o similares)';

    default:
      break;
  }
}
