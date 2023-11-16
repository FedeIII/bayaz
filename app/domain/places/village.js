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

function randomVillageImageOnce(files, population, accommodation, religion) {
  if (!files?.length) return 'no-image';

  const size =
    population < 100
      ? 'small'
      : population < 200
      ? random.split([
          [70, 'small'],
          [30, 'medium'],
        ])
      : population < 300
      ? random.split([
          [70, 'medium'],
          [30, 'big'],
        ])
      : random.split([
          [70, 'big'],
          [30, 'medium'],
        ]);

  const temple =
    religion.temples.length > 0
      ? random.split([
          [60, 'temple'],
          [40, ''],
        ])
      : '';

  const tavern = accommodation
    ? random.split([
        [60, 'tavern'],
        [40, ''],
      ])
    : '';

  return random.element(
    files.filter(
      file =>
        file.includes(size) && (file.includes(temple) || file.includes(tavern))
    )
  );
}

export function randomVillageImage(...args) {
  let image;
  while (!image) {
    image = randomVillageImageOnce(...args);
  }

  return 'village/' + image;
}
