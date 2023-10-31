import random, { randomInteger } from '../random';
import { t } from '../translations';
import {
  randomCentaurName,
  randomDragonbornName,
  randomDwarfName,
  randomElfName,
  randomFairyName,
  randomGnomeName,
  randomGoblinName,
  randomHalflingName,
  randomHumanName,
  randomHumanSurname,
  randomKoboldName,
  randomKoboldSurname,
  randomMinotaurName,
  randomOrcName,
  randomSatyrName,
  randomTieflingSurname,
} from './attrs/comboNpcNames';
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
import {
  NPC_BONDS,
  NPC_CALM,
  NPC_EXTREME_ABILITIES,
  NPC_FLAWS,
  NPC_IDEALS,
  NPC_MOOD,
  NPC_PREJUDICES,
  NPC_STRESS,
  NPC_TALENTS,
} from './attrs/npcBehavior';
import {
  NPC_DEITIES,
  NPC_DEITIES_NAMES,
  NPC_FAITH_DESCRIPTION,
} from './attrs/npcFaith';
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
  if (!NPC_NAMES[tablesOption]) {
    namesGroup == null;
  } else if (NPC_NAMES[tablesOption].tables.length === 1) {
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

  let randomName;

  if (namesGroup) {
    const names = random.element(namesGroup).table;
    randomName = random.element(names).result;
  }

  if (tablesOption === 'Elf') {
    const surenamesGroup = NPC_NAMES[tablesOption].tables[3];
    randomName += ' ' + random.element(surenamesGroup.table).result;
    return random.element([randomName, randomElfName(gender)]);
  }

  if (tablesOption === 'Dragonborn') {
    return random.element([randomName, randomDragonbornName()]);
  }

  if (tablesOption === 'Dwarf') {
    const surenamesGroup1 = NPC_NAMES[tablesOption].tables[2];
    const surenamesGroup2 = NPC_NAMES[tablesOption].tables[3];
    randomName +=
      ' ' +
      random.element([...surenamesGroup1.table, surenamesGroup2.table]).result;
    return random.element([randomName, randomDwarfName(gender)]);
  }

  if (tablesOption === 'Gnome') {
    const surenamesGroup = NPC_NAMES[tablesOption].tables[2];
    randomName += ' ' + random.element(surenamesGroup.table).result;
    return random.element([randomName, randomGnomeName(gender)]);
  }

  if (tablesOption === 'Half-Orc') {
    return random.element([randomName, randomOrcName(gender)]);
  }

  if (tablesOption === 'Halfling') {
    const surenamesGroup = NPC_NAMES[tablesOption].tables[2];
    randomName += ' ' + random.element(surenamesGroup.table).result;
    return random.element([randomName, randomHalflingName(gender)]);
  }

  if (tablesOption === 'Human') {
    const surname = randomHumanSurname();
    randomName += ' ' + surname;
    return random.element([
      randomName,
      randomHumanName(gender) + ' ' + surname,
    ]);
  }

  if (tablesOption === 'Lizardfolk') {
    randomName.replace(/ \(.+\)/, '');
    const surname = randomKoboldSurname();
    return random.element([
      randomName,
      randomKoboldName(gender) + ' ' + surname,
    ]);
  }

  if (tablesOption === 'Tiefling') {
    randomName += ' ' + randomTieflingSurname();
  }

  if (tablesOption === 'Goblin') {
    return randomGoblinName(gender);
  }

  if (tablesOption === 'Satyr') {
    return randomSatyrName(gender);
  }

  if (tablesOption === 'Fairy') {
    return randomFairyName(gender);
  }

  if (tablesOption === 'Minotaur') {
    return randomMinotaurName(gender);
  }

  if (tablesOption === 'Centaur') {
    return randomCentaurName(gender);
  }

  return randomName;
}

function getRandomAlignment() {
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

function getRandomAppearance() {
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
      [25, NPC_EXTREME_ABILITIES.high],
      [25, NPC_EXTREME_ABILITIES.low],
    ]),
  ].map(attrList => random.element(attrList));
}

function getRandomMood() {
  return random.element(NPC_MOOD);
}

function getRandomCalmBehavior() {
  return random.element(NPC_CALM);
}

function getRandomStressBehavior() {
  return random.element(NPC_STRESS);
}

function getRandomDeity(deitiesFilter) {
  if (!deitiesFilter || deitiesFilter.length === 0)
    return random.split(NPC_DEITIES);
  return random.split(
    NPC_DEITIES.filter(([_, deity]) => deitiesFilter.includes(deity))
  );
}

function getRandomFaithDescription(deity) {
  return deity === 'None' ? null : random.element(NPC_FAITH_DESCRIPTION);
}

function getRandomDeityName(deity) {
  return random.split(NPC_DEITIES_NAMES[deity]);
}

function getRandomPrejudice(npcGender) {
  let prejudice = '';
  const prejudiceSet = random.element(NPC_PREJUDICES);
  if (prejudiceSet[0] === 'Género contrario')
    prejudice += `Prejuicio contra género ${
      npcGender === 'Male' ? t('Female') : t('Male')
    }`;
  if (prejudiceSet[1].length)
    prejudice += `Prejuicio contra ${random
      .element(prejudiceSet[1])
      .toLowerCase()}`;

  return prejudice;
}

function getRandomFlawDescription() {
  return random.element(NPC_FLAWS);
}

function getRandomFlaws(npcGender) {
  let flaws = '';
  flaws += getRandomPrejudice(npcGender);
  if (Math.random() <= 0.5) {
    flaws += flaws.length ? '. ' : '';
    flaws += getRandomFlawDescription(npcGender);
  }
  flaws += '.';
  return flaws;
}

function getRandomTalent() {
  return random.split([
    [80, null],
    [20, random.element(NPC_TALENTS)],
  ]);
}

function getRandomIdeals(alignment) {
  return random.element(
    ...alignment.map(el => [...NPC_IDEALS[el], ...NPC_IDEALS.O])
  );
}

function getRandomBonds() {
  return random.element(NPC_BONDS);
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
  const deity = getRandomDeity(filters.deities);
  const npcAlignment = getRandomAlignment();

  return {
    race: npcRace,
    gender: npcGender,
    name: npcName,
    alignment: npcAlignment,
    looks: getRandomAppearance(),
    behavior: {
      mood: getRandomMood(),
      calm: getRandomCalmBehavior(),
      stress: getRandomStressBehavior(),
    },
    faith: {
      deity: deity,
      description: getRandomFaithDescription(deity),
      deityName: getRandomDeityName(deity),
    },
    ideals: getRandomIdeals(npcAlignment),
    bonds: getRandomBonds(),
    flaws: getRandomFlaws(npcGender),
    talent: getRandomTalent(),
  };
}
