import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  getStudentOfWar,
  isBattleMaster,
} from '~/domain/classes/fighter/fighter';
import { getAllArtisansTools } from '~/domain/equipment/tools';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getStudentOfWar(pc)) {
    throw new Error('Ya has escogido Herramientas de Estudiante de Guerra');
  }

  if (pc.pClass !== 'fighter' && isBattleMaster(pc)) {
    throw new Error(
      'Solo los Maestros de Batalla puedes escoger Herramientas de Estudiante de Guerra'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const tools = formData.get('tools');

  await updateAttrsForClass(name, 'fighter', {
    studentOfWar: { name: tools },
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function StudentOfWarTools() {
  const { pc } = useLoaderData();

  useTitle('Maestro de Batalla nivel 3');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className="app__pale-text">Herramientas de Maestro de Batalla</h2>

      <p className="app__paragraph">
        En el nivel 3 ganas competencia con un tipo de herramientas de artesano
        de tu elección
      </p>
      <p>
        <label>
          <span className="app__pale-text">
            Escoge Herramientas de Artesano
          </span>
          <br />
          <select
            name="tools"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {getAllArtisansTools().map(tool => (
              <option value={tool.name} key={tool.name}>
                {tool.translation}
              </option>
            ))}
          </select>
        </label>
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Herramientas
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
        En el nivel 3 ganas competencia con un tipo de herramientas de artesano
        de tu elección
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default StudentOfWarTools;
