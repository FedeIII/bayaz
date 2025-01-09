import { Form, useOutletContext, useSubmit } from '@remix-run/react';
import {
  Fragment,
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { addPreparedSpell, deletePreparedSpell } from '~/services/pc.server';
import { canCopySpells, translateClass } from '~/domain/characters';
import { increment } from '~/domain/display';
import {
  displayAlternativeBonus,
  divideSpellsByLevel,
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
  getInvocation,
  getInvocations,
  getPactSpells,
  getTomeRituals,
} from '~/domain/classes/warlock/warlock';
import {
  getLoreSpells,
  getMagicalSecretsSpells,
} from '~/domain/classes/bard/bard';
import {
  resetSpellSlots,
  changeSpellSlot,
} from '~/domain/mutations/characterMutations';
import { translateSchool } from '~/domain/spells/spellTranslations';
import NumericInput from '~/components/inputs/numeric';
import { replaceAt } from '~/utils/array';
import { useTitle } from '~/components/hooks/useTitle';
import { t } from '~/domain/translations';

import styles from '~/components/spells.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
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

async function changeSpellSlotAction(formData) {
  const id = formData.get('id');
  const spellSlotLevel = formData.get('spellSlotLevel');
  const amount = formData.get('amount');

  return await changeSpellSlot(id, spellSlotLevel, amount);
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
  } else if (action === 'changeSpellSlot') {
    updatedPc = await changeSpellSlotAction(formData);
  } else if (action === 'resetSlots') {
    updatedPc = await resetSlotsAction(formData);
  }

  return { pc: updatedPc };
};

function PcSpells() {
  const { pc, isDm } = useOutletContext();
  const { pClass, id, name, preparedSpells, magic } = pc;

  useTitle(`${name} - Conjuros`);

  const submit = useSubmit();

  const spellsByLevel = divideSpellsByLevel(pc);
  const spellSlots = getSpellSlots(pc);

  const initIsSpellPrepared = useMemo(
    () =>
      spellsByLevel.map(ss => {
        return ss.map(s => isPreparedSpell(pc, s.name));
      }),
    [pc.id]
  );
  const [isSpellPrepared, setIsSpellPrepared] = useState(initIsSpellPrepared);
  const [usedSpellSlots, setUsedSpellSlots] = useState(magic.spentSpellSlots);
  const [isUsingSpell, setIsUsingSpell] = useState(false);

  useEffect(() => {
    setIsUsingSpell(false);
  }, [magic.spentSpellSlots]);

  useEffect(() => {
    setUsedSpellSlots(magic.spentSpellSlots);
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

  function onUsedSpellsChange(level) {
    return e => {
      const numberAmount = parseInt(e.target.value, 10);
      let amount = '';
      if (Number.isFinite(numberAmount)) {
        amount = numberAmount;
      }
      if (amount <= spellSlots[level] && !isUsingSpell) {
        setUsedSpellSlots(old => replaceAt(level, old, amount));

        setIsUsingSpell(true);

        submit(
          {
            action: 'changeSpellSlot',
            id,
            spellSlotLevel: level,
            amount,
          },
          { method: 'post' }
        );
      }
    };
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
    ...spellsByLevel.map(spells => spells.map(createRef)),
    resetSpellSlots: Array.from(Array(10), createRef),
    copySpell: [createRef()],
  });

  useEffect(() => {
    setSkillRefs({
      ...spellsByLevel.map(spells => spells.map(createRef)),
      resetSpellSlots: Array.from(Array(10), createRef),
      copySpell: [createRef()],
    });
  }, [spellsByLevel.length]);

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
  const invocations = getInvocations(pc).map(getInvocation);
  const pactSpells = getPactSpells(pc);
  const tomeRituals = getTomeRituals(pc);
  const arcanum = getArcanum(pc);

  const pcCastingStat = getSpellcastingAbility(pc);

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
              ref={skillRefs.copySpell[0]}
              pc={pc}
              traitName="copySpell"
              trait="Copiar conjuro"
              openModal={openSkillModal(
                'copySpell',
                0,
                {},
                'dontTriggerSeeTrait'
              )}
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
          {pcCastingStat.toUpperCase()}
        </span>
        <span className="spells__data spells__saving-throw">
          {getSpellSavingThrow(pc)}
        </span>
        <span className="spells__data spells__attack-bonus">
          {increment(getSpellAttackBonus(pc))}
        </span>

        {spellsByLevel.map((spellsForLevel, level) => (
          <Fragment key={level}>
            {/* TOTAL SLOTS */}
            {level > 0 && (
              <span className={`spells__data spells__total-spaces-${level}`}>
                <SkillItem
                  ref={skillRefs.resetSpellSlots[level]}
                  pc={pc}
                  traitName="resetSpellSlots"
                  trait={level}
                  openModal={openSkillModal(
                    'resetSpellSlots',
                    level,
                    {
                      resetSlots: onResetSlotsClick(level),
                    },
                    'dontTriggerSeeTrait'
                  )}
                  disabled={!isDm}
                >
                  {spellSlots[level] || 0}
                </SkillItem>
              </span>
            )}
            {/* SPENT SLOTS */}
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
              >
                <NumericInput
                  value={usedSpellSlots[level]}
                  min="0"
                  max={spellSlots[level]}
                  onChange={onUsedSpellsChange(level)}
                  styleName="spells__spellslot-input"
                />
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
            {/* SPELL LIST */}
            <ul className={`spells__data spells__level spells__${level}`}>
              {spellsForLevel.map((spell, i) => (
                <li
                  className={`spells__data ${
                    level === 0 ? 'spells__cantrip' : 'spells__spell'
                  }`}
                  key={spell.name}
                >
                  {level > 0 && (
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
                      ref={skillRefs[level][i]}
                      traitName={spell.name}
                      trait="spell"
                      openModal={openSkillModal(
                        level,
                        i,
                        {},
                        'dontTriggerSeeTrait'
                      )}
                    >
                      <span className="tooltip">
                        {translateSpell(spell.name)}
                        {spell.castingStat
                          ? displayAlternativeBonus(pc, spell)
                          : ''}
                        <span className="tooltiptext">
                          {translateSchool(spell.school)}
                          {(function () {
                            const invocation = invocations.find(
                              inv => inv.spell === spell.name
                            );
                            if (invocation) {
                              return (
                                <span className="spells__data spells__tooltip">
                                  (Invocación,{' '}
                                  {invocation.spendSlot
                                    ? 'Consume hueco'
                                    : 'No consume hueco'}
                                  )
                                </span>
                              );
                            }
                            return null;
                          })()}
                          {loreSpells.map(s => s.name).includes(spell.name) && (
                            <span className="spells__data spells__tooltip">
                              {' '}
                              (Colegio del Conocimiento)
                            </span>
                          )}
                          {magicalSecretsSpells
                            .map(s => s.name)
                            .includes(spell.name) && (
                            <span className="spells__data spells__tooltip">
                              {' '}
                              (Secretos Mágicos)
                            </span>
                          )}
                          {pactSpells.map(s => s.name).includes(spell.name) && (
                            <span className="spells__data spells__tooltip">
                              {' '}
                              (Don del Pacto)
                            </span>
                          )}
                          {tomeRituals.includes(spell.name) && (
                            <span className="spells__data spells__tooltip">
                              (Ritual)
                            </span>
                          )}
                          {arcanum.includes(spell.name) && (
                            <span className="spells__data spells__tooltip">
                              (Arcanum)
                            </span>
                          )}
                          {spell.castingStat &&
                            spell.castingStat !== pcCastingStat && (
                              <span className="spells__data spells__tooltip">
                                ({t(spell.castingStat)})
                              </span>
                            )}
                        </span>
                      </span>
                    </SkillItem>{' '}
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
