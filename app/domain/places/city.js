import { t } from '~/domain/translations';
import random from '../random';
import {
  CITY,
  COMMERCE,
  GOVERNMENTS,
  GOVERNMENT_SITUATION,
  PLACE_CALAMITY,
  PLACE_CARACTERISTICS,
  PLACE_KNOWN_FOR,
  RACE_RELATIONSHIPS,
  randomInnName,
} from './places';

export function getCityAccommodation() {
  const numberOfTaverns = random.invExp(...CITY.taverns);

  return Array.from(Array(numberOfTaverns), randomInnName);
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
  return {
    temple: random.split([
      [33, 2],
      [33, 3],
      [33, 4],
    ]),
    shrine: random.split([
      [33, 2],
      [33, 3],
      [33, 4],
    ]),
  };
}

export function getCityRaceRelationships() {
  return random.split(RACE_RELATIONSHIPS);
}

export function getCityPlaceCharacteristics() {
  return random.split([
    [50, null],
    [50, random.element(PLACE_CARACTERISTICS)],
  ]);
}

export function getCityKnownFor() {
  return random.split([
    [50, null],
    [50, random.element(PLACE_KNOWN_FOR)],
  ]);
}

export function getCityCalamity() {
  return random.split([
    [50, null],
    [50, random.split(PLACE_CALAMITY)],
  ]);
}
