import { createRef, useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import {
  getPc,
  learnBardLoreSpells,
  prepareSpells,
} from '~/services/pc.server';
import { translateClass } from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';
import {
  getAllClassesWithSpells,
  SPELL_SCHOOLS,
  getSpellSlots,
  getTotalSpells,
  maxSpellLevel,
  translateSpell,
} from '~/domain/spells/spells';
import { getAllPcSpells } from '~/domain/spells/getSpells';
import { Card } from '~/components/cards/card';
import { replaceAt } from '~/utils/insert';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { getLoreSpells } from '~/domain/classes/bard/bard';
import { SPELL_LIST } from '~/domain/spells/spellList';
import { translateSchool } from '~/domain/spells/spellTranslations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);

  if (!pc) {
    throw new Error('PC not found');
  }

  if (getLoreSpells(pc).length) {
    throw new Error('Ya has escogido Secretos Mágicos Adicionales');
  }

  if (pc.pClass !== 'bard') {
    throw new Error(
      'Solo los bardos pueden escoger Secretos Mágicos Adicionales'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const learn = formData.getAll('learn[]');

  await Promise.all([learnBardLoreSpells(id, learn), prepareSpells(id, learn)]);

  return redirect(`/characters/pc/${id}/summary`);
};

function LoreSpells() {
  const { pc } = useLoaderData();
  const { id, pClass } = pc;

  useTitle('Bardo nivel 6');

  const knownSpells = getAllPcSpells(pc);
  const newSpellsMaxLevel = maxSpellLevel(pc);
  const newSpellLevels = Array.from(Array(newSpellsMaxLevel), (_, i) => i + 1);
  const spellsByLevel = newSpellLevels.map(spellLevel =>
    SPELL_LIST.filter(spell => spell.level === spellLevel)
  );

  const [toLearn, setToLearn] = useState(
    spellsByLevel.map(spells => spells.map(() => false))
  );

  function setSpellToLearn(levelIndex, spellIndex, checked) {
    setToLearn(oldToLearn => {
      if (checked && oldToLearn.flat().filter(v => v)?.length === 2)
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
    // Known Spells
    known: useRef(knownSpells.map(createRef)),
    // Known Spells
    ...spellsByLevel.map(spells => useRef(spells.map(createRef))),
  });

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(pc, skillRefs);

  const formRef = useRef(null);

  const [fClass, setFClass] = useState('all');
  const [fSchool, setFSchool] = useState('all');

  // Known spells
  const totalSpellsNumber = getTotalSpells(pc);
  const [_cantripSlots, ...spellSlots] = getSpellSlots(pc);
  const kwnonSpellLevels = [
    ...new Set(knownSpells.filter(s => s.level > 0).map(s => s.level)),
  ];
  // Known spells

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="id" value={id} hidden />
      <input readOnly type="text" name="pClass" value={pClass} hidden />

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

      {/* // Known Spells */}
      <h3>{totalSpellsNumber} conjuros conocidos</h3>
      <div className="cards cards__scroll-list">
        {spellSlots.map((slots, spellLevelIndex) => {
          const spellLevel = spellLevelIndex + 1;
          return (
            <Card
              title={`Conjuros nivel ${spellLevel}`}
              className="cards__scroll-card"
              singleCard={kwnonSpellLevels.length === 1}
              key={spellLevel}
            >
              <h4>({slots} Huecos)</h4>
              <ul className="cards__card-list">
                {knownSpells.map((spell, spellIndex) => {
                  if (spell.level !== spellLevel) return null;
                  return (
                    <li key={spell.name}>
                      <label
                        htmlFor={spell.name}
                        className="checkbox__toRemove"
                      >
                        <SkillItem
                          ref={skillRefs.known.current[spellIndex]}
                          pc={pc}
                          traitName={spell.name}
                          trait="spell"
                          openModal={openSkillModal('known', spellIndex)}
                        >
                          <span className="tooltip">
                            {translateSpell(spell.name)}
                            <span className="tooltiptext">
                              {translateSchool(spell.school)}
                            </span>
                          </span>
                        </SkillItem>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </div>
      {/* // Known Spells */}

      <h3>
        Aprendes 2 nuevos Conjuros de hasta nivel {newSpellsMaxLevel} de
        cualquier clase
      </h3>
      <div className="cards">
        <Card title="Filtros" singleCard>
          <span className="app__filter">
            Clase:{' '}
            <select
              className="cards__button-card"
              value={fClass}
              onChange={e => setFClass(e.target.value)}
            >
              <option value="all">Todos</option>
              {getAllClassesWithSpells().map(c => (
                <option value={c} key={c}>
                  {translateClass(c)}
                </option>
              ))}
            </select>
          </span>
          <span className="app__filter">
            Escuela:{' '}
            <select
              className="cards__button-card"
              value={fSchool}
              onChange={e => setFSchool(e.target.value)}
            >
              <option value="all">Todas</option>
              {SPELL_SCHOOLS.map(c => (
                <option value={c} key={c}>
                  {translateSchool(c)}
                </option>
              ))}
            </select>
          </span>
        </Card>
      </div>
      <br />
      <div className="cards">
        {spellsByLevel.map((spellsOfLevel, i) => {
          const spellLevel = i + 1;
          return (
            <Card
              title={`Conjuros nivel ${spellLevel}`}
              singleCard={spellsByLevel.length === 1}
              key={spellLevel}
            >
              <ul className="cards__card-list">
                {spellsOfLevel
                  .filter(
                    spell => !knownSpells.map(s => s.name).includes(spell.name)
                  )
                  .filter(s => fClass === 'all' || s.class.includes(fClass))
                  .filter(s => fSchool === 'all' || s.school === fSchool)
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
                        <SkillItem
                          ref={skillRefs[i].current[spellIndex]}
                          traitName={spell.name}
                          trait="spell"
                          openModal={openSkillModal(i, spellIndex)}
                          openOnRightClick
                        >
                          <span className="tooltip">
                            {translateSpell(spell.name)}
                            <span className="tooltiptext">
                              {translateSchool(spell.school)}
                            </span>
                          </span>
                        </SkillItem>
                      </label>
                    </li>
                  ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Conjuros
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Aprendes 2 nuevos Conjuros de cualquier clase.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default LoreSpells;
