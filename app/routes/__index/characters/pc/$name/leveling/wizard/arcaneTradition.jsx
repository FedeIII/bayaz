import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { Card } from '~/components/cards/card';
import { getArcaneTradition } from '~/domain/classes/wizard/wizard';
import { SPELL_SCHOOLS } from '~/domain/spells/spells';
import { translateSchool } from '~/domain/spells/spellTranslations';
import { SCHOOL_EXPLANATION } from '~/domain/classes/wizard/wizardSkillsExplanation';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getArcaneTradition(pc)) {
    throw new Error('Ya has escogido Tradición Arcana');
  }

  if (pc.pClass !== 'wizard') {
    throw new Error('Solo los magos puedes escoger Tradición Arcana');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const school = formData.get('school');

  await updateAttrsForClass(name, 'wizard', {
    arcaneTradition: school,
  });
  return redirect(`/characters/pc/${name}/summary`);
};

function ArcaneTradition() {
  const { pc } = useLoaderData();

  useTitle('Mago nivel 2');

  const [selectedSchool, setSelectedSchool] = useState(null);

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={appStyles.paleText}>Colegios de Magia</h2>
      <p className={appStyles.paragraph}>
        El estudio de la hechicería es antiguo; se remonta a los primeros
        descubrimientos de los mortales. Esto está fielmente representado en los
        mundos de Dungeons & Dragons con varias tradiciones dedicadas a su
        complejo estudio.
      </p>
      <p className={appStyles.paragraph}>
        Las tradiciones arcanas más comunes en el multiverso giran en torno a
        las escuelas de magia. A través de las eras los magos han catalogado
        miles de conjuros, agrupándolos en ocho categorías llamadas Escuelas,
        tal como se describen en el Capítulo 10. En algunos lugares, estas
        tradiciones son literalmente Escuelas. Un mago podría estudiar en la
        Escuela del Ilusionismo mientras que otro podría estudiar en la de
        Encantamiento. En otros lugares, son más bien ramas académicas, con
        facultades rivales compitiendo por estudiantes y financiación. Incluso
        los magos que entrenan a aprendices en la soledad de sus propias torres
        usan la división de la magia en Escuelas como un recurso de aprendizaje,
        puesto que los conjuros de cada Escuela requieren el dominio de
        diferentes técnicas.
      </p>

      <div className={`${cardStyles.cards}`}>
        <Card title={`Escoge 1 escuela de magia`} singleCard>
          <ul className={cardStyles.cardList}>
            {SPELL_SCHOOLS.map((school, i) => {
              return (
                <li key={school}>
                  <label
                    htmlFor={school}
                    className={`${styles.toSelect} ${
                      selectedSchool === school && styles.selectedToSelect
                    }`}
                  >
                    <input
                      hidden
                      type="radio"
                      id={school}
                      name="school"
                      value={school}
                      checked={selectedSchool === school}
                      onChange={() => setSelectedSchool(school)}
                    />
                    {translateSchool(school)}
                  </label>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {!!selectedSchool && (
        <div className={appStyles.paragraph}>
          <div>
            <h3 className={appStyles.paleText}>
              {translateSchool(selectedSchool)}
            </h3>
            {SCHOOL_EXPLANATION[selectedSchool]}
          </div>
          <h4 className={appStyles.paleText}>
            Erudito de {translateSchool(selectedSchool)}
          </h4>
          <p>
            A partir del momento en que elijas esta escuela en el nivel 2, el
            oro y el tiempo que debes invertir para copiar un conjuro de{' '}
            {translateSchool(selectedSchool)} en tu libro de conjuros se divide
            a la mitad.
          </p>
        </div>
      )}

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Colegio
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
        El estudio de la hechicería es antiguo; se remonta a los primeros
        descubrimientos de los mortales. Esto está fielmente representado en los
        mundos de Dungeons & Dragons con varias tradiciones dedicadas a su
        complejo estudio.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default ArcaneTradition;
