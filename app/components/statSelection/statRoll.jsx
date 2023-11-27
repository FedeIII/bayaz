import { useDrag } from 'react-dnd';
import classnames from 'classnames';

export const ItemTypes = {
  ROLL: 'ROLL',
};

export function StatRoll(props) {
  const {
    roll,
    index,
    canDrag,
    className: classNameProp,
    setStat,
    children,
  } = props;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ROLL,
      item: { value: roll, index },
      canDrag: () => canDrag && roll,
      end(item, monitor) {
        if (monitor.didDrop() && setStat) {
          const result = monitor.getDropResult();
          setStat(result.dropOnValue || '');
        }
      },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [roll, index, canDrag, setStat]
  );

  const className = classnames(classNameProp, {
    ['characters__can-drag']: canDrag && roll,
    ['characters__cannot-drag']: !canDrag && roll,
  });

  return (
    <span ref={drag} className={className}>
      {children ? children : roll}
    </span>
  );
}
