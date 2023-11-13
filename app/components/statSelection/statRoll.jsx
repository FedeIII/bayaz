import { useDrag } from 'react-dnd';
import classnames from 'classnames';

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

  const className = classnames('characters__stats-roll', {
    ['characters__can-drag']: canDrag && roll,
    ['characters__cannot-drag']: !canDrag && roll,
  });

  return (
    <span ref={drag} className={className}>
      {roll}
    </span>
  );
}
