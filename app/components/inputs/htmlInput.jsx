import classNames from 'classnames';

function HtmlInput(props) {
  const { value, name, htmlInputRef, className, onChange } = props;

  const stringValue = value || '';

  return (
    <>
      <div
        ref={htmlInputRef}
        contentEditable
        className={classNames('html-input', className)}
        onInput={onChange}
        dangerouslySetInnerHTML={{
          __html: stringValue,
        }}
      ></div>
      <input
        readOnly
        type="text"
        name={name}
        value={htmlInputRef.current?.innerHTML || stringValue}
        hidden
      />
    </>
  );
}

export default HtmlInput;
