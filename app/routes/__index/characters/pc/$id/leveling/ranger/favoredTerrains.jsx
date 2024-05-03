import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, pushAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { Card } from '~/components/cards/card';
import {
  FAVORED_TERRAINS,
  getFavoredTerrains,
  hasToPickFavoredTerrain,
  translateFavoredTerrain,
} from '~/domain/classes/ranger/ranger';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToPickFavoredTerrain(pc)) {
    throw new Error('Ya has escogido Terreno Predilecto en tu nivel');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error(
      'Solo los exploradores puedes escoger Terrenos Predilectos'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  const terrain = formData.getAll('terrain');

  await pushAttrsForClass(id, 'ranger', {
    favoredTerrains: terrain,
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function FavoredTerrains() {
  const { pc } = useLoaderData();
  const favoredTerrains = getFavoredTerrains(pc);

  useTitle('Explorador nivel ' + pc.level);

  const [selectedTerrain, setSelectedTerrain] = useState(null);

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Terreno Predilecto</h2>
      <p className="app__paragraph">
        Eliges terrenos predilectos adicionales en el nivel 6 y 10.
      </p>

      <p>
        <h3 className="app__pale-text">Escoge un nuevo Terreno Predilecto</h3>
        <div className="cards">
          <Card title="Tipos de terreno">
            <ul className="cards__card-list">
              {FAVORED_TERRAINS.filter(
                terrain => !favoredTerrains.includes(terrain)
              ).map(terrain => {
                return (
                  <li key={terrain}>
                    <label
                      htmlFor={terrain}
                      className={`checkbox__toSelect ${
                        selectedTerrain === terrain &&
                        'checkbox__selectedToSelect'
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={terrain}
                        name="terrain"
                        value={terrain}
                        checked={selectedTerrain === terrain}
                        onChange={() => setSelectedTerrain(terrain)}
                      />
                      {translateFavoredTerrain(terrain)}
                    </label>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger nuevo Terreno
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Eliges terrenos predilectos adicionales en el nivel 6 y 10.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default FavoredTerrains;
