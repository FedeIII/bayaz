import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  PACT_BOONS,
  getPactBoon,
  translatePactBoon,
} from '~/domain/classes/warlock/warlock';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getPactBoon(pc)) {
    throw new Error('Ya has escogido Don del Pacto');
  }

  if (pc.pClass !== 'warlock') {
    throw new Error('Solo los brujos puedes escoger Don del Pacto');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const pactBoon = formData.get('pactBoon');
  await updateAttrsForClass(id, 'warlock', { pactBoon });
  return redirect(`/characters/pc/${id}/summary`);
};

function PactBoon() {
  const { pc } = useLoaderData();

  useTitle('Brujo nivel 3');

  const [selectedBoon, setSelectedBoon] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Escoge Don del Pacto</h2>
      <p className="app__paragraph">
        A partir del nivel 3 tu Patrón de Otro Mundo te recompensa con un don
        por tus leales servicios. Ganas uno de los siguientes rasgos a tu
        elección.
      </p>
      <p>
        <label>
          <select
            name="pactBoon"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setSelectedBoon(e.target.value)}
          >
            <option value="" disabled></option>
            {PACT_BOONS.map(pactBoon => (
              <option value={pactBoon} key={pactBoon}>
                {translatePactBoon(pactBoon)}
              </option>
            ))}
          </select>
        </label>
      </p>
      {selectedBoon === 'pactOfTheChain' && (
        <>
          <h3 className="app__pale-text">Pacto de la Cadena</h3>
          <p className="app__paragraph">
            Aprendes el conjuro encontrar familiar y puedes lanzarlo como
            ritual. El conjuro no cuenta para tu número de conjuros conocidos.
          </p>
          <p className="app__paragraph">
            Cuando lanzas el conjuro, puedes elegir una de las formas habituales
            para tu familiar o una de las siguientes formas especiales:
            diablillo, pseudodragón, quasit o duende.
          </p>
          <p className="app__paragraph">
            Adicionalmente, cuando realizas la acción de Atacar, puedes
            sustituir uno de tus ataques para permitir que tu familiar haga uno
            de los suyos.
          </p>
        </>
      )}
      {selectedBoon === 'pactOfTheBlade' && (
        <>
          <h3 className="app__pale-text">Pacto del Filo</h3>
          <p className="app__paragraph">
            Puedes usar tu acción para crear un arma de pacto en tu mano vacía.
            Puedes elegir la forma que el arma cuerpo a cuerpo toma cada vez que
            la creas (mira el Capítulo 5 para ver las opciones de armas). Eres
            competente con ella mientras la blandes. Esta arma cuenta como
            mágica para el propósito de traspasar resistencias e inmunidades
            contra ataques y daño no mágicos.
          </p>
          <p className="app__paragraph">
            Tu arma de pacto desaparece si está a más de 5 pies (1,5 metros) de
            distancia de ti durante un minuto o más. También desaparece si usas
            este rasgo de nuevo, si descartas el arma (no requiere una acción),
            o si mueres.
          </p>
          <p className="app__paragraph">
            Puedes transformar un arma mágica en tu arma de pacto haciendo un
            ritual especial mientras sostienes tu arma. Llevas a cabo el ritual
            durante una hora, que puede ser realizado durante un descanso corto.
            Luego puedes descartar el arma, colocándola en un espacio
            extradimensional, y aparece siempre que creas tu arma de pacto a
            partir de entonces. No puedes afectar un artefacto o un arma
            inteligente de esta forma. El arma deja de ser tu arma de pacto si
            mueres, si realizas el ritual de una hora en un arma diferente o si
            llevas a cabo un ritual de una hora para romper tu vínculo con ella.
            El arma aparece a tus pies si está en el espacio extradimensional
            cuando el vínculo se rompe.
          </p>
        </>
      )}
      {selectedBoon === 'pactOfTheTome' && (
        <>
          <h3 className="app__pale-text">Pacto del Grimorio</h3>
          <p className="app__paragraph">
            Tu patrón te da un grimorio llamado Libro de las Sombras. Cuando
            ganas este rasgo, elige tres trucos de la lista de cualquier clase.
            Mientras el libro está contigo, puedes lanzar estos tres trucos a
            voluntad. No cuentan para tu número de trucos conocidos.
          </p>
          <p className="app__paragraph">
            Si pierdes tu Libro de las Sombras, puedes llevar a cabo una
            ceremonia de una hora para recibir un reemplazo de tu patrón. Esta
            ceremonia puede ser realizada durante un descanso corto o
            prolongado, y destruye el libro anterior. El libro se vuelve cenizas
            cuando mueres.
          </p>
        </>
      )}

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Don del Pacto
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
        A partir del nivel 3 tu Patrón de Otro Mundo te recompensa con un don
        por tus leales servicios. Ganas uno de los siguientes rasgos a tu
        elección.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default PactBoon;
