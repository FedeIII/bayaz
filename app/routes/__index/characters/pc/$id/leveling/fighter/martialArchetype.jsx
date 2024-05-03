import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  MARTIAL_ARCHETYPES,
  getMartialArchetype,
  translateMartialArchetype,
} from '~/domain/classes/fighter/fighter';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getMartialArchetype(pc)) {
    throw new Error('Ya has escogido Arquetipo Marcial');
  }

  if (pc.pClass !== 'fighter') {
    throw new Error('Solo los guerreros puedes escoger Arquetipo Marcial');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const martialArchetype = formData.get('martialArchetype');

  await updateAttrsForClass(id, 'fighter', { martialArchetype });

  return redirect(`/characters/pc/${id}/summary`);
};

function MartialAchetype() {
  const { pc } = useLoaderData();

  useTitle('Guerrero nivel 3');

  const [archetype, setArchetype] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Arquetipo Marcial</h2>

      <p className="app__paragraph">
        Diferentes guerreros escogen diferentes caminos para perfeccionar sus
        habilidades de combate. El arquetipo marcial que escojas definirá la
        forma de enfocar a tu guerrero.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Arquetipo Marcial</span>
          <br />
          <select
            name="martialArchetype"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setArchetype(e.target.value)}
          >
            <option value="" disabled></option>
            {MARTIAL_ARCHETYPES.map(archetype => (
              <option value={archetype} key={archetype}>
                {translateMartialArchetype(archetype)}
              </option>
            ))}
          </select>
        </label>
      </p>
      {archetype === 'eldritchKnight' && (
        <p className="app__paragraph">
          <h3 className="app__pale-text">
            {translateMartialArchetype(archetype)}
          </h3>
          El arquetipo de Caballero Arcano combina la maestría marcial común en
          todos los guerreros con un cuidadoso estudio de la magia. Los
          Caballeros Arcanos usan técnicas mágicas similares a aquellas
          practicadas por los magos. Centran sus estudios en dos de las ocho
          escuelas de magia: abjuración y evocación. Los conjuros de abjuración
          ofrecen protección adicional en la batalla al Caballero Arcano, y los
          hechizos de evocación hacen daño a varios enemigos al mismo tiempo,
          ampliando el rango del luchador en combate. Estos caballeros aprenden
          un número relativamente pequeño de conjuros, memorizándolos en lugar
          de guardarlos en libros de conjuros
        </p>
      )}
      {archetype === 'champion' && (
        <p className="app__paragraph">
          <h3 className="app__pale-text">
            {translateMartialArchetype(archetype)}
          </h3>
          El arquetipo de Campeón se centra en el desarrollo de la fuerza bruta,
          elevándola a una perfección mortífera. Aquellos que tomen como camino
          este arquetipo combinarán el entrenamiento riguroso con la excelencia
          física para infligir golpes devastadores.
        </p>
      )}
      {archetype === 'battleMaster' && (
        <p className="app__paragraph">
          <h3 className="app__pale-text">
            {translateMartialArchetype(archetype)}
          </h3>
          Aquellos que escojan el arquetipo Maestro de Batalla emplean técnicas
          marciales que han pasado a través de generaciones. Para un Maestro de
          Batalla, el combate es un campo académico, incluyendo algunas veces
          objetivos más allá de la batalla, como la forja de armas y la
          caligrafía. No todos los guerreros absorben las lecciones de historia,
          teoría y arte que son reflejadas en el arquetipo del Maestro de
          Batalla, pero aquellos que lo hacen son guerreros muy bien preparados,
          con grandes habilidades y conocimientos.
        </p>
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
        Diferentes guerreros escogen diferentes caminos para perfeccionar sus
        habilidades de combate. El arquetipo marcial que escojas definirá la
        forma de enfocar a tu guerrero.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default MartialAchetype;
