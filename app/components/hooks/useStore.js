import { useEffect, useState } from 'react';

const store = typeof window !== 'undefined' ? window.localStorage : null;
const doc = typeof document !== 'undefined' ? document : null;

export function getFromStore(value) {
  let valueFromStore = store?.getItem(value);

  if (['[', '{'].includes(valueFromStore?.charAt(0)))
    valueFromStore = JSON.parse(valueFromStore);

  return valueFromStore;
}

export function useValueFromStore(key) {
  useEffect(() => {
    const handler = () => {
      const value = getFromStore(key);
      setStoreValueState(value);
    };
    window.addEventListener('storage', handler);

    return () => window.removeEventListener('storage', handler);
  }, [key, doc?.location.pathname]);

  const [storeValue, setStoreValueState] = useState(getFromStore(key));

  function setStoreValue(value) {
    setStoreValueState(value);
    if (typeof value === 'object') {
      writeIntoStore(key, JSON.stringify(value));
    } else {
      writeIntoStore(key, value);
    }
  }

  return [storeValue, setStoreValue];
}

export function writeIntoStore(key, value) {
  store?.setItem(key, value);
}

export function deleteFromStore(key) {
  store?.removeItem(key);
}

export function useStateValue(key) {
  const [stateValue, setStateValue] = useValueFromStore(key);

  function setValue(value) {
    setStateValue(value);
    const parsedValue =
      typeof value === 'object' ? JSON.stringify(value) : value;
    writeIntoStore(key, parsedValue);
  }

  function deleteValue() {
    setStateValue(null);
    deleteFromStore(key);
  }

  return [stateValue, setValue, deleteValue];
}
