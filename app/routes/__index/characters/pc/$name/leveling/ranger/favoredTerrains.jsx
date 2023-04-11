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

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
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
  const name = formData.get('name');

  const terrain = formData.getAll('terrain');

  await pushAttrsForClass(name, 'ranger', {
    favoredTerrains: terrain,
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function FavoredTerrains() {
  const { pc } = useLoaderData();
  const favoredTerrains = getFavoredTerrains(pc);

  useTitle('Explorador nivel ' + pc.level);

  const [selectedTerrain, setSelectedTerrain] = useState(null);

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={appStyles.paleText}>Terreno Predilecto</h2>
      <p className={appStyles.paragraph}>
        Eliges terrenos predilectos adicionales en el nivel 6 y 10.
      </p>

      <p>
        <h3 className={appStyles.paleText}>
          Escoge un nuevo Terreno Predilecto
        </h3>
        <div className={`${cardStyles.cards}`}>
          <Card title="Tipos de terreno">
            <ul className={cardStyles.cardList}>
              {FAVORED_TERRAINS.filter(
                terrain => !favoredTerrains.includes(terrain)
              ).map(terrain => {
                return (
                  <li key={terrain}>
                    <label
                      htmlFor={terrain}
                      className={`${styles.toSelect} ${
                        selectedTerrain === terrain && styles.selectedToSelect
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
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger nuevo Terreno
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className={appStyles.errorText}>{error.message}</h2>

      <p className={appStyles.paragraph}>
        Eliges terrenos predilectos adicionales en el nivel 6 y 10.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default FavoredTerrains;
