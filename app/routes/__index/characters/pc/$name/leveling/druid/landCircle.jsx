import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  LAND_CIRCLES,
  getDruidLandCircle,
  translateDruidLandCircle,
} from '~/domain/classes/druid/druid';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
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
  const name = formData.get('name');
  const landCircle = formData.get('landCircle');
  await updateAttrsForClass(name, 'druid', { landCircle });
  return redirect(`/characters/pc/${name}/summary`);
};

function LandCircle() {
  const { pc } = useLoaderData();

  useTitle('Druida nivel 3');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />
      <h2 className={styles.paleText}>Círculo de la Tierra</h2>
      <p className={styles.paragraph}>
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
          <span className={styles.paleText}>Escoge Círculo de la Tierra</span>
          <br />
          <select
            name="landCircle"
            defaultValue=""
            className={cardStyles.buttonCard}
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
        <button type="submit" className={cardStyles.buttonCard}>
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
      <h2 className={styles.errorText}>{error.message}</h2>

      <p className={styles.paragraph}>
        Tu conexión mística con la tierra te imbuye con la habilidad de lanzar
        ciertos conjuros. Al nivel 3, 5, 7 y 9 accedes a conjuros del círculo
        relacionados con la tierra en la que te convertiste en un druida. Elige
        una tierra —ártico, bosque, costa, desierto, infraoscuridad, montaña,
        pantano, o prado— y consulta la lista de conjuros asociados.
      </p>

      <p className={styles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default LandCircle;
