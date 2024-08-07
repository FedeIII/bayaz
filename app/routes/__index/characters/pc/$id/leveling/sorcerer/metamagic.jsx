import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { removeItem } from '~/utils/array';
import { Card } from '~/components/cards/card';
import {
  METAMAGIC,
  getMetamagic,
  getMetamagicAmountToLearn,
  hasToLearnMetamagic,
} from '~/domain/classes/sorcerer/sorcerer';
import { METAMAGIC_EXPLANATION } from '~/domain/classes/sorcerer/sorcererSkillsExplanation';
import { t } from '~/domain/translations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
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
  const id = formData.get('id');
  const metamagic = formData.getAll('metamagic[]');

  let pMetamagic = formData.get('pMetamagic');
  pMetamagic = pMetamagic ? pMetamagic.split(',') : [];

  await updateAttrsForClass(id, 'sorcerer', {
    metamagic: [...pMetamagic, ...metamagic],
  });

  return redirect(`/characters/pc/${id}/summary`);
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
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input
        readOnly
        type="text"
        name="pMetamagic"
        value={pMetamagic.join(',')}
        hidden
      />

      <h2 className="app__pale-text">Opciones Metamágicas</h2>
      <p className="app__paragraph">
        A nivel 3 ganas la habilidad de moldear tus conjuros para que se adapten
        a tus necesidades. Ganas dos de las siguientes opciones metamágicas a tu
        elección. Ganas una más al nivel 10 y al nivel 17.
      </p>
      <p>
        Sólo puedes usar una opción metamágica en cada conjuro cuando lo lanzas,
        a menos que se indique lo contrario.
      </p>

      <div className="cards">
        <Card
          title={`Escoge ${selectAmount} opci${
            selectAmount > 1 ? 'ones' : 'ón'
          } metamágica${selectAmount > 1 ? 's' : ''}`}
          singleCard
        >
          <ul className="cards__card-list">
            {METAMAGIC.filter(metamagic => !pMetamagic.includes(metamagic)).map(
              (metamagic, i) => {
                return (
                  <li key={metamagic}>
                    <label
                      htmlFor={metamagic}
                      className={`checkbox__toSelect ${
                        selectedMetamagic.includes(metamagic) &&
                        'checkbox__selectedToSelect'
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
                      {t(metamagic)}
                    </label>
                  </li>
                );
              }
            )}
          </ul>
        </Card>
      </div>

      <div className="app__paragraph">
        {Object.entries(METAMAGIC_EXPLANATION).map(
          ([metamagic, explanation]) => (
            <div>
              <h3 className="app__pale-text">
                {t(metamagic)}
                {pMetamagic.includes(metamagic) ? ' (Conocido)' : ''}
              </h3>
              {explanation}
            </div>
          )
        )}
      </div>

      <p>
        <button type="submit" className="cards__button-card">
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
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Si una invocación sobrenatural tiene prerrequisitos, debes cumplirlos
        para aprenderla. Puedes aprender la invocación en el mismo momento en
        que cumples sus prerrequisitos.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default Metamagic;
