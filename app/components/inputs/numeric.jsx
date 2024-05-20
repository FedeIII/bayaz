import classNames from 'classnames';

function preventWheel(e) {
  e.target.blur();

  e.stopPropagation();

  setTimeout(() => {
    e.target.focus();
  }, 0);
}

export default function NumericInput(props) {
  const { styleName } = props;
  return (
    <input
      type="number"
      className={classNames({ 'app__input-number': true, [styleName]: true })}
      onWheel={preventWheel}
      {...props}
    />
  );
}
