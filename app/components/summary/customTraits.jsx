import { useEffect, useRef, useState } from 'react';
import {
  addCustomTrait,
  modifyCustomTrait,
  removeCustomTrait,
} from '~/services/pc.server';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const actions = {
  addArbitraryTrait: async formData => {
    const id = formData.get('id');
    const trait = formData.get('trait');
    const updatedPc = await addCustomTrait(id, trait);
    return updatedPc;
  },
  removeArbitraryTrait: async formData => {
    const id = formData.get('id');
    const traitId = formData.get('traitId');
    const updatedPc = await removeCustomTrait(id, traitId);
    return updatedPc;
  },
  modifyArbitraryTrait: async formData => {
    const id = formData.get('id');
    const traitId = formData.get('traitId');
    const trait = formData.get('trait');
    const updatedPc = await modifyCustomTrait(id, traitId, trait);
    return updatedPc;
  },
};

function CustomTraits(props) {
  const { pc, submit } = props;
  const { id, customTraits = [] } = pc;

  function addArbitraryTrait() {
    setArbitraryTrait('');
    submit(
      {
        action: 'addArbitraryTrait',
        id,
        trait: arbitraryTrait,
      },
      { method: 'post' }
    );
  }

  function removeArbitraryTrait(e) {
    submit(
      {
        action: 'removeArbitraryTrait',
        id,
        traitId: e.target.dataset.traitId,
      },
      { method: 'post' }
    );
  }

  function modifyArbitraryTrait(traitId, trait) {
    setArbitraryTrait('');
    submit(
      {
        action: 'modifyArbitraryTrait',
        id,
        traitId,
        trait,
      },
      { method: 'post' }
    );
  }

  const [arbitraryTrait, setArbitraryTrait] = useState('');
  function onTraitChange(e) {
    setArbitraryTrait(e.target.value);
  }

  const customTraitRefs = Array.from(Array(20), useRef);
  useEffect(() => {
    customTraitRefs.forEach(
      ref => ref?.current && textareaCallback({ target: ref.current })
    );
  }, [customTraitRefs]);

  return (
    <>
      {customTraits.map((customTrait, i) => (
        <li className="sheet__trait-label" key={customTrait.id}>
          <textarea
            ref={customTraitRefs[i]}
            type="text"
            name="newCustomTrait"
            rows="1"
            defaultValue={customTrait.text}
            onBlur={e => {
              textareaCallback(e);
              modifyArbitraryTrait(customTrait.id, e.target.value);
            }}
            onInput={textareaCallback}
            className="sheet__other-item-textarea"
          />
          <span
            className="sheet__add-other-item"
            data-trait-id={customTrait.id}
            onClick={removeArbitraryTrait}
          >
            -
          </span>
        </li>
      ))}

      <li className="sheet__trait-label sheet__trait-label--no-bullet">
        <textarea
          ref={customTraitRefs[customTraits.length]}
          type="text"
          name="newCustomTrait"
          rows="1"
          value={arbitraryTrait}
          onChange={onTraitChange}
          onInput={textareaCallback}
          className="sheet__other-item-textarea sheet__other-item-textarea--border"
        />
        {!!arbitraryTrait && (
          <span className="sheet__add-other-item sheet__add-other-item--animated" onClick={addArbitraryTrait}>
            +
          </span>
        )}
      </li>
    </>
  );
}

export default CustomTraits;
