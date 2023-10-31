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
