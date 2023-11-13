import { useState } from 'react';
import { useDrag } from 'react-dnd';

import { STATS } from '~/domain/characters';

export const ItemTypes = {
  ROLL: 'ROLL',
};

export function RealDiceStatValues(props) {
  const { usedRolls } = props;

  const [stats, setStats] = useState({
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8,
  });

  function onStatChange(statName) {
    return e => {
      const newValue = parseInt(e.target.value, 10);
      if (newValue >= 3 && newValue <= 18) {
        setStats({
          ...stats,
          [statName]: newValue,
        });
      }
    };
  }

  return (
    <>
      <p className="characters__stat-values">
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
              className="characters__stat-value"
              disabled={!canDrag}
            />
          );
        })}
      </p>
    </>
  );
}
