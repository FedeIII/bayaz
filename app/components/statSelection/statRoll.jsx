import { useDrag } from 'react-dnd';
import classnames from 'classnames';

import styles from '~/components/characters/characters.module.css';

export const ItemTypes = {
  ROLL: 'ROLL',
};

export function StatRoll(props) {
  const { roll, index, canDrag } = props;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ROLL,
      item: { value: roll, index },
      canDrag: () => canDrag && roll,
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [roll, index, canDrag]
  );

  const className = classnames(styles.statsRoll, {
    [styles.canDrag]: canDrag && roll,
    [styles.cannotDrag]: !canDrag && roll,
  });

  return (
    <span ref={drag} className={className}>
      {roll}
    </span>
  );
}
