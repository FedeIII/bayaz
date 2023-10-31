import random from '~/domain/random';

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

export const VILLAGE = {
  population: [20, 500],
  roundPopulation: 10,
  minPopulationForGuesthouse: 100,
  security: [2, 25],
};

export const TOWN = {
  population: [1000, 5000],
  roundPopulation: 500,
  security: [25, 150],
  taverns: [2, 6],
};

export const CITY = {
  population: [10000, 25000],
  roundPopulation: 5000,
  security: [200, 350],
  taverns: [5, 10],
  commerces: [2, 4],
};

export function getPopulation(PLACE) {
  const population = random.uniform(
    PLACE.population[0],
    PLACE.population[1] + PLACE.roundPopulation
  );
  return random.roundTo(PLACE.roundPopulation, population);
}

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

export const PLACE_CARACTERISTICS = [
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
