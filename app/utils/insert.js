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

export function replaceAt(index, array, newItem) {
  return [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index + 1, array.length),
  ];
}
