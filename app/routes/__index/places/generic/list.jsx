import { Link, useLoaderData } from '@remix-run/react';

import { getPlacesByGroup } from '~/services/place.server';
import { json } from '@remix-run/node';
import { useTitle } from '~/components/hooks/useTitle';
import withLoading from '~/components/HOCs/withLoading';
import styles from '~/components/party.css';
import encounterListStyles from '~/components/encounterList.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: encounterListStyles },
  ];
};

export const loader = async ({ request }) => {
  const placesByGroup = await getPlacesByGroup();

  if (!placesByGroup) {
    throw new Error('Places not found');
  }

  return json({ placesByGroup });
};

function GenericPlaceList() {
  const { placesByGroup } = useLoaderData();

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      {Object.entries(placesByGroup).map(([group, places], i) => {
        return (
          <div>
            <span className="encounterList__group-name">
              {!!group && group !== 'undefined' && group}
            </span>
            <ul className="party__character-list">
              {places.map(place => (
                <li className="party__character" key={place.id}>
                  <Link
                    to={`/places/generic/${place.id}`}
                    className="party__pc-link"
                  >
                    <div className="party__character-name party__character-name--short">
                      {place.name}
                    </div>
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
          </div>
        );
      })}
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

export default withLoading(GenericPlaceList);
