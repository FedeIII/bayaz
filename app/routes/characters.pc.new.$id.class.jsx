import { json, redirect } from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useSubmit,
  useNavigation,
} from '@remix-run/react';
import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  hasToPrepareSpells,
} from '~/domain/spells/spells';
import { ALL_SPELLS_BY_LEVEL, getSpell } from '~/domain/spells/getSpells';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { getMaxSorcereryPoints } from '~/domain/spells/sorcerer';
import {
  getMaxChannelDivinity,
  getMaxDivineSense,
  getMaxLayOnHands,
} from '~/domain/classes/paladin/paladin';
import { getMaxTidesOfChaos } from '~/domain/classes/sorcerer/sorcerer';
import { getMaxBardicInspiration } from '~/domain/classes/bard/bard';

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
  const classSkills = formData.getAll('class-skills[]');
  const items = formData.getAll('items[]');
  const patron = formData.get('patron');
  const divineDomain = formData.get('divine-domain');
  const clericSkills = formData.getAll('cleric-skills[]');
  const languages = formData.getAll('languages[]');
  const favoredEnemy = formData.get('favored-enemy');
  const favoredEnemyHumanoids = formData.getAll('favored-enemy-humanoids[]');
  const favoredTerrain = formData.get('favored-terrain');
  const fightingStyle = formData.get('fighting-style');
  const sorcererOrigin = formData.get('sorcerer-origin');
  const dragonAncestor = formData.get('dragon-ancestor');
  const expertSkills = formData.getAll('expert-skills[]');
  const spells = formData.getAll('spells[]');

  const pc = await getPc(id);

  const pcAttrs = { id, skills: classSkills, classAttrs: { seen: [] } };
  if (items.length)
    pcAttrs.proficientItems = [
      ...pc.proficientItems,
      ...items.map(itemName => pcItem(itemName)),
    ];

  if (patron) pcAttrs.classAttrs.warlock = { patron };

  if (divineDomain) pcAttrs.classAttrs.cleric = { divineDomain };

  if (clericSkills.length) pcAttrs.classAttrs.skills = clericSkills;

  if (favoredEnemy || favoredEnemyHumanoids.length) {
    pcAttrs.classAttrs.ranger = {
      favoredEnemies: favoredEnemyHumanoids?.length
        ? favoredEnemyHumanoids
        : [favoredEnemy],
      favoredEnemiesSelection: [true],
    };
  }
  if (favoredTerrain)
    pcAttrs.classAttrs.ranger.favoredTerrains = [favoredTerrain];

  if (fightingStyle) pcAttrs.classAttrs.fighter = { fightingStyle };

  if (sorcererOrigin || dragonAncestor)
    pcAttrs.classAttrs.sorcerer = { sorcererOrigin, dragonAncestor };

  if (pc.pClass === 'bard') {
    pcAttrs.classAttrs.bard = {
      bardicInspiration: getMaxBardicInspiration(pc),
    };
  }

  if (pc.pClass === 'paladin') {
    pcAttrs.classAttrs.paladin = {
      layOnHands: getMaxLayOnHands(pc),
      divineSense: getMaxDivineSense(pc),
      channelDivinity: getMaxChannelDivinity(),
    };
  }

  if (pc.pClass === 'sorcerer') {
    pcAttrs.classAttrs.sorcerer = {
      fontOfMagic: getMaxSorcereryPoints(pc),
      tidesOfChaos: getMaxTidesOfChaos(),
    };
  }

  if (expertSkills.length) pcAttrs.classAttrs.expertSkills = expertSkills;
  if (languages.length) pcAttrs.languages = [...pc.languages, ...languages];
  if (spells.length) {
    pcAttrs.spells = [
      ...pc.spells,
      ...spells.map(spell => {
        const [spellName] = spell.split(',');
        return getSpell(spellName);
      }),
      ...(divineDomain === 'light' ? [getSpell('light')] : []),
    ];
  } else {
    pcAttrs.spells = [];
  }

  pcAttrs.magic = {
    hasLearnedSpells: [true],
    spentSpellSlots: Array(10).fill(0),
  };

  pcAttrs.improvedStatsLevels = [];

  const updatedPc = await updatePc(pcAttrs);

  let preparedSpells;
  if (doesNotHaveToPrepareSpells(updatedPc))
    preparedSpells = [];
  if (hasToPrepareSpells(updatedPc))
    preparedSpells = getExtraPreparedSpells(updatedPc);

  await updatePc({
    id,
    totalHitPoints: [CLASSES()[pc.pClass].initialHitPoints],
    hitPoints: getInitialHitPoints(updatedPc),
    hitDice: 1,
    remainingHitDice: 1,
    preparedSpells,
  });

  return redirect(`/characters/pc/new/${id}/background`);
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
    const skillsToSelectForClass = CLASSES()[pc.pClass].skillsToPick || [];

    return SKILLS().reduce(
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
  const { pClass, id, name } = pc;

  const navigation = useNavigation();
  const isCreating = navigation.state === 'submitting';

  const [skillsToSelect, setSkills, setSkillsNamespace, areNamespacesReady] =
    useSkills(pc);

  const { pickSkills, skillsToPick } = CLASSES()[pClass];

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

  const canContinue =
    Object.values(areNamespacesReady).filter(v => v === false).length === 0;

  const submit = useSubmit();
  const [skillRefs, setSkillRefs] = useState([
    useRef(
      ALL_SPELLS_BY_LEVEL[0].reduce(
        (cantrips, spell) => ({ ...cantrips, [spell.name]: createRef() }),
        {}
      )
    ),
    useRef(
      ALL_SPELLS_BY_LEVEL[1].reduce(
        (lvl1spells, spell) => ({ ...lvl1spells, [spell.name]: createRef() }),
        {}
      )
    ),
  ]);
  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(pc, skillRefs, submit);

  const formRef = useRef(null);

  return (
    <Form method="post" ref={formRef}>
      <div className="characters__content">
        {skillModalContent && (
          <SkillModal
            elRef={selectedSkillRef}
            formRef={formRef}
            closeModal={closeSkillModal}
          >
            {skillModalContent}
          </SkillModal>
        )}
        <h2>
          Habilidades de {translateClass(pClass)} para {name}
        </h2>
        <input readOnly type="text" name="id" value={id} hidden />

        <div className="characters__trait-columns characters__trait-columns--three">
          <label className="characters__trait-label">
            <span className="characters__trait-title">
              Escoge {CLASSES()[pClass].pickSkills} habilidades de{' '}
              {translateClass(pClass)}
            </span>
            <div className="characters__traits">
              {skillsToPick.map((skillName, i) => (
                <label
                  htmlFor={skillName}
                  key={skillName}
                  className="characters__skill-label"
                >
                  <input
                    type="checkbox"
                    name="class-skills[]"
                    id={skillName}
                    value={skillName}
                    checked={getSkillChecked(skillName, skillsToSelect)}
                    onChange={e =>
                      onSkillChange(skillName, e.target.checked, i)
                    }
                    disabled={
                      !getSkillAvailable(skillName, skillsToSelect, checks[i])
                    }
                  />
                  {translateSkill(skillName)}
                </label>
              ))}
            </div>
          </label>
        </div>

        <ClassSkills
          pc={pc}
          skillsToSelect={skillsToSelect}
          setSkills={setSkills}
          setSkillsNamespace={setSkillsNamespace}
          skillRefs={skillRefs}
          openSkillModal={openSkillModal}
        />

        <p>
          <button
            type="submit"
            className="cards__button-card"
            disabled={isCreating || !canContinue}
          >
            {canContinue ? 'Continuar' : 'Elige habilidades'}
          </button>
        </p>
      </div>
    </Form>
  );
}

export default PcClassSkills;
