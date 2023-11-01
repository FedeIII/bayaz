import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from '~/styles/global.css';
import MenuContext from './components/contexts/menuContext';
import { useEffect, useState } from 'react';
import PartyContext from './components/contexts/partyContext';
import {
  deleteFromStore,
  useValueFromStore,
  writeIntoStore,
} from './components/hooks/useStore';
import MonstersContext from './components/contexts/monstersContext';

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

function useStateValue(key) {
  const [stateValue, setStateValue] = useValueFromStore(key);

  function setValue(value) {
    setStateValue(value);
    const parsedValue =
      typeof value === 'object' ? JSON.stringify(value) : value;
    writeIntoStore(key, parsedValue);
  }

  function deleteValue() {
    setStateValue(null);
    deleteFromStore(key);
  }

  return [stateValue, setValue, deleteValue];
}

export default function App() {
  const [hasMenu, setHasMenu] = useState(true);
  const [menuTitle, setMenuTitle] = useState('Bayaz');
  const [partyIdState, setPartyIdState, deletePartyIdState] =
    useStateValue('partyId');
  const [pcNamesState, setPcNamesState, deletePcNamesState] =
    useStateValue('pcNames');
  const [encounterIdState, setEncounterIdState, deleteEncounterIdState] =
    useStateValue('encounterId');
  const [monstersState, setMonstersState, deleteMonstersState] =
    useStateValue('monsters');

  useEffect(() => {
    setHasMenu(true);
  }, []);

  return (
    <html lang="es-ES">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <DndProvider backend={HTML5Backend}>
          <MenuContext.Provider
            value={{ hasMenu, setHasMenu, menuTitle, setMenuTitle }}
          >
            <PartyContext.Provider
              value={{
                partyIdState,
                setPartyIdState,
                deletePartyIdState,
                pcNamesState,
                setPcNamesState,
                deletePcNamesState,
              }}
            >
              <MonstersContext.Provider
                value={{
                  monstersState,
                  setMonstersState,
                  deleteMonstersState,
                  encounterIdState,
                  setEncounterIdState,
                  deleteEncounterIdState,
                }}
              >
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
              </MonstersContext.Provider>
            </PartyContext.Provider>
          </MenuContext.Provider>
        </DndProvider>
      </body>
    </html>
  );
}
