import { Outlet, useLoaderData } from '@remix-run/react';
import { useTitle } from '~/components/hooks/useTitle';
import { isDm } from '~/domain/user';
import { getPc } from '~/services/pc.server';
import { getSessionUser } from '~/services/session.server';
import { getUser } from '~/services/user.server';

export const meta = ({ data, location }) => {
  let title = data.pc?.name;
  if (location.pathname.includes('/summary')) {
    title = `${title} - Principal`;
  } else if (location.pathname.includes('/bio')) {
    title = `${title} - Inventario`;
  } else if (location.pathname.includes('/spells')) {
    title = `${title} - Conjuros`;
  } else if (location.pathname.includes('/leveling')) {
    title = `${title} - Subida de nivel`;
  }

  return [{ title }];
};

export const loader = async ({ request, params }) => {
  const pc = await getPc(params.id);

  if (!pc) {
    throw new Error('pc not found');
  }

  const owner = await getUser({ id: pc.userId });
  const user = await getSessionUser(request);

  return { pc, playerName: owner.name, isDm: isDm(user) };
};

function Pc() {
  const { pc, playerName, isDm } = useLoaderData();
  useTitle(pc.name);

  return <Outlet context={{ pc, playerName, isDm }} />;
}

export default Pc;
