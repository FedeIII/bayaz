import random from "~/utils/random";

export const VILLAGE = {
  minPopulation: 20,
  maxPopulation: 500,
  roundPopulation: 10,
  minSecurity: 2,
  maxSecurity: 25,
};

export const TOWN = {
  minPopulation: 1000,
  maxPopulation: 5000,
  roundPopulation: 500,
};

export const CITY = {
  minPopulation: 10000,
  maxPopulation: 25000,
  roundPopulation: 5000,
};

export function getPopulation(PLACE) {
  const population = random.uniform(PLACE.minPopulation, PLACE.maxPopulation);
  return random.roundTo(PLACE.roundPopulation, population);
}

