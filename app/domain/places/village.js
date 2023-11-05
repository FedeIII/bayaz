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

export function randomVillageImage(files, population, accommodation, religion) {
  const size =
    population < 100
      ? random.split([
          [85, 'small'],
          [15, 'medium'],
        ])
      : population < 300
      ? random.split([
          [85, 'medium'],
          [15, 'big'],
        ])
      : random.split([
          [85, 'big'],
          [15, 'medium'],
        ]);

  const temple =
    religion.temples.length > 0
      ? random.split([
          [75, 'temple'],
          [25, ''],
        ])
      : '';

  const tavern = accommodation
    ? random.split([
        [70, 'tavern'],
        [30, ''],
      ])
    : '';

  return random.element(
    files.filter(
      file =>
        file.includes(size) && file.includes(temple) && file.includes(tavern)
    )
  );
}
