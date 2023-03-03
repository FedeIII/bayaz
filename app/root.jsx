import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { cssBundleHref } from '@remix-run/css-bundle';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from '~/styles/global.css';
import MenuContext from './components/contexts/menuContext';
import { useEffect, useState } from 'react';
import PartyContext from './components/contexts/partyContext';
import EncounterContext from './components/contexts/encounterContext';
import { useAddMenuItems } from './components/hooks/useAddMenuItems';
import { MONSTERS } from './domain/encounters/monsters';

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    { rel: 'stylesheet', href: styles },
  ];
};

const mainLinks = [
  { name: 'Dados', url: '/dice', level: 0 },
  { name: 'Lugares', url: '/places', level: 0 },
  { name: 'Personajes', url: '/characters', level: 0 },
  { name: 'Enemigos', url: '/enemies', level: 0 },
  { name: 'Party', url: '/party', level: 0 },
];

export default function App() {
  const [menuItems, setMenuItems] = useState(mainLinks);
  const [partyId, setPartyId] = useState(null);
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    setMenuItems(mainLinks);
    setPartyId(window.localStorage.getItem('partyId'));
    const monsterNames = window.localStorage.getItem('monsters');
    setMonsters(
      monsterNames
        ? monsterNames.split('|').map(monsterName => MONSTERS[monsterName])
        : []
    );
  }, []);

  useEffect(() => {
    if (partyId) {
      window.localStorage.setItem('partyId', partyId);
    }
  }, [partyId]);

  useEffect(() => {
    if (monsters?.length) {
      window.localStorage.setItem(
        'monsters',
        monsters.map(monster => monster?.name).join('|')
      );
    }
  }, [monsters]);

  const extraMenuItems = [];
  if (partyId) {
    extraMenuItems.push(
      { name: partyId, url: `/party/${partyId}`, level: 1 },
      {
        name: 'Encuentros',
        url: `/party/${partyId}/encounters`,
        level: 2,
      }
    );
  }

  if (partyId && monsters?.length) {
    extraMenuItems.push({
      name: 'Combate',
      url: `/party/${partyId}/encounters/combat`,
      level: 2,
    });
  }

  useAddMenuItems('/party', extraMenuItems, menuItems, setMenuItems);

  return (
    <html lang="es-ES">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <DndProvider backend={HTML5Backend}>
          <MenuContext.Provider value={{ menuItems, setMenuItems }}>
            <PartyContext.Provider value={{ partyId, setPartyId }}>
              <EncounterContext.Provider value={{ monsters, setMonsters }}>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
                <Analytics />
              </EncounterContext.Provider>
            </PartyContext.Provider>
          </MenuContext.Provider>
        </DndProvider>
      </body>
    </html>
  );
}
