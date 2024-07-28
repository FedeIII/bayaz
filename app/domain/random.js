import { removeItem } from '~/utils/array';

///////////
// TESTS //
///////////

// var map = {};
// for (var i = 0; i < 100000; i++) {
//   var num = random.invExp(0, 4);
//   map[num] = map[num] || 0;
//   map[num]++;
// }

// Object.keys(map).forEach((key) => {
//   map[key] *= 1 / 1000;
// });

// console.log('map', map);

function uniform(min, max) {
  return (max - min) * Math.random() + min;
}

export function randomInteger(min, max) {
  return Math.floor(uniform(min, max + 1));
}

// select one
function split(actions) {
  const maxWeight = actions.reduce((total, action) => {
    return total + action[0];
  }, 0);

  const chance = Math.random() * maxWeight;

  let addedChance = 0;
  for (let action of actions) {
    addedChance += action[0];
    if (chance <= addedChance)
      return typeof action[1] === 'function' ? action[1]() : action[1];
  }

  throw new Error(`No action was executed`);
}

// select multiple
function select(actions) {
  return actions.reduce((selectedActions, action) => {
    const chance = Math.random() * 100;
    return chance <= action[0]
      ? [...selectedActions, action[1]]
      : selectedActions;
  }, []);
}

function linearUniform({ x, y, t }) {
  if (typeof t === 'undefined') t = uniform(...x);

  const m = (y[1] - y[0]) / (x[1] - x[0]);
  const n = y[0] - m * x[0];

  return m * t + n;
}

function invExp(xMin, xMax) {
  // e^-3 = 0.05 (min probability)
  // e^-0 = 1 (max probability)
  //
  //      -(1/(M-m) * 3 * (x-m))
  // y = e
  //
  // y ∈ [0.05, 1]
  // x ∈ [xMin, xMax]
  //
  // That is an inverse exponential distribution where the elements in [xMin, xMax]
  // map into [0.05, 1].
  // xMax is considered an integer. Because we are rounding down, to map the whole range
  // of numbers with integer part |xMax| into a 0.05 probability of appearing, we operate
  // with the next integer as our xMax.
  //
  // We pick a random y and calculate the corresponding integer x inside the [xMin, xMax]
  // range that corresponds to it

  const xMaxPlus1 = xMax + 1;

  const y = uniform(0.05, 1);
  const x = xMin - (1 / 3) * (xMin - xMaxPlus1) * Math.log(1 / y);
  return roundTo(1, x);
}

function monsterDistribution() {
  const rn = 100 * Math.random();
  if (rn < 10) return 1;
  if (rn < 20) return 2;
  if (rn < 50) return 3;
  if (rn < 70) return 4;
  if (rn < 75) return 5;
  if (rn < 80) return 6;
  if (rn < 83) return 7;
  if (rn < 85) return 8;
  if (rn < 87) return 9;
  if (rn < 89) return 10;
  if (rn < 91) return 11;
  if (rn < 92) return 12;
  if (rn < 93) return 13;
  if (rn < 94) return 14;
  if (rn < 95) return 15;
  if (rn < 96) return 16;
  if (rn < 97) return 17;
  if (rn < 98) return 18;
  if (rn < 99) return 19;
  return 20;
}

function roundTo(amoutToRoundTo, number) {
  return Math.round(number * (1 / amoutToRoundTo)) / (1 / amoutToRoundTo);
}

function extractRandomElement(list) {
  const randomElement = element(list);
  return [randomElement, removeItem(el => el === randomElement, list)];
}

function shuffleList(shuffledList, list) {
  if (list.length === 0) return shuffledList;
  const [randomElement, restList] = extractRandomElement(list);
  const newShuffledList = [...shuffledList, randomElement];
  if (restList.length === 0) return newShuffledList;
  return shuffleList(newShuffledList, restList);
}

function shuffle(list) {
  return shuffleList([], list);
}

function element(list) {
  const randomIndex = randomInteger(0, list.length - 1);
  return list[randomIndex];
}

//////////
// ROLL //
//////////

function dieRoll(numberOfFaces) {
  return Math.ceil(Math.random() * numberOfFaces);
}

function getNumberOfDice(command) {
  const numberOfDice = command.substring(0, command.indexOf('D'));
  return Number(numberOfDice) || 1;
}

function getNumberOfFaces(command) {
  const indexOfD = command.indexOf('D');

  let endIndexForFaces = command.length;
  const indexOfDiceSelector = command.search(/[RP]/);
  const indexOfModifier = command.search(/[+-]/);
  if (indexOfDiceSelector !== -1) endIndexForFaces = indexOfDiceSelector;
  else if (indexOfModifier !== -1) endIndexForFaces = indexOfModifier;

  const numberOfFaces = command.substring(indexOfD + 1, endIndexForFaces);
  return Number(numberOfFaces) || 0;
}

function getNumberOfSelectedDice(command, selector) {
  const indexOfRemovedDice = command.indexOf(selector);
  if (indexOfRemovedDice === -1) return null;

  const indexOfModifier = command.search(/[+-]/);

  let endIndexForRemovedDice = command.length;

  if (indexOfModifier !== -1) endIndexForRemovedDice = indexOfModifier;

  const numberOfSelectedDice = command.substring(
    indexOfRemovedDice + 1,
    endIndexForRemovedDice
  );
  return Number(numberOfSelectedDice) || 0;
}

function getModifier(command) {
  const indexOfModifier = command.search(/[+-]/);

  if (indexOfModifier === -1) return null;

  const modifier = command.substring(indexOfModifier);
  return Number(modifier) || 0;
}

function processCommand(command) {
  const normalizedCommand = command
    .replace(' ', '')
    .replace('d', 'D')
    .replace('r', 'R')
    .replace('p', 'P');

  const numberOfDice = getNumberOfDice(normalizedCommand);
  const numberOfFaces = getNumberOfFaces(normalizedCommand);
  const numberOfRemovedDice = getNumberOfSelectedDice(normalizedCommand, 'R');
  const numberOfPickedDice = getNumberOfSelectedDice(normalizedCommand, 'P');
  const modifier = getModifier(normalizedCommand);

  const rolls = [...Array(numberOfDice)].map((_, i) => ({
    i,
    faces: numberOfFaces,
    value: dieRoll(numberOfFaces),
  }));

  return {
    rolls,
    modifier,
    remove: numberOfRemovedDice,
    pick: numberOfPickedDice,
  };
}

function getPickIndices(rolls, pick) {
  const sortedRolls = rolls
    .slice()
    .sort((roll1, roll2) => roll2.value - roll1.value);

  return sortedRolls.slice(0, pick).map(roll => roll.i);
}

function getRemoveIndices(rolls, remove) {
  const sortedRolls = rolls
    .slice()
    .sort((roll1, roll2) => roll1.value - roll2.value);

  return sortedRolls.slice(remove).map(roll => roll.i);
}

function getUsedIndices(result) {
  const { rolls, remove, pick } = result;

  if (pick) {
    return getPickIndices(rolls, pick);
  } else if (remove) {
    return getRemoveIndices(rolls, remove);
  } else {
    return Array.from(rolls, (_, i) => i);
  }
}

function calculateResult(result) {
  const { rolls, modifier } = result;

  const usedIndices = getUsedIndices(result);

  return rolls.reduce(
    (total, roll) =>
      usedIndices.includes(roll.i) ? total + roll.value : total,
    modifier
  );
}

export function rollDice(command) {
  const result = processCommand(command);
  return calculateResult(result);
}

const API = {
  split,
  element,
  select,
  linearUniform,
  invExp,
  uniform,
  monsterDistribution,
  roundTo,
  shuffle,
  roll: {
    processCommand,
    calculateResult,
    getUsedIndices,
  },
};

export default API;
