import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  HUNTERS_PREY,
  getHuntersPrey,
  translateHuntersPrey,
} from '~/domain/classes/ranger/ranger';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getHuntersPrey(pc)) {
    throw new Error('Ya has escogido Presa del Cazador');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error('Solo los exploradores puedes escoger Presa del Cazador');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const huntersPrey = formData.get('huntersPrey');

  await updateAttrsForClass(id, 'ranger', { huntersPrey });

  return redirect(`/characters/pc/${id}/summary`);
};

function HuntersPrey() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 3');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Presa del Cazador</h2>

      <p className="app__paragraph">
        A nivel 3 ganas uno de los siguientes rasgos de tu elección.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Presa del Cazador</span>
          <br />
          <select
            name="huntersPrey"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {HUNTERS_PREY.map(prey => (
              <option value={prey} key={prey}>
                {translateHuntersPrey(prey)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className="app__pale-text">
        {translateHuntersPrey('colossusSlayer')}
      </h3>
      <p className="app__paragraph">
        Tu tenacidad puede desgastar hasta a los enemigos más potentes. Cuando
        golpees a una criatura con un arma, ésta sufre un 1d8 adicional de daño
        si está por debajo de su máximo de Puntos de Golpe. Puedes causar este
        daño extra sólo una vez por turno.
      </p>

      <h3 className="app__pale-text">{translateHuntersPrey('giantKiller')}</h3>
      <p className="app__paragraph">
        Cuando una criatura Grande o más grande que tú, a una distancia máxima
        de 5 pies de ti, te golpea o falla con su ataque contra ti, puedes
        utilizar tu reacción para atacar a esa criatura inmediatamente después
        de su ataque, mientras puedas verla.
      </p>

      <h3 className="app__pale-text">
        {translateHuntersPrey('hordeBreaker')}
      </h3>
      <p className="app__paragraph">
        Una vez por turno, cuando hagas un ataque con armas, puedes realizar
        otro ataque con la misma arma contra una criatura diferente que esté a
        menos de 5 pies del objetivo original y dentro del rango de tu arma.
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Presa
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
        A nivel 3 ganas uno de los siguientes rasgos de tu elección.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default HuntersPrey;
