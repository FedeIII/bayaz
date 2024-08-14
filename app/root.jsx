import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState } from 'react';

import MenuContext from './components/contexts/menuContext';
import PartyContext from './components/contexts/partyContext';
import {
  deleteFromStore,
  useValueFromStore,
  writeIntoStore,
} from './components/hooks/useStore';
import MonstersContext from './components/contexts/monstersContext';
import PartyTemplateContext from './components/contexts/partyTemplateContext';
import { links as titleLinks } from '~/components/form/title';

import styles from '~/styles/global.css';
import menuStyles from '~/components/menus.css';
import cardStyles from '~/components/cards/cards.css';
import itemStyles from '~/components/modal/inventoryItem.css';
import barStyles from '~/components/indicators/bar.css';
import checkboxStyles from '~/components/checkbox.css';
import appStyles from '~/components/app.css';
import profileStyles from '~/components/profile.css';
import partyStyles from '~/components/party.css';

export const meta = () => ({
  charset: 'utf-8',
  title: 'Bayaz',
  viewport: 'width=device-width,initial-scale=1',
});

export const links = () => [
  ...titleLinks(),
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: menuStyles },
  { rel: 'stylesheet', href: cardStyles },
  { rel: 'stylesheet', href: itemStyles },
  { rel: 'stylesheet', href: barStyles },
  { rel: 'stylesheet', href: checkboxStyles },
  { rel: 'stylesheet', href: appStyles },
  { rel: 'stylesheet', href: profileStyles },
  { rel: 'stylesheet', href: partyStyles },
];

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
  const [pcIdsState, setPcIdsState, deletePcIdsState] = useStateValue('pcIds');
  const [encounterIdState, setEncounterIdState, deleteEncounterIdState] =
    useStateValue('encounterId');
  const [monstersState, setMonstersState, deleteMonstersState] =
    useStateValue('monsters');
  const [partyTemplateState, setPartyTemplateState, deletePartyTemplateState] =
    useStateValue('partyTemplate');

  useEffect(() => {
    setHasMenu(true);
  }, []);

  return (
    <html lang="es-ES">
      <head>
        <Meta />
        <Links />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Rosarivo"
        />
        <link rel="stylesheet" href="/lib/leaflet/leaflet.css" />
        <script src="/lib/leaflet/leaflet.js"></script>
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
                pcIdsState,
                setPcIdsState,
                deletePcIdsState,
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
                <PartyTemplateContext.Provider
                  value={{
                    partyTemplateState,
                    setPartyTemplateState,
                    deletePartyTemplateState,
                  }}
                >
                  <Outlet />
                  <ScrollRestoration />
                  <Scripts />
                  <LiveReload />
                </PartyTemplateContext.Provider>
              </MonstersContext.Provider>
            </PartyContext.Provider>
          </MenuContext.Provider>
        </DndProvider>
      </body>
    </html>
  );
}
