import { json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { Title, links as titleLinks } from '~/components/form/title';

import { getSessionUser } from '~/services/session.server';
import { updateUser } from '~/services/user.server';
import { getUserPcs } from '~/services/pc.server';
import { t } from '~/domain/translations';

import styles from '~/components/profile.css';
import cardStyles from '~/components/cards/cards.css';
import partyStyles from '~/components/party.css';
import { translateClass, translateRace } from '~/domain/characters';
export const links = () => [
  ...titleLinks(),
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: cardStyles },
  { rel: 'stylesheet', href: partyStyles },
];

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);

  const pcs = await getUserPcs(user.id);

  return json({ user, pcs });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const name = formData.get('name');

  await updateUser(email, { name });

  return null;
};

export default function Index() {
  const { user, pcs } = useLoaderData();

  return (
    <Form method="post" className="profile">
      <input readOnly type="text" name="email" value={user.email} hidden />

      <div className="profile__prop-row">
        <div className="profile__prop">
          <span className="profile__prop-label">Nombre</span>
          <hr className="profile__prop-separator" />
          <Title
            inputName="name"
            defaultValue={user.name}
            className="profile__title"
            inputClass="profile__input"
          />
        </div>

        <div className="profile__prop">
          <span className="profile__prop-label">Roles</span>
          <hr className="profile__prop-separator" />
          <div>
            {user.roles.map(role => (
              <span>{t(role)}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="profile__prop-row profile__prop-row--single">
        <div className="profile__prop">
          <span className="profile__prop-label">Personajes</span>
          <hr className="profile__prop-separator" />
          <ul className="party__character-list">
            {pcs.map(pc => (
              <li className="party__character" key={pc.id}>
                <Link
                  to={`/characters/pc/${pc.id}/summary`}
                  className="party__pc-link"
                >
                  <div className="party__character-name">{pc.name}</div>
                  <div className="party__party-data">
                    {translateRace(pc.race)}
                    {pc.subrace !== 'subrace' &&
                      ` - ${translateRace(pc.subrace)}`}
                  </div>
                  <div className="party__party-data">
                    {translateClass(pc.pClass)}
                  </div>
                  <div className="party__party-data">Nivel {pc.level}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button type="submit" className="profile__button cards__button-card">
        Guardar
      </button>
    </Form>
  );
}
