import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateClassAttrs } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  getExpertSkills,
  getProficiencyBonus,
  getSkills,
  skillCheckBonus,
  translateSkill,
} from '~/domain/characters';
import { removeItem } from '~/utils/insert';
import { Card } from '~/components/cards/card';
import { increment } from '~/domain/display';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (
    (getExpertSkills(pc).length === 2 && pc.level < 10) ||
    getExpertSkills(pc).length === 4
  ) {
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
  const name = formData.get('name');
  const skills = formData.getAll('skills[]');
  let expertSkills = formData.get('expertSkills');
  expertSkills = expertSkills ? expertSkills.split(',') : [];
  await updateClassAttrs(name, { expertSkills: [...expertSkills, ...skills] });
  return redirect(`/characters/pc/${name}/summary`);
};

function ExpertSkills() {
  const { pc } = useLoaderData();
  const proficientSkills = getSkills(pc);
  const expertSkills = getExpertSkills(pc);

  useTitle('Bardo nivel 3');

  const [skills, setSkills] = useState([]);

  function addSkill(skillName) {
    if (skills.length < 2) setSkills(s => [...s, skillName]);
  }

  function removeSkill(skillName) {
    setSkills(s => removeItem(sN => sN === skillName, s));
  }

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />
      <input
        readOnly
        type="text"
        name="expertSkills"
        value={expertSkills.join(',')}
        hidden
      />

      <h2 className={appStyles.paleText}>Experto</h2>
      <p className={appStyles.paragraph}>
        A partir del nivel 3 eliges dos de tus habilidades en las que seas
        competente. Tu bonificador de competencia para esas habilidades se
        duplica para cualquier prueba de habilidad que realices con ellas.
      </p>
      <p className={appStyles.paragraph}>
        Al nivel 10 eliges otras habilidades en las que seas com- petente que
        ganarán este beneficio.
      </p>
      <p>
        <h3 className={appStyles.paleText}>
          Escoge 2 habilidades en las que ser experto
        </h3>
        <div className={cardStyles.cards}>
          <Card title="Habilidades" singleCard>
            <>
              <h4>
                Bonificador por competencia{' '}
                {increment(getProficiencyBonus(pc.level))}
              </h4>
              <ul className={cardStyles.cardList}>
                {proficientSkills.map(skillName => (
                  <li key={skillName}>
                    <label
                      htmlFor={skillName}
                      className={`${styles.toSelect} ${
                        skills.includes(skillName) && styles.selectedToSelect
                      } ${
                        expertSkills.includes(skillName) &&
                        styles.disabledToSelect
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={skillName}
                        name="skills[]"
                        value={skillName}
                        checked={skills.includes(skillName)}
                        onChange={e => {
                          if (e.target.checked) addSkill(skillName);
                          else removeSkill(skillName);
                        }}
                      />
                      {translateSkill(skillName)} (
                      {increment(
                        skillCheckBonus(pc, skillName) +
                          (skills.includes(skillName)
                            ? getProficiencyBonus(pc.level)
                            : 0)
                      )}
                      )
                    </label>
                  </li>
                ))}
              </ul>
            </>
          </Card>
        </div>
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

      <p className={appStyles.paragraph}>
        A partir del nivel 3 eliges dos de tus habilidades en las que seas
        competente. Tu bonificador de competencia para esas habilidades se
        duplica para cualquier prueba de habilidad que realices con ellas.
      </p>
      <p className={appStyles.paragraph}>
        Al nivel 10 eliges otras habilidades en las que seas com- petente que
        ganarán este beneficio.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default ExpertSkills;
