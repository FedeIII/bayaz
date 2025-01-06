import { useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateFeatSelection } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { FEATS } from '~/domain/feats/featExplanations';
import { t } from '~/domain/translations';ƒ

const noOp = () => {};

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC no encontrado');
  }

  return { pc };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const selectedStat = formData.get('selectedStat');

  await updateFeatSelection(id, 'tavernBrawler', selectedStat);

  return redirect(`/characters/pc/${id}/summary`);
};

function TavernBrawlerSelection() {
  const { pc } = useLoaderData();

  useTitle(t(FEATS.tavernBrawler.name));

  const [selectedStat, setSelectedStat] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">{t(FEATS.tavernBrawler.name)}</h2>

      <div className="app__paragraph">
        {FEATS.tavernBrawler.description(null, pc, noOp, 'dontShowChooseTrait')}
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
            {['str', 'con'].map(stat => (
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

export default TavernBrawlerSelection;
