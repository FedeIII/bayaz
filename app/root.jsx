import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';
import classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState } from 'react';
import { redirect } from '@remix-run/node';

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
import { SideBar } from '~/components/sideBar';
import { getSessionUser } from '~/services/session.server';
import { getBasicMenuItems } from '~/domain/navigation';
import { getCurrentPcPage } from '~/utils/paths';

import styles from '~/styles/global.css';
import menuStyles from '~/components/menus.css';
import cardStyles from '~/components/cards/cards.css';
import itemStyles from '~/components/modal/inventoryItem.css';
import barStyles from '~/components/indicators/bar.css';
import checkboxStyles from '~/components/checkbox.css';
import appStyles from '~/components/app.css';
import profileStyles from '~/components/profile.css';
import partyStyles from '~/components/party.css';

export const meta = () => [
  {
    charset: 'utf-8',
    title: 'Kandrax',
    viewport: 'width=device-width,initial-scale=1',
  },
];

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
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons",
  },
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

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === '/login') {
    return { menuItems: [], location: pathname };
  }

  const user = await getSessionUser(request);

  if (!user) {
    return redirect('/login');
  }

  const menuItems = getBasicMenuItems(user);
  const normalizedPathname =
    pathname === '/'
      ? '/'
      : pathname[pathname.length - 1] === '/'
      ? pathname.slice(0, -1)
      : pathname;

  return { menuItems, location: normalizedPathname };
};

export default function App() {
  const [hasMenu, setHasMenu] = useState(true);
  const [menuTitle, setMenuTitle] = useState('Kandrax');
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

  const { menuItems: initMenuItems, location } = useLoaderData();
  const fetcher = useFetcher();

  const [menuItems, setMenuItems] = useState(initMenuItems);
  const pcId = getCurrentPcPage();

  useEffect(() => {
    fetcher.load(
      `/menu-items?partyIdState=${partyIdState}&pcIdsState=${JSON.stringify(
        pcIdsState
      )}&encounterIdState=${encounterIdState}&pcId=${pcId}`
    );
  }, [partyIdState, pcIdsState, encounterIdState, pcId]);

  useEffect(() => {
    if (fetcher.data) {
      setMenuItems(fetcher.data);
    }
  }, [fetcher.data]);

  const [sidebarState, setSidebarState] = useState(true);
  function closeSidebar() {
    setSidebarState(false);
  }
  function openSidebar() {
    setSidebarState(true);
  }

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
                  <div className="app">
                    {hasMenu && (
                      <header className="app__header">{menuTitle}</header>
                    )}
                    <div
                      className={classNames('app__body', {
                        'app__body--full-screen': !hasMenu,
                        'app__body--closed-sidebar': !sidebarState,
                      })}
                    >
                      <SideBar
                        menuItems={menuItems}
                        location={location}
                        state={sidebarState}
                      />
                      {hasMenu && (
                        <span
                          className={classNames('app__sidebar-action', {
                            'app__sidebar-action--closed-sidebar':
                              !sidebarState,
                          })}
                          onClick={sidebarState ? closeSidebar : openSidebar}
                        >
                          {sidebarState ? '←' : '→'}
                        </span>
                      )}
                      <div
                        className={classNames('app__content', {
                          'app__content--fullscreen': !hasMenu,
                          'app__content--closed-sidebar': !sidebarState,
                        })}
                      >
                        <Outlet />
                      </div>
                    </div>
                  </div>
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
