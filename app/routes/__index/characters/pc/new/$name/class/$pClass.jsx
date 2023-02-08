import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import {
  CLASSES,
  translateSkill,
  getSkills,
  translateClass,
  SKILLS,
} from '~/utils/characters';
import BarbarianSkills from '~/components/classSkillsSelection/barbarianSkills';
import ClericSkills from '~/components/classSkillsSelection/clericSkills';
import RangerSkills from '~/components/classSkillsSelection/rangerSkills';

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
  const clericSkills = formData.getAll('cleric-skills[]');
  const favoredEnemy = formData.get('favored-enemy');
  const favoredEnemyHumanoids = formData.getAll('favored-enemy-humanoids[]');
  const favoredTerrain = formData.get('favored-terrain');
  const rangerArchetype = formData.get('ranger-archetype');
  const fightingStyle = formData.get('fighting-style');
  const classSkills = formData.getAll('class-skills[]');

  await updatePc({
    name,
    skills: classSkills,
    classAttrs: {
      skills: clericSkills,
      primalPath,
      divineDomain,
      favoredEnemies: favoredEnemyHumanoids?.length
        ? favoredEnemyHumanoids
        : [favoredEnemy],
      favoredTerrains: [favoredTerrain],
      rangerArchetype,
      fightingStyles: [fightingStyle],
    },
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function ClassSkills(props) {
  const { pc } = props;
  const { pClass } = pc;

  switch (pClass) {
    case 'barbarian':
      return <BarbarianSkills {...props} />;
    case 'cleric':
      return <ClericSkills {...props} />;
    case 'ranger':
      return <RangerSkills {...props} />;
    default:
      return null;
  }
}

function getInitSkillsToSelect(pc) {
  return useMemo(() => {
    const initSelectedSkillNames = getSkills(pc);
    const skillsToSelectForClass = CLASSES[pc.pClass].skillsToPick || [];

    return SKILLS.reduce(
      (initSkills, nextSkill) => ({
        ...initSkills,
        [nextSkill.name]: {
          available: skillsToSelectForClass.includes(nextSkill.name),
          selected: initSelectedSkillNames.includes(nextSkill.name),
        },
      }),
      {}
    );
  }, [pc]);
}

function useSkills(pc) {
  // skillsToSelect: {
  //   [skillName]: {
  //     available: Boolean,
  //     selected: Boolean,
  //   }
  // }
  const [skillsToSelect, setSkillsToSelect] = useState(
    getInitSkillsToSelect(pc)
  );

  function setSkills(newSkills) {
    const newSkillsToSelect = Object.entries(skillsToSelect).reduce(
      (newSkillsToSelect, [skillName, skillValues]) => {
        if (!newSkills[skillName])
          return { ...newSkillsToSelect, [skillName]: skillValues };

        return {
          ...newSkillsToSelect,
          [skillName]: {
            ...skillValues,
            ...newSkills[skillName],
          },
        };
      },
      {}
    );

    setSkillsToSelect(newSkillsToSelect);
  }

  // areNamespacesReady: {
  //   [namespace1]: true,
  //   [namespace2]: false
  // }
  const [areNamespacesReady, setNamespacesReady] = useState({
    classSkills: false,
  });

  const setSkillsNamespace = useCallback((namespace, value) => {
    setNamespacesReady(oldAreNamespacesSelected => ({
      ...oldAreNamespacesSelected,
      [namespace]: value,
    }));
  }, []);

  return [skillsToSelect, setSkills, setSkillsNamespace, areNamespacesReady];
}

function getSkillChecked(skillName, skillsToSelect) {
  return !!skillsToSelect[skillName]?.selected;
}

function getSkillAvailable(skillName, skillsToSelect, isCheckedHere) {
  return (
    !skillsToSelect[skillName]?.selected ||
    (skillsToSelect[skillName].selected && isCheckedHere)
  );
}

function PcClassSkills() {
  const { pc } = useLoaderData();
  const { pClass, name } = pc;
  const { classAttrs: { skills: classSkills } = { skills: [] } } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [skillsToSelect, setSkills, setSkillsNamespace, areNamespacesReady] =
    useSkills(pc);

  const { pickSkills, skillsToPick } = CLASSES[pClass];

  const [checks, setChecks] = useState(skillsToPick.map(() => false));

  useEffect(() => {
    setSkillsNamespace(
      'classSkills',
      checks.filter(v => v).length === pickSkills
    );
  }, [checks]);

  const onSkillChange = (skillName, isChecked, i) => {
    setChecks(oldChecks => {
      const newChecks = oldChecks.slice();
      newChecks[i] = isChecked;
      return newChecks;
    });

    setSkills({
      [skillName]: {
        selected: isChecked,
      },
    });
  };

  // const canContinue = selectionCount === CLASSES[pClass].pickSkills;
  const canContinue =
    Object.values(areNamespacesReady).filter(v => v === false).length === 0;

  return (
    <Form method="post">
      <h2>
        Habilidades de {translateClass(pClass)} para {name}
      </h2>
      <input readOnly type="text" name="name" value={name} hidden />

      <p>
        Escoge {CLASSES[pClass].pickSkills} habilidades de{' '}
        {translateClass(pClass)}
        {skillsToPick.map((skillName, i) => (
          <label
            htmlFor={skillName}
            key={skillName}
            className={styles.skillLabel}
          >
            <input
              type="checkbox"
              name="class-skills[]"
              value={skillName}
              checked={getSkillChecked(skillName, skillsToSelect)}
              onChange={e => onSkillChange(skillName, e.target.checked, i)}
              disabled={
                !getSkillAvailable(skillName, skillsToSelect, checks[i])
              }
            />
            {translateSkill(skillName)}
          </label>
        ))}
      </p>

      <ClassSkills
        pc={pc}
        skillsToSelect={skillsToSelect}
        setSkills={setSkills}
        setSkillsNamespace={setSkillsNamespace}
      />

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
