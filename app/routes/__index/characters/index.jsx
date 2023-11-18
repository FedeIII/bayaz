import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getSessionUser } from '~/services/session.server';
import { isDm } from '~/domain/user';

import styles from '~/components/characters/characters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const menuLinks = [
  { name: 'Nuevo Jugador', url: 'pc/new', isForPlayers: true },
  { name: 'Todos los Jugadores', url: 'pc/all', isForPlayers: true },
  { name: 'Personajes No Jugadores', url: 'npc', isForPlayers: false },
];

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);

  if (isDm(user)) {
    return json({ menuItems: menuLinks });
  }

  return json({ menuItems: menuLinks.filter(item => item.isForPlayers) });
};

function CharactersMenu() {
  const { menuItems } = useLoaderData();

  if (!menuItems) return null;

  return menuItems.map(item => (
    <Link to={item.url} className="menus__main-option">
      <span className="menus__option-label">{item.name}</span>
    </Link>
  ));
}

export default CharactersMenu;
