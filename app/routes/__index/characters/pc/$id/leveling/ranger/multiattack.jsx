import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  HUNTER_MULTIATTACK,
  getHunterMultiattack,
  translateHunterMultiattack,
} from '~/domain/classes/ranger/ranger';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getHunterMultiattack(pc)) {
    throw new Error('Ya has escogido Ataque Múltiple');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error('Solo los exploradores puedes escoger Ataque Múltiple');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const multiattack = formData.get('multiattack');

  await updateAttrsForClass(id, 'ranger', { multiattack });

  return redirect(`/characters/pc/${id}/summary`);
};

function HunterMultiattack() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 11');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Ataque Múltiple</h2>
      <p className="app__paragraph">
        A nivel 11 ganas uno de los siguientes rasgos de tu elección.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Ataque Múltiple</span>
          <br />
          <select
            name="multiattack"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {HUNTER_MULTIATTACK.map(multiattack => (
              <option value={multiattack} key={multiattack}>
                {translateHunterMultiattack(multiattack)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className="app__pale-text">
        {translateHunterMultiattack('volley')}
      </h3>
      <p className="app__paragraph">
        Puedes utilizar tu acción para hacer un ataque a distancia contra
        cualquier número de criaturas en torno a 10 pies (3 metros) de un punto
        que puedas ver (siempre dentro del alcance de tu arma). Debes tener
        munición para cada objetivo, como siempre, y realizar una tirada de
        ataque por separado para cada uno de ellos.
      </p>

      <h3 className="app__pale-text">
        {translateHunterMultiattack('whirlwindAttack')}
      </h3>
      <p className="app__paragraph">
        Puedes utilizar tu acción para realizar un ataque cuerpo a cuerpo contra
        cualquier número de criaturas que estén a 5 pies (1,5 metros) de ti,
        realizando una tirada de ataque separada para cada uno de ellos.
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Ataque
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
        A nivel 11 ganas uno de los siguientes rasgos de tu elección.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default HunterMultiattack;
