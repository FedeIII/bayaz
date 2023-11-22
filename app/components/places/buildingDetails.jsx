import { useEffect, useRef, useState } from 'react';
import { Title } from '../form/title';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

function BuildingDetails(props) {
  const { building, setBuilding, img, className } = props;

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
  const variantRef = useRef();
  useEffect(() => {
    if (variantRef.current) {
      textareaCallback({ target: variantRef.current });
    }
  }, [variantRef.current]);

  function onTypeChange(e) {
    setBuilding(b => ({ ...b, typeTranslation: e.target.value }));
  }

  function onSubtypeChange(e) {
    setBuilding(b => ({ ...b, subtypeTranslation: e.target.value }));
  }

  function onVariantChange(e) {
    setBuilding(b => ({ ...b, variant: e.target.value }));
  }

  function onNotesChange(e) {
    setBuilding(b => ({ ...b, notes: e.target.value }));
  }

  if (!building) return null;

  const buildingImg = img || building.img;

  return (
    <>
      {!!building?.id && (
        <input readOnly type="text" name="id" value={building.id} hidden />
      )}
      <input readOnly type="text" name="type" value={building.type} hidden />
      <input
        readOnly
        type="text"
        name="subtype"
        value={building.subtype}
        hidden
      />

      <div className={`places__horizontal-sections ${className}`}>
        <div className="places__vertical-sections">
          <div className="places__image-container">
            <button
              type="submit"
              name="action"
              value="randomImage"
              className="places__image-overlay"
            >
              ⟳
            </button>
            <img src={buildingImg} className="places__image" width="100%" />
            <input readOnly type="text" name="img" value={buildingImg} hidden />
          </div>

          <div className="places__info">
            <Title
              inputName="typeTranslation"
              value={building.typeTranslation}
              onChange={onTypeChange}
            />

            <hr className="places__section-divider" />

            <div className="places__trait">
              <div className="places__horizontal-sections">
                <div className="places__trait-title">Descripción</div>
                <input
                  type="text"
                  name="subtypeTranslation"
                  value={building.subtypeTranslation}
                  className="places__trait-input"
                  onChange={onSubtypeChange}
                />
                <textarea
                  ref={variantRef}
                  name="variant"
                  value={building.variant}
                  className="places__trait-input"
                  onChange={onVariantChange}
                  onInput={textareaCallback}
                ></textarea>
              </div>
            </div>

            <hr className="places__section-divider" />
          </div>
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
      </div>
    </>
  );
}

export default BuildingDetails;
