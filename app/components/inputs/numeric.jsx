import classNames from 'classnames';
import { forwardRef } from 'react';

function preventWheel(e) {
  e.target.blur();

  e.stopPropagation();

  setTimeout(() => {
    e.target.focus();
  }, 0);
}

export default forwardRef(function NumericInput(props, ref) {
  const { styleName } = props;
  return (
    <input
      ref={ref}
      type="number"
      className={classNames({ 'app__input-number': true, [styleName]: true })}
      onWheel={preventWheel}
      {...props}
    />
  );
})
