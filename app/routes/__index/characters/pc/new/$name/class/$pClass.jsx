import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import {
  CLASSES,
  translateSkill,
  skills,
  translateClass,
  SKILLS,
} from '~/utils/characters';
import SkillsContext from '~/components/classSkillsSelection/skillsContext';
import BarbarianSkills from '~/components/classSkillsSelection/barbarianSkills';
import ClericSkills from '~/components/classSkillsSelection/clericSkills';

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
  const divineDomain = formData.get('divine-domain');
  const skills = formData.getAll('skills[]');

  await updatePc({ name, classAttrs: { skills, primalPath, divineDomain } });

  return redirect(`/characters/pc/${name}/summary`);
};

function ClassSkills(props) {
  const { pc } = props;
  const { pClass } = pc;

  switch (pClass) {
    case 'barbarian':
      return <BarbarianSkills pc={pc} />;
    case 'cleric':
      return <ClericSkills pc={pc} />;
    default:
      return null;
  }
}

function useSkills(pc) {
  const initSelectedSkillNames = skills(pc);
  const skillsToSelectForClass = CLASSES[pc.pClass].skillsToPick || [];

  // skillsToSelect: {
  //   [skillName]: {
  //     available: Boolean,
  //     selected: Boolean,
  //   }
  // }
  const [skillsToSelect, setSkillsToSelect] = useState(
    SKILLS.reduce(
      (initSkills, nextSkill) => ({
        ...initSkills,
        [nextSkill.name]: {
          available: skillsToSelectForClass.includes(nextSkill.name),
          selected: initSelectedSkillNames.includes(nextSkill.name),
        },
      }),
      {}
    )
  );

  function setSkill(skillName, skillValues) {
    const newSkillsToSelect = {
      ...skillsToSelect,
      [skillName]: {
        ...skillsToSelect[skillName],
        ...skillValues,
      },
    };

    setSkillsToSelect(newSkillsToSelect);
  }

  // areSkillsSelected: {
  //   [namespace1]: true,
  //   [namespace2]: false
  // }
  const [areSkillsSelected, setAreSkillsSelected] = useState({
    classSkills: false,
  });

  function setSkillsNamespace(namespace, value) {
    setAreSkillsSelected(oldAreSkillsSelected => ({
      ...oldAreSkillsSelected,
      [namespace]: value,
    }));
  }

  return [skillsToSelect, setSkill, setSkillsNamespace];
}

function getSkillChecked(skillName, skillsToSelect) {
  return skillsToSelect[skillName].selected;
}

function getSkillAvailable(skillName, skillsToSelect) {
  return skillsToSelect[skillName].available;
}

function PcClassSkills() {
  const { pc } = useLoaderData();
  const { pClass, name } = pc;
  const { classAttrs: { skills: classSkills } = { skills: [] } } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [skillsToSelect, setSkill, setSkillsNamespace] = useSkills(pc);

  // const [checks, setChecks] = useState(
  //   CLASSES[pClass].skillsToPick.map(s => allSkills.includes(s))
  // );
  // const [selectionCount, setSelectionCount] = useState(classSkills.length);

  const onSkillChange = (skillName, isChecked) => {
    setSkill(skillName, { selected: isChecked });

    // if (checks[i]) {
    //   const newChecks = checks.slice();
    //   newChecks[i] = false;
    //   setChecks(newChecks);
    //   setSelectionCount(v => v - 1);
    // } else {
    //   const newChecks = checks.slice();
    //   newChecks[i] = true;
    //   setChecks(newChecks);
    //   setSelectionCount(v => v + 1);
    // }
  };

  // const canContinue = selectionCount === CLASSES[pClass].pickSkills;
  const canContinue = true;

  return (
    <SkillsContext.Provider
      value={{
        skillsToSelect,
        setSkill,
        setSkillsNamespace,
      }}
    >
      <Form method="post">
        <h2>
          Habilidades de {translateClass(pClass)} para {name}
        </h2>
        <input readOnly type="text" name="name" value={name} hidden />

        <ClassSkills pc={pc} />

        <p>
          Escoge {CLASSES[pClass].pickSkills} habilidades
          {CLASSES[pClass].skillsToPick.map((skillName, i) => (
            <label
              for={skillName}
              key={skillName}
              className={styles.skillLabel}
            >
              <input
                type="checkbox"
                name="skills[]"
                value={skillName}
                checked={getSkillChecked(skillName, skillsToSelect)}
                onChange={e => onSkillChange(skillName, e.target.checked)}
                disabled={!getSkillAvailable(skillName, skillsToSelect)}
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
    </SkillsContext.Provider>
  );
}

export default PcClassSkills;
