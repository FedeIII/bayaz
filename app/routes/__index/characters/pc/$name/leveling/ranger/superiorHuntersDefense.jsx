import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  SUPERIOR_HUNTERS_DEFENSE,
  getSuperiorHuntersDefense,
  translateSuperiorHuntersDefense,
} from '~/domain/classes/ranger/ranger';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getSuperiorHuntersDefense(pc)) {
    throw new Error('Ya has escogido Defensa Superior del Cazador');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error(
      'Solo los exploradores puedes escoger Defensa Superior del Cazador'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const superiorHuntersDefense = formData.get('superiorHuntersDefense');

  await updateAttrsForClass(name, 'ranger', { superiorHuntersDefense });

  return redirect(`/characters/pc/${name}/summary`);
};

function SuperiorHuntersDefense() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 15');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={styles.paleText}>Defensa Superior del Cazador</h2>
      <p className={styles.paragraph}>
        A nivel 15 ganas uno de los siguientes rasgos de tu elección.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>
            Escoge Defensa Superior del Cazador
          </span>
          <br />
          <select
            name="superiorHuntersDefense"
            defaultValue=""
            className={cardStyles.buttonCard}
          >
            <option value="" disabled></option>
            {SUPERIOR_HUNTERS_DEFENSE.map(superiorHuntersDefense => (
              <option
                value={superiorHuntersDefense}
                key={superiorHuntersDefense}
              >
                {translateSuperiorHuntersDefense(superiorHuntersDefense)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className={styles.paleText}>
        {translateSuperiorHuntersDefense('evasion')}
      </h3>
      <p className={styles.paragraph}>
        Puedes esquivar ágilmente algunos efectos de área, como por ejemplo el
        ardiente aliento de un dragón rojo o un conjuro de rayo relampagueante.
        Cuando estés sujeto a un efecto que te permite hacer una tirada de
        salvación de Destreza para sufrir sólo la mitad de daño, en lugar de eso
        no sufres ningún daño si tienes éxito en la tirada de salvación, y solo
        la mitad de daño si fallas la tirada.
      </p>

      <h3 className={styles.paleText}>
        {translateSuperiorHuntersDefense('standAgainstTheTide')}
      </h3>
      <p className={styles.paragraph}>
        Cuando una criatura hostil falla su ataque cuerpo a cuerpo sobre ti,
        puedes utilizar tu reacción para obligarla a repetir el mismo ataque
        contra otra criatura (que no sea sobre sí misma) de tu elección.
      </p>

      <h3 className={styles.paleText}>
        {translateSuperiorHuntersDefense('uncannyDodge')}
      </h3>
      <p className={styles.paragraph}>
        Cuando un atacante que puedas ver te golpea, puedes utilizar tu reacción
        para reducir a la mitad el daño de los ataques recibidos.
      </p>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Defensa
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
        A nivel 15 ganas uno de los siguientes rasgos de tu elección.
      </p>

      <p className={styles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default SuperiorHuntersDefense;
