import { translateItem } from './equipment/equipment';

export function increment(num) {
  return num >= 0 ? '+' + num : num;
}

export function signed(num) {
  return num > 0 ? '+' + num : num;
}

export function listItems(items) {
  return (
    items
      .map(
        item =>
          (item.amount > 1 ? item.amount + 'x ' : '') + translateItem(item.name)
      )
      .join(', ') + '.'
  );
}

export function itemWithAmount(translation, amount) {
  return (amount > 1 ? amount + 'x ' : '') + translation;
}
