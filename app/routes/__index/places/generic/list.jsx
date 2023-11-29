import { Link, useLoaderData } from '@remix-run/react';

import { getPlaces } from '~/services/place.server';
import { json } from '@remix-run/node';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ request }) => {
  const places = await getPlaces();

  if (!places?.length) {
    throw new Error('Places not found');
  }

  return json({ places });
};

function GenericPlaceList() {
  const { places } = useLoaderData();

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {places.map(place => (
          <li className="party__character" key={place.id}>
            <Link to={`/places/generic/${place.id}`} className="party__pc-link">
              <div className="party__character-name party__character-name--short">{place.name}</div>
              <div className="party__party-data party__party-data--trimmed">
                {place.description}
              </div>
              <div className="party__party-data party__party-data--trimmed">
                {place.notes}
              </div>
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

export default GenericPlaceList;
