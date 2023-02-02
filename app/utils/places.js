import random from '~/utils/random';

export const COMMERCE = [
  [10, 'FISHING'],
  [7, 'TRADING'],
  [5, 'WOODWORK'],
  [10, 'STEELWORK'],
  [2, 'MAGIC'],
  [5, 'MINING'],
];

export const GOVERNMENTS = [
  [3, 'DEMOCRACY'],
  [5, 'DICTATORSHIP'],
  [15, 'FEUDALISM'],
  [2, 'GERONTOCRACY'],
  [3, 'MAGOCRACY'],
  [6, 'MILITOCRACY'],
  [4, 'OLIGARCHY'],
  [3, 'MERITOCRACY'],
  [2, 'PLUTOCRACY'],
  [7, 'REPUBLIC'],
  [5, 'TEOCRACY'],
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

export function getGovernmentTranslation(government) {
  switch (government) {
    case 'DEMOCRACY':
      return 'Democracia';
    case 'DICTATORSHIP':
      return 'Dictadura';
    default:
    case 'FEUDALISM':
      return 'Feudal';
    case 'GERONTOCRACY':
      return 'Gerontocracia';
    case 'MAGOCRACY':
      return 'Magocracia';
    case 'MILITOCRACY':
      return 'Militocracia';
    case 'OLIGARCHY':
      return 'Oligarquía';
    case 'MERITOCRACY':
      return 'Meritocracia';
    case 'PLUTOCRACY':
      return 'Plutarquía';
    case 'REPUBLIC':
      return 'República';
    case 'TEOCRACY':
      return 'Teocracia';
  }
}

export function getCommerceTranslation(commerce) {
  switch (commerce) {
    case 'FISHING':
      return 'Pesca';
    case 'TRADING':
      return 'Bienes manufacturados';
    case 'WOODWORK':
      return 'Carpintería';
    default:
    case 'STEELWORK':
      return 'Herrería';
    case 'MAGIC':
      return 'Magia';
    case 'MINING':
      return 'Minería';
  }
}

export function getPopulation(PLACE) {
  const population = random.uniform(
    PLACE.population[0],
    PLACE.population[1] + PLACE.roundPopulation
  );
  return random.roundTo(PLACE.roundPopulation, population);
}
