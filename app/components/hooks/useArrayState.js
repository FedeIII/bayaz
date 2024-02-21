import { useState } from 'react';
import { replaceAt } from '~/utils/insert';

export function useArrayState(initArray) {
  const [arrayState, setArrayState] = useState(initArray || []);

  function getArrayElement(index) {
    return arrayState[index];
  }

  function setArrayElement(index, value) {
    setArrayState(old => replaceAt(index, old, value));
  }

  return [getArrayElement, setArrayElement];
}
