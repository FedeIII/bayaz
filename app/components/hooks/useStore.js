import { useEffect, useState } from 'react';

const store = typeof window !== 'undefined' ? window.localStorage : null;

export function getFromStore(value) {
  return store?.getItem(value);
}

export function useValueFromStore(value) {
  useEffect(() => {
    const handler = () => setStoreValue(getFromStore(value));
    window.addEventListener('storage', handler);

    return () => window.removeEventListener('storage', handler);
  }, []);

  const [storeValue, setStoreValue] = useState(getFromStore(value));

  return storeValue;
}

export function writeIntoStore(key, value) {
  store?.setItem(key, value);
}
