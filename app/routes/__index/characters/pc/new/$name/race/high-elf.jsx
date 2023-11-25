import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import { LANGUAGES, RACES, translateLanguage } from '~/domain/characters';
import { WIZARD_SPELLS } from '~/domain/spells/wizard';
import { getSpell } from '~/domain/spells/getSpells';
import { translateSpell } from '~/domain/spells/spells';

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
  const cantrip = formData.get('cantrip');
  const language = formData.get('language');

  await updatePc({
    name,
    spells: [getSpell(cantrip)],
    languages: [...RACES.elf.high.languages, language],
  });

  return redirect(`../${name}/class`);
};

function PcElfSkills() {
  const { pc } = useLoaderData();
  const { name, pClass } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [isCantripSelected, setIsCantripSelected] = useState(false);

  return (
    <Form method="post" className="characters__content">
      <h2>Habilidades de Alto Elfo para {name}</h2>
      <input readOnly type="text" name="name" value={name} hidden />

      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Conoces un truco de mago (Inteligencia)
          </span>
          <div className="characters__traits">
            {Object.values(WIZARD_SPELLS)
              .filter(s => s.level === 0)
              .map(spell => (
                <label
                  htmlFor={spell.name}
                  key={spell.name}
                  className="characters__skill-label"
                >
                  <input
                    type="radio"
                    name="cantrip"
                    id={spell.name}
                    value={spell.name}
                    onChange={() => setIsCantripSelected(true)}
                  />
                  {translateSpell(spell.name)}
                </label>
              ))}
          </div>
        </div>

        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Selecciona un idioma extra
          </span>
          <div className="characters__traits">
            {LANGUAGES.filter(l => !RACES.elf.high.languages.includes(l)).map(
              language => (
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
              )
            )}
          </div>
        </div>
      </div>

      <p>
        <button
          type="submit"
          className="cards__button-card"
          disabled={isCreating || !isLanguageSelected || !isCantripSelected}
        >
          {isCreating
            ? 'Creando...'
            : isLanguageSelected && isCantripSelected
            ? 'Continuar'
            : 'Elige habilidades'}
        </button>
      </p>
    </Form>
  );
}

export default PcElfSkills;
