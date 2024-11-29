import { useState } from 'react';
import { Form, Link, useLoaderData, useSubmit } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getNpcParties, setPartyName } from '~/services/party.server';
import { concurrentRequests } from '~/utils/concurrentRequests';
import { Title } from '~/components/form/title';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/party/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - Grupos de NPCs',
  },
];

export const loader = async ({ params }) => {
  const groups = await getNpcParties();

  if (!groups?.length) {
    throw new Error('Groups not found');
  }

  const groupsNpcs = await Promise.all(
    groups.map(group => concurrentRequests(group.players, id => getPc(id)))
  );

  return { groups, groupsNpcs };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const name = formData.get('name');

  await setPartyName(id, name);

  return null;
};

function NpcGroups() {
  const { groups, groupsNpcs } = useLoaderData();

  useTitle('Grupos de NPCs');

  return (
    <Form method="post">
      <Link to="../" className="menus__back-button">
        {'<<'} Volver
      </Link>

      <ul className="party__party-list">
        {groups.map((group, i) => (
          <NpcGroup
            npcs={groupsNpcs[i]}
            id={group.id}
            name={group.name}
            key={group.id}
          />
        ))}
      </ul>
    </Form>
  );
}

function NpcGroup(props) {
  const { npcs, id, name: initName } = props;

  const [name, setName] = useState(initName);
  const submit = useSubmit();

  function onNameChange() {
    submit(
      {
        id,
        name,
      },
      { method: 'post' }
    );
  }

  return (
    <li className="party party--with-name" key={id}>
      <Title
        className="party__party-session-title"
        value={name || 'test'}
        inputName={id}
        tag="h3"
        onChange={e => setName(e.target.value)}
        onBlur={onNameChange}
      />
      <Link to={`/characters/npc/groups/${id}`} className="party__party-link">
        <ul className="party__party-members">
          {npcs.map(npc => (
            <li className="party__party-member" key={npc.name}>
              {npc.name}
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
}

export default NpcGroups;
