import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import {
  SKILLS,
  translateSkill,
  LANGUAGES,
  RACES,
  translateLanguage,
} from '~/domain/characters';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const language = formData.get('language');
  const skills = formData.getAll('skills[]');
  const halfElfSkills = formData.getAll('half-elf-skills[]');

  await updatePc({
    id,
    skills,
    halfElf: { skills: halfElfSkills },
    languages: [...RACES['half-elf'].subrace.languages, language],
  });

  return redirect(`../${id}/class`);
};

function PcHalfElfSkills() {
  const { pc } = useLoaderData();
  const {
    id,
    name,
    skills = [],
    halfElf: { skills: halfElfSkills } = { skills: [] },
  } = pc;

  const allSkills = [...skills, ...halfElfSkills];

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [checks, setChecks] = useState(
    SKILLS.map(s => allSkills.includes(s.name))
  );
  const [selectionCount, setSelectionCount] = useState(halfElfSkills.length);

  const onSkillChange = i => () => {
    if (checks[i]) {
      const newChecks = checks.slice();
      newChecks[i] = false;
      setChecks(newChecks);
      setSelectionCount(v => v - 1);
    } else if (checks.filter(v => v).length < 2) {
      const newChecks = checks.slice();
      newChecks[i] = true;
      setChecks(newChecks);
      setSelectionCount(v => v + 1);
    }
  };

  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  const canContinue = selectionCount === 2 && isLanguageSelected;

  return (
    <Form method="post">
      <div className="characters__content">
        <h2>Habilidades de semielfo para {name}</h2>
        <input readOnly type="text" name="id" value={id} hidden />

        <div className="characters__trait-columns characters__trait-columns--three">
          <div className="characters__trait-label">
            <span className="characters__trait-title">
              Selecciona un idioma extra
            </span>
            <div className="characters__traits">
              {LANGUAGES.filter(
                l => !RACES['half-elf'].subrace.languages.includes(l)
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

          <div className="characters__trait-label">
            <span className="characters__trait-title">
              Selecciona dos habilidades en las que ser competente
            </span>
            <div className="characters__traits">
              {SKILLS.map((skill, i) => (
                <label
                  htmlFor={skill.name}
                  key={skill.name}
                  className="characters__skill-label"
                >
                  <input
                    type="checkbox"
                    name={
                      skills.includes(skill.name)
                        ? 'skills[]'
                        : 'half-elf-skills[]'
                    }
                    id={skill.name}
                    value={skill.name}
                    checked={checks[i]}
                    onChange={onSkillChange(i)}
                    disabled={skills.includes(skill.name)}
                  />
                  {translateSkill(skill.name)}
                </label>
              ))}
            </div>
          </div>
        </div>

        <p>
          <button
            type="submit"
            className="cards__button-card"
            disabled={isCreating || !canContinue}
          >
            {isCreating
              ? 'Creando...'
              : canContinue
              ? 'Continuar'
              : 'Elige habilidades'}
          </button>
        </p>
      </div>
    </Form>
  );
}

export default PcHalfElfSkills;
