import random from '../random';
import { COMMERCE, GOVERNMENTS, TOWN } from './places';

export function getTownAccommodation() {
  const numberOfTaverns = random.invExp(...TOWN.taverns);

  return Array.from(Array(numberOfTaverns), (_, i) => 'Tavern ' + i);
}

export function getTownAccommodationTranslation(accommodation = []) {
  return accommodation.join(', ');
}

export function getTownGovernment() {
  return random.split(GOVERNMENTS);
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
