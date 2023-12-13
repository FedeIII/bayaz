import { createRef, useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { removeItem } from '~/utils/insert';
import { Card } from '~/components/cards/card';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';
import { SkillItem } from '~/components/modal/skillItem';
import { WIZARD_SPELLS } from '~/domain/spells/wizard';
import {
  getSpellSlots,
  maxSpellLevel,
  translateSpell,
} from '~/domain/spells/spells';
import {
  getArcaneTricksterSpells,
  isArcaneTrickster,
} from '~/domain/classes/rogue/rogue';
import {
  getMaxArcaneTricksterSpells,
  hasToLearnArcaneTricksterSpell,
} from '~/domain/spells/rogue';
import { getAllPcSpells } from '~/domain/spells/getSpells';
import { translateSchool } from '~/domain/spells/spellTranslations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToLearnArcaneTricksterSpell(pc)) {
    throw new Error('Ya has escogido Conjuros de Bribón Arcano en tu nivel');
  }

  if (pc.pClass !== 'rogue' || !isArcaneTrickster(pc)) {
    throw new Error(
      'Solo los Bribones Arcanos pueden escoger Conjuros de Bribón Arcano'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const arcaneTricksterSpells = formData.getAll('arcaneTricksterSpells[]');
  const forget = formData.get('forget');
  let pArcaneTrciksterSpells = formData.get('pArcaneTrciksterSpells');
  pArcaneTrciksterSpells = pArcaneTrciksterSpells
    ? pArcaneTrciksterSpells.split(',')
    : [];
  if (forget)
    pArcaneTrciksterSpells = pArcaneTrciksterSpells.filter(
      invName => forget !== invName
    );

  await updateAttrsForClass(id, 'rogue', {
    spellcasting: [...pArcaneTrciksterSpells, ...arcaneTricksterSpells].map(
      spellName => ({
        name: spellName,
      })
    ),
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function ArcaneTricksterSpells() {
  const { pc } = useLoaderData();
  const arcaneTricksterSpells = getArcaneTricksterSpells(pc).map(s => s.name);
  const maxArcaneTricksterSpells = getMaxArcaneTricksterSpells(pc);

  useTitle('Bribón Arcano nivel ' + pc.level);

  const knownSpells = getAllPcSpells(pc);

  const [spellToForet, setSpellToForget] = useState(null);
  const [selectedSpells, setSelectedSpells] = useState([]);

  const numberOfSpellsToSelect =
    maxArcaneTricksterSpells -
    (arcaneTricksterSpells.length - (spellToForet ? 1 : 0));

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
    known: useRef(arcaneTricksterSpells.map(createRef)),
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

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input
        readOnly
        type="text"
        name="pArcaneTrciksterSpells"
        value={arcaneTricksterSpells.join(',')}
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

      <h2 className="app__pale-text">Conjuros de Bribón Arcano</h2>
      <p className="app__paragraph">
        En los niveles 3, 8, 14 y 20 aprendes un conjuro que puede ser de
        cualquier escuela de magia.
      </p>

      {/* // Known Spells */}
      {!!arcaneTricksterSpells.length && (
        <>
          <h3>{arcaneTricksterSpells.length} Conjuros conocidos</h3>
          <p>
            Puedes elegir un conjuro de Bribón Arcano que conozcas y
            reemplazarla con otro conjuro de mago que puedas aprender a ese
            nivel.
          </p>
          <div className="cards">
            <Card title="Conjuros conocidas" singleCard>
              <ul className="cards__card-list">
                {arcaneTricksterSpells.map((spellName, i) => (
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
                        ref={skillRefs.known.current[i]}
                        pc={pc}
                        traitName={spellName}
                        trait="spell"
                        openModal={openSkillModal('known', i)}
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
                              name="arcaneTricksterSpells[]"
                              value={spell.name}
                              checked={selectedSpells.includes(spell.name)}
                              onChange={changeSelectedSpells(spell.name)}
                            />
                            <SkillItem
                              ref={
                                skillRefs[spellLevel - 1].current[spellIndex]
                              }
                              pc={pc}
                              traitName={spell.name}
                              trait="spell"
                              openModal={openSkillModal(
                                spellLevel - 1,
                                spellIndex
                              )}
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
        En los niveles 3, 8, 14 y 20 aprendes un conjuro que puede ser de
        cualquier escuela de magia.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ArcaneTricksterSpells;
