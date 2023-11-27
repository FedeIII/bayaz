import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import {
  forgetSpell,
  getPc,
  learnSpells,
  prepareSpells,
  updateAttrsForClass,
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
  hasToPrepareSpells,
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
import { getArcaneTricksterSpells } from '~/domain/classes/rogue/rogue';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const level = formData.get('level');

  const forget = formData.get('forget');
  const learn = formData.getAll('learn[]');
  const prepare = formData.getAll('prepare[]');

  // Knight Spells
  let pKnightSpells = formData.get('pKnightSpells');
  pKnightSpells = pKnightSpells ? pKnightSpells.split(',') : [];
  if (forget)
    pKnightSpells = pKnightSpells
      .filter(invName => forget !== invName)
      .map(s => ({ name: s }));

  const learnKnight = formData.get('learnKnight');
  const prepareKnight = formData.getAll('prepareKnight[]');
  // Knight Spells

  // Arcane Trickster Spells
  let pArcaneTricksterSpells = formData.get('pArcaneTricksterSpells');
  pArcaneTricksterSpells = pArcaneTricksterSpells
    ? pArcaneTricksterSpells.split(',')
    : [];
  if (forget)
    pArcaneTricksterSpells = pArcaneTricksterSpells
      .filter(invName => forget !== invName)
      .map(s => ({ name: s }));

  const learnArcaneTrickster = formData.get('learnArcaneTrickster');
  const prepareArcaneTrickster = formData.getAll('prepareArcaneTrickster[]');
  // Arcane Trickster Spells

  await Promise.all([
    learnSpells(id, learn),
    prepareSpells(id, [
      ...prepare,
      ...prepareKnight,
      ...prepareArcaneTrickster,
    ]),
    updatePc({
      id,
      'magic.hasLearnedSpells': Array.from(
        Array(parseInt(level, 0)),
        () => true
      ),
    }),
    forget && forgetSpell(id, forget),
    learnKnight &&
      updateAttrsForClass(id, 'fighter', {
        knightSpells: [...pKnightSpells, { name: learnKnight }],
      }),
    learnArcaneTrickster &&
      updateAttrsForClass(id, 'rogue', {
        spellcasting: [
          ...pArcaneTricksterSpells,
          { name: learnArcaneTrickster },
        ],
      }),
  ]);

  return redirect(`/characters/pc/${id}/summary`);
};

function NewSpells() {
  const { pc } = useLoaderData();
  const { id, name, pClass, level } = pc;

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

  // Arcane Trickster Spells
  const arcaneTricksterSpells = getArcaneTricksterSpells(pc).map(s =>
    getSpell(s.name)
  );
  // Arcane Trickster Spells

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
      // Arcane Trickster Spells
      ...arcaneTricksterSpells.filter(s => s.level === spellIndex + 1),
      // Arcane Trickster Spells
    ]
  );
  // Known spells

  const [toForget, setToForget] = useState(
    kwnonSpellLevels.map(spellLevel =>
      knownSpells.filter(spell => spell.level === spellLevel).map(() => false)
    )
  );

  // Knight Spells
  const [isWizardSpellToForget, setIsWizardSpellToForget] = useState(false);
  // Knight Spells

  function setSpellToForget(levelIndex, spellIndex, checked) {
    setToForget(oldToForget => {
      if (checked && oldToForget.flat().some(v => v)) return oldToForget;
      else {
        if (checked) {
          // Knight Spells / Arcane Trickster Spells
          if (
            knightSpells
              .map(s => s.name)
              .includes(knownSpellsByLevel[levelIndex][spellIndex]?.name) ||
            arcaneTricksterSpells
              .map(s => s.name)
              .includes(knownSpellsByLevel[levelIndex][spellIndex]?.name)
          ) {
            setIsWizardSpellToForget(true);
          } else {
            setNewSpellsNumber(n => n + 1);
            setIsWizardSpellToForget(false);
          }
          // Knight Spells / Arcane Trickster Spells
        } else {
          // Knight Spells / Arcane Trickster Spells
          setIsWizardSpellToForget(false);
          if (
            !knightSpells
              .map(s => s.name)
              .includes(knownSpellsByLevel[levelIndex][spellIndex]?.name) &&
            !arcaneTricksterSpells
              .map(s => s.name)
              .includes(knownSpellsByLevel[levelIndex][spellIndex]?.name)
          ) {
            setNewSpellsNumber(n => n - 1);
          }
          // Knight Spells / Arcane Trickster Spells
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
  // Knight Spells / Arcane Trickster Spells
  const wizardSpellsByLevel = newSpellLevels.map(spellLevel =>
    getClassSpells({ ...pc, pClass: 'wizard' }).filter(
      spell => spell.level === spellLevel
    )
  );
  // Knight Spells / Arcane Trickster Spells

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

  // Knight Spells / Arcane Trickster Spells
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
  // Knight Spells / Arcane Trickster Spells

  const [skillRefs, setSkillRefs] = useState({
    cantrips: allCantrips.map(() => useRef()),
    // Known Spells
    known: knownSpells.map(() => useRef()),
    // Known Spells
    ...spellsByLevel.map(spells => spells.map(() => useRef())),
    // Knight Spells / Arcane Trickster Spells
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
    // Knight Spells / Arcane Trickster Spells
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
      <input readOnly type="text" name="id" value={id} hidden />
      <input readOnly type="text" name="level" value={level} hidden />
      {/* // Knight Spells */}
      <input
        readOnly
        type="text"
        name="pKnightSpells"
        value={knightSpells.map(s => s.name).join(',')}
        hidden
      />
      {/* // Knight Spells */}
      {/* // Arcane Trickster Spells */}
      <input
        readOnly
        type="text"
        name="pArcaneTricksterSpells"
        value={arcaneTricksterSpells.map(s => s.name).join(',')}
        hidden
      />
      {/* // Arcane Trickster Spells */}

      <h2 className="app__pale-text">Escoge nuevos Conjuros</h2>

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
          <div className="cards">
            <Card title="Trucos" singleCard>
              <ul className="cards__card-list">
                {allCantrips.map((spell, cantripIndex) => (
                  <li key={spell.name}>
                    <label
                      htmlFor={spell.name}
                      className={`checkbox__toSelect ${
                        cantripsToLearn[cantripIndex] &&
                        'checkbox__selectedToSelect'
                      }`}
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
          </div>
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
          <div className="cards cards__scrollList">
            {knownSpellsByLevel.map((spells, spellLevelIndex) => {
              const spellLevel = spellLevelIndex + 1;
              const slots = getSpellSlots(pc)[pc.level];
              return (
                <Card
                  title={`Conjuros nivel ${spellLevel}`}
                  className="cards__scroll-card"
                  singleCard={knownSpellsByLevel.length === 1}
                  key={spellLevel}
                >
                  {Array.isArray(slots) && <h4>({slots} Huecos)</h4>}
                  <ul className="cards__card-list">
                    {spells.map((spell, spellIndex) => (
                      <li key={spell.name}>
                        <label
                          htmlFor={spell.name}
                          className={`checkbox__toRemove ${
                            toForget[spellLevel - 1]?.[spellIndex] &&
                            'checkbox__selectedToRemove'
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
                          {/* // Arcane Trickster Spells */}
                          {arcaneTricksterSpells
                            .map(s => s.name)
                            .includes(spell.name) && <> (Mago)</>}
                          {/* // Arcane Trickster Spells */}
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
              <div className="cards cards__scrollList">
                {spellsByLevel.map((spellsOfLevel, i) => {
                  const spellLevel = i + 1;
                  return (
                    <Card
                      title={`Conjuros nivel ${spellLevel}`}
                      className="cards__scroll-card"
                      singleCard={spellsByLevel.length === 1}
                      key={spellLevel}
                    >
                      <ul className="cards__card-list">
                        {spellsOfLevel
                          .filter(
                            spell =>
                              !knownSpells.map(s => s.name).includes(spell.name)
                          )
                          .map((spell, spellIndex) => (
                            <li key={spell.name}>
                              <label
                                htmlFor={spell.name}
                                className={`checkbox__toSelect ${
                                  toLearn[spellLevel - 1][spellIndex] &&
                                  'checkbox__selectedToSelect'
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
                                {!hasToPrepareSpells(pc) && (
                                  <input
                                    hidden
                                    type="checkbox"
                                    id={spell.name}
                                    name="prepare[]"
                                    value={spell.name}
                                    checked={
                                      toLearn[spellLevel - 1][spellIndex]
                                    }
                                  />
                                )}
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

          {/* // Knight Spells / Arcane Trickster Spells */}
          {isWizardSpellToForget && (
            <>
              <h3>
                Aprendes 1 nuevo Conjuro de mago de hasta nivel{' '}
                {newSpellsMaxLevel}
              </h3>
              <div className="cards cards__scrollList">
                {wizardSpellsByLevel.map((spellsOfLevel, i) => {
                  const spellLevel = i + 1;
                  return (
                    <Card
                      title={`Conjuros de mago nivel ${spellLevel}`}
                      className="cards__scroll-card"
                      singleCard={wizardSpellsByLevel.length === 1}
                      key={spellLevel}
                    >
                      <ul className="cards__card-list">
                        {spellsOfLevel
                          .filter(
                            spell =>
                              !knownSpells.map(s => s.name).includes(spell.name)
                          )
                          .map((spell, spellIndex) => (
                            <li key={spell.name}>
                              <label
                                htmlFor={`w-${spell.name}`}
                                className={`checkbox__toSelect ${
                                  toLearnWizard[spellLevel - 1][spellIndex] &&
                                  'checkbox__selectedToSelect'
                                }`}
                              >
                                {pClass === 'fighter' && (
                                  <input
                                    hidden
                                    type="checkbox"
                                    id={`w-${spell.name}`}
                                    name="learnKnight"
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
                                )}
                                {pClass === 'rogue' && (
                                  <input
                                    hidden
                                    type="checkbox"
                                    id={`w-${spell.name}`}
                                    name="learnArcaneTrickster"
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
                                )}
                                {pClass === 'fighter' && (
                                  <input
                                    hidden
                                    type="checkbox"
                                    id={spell.name}
                                    name="prepareKnight[]"
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
                                )}
                                {pClass === 'rogue' && (
                                  <input
                                    hidden
                                    type="checkbox"
                                    id={spell.name}
                                    name="prepareArcaneTrickster[]"
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
                                )}
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
          {/* // Knight Spells / Arcane Trickster Spells */}
        </>
      )}

      <p>
        <button type="submit" className="cards__button-card">
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
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Puedes elegir uno de los conjuros que conoces y reemplazarlo por otro de
        la lista de conjuros de tu clase
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default NewSpells;
