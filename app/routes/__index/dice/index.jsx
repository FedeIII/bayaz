import { useState, Fragment, useMemo } from 'react';
import styles from '~/components/dice.module.css';
import random from '~/domain/random';
import { signed } from '~/domain/display';

function rollLevel(value, faces, isAccounted) {
  if (!isAccounted) {
    return styles.disabled;
  }

  if (value === faces) {
    return styles.high;
  }

  if (value === 1) {
    return styles.low;
  }

  return null;
}

function SingleRoll(props) {
  const {
    roll: { value, faces },
    isAccounted,
  } = props;

  return (
    <span className={`${styles.roll} ${rollLevel(value, faces, isAccounted)}`}>
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
          <span className={styles.modifier}>{signed(modifier)}</span>
        )}
      </>
    );
  }

  return null;
}

function TotalRoll(props) {
  const { roll } = props;

  return (
    <span className={styles.historyLineTotal}>
      {random.roll.calculateResult(roll)}
    </span>
  );
}

function Line(props) {
  const { command, result } = props;

  return (
    <div className={styles.historyLine} key={command}>
      <span className={styles.historyLineCommand}>/{command}</span>
      <div className={styles.historyLineRolls}>
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
    <div className={styles.terminal}>
      <div className={styles.history}>
        {history.map((line, index) => (
          <Line {...line} key={index} />
        ))}
        <div id={styles.historyAnchor} />
      </div>
      <form onSubmit={onCommandSubmit}>
        <input
          className={styles.command}
          value={command}
          onChange={onCommandChange}
        />
        <input type="submit" className={styles.submitCommand} />
      </form>
    </div>
  );
}

export default RollDice;
