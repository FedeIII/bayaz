import { randomInteger } from '../random';
import { t } from '../translations';
import { NPC_NAMES } from './names/npcNames';
import { NPC_RACES, NPC_RACES_LIST } from './npcRaces';

export const RANDOM_TOTAL_WEIGHT = Object.values(NPC_RACES).reduce(
  (total, npcValues) => total + npcValues.probabilityWeight,
  0
);

function getRandomNpcRace(raceFilter) {
  let filteredRaces = NPC_RACES_LIST;
  if (raceFilter?.length) {
    filteredRaces = NPC_RACES_LIST.filter(race => raceFilter.includes(race));
  }
  const totalWeight = filteredRaces.reduce(
    (total, race) => total + NPC_RACES[race].probabilityWeight,
    0
  );
  let randomNumber = randomInteger(0, totalWeight);
  return filteredRaces.find(race => {
    if (randomNumber <= NPC_RACES[race].probabilityWeight) {
      return true;
    }

    randomNumber -= NPC_RACES[race].probabilityWeight;
    return false;
  });
}

function getRandomName(race, gender) {
  const numberOfGroups = NPC_RACES[race].names.length;
  const randomGroupIndex = randomInteger(0, numberOfGroups - 1);
  let namesOption = NPC_RACES[race].names[randomGroupIndex];

  const tablesOption = namesOption.includes('.')
    ? namesOption.split('.')[0]
    : namesOption;

  const namesGroup = NPC_NAMES[tablesOption].tables.filter(
    group =>
      group.option.toLowerCase().includes(gender.toLowerCase()) &&
      (!namesOption.includes('.') ||
        group.option
          .toLowerCase()
          .includes(namesOption.split('.')[1].toLowerCase()))
  );
  const randomSetIndex = randomInteger(0, namesGroup.length - 1);
  const names = namesGroup[randomSetIndex].table;
  const randomNameIndex = randomInteger(0, names.length - 1);
  return names[randomNameIndex].result;
}

export function createRandomNpc(filters) {
  const npcRace = getRandomNpcRace(filters.races);
  const npcGender =
    filters.genders.length === 1
      ? filters.genders[0]
      : Math.random() > 0.5
      ? 'Male'
      : 'Female';
  const npcName = getRandomName(npcRace, npcGender);
  return {
    race: t(npcRace),
    gender: t(npcGender),
    name: npcName,
  };
}
