import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateClassAttrs } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  getExpertSkills,
  getMaxExpertSkills,
  getProficiencyBonus,
  getSkills,
  hasToSelectExpertSkills,
  skillCheckBonus,
  translateSkill,
} from '~/domain/characters';
import { removeItem } from '~/utils/array';
import { Card } from '~/components/cards/card';
import { increment } from '~/domain/display';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToSelectExpertSkills(pc)) {
    throw new Error(
      'Ya has escogido habilidades en las que ser Experto en tu nivel'
    );
  }

  if (pc.pClass !== 'bard') {
    throw new Error(
      'Solo los bardos puedes escoger habilidades en las que ser expertos'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const skills = formData.getAll('skills[]');
  let expertSkills = formData.get('expertSkills');
  expertSkills = expertSkills ? expertSkills.split(',') : [];
  await updateClassAttrs(id, { expertSkills: [...expertSkills, ...skills] });
  return redirect(`/characters/pc/${id}/summary`);
};

function ExpertSkills() {
  const { pc } = useLoaderData();
  const proficientSkills = getSkills(pc);
  const expertSkills = getExpertSkills(pc);
  const maxExpertSkills = getMaxExpertSkills(pc);

  useTitle('Bardo nivel 3');

  const [skills, setSkills] = useState([]);

  function addSkill(skillName) {
    if (skills.length < maxExpertSkills) setSkills(s => [...s, skillName]);
  }

  function removeSkill(skillName) {
    setSkills(s => removeItem(sN => sN === skillName, s));
  }

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input
        readOnly
        type="text"
        name="expertSkills"
        value={expertSkills.join(',')}
        hidden
      />

      <h2 className="app__pale-text">Experto</h2>
      <p className="app__paragraph">
        A partir del nivel 3 eliges dos de tus habilidades en las que seas
        competente. Tu bonificador de competencia para esas habilidades se
        duplica para cualquier prueba de habilidad que realices con ellas.
      </p>
      <p className="app__paragraph">
        Al nivel 10 eliges otras dos habilidades en las que seas competente que
        ganarán este beneficio.
      </p>
      <p>
        <h3 className="app__pale-text">
          Escoge 2 habilidades en las que ser experto
        </h3>
        <div className="cards">
          <Card title="Habilidades" singleCard>
            <>
              <h4>
                Bonificador por competencia:{' '}
                {increment(getProficiencyBonus(pc.level))}
              </h4>
              <ul className="cards__card-list">
                {proficientSkills.map(skillName => {
                  const oldBonus = increment(skillCheckBonus(pc, skillName));
                  const newBonus = increment(
                    skillCheckBonus(pc, skillName) +
                      getProficiencyBonus(pc.level)
                  );
                  const isSelected = skills.includes(skillName);

                  return (
                    <li key={skillName}>
                      <label
                        htmlFor={skillName}
                        className={`checkbox__toSelect ${
                          skills.includes(skillName) &&
                          'checkbox__selectedToSelect'
                        } ${
                          expertSkills.includes(skillName) &&
                          'checkbox__disabledToSelect'
                        }`}
                      >
                        <input
                          hidden
                          type="checkbox"
                          id={skillName}
                          name="skills[]"
                          value={skillName}
                          checked={isSelected}
                          onChange={e => {
                            if (e.target.checked) addSkill(skillName);
                            else removeSkill(skillName);
                          }}
                        />
                        {translateSkill(skillName)} ({oldBonus} ={'>'}{' '}
                        {newBonus})
                      </label>
                    </li>
                  );
                })}
              </ul>
            </>
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

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        A partir del nivel 3 eliges dos de tus habilidades en las que seas
        competente. Tu bonificador de competencia para esas habilidades se
        duplica para cualquier prueba de habilidad que realices con ellas.
      </p>
      <p className="app__paragraph">
        Al nivel 10 eliges otras dos habilidades en las que seas competente que
        ganarán este beneficio.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ExpertSkills;
