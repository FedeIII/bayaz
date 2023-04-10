import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  RANGER_FIGHTING_STYLES,
  getRangerFightingStyle,
  translateRangerFightingStyle,
} from '~/domain/classes/ranger/ranger';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getRangerFightingStyle(pc)) {
    throw new Error('Ya has escogido Estilo de Combate de Explorador');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error(
      'Solo los exploradores puedes escoger Estilo de Combate de Explorador'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const fightingStyle = formData.get('fightingStyle');

  await updateAttrsForClass(name, 'ranger', { fightingStyle });

  return redirect(`/characters/pc/${name}/summary`);
};

function RangerFightingStyle() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 2');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={styles.paleText}>Estilo de Combate</h2>
      <p className={styles.paragraph}>
        A partir del nivel 2 adoptas un estilo particular de combate como
        especialidad. Elige una de las siguientes opciones. No puedes elegir un
        Estilo de Combate más de una vez, incluso si tienes la opción de escoger
        otro más adelante.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>Escoge Estilo de Combate</span>
          <br />
          <select
            name="fightingStyle"
            defaultValue=""
            className={cardStyles.buttonCard}
          >
            <option value="" disabled></option>
            {RANGER_FIGHTING_STYLES.map(fightingStyle => (
              <option value={fightingStyle} key={fightingStyle}>
                {translateRangerFightingStyle(fightingStyle)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className={styles.paleText}>
        {translateRangerFightingStyle('archery')}
      </h3>
      <p className={styles.paragraph}>
        Ganas un bonificador de +2 a las tiradas de ataque que hagas con armas a
        distancia
      </p>

      <h3 className={styles.paleText}>
        {translateRangerFightingStyle('defense')}
      </h3>
      <p className={styles.paragraph}>
        Mientras lleves puesta una armadura ganas un +1 a la CA.
      </p>

      <h3 className={styles.paleText}>
        {translateRangerFightingStyle('dueling')}
      </h3>
      <p className={styles.paragraph}>
        Cuando llevas un arma en una mano y ningún arma más, ganas un
        bonificador de +2 a las tiradas de daño con esa arma.
      </p>

      <h3 className={styles.paleText}>
        {translateRangerFightingStyle('twoWeaponFighting')}
      </h3>
      <p className={styles.paragraph}>
        Cuando luchas con el estilo de lucha de dos armas, puedes añadir tu
        modificador de característica al daño del segundo ataque
      </p>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Estilo
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
        A partir del nivel 2 adoptas un estilo particular de combate como
        especialidad. Elige una de las siguientes opciones. No puedes elegir un
        Estilo de Combate más de una vez, incluso si tienes la opción de escoger
        otro más adelante.
      </p>

      <p className={styles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default RangerFightingStyle;
