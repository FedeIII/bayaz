import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  HUNTER_DEFENSIVE_TACTICS,
  getHunterDefensiveTactics,
  translateHuntersDefensiveTactics,
} from '~/domain/classes/ranger/ranger';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getHunterDefensiveTactics(pc)) {
    throw new Error('Ya has escogido Táctica Defensiva');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error('Solo los exploradores puedes escoger Táctica Defensiva');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const defensiveTactics = formData.get('defensiveTactics');

  await updateAttrsForClass(id, 'ranger', { defensiveTactics });

  return redirect(`/characters/pc/${id}/summary`);
};

function HunterDefensiveTactics() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 7');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Táctica Defensiva</h2>
      <p className="app__paragraph">
        A nivel 7 ganas uno de los siguientes rasgos de tu elección.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Táctica Defensiva</span>
          <br />
          <select
            name="defensiveTactics"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {HUNTER_DEFENSIVE_TACTICS.map(defensiveTactics => (
              <option value={defensiveTactics} key={defensiveTactics}>
                {translateHuntersDefensiveTactics(defensiveTactics)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className="app__pale-text">
        {translateHuntersDefensiveTactics('escapeTheHorde')}
      </h3>
      <p className="app__paragraph">
        Los ataques de oportunidad contra ti se hacen con desventaja.
      </p>

      <h3 className="app__pale-text">
        {translateHuntersDefensiveTactics('multiattackDefense')}
      </h3>
      <p className="app__paragraph">
        Cuando una criatura te golpea con un ataque, ganas un bonificador +4 a
        la CA contra todos los ataques posteriores realizados por esa criatura
        durante el resto del turno.
      </p>

      <h3 className="app__pale-text">
        {translateHuntersDefensiveTactics('steelWill')}
      </h3>
      <p className="app__paragraph">
        Tienes ventaja en tiradas de salvación contra miedo.
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Táctica
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
        A nivel 7 ganas uno de los siguientes rasgos de tu elección.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default HunterDefensiveTactics;
