import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import { LANGUAGES, RACES, translateLanguage } from '~/domain/characters';

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
    <Form method="post" className="characters__content">
      <h2>Habilidades de Humano para {name}</h2>
      <input readOnly type="text" name="name" value={name} hidden />

      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Selecciona un idioma extra
          </span>
          <div className="characters__traits">
            {LANGUAGES.filter(
              l => !RACES.human.subrace.languages.includes(l)
            ).map(language => (
              <label
                htmlFor={language}
                key={language}
                className="characters__skill-label"
              >
                <input
                  type="radio"
                  name="language"
                  id={language}
                  value={language}
                  onChange={() => setIsLanguageSelected(true)}
                />
                {translateLanguage(language)}
              </label>
            ))}
          </div>
        </div>
      </div>

      <p>
        <button
          type="submit"
          className="cards__button-card"
          disabled={isCreating || !isLanguageSelected}
        >
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
