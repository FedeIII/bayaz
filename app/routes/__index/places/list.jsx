import { Link, useLoaderData } from '@remix-run/react';

import { getSettlements } from '~/services/settlements.server';
import { t } from '~/domain/translations';
import { json } from '@remix-run/node';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ request }) => {
  const settlements = await getSettlements();

  if (!settlements?.length) {
    throw new Error('Settlements not found');
  }

  return json({ settlements });
};

function PlacesList() {
  const { settlements } = useLoaderData();

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {settlements.map(settlement => (
          <li className="party__character" key={settlement.name}>
            <Link
              to={`/places/settlement/${settlement.id}`}
              className="party__pc-link"
            >
              <div className="party__character-name">{settlement.name}</div>
              <div className="party__party-data">{t(settlement.type)}</div>
              <div className="party__party-data">
                {settlement.population} habitantes
              </div>
              <div className="party__party-data">
                Dioses:{' '}
                {Object.entries(settlement.religion)
                  .reduce(
                    (gods, [listName, list]) =>
                      listName === 'temples' || listName === 'shrines'
                        ? [...gods, ...list]
                        : gods,
                    []
                  )
                  .join(', ')}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PlacesList;
