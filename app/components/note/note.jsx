import { useEffect, useRef, useState } from 'react';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

function Note(props) {
  const {
    position,
    id,
    text: defaultValue,
    selected,
    onBlur,
    onDelete,
    onPick,
  } = props;

  const ref = useRef();

  useEffect(() => {
    textareaCallback({ target: ref.current });
  }, []);

  const [text, setText] = useState(defaultValue);

  return (
    <div
      className="note"
      style={{ left: position[0], top: position[1] }}
    >
      <textarea
        ref={ref}
        className={`note__text ${selected && 'note__selectedNote'}`}
        name={`note-${id}`}
        value={text}
        rows="1"
        onBlur={() => onBlur(id, text)}
        onChange={e => setText(e.target.value)}
        onInput={textareaCallback}
      ></textarea>
      <button
        type="button"
        className="note__handle"
        onMouseDown={() => onPick(id)}
      >
        ░
      </button>
      <button
        type="button"
        className="note__close"
        onMouseDown={e => e.preventDefault()}
        onClick={() => onDelete(id)}
      >
        ✕
      </button>
    </div>
  );
}

export default Note;
