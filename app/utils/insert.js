export function insertAfter(findIndexCallback, array, newItems) {
  const previousItemIndex = array?.findIndex(findIndexCallback);

  if (previousItemIndex) {
    return [
      ...array.slice(0, previousItemIndex + 1),
      ...newItems,
      ...array.slice(previousItemIndex + 1, array.length),
    ];
  } else {
    return array;
  }
}

export function replaceAt(index, array = [], newItem) {
  if (index < array.length) {
    return [
      ...array.slice(0, index),
      newItem,
      ...array.slice(index + 1, array.length),
    ];
  } else {
    return replaceAt(
      index,
      [...array, ...Array(index - array.length + 1)],
      newItem
    );
  }
}

export function removeItem(findCallback, array) {
  const index = array.findIndex(findCallback);
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
}

export function unique(values) {
  return [...new Set(values || [])];
}

export function substract(minuend, subtrahend, isEqualFn) {
  const isEqual = isEqualFn || (el => !subtrahend.includes(el));
  return minuend.filter(el => isEqual(el, subtrahend));
}

export function changeLength(arr, length) {
  return Array.from(Array(length), (_, i) => arr?.[i] || null);
}
