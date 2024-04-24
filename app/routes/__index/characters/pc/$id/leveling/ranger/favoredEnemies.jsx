import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, pushAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { Card } from '~/components/cards/card';
import {
  FAVORED_ENEMIES,
  FAVORED_ENEMIES_HUMANOIDS,
  getFavoredEnemies,
  hasToPickFavoredEnemies,
  translateFavoredEnemy,
} from '~/domain/classes/ranger/ranger';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToPickFavoredEnemies(pc)) {
    throw new Error('Ya has escogido Enemigo Predilecto en tu nivel');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error(
      'Solo los exploradores puedes escoger Enemigos Predilectos'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  const enemy = formData.getAll('enemy');

  await pushAttrsForClass(id, 'ranger', {
    favoredEnemies: enemy,
    favoredEnemiesSelection: true,
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function FavoredEnemies() {
  const { pc } = useLoaderData();
  const favoredEnemies = getFavoredEnemies(pc);

  useTitle('Explorador nivel ' + pc.level);

  const [selectedEnemy, setSelectedEnemy] = useState(null);

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Enemigo Predilecto</h2>
      <p className="app__paragraph">
        Eliges un enemigo predilecto adicional, así como un lenguaje asociado,
        en el nivel 6 y en el 14. Conforme ganas niveles, tus elecciones
        deberían reflejar los tipos de monstruos que has encontrado en tus
        aventuras.
      </p>

      <p>
        <h3 className="app__pale-text">Escoge un nuevo Enemigo Predilecto</h3>
        <div className="cards">
          <Card title="Tipos de criaturas">
            <ul className="cards__card-list">
              {FAVORED_ENEMIES.filter(
                enemy => !favoredEnemies.includes(enemy)
              ).map(enemy => {
                return (
                  <li key={enemy}>
                    <label
                      htmlFor={enemy}
                      className={`checkbox__toSelect ${
                        selectedEnemy === enemy && 'checkbox__selectedToSelect'
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={enemy}
                        name="enemy"
                        value={enemy}
                        checked={selectedEnemy === enemy}
                        onChange={() => setSelectedEnemy(enemy)}
                      />
                      {translateFavoredEnemy(enemy)}
                    </label>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card title="Tipos de humanoides">
            <ul className="cards__card-list">
              {FAVORED_ENEMIES_HUMANOIDS.filter(
                enemy => !favoredEnemies.includes(enemy)
              ).map(enemy => {
                return (
                  <li key={enemy}>
                    <label
                      htmlFor={enemy}
                      className={`checkbox__toSelect ${
                        selectedEnemy === enemy && 'checkbox__selectedToSelect'
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={enemy}
                        name="enemy"
                        value={enemy}
                        checked={selectedEnemy === enemy}
                        onChange={() => setSelectedEnemy(enemy)}
                      />
                      {translateFavoredEnemy(enemy)}
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
          Escoger nuevo Enemigo
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Eliges un enemigo predilecto adicional, así como un lenguaje asociado,
        en el nivel 6 y en el 14. Conforme ganas niveles, tus elecciones
        deberían reflejar los tipos de monstruos que has encontrado en tus
        aventuras.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default FavoredEnemies;
