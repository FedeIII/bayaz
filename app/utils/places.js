import random from '~/utils/random';

export const VILLAGE = {
  minPopulation: 20,
  maxPopulation: 500,
  roundPopulation: 10,
  minPopulationForGuesthouse: 100,
  minSecurity: 2,
  maxSecurity: 25,
};

export const TOWN = {
  minPopulation: 1000,
  maxPopulation: 5000,
  roundPopulation: 500,
  minSecurity: 25,
  maxSecurity: 150,
  minTaverns: 2,
  maxTaverns: 6,
  governments: [
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
  ],
  comerce: [
    [10, 'FISHING'],
    [7, 'TRADING'],
    [5, 'WOODWORK'],
    [10, 'STEELWORK'],
    [2, 'MAGIC'],
    [5, 'MINING'],
  ],
};

export const CITY = {
  minPopulation: 10000,
  maxPopulation: 25000,
  roundPopulation: 5000,
  minSecurity: 200,
  maxSecurity: 350,
  governments: [
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
  ],
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

export function getComerceTranslation(comerce) {
  switch (comerce) {
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
    PLACE.minPopulation,
    PLACE.maxPopulation + PLACE.roundPopulation
  );
  return random.roundTo(PLACE.roundPopulation, population);
}
