import { json } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import {
  Fragment,
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  addPreparedSpell,
  deletePreparedSpell,
  getPc,
} from '~/services/pc.server';
import { canCopySpells, translateClass } from '~/domain/characters';
import { increment } from '~/domain/display';
import {
  divideSpells,
  getMaxPreparedSpells,
  getSpellAttackBonus,
  getSpellcastingAbility,
  getSpellSavingThrow,
  getSpellSlots,
  hasToPrepareSpells,
  isPreparedSpell,
  translateSpell,
} from '~/domain/spells/spells';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import {
  getArcanum,
  getInvocationsSpells,
  getPactSpells,
  getTomeRituals,
} from '~/domain/classes/warlock/warlock';
import {
  getLoreSpells,
  getMagicalSecretsSpells,
} from '~/domain/classes/bard/bard';
import { resetSpellSlots, spendSpellSlot } from '~/domain/mutations/characterMutations';
import { isDm } from '~/domain/user';
import { getSessionUser } from '~/services/session.server';
import { translateSchool } from '~/domain/spells/spellTranslations';
import { replaceAt } from '~/utils/insert';
import classNames from 'classnames';

import styles from '~/components/spells.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ request, params }) => {
  const pc = await getPc(params.id);

  if (!pc) {
    throw new Error('pc not found');
  }

  const user = await getSessionUser(request);

  return json({ pc, isDm: isDm(user) });
};

async function prepareSpellAction(formData) {
  const id = formData.get('id');
  const pClass = formData.get('pClass');
  const preparedSpell = formData.get('preparedSpell');
  const isDm = formData.get('isDm') === 'true';

  const [preparedSpellName, spellType, spellSubtype, isPrepared] =
    preparedSpell.split(',');

  const spell = {
    name: preparedSpellName,
    type: spellType || pClass,
    subtype: spellSubtype || undefined,
  };

  let updatedPc;
  if (isPrepared === 'true') {
    updatedPc = await addPreparedSpell(id, spell);
  } else if (isDm) {
    updatedPc = await deletePreparedSpell(id, spell);
  }

  return updatedPc;
}

async function useSpellSlotAction(formData) {
  const id = formData.get('id');
  const spellSlotLevel = formData.get('spellSlotLevel');

  return await spendSpellSlot(id, spellSlotLevel);
}

async function resetSlotsAction(formData) {
  const id = formData.get('id');
  const spellsLevel = formData.get('spellsLevel');

  return await resetSpellSlots(id, spellsLevel);
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const action = formData.get('action');

  let updatedPc;
  if (action === 'prepareSpell') {
    updatedPc = await prepareSpellAction(formData);
  } else if (action === 'useSpellSlot') {
    updatedPc = await useSpellSlotAction(formData);
  } else if (action === 'resetSlots') {
    updatedPc = await resetSlotsAction(formData);
  }

  return { pc: updatedPc };
};

function PcSpells() {
  const { pc, isDm } = useLoaderData();
  const { pClass, id, name, preparedSpells, magic } = pc;

  const submit = useSubmit();

  const spellsByLevel = divideSpells(pc);
  const spellSlots = getSpellSlots(pc);

  const initIsSpellPrepared = useMemo(
    () => spellsByLevel.map(ss => ss.map(s => isPreparedSpell(pc, s.name))),
    []
  );
  const [isSpellPrepared, setIsSpellPrepared] = useState(initIsSpellPrepared);
  const [usedSpellSlots, setUsedSpellSlots] = useState(magic.spentSpellSlots);
  const [isUsingSpell, setIsUsingSpell] = useState(false);

  useEffect(() => {
    setIsUsingSpell(false);
  }, [magic.spentSpellSlots]);

  function onFormSubmit(e) {
    setIsSubmitShown(false);
  }

  function onPrepareSpellClick(spell, level, i, isPrepared) {
    return e => {
      if (hasToPrepareSpells(pc)) {
        setIsSpellPrepared(oldList => {
          const newList = oldList.slice();
          newList[level][i] = isPrepared;
          return newList;
        });

        submit(
          {
            action: 'prepareSpell',
            id,
            pClass,
            preparedSpell: [
              spell.name,
              spell.type,
              spell.subtype,
              e.target.checked,
            ],
            isDm,
          },
          { method: 'post' }
        );
      }
    };
  }

  function onSpentSpacesClick(level) {
    if (usedSpellSlots[level] < spellSlots[level] && !isUsingSpell) {
      setUsedSpellSlots(oldList =>
        replaceAt(level, oldList, oldList[level] + 1)
      );

      setIsUsingSpell(true);
    }

    submit(
      {
        action: 'useSpellSlot',
        id,
        spellSlotLevel: level,
      },
      { method: 'post' }
    );
  }

  function onResetSlotsClick(level) {
    return () => {
      if (usedSpellSlots[level] > 0 && !isUsingSpell) {
        setUsedSpellSlots(magic.spentSpellSlots.map(s => 0));
        setIsUsingSpell(true);
        closeSkillModal();
        submit(
          {
            action: 'resetSlots',
            id: pc.id,
            spellsLevel: level,
          },
          { method: 'post' }
        );
      }
    };
  }

  const [skillRefs, setSkillRefs] = useState({
    ...spellsByLevel.map(spells => useRef(spells.map(createRef))),
    resetSpellSlots: useRef(Array.from(Array(10), createRef)),
    copySpell: useRef([createRef()]),
  });

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(pc, skillRefs, submit);

  const formRef = useRef(null);

  const loreSpells = getLoreSpells(pc);
  const magicalSecretsSpells = getMagicalSecretsSpells(pc);
  const invocationsSpells = getInvocationsSpells(pc);
  const pactSpells = getPactSpells(pc);
  const tomeRituals = getTomeRituals(pc);
  const arcanum = getArcanum(pc);

  return (
    <>
      <img src="/images/spells.jpg" className="spells__background" />
      <Form
        method="post"
        className="spells"
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        {skillModalContent && (
          <SkillModal
            elRef={selectedSkillRef}
            formRef={formRef}
            closeModal={closeSkillModal}
          >
            {skillModalContent}
          </SkillModal>
        )}
        {!!isDm && canCopySpells(pc) && (
          <div className="spells__copy-spell">
            <SkillItem
              ref={skillRefs.copySpell.current[0]}
              pc={pc}
              traitName="copySpell"
              trait="Copiar conjuro"
              openModal={openSkillModal('copySpell', 0)}
            >
              Copiar Conjuro
            </SkillItem>
          </div>
        )}
        <span className="spells__data spells__name">
          {name}
          {' ('}
          {translateClass(pClass)}
          {')'}
        </span>
        <span className="spells__data spells__ability">
          {getSpellcastingAbility(pc).toUpperCase()}
        </span>
        <span className="spells__data spells__saving-throw">
          {getSpellSavingThrow(pc)}
        </span>
        <span className="spells__data spells__attack-bonus">
          {increment(getSpellAttackBonus(pc))}
        </span>

        {spellsByLevel.map((spells, level) => (
          <Fragment key={level}>
            {level > 0 && (
              <span className={`spells__data spells__total-spaces-${level}`}>
                <SkillItem
                  ref={skillRefs.resetSpellSlots.current[level]}
                  pc={pc}
                  traitName="resetSpellSlots"
                  trait={level}
                  openModal={openSkillModal('resetSpellSlots', level, {
                    resetSlots: onResetSlotsClick(level),
                  })}
                  disabled={!isDm}
                >
                  {spellSlots[level] || 0}
                </SkillItem>
              </span>
            )}
            {level > 0 && (
              <div
                className={classNames(
                  'spells__data',
                  'spells__spent-spaces',
                  `spells__spent-spaces-${level}`,
                  {
                    'spells__spent-spaces--disabled': isUsingSpell,
                  }
                )}
                onClick={() => onSpentSpacesClick(level)}
              >
                {usedSpellSlots[level] || 0}
                {hasToPrepareSpells(pc) && (
                  <>
                    {' '}
                    /
                    <span className="spells__prepared-spells">
                      {preparedSpells.length}/{getMaxPreparedSpells(pc)}{' '}
                      preparados
                    </span>
                  </>
                )}
              </div>
            )}
            <ul className={`spells__data spells__level spells__${level}`}>
              {spells.map((spell, i) => (
                <li
                  className={`spells__data ${
                    level === 0 ? 'spells__cantrip' : 'spells__spell'
                  }`}
                  key={spell.name}
                >
                  {!!(level > 0) && (
                    <>
                      <input
                        type="checkbox"
                        name="preparedSpells[]"
                        id={spell.name}
                        value={spell.name}
                        className="spells__data spells__prepared-spell"
                        onChange={onPrepareSpellClick(
                          spell,
                          level,
                          i,
                          !isSpellPrepared[level][i]
                        )}
                        checked={isSpellPrepared[level][i]}
                      />
                      <label
                        htmlFor={spell.name}
                        className="spells__prepared-spell-not-checked"
                      />
                      <label
                        htmlFor={spell.name}
                        className="spells__prepared-spell-checked"
                      >
                        ◍
                      </label>
                      <span className="spells__hide-next-bullet" />
                    </>
                  )}
                  <span>
                    <SkillItem
                      ref={skillRefs[level].current[i]}
                      traitName={spell.name}
                      trait="spell"
                      openModal={openSkillModal(level, i)}
                    >
                      <span className="tooltip">
                        {translateSpell(spell.name)}
                        <span className="tooltiptext">
                          {translateSchool(spell.school)}
                        </span>
                      </span>
                    </SkillItem>{' '}
                    {loreSpells.map(s => s.name).includes(spell.name) && (
                      <> (Colegio del Conocimiento)</>
                    )}
                    {magicalSecretsSpells
                      .map(s => s.name)
                      .includes(spell.name) && <> (Secretos Mágicos)</>}
                    {invocationsSpells
                      .map(s => s.name)
                      .includes(spell.name) && <> (Invocación)</>}
                    {pactSpells.map(s => s.name).includes(spell.name) && (
                      <> (Don del Pacto)</>
                    )}
                    {tomeRituals.includes(spell.name) && <>(Ritual)</>}
                    {arcanum.includes(spell.name) && <>(Arcanum)</>}
                  </span>
                </li>
              ))}
              <span className="spells__hide-circles" />
            </ul>
          </Fragment>
        ))}
      </Form>
    </>
  );
}

export default PcSpells;
