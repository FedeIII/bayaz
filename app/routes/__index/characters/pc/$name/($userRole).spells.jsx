import { json } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { Fragment, createRef, useRef, useState } from 'react';

import {
  addPreparedSpell,
  deletePreparedSpell,
  getPc,
} from '~/services/pc.server';
import { canCopySpells, translateClass } from '~/domain/characters';
import { increment } from '~/domain/display';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import {
  divideSpells,
  getMaxPreparedSpells,
  getSpellAttackBonus,
  getSpellcastingAbility,
  getSpellSavingThrow,
  getSpellSlots,
  hasToPrepareSpells,
  isPreparedSpell,
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
import { resetSpellSlots, spendSpellSlot } from '~/domain/characterMutations';

import styles from '~/components/spells.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc, isForPlayers: params.userRole === 'players' });
};

async function prepareSpellAction(formData) {
  const name = formData.get('name');
  const pClass = formData.get('pClass');
  const preparedSpell = formData.get('preparedSpell');
  const isForPlayers = formData.get('isForPlayers') === 'true';

  const [preparedSpellName, spellType, spellSubtype, isPrepared] =
    preparedSpell.split(',');

  const spell = {
    name: preparedSpellName,
    type: spellType || pClass,
    subtype: spellSubtype || undefined,
  };

  if (isPrepared === 'true') {
    await addPreparedSpell(name, spell);
  } else if (!isForPlayers) {
    await deletePreparedSpell(name, spell);
  }
}

async function useSpellSlotAction(formData) {
  const name = formData.get('name');
  const spellSlotLevel = formData.get('spellSlotLevel');

  await spendSpellSlot(name, spellSlotLevel);
}

async function resetSlotsAction(formData) {
  const name = formData.get('name');
  const spellsLevel = formData.get('spellsLevel');

  await resetSpellSlots(name, spellsLevel);
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const action = formData.get('action');

  if (action === 'prepareSpell') {
    await prepareSpellAction(formData);
  } else if (action === 'useSpellSlot') {
    await useSpellSlotAction(formData);
  } else if (action === 'resetSlots') {
    await resetSlotsAction(formData);
  }

  return null;
};

function PcSpells() {
  const { pc, isForPlayers } = useLoaderData();
  const { pClass, name, preparedSpells, magic } = pc;

  const submit = useSubmit();

  const spellsByLevel = divideSpells(pc);
  const spellSlots = getSpellSlots(pc);

  function onFormSubmit(e) {
    setIsSubmitShown(false);
  }

  useAddMenuItems('/characters', [
    { name, url: `/characters/pc/${name}/summary`, level: 1 },
    {
      name: 'Inventario',
      url: `/characters/pc/${name}/bio`,
      level: 2,
    },
    {
      name: 'Conjuros',
      url: `/characters/pc/${name}/spells`,
      level: 2,
    },
  ]);

  function onPrepareSpellClick(spell) {
    return e => {
      if (hasToPrepareSpells(pc)) {
        submit(
          {
            action: 'prepareSpell',
            name,
            pClass,
            preparedSpell: [
              spell.name,
              spell.type,
              spell.subtype,
              e.target.checked,
            ],
            isForPlayers,
          },
          { method: 'post' }
        );
      }
    };
  }

  function onSpentSpacesClick(level) {
    submit(
      {
        action: 'useSpellSlot',
        name,
        spellSlotLevel: level,
      },
      { method: 'post' }
    );
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
        {!isForPlayers && canCopySpells(pc) && (
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
        <span className="spells__data spells__spell-ability">
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
                  openModal={openSkillModal('resetSpellSlots', level)}
                  disabled={isForPlayers}
                >
                  {spellSlots[level] || 0}
                </SkillItem>
              </span>
            )}
            {level > 0 && (
              <div
                className={`spells__data spells__spent-spaces spells__spent-spaces-${level}`}
                onClick={() => onSpentSpacesClick(level)}
              >
                {magic.spentSpellSlots[level] || 0}
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
            <ul
              className={`spells__data spells__level spells__${level}`}
            >
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
                        onChange={onPrepareSpellClick(spell)}
                        checked={isPreparedSpell(pc, spell.name)}
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
                      <span className="spells__hide-nect-bullet" />
                    </>
                  )}
                  <span>
                    <SkillItem
                      ref={skillRefs[level].current[i]}
                      traitName={spell.name}
                      trait="spell"
                      openModal={openSkillModal(level, i)}
                    />{' '}
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
