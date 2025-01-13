import { useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc, updateFeatStat } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { FEATS } from '~/domain/feats/featExplanations';
import { hasFeat } from '~/domain/feats/featUtils';
import { t } from '~/domain/translations';

const noOp = () => {};

export const loader = async ({ params, request }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC no encontrado');
  }

  const { searchParams } = new URL(request.url);
  const featId = searchParams.get('featId');

  if (
    !featId ||
    !hasFeat(pc.toObject(), featId) ||
    !FEATS[featId]?.requiredStatSelection
  ) {
    return redirect(`/characters/pc/${params.id}/summary`);
  }

  return { pc, featId };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const featId = formData.get('featId');
  const selectedStat = formData.get('selectedStat');

  await updateFeatStat(id, featId, selectedStat);

  return redirect(`/characters/pc/${id}/summary`);
};

function FeatStatSelection() {
  const { pc, featId } = useLoaderData();

  useTitle(t(FEATS[featId].name));

  const [selectedStat, setSelectedStat] = useState('');

  const stats = Object.keys(FEATS[featId].bonus.stats);

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input readOnly type="text" name="featId" value={featId} hidden />

      <h2 className="app__pale-text">{t(FEATS[featId].name)}</h2>

      <div className="app__paragraph">
        {FEATS[featId].description(null, pc, noOp, 'dontShowChooseTrait')}
      </div>

      <p>
        <label>
          <span className="app__pale-text">Escoge Atributo</span>
          <br />
          <select
            name="selectedStat"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setSelectedStat(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Selecciona --
            </option>
            {stats.map(stat => (
              <option value={stat} key={stat}>
                {t(stat)}
              </option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <button
          type="submit"
          className="cards__button-card"
          disabled={!selectedStat}
        >
          Escoger Atributo
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
        A veces, ocurren errores al intentar seleccionar una opción. Por favor,
        intenta nuevamente.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default FeatStatSelection;
