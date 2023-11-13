import { useEffect, useRef, useState } from 'react';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

function BuildingDetails(props) {
  const { building, setBuilding } = props;

  const [showTypeInput, setShowTypeInput] = useState(false);
  const typeRef = useRef();
  useEffect(() => {
    if (showTypeInput) {
      typeRef.current.focus();
    }
  }, [showTypeInput]);

  const notesRef = useRef();
  useEffect(() => {
    if (notesRef.current) {
      textareaCallback({ target: notesRef.current });
    }
  }, [notesRef.current]);

  function onTypeChange(e) {
    setBuilding(b => ({ ...b, typeTranslation: e.target.value }));
  }

  function onSubtypeChange(e) {
    setBuilding(b => ({ ...b, subtype: e.target.value }));
  }

  function onNotesChange(e) {
    setBuilding(b => ({ ...b, notes: e.target.value }));
  }

  if (!building) return null;

  return (
    <>
      {!!building?.id && (
        <input readOnly type="text" name="id" value={building.id} hidden />
      )}
      <input readOnly type="text" name="type" value={building.type} hidden />
      <h1 className="places__title">
        <span
          style={{ display: showTypeInput ? 'none' : 'inline' }}
          onClick={() => setShowTypeInput(true)}
        >
          <span className="places__title-capital">
            {building.typeTranslation?.slice(0, 1)}
          </span>
          {building.typeTranslation?.slice(1)}
        </span>
        <input
          ref={typeRef}
          type="text"
          name="typeTranslation"
          value={building.typeTranslation}
          className="places__title-input"
          style={{ display: showTypeInput ? 'inline' : 'none' }}
          onBlur={() => setShowTypeInput(false)}
          onChange={onTypeChange}
        />
      </h1>
      <div className="places__image-container">
        <>
          <img
            src={`/images/places/${building.img}`}
            className="places__image"
            width="100%"
          />
          <input readOnly type="text" name="img" value={building.img} hidden />
        </>
      </div>
      <div className="places__horizontal-sections">
        <input
          type="text"
          name="subtype"
          value={building.subtype}
          className="places__trait-input"
          onChange={onSubtypeChange}
        />
      </div>
      <div className="places__notes">
        <h2 className="places__notes-title">Notas</h2>
        <textarea
          ref={notesRef}
          name="notes"
          value={building.notes}
          className="places__notes-text"
          onChange={onNotesChange}
          onInput={textareaCallback}
        ></textarea>
      </div>
    </>
  );
}

export default BuildingDetails;
