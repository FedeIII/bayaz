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
  const [partyId, setPartyId] = useState(mainLinks);

  useEffect(() => {
    setMenuItems(mainLinks);
  }, [global.location?.href]);

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
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
              <Analytics />
            </PartyContext.Provider>
          </MenuContext.Provider>
        </DndProvider>
      </body>
    </html>
  );
}
