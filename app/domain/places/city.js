import { t } from '~/domain/translations';
import random from '../random';
import {
  CITY,
  COMMERCE,
  GOVERNMENTS,
  GOVERNMENT_SITUATION,
  PLACE_CALAMITY,
  PLACE_CHARACTERISTICS,
  PLACE_KNOWN_FOR,
  RACE_RELATIONSHIPS,
  randomDeityName,
  randomInnNames,
} from './places';

const noOp = () => {};

export function getCityAccommodation() {
  const numberOfTaverns = random.invExp(...CITY.taverns);

  return randomInnNames(numberOfTaverns);
}

export function getCityGovernment() {
  return [random.split(GOVERNMENTS), random.split(GOVERNMENT_SITUATION)];
}

export function getCitySecurity(population) {
  return random.roundTo(
    10,
    random.linearUniform({
      x: CITY.population,
      y: CITY.security,
      t: population,
    })
  );
}

export function getCitySecurityTranslation(security) {
  return security + ' guardias';
}

export function getCityCommerces() {
  const numberOfCommerces = random.invExp(...CITY.commerces);
  const commerces = [];
  while (commerces.length < numberOfCommerces) {
    const newCommerce = random.split(COMMERCE);
    if (!commerces.includes(newCommerce)) commerces.push(newCommerce);
  }

  return commerces;
}

export function getCityCommercesTranslation(commerces = []) {
  return commerces.map(t).join(', ');
}

export function getCityReligion() {
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

export function getCityMagicShops(population) {
  return random.roundTo(
    1,
    random.linearUniform({
      x: CITY.population,
      y: CITY.magicShops,
      t: population,
    })
  );
}

export function getCityRaceRelationships() {
  return random.split(RACE_RELATIONSHIPS);
}

export function getCityPlaceCharacteristics() {
  return random.split([
    [50, undefined],
    [50, random.element(PLACE_CHARACTERISTICS)],
  ]);
}

export function getCityKnownFor() {
  return random.split([
    [50, undefined],
    [50, random.element(PLACE_KNOWN_FOR)],
  ]);
}

export function getCityCalamity() {
  return random.split([
    [50, undefined],
    [50, random.split(PLACE_CALAMITY)],
  ]);
}

function randomSizeComponent(population) {
  return population <= 7000
    ? random.split([
        [70, 'small'],
        [30, 'medium'],
      ])
    : population < 11000
    ? random.split([
        [70, 'medium'],
        [30, 'big'],
      ])
    : random.split([
        [70, 'big'],
        [30, 'medium'],
      ]);
}

function randomTavernComponent(accommodation, commerces, placeCharacteristics) {
  return [
    accommodation.length > 5,
    commerces.includes('TRADING'),
    [
      'Importante núcleo comercial',
      'Centro del comercio de un bien en concreto',
    ].includes(placeCharacteristics),
  ].filter(v => v).length;
}

function randomCastleComponent(government, placeCharacteristics) {
  return [
    [
      'DICTATORSHIP',
      'FEUDALISM',
      'MAGOCRACY',
      'MILITOCRACY',
      'PLUTOCRACY',
    ].includes(government[0]),
    [
      'Tirano temido',
      'Dominados o controlados por un monstruo poderoso',
      'Cábala que se hizo con el poder abiertamente',
      'En su lecho de muerte, los herederos compiten por el poder',
    ].includes(government[1]),
    [
      'Gran fortaleza',
      'Biblioteca o archivos de importancia',
      'Academia o biblioteca reputadas',
    ].includes(placeCharacteristics),
  ].filter(v => v).length;
}

function randomWaterComponent(commerces, placeCharacteristics) {
  return {
    coast: commerces.includes('FISHING') ? 1 : 0,
    river: [
      commerces.includes('FISHING'),
      ['Canales en lugar de calles', 'Un río divide la población'].includes(
        placeCharacteristics
      ),
    ].filter(v => v).length,
  };
}

function randomTempleComponent(religion, government, placeCharacteristics) {
  return [
    religion.temples.length === 2,
    government[0] === 'TEOCRACY',
    [
      'Templo grandioso',
      'Lugar en el que se produjo un evento mítico o mágico',
      'Biblioteca o archivos de importancia',
      'Academia o biblioteca reputadas',
      'Cementerio o mausoleo importante',
    ].includes(placeCharacteristics),
  ].filter(v => v).length;
}

function randomCityImageOnce({
  files,
  population,
  accommodation,
  government,
  commerces,
  religion,
  placeCharacteristics,
}) {
  if (!files?.length) return 'no-image';

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
        (file.includes(
          random.split([
            [tavern, 'tavern'],
            [1, ''],
          ])
        ) ||
          file.includes(
            random.split([
              [temple, 'temple'],
              [1, ''],
            ])
          ) ||
          file.includes(
            random.split([
              [water.coast, 'coast'],
              [1, ''],
            ])
          ) ||
          file.includes(
            random.split([
              [water.river, 'river'],
              [1, ''],
            ])
          ) ||
          file.includes(
            random.split([
              [castle, 'castle'],
              [1, ''],
            ])
          ))
    )
  );
}

export function randomCityImage(...args) {
  let image;
  while (!image) {
    image = randomCityImageOnce(...args);
  }

  return image;
}
