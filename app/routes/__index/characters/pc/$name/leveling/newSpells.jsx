import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, learnSpells, prepareSpells } from '~/services/pc.server';
import { translateClass } from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';
import {
  getClassSpells,
  getNewSpellsAmount,
  getSpellSlots,
  getTotalSpells,
  hasNewCantrips,
  hasNewLevelSpells,
  maxSpellLevel,
} from '~/domain/spells/spells';
import { getSpell } from '~/domain/spells/getSpells';
import { Card } from '~/components/cards/card';
import { replaceAt } from '~/utils/insert';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const pClass = formData.get('pClass');

  const forget = formData.get('forget');
  const learn = formData.getAll('learn[]');

  await Promise.all([
    learnSpells(name, pClass, learn, forget),
    prepareSpells(name, pClass, learn, forget),
  ]);

  return redirect(`/characters/pc/${name}/summary`);
};

function NewSpells() {
  const { pc } = useLoaderData();
  const { name, pClass, level, spells: pSpells } = pc;

  useTitle(`${translateClass(pClass)} nivel ${level}`);

  const totalSpellsNumber = getTotalSpells(pc);

  const [newSpellsNumber, setNewSpellsNumber] = useState(
    getNewSpellsAmount(pc)
  );

  const knownSpells = pSpells.map(pSpell => getSpell(pSpell.name, pSpell.type));
  const allCantrips = getClassSpells(pc)
    .filter(spell => spell.level === 0)
    .filter(spell => !knownSpells.includes(spell));
  const [cantripSlots, ...spellSlots] = getSpellSlots(pc);
  const kwnonSpellLevels = [
    ...new Set(knownSpells.filter(s => s.level > 0).map(s => s.level)),
  ];

  const [toForget, setToForget] = useState(
    kwnonSpellLevels.map(spellLevel =>
      knownSpells.filter(spell => spell.level === spellLevel).map(() => false)
    )
  );

  function setSpellToForget(levelIndex, spellIndex, checked) {
    setToForget(oldToForget => {
      if (checked && oldToForget.flat().some(v => v)) return oldToForget;
      else {
        if (checked) setNewSpellsNumber(n => n + 1);
        else setNewSpellsNumber(n => n - 1);

        return replaceAt(
          levelIndex,
          oldToForget,
          replaceAt(spellIndex, oldToForget[levelIndex], checked)
        );
      }
    });
  }

  const newSpellsMaxLevel = maxSpellLevel(pc);
  const newSpellLevels = Array.from(Array(newSpellsMaxLevel), (_, i) => i + 1);
  const spellsByLevel = newSpellLevels.map(spellLevel =>
    getClassSpells(pc).filter(spell => spell.level === spellLevel)
  );

  const [toLearn, setToLearn] = useState(
    spellsByLevel.map(spells => spells.map(() => false))
  );

  function setSpellToLearn(levelIndex, spellIndex, checked) {
    setToLearn(oldToLearn => {
      if (
        checked &&
        oldToLearn.flat().filter(v => v)?.length === newSpellsNumber
      )
        return oldToLearn;
      else
        return replaceAt(
          levelIndex,
          oldToLearn,
          replaceAt(spellIndex, oldToLearn[levelIndex], checked)
        );
    });
  }

  const [skillRefs, setSkillRefs] = useState({
    cantrips: allCantrips.map(() => useRef()),
    known: knownSpells.map(() => useRef()),
    ...spellsByLevel.map(spells => spells.map(() => useRef())),
  });

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(pc, skillRefs);

  const formRef = useRef(null);

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="name" value={name} hidden />
      <input readOnly type="text" name="pClass" value={pClass} hidden />

      <h2 className={appStyles.paleText}>Escoge nuevos Conjuros</h2>

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      {hasNewCantrips(pc) && (
        <>
          <h3>Aprendes un nuevo Truco</h3>
          <p className={cardStyles.cards}>
            <Card title="Trucos" singleCard>
              <ul className={cardStyles.cardList}>
                {allCantrips.map((spell, spellIndex) => (
                  <li key={spell.name}>
                    <label
                      htmlFor={spell.name}
                      className={`${styles.toSelect}`}
                    >
                      <input
                        hidden
                        type="radio"
                        id={spell.name}
                        name="learn[]"
                        value={spell.name}
                      />
                      <SkillItem
                        ref={skillRefs.cantrips[spellIndex]}
                        traitName={spell.name}
                        trait="spell"
                        openModal={openSkillModal('cantrips', spellIndex)}
                        openOnRightClick
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </Card>
          </p>
        </>
      )}

      <h3>{totalSpellsNumber} conjuros conocidos</h3>
      <p>
        Puedes elegir uno de los conjuros de {translateClass(pClass)} que
        conoces y reemplazarlo por otro de la lista de conjuros del{' '}
        {translateClass(pClass)} de hasta nivel {newSpellsMaxLevel}
      </p>
      <div className={cardStyles.cards}>
        {spellSlots.map((slots, spellLevelIndex) => {
          const spellLevel = spellLevelIndex + 1;
          return (
            <Card
              title={`Conjuros nivel ${spellLevel}`}
              singleCard={kwnonSpellLevels.length === 1}
              key={spellLevel}
            >
              <h4>({slots} Huecos)</h4>
              <ul className={cardStyles.cardList}>
                {knownSpells
                  .filter(spell => spell.level === spellLevel)
                  .map((spell, spellIndex) => (
                    <li key={spell.name}>
                      <label
                        htmlFor={spell.name}
                        className={`${styles.toRemove} ${
                          toForget[spellLevel - 1][spellIndex] &&
                          styles.selectedToRemove
                        }`}
                      >
                        <input
                          hidden
                          type="checkbox"
                          id={spell.name}
                          name="forget"
                          value={spell.name}
                          checked={toForget[spellLevel - 1][spellIndex]}
                          onChange={e =>
                            setSpellToForget(
                              spellLevel - 1,
                              spellIndex,
                              e.target.checked
                            )
                          }
                        />
                        <SkillItem
                          ref={skillRefs.known[spellIndex]}
                          traitName={spell.name}
                          trait="spell"
                          openModal={openSkillModal('known', spellIndex)}
                          openOnRightClick
                        />
                      </label>
                    </li>
                  ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {hasNewLevelSpells(pc) && (
        <>
          <h3>
            Aprendes {newSpellsNumber} nuevo{newSpellsNumber > 1 ? 's' : ''}{' '}
            Conjuro{newSpellsNumber > 1 ? 's' : ''} de hasta nivel{' '}
            {newSpellsMaxLevel}
          </h3>
          <div className={cardStyles.cards}>
            {spellsByLevel.map((spellsOfLevel, i) => {
              const spellLevel = i + 1;
              return (
                <Card
                  title={`Conjuros nivel ${spellLevel}`}
                  singleCard={spellsByLevel.length === 1}
                  key={spellLevel}
                >
                  <ul className={cardStyles.cardList}>
                    {spellsOfLevel
                      .filter(spell => !knownSpells.includes(spell))
                      .map((spell, spellIndex) => (
                        <li key={spell.name}>
                          <label
                            htmlFor={spell.name}
                            className={`${styles.toSelect} ${
                              toLearn[spellLevel - 1][spellIndex] &&
                              styles.selectedToSelect
                            }`}
                          >
                            <input
                              hidden
                              type="checkbox"
                              id={spell.name}
                              name="learn[]"
                              value={spell.name}
                              checked={toLearn[spellLevel - 1][spellIndex]}
                              onChange={e =>
                                setSpellToLearn(
                                  spellLevel - 1,
                                  spellIndex,
                                  e.target.checked
                                )
                              }
                            />
                            <SkillItem
                              ref={skillRefs[i][spellIndex]}
                              traitName={spell.name}
                              trait="spell"
                              openModal={openSkillModal(i, spellIndex)}
                              openOnRightClick
                            />
                          </label>
                        </li>
                      ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </>
      )}

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className={appStyles.errorText}>{error.message}</h2>

      <p className={appStyles.paragraph}>
        Incrementa una puntuación de característica de tu elección en 2 puntos,
        o dos puntuaciones de característica de tu elección en 1 punto. Como es
        habitual, no puedes incrementar una puntuación de característica por
        encima de 20 usando este procedimiento.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default NewSpells;
