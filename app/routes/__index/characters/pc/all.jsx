import { useState } from 'react';
import { json } from '@remix-run/node';
import { Link, useLoaderData, useSubmit } from '@remix-run/react';

import { deletePc, getPcs, getUserPcs } from '~/services/pc.server';
import { translateClass, translateRace } from '~/domain/characters';
import { getSessionUser } from '~/services/session.server';
import { isDm } from '~/domain/user';
import { getUser } from '~/services/user.server';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);
  let pcs;
  let userNames = [];

  if (isDm(user)) {
    pcs = await getPcs();

    userNames = (
      await Promise.all(pcs.map(pc => getUser({ id: pc.userId })))
    ).map(user => user.name);
  } else {
    pcs = await getUserPcs(user.id);
  }

  if (!pcs?.length) {
    throw new Error('PCs not found');
  }
  return json({ pcs, userNames, showUserName: isDm(user) });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const pcName = formData.get('delete');

  await deletePc(pcName);

  return null;
};

function AllPCs() {
  const { pcs, userNames, showUserName } = useLoaderData();

  const submit = useSubmit();

  const [confirmDeleteName, setConfirmDeleteName] = useState(null);
  const confirmNot = e => {
    e.preventDefault();
    setConfirmDeleteName(null);
  };

  function onDeleteClick(e) {
    submit(
      {
        delete: e.target.value,
      },
      { method: 'post' }
    );
    confirmNot(e);
  }

  return (
    <>
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__character-list">
        {pcs.map((pc, i) => (
          <li className="party__character" key={pc.name}>
            <Link
              to={`/characters/pc/${pc.name}/summary`}
              className="party__pc-link"
            >
              <div className="party__character-name">{pc.name}</div>
              {!!showUserName && (
                <div className="party__party-data">{userNames[i]}</div>
              )}
              <div className="party__party-data">
                {translateRace(pc.race)}
                {pc.subrace !== 'subrace' && ` - ${translateRace(pc.subrace)}`}
              </div>
              <div className="party__party-data">
                {translateClass(pc.pClass)}
              </div>
              <div className="party__party-data">Nivel {pc.level}</div>
              {confirmDeleteName !== pc.name && (
                <div className="party__party-data">
                  <button
                    className="party__delete"
                    onClick={e => {
                      e.preventDefault();
                      setConfirmDeleteName(pc.name);
                    }}
                  >
                    ⊘
                  </button>
                </div>
              )}
              {confirmDeleteName === pc.name && (
                <div className="party__party-data">
                  Seguro?{' '}
                  <button
                    type="submit"
                    name="delete"
                    value={pc.name}
                    className="party__delete-confirm party__delete-confirm--yes"
                    onClick={onDeleteClick}
                  >
                    Sí
                  </button>{' '}
                  <span
                    className="party__delete-confirm party__delete-confirm--no"
                    onClick={confirmNot}
                  >
                    No
                  </span>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllPCs;
