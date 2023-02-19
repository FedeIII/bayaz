import { pcItem } from '~/domain/equipment/equipment';

export function getEquipmentComboData({
  formData,
  numberOfEquipmentOptions,
  comboSectionPrefix = '',
  otherInputNames = [],
}) {
  const setsOfItems = otherInputNames.map(inputName =>
    formData.getAll(`${inputName}[]`)
  );

  const choices = Array.from(Array(numberOfEquipmentOptions), (_, i) =>
    formData.get(
      `choices-${comboSectionPrefix ? `${comboSectionPrefix}-${i}` : i}`
    )
  ).filter(v => v);

  const equipment = [...choices, ...setsOfItems.flat()].reduce(
    (items, inputValue) => {
      const itemPairs = inputValue.split('|').map(pair => pair.split(','));
      return [
        ...items,
        ...itemPairs.map(([itemName, itemAmount]) =>
          pcItem(itemName, itemAmount)
        ),
      ];
    },
    []
  );

  return equipment;
}
