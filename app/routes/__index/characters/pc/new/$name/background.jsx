import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';

import { BACKGROUNDS, translateBackground } from '~/domain/backgrounds';
import BackgroundSelection from '~/components/backgrounds/backgroundSelection';

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
  const background = formData.get('background');
  const skills = formData.getAll('skills[]') || [];
  const languages = formData.getAll('languages[]') || [];
  const items =
    formData.getAll('items[]')?.map(pairs => ({
      name: pairs.split(',')[0],
      amount: pairs.split(',')[1],
    })) || [];
  const money = formData.get('money')?.split(',');

  const pc = await getPc(name);

  await updatePc({
    name,
    background: { name: background, skills },
    languages: [...pc.languages, ...languages],
    equipment: [...pc.equipment, ...items],
    money: pc.money.map((coin, i) => coin + money[i]),
  });

  return redirect(`/characters/pc/new/${name}/equipment`);
};

function PcBackground() {
  const { pc } = useLoaderData();
  const { name } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [background, setBackground] = useState('');
  const [canContinue, setCanContinue] = useState(false);

  return (
    <Form method="post">
      <h2>Trasfondo de {name}</h2>
      <input readOnly type="text" name="name" value={name} hidden />

      <p>
        <select
          name="background"
          value={background}
          onChange={e => setBackground(e.target.value)}
        >
          <option value="" disabled>
            Escoge trasfondo
          </option>
          {Object.keys(BACKGROUNDS).map(backgroundName => (
            <option value={backgroundName} key={backgroundName}>
              {translateBackground(backgroundName)}
            </option>
          ))}
        </select>
      </p>

      {background && (
        <BackgroundSelection
          pc={pc}
          backgroundName={background}
          setCanContinue={setCanContinue}
        />
      )}

      <p>
        <button type="submit" disabled={isCreating || !canContinue}>
          {isCreating
            ? 'Creando...'
            : canContinue
            ? 'Continuar'
            : 'Elige habilidades'}
        </button>
      </p>
    </Form>
  );
}

export default PcBackground;
