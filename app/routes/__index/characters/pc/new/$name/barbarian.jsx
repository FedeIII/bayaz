import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';

import { getPc, updatePc } from '~/services/pc.server';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const primalPath = formData.get('primal-path');

  await updatePc({ name, barbarian: { primalPath } });

  return redirect(`../${name}/summary`);
};

function PcBarbarianSkills() {
  const { pc } = useLoaderData();
  const { age, pClass, height, name, race, size, speed, subrace, weight } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <Form method="post">
      <h2>{name}'s barbarian skills</h2>
      <input readOnly type="text" name="name" value={name} hidden />

      <p>
        <label>
          Senda Primaria:{' '}
          <select name="primal-path">
            <option value="berserker">Senda del Berserker</option>
            <option value="totem-warrior">Senda del Guerrero Totémico</option>
          </select>
        </label>
      </p>

      <p>
        <button type="submit" disabled={isCreating}>
          {isCreating ? 'Creando...' : 'Continuar'}
        </button>
      </p>
    </Form>
  );
}

export default PcBarbarianSkills;
