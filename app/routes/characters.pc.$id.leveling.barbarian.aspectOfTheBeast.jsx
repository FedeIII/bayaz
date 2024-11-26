import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { getAspectOfTheBeastTotem } from '~/domain/classes/barbarian/barbarian';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getAspectOfTheBeastTotem(pc)) {
    throw new Error('Ya has escogido Aspecto de la Bestia');
  }

  if (pc.pClass !== 'barbarian') {
    throw new Error('Solo los bárbaros puedes escoger Aspecto de la Bestia');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const aspectOfTheBeast = formData.get('aspect-beast');
  const animal = formData.get('animal');

  await updateAttrsForClass(id, 'barbarian', {
    aspectOfTheBeast: { totemType: aspectOfTheBeast, animal },
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function AspectOfTheBeast() {
  const { pc } = useLoaderData();

  useTitle('Bárbaro nivel 6');

  const [totem, setTotem] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Aspecto de la Bestia</h2>
      <p className="app__paragraph">
        En el nivel 6, ganas un beneficio mágico basado en el tótem animal de tu
        elección. Puedes elegir el mismo animal que elegiste en nivel 3 o uno
        distinto.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge tipo de Tótem</span>{' '}
          <select
            name="aspect-beast"
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
            Ganas la fuerza de un oso. Tu capacidad de carga (incluyendo tu
            carga máxima y tu capacidad de levantar y arrastrar) se duplica, y
            tienes ventaja en las pruebas de Fuerza realizadas para empujar,
            levantar, tirar o romper objetos.
          </p>
        </>
      )}

      {totem === 'eagle' && (
        <>
          <h3 className="app__pale-text">Águila</h3>
          <p className="app__paragraph">
            Ganas la vista de un águila. Puedes ver a una distancia de hasta una
            milla (aprox. 1.600 metros) sin dificultad, y discernir hasta los
            más pequeños detalles de algo que no diste más de 100 pies (30
            metros) de ti. Además, la luz tenue no te impone desventaja en tus
            pruebas de Sabiduría (Percepción).
          </p>
        </>
      )}

      {totem === 'wolf' && (
        <>
          <h3 className="app__pale-text">Lobo</h3>
          <p className="app__paragraph">
            Ganas las capacidades de caza de un lobo. Puedes rastrear a otras
            criaturas mientras viajas a ritmo rápido y puedes moverte
            sigilosamente mientras viajas a ritmo normal (ver el Capítulo 8 para
            las reglas de Ritmo de Viaje).
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
        En el nivel 6, ganas un beneficio mágico basado en el tótem animal de tu
        elección. Puedes elegir el mismo animal que elegiste en nivel 3 o uno
        distinto.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default AspectOfTheBeast;
