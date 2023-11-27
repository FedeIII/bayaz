import { json } from '@remix-run/node';
import { getAllMenuItems } from '~/domain/navigation';
import { isDm } from '~/domain/user';
import { getPcName } from '~/services/pc.server';
import { getSessionUser } from '~/services/session.server';
import { unique } from '~/utils/insert';

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);

  const url = new URL(request.url);
  let partyIdState = url.searchParams.get('partyIdState');
  const pcIdsState = JSON.parse(url.searchParams.get('pcIdsState'));
  let encounterIdState = url.searchParams.get('encounterIdState');
  let pcId = url.searchParams.get('pcId');

  if (partyIdState === 'null') partyIdState = null;
  if (encounterIdState === 'null') encounterIdState = null;
  if (pcId === 'null' || pcId === 'undefined') pcId = null;

  let pcName = null;
  if (pcId) {
    pcName = await getPcName(pcId);
  }

  let pcNames = [];
  if (pcIdsState) {
    pcNames = await Promise.all(pcIdsState.map(getPcName));
    if (pcName) pcNames = unique([pcName, ...pcNames]);
  }

  const menuItems = getAllMenuItems({
    isDm: isDm(user),
    pcId,
    pcName,
    partyIdState,
    pcIdsState,
    pcNames,
    encounterIdState,
  });

  return json(menuItems);
};
