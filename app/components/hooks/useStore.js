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
      setStoreValue(value);
    };
    window.addEventListener('storage', handler);

    return () => window.removeEventListener('storage', handler);
  }, [key, doc?.location.pathname]);

  const [storeValue, setStoreValue] = useState(getFromStore(key));

  return [storeValue, setStoreValue];
}

export function writeIntoStore(key, value) {
  store?.setItem(key, value);
}

export function deleteFromStore(key) {
  store?.removeItem(key);
}
