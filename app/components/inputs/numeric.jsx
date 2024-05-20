import classNames from 'classnames';

function preventWheel(e) {
  e.target.blur();

  e.stopPropagation();

  setTimeout(() => {
    e.target.focus();
  }, 0);
}

export default function NumericInput(props) {
  const { className } = props;
  return (
    <input
      type="number"
      className={classNames('app__input-number', className)}
      onWheel={preventWheel}
      {...props}
    />
  );
}
