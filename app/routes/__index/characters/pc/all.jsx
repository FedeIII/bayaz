import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getPcs, getUserPcs } from '~/services/pc.server';
import { translateClass, translateRace } from '~/domain/characters';
import { getSessionUser } from '~/services/session.server';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);
  let pcs;

  if (user?.roles.includes('dm')) {
    pcs = await getPcs();
  } else {
    pcs = await getUserPcs(user.id);
  }

  if (!pcs?.length) {
    throw new Error('PCs not found');
  }
  return json({ pcs });
};

function AllPCs() {
  const { pcs } = useLoaderData();

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {pcs.map(pc => (
          <li className="party__character" key={pc.name}>
            <Link
              to={`/characters/pc/${pc.name}/summary`}
              className="party__pc-link"
            >
              <div className="party__character-name">{pc.name}</div>
              <div className="party__party-data">
                {translateRace(pc.race)}
                {pc.subrace !== 'subrace' && ` - ${translateRace(pc.subrace)}`}
              </div>
              <div className="party__party-data">
                {translateClass(pc.pClass)}
              </div>
              <div className="party__party-data">Nivel {pc.level}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllPCs;
