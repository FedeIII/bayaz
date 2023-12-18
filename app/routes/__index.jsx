import { json, redirect } from '@remix-run/node';
import { Outlet, useFetcher, useLoaderData } from '@remix-run/react';
import { useContext, useEffect, useState } from 'react';

import MenuContext from '~/components/contexts/menuContext';
import { SideBar } from '~/components/sideBar';
import { getSessionUser } from '~/services/session.server';
import { getBasicMenuItems } from '~/domain/navigation';
import PartyContext from '~/components/contexts/partyContext';
import MonstersContext from '~/components/contexts/monstersContext';
import { getCurrentPcPage } from '~/utils/paths';

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);

  if (!user) {
    return redirect('/login');
  }

  const menuItems = getBasicMenuItems(user);
  const url = new URL(request.url);
  const pathname =
    url.pathname === '/'
      ? '/'
      : url.pathname[url.pathname.length - 1] === '/'
      ? url.pathname.slice(0, -1)
      : url.pathname;

  return json({ menuItems, location: pathname });
};

export default function Index() {
  const { menuItems: initMenuItems, location } = useLoaderData();
  const menuContext = useContext(MenuContext) || {};
  const { hasMenu, menuTitle } = menuContext;
  const { partyIdState, pcIdsState } = useContext(PartyContext) || {};
  const { encounterIdState } = useContext(MonstersContext) || {};
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

  return (
    <div className="app">
      {hasMenu && <header className="app__header">{menuTitle}</header>}
      <div
        className={hasMenu ? 'app__body' : 'app__body app__body--full-screen'}
      >
        <SideBar menuItems={menuItems} location={location} />
        <div
          className={
            hasMenu ? 'app__content' : 'app__content app__content--ful-screen'
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
