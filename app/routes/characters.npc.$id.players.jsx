import { useLoaderData } from '@remix-run/react';

import { getNpc } from '~/services/npc.server';
import Share from '../components/share/share';

import styles from '~/components/share/share.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const npc = await getNpc(params.id);

  if (!npc) {
    throw new Error('NPC not found');
  }

  return { npc };
};

export const action = async ({ request }) => {
  return null;
};

function NpcForPlayers() {
  const { npc } = useLoaderData();
  const { name, img } = npc;

  return <Share title={name} img={img} animationInactive />;
}

export default NpcForPlayers;
