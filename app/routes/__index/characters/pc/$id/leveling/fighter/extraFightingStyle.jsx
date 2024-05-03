import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  FIGHTING_STYLES,
  getExtraFightingStyle,
  getFightingStyle,
  isChampion,
  translateFightingStyle,
} from '~/domain/classes/fighter/fighter';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getExtraFightingStyle(pc)) {
    throw new Error('Ya has escogido Estilo de Combate Adicional');
  }

  if (pc.pClass !== 'fighter' || !isChampion(pc)) {
    throw new Error(
      'Solo los Campeones puedes escoger Estilo de Combate Adicional'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const extraFightingStyle = formData.get('extraFightingStyle');

  await updateAttrsForClass(id, 'fighter', { extraFightingStyle });

  return redirect(`/characters/pc/${id}/summary`);
};

function ExtraFightingStyle() {
  const { pc } = useLoaderData();

  useTitle('Campeón nivel 10');

  const fightingStyle = getFightingStyle(pc);

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Estilo de Combate Adicional</h2>

      <p className="app__paragraph">
        Adoptas un estilo particular de combate como especialidad. Elige una de
        las siguientes opciones. No puedes escoger un Estilo de Combate más de
        una vez, incluso si tienes la opción de escoger otro más adelante.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Arquetipo Marcial</span>
          <br />
          <select
            name="extraFightingStyle"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {FIGHTING_STYLES.filter(style => style !== fightingStyle).map(
              extraFightingStyle => (
                <option value={extraFightingStyle} key={extraFightingStyle}>
                  {translateFightingStyle(extraFightingStyle)}
                </option>
              )
            )}
          </select>
        </label>
      </p>

      <div className="app__paragraph">
        <h3 className="app__pale-text">{translateFightingStyle('archery')}</h3>
        Ganas un bonificador de +2 a las tiradas de ataque que hagas con armas a
        distancia.
      </div>

      <div className="app__paragraph">
        <h3 className="app__pale-text">{translateFightingStyle('defense')}</h3>
        Mientras lleves puesta una armadura ganas un +1 la CA.
      </div>

      <div className="app__paragraph">
        <h3 className="app__pale-text">{translateFightingStyle('dueling')}</h3>
        Cuando llevas un arma cuerpo a cuerpo en una mano y ningún arma más,
        ganas un bonificador de +2 a las tiradas de daño con esa arma.
      </div>

      <div className="app__paragraph">
        <h3 className="app__pale-text">
          {translateFightingStyle('great-Weapon-fighting')}
        </h3>
        Cuando obtienes un 1 o un 2 en un dado de daño con un arma a dos manos,
        puedes volver a realizar la tirada de daño y debiendo usar la nueva
        tirada, incluso si vuelve a ser un 1 o un 2. El arma debe ser un arma a
        dos manos o tener la propiedad versátil para ganar este beneficio.
      </div>

      <div className="app__paragraph">
        <h3 className="app__pale-text">
          {translateFightingStyle('protection')}
        </h3>
        Cuando una criatura que puedes ver ataca a un objetivo que no eres tú y
        está a 5 pies o menos de ti, puedes usar tu reacción para hacer que el
        enemigo tenga desventaja en la tirada de ataque. Debes estar usando un
        escudo.
      </div>

      <div className="app__paragraph">
        <h3 className="app__pale-text">
          {translateFightingStyle('two-weapon-fighting')}
        </h3>
        Cuando luchas con el estilo de lucha de dos armas, puedes añadir tu
        modificador de característica al daño del segundo ataque.
      </div>
      <div>
        <button type="submit" className="cards__button-card">
          Escoger Estilo de Combate
        </button>
      </div>
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
        Adoptas un estilo particular de combate como especialidad. Elige una de
        las siguientes opciones. No puedes escoger un Estilo de Combate más de
        una vez, incluso si tienes la opción de escoger otro más adelante.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ExtraFightingStyle;
