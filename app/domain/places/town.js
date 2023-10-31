import random from '../random';
import {
  COMMERCE,
  GOVERNMENTS,
  GOVERNMENT_SITUATION,
  PLACE_CALAMITY,
  PLACE_CARACTERISTICS,
  PLACE_KNOWN_FOR,
  RACE_RELATIONSHIPS,
  TOWN,
} from './places';

export function getTownAccommodation() {
  const numberOfTaverns = random.invExp(...TOWN.taverns);

  return Array.from(Array(numberOfTaverns), (_, i) => 'Tavern ' + i);
}

export function getTownAccommodationTranslation(accommodation = []) {
  return accommodation.join(', ');
}

export function getTownGovernment() {
  return [random.split(GOVERNMENTS), random.split(GOVERNMENT_SITUATION)];
}

export function getTownSecurity(population) {
  return random.roundTo(
    10,
    random.linearUniform({
      x: TOWN.population,
      y: TOWN.security,
      t: population,
    })
  );
}

export function getTownSecurityTranslation(security) {
  return security + ' guardias';
}

export function getTownCommerce() {
  return random.split(COMMERCE);
}

export function getTownReligion() {
  return {
    temple: random.split([
      [40, 1],
      [60, 2],
    ]),
    shrine: random.split([
      [40, 1],
      [60, 2],
    ]),
  };
}

export function getTownRaceRelationships() {
  return random.split(RACE_RELATIONSHIPS);
}

export function getTownPlaceCharacteristics() {
  return random.split([
    [50, null],
    [50, random.element(PLACE_CARACTERISTICS)],
  ]);
}

export function getTownKnownFor() {
  return random.split([
    [50, null],
    [50, random.element(PLACE_KNOWN_FOR)],
  ]);
}

export function getTownCalamity() {
  return random.split([
    [50, null],
    [50, random.split(PLACE_CALAMITY)],
  ]);
}
