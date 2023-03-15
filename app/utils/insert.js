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
