import { Link, useLoaderData } from '@remix-run/react';

import { getSettlements } from '~/services/settlements.server';
import { t } from '~/domain/translations';
import { json } from '@remix-run/node';
import { useTitle } from '~/components/hooks/useTitle';
import { classifySettlementsByDomains } from '~/domain/places/places';

import styles from '~/components/party/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - Asentamientos',
  },
];

export const loader = async ({ request }) => {
  const settlements = await getSettlements();

  if (!settlements?.length) {
    throw new Error('Settlements not found');
  }

  return json({
    settlementsByDomain: classifySettlementsByDomains(settlements),
  });
};

function PlacesList() {
  const { settlementsByDomain } = useLoaderData();

  useTitle('Asentamientos');

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      {Object.entries(settlementsByDomain).map(([dominion, settlements]) => (
        <>
          <h3 className="party__character-group">{t(dominion)}</h3>
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
                    {settlement.subdominion}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
}

export default PlacesList;
