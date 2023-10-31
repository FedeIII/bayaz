import { NPC_DEITIES, NPC_DEITIES_NAMES } from '../npc/attrs/npcFaith';
import random from '../random';
import { t } from '../translations';
import { VILLAGE, randomInnName } from './places';

const noOp = () => {};

export function getVillageAccommodation(population) {
  return (
    population > VILLAGE.minPopulationForGuesthouse
      ? random.element([null, randomInnName])
      : null
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
  const religion = {
    temple: 0,
    shrine: 0,
  };
  random.split([
    [50, noOp],
    [25, () => (religion.temple += 1)],
    [25, () => (religion.shrine += 1)],
  ]);
  random.split([
    [50, noOp],
    [25, () => (religion.temple += 1)],
    [25, () => (religion.shrine += 1)],
  ]);
  return religion;
}

export function getVillageReligionTranslation(religion) {
  const { temple, shrine } = religion;

  return (
    <>
      {temple === 2 ? 'Dos templos' : temple === 1 ? 'Un templo' : null}
      {temple && shrine ? ' y ' : null}
      {shrine === 2
        ? 'Dos santuarios'
        : shrine === 1
        ? 'Un santuario'
        : null} a{' '}
      {Array.from(Array(temple + shrine))
        .map(() => {
          const deity = random.split(NPC_DEITIES.filter(d => d[1] !== 'None'));
          return `${random.split(NPC_DEITIES_NAMES[deity])} (${t(deity)})`;
        })
        .join(' y ')}
    </>
  );
}
