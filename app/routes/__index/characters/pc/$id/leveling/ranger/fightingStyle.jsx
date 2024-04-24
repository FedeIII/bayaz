import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  RANGER_FIGHTING_STYLES,
  getRangerFightingStyle,
  translateRangerFightingStyle,
} from '~/domain/classes/ranger/ranger';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getRangerFightingStyle(pc)) {
    throw new Error('Ya has escogido Estilo de Combate de Explorador');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error(
      'Solo los exploradores puedes escoger Estilo de Combate de Explorador'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const fightingStyle = formData.get('fightingStyle');

  await updateAttrsForClass(id, 'ranger', { fightingStyle });

  return redirect(`/characters/pc/${id}/summary`);
};

function RangerFightingStyle() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 2');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Estilo de Combate</h2>
      <p className="app__paragraph">
        A partir del nivel 2 adoptas un estilo particular de combate como
        especialidad. Elige una de las siguientes opciones. No puedes elegir un
        Estilo de Combate más de una vez, incluso si tienes la opción de escoger
        otro más adelante.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Estilo de Combate</span>
          <br />
          <select
            name="fightingStyle"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {RANGER_FIGHTING_STYLES.map(fightingStyle => (
              <option value={fightingStyle} key={fightingStyle}>
                {translateRangerFightingStyle(fightingStyle)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className="app__pale-text">
        {translateRangerFightingStyle('archery')}
      </h3>
      <p className="app__paragraph">
        Ganas un bonificador de +2 a las tiradas de ataque que hagas con armas a
        distancia
      </p>

      <h3 className="app__pale-text">
        {translateRangerFightingStyle('defense')}
      </h3>
      <p className="app__paragraph">
        Mientras lleves puesta una armadura ganas un +1 a la CA.
      </p>

      <h3 className="app__pale-text">
        {translateRangerFightingStyle('dueling')}
      </h3>
      <p className="app__paragraph">
        Cuando llevas un arma en una mano y ningún arma más, ganas un
        bonificador de +2 a las tiradas de daño con esa arma.
      </p>

      <h3 className="app__pale-text">
        {translateRangerFightingStyle('twoWeaponFighting')}
      </h3>
      <p className="app__paragraph">
        Cuando luchas con el estilo de lucha de dos armas, puedes añadir tu
        modificador de característica al daño del segundo ataque
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Estilo
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
        A partir del nivel 2 adoptas un estilo particular de combate como
        especialidad. Elige una de las siguientes opciones. No puedes elegir un
        Estilo de Combate más de una vez, incluso si tienes la opción de escoger
        otro más adelante.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default RangerFightingStyle;
