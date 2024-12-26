import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';

import Share from '../components/share/share';
import {
  usePresentTab,
  WINDOW_CHANNEL,
} from '~/components/contexts/presentTabContext';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/share/share.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - Para jugadores',
  },
];

export const loader = async ({ request, params }) => {
  const url = new URL(request.url);
  const partyId = url.searchParams.get('partyId');
  const type = url.searchParams.get('type');
  const title = url.searchParams.get('title');
  const img = url.searchParams.get('img');

  if (!title || !img) {
    throw new Error('Missing required parameters');
  }

  const animationInactive = type === 'npc';

  return { partyId, title, img, animationInactive };
};

function CurrentImage() {
  const {
    title: initialTitle,
    img: initialImg,
    animationInactive: initialAnimationInactive,
  } = useLoaderData();

  const { presentTabData, setPresentTabData, deletePresentTabData } =
    usePresentTab();

  useEffect(() => {
    const handleStorage = e => {
      if (e.key === WINDOW_CHANNEL) {
        const newTabData = JSON.parse(e.newValue);
        setPresentTabData(newTabData);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      deletePresentTabData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const title = presentTabData?.title || initialTitle;
  const img = presentTabData?.img || initialImg;
  const animationInactive =
    presentTabData?.animationInactive || initialAnimationInactive;

  useTitle(title);

  return (
    <Share title={title} img={img} animationInactive={animationInactive} />
  );
}

export default CurrentImage;
