import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { getSpiritTotem } from '~/domain/barbarian/barbarian';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }

  if (getSpiritTotem(pc).totemType) {
    throw new Error('Ya has escogido Espíritu Tótem');
  }

  if (pc.pClass !== 'barbarian') {
    throw new Error('Solo los bárbaros puedes escoger Espíritu Tótem');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const spiritTotem = formData.get('spirit-totem');
  const animal = formData.get('animal');

  await updateAttrsForClass(name, 'barbarian', {
    spiritTotem: { totemType: spiritTotem, animal },
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function TotemSpirit() {
  const { pc } = useLoaderData();

  useTitle('Bárbaro nivel 3');

  const [totem, setTotem] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={styles.paleText}>Espíritu Tótem</h2>
      <p className={styles.paragraph}>
        Al nivel 3, cuando adoptas esta senda, eliges un tótem animal y obtienes
        sus características. Debes hacer o adquirir un objeto como tótem físico
        (un amuleto u otro adorno similar) que contenga pelo, plumas, garras,
        dientes o huesos del animal tótem. A tu elección, también ganas
        atributos físicos menores que recuerdan a tu espíritu tótem. Por
        ejemplo, si tienes un espíritu tótem de oso, podrías ser inusualmente
        peludo y de piel gruesa, o si tu tótem es el águila, tus ojos se vuelven
        de un amarillo brillante.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>Escoge tipo de Tótem</span>{' '}
          <select
            name="spirit-totem"
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
            Mientras estás en furia, tienes resistencia a todos los daños salvo
            el daño psíquico. El espíritu del oso te hace lo suficientemente
            duro para resistir cualquier castigo.
          </p>
        </>
      )}

      {totem === 'eagle' && (
        <>
          <h3 className={styles.paleText}>Águila</h3>
          <p className={styles.paragraph}>
            Mientras estés en furia y no estés usando armadura pesada, las demás
            criaturas tienen desventaja en los ataques de oportunidad contra ti,
            y puedes usar la acción de Carrera como acción adicional en tu
            turno. El espíritu del águila te convierte en un depredador que
            puede moverse en combate con facilidad.
          </p>
        </>
      )}

      {totem === 'wolf' && (
        <>
          <h3 className={styles.paleText}>Lobo</h3>
          <p className={styles.paragraph}>
            Mientras estés en furia, tus aliados tienen ventaja en las tiradas
            de ataque cuerpo a cuerpo contra cualquier criatura a 5 pies (1,5
            metros) de ti que sea hostil hacia ti. El espíritu del lobo te
            convierte en un líder entre los cazadores.
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
        Al nivel 3, cuando adoptas esta senda, eliges un tótem animal y obtienes
        sus características. Debes hacer o adquirir un objeto como tótem físico
        (un amuleto u otro adorno similar) que contenga pelo, plumas, garras,
        dientes o huesos del animal tótem. A tu elección, también ganas
        atributos físicos menores que recuerdan a tu espíritu tótem. Por
        ejemplo, si tienes un espíritu tótem de oso, podrías ser inusualmente
        peludo y de piel gruesa, o si tu tótem es el águila, tus ojos se vuelven
        de un amarillo brillante.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default TotemSpirit;
