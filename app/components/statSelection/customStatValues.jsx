import { useState } from 'react';
import { useDrag } from 'react-dnd';

import { STATS } from '~/domain/characters';

import styles from '~/components/characters/characters.module.css';

const MAX_POINTS = 27;

export const ItemTypes = {
  ROLL: 'ROLL',
};

const weights = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export function CustomStatValues(props) {
  const { usedRolls } = props;

  const [stats, setStats] = useState({
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8,
  });
  const [usedPoints, setUsedPoints] = useState(0);

  function onStatChange(statName) {
    return e => {
      const newValue = parseInt(e.target.value, 10);
      const totalPoints = Object.entries(stats).reduce(
        (points, [name, value]) =>
          points + weights[name === statName ? newValue : value],
        0
      );

      if (totalPoints <= MAX_POINTS && newValue >= 8 && newValue <= 15) {
        setUsedPoints(totalPoints);
        setStats({
          ...stats,
          [statName]: newValue,
        });
      }
    };
  }

  return (
    <>
      <p>Puntos restantes: {MAX_POINTS - usedPoints}</p>
      <p className={styles.statValues}>
        {STATS.map((statName, index) => {
          const canDrag = !usedRolls[index];

          const [{ isDragging }, drag] = useDrag(
            () => ({
              type: ItemTypes.ROLL,
              item: { value: stats[statName], index },
              canDrag: () => canDrag && stats[statName],
              collect: monitor => ({
                isDragging: !!monitor.isDragging(),
              }),
            }),
            [stats[statName], index, canDrag]
          );

          return (
            <input
              type="number"
              ref={drag}
              value={stats[statName]}
              onChange={onStatChange(statName)}
              onkeydown="return false"
              className={styles.statValue}
              disabled={!canDrag}
            />
          );
        })}
      </p>
    </>
  );
}
