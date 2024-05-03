import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { getSkills, SKILLS, translateSkill } from '~/domain/characters';
import { removeItem } from '~/utils/insert';
import { Card } from '~/components/cards/card';
import {
  BARD_COLLEGES,
  getLoreCollegeProficiencies,
} from '~/domain/classes/bard/bard';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getLoreCollegeProficiencies(pc).length) {
    throw new Error(
      'Ya has escogido Competencias Adicionales del Colegio del Conocimiento'
    );
  }

  if (pc.pClass !== 'bard') {
    throw new Error(
      'Solo los bardos puedes escoger Competencias Adicionales del Colegio del Conocimiento'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const skills = formData.getAll('skills[]');

  await updateAttrsForClass(id, 'bard', { loreCollegeProficiencies: skills });

  return redirect(`/characters/pc/${id}/summary`);
};

function LoreBonusProficiencies() {
  const { pc } = useLoaderData();
  const proficientSkills = getSkills(pc);

  useTitle('Bardo nivel 3');

  const [skills, setSkills] = useState([]);

  function addSkill(skillName) {
    if (
      skills.length < BARD_COLLEGES.lore.pickSkills &&
      !proficientSkills.includes(skillName)
    )
      setSkills(s => [...s, skillName]);
  }

  function removeSkill(skillName) {
    setSkills(s => removeItem(sN => sN === skillName, s));
  }

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Competencias Adicionales</h2>
      <p className="app__paragraph">
        Cuando te unes al Colegio del Conocimiento en el nivel 3, ganas
        competencia con tres habilidades de tu elección.
      </p>
      <p>
        <h3 className="app__pale-text">
          Escoge {BARD_COLLEGES.lore.pickSkills} habilidades en las que ser
          competente
        </h3>
        <div className="cards">
          <Card title="Habilidades" singleCard>
            <ul className="cards__card-list">
              {SKILLS.map(skill => (
                <li key={skill.name}>
                  <label
                    htmlFor={skill.name}
                    className={`checkbox__toSelect ${
                      skills.includes(skill.name) &&
                      'checkbox__selectedToSelect'
                    } ${
                      proficientSkills.includes(skill.name) &&
                      'checkbox__disabledToSelect'
                    }`}
                  >
                    <input
                      hidden
                      type="checkbox"
                      id={skill.name}
                      name="skills[]"
                      value={skill.name}
                      checked={skills.includes(skill.name)}
                      onChange={e => {
                        if (e.target.checked) addSkill(skill.name);
                        else removeSkill(skill.name);
                      }}
                    />{' '}
                    {translateSkill(skill.name)}
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Cuando te unes al Colegio del Conocimiento en el nivel 3, ganas
        competencia con tres habilidades de tu elección.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default LoreBonusProficiencies;
