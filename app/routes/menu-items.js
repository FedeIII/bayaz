import { getAllMenuItems } from '~/domain/navigation';
import { isDm } from '~/domain/user';
import { getPcName } from '~/services/pc.server';
import { getSessionUser } from '~/services/session.server';
import { unique } from '~/utils/array';

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

  let allPcIds = [];
  let allPcNames = [];

  if (pcId) {
    allPcIds = [pcId];
    allPcNames = [await getPcName(pcId)];
  }

  if (pcIdsState?.length) {
    allPcIds = unique([...allPcIds, ...pcIdsState]);
    allPcNames = unique([
      ...allPcNames,
      ...(await Promise.all(pcIdsState.map(getPcName))),
    ]);
  }

  const menuItems = getAllMenuItems({
    isDm: isDm(user),
    partyIdState,
    pcIdsState,
    allPcIds,
    allPcNames,
    encounterIdState,
  });

  return menuItems;
};
