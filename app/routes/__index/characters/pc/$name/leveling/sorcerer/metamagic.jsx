import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { removeItem } from '~/utils/insert';
import { Card } from '~/components/cards/card';
import {
  METAMAGIC,
  getMetamagic,
  getMetamagicAmountToLearn,
  hasToLearnMetamagic,
  translateMetamagic,
} from '~/domain/classes/sorcerer/sorcerer';
import { METAMAGIC_EXPLANATION } from '~/domain/classes/sorcerer/sorcererSkillsExplanation';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToLearnMetamagic(pc)) {
    throw new Error('Ya has escogido Metamagia en tu nivel');
  }

  if (pc.pClass !== 'sorcerer') {
    throw new Error('Solo los hechiceros puedes escoger Metamagia');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const metamagic = formData.getAll('metamagic[]');

  let pMetamagic = formData.get('pMetamagic');
  pMetamagic = pMetamagic ? pMetamagic.split(',') : [];

  await updateAttrsForClass(name, 'sorcerer', {
    metamagic: [...pMetamagic, ...metamagic],
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function Metamagic() {
  const { pc } = useLoaderData();
  const pMetamagic = getMetamagic(pc);
  const selectAmount = getMetamagicAmountToLearn(pc);

  useTitle('Hechicero nivel ' + pc.level);

  const [selectedMetamagic, setSelectedMetamagic] = useState([]);

  function changeSelectedMetamagic(metamagic) {
    return e => {
      if (e.target.checked) {
        if (selectedMetamagic.length < selectAmount)
          setSelectedMetamagic(old => [...old, metamagic]);
      } else {
        setSelectedMetamagic(old => removeItem(m => m === metamagic, old));
      }
    };
  }

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />
      <input
        readOnly
        type="text"
        name="pMetamagic"
        value={pMetamagic.join(',')}
        hidden
      />

      <h2 className={appStyles.paleText}>Opciones Metamágicas</h2>
      <p className={appStyles.paragraph}>
        A nivel 3 ganas la habilidad de moldear tus conjuros para que se adapten
        a tus necesidades. Ganas dos de las siguientes opciones metamágicas a tu
        elección. Ganas una más al nivel 10 y al nivel 17.
      </p>
      <p>
        Sólo puedes usar una opción metamágica en cada conjuro cuando lo lanzas,
        a menos que se indique lo contrario.
      </p>

      <div className={`${cardStyles.cards}`}>
        <Card
          title={`Escoge ${selectAmount} opci${
            selectAmount > 1 ? 'ones' : 'ón'
          } metamágica${selectAmount > 1 ? 's' : ''}`}
          singleCard
        >
          <ul className={cardStyles.cardList}>
            {METAMAGIC.filter(metamagic => !pMetamagic.includes(metamagic)).map(
              (metamagic, i) => {
                return (
                  <li key={metamagic}>
                    <label
                      htmlFor={metamagic}
                      className={`${styles.toSelect} ${
                        selectedMetamagic.includes(metamagic) &&
                        styles.selectedToSelect
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={metamagic}
                        name="metamagic[]"
                        value={metamagic}
                        checked={selectedMetamagic.includes(metamagic)}
                        onChange={changeSelectedMetamagic(metamagic)}
                      />
                      {translateMetamagic(metamagic)}
                    </label>
                  </li>
                );
              }
            )}
          </ul>
        </Card>
      </div>

      <div className={appStyles.paragraph}>
        {Object.entries(METAMAGIC_EXPLANATION).map(
          ([metamagic, explanation]) => (
            <div>
              <h3 className={appStyles.paleText}>
                {translateMetamagic(metamagic)}
                {pMetamagic.includes(metamagic) ? ' (Conocido)' : ''}
              </h3>
              {explanation}
            </div>
          )
        )}
      </div>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Maniobra
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

      <p className={appStyles.paragraph}>
        Si una invocación sobrenatural tiene prerrequisitos, debes cumplirlos
        para aprenderla. Puedes aprender la invocación en el mismo momento en
        que cumples sus prerrequisitos.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default Metamagic;
