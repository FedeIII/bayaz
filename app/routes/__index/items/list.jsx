import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

import { useTitle } from '~/components/hooks/useTitle';
import { getItems } from '~/services/item.server';
import { t } from '~/domain/translations';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ request }) => {
  const items = await getItems();

  if (!items?.length) {
    throw new Error('Items not found');
  }

  return json({ items });
};

function ItemsList() {
  const { items } = useLoaderData();

  useTitle('Lista de items');

  return (
    <>
      <Link to="/items" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {items.map(item => (
          <li className="party__character" key={item.name}>
            <Link to={`/items/${item.id}`} className="party__pc-link">
              <div className="party__character-name">{item.name}</div>
              <div className="party__party-data">{t(item.rarity)}</div>
              <div className="party__party-data">{t(item.category)}</div>
              <div className="party__party-data">
                {!!item.subcategory && t(item.subcategory)}
              </div>
              <div className="party__party-data">
                {!!item.consumable && 'Consumible'}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>
      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ItemsList;
