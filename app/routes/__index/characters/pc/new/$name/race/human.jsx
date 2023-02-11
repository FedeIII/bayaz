import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import { LANGUAGES, RACES, translateLanguage } from '~/utils/characters';

import styles from '~/components/characters.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const language = formData.get('language');

  const pc = await getPc(name);

  await updatePc({
    name,
    languages: [...pc.languages, language],
  });

  return redirect(`../${name}/class`);
};

function PcHumanSkills() {
  const { pc } = useLoaderData();
  const { name, pClass } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  return (
    <Form method="post">
      <h2>Habilidades de Humano para {name}</h2>
      <input readOnly type="text" name="name" value={name} hidden />

      <p>
        Selecciona un idioma extra
        {LANGUAGES.filter(l => !RACES.human.subrace.languages.includes(l)).map(
          language => (
            <label for={language} key={language} className={styles.skillLabel}>
              <input
                type="radio"
                name="language"
                value={language}
                onChange={() => setIsLanguageSelected(true)}
              />
              {translateLanguage(language)}
            </label>
          )
        )}
      </p>

      <p>
        <button type="submit" disabled={isCreating || !isLanguageSelected}>
          {isCreating
            ? 'Creando...'
            : isLanguageSelected
            ? 'Continuar'
            : 'Elige habilidades'}
        </button>
      </p>
    </Form>
  );
}

export default PcHumanSkills;
