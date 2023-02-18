import { json } from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useSubmit,
  useTransition,
} from '@remix-run/react';
import { Fragment } from 'react';

import {
  addPreparedSpell,
  deletePreparedSpell,
  getPc,
} from '~/services/pc.server';
import { translateClass } from '~/utils/characters';
import { increment } from '~/utils/display';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';

import styles from '~/components/spells.module.css';
import {
  divideSpells,
  getSpellAttackBonus,
  getSpellcastingAbility,
  getSpellSavingThrow,
  getSpellSlots,
  isPreparedSpell,
} from '~/utils/spells/spells';
import { getWizardMaxPreparedSpells } from '~/utils/spells/wizard';

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
  const [preparedSpellName, isPrepared] = preparedSpell.split(',');

  if (isPrepared === 'true') {
    await addPreparedSpell(name, { name: preparedSpellName, type: pClass });
  } else {
    await deletePreparedSpell(name, preparedSpellName);
  }

  return null;
};

function PcSummary() {
  const { pc } = useLoaderData();
  const { pClass, name, preparedSpells } = pc;

  const transition = useTransition();

  const submit = useSubmit();

  const spellsByLevel = divideSpells(pc);
  const spellSlots = getSpellSlots(pc);

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

  function onPrepareSpellClick(spellName) {
    return e => {
      if (['wizard'].includes(pClass)) {
        submit(
          {
            name,
            pClass,
            preparedSpell: [spellName, e.target.checked],
          },
          { method: 'post' }
        );
      }
    };
  }

  return (
    <>
      <img src="/images/spells.jpg" className={styles.sheetBackground} />
      <Form method="post" className={styles.spells} onSubmit={onFormSubmit}>
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
                {spellSlots[level]}
              </span>
            )}
            {level > 0 && (
              <div
                className={`${styles.data} ${styles[`spentSpaces-${level}`]}`}
              >
                0
                {pClass === 'wizard' && (
                  <>
                    {' '}
                    /
                    <span className={styles.preparedSpells}>
                      {preparedSpells.length}/{getWizardMaxPreparedSpells(pc)}{' '}
                      preparados
                    </span>
                  </>
                )}
              </div>
            )}
            <ul className={`${styles.data} ${styles[`spells-${level}`]}`}>
              {spells.map((spell, i) => (
                <Fragment key={spell.name}>
                  <li className={`${styles.data} ${styles.spell}`}>
                    {!!(level > 0) && (
                      <>
                        <input
                          type="checkbox"
                          name="preparedSpells[]"
                          id={spell.name}
                          value={spell.name}
                          className={`${styles.data} ${styles.preparedSpell}`}
                          onChange={onPrepareSpellClick(spell.name)}
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
                      </>
                    )}
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
