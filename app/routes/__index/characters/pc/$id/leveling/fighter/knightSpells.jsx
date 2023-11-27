import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { removeItem } from '~/utils/insert';
import { Card } from '~/components/cards/card';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';
import { SkillItem } from '~/components/modal/skillItem';
import {
  getMaxKnightSpells,
  hasToLearnKnightSpell,
} from '~/domain/spells/fighter';
import {
  getKnightSpells,
  isEldritchknight,
} from '~/domain/classes/fighter/fighter';
import { WIZARD_SPELLS } from '~/domain/spells/wizard';
import { getSpellSlots, maxSpellLevel } from '~/domain/spells/spells';
import { getAllPcSpells } from '~/domain/spells/getSpells';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToLearnKnightSpell(pc)) {
    throw new Error('Ya has escogido Conjuros de Caballero Arcano en tu nivel');
  }

  if (pc.pClass !== 'fighter' || !isEldritchknight(pc)) {
    throw new Error(
      'Solo los Caballeros Arcanos pueden escoger Conjuros de Caballero Arcano'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const knightSpells = formData.getAll('knightSpells[]');
  const forget = formData.get('forget');
  let pKnightSpells = formData.get('pKnightSpells');
  pKnightSpells = pKnightSpells ? pKnightSpells.split(',') : [];
  if (forget)
    pKnightSpells = pKnightSpells.filter(invName => forget !== invName);

  await updateAttrsForClass(id, 'fighter', {
    knightSpells: [...pKnightSpells, ...knightSpells].map(spellName => ({
      name: spellName,
    })),
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function ArcaneKnightSpells() {
  const { pc } = useLoaderData();
  const knightSpells = getKnightSpells(pc).map(s => s.name);
  const maxKnightSpells = getMaxKnightSpells(pc);

  useTitle('Caballero Arcano nivel ' + pc.level);

  const knownSpells = getAllPcSpells(pc);

  const [spellToForet, setSpellToForget] = useState(null);
  const [selectedSpells, setSelectedSpells] = useState([]);

  const numberOfSpellsToSelect =
    maxKnightSpells - (knightSpells.length - (spellToForet ? 1 : 0));

  function changeSelectedSpells(spellName) {
    return e => {
      if (e.target.checked) {
        if (selectedSpells.length < numberOfSpellsToSelect)
          setSelectedSpells(old => [...old, spellName]);
      } else {
        setSelectedSpells(old =>
          removeItem(invName => invName === spellName, old)
        );
      }
    };
  }

  function changeSpellToForget(spellName) {
    return e => {
      if (e.target.checked) setSpellToForget(spellName);
      else {
        setSelectedSpells([]);
        setSpellToForget(null);
      }
    };
  }

  const newSpellsMaxLevel = maxSpellLevel(pc);
  const newSpellLevels = Array.from(Array(newSpellsMaxLevel), (_, i) => i + 1);
  const spellsByLevel = newSpellLevels.map(spellLevel =>
    WIZARD_SPELLS.filter(spell => spell.level === spellLevel)
  );

  const [skillRefs, setSkillRefs] = useState({
    // Known Spells
    known: knightSpells.map(() => useRef()),
    // Known Spells
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
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input
        readOnly
        type="text"
        name="pKnightSpells"
        value={knightSpells.join(',')}
        hidden
      />

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <h2 className="app__pale-text">Conjuros de Caballero Arcano</h2>
      <p className="app__paragraph">
        En los niveles 3, 8, 14 y 20 aprendes un conjuro que puede ser de
        cualquier escuela de magia.
      </p>

      {/* // Known Spells */}
      {!!knightSpells.length && (
        <>
          <h3>{knightSpells.length} Conjuros conocidos</h3>
          <p>
            Puedes elegir un conjuro de Caballero Arcano que conozcas y
            reemplazarla con otro conjuro de mago que puedas aprender a ese
            nivel.
          </p>
          <div className="cards">
            <Card title="Conjuros conocidas" singleCard>
              <ul className="cards__card-list">
                {knightSpells.map((spellName, i) => (
                  <li key={spellName}>
                    <label
                      htmlFor={spellName}
                      className={`checkbox__toRemove ${
                        spellToForet === spellName &&
                        'checkbox__selectedToRemove'
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={spellName}
                        name="forget"
                        value={spellName}
                        checked={spellToForet === spellName}
                        onChange={changeSpellToForget(spellName)}
                      />
                      <SkillItem
                        ref={skillRefs.known[i]}
                        pc={pc}
                        traitName={spellName}
                        trait="spell"
                        openModal={openSkillModal('known', i)}
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
      {/* // Known Spells */}

      <p>
        <h3 className="app__pale-text">
          Escoge {numberOfSpellsToSelect} conjuros
        </h3>
        <div className="cards cards__scroll-list">
          {spellsByLevel.map((spells, spellLevelIndex) => {
            const spellLevel = spellLevelIndex + 1;
            const slots = getSpellSlots(pc)[pc.level];
            return (
              <Card
                title={`Conjuros nivel ${spellLevel}`}
                className="cards__scroll-card"
                singleCard={spellsByLevel.length === 1}
                key={spellLevel}
              >
                {Array.isArray(slots) && <h4>({slots} Huecos)</h4>}
                <ul className="cards__card-list">
                  {spells
                    .filter(
                      spell =>
                        !knownSpells.map(s => s.name).includes(spell.name)
                    )
                    .map((spell, spellIndex) => {
                      return (
                        <li key={spell.name}>
                          <label
                            htmlFor={spell.name}
                            className={`checkbox__toSelect ${
                              selectedSpells.includes(spell.name) &&
                              'checkbox__selectedToSelect'
                            }`}
                          >
                            <input
                              hidden
                              type="checkbox"
                              id={spell.name}
                              name="knightSpells[]"
                              value={spell.name}
                              checked={selectedSpells.includes(spell.name)}
                              onChange={changeSelectedSpells(spell.name)}
                            />
                            <SkillItem
                              ref={skillRefs[spellLevel - 1][spellIndex]}
                              traitName={spell.name}
                              trait="spell"
                              openModal={openSkillModal(
                                spellLevel - 1,
                                spellIndex
                              )}
                              openOnRightClick
                            />
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </Card>
            );
          })}
        </div>
      </p>

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
        Si una invocación sobrenatural tiene prerrequisitos, debes cumplirlos
        para aprenderla. Puedes aprender la invocación en el mismo momento en
        que cumples sus prerrequisitos.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ArcaneKnightSpells;
