import { useState } from 'react';

import random from '~/domain/random';

import { StatRoll } from './statRoll';

export function RandomStatValues(props) {
  const { usedRolls } = props;

  function addRoll() {
    const result = random.roll.processCommand('4d6p3');
    const roll = random.roll.calculateResult(result);
    const newRolls = rolls.slice();
    const i = newRolls.findIndex(r => !r);
    newRolls[i] = roll;
    setRolls(newRolls);
  }

  const [rolls, setRolls] = useState(Array(6).fill(0));
  const rollsComplete = rolls.filter(r => r).length === 6;

  return (
    <p>
      {rolls.map((roll, i) => (
        <StatRoll roll={roll} index={i} canDrag={!usedRolls[i]} key={i} />
      ))}
      {!rollsComplete && (
        <button type="button" onClick={addRoll}>
          1d6
        </button>
      )}
    </p>
  );
}
