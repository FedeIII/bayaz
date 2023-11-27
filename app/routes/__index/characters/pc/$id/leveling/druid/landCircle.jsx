import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  LAND_CIRCLES,
  getDruidLandCircle,
  translateDruidLandCircle,
} from '~/domain/classes/druid/druid';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getDruidLandCircle(pc)) {
    throw new Error('Ya has escogido Círculo de la Tierra');
  }

  if (pc.pClass !== 'druid') {
    throw new Error('Solo los druidas puedes escoger Círculo de la Tierra');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const landCircle = formData.get('landCircle');
  await updateAttrsForClass(id, 'druid', { landCircle });
  return redirect(`/characters/pc/${id}/summary`);
};

function LandCircle() {
  const { pc } = useLoaderData();

  useTitle('Druida nivel 3');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <h2 className="app__pale-text">Círculo de la Tierra</h2>
      <p className="app__paragraph">
        Tu conexión mística con la tierra te imbuye con la habilidad de lanzar
        ciertos conjuros. Al nivel 3, 5, 7 y 9 accedes a conjuros del círculo
        relacionados con la tierra en la que te convertiste en un druida. Elige
        una tierra —ártico, bosque, costa, desierto, infraoscuridad, montaña,
        pantano, o prado— y consulta la lista de conjuros asociados.
      </p>
      <p>
        Una vez que adquieras acceso a un conjuro del círculo, siempre lo tienes
        preparado y no cuenta para el número de conjuros que puedes preparar
        cada día. Si tienes acceso a un conjuro que no aparece en la lista del
        druida, no obstante cuenta como un conjuro de druida para ti.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Círculo de la Tierra</span>
          <br />
          <select
            name="landCircle"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {LAND_CIRCLES.map(circle => (
              <option value={circle} key={circle}>
                {translateDruidLandCircle(circle)}
              </option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <button type="submit" className="cards__button-card">
          Escoger Círculo
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
        Tu conexión mística con la tierra te imbuye con la habilidad de lanzar
        ciertos conjuros. Al nivel 3, 5, 7 y 9 accedes a conjuros del círculo
        relacionados con la tierra en la que te convertiste en un druida. Elige
        una tierra —ártico, bosque, costa, desierto, infraoscuridad, montaña,
        pantano, o prado— y consulta la lista de conjuros asociados.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default LandCircle;
