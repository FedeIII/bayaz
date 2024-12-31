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
  const { styleName, onChange, value, readOnly, ...restProps } = props;

  return (
    <input
      ref={ref}
      type="number"
      value={readOnly ? value : (onChange ? value : undefined)}
      defaultValue={!readOnly && !onChange ? value : undefined}
      onChange={onChange}
      className={classNames({ 'app__input-number': true, [styleName]: true })}
      onWheel={preventWheel}
      readOnly={readOnly}
      {...restProps}
    />
  );
});
