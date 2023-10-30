import random, { randomInteger } from '../random';
import {
  NPC_BODY,
  NPC_EYES,
  NPC_FACE,
  NPC_HAIR,
  NPC_HANDS,
  NPC_JAW,
  NPC_JEWELRY,
  NPC_JEWELRY_GEMS,
  NPC_JEWELRY_MATERIAL,
  NPC_MOUTH,
  NPC_NOSE,
} from './attrs/npcAppearance';
import { NPC_CALM, NPC_MOOD, NPC_STRESS } from './attrs/npcBehavior';
import { NPC_NAMES } from './attrs/npcNames';
import { NPC_RACES, NPC_RACES_LIST } from './attrs/npcRaces';

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
  const namesOption = random.element(NPC_RACES[race].names);

  const tablesOption = namesOption.includes('.')
    ? namesOption.split('.')[0]
    : namesOption;

  let namesGroup;
  if (NPC_NAMES[tablesOption].tables.length === 1) {
    namesGroup = NPC_NAMES[tablesOption].tables;
  } else {
    namesGroup = NPC_NAMES[tablesOption].tables.filter(
      group =>
        group.option.toLowerCase().includes(gender.toLowerCase()) &&
        (!namesOption.includes('.') ||
          group.option
            .toLowerCase()
            .includes(namesOption.split('.')[1].toLowerCase()))
    );
  }

  const names = random.element(namesGroup).table;
  return random.element(names).result;
}

function getAlignment() {
  const lnc = random.split([
    [40, 'L'],
    [40, 'N'],
    [20, 'C'],
  ]);
  const gne = random.split([
    [30, 'G'],
    [60, 'N'],
    [10, 'E'],
  ]);

  return [lnc, gne];
}

function getAppearance() {
  return [
    ...random.select([
      [60, NPC_HAIR],
      [40, NPC_EYES],
      [30, NPC_FACE],
    ]),
    ...random.shuffle(
      random.select([
        [10, NPC_MOUTH],
        [10, NPC_NOSE],
        [10, NPC_JAW],
      ])
    ),
    ...random.select([
      [70, NPC_BODY],
      [10, NPC_HANDS],
      [
        20,
        NPC_JEWELRY.map(jewelry => {
          let material = random.element(NPC_JEWELRY_MATERIAL);
          if (material === 'gemas') material = random.element(NPC_JEWELRY_GEMS);
          return `${jewelry} de ${material}`;
        }),
      ],
    ]),
  ].map(attrList => random.element(attrList));
}

function getMood() {
  return random.element(NPC_MOOD);
}

function getCalmBehavior() {
  return random.element(NPC_CALM);
}

function getStressBehavior() {
  return random.element(NPC_STRESS);
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
    race: npcRace,
    gender: npcGender,
    name: npcName,
    alignment: getAlignment(),
    looks: getAppearance(),
    behavior: {
      mood: getMood(),
      calm: getCalmBehavior(),
      stress: getStressBehavior(),
    },
  };
}
