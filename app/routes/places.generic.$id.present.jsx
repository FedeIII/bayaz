import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';
import { getPlace } from '~/services/place.server';

export const loader = async ({ params }) => {
  const place = await getPlace(params.id);

  if (!place) {
    throw new Error('Place not found');
  }

  return json({ place });
};

export const action = async ({ request }) => {
  return null;
};

function GenericPlaceForPlayers() {
  const { place } = useLoaderData();
  const { name, img } = place;

  useRemoveMenu();

  return (
    <>
      <h1 className="places__title places__title--float">
        <span>
          <span className="places__title-capital">{name?.slice(0, 1)}</span>
          {name?.slice(1)}
        </span>
      </h1>
      <div className="places__image-container-float">
        <img
          src={img}
          className="places__image places__image--float"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default GenericPlaceForPlayers;
