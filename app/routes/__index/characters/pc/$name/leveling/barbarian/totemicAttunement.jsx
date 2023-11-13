import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (pc.classAttrs?.barbarian?.totemicAttunement) {
    throw new Error('Ya has escogido Sintonía Totémica');
  }

  if (pc.pClass !== 'barbarian') {
    throw new Error('Solo los bárbaros puedes escoger Sintonía Totémica');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const totemicAttunement = formData.get('totemic-attunement');
  const animal = formData.get('animal');

  await updateAttrsForClass(name, 'barbarian', {
    totemicAttunement: { totemType: totemicAttunement, animal },
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function TotemicAttunement() {
  const { pc } = useLoaderData();

  useTitle('Bárbaro nivel 14');

  const [totem, setTotem] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className="app__pale-text">Sintonía Totémica</h2>
      <p className="app__paragraph">
        En el nivel 14, ganas un beneficio mágico basado en el tótem animal de
        tu elección. Puedes elegir el mismo animal que elegiste previamente o
        uno distinto.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge tipo de Tótem</span>{' '}
          <select
            name="totemic-attunement"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setTotem(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="bear">Oso</option>
            <option value="eagle">Águila</option>
            <option value="wolf">Lobo</option>
          </select>
        </label>
      </p>

      {totem === 'bear' && (
        <>
          <h3 className="app__pale-text">Oso</h3>
          <p className="app__paragraph">
            Mientras estás en furia, las criaturas a 5 pies (1,5 metros) de ti
            que te sean hostiles tienen desventaja en las tiradas de ataque
            contra cualquier otro que no seas tú u otro personaje con este
            rasgo. Un enemigo es inmune a este efecto si no puede verte u oírte,
            o si no puede ser asustado.
          </p>
        </>
      )}

      {totem === 'eagle' && (
        <>
          <h3 className="app__pale-text">Águila</h3>
          <p className="app__paragraph">
            Mientras estás en furia, tienes una velocidad de vuelo igual a tu
            velocidad de movimiento actual. Este beneficio sólo funciona en
            breves intervalos de tiempo; caes si terminas tu turno en el aire y
            nada más te mantiene en vuelo.
          </p>
        </>
      )}

      {totem === 'wolf' && (
        <>
          <h3 className="app__pale-text">Lobo</h3>
          <p className="app__paragraph">
            Mientras estás en furia, puedes usar una acción adicional en tu
            turno para tumbar a una criatura Grande o más pequeña cuando
            impactas con un ataque cuerpo a cuerpo.
          </p>
        </>
      )}

      <br />
      <br />
      <p className="app__paragraph">
        Tu tótem animal puede ser un animal relacionado con los listados aquí,
        pero más apropiado para tu tierra natal. Por ejemplo, podrías elegir un
        halcón o un buitre en lugar de un águila.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge animal</span>{' '}
          <input type="text" name="animal" className="cards__button-card" />
        </label>
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger
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
        En el nivel 14, ganas un beneficio mágico basado en el tótem animal de
        tu elección. Puedes elegir el mismo animal que elegiste previamente o
        uno distinto.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default TotemicAttunement;
