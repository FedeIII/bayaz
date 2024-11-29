import { useState, Fragment } from 'react';
import random from '~/domain/random';
import { signed } from '~/domain/display';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/dice.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - Dados',
  },
];

function rollLevel(value, faces, isAccounted) {
  if (!isAccounted) {
    return 'disabled';
  }

  if (value === faces) {
    return 'high';
  }

  if (value === 1) {
    return 'low';
  }

  return null;
}

function SingleRoll(props) {
  const {
    roll: { value, faces },
    isAccounted,
  } = props;

  return (
    <span className={`dice__roll ${rollLevel(value, faces, isAccounted)}`}>
      {value}
    </span>
  );
}

function AllRolls(props) {
  const { rolls, modifier, usedIndices } = props;

  if (rolls.length) {
    return (
      <>
        {rolls.map((roll, index) => (
          <Fragment key={index}>
            {!!index && '+'}
            <SingleRoll roll={roll} isAccounted={usedIndices.includes(index)} />
          </Fragment>
        ))}
        {!!modifier && (
          <span className="dice__modifier">{signed(modifier)}</span>
        )}
      </>
    );
  }

  return null;
}

function TotalRoll(props) {
  const { roll } = props;

  return (
    <span className="dice__history-line-command">
      {random.roll.calculateResult(roll)}
    </span>
  );
}

function Line(props) {
  const { command, result } = props;

  return (
    <div className="dice__history-line" key={command}>
      <span className="dice__history-line-command">/{command}</span>
      <div className="dice__history-line-rolls">
        <AllRolls
          {...result}
          usedIndices={random.roll.getUsedIndices(result)}
        />
        {' = '}
        <TotalRoll roll={result} />
      </div>
    </div>
  );
}

function RollDice() {
  useTitle('Dados');

  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);

  const onCommandChange = event => {
    setCommand(event.target.value);
  };

  const onCommandSubmit = event => {
    event.preventDefault();

    if (command) {
      setCommand('');
      const result = random.roll.processCommand(command);
      setHistory(history.concat({ command, result }));
    }
  };

  return (
    <div className="dice__terminal">
      <div className="dice__history">
        {history.map((line, index) => (
          <Line {...line} key={index} />
        ))}
        <div id="historyAnchor" />
      </div>
      <form onSubmit={onCommandSubmit}>
        <input
          className="dice__command"
          value={command}
          onChange={onCommandChange}
        />
        <input type="submit" className="dice__submit-command" />
      </form>
    </div>
  );
}

export default RollDice;
