import { Link, useLoaderData } from '@remix-run/react';

import { getBuildings } from '~/services/building.server';
import { t } from '~/domain/translations';
import { json } from '@remix-run/node';

import styles from '~/components/party.css';
import { useTitle } from '~/components/hooks/useTitle';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ request }) => {
  const buildings = await getBuildings();

  if (!buildings?.length) {
    throw new Error('Buildings not found');
  }

  return json({ buildings });
};

function BuildingList() {
  const { buildings } = useLoaderData();

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {buildings.map(building => (
          <li className="party__character" key={building.name}>
            <Link
              to={`/places/building/${building.id}`}
              className="party__pc-link"
            >
              <div className="party__character-name">
                {building.typeTranslation}
              </div>
              <div className="party__party-data">
                {building.subtypeTranslation}
              </div>
              <div className="party__party-data">{building.variant}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>
      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default BuildingList;
