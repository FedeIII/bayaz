import { json } from '@remix-run/node';
import { getPc } from '~/services/pc.server';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  let pcIdsState = JSON.parse(url.searchParams.get('pcIdsState'));

  if (pcIdsState === 'null') pcIdsState = null;

  const pcs = await Promise.all(pcIdsState.map(id => getPc(id)));

  return json(pcs);
};
