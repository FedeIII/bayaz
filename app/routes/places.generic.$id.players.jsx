import { useLoaderData } from '@remix-run/react';

import { getPlace } from '~/services/place.server';
import Share from '../components/share/share';

import styles from '~/components/share/share.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const place = await getPlace(params.id);

  if (!place) {
    throw new Error('Place not found');
  }

  return { place };
};

export const action = async ({ request }) => {
  return null;
};

function GenericPlaceForPlayers() {
  const { place } = useLoaderData();
  const { name, img } = place;

  return <Share title={name} img={img} />;
}

export default GenericPlaceForPlayers;
