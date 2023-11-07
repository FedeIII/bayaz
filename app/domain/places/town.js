import random from '../random';
import {
  COMMERCE,
  GOVERNMENTS,
  GOVERNMENT_SITUATION,
  PLACE_CALAMITY,
  PLACE_CHARACTERISTICS,
  PLACE_KNOWN_FOR,
  RACE_RELATIONSHIPS,
  TOWN,
  randomDeityName,
  randomInnNames,
} from './places';

const noOp = () => {};

export function getTownAccommodation() {
  const numberOfTaverns = random.invExp(...TOWN.taverns);

  return randomInnNames(numberOfTaverns);
}

export function getTownGovernment() {
  return [random.split(GOVERNMENTS), random.split(GOVERNMENT_SITUATION)];
}

export function getTownSecurity(population) {
  return random.roundTo(
    5,
    random.linearUniform({
      x: TOWN.population,
      y: TOWN.security,
      t: population,
    })
  );
}

export function getTownCommerce() {
  return random.split(COMMERCE);
}

export function getTownReligion() {
  const numberOfTemples = random.split([
    [40, 1],
    [60, 2],
  ]);
  const numberOfShrines = random.split([
    [40, 1],
    [60, 2],
  ]);
  return {
    temples: Array.from(Array(numberOfTemples), randomDeityName),
    shrines: Array.from(Array(numberOfShrines), randomDeityName),
  };
}

export function getTownMagicShops(population) {
  return random.roundTo(
    1,
    random.linearUniform({
      x: TOWN.population,
      y: TOWN.magicShops,
      t: population,
    })
  );
}

export function getTownRaceRelationships() {
  return random.split(RACE_RELATIONSHIPS);
}

export function getTownPlaceCharacteristics() {
  return random.split([
    [50, undefined],
    [50, random.element(PLACE_CHARACTERISTICS)],
  ]);
}

export function getTownKnownFor() {
  return random.split([
    [50, undefined],
    [50, random.element(PLACE_KNOWN_FOR)],
  ]);
}

export function getTownCalamity() {
  return random.split([
    [50, undefined],
    [50, random.split(PLACE_CALAMITY)],
  ]);
}

function randomSizeComponent(population) {
  return (population === 1000
    ? random.split([
        [70, 'small'],
        [30, 'medium'],
      ])
    : population < 2500
    ? random.split([
        [70, 'medium'],
        [30, 'big'],
      ])
    : random.split([
        [70, 'big'],
        [30, 'medium'],
      ]));
}

function randomTavernComponent(accommodation, commerces, placeCharacteristics) {
  return accommodation.length > 3 ||
    commerces === 'TRADING' ||
    [
      'Importante núcleo comercial',
      'Centro del comercio de un bien en concreto',
    ].includes(placeCharacteristics)
    ? random.split([
        [60, 'tavern'],
        [40, ''],
      ])
    : '';
}

function randomCastleComponent(government, placeCharacteristics) {
  return [
    'DICTATORSHIP',
    'FEUDALISM',
    'MAGOCRACY',
    'MILITOCRACY',
    'PLUTOCRACY',
  ].includes(government[0]) ||
    [
      'Tirano temido',
      'Dominados o controlados por un monstruo poderoso',
      'Cábala que se hizo con el poder abiertamente',
      'En su lecho de muerte, los herederos compiten por el poder',
    ].includes(government[1]) ||
    [
      'Gran fortaleza',
      'Biblioteca o archivos de importancia',
      'Academia o biblioteca reputadas',
    ].includes(placeCharacteristics)
    ? random.split([
        [70, 'castle'],
        [30, ''],
      ])
    : '';
}

function randomWaterComponent(commerces, placeCharacteristics) {
  const water = [];
  if (commerces === 'FISHING') {
    random.split([
      [50, () => water.push('coast')],
      [50, noOp],
    ]);
  }
  if (
    commerces === 'FISHING' ||
    ['Canales en lugar de calles', 'Un río divide la población'].includes(
      placeCharacteristics
    )
  ) {
    random.split([
      [70, () => water.push('river')],
      [30, noOp],
    ]);
  }
  return water;
}

function randomTempleComponent(religion, government, placeCharacteristics) {
  return religion.temples.length === 2 ||
    government[0] === 'TEOCRACY' ||
    [
      'Templo grandioso',
      'Lugar en el que se produjo un evento mítico o mágico',
      'Biblioteca o archivos de importancia',
      'Academia o biblioteca reputadas',
      'Cementerio o mausoleo importante',
    ].includes(placeCharacteristics)
    ? random.split([
        [60, 'temple'],
        [40, ''],
      ])
    : '';
}

function randomTownImageOnce(
  files,
  population,
  accommodation,
  government,
  commerces,
  religion,
  placeCharacteristics
) {
  const size = randomSizeComponent(population);
  const tavern = randomTavernComponent(
    accommodation,
    commerces,
    placeCharacteristics
  );
  const castle = randomCastleComponent(government, placeCharacteristics);
  const water = randomWaterComponent(commerces, placeCharacteristics);
  const temple = randomTempleComponent(
    religion,
    government,
    placeCharacteristics
  );

  return random.element(
    files.filter(
      file =>
        file.includes(size) &&
        (file.includes(tavern) ||
          file.includes(temple) ||
          water.reduce(
            (inc, waterSource) => inc || file.includes(waterSource),
            false
          ) ||
          file.includes(castle))
    )
  );
}

export function randomTownImage(...args) {
  let image;
  while (!image) {
    image = randomTownImageOnce(...args);
  }

  return image;
}
