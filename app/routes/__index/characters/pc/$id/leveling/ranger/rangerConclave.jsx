import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  RANGER_CONCLAVES,
  getRangerConclave,
  translateRangerConclave,
} from '~/domain/classes/ranger/ranger';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getRangerConclave(pc)) {
    throw new Error('Ya has escogido Arquetipo de Explorador');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error(
      'Solo los exploradores puedes escoger Arquetipo de Explorador'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const rangerConclave = formData.get('rangerConclave');

  await updateAttrsForClass(id, 'ranger', { rangerConclave });

  return redirect(`/characters/pc/${id}/summary`);
};

function RangerConclave() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 3');

  const [conclave, setConclave] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Arquetipo del Cazador</h2>

      <p className="app__paragraph">
        El ideal del explorador tiene dos vertientes clásicas: el Cazador y el
        Señor de las Bestias.
      </p>
      <p>
        <label>
          <span className="app__pale-text">
            Escoge Arquetipo de Explorador
          </span>
          <br />
          <select
            name="rangerConclave"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setConclave(e.target.value)}
          >
            <option value="" disabled></option>
            {RANGER_CONCLAVES.map(conclave => (
              <option value={conclave} key={conclave}>
                {translateRangerConclave(conclave)}
              </option>
            ))}
          </select>
        </label>
      </p>
      {conclave === 'hunter' && (
        <>
          <h3 className="app__pale-text">Arquetipo del Cazador</h3>
          <p className="app__paragraph">
            Asumir el arquetipo del Cazador implica aceptar tu papel como
            baluarte defensivo entre la civilización y el terror de las tierras
            salvajes. Al elegir la senda del Cazador, aprendes técnicas
            especializadas para la lucha contra las amenazas a las que te
            enfrentas, desde acabar con ogros y hordas de orcos hasta
            enfrentarse con gigantes e intimidantes dragones.
          </p>
        </>
      )}
      {conclave === 'beastMaster' && (
        <>
          <h3 className="app__pale-text">
            Arquetipo del Señor de las Bestias
          </h3>
          <p className="app__paragraph">
            El arquetipo de Señor de las Bestias encarna la amistad entre las
            razas civilizadas y las bestias del mundo. Concentrados en un mismo
            objetivo, explorador y bestia se unen para luchar contra los
            monstruosos enemigos que amenazan tanto a la civilización como a las
            tierras salvajes por igual. Adoptar el arquetipo de Señor de las
            Bestias significa comprometerte con este ideal, trabajando en
            asociación con un animal como compañero y amigo.
          </p>
        </>
      )}
      <p>
        <button type="submit" className="cards__button-card">
          Escoger Arquetipo
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
        El ideal del explorador tiene dos vertientes clásicas: el Cazador y el
        Señor de las Bestias.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default RangerConclave;
