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
  getInitialHitPoints,
} from '~/domain/characters';
import BardSkills from '~/components/classSkillsSelection/bardSkills';
import WarlockSkills from '~/components/classSkillsSelection/warlockSkills';
import ClericSkills from '~/components/classSkillsSelection/clericSkills';
import DruidSkills from '~/components/classSkillsSelection/druidSkills';
import RangerSkills from '~/components/classSkillsSelection/rangerSkills';
import FighterSkills from '~/components/classSkillsSelection/fighterSkills';
import SorcererSkills from '~/components/classSkillsSelection/sorcererSkills';
import WizardSkills from '~/components/classSkillsSelection/wizardSkills';
import RogueSkills from '~/components/classSkillsSelection/rogueSkills';
import MonkSkills from '~/components/classSkillsSelection/monkSkills';
import { pcItem } from '~/domain/equipment/equipment';
import {
  doesNotHaveToPrepareSpells,
  getExtraPreparedSpells,
  getSpell,
  getSpellSlots,
  getTotalSpells,
  hasToPrepareSpells,
} from '~/domain/spells/spells';

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
  const classSkills = formData.getAll('class-skills[]');
  const items = formData.getAll('items[]');
  const patron = formData.get('patron');
  const divineDomain = formData.get('divine-domain');
  const clericSkills = formData.getAll('cleric-skills[]');
  const languages = formData.getAll('languages[]');
  const favoredEnemy = formData.get('favored-enemy');
  const favoredEnemyHumanoids = formData.getAll('favored-enemy-humanoids[]');
  const favoredTerrain = formData.get('favored-terrain');
  const rangerArchetype = formData.get('ranger-archetype');
  const fightingStyle = formData.get('fighting-style');
  const sorcererOrigin = formData.get('sorcerer-origin');
  const dragonAncestor = formData.get('dragon-ancestor');
  const expertSkills = formData.getAll('expert-skills[]');
  const spells = formData.getAll('spells[]');

  const pc = await getPc(name);

  const pcAttrs = { name, skills: classSkills, classAttrs: {} };
  if (items.length)
    pcAttrs.proficientItems = [
      ...pc.proficientItems,
      ...items.map(itemName => pcItem(itemName)),
    ];
  if (patron) pcAttrs.classAttrs.patron = patron;
  if (divineDomain) pcAttrs.classAttrs.divineDomain = divineDomain;
  if (clericSkills.length) pcAttrs.classAttrs.skills = clericSkills;
  if (favoredEnemy || favoredEnemyHumanoids.length) {
    pcAttrs.classAttrs.favoredEnemies = favoredEnemyHumanoids?.length
      ? favoredEnemyHumanoids
      : [favoredEnemy];
  }
  if (favoredTerrain) pcAttrs.classAttrs.favoredTerrains = [favoredTerrain];
  if (rangerArchetype) pcAttrs.classAttrs.rangerArchetype = rangerArchetype;
  if (fightingStyle) pcAttrs.classAttrs.fightingStyles = [fightingStyle];
  if (sorcererOrigin) pcAttrs.classAttrs.sorcererOrigin = sorcererOrigin;
  if (dragonAncestor) pcAttrs.classAttrs.dragonAncestor = dragonAncestor;
  if (expertSkills.length) pcAttrs.classAttrs.expertSkills = expertSkills;
  if (languages.length) pcAttrs.languages = [...pc.languages, ...languages];
  if (spells.length) {
    pcAttrs.spells = [
      ...pc.spells,
      ...spells.map(spell => {
        const [spellName, spellClass = pc.pClass] = spell.split(',');
        return getSpell(spellName, spellClass);
      }),
    ];
  }

  pcAttrs.spellSlots = getSpellSlots(pc);
  pcAttrs.totalSpells = getTotalSpells(pc);

  const updatedPc = await updatePc(pcAttrs);

  let preparedSpells;
  if (doesNotHaveToPrepareSpells(updatedPc))
    preparedSpells = [...pcAttrs.spells, ...getExtraPreparedSpells(updatedPc)];
  if (hasToPrepareSpells(updatedPc))
    preparedSpells = getExtraPreparedSpells(updatedPc);

  await updatePc({
    name,
    maxHitPoints: getInitialHitPoints(updatedPc),
    hitPoints: getInitialHitPoints(updatedPc),
    preparedSpells,
  });

  return redirect(`/characters/pc/new/${name}/background`);
};

function ClassSkills(props) {
  const { pc } = props;
  const { pClass } = pc;

  switch (pClass) {
    case 'bard':
      return <BardSkills {...props} />;
    case 'warlock':
      return <WarlockSkills {...props} />;
    case 'cleric':
      return <ClericSkills {...props} />;
    case 'druid':
      return <DruidSkills {...props} />;
    case 'ranger':
      return <RangerSkills {...props} />;
    case 'fighter':
      return <FighterSkills {...props} />;
    case 'sorcerer':
      return <SorcererSkills {...props} />;
    case 'wizard':
      return <WizardSkills {...props} />;
    case 'rogue':
      return <RogueSkills {...props} />;
    case 'monk':
      return <MonkSkills {...props} />;
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
              id={skillName}
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
