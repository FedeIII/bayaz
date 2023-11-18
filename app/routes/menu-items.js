import { json } from '@remix-run/node';
import { getAllMenuItems } from '~/domain/navigation';
import { getSessionUser } from '~/services/session.server';

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);

  const url = new URL(request.url);
  let partyIdState = url.searchParams.get('partyIdState');
  const pcNamesState = JSON.parse(url.searchParams.get('pcNamesState'));
  let encounterIdState = url.searchParams.get('encounterIdState');
  let pcName = url.searchParams.get('pcName');

  if (partyIdState === 'null') partyIdState = null;
  if (encounterIdState === 'null') encounterIdState = null;
  if (pcName === 'null' || pcName === 'undefined') pcName = null;

  const menuItems = getAllMenuItems({
    isDm: user?.roles?.includes('dm'),
    pcName,
    partyIdState,
    pcNamesState,
    encounterIdState,
  });

  return json(menuItems);
};
