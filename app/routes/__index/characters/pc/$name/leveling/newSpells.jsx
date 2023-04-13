import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import {
  forgetSpell,
  getPc,
  learnSpells,
  prepareSpells,
  pushAttrsForClass,
  updatePc,
} from '~/services/pc.server';
import { translateClass } from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';
import {
  getClassSpells,
  getNewCantripsAmount,
  getNewSpellsAmount,
  getSpellSlots,
  getTotalSpells,
  hasNewCantrips,
  hasNewLevelSpells,
  hasToLearnSpells,
  maxSpellLevel,
} from '~/domain/spells/spells';
import {
  getAllPcCantrips,
  getAllPcSpells,
  getKnownSpellsByLevel,
  getSpell,
} from '~/domain/spells/getSpells';
import { Card } from '~/components/cards/card';
import { replaceAt } from '~/utils/insert';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { getInvocationsSpells } from '~/domain/classes/warlock/warlock';
import { getKnightSpells } from '~/domain/classes/fighter/fighter';

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
  const level = formData.get('level');

  const forget = formData.get('forget');
  const learn = formData.getAll('learn[]');
  const prepare = formData.getAll('prepare[]');

  // Knight Spells
  let pKnightSpells = formData.get('pKnightSpells');
  pKnightSpells = pKnightSpells ? pKnightSpells.split(',') : [];
  if (forget)
    pKnightSpells = pKnightSpells.filter(invName => forget !== invName);

  const learnWizard = formData.get('learnWizard');
  const prepareWizard = formData.getAll('prepareWizard[]');
  // Knight Spells

  await Promise.all([
    learnSpells(name, learn),
    prepareSpells(name, [...prepare, ...prepareWizard]),
    updatePc({
      name,
      'magic.hasLearnedSpells': Array.from(
        Array(parseInt(level, 0)),
        () => true
      ),
    }),
    forget && forgetSpell(name, forget),
    learnWizard &&
      pushAttrsForClass(name, 'fighter', {
        knightSpells: [...pKnightSpells, learnWizard],
      }),
  ]);

  return redirect(`/characters/pc/${name}/summary`);
};

function NewSpells() {
  const { pc } = useLoaderData();
  const { name, pClass, level } = pc;

  useTitle(`${translateClass(pClass)} nivel ${level}`);

  const newCantripsNumber = getNewCantripsAmount(pc);

  const [newSpellsNumber, setNewSpellsNumber] = useState(
    getNewSpellsAmount(pc)
  );

  const knownSpells = getAllPcSpells(pc).filter(
    spell =>
      !getInvocationsSpells(pc)
        .map(s => s.name)
        .includes(spell.name)
  );

  const allCantrips = getClassSpells(pc)
    .filter(spell => spell.level === 0)
    .filter(
      spell =>
        !getAllPcCantrips(pc)
          .map(s => s.name)
          .includes(spell.name)
    );

  const [cantripsToLearn, setCantripsToLearn] = useState(
    allCantrips.map(() => false)
  );

  function setCantripToLearn(cantripIndex, checked) {
    setCantripsToLearn(oldToLearn => {
      if (checked && oldToLearn.filter(v => v)?.length === newCantripsNumber)
        return oldToLearn;
      else return replaceAt(cantripIndex, oldToLearn, checked);
    });
  }

  // Knight Spells
  const knightSpells = getKnightSpells(pc).map(s => getSpell(s.name));
  // Knight Spells
  // Known spells
  const totalSpellsNumber = getTotalSpells(pc);
  const kwnonSpellLevels = [
    ...new Set(knownSpells.filter(s => s.level > 0).map(s => s.level)),
  ];
  const knownSpellsByLevel = getKnownSpellsByLevel(pc).map(
    (spells, spellIndex) => [
      ...spells,
      // Knight Spells
      ...knightSpells.filter(s => s.level === spellIndex + 1),
      // Knight Spells
    ]
  );
  // Known spells

  const [toForget, setToForget] = useState(
    kwnonSpellLevels.map(spellLevel =>
      knownSpells.filter(spell => spell.level === spellLevel).map(() => false)
    )
  );

  // Knight Spells
  const [isKnightSpellToForget, setIsKnightSpellToForget] = useState(false);
  // Knight Spells

  function setSpellToForget(levelIndex, spellIndex, checked) {
    setToForget(oldToForget => {
      if (checked && oldToForget.flat().some(v => v)) return oldToForget;
      else {
        if (checked) {
          // Knight Spells
          if (
            knightSpells
              .map(s => s.name)
              .includes(knownSpellsByLevel[levelIndex][spellIndex]?.name)
          ) {
            setIsKnightSpellToForget(true);
          } else {
            setNewSpellsNumber(n => n + 1);
            setIsKnightSpellToForget(false);
          }
          // Knight Spells
        } else {
          // Knight Spells
          setIsKnightSpellToForget(false);
          if (
            !knightSpells
              .map(s => s.name)
              .includes(knownSpellsByLevel[levelIndex][spellIndex]?.name)
          ) {
            setNewSpellsNumber(n => n - 1);
          }
          // Knight Spells
        }

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
  // Knight Spells
  const wizardSpellsByLevel = newSpellLevels.map(spellLevel =>
    getClassSpells({ ...pc, pClass: 'wizard' }).filter(
      spell => spell.level === spellLevel
    )
  );
  // Knight Spells

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

  // Knight Spells
  const [toLearnWizard, setToLearnWizard] = useState(
    wizardSpellsByLevel.map(spells => spells.map(() => false))
  );

  function setSpellToLearnWizard(levelIndex, spellIndex, checked) {
    setToLearnWizard(oldToLearn => {
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
  // Knight Spells

  const [skillRefs, setSkillRefs] = useState({
    cantrips: allCantrips.map(() => useRef()),
    // Known Spells
    known: knownSpells.map(() => useRef()),
    // Known Spells
    ...spellsByLevel.map(spells => spells.map(() => useRef())),
    // Knight Spells
    ...wizardSpellsByLevel.reduce(
      (levelRefs, spells, levelIndex) => ({
        ...levelRefs,
        ['w' + levelIndex]: spells.reduce(
          (spellRefs, spell, spellIndex) => ({
            ...spellRefs,
            ['w' + spellIndex]: useRef(),
          }),
          {}
        ),
      }),
      {}
    ),
    // Knight Spells
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
      <input readOnly type="text" name="level" value={level} hidden />
      {/* // Knight Spells */}
      <input
        readOnly
        type="text"
        name="pKnightSpells"
        value={knightSpells.join(',')}
        hidden
      />
      {/* // Knight Spells */}

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
          <h3>
            Aprendes {newCantripsNumber} nuevo{newCantripsNumber > 1 ? 's' : ''}{' '}
            Truco{newCantripsNumber > 1 ? 's' : ''}
          </h3>
          <p className={cardStyles.cards}>
            <Card title="Trucos" singleCard>
              <ul className={cardStyles.cardList}>
                {allCantrips.map((spell, cantripIndex) => (
                  <li key={spell.name}>
                    <label
                      htmlFor={spell.name}
                      className={`${styles.toSelect}`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={spell.name}
                        name="learn[]"
                        value={spell.name}
                        checked={cantripsToLearn[cantripIndex]}
                        onChange={e =>
                          setCantripToLearn(cantripIndex, e.target.checked)
                        }
                      />
                      <SkillItem
                        ref={skillRefs.cantrips[cantripIndex]}
                        traitName={spell.name}
                        trait="spell"
                        openModal={openSkillModal('cantrips', cantripIndex)}
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

      {hasToLearnSpells(pc) && (
        <>
          {/* // Known Spells */}
          <h3>{totalSpellsNumber} conjuros conocidos</h3>
          <p>
            Puedes elegir uno de los conjuros de {translateClass(pClass)} que
            conoces y reemplazarlo por otro de la lista de conjuros del{' '}
            {translateClass(pClass)} de hasta nivel {newSpellsMaxLevel}
          </p>
          <div className={`${cardStyles.cards} ${cardStyles.scrollList}`}>
            {knownSpellsByLevel.map((spells, spellLevelIndex) => {
              const spellLevel = spellLevelIndex + 1;
              const slots = getSpellSlots(pc)[pc.level];
              return (
                <Card
                  title={`Conjuros nivel ${spellLevel}`}
                  className={cardStyles.scrollCard}
                  singleCard={knownSpellsByLevel.length === 1}
                  key={spellLevel}
                >
                  {Array.isArray(slots) && <h4>({slots} Huecos)</h4>}
                  <ul className={cardStyles.cardList}>
                    {spells.map((spell, spellIndex) => (
                      <li key={spell.name}>
                        <label
                          htmlFor={spell.name}
                          className={`${styles.toRemove} ${
                            toForget[spellLevel - 1]?.[spellIndex] &&
                            styles.selectedToRemove
                          }`}
                        >
                          <input
                            hidden
                            type="checkbox"
                            id={spell.name}
                            name="forget"
                            value={spell.name}
                            checked={toForget[spellLevel - 1]?.[spellIndex]}
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
                          {/* // Knight Spells */}
                          {knightSpells
                            .map(s => s.name)
                            .includes(spell.name) && <> (Mago)</>}
                          {/* // Knight Spells */}
                        </label>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
          {/* // Known Spells */}

          {(hasNewLevelSpells(pc) || toForget.flat().some(v => v)) && (
            <>
              <h3>
                Aprendes {newSpellsNumber} nuevo{newSpellsNumber > 1 ? 's' : ''}{' '}
                Conjuro{newSpellsNumber > 1 ? 's' : ''} de hasta nivel{' '}
                {newSpellsMaxLevel}
              </h3>
              <div className={`${cardStyles.cards} ${cardStyles.scrollList}`}>
                {spellsByLevel.map((spellsOfLevel, i) => {
                  const spellLevel = i + 1;
                  return (
                    <Card
                      title={`Conjuros nivel ${spellLevel}`}
                      className={cardStyles.scrollCard}
                      singleCard={spellsByLevel.length === 1}
                      key={spellLevel}
                    >
                      <ul className={cardStyles.cardList}>
                        {spellsOfLevel
                          .filter(
                            spell =>
                              !knownSpells.map(s => s.name).includes(spell.name)
                          )
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
                                <input
                                  hidden
                                  type="checkbox"
                                  id={spell.name}
                                  name="prepare[]"
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

          {/* // Knight Spells */}
          {isKnightSpellToForget && (
            <>
              <h3>
                Aprendes 1 nuevo Conjuro de mago de hasta nivel{' '}
                {newSpellsMaxLevel}
              </h3>
              <div className={`${cardStyles.cards} ${cardStyles.scrollList}`}>
                {wizardSpellsByLevel.map((spellsOfLevel, i) => {
                  const spellLevel = i + 1;
                  return (
                    <Card
                      title={`Conjuros de mago nivel ${spellLevel}`}
                      className={cardStyles.scrollCard}
                      singleCard={wizardSpellsByLevel.length === 1}
                      key={spellLevel}
                    >
                      <ul className={cardStyles.cardList}>
                        {spellsOfLevel
                          .filter(
                            spell =>
                              !knownSpells.map(s => s.name).includes(spell.name)
                          )
                          .map((spell, spellIndex) => (
                            <li key={spell.name}>
                              <label
                                htmlFor={spell.name}
                                className={`${styles.toSelect} ${
                                  toLearnWizard[spellLevel - 1][spellIndex] &&
                                  styles.selectedToSelect
                                }`}
                              >
                                <input
                                  hidden
                                  type="checkbox"
                                  id={spell.name}
                                  name="learnWizard[]"
                                  value={spell.name}
                                  checked={
                                    toLearnWizard[spellLevel - 1][spellIndex]
                                  }
                                  onChange={e =>
                                    setSpellToLearnWizard(
                                      spellLevel - 1,
                                      spellIndex,
                                      e.target.checked
                                    )
                                  }
                                />
                                <input
                                  hidden
                                  type="checkbox"
                                  id={spell.name}
                                  name="prepareWizard[]"
                                  value={spell.name}
                                  checked={
                                    toLearnWizard[spellLevel - 1][spellIndex]
                                  }
                                  onChange={e =>
                                    setSpellToLearn(
                                      spellLevel - 1,
                                      spellIndex,
                                      e.target.checked
                                    )
                                  }
                                />
                                <SkillItem
                                  ref={skillRefs['w' + i]['w' + spellIndex]}
                                  traitName={spell.name}
                                  trait="spell"
                                  openModal={openSkillModal(
                                    'w' + i,
                                    'w' + spellIndex
                                  )}
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
          {/* // Knight Spells */}
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
        Puedes elegir uno de los conjuros que conoces y reemplazarlo por otro de
        la lista de conjuros de tu clase
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default NewSpells;
