import { useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateFeatAttr } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { FEATS } from '~/domain/feats/featExplanations';
import { t } from '~/domain/translations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  return { pc };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const element = formData.get('element');

  await updateFeatAttr(id, 'elementalAdept', element);

  return redirect(`/characters/pc/${id}/summary`);
};

function ElementalAdept() {
  const { pc } = useLoaderData();

  useTitle(t(FEATS.elementalAdept.name));

  const [element, setElement] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">{t(FEATS.elementalAdept.name)}</h2>

      {FEATS.elementalAdept.description(null, pc, 'dontShowChooseTrait')}

      <p>
        <label>
          <span className="app__pale-text">Escoge Elemento</span>
          <br />
          <select
            name="element"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setElement(e.target.value)}
          >
            <option value="" disabled></option>
            {['acid', 'cold', 'fire', 'lightning', 'thunder'].map(element => (
              <option value={element} key={element}>
                {t(element)}
              </option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <button type="submit" className="cards__button-card">
          Escoger Elemento
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Diferentes guerreros escogen diferentes caminos para perfeccionar sus
        habilidades de combate. El arquetipo marcial que escojas definirá la
        forma de enfocar a tu guerrero.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ElementalAdept;
