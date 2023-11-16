import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getSession } from '~/services/session.server';
import { getUser, updateUser } from '~/services/user.server';

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = await getUser({ email: session.data.user.email });

  return json({ user });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const name = formData.get('name');

  await updateUser(email, { name });

  return null;
};

export default function Index() {
  const { welcome, user } = useLoaderData();

  return (
    <Form method="post">
      {welcome || 'Welcome'} {user.name}
      <input readOnly type="text" name="email" value={user.email} hidden />
      <div>
        <input type="text" name="name" defaultValue={user.name} />
      </div>
      <button type="submit">Guardar</button>
    </Form>
  );
}
