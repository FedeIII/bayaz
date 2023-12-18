import { json } from '@remix-run/node';
import { getItems } from '~/services/item.server';

export const loader = async () => {
  const items = await getItems();

  return json(items);
};
