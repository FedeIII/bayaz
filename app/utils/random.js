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

function roundTo(amoutToRoundTo, number) {
  return Math.floor(number * (1 / amoutToRoundTo)) / (1 / amoutToRoundTo);
}

function dieRoll(numberOfFaces) {
  return Math.ceil(Math.random() * numberOfFaces);
}

const API = {
  split,
  linearUniform,
  invExp,
  uniform,
  roundTo,
  dieRoll,
};

export default API;
