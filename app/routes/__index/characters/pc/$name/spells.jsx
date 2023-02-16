import { json } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { Fragment, useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import {
  translateClass,
  getConditionalSkills,
  getSkills,
} from '~/utils/characters';
import { increment } from '~/utils/display';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';

import styles from '~/components/spells.module.css';
import {
  divideSpells,
  getSpellAttackBonus,
  getSpellcastingAbility,
  getSpellSavingThrow,
  isPreparedSpell,
} from '~/utils/spells/spells';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

function PcSummary() {
  const { pc } = useLoaderData();
  const { pClass, name } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const allSkills = getSkills(pc);
  const conditionalSkills = getConditionalSkills(pc);

  const [isSubmitShown, setIsSubmitShown] = useState(false);

  function onFreeTextChange() {
    setIsSubmitShown(true);
  }

  function onFormSubmit(e) {
    setIsSubmitShown(false);
  }

  useAddMenuItems('/characters', [
    { name, url: `/characters/pc/${name}/summary`, level: 1 },
    {
      name: 'Conjuros',
      url: `/characters/pc/${name}/spells`,
      level: 1,
    },
  ]);

  const spellsByLevel = divideSpells(pc);

  return (
    <>
      <img src="/images/spells.jpg" className={styles.sheetBackground} />
      <Form method="post" className={styles.spells} onSubmit={onFormSubmit}>
        <input readOnly type="text" name="name" value={name} hidden />

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
                2
              </span>
            )}
            {level > 0 && (
              <span
                className={`${styles.data} ${styles[`spentSpaces-${level}`]}`}
              >
                0
              </span>
            )}
            <ul className={`${styles.data} ${styles[`spells-${level}`]}`}>
              {spells.map(spell => (
                <Fragment key={spell.name}>
                  {isPreparedSpell(pc, spell.name) && (
                    <span className={`${styles.data} ${styles.preparedSpell}`}>
                      ◍
                    </span>
                  )}
                  <li className={`${styles.data} ${styles.spell}`}>
                    {spell.translation}
                  </li>
                </Fragment>
              ))}
            </ul>
          </Fragment>
        ))}
      </Form>
    </>
  );
}

export default PcSummary;
