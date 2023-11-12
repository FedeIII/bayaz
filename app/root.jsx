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
import { useEffect, useState } from 'react';

import MenuContext from './components/contexts/menuContext';
import PartyContext from './components/contexts/partyContext';
import {
  deleteFromStore,
  useValueFromStore,
  writeIntoStore,
} from './components/hooks/useStore';
import MonstersContext from './components/contexts/monstersContext';

import styles from '~/styles/global.css';
import appStyles from '~/components/app.module.css';
import bioStyles from '~/components/bio.module.css';
import checkboxStyles from '~/components/checkbox.module.css';
import diceStyles from '~/components/dice.module.css';
import encounterListStyles from '~/components/encounterList.module.css';
import filtersStyles from '~/components/filters.module.css';
import glossaryStyles from '~/components/glossary.module.css';
import menusStyles from '~/components/menus.module.css';
import newEncounterStyles from '~/components/newEncounter.module.css';
import partyStyles from '~/components/party.module.css';
import placesStyles from '~/components/places.module.css';
import randomEncounterStyles from '~/components/randomEncounter.module.css';
import sheetStyles from '~/components/sheet.module.css';
import spellsStyles from '~/components/spells.module.css';
import statsStyles from '~/components/stats.module.css';
import cardsStyles from '~/components/cards/cards.module.css';
import charactersStyles from '~/components/characters/characters.module.css';
import barStyles from '~/components/indicators/bar.module.css';
import inventoryItemStyles from '~/components/modal/inventoryItem.module.css';
import noteStyles from '~/components/note/note.module.css';

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: bioStyles },
    { rel: 'stylesheet', href: checkboxStyles },
    { rel: 'stylesheet', href: diceStyles },
    { rel: 'stylesheet', href: encounterListStyles },
    { rel: 'stylesheet', href: filtersStyles },
    { rel: 'stylesheet', href: glossaryStyles },
    { rel: 'stylesheet', href: menusStyles },
    { rel: 'stylesheet', href: newEncounterStyles },
    { rel: 'stylesheet', href: partyStyles },
    { rel: 'stylesheet', href: placesStyles },
    { rel: 'stylesheet', href: randomEncounterStyles },
    { rel: 'stylesheet', href: sheetStyles },
    { rel: 'stylesheet', href: spellsStyles },
    { rel: 'stylesheet', href: statsStyles },
    { rel: 'stylesheet', href: cardsStyles },
    { rel: 'stylesheet', href: charactersStyles },
    { rel: 'stylesheet', href: barStyles },
    { rel: 'stylesheet', href: inventoryItemStyles },
    { rel: 'stylesheet', href: noteStyles },
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
