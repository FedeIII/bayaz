import { useEffect, useState } from 'react';
import { changeLength } from '~/utils/insert';

export default function useAmount(
  array,
  createNewElement,
  setArray,
  MAX = Infinity
) {
  const [amount, setAmount] = useState(array.length);
  function reduceAmount() {
    setAmount(i => (i > 0 ? i - 1 : i));
  }
  function increaseAmount() {
    setAmount(i => (i < MAX ? i + 1 : MAX));
  }

  useEffect(() => {
    let newArray = changeLength(array, amount);
    newArray = newArray.map(element => element || createNewElement());
    setArray(newArray);
  }, [amount]);

  return [setAmount, reduceAmount, increaseAmount];
}
