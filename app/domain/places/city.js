import { t } from '~/domain/translations';
import random from '../random';
import { CITY, COMMERCE, GOVERNMENTS } from './places';

export function getCityAccommodation() {
  const numberOfTaverns = random.invExp(...CITY.taverns);

  return Array.from(Array(numberOfTaverns), (_, i) => 'Tavern ' + i);
}

export function getCityAccommodationTranslation(accommodation = []) {
  return accommodation.join(', ');
}

export function getCityGovernment() {
  return random.split(GOVERNMENTS);
}

export function getTownSecurity(population) {
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
