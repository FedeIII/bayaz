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
