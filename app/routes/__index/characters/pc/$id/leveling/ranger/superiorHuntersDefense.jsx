import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  SUPERIOR_HUNTERS_DEFENSE,
  getSuperiorHuntersDefense,
  translateSuperiorHuntersDefense,
} from '~/domain/classes/ranger/ranger';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getSuperiorHuntersDefense(pc)) {
    throw new Error('Ya has escogido Defensa Superior del Cazador');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error(
      'Solo los exploradores puedes escoger Defensa Superior del Cazador'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const superiorHuntersDefense = formData.get('superiorHuntersDefense');

  await updateAttrsForClass(id, 'ranger', { superiorHuntersDefense });

  return redirect(`/characters/pc/${id}/summary`);
};

function SuperiorHuntersDefense() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 15');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Defensa Superior del Cazador</h2>
      <p className="app__paragraph">
        A nivel 15 ganas uno de los siguientes rasgos de tu elección.
      </p>
      <p>
        <label>
          <span className="app__pale-text">
            Escoge Defensa Superior del Cazador
          </span>
          <br />
          <select
            name="superiorHuntersDefense"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {SUPERIOR_HUNTERS_DEFENSE.map(superiorHuntersDefense => (
              <option
                value={superiorHuntersDefense}
                key={superiorHuntersDefense}
              >
                {translateSuperiorHuntersDefense(superiorHuntersDefense)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className="app__pale-text">
        {translateSuperiorHuntersDefense('evasion')}
      </h3>
      <p className="app__paragraph">
        Puedes esquivar ágilmente algunos efectos de área, como por ejemplo el
        ardiente aliento de un dragón rojo o un conjuro de rayo relampagueante.
        Cuando estés sujeto a un efecto que te permite hacer una tirada de
        salvación de Destreza para sufrir sólo la mitad de daño, en lugar de eso
        no sufres ningún daño si tienes éxito en la tirada de salvación, y solo
        la mitad de daño si fallas la tirada.
      </p>

      <h3 className="app__pale-text">
        {translateSuperiorHuntersDefense('standAgainstTheTide')}
      </h3>
      <p className="app__paragraph">
        Cuando una criatura hostil falla su ataque cuerpo a cuerpo sobre ti,
        puedes utilizar tu reacción para obligarla a repetir el mismo ataque
        contra otra criatura (que no sea sobre sí misma) de tu elección.
      </p>

      <h3 className="app__pale-text">
        {translateSuperiorHuntersDefense('uncannyDodge')}
      </h3>
      <p className="app__paragraph">
        Cuando un atacante que puedas ver te golpea, puedes utilizar tu reacción
        para reducir a la mitad el daño de los ataques recibidos.
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Defensa
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
        A nivel 15 ganas uno de los siguientes rasgos de tu elección.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default SuperiorHuntersDefense;
