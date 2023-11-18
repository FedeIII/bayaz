import random from '~/domain/random';
import { NPC_DEITIES, NPC_DEITIES_NAMES } from '../npc/attrs/npcFaith';
import { t } from '../translations';
import { randomVillageImage } from './village';
import { randomTownImage } from './town';
import { randomCityImage } from './city';

export const VILLAGE = {
  population: [20, 500],
  roundPopulation: 10,
  minPopulationForGuesthouse: 100,
  security: [2, 5],
};

export const TOWN = {
  population: [1000, 3000],
  roundPopulation: 500,
  security: [10, 25],
  taverns: [1, 5],
  magicShops: [0, 1],
};

export const CITY = {
  population: [5000, 15000],
  roundPopulation: 1000,
  security: [30, 100],
  taverns: [3, 10],
  commerces: [2, 4],
  magicShops: [0, 3],
};

export function getPopulation(PLACE) {
  const population = random.uniform(...PLACE.population);
  return random.roundTo(PLACE.roundPopulation, population);
}

export const COMMERCE = [
  [10, 'FISHING'],
  [7, 'TRADING'],
  [5, 'WOODWORK'],
  [10, 'STEELWORK'],
  [2, 'MAGIC'],
  [5, 'MINING'],
];

export const GOVERNMENTS = [
  [5, 'DEMOCRACY'],
  [3, 'DICTATORSHIP'],
  [20, 'FEUDALISM'],
  [2, 'GERONTOCRACY'],
  [5, 'MAGOCRACY'],
  [10, 'MILITOCRACY'],
  [4, 'OLIGARCHY'],
  [3, 'MERITOCRACY'],
  [2, 'PLUTOCRACY'],
  [8, 'REPUBLIC'],
  [10, 'TEOCRACY'],
];

export const RACE_RELATIONSHIPS = [
  [10, 'Armonía'],
  [4, 'Tensión o rivalidad'],
  [2, 'La raza mayoritaria son conquistadores'],
  [1, 'Una minoría racial son gobernantes'],
  [1, 'Una minoría racial son refugiados'],
  [1, 'La raza mayoritaria oprime a las minorías'],
  [1, 'Una minoría racial oprime a la raza mayoritaria'],
];

export const GOVERNMENT_SITUATION = [
  [5, 'Respetado, justo y equitativo'],
  [3, 'Tirano temido'],
  [1, 'Débil de voluntad manipulado por otros'],
  [1, 'Gobernante ilegítimo, se cuece una guerra civil'],
  [1, 'Dominados o controlados por un monstruo poderoso'],
  [1, 'Cábala anónima y misteriosa'],
  [1, 'Liderazgo disputado, lucha abierta'],
  [1, 'Cábala que se hizo con el poder abiertamente'],
  [1, 'Patán incompetente'],
  [1, 'En su lecho de muerte, los herederos compiten por el poder'],
  [2, 'De voluntad férrea pero respetado'],
  [2, 'Líder religioso'],
];

export const PLACE_CHARACTERISTICS = [
  'Canales en lugar de calles',
  'Estatua o monumento enorme',
  'Templo grandioso',
  'Gran fortaleza',
  'Parques y jardines frondosos',
  'Un río divide la población',
  'Importante núcleo comercial',
  'Cuartel general de un gremio o familia poderosos',
  'Casi toda la población es rica',
  'Pobre, en decadencia',
  'Olor horrible (curtidurías, alcantarillas abiertas)',
  'Centro del comercio de un bien en concreto',
  'Lugar en el que se produjeron muchas batallas',
  'Lugar en el que se produjo un evento mítico o mágico',
  'Biblioteca o archivos de importancia',
  'Prohíbe la adoración de cualquier dios',
  'Reputación siniestra',
  'Academia o biblioteca reputadas',
  'Cementerio o mausoleo importante',
  'Construido sobre ruinas antiguas ',
];

export const PLACE_KNOWN_FOR = [
  'Cocina deliciosa',
  'Ciudadanos maleducados',
  'Mercaderes codiciosos',
  'Artistas y escritores',
  'Gran héroe salvador',
  'Flores',
  'Hordas de mendigos',
  'Duros guerreros',
  'Magia oscura',
  'Decadencia',
  'Devoción',
  'Apuestas',
  'Carencia de dios',
  'Educación',
  'Vinos',
  'Moda',
  'Intrigas policíacas',
  'Gremios poderosos',
  'Bebidas fuertes',
  'Patriotismo',
];

export const PLACE_CALAMITY = [
  [1, 'Se sospecha de infestación de vampiros'],
  [1, 'Nueva secta busca conversos'],
  [1, 'Personalidad importante ha muerto (se sospecha un asesinato)'],
  [1, 'Guerra entre gremios de ladrones rivales'],
  [2, 'Plaga o hambruna (se producen disturbios)'],
  [1, 'Oficiales corruptos'],
  [2, 'Saqueos por parte de monstruos'],
  [1, 'Mago poderoso se ha mudado al asentamiento'],
  [1, 'Depresión económica (se interrumpe el comercio)'],
  [1, 'Inundación'],
  [1, 'Muertos vivientes surgen de sus tumbas'],
  [1, 'Profecía que predice una fatalidad'],
  [1, 'Al borde de una guerra'],
  [1, 'Conílicto interno (que lleva a la anarquía)'],
  [1, 'Asediada por enemigos'],
  [1, 'Escándalo que amenaza a familias poderosas'],
  [1, 'Mazmorra descubierta (acuden aventureros en tropel)'],
  [1, 'Sectas religiosas pugnan por el poder'],
];

export const TAVERN_NAMES = [
  [
    'El Pegaso',
    'El Poni',
    'La Rosa',
    'El Ciervo',
    'El Lobo',
    'El Cordero',
    'El Demonio',
    'La Cabra',
    'El Espíritu',
    'La Horda',
    'El Bufón',
    'La Montaña',
    'El Águila',
    'El Sátiro',
    'El Perro',
    'La Araña',
    'La Estrella',
    'El Diamante',
    'El Rubí',
    'El Zafiro',
    'El Topacio',
    'La Esmeralda',
    'La Amatista',
    'El Ópalo',
    'El Escudo',
    'La Espada',
    'La Maza',
    'El Martillo',
    'La Daga',
    'El Bastón',
    'El Cetro',
    'La Jarra',
    'La Doncella',
    'El Trovador',
    'La Moza',
    'El Murciélago',
    'El Tejón',
    'El Gato',
    'La Rana',
    'El Cuervo',
    'El Búho',
    'El Escorpión',
    'La Mula',
    'El Jabalí',
    'El Corzo',
    'El Alce',
    'El Duende',
    'El Oso',
    'El Druida',
    'El Bardo',
    'La Bruja',
    'El Dragón',
    'El Ogro',
    'El Soldado',
    'El Caballero',
    'El Monje',
    'El Troll',
    'El Guardián',
    'El Gólem',
    'La Tortuga',
    'El Alquemista',
    'El Herrero',
    'El Marinero',
    'El Poeta',
    'El Peregrino',
    'La Pluma',
    'La Lanza',
  ],
  [
    'Plateado/a',
    'Dorado/a',
    'Tambaleante',
    'Risueño/a',
    'de Oropel',
    'Corredor/a',
    'Aullador/a',
    'Sacrificado/a',
    'Lascivo/a',
    'Borracho/a',
    'Saltarín',
    'Rugiente',
    'Ceiludo/a',
    'Solitario/a',
    'Vagabundo/a',
    'Misterioso/a',
    'Ladrador/a',
    'Negro/a',
    'Brillante',
    'Rojo/a',
    'Azul',
    'Amarillo/a',
    'Verde',
    'Naranja',
    'Marrón',
    'Morado/a',
    'Blanco/a',
    'Feliz',
    'Maleducado/a',
    'Gritón/a',
    'Astuto/a',
    'Veloz',
    'Sabio/a',
    'Cantarín/a',
    'Mudo/a',
    'Viejo/a',
    'Encantado/a',
    'Mágico/a',
    'Imaginario/a',
    'Helado/a',
    'Flameado/a',
    'Roto/a',
    'Panorámico/a',
    'Mentiroso/a',
    'Asustado/a',
    'Cansado/a',
    'Metálico/a',
    'Bronceado/a',
    'Encendido/a',
    'Elegante',
    'Celoso/a',
    'Profundo/a',
    'Bizarro/a',
    'Doble',
    'Caliente',
    'Frío/a',
    'Armado/a',
    'Desteñido/a',
    'Armado/a',
    'Reluciente',
    'Ruidoso/a',
    'Obediente',
    'Devoto/a',
    'Sangriento/a',
    'Pálido/a',
    'de Bronce',
    'de Cobre',
    'de Acero',
  ],
];

export function randomInnName() {
  const firstPart = random.element(TAVERN_NAMES[0]);
  const secondPart = random.element(TAVERN_NAMES[1]);
  const isMasculine = firstPart.slice(0, 2) === 'El';
  return `${firstPart} ${secondPart.replace(
    isMasculine ? /\/a/ : /o?\/a/,
    isMasculine ? '' : 'a'
  )}`;
}

export function randomInnNames(number) {
  const names = [];
  let newName;
  while (names.length < number) {
    newName = randomInnName();
    if (
      !names.map(name => name.split(' ')[1]).includes(newName.split(' ')[1]) &&
      !names.map(name => name.split(' ')[2]).includes(newName.split(' ')[2])
    ) {
      names.push(newName);
    }
  }
  return names;
}

/* prettier-ignore*/
export const SETTLEMENT_NAME = [
  ["amber", "angel", "spirit", "basin", "lagoon", "basin", "arrow", "autumn", "bare", "bay", "beach", "bear", "bell", "black", "bleak", "blind", "bone", "boulder", "bridge", "brine", "brittle", "bronze", "castle", "cave", "chill", "clay", "clear", "cliff", "cloud", "cold", "crag", "crow", "crystal", "curse", "dark", "dawn", "dead", "deep", "deer", "demon", "dew", "dim", "dire", "dirt", "dog", "dragon", "dry", "dusk", "dust", "eagle", "earth", "east", "ebon", "edge", "elder", "ember", "ever", "fair", "fall", "false", "far", "fay", "fear", "flame", "flat", "frey", "frost", "ghost", "glimmer", "gloom", "gold", "grass", "gray", "green", "grim", "grime", "hazel", "heart", "high", "hollow", "honey", "hound", "ice", "iron", "kil", "knight", "lake", "last", "light", "lime", "little", "lost", "mad", "mage", "maple", "mid", "might", "mill", "mist", "moon", "moss", "mud", "mute", "myth", "never", "new", "night", "north", "oaken", "ocean", "old", "ox", "pearl", "pine", "pond", "pure", "quick", "rage", "raven", "red", "rime", "river", "rock", "rogue", "rose", "rust", "salt", "sand", "scorch", "shade", "shadow", "shimmer", "shroud", "silent", "silk", "silver", "sleek", "sleet", "sly", "small", "smooth", "snake", "snow", "south", "spring", "stag", "star", "steam", "steel", "steep", "still", "stone", "storm", "summer", "sun", "swamp", "swan", "swift", "thorn", "timber", "trade", "west", "whale", "whit", "white", "wild", "wilde", "wind", "winter", "wolf"],
  ["acre", "band", "barrow", "bay", "bell", "born", "borough", "bourne", "breach", "break", "brook", "burgh", "burn", "bury", "cairn", "call", "chill", "cliff", "coast", "crest", "cross", "dale", "denn", "drift", "fair", "fall", "falls", "fell", "field", "ford", "forest", "fort", "front", "frost", "garde", "gate", "glen", "grasp", "grave", "grove", "guard", "gulch", "gulf", "hall", "hallow", "ham", "hand", "harbor", "haven", "helm", "hill", "hold", "holde", "hollow", "horn", "host", "keep", "land", "light", "maw", "meadow", "mere", "mire", "mond", "moor", "more", "mount", "mouth", "pass", "peak", "point", "pond", "port", "post", "reach", "rest", "rock", "run", "scar", "shade", "shear", "shell", "shield", "shore", "shire", "side", "spell", "spire", "stall", "wich", "minster", "star", "storm", "strand", "summit", "tide", "town", "vale", "valley", "vault", "vein", "view", "ville", "wall", "wallow", "ward", "watch", "water", "well", "wharf", "wick", "wind", "wood", "yard"],
];

export function randomSettlementName() {
  return [
    random.element(SETTLEMENT_NAME[0]),
    random.element(SETTLEMENT_NAME[1]),
  ].join('');
}

export function randomDeityName() {
  const deity = random.split(NPC_DEITIES.filter(d => d[1] !== 'None'));
  return `${random.split(NPC_DEITIES_NAMES[deity])} (${t(deity)})`;
}

export function randomSettlementImage(type, ...args) {
  return {
    village: randomVillageImage,
    town: randomTownImage,
    city: randomCityImage,
  }[type](...args);
}
