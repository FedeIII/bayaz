import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import { SKILLS, translateSkill } from '~/utils/characters';

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
  const pClass = formData.get('pClass');
  const skills = formData.getAll('skills[]');
  const halfElfSkills = formData.getAll('half-elf-skills[]');

  await updatePc({
    name,
    skills,
    halfElf: { skills: halfElfSkills },
  });

  if (pClass === 'barbarian') return redirect(`../${name}/barbarian`);
  return redirect(`/characters/pc/${name}/summary`);
};

function PcHalfElfSkills() {
  const { pc } = useLoaderData();
  const {
    name,
    pClass,
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

  const canContinue = selectionCount === 2;

  return (
    <Form method="post">
      <h2>Habilidades de semielfo para {name}</h2>
      <input readOnly type="text" name="name" value={name} hidden />
      <input readOnly type="text" name="pClass" value={pClass} hidden />

      <p>
        Selecciona dos habilidades en las que ser competente
        {SKILLS.map((skill, i) => (
          <label
            for={skill.name}
            key={skill.name}
            className={styles.skillLabel}
          >
            <input
              type="checkbox"
              name={
                skills.includes(skill.name) ? 'skills[]' : 'half-elf-skills[]'
              }
              value={skill.name}
              checked={checks[i]}
              onChange={onSkillChange(i)}
              disabled={skills.includes(skill.name)}
            />
            {translateSkill(skill.name)}
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

export default PcHalfElfSkills;
