import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateClassAttrs } from '~/services/pc.server';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';
import { useTitle } from '~/components/hooks/useTitle';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (pc.classAttrs?.aspectOfTheBeast?.totemicAttunement) {
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

  await updateClassAttrs(name, {
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

      <h2 className={styles.paleText}>Sintonía Totémica</h2>
      <p className={styles.paragraph}>
        En el nivel 14, ganas un beneficio mágico basado en el tótem animal de
        tu elección. Puedes elegir el mismo animal que elegiste previamente o
        uno distinto.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>Escoge tipo de Tótem</span>{' '}
          <select
            name="totemic-attunement"
            defaultValue=""
            className={cardStyles.buttonCard}
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
          <h3 className={styles.paleText}>Oso</h3>
          <p className={styles.paragraph}>
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
          <h3 className={styles.paleText}>Águila</h3>
          <p className={styles.paragraph}>
            Mientras estás en furia, tienes una velocidad de vuelo igual a tu
            velocidad de movimiento actual. Este beneficio sólo funciona en
            breves intervalos de tiempo; caes si terminas tu turno en el aire y
            nada más te mantiene en vuelo.
          </p>
        </>
      )}

      {totem === 'wolf' && (
        <>
          <h3 className={styles.paleText}>Lobo</h3>
          <p className={styles.paragraph}>
            Mientras estás en furia, puedes usar una acción adicional en tu
            turno para tumbar a una criatura Grande o más pequeña cuando
            impactas con un ataque cuerpo a cuerpo.
          </p>
        </>
      )}

      <br />
      <br />
      <p className={styles.paragraph}>
        Tu tótem animal puede ser un animal relacionado con los listados aquí,
        pero más apropiado para tu tierra natal. Por ejemplo, podrías elegir un
        halcón o un buitre en lugar de un águila.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>Escoge animal</span>{' '}
          <input type="text" name="animal" className={cardStyles.buttonCard} />
        </label>
      </p>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
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
      <h2 className={appStyles.errorText}>{error.message}</h2>

      <p className={styles.paragraph}>
        En el nivel 14, ganas un beneficio mágico basado en el tótem animal de
        tu elección. Puedes elegir el mismo animal que elegiste previamente o
        uno distinto.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default TotemicAttunement;
