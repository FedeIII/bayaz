import { json } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { Fragment, useRef, useState } from 'react';

import {
  addPreparedSpell,
  deletePreparedSpell,
  getPc,
} from '~/services/pc.server';
import { translateClass } from '~/domain/characters';
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

import styles from '~/components/spells.module.css';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';

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
  const preparedSpell = formData.get('preparedSpell');
  const [preparedSpellName, spellType, spellSubtype, isPrepared] =
    preparedSpell.split(',');

  const spell = {
    name: preparedSpellName,
    type: spellType || pClass,
    subtype: spellSubtype || undefined,
  };

  if (isPrepared === 'true') {
    await addPreparedSpell(name, spell);
  } else {
    await deletePreparedSpell(name, spell);
  }

  return null;
};

function PcSpells() {
  const { pc } = useLoaderData();
  const { pClass, name, preparedSpells } = pc;

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
            name,
            pClass,
            preparedSpell: [
              spell.name,
              spell.type,
              spell.subtype,
              e.target.checked,
            ],
          },
          { method: 'post' }
        );
      }
    };
  }

  const [skillRefs, setSkillRefs] = useState(
    spellsByLevel.map(spells => spells.map(() => useRef()))
  );

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(pc, skillRefs);

  const formRef = useRef(null);

  return (
    <>
      <img src="/images/spells.jpg" className={styles.sheetBackground} />
      <Form
        method="post"
        className={styles.spells}
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
        <span className={`${styles.data} ${styles.name}`}>
          {name}
          {' ('}
          {translateClass(pClass)}
          {')'}
        </span>
        <span className={`${styles.data} ${styles.spellAbility}`}>
          {getSpellcastingAbility(pc).toUpperCase()}
        </span>
        <span className={`${styles.data} ${styles.savingThrow}`}>
          {getSpellSavingThrow(pc)}
        </span>
        <span className={`${styles.data} ${styles.attackBonus}`}>
          {increment(getSpellAttackBonus(pc))}
        </span>

        {spellsByLevel.map((spells, level) => (
          <Fragment key={level}>
            {level > 0 && (
              <span
                className={`${styles.data} ${styles[`totalSpaces-${level}`]}`}
              >
                {spellSlots[level] || 0}
              </span>
            )}
            {level > 0 && (
              <div
                className={`${styles.data} ${styles[`spentSpaces-${level}`]}`}
              >
                0
                {hasToPrepareSpells(pc) && (
                  <>
                    {' '}
                    /
                    <span className={styles.preparedSpells}>
                      {preparedSpells.length}/{getMaxPreparedSpells(pc)}{' '}
                      preparados
                    </span>
                  </>
                )}
              </div>
            )}
            <ul className={`${styles.data} ${styles[`spells-${level}`]}`}>
              {spells.map((spell, i) => (
                <li
                  className={`${styles.data} ${styles.spell}`}
                  key={spell.name}
                >
                  {!!(level > 0) && (
                    <>
                      <input
                        type="checkbox"
                        name="preparedSpells[]"
                        id={spell.name}
                        value={spell.name}
                        className={`${styles.data} ${styles.preparedSpell}`}
                        onChange={onPrepareSpellClick(spell)}
                        checked={isPreparedSpell(pc, spell.name)}
                      />
                      <label
                        htmlFor={spell.name}
                        className={styles.preparedSpellNotChecked}
                      />
                      <label
                        htmlFor={spell.name}
                        className={styles.preparedSpellChecked}
                      >
                        ◍
                      </label>
                      <span className={styles.hideNextBullet} />
                    </>
                  )}
                  <SkillItem
                    ref={skillRefs[level][i]}
                    traitName={spell.name}
                    trait="spell"
                    openModal={openSkillModal(level, i)}
                  />
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </Form>
    </>
  );
}

export default PcSpells;
