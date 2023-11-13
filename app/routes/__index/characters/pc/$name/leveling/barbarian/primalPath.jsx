import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { getPrimalPath } from '~/domain/classes/barbarian/barbarian';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getPrimalPath(pc)) {
    throw new Error('Ya has escogido Senda Primaria');
  }

  if (pc.pClass !== 'barbarian') {
    throw new Error('Solo los bárbaros puedes escoger Senda Primaria');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const primalPath = formData.get('primal-path');

  await updateAttrsForClass(name, 'barbarian', { primalPath });

  return redirect(`/characters/pc/${name}/summary`);
};

function PrimalPath() {
  const { pc } = useLoaderData();

  useTitle('Bárbaro nivel 3');

  const [path, setPath] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />
      <h2 className="app__pale-text">Senda Primaria</h2>
      <p className="app__paragraph">
        La furia arde en el corazón de cada bárbaro como una fragua que forja su
        destino hacia la grandeza. Aun así, diferentes bárbaros atribuyen su
        furia a diversas fuentes. Para algunos, es una reserva interior donde el
        dolor, la pena y la cólera son forjados en una furia tan dura como el
        acero. Otros lo ven como una bendición espiritual, el don de un tótem
        animal.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Senda Primaria</span>
          <br />
          <select
            name="primal-path"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setPath(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="berserker">Senda del Berserker</option>
            <option value="totem-warrior">Senda del Guerrero Totémico</option>
          </select>
        </label>
      </p>
      {path === 'berserker' && (
        <>
          <h3 className="app__pale-text">Senda del Berserker</h3>
          <p className="app__paragraph">
            Para algunos bárbaros, la furia es un medio para un fin, que
            generalmente es la propia violencia. La Senda del Berserker es un
            camino de furia desatada repleto de sangre. Cuando entras en la
            furia del berserker te sumerges en el caos de la batalla, sin
            preocuparte de tu salud o tu bienestar.
          </p>
        </>
      )}
      {path === 'totem-warrior' && (
        <>
          <h3 className="app__pale-text">Senda del Guerrero Totémico</h3>
          <p className="app__paragraph">
            La Senda del Guerrero Totémico es un camino espiritual; el bárbaro
            acepta el espíritu animal como guía, protector e inspiración. En la
            batalla, el espíritu de tu tótem te inunda con un poder
            sobrenatural, añadiendo fuerza mágica a tu furia de bárbaro.
          </p>
          <p className="app__paragraph">
            La mayoría de las tribus bárbaras consideran que un tótem animal se
            relaciona con un clan en particular. En esos casos, es inusual que
            un individuo tenga más de un espíritu tótem animal, aunque existen
            algunas excepciones.
          </p>
        </>
      )}
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
        La furia arde en el corazón de cada bárbaro como una fragua que forja su
        destino hacia la grandeza. Aun así, diferentes bárbaros atribuyen su
        furia a diversas fuentes. Para algunos, es una reserva interior donde el
        dolor, la pena y la cólera son forjados en una furia tan dura como el
        acero. Otros lo ven como una bendición espiritual, el don de un tótem
        animal.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default PrimalPath;
