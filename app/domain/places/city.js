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
