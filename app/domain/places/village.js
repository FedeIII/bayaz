import random from '../random';
import { VILLAGE, randomDeityName, randomInnName } from './places';

const noOp = () => {};

export function getVillageAccommodation(population) {
  return (
    population > VILLAGE.minPopulationForGuesthouse
      ? random.element([undefined, randomInnName])
      : undefined
  )?.();
}

export function getVillageGovernment() {
  return random.split([
    [50, true],
    [50, false],
  ]);
}

export function getVillageSecurity(population) {
  const security = {};

  const securityAmount = random.roundTo(
    1,
    random.linearUniform({
      x: VILLAGE.population,
      y: VILLAGE.security,
      t: population,
    })
  );

  random.split([
    [50, () => (security.guards = securityAmount)],
    [50, () => (security.militia = securityAmount)],
  ]);

  return security;
}

export function getVillageReligion() {
  let numberOfTemples = 0;
  let numberOfShrines = 0;
  random.split([
    [50, noOp],
    [25, () => (numberOfTemples += 1)],
    [25, () => (numberOfShrines += 1)],
  ]);
  random.split([
    [50, noOp],
    [25, () => (numberOfTemples += 1)],
    [25, () => (numberOfShrines += 1)],
  ]);
  return {
    temples: Array.from(Array(numberOfTemples), randomDeityName),
    shrines: Array.from(Array(numberOfShrines), randomDeityName),
  };
}
