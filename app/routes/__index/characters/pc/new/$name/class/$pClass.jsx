import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import {
  CLASSES,
  translateSkill,
  skills,
  translateClass,
} from '~/utils/characters';
import BarbarianSkills from '~/components/barbarianSkills';

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
  const primalPath = formData.get('primal-path');
  const skills = formData.getAll('skills[]');

  await updatePc({ name, classAttrs: { skills, primalPath } });

  return redirect(`/characters/pc/${name}/summary`);
};

function ClassSkills(props) {
  const { pc } = props;
  const { pClass } = pc;

  switch (pClass) {
    case 'barbarian':
      return <BarbarianSkills pc={pc} />;

    default:
      return null;
  }
}

function PcClassSkills() {
  const { pc } = useLoaderData();
  const { pClass, name } = pc;
  const { classAttrs: { skills: classSkills } = { skills: [] } } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const allSkills = skills(pc);

  const [checks, setChecks] = useState(
    CLASSES[pClass].skillsToPick.map(s => allSkills.includes(s))
  );
  const [selectionCount, setSelectionCount] = useState(classSkills.length);

  const onSkillChange = i => () => {
    if (checks[i]) {
      const newChecks = checks.slice();
      newChecks[i] = false;
      setChecks(newChecks);
      setSelectionCount(v => v - 1);
    } else {
      const newChecks = checks.slice();
      newChecks[i] = true;
      setChecks(newChecks);
      setSelectionCount(v => v + 1);
    }
  };

  const canContinue = selectionCount === CLASSES[pClass].pickSkills;

  return (
    <Form method="post">
      <h2>
        Habilidades de {translateClass(pClass)} para {name}
      </h2>
      <input readOnly type="text" name="name" value={name} hidden />

      <ClassSkills pc={pc} />

      <p>
        Escoge {CLASSES[pClass].pickSkills} habilidades
        {CLASSES[pClass].skillsToPick.map((skillName, i) => (
          <label for={skillName} key={skillName} className={styles.skillLabel}>
            <input
              type="checkbox"
              name="skills[]"
              value={skillName}
              checked={checks[i]}
              onChange={onSkillChange(i)}
              disabled={
                allSkills.includes(skillName) &&
                !classSkills.includes(skillName)
              }
            />
            {translateSkill(skillName)}
          </label>
        ))}
      </p>

      <p>
        <button type="submit" disabled={isCreating || !canContinue}>
          {isCreating
            ? 'Creando...'
            : canContinue
            ? 'Continuar'
            : 'Elige habilidades'}
        </button>
      </p>
    </Form>
  );
}

export default PcClassSkills;
