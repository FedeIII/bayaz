import { createRef, useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { Card } from '~/components/cards/card';
import { replaceAt } from '~/utils/array';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SPELL_LIST } from '~/domain/spells/spellList';
import {
  getTomeSpells,
  hasToLearnTomeSpells,
} from '~/domain/classes/warlock/warlock';
import { translateSpell } from '~/domain/spells/spells';
import { translateSchool } from '~/domain/spells/spellTranslations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);

  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToLearnTomeSpells(pc)) {
    throw new Error('Ya has escogido Trucos del Pacto del Tomo');
  }

  if (pc.pClass !== 'warlock') {
    throw new Error('Solo los brujos pueden escoger Trucos del Pacto del Tomo');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const learn = formData.getAll('learn[]');
  let tomeSpells = formData.get('tomeSpells');
  tomeSpells = tomeSpells ? tomeSpells.split(',') : [];
  await updateAttrsForClass(id, 'warlock', {
    tomeSpells: [...tomeSpells, ...learn].map(spellName => ({
      name: spellName,
    })),
  });
  return redirect(`/characters/pc/${id}/summary`);
};

function TomeSpells() {
  const { pc } = useLoaderData();
  const { id, level } = pc;

  const tomeSpells = getTomeSpells(pc);
  const numberOfSpellsToLearn = 3 - tomeSpells.length;

  useTitle('Brujo nivel ' + level);

  const allCantrips = SPELL_LIST.filter(s => s.level === 0);

  const [toLearn, setToLearn] = useState(allCantrips.map(() => false));

  function setSpellToLearn(spellIndex, checked) {
    setToLearn(oldToLearn => {
      if (
        checked &&
        oldToLearn.filter(v => v)?.length === numberOfSpellsToLearn
      )
        return oldToLearn;
      else return replaceAt(spellIndex, oldToLearn, checked);
    });
  }

  const [skillRefs, setSkillRefs] = useState(
    allCantrips.map(() => useRef([createRef()]))
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
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="id" value={id} hidden />
      <input
        readOnly
        type="text"
        name="tomeSpells"
        value={tomeSpells.join(',')}
        hidden
      />

      <h2 className="app__pale-text">Escoge Trucos del Pacto del Tomo</h2>

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <h3>Aprendes {numberOfSpellsToLearn} nuevos Trucos de cualquier clase</h3>

      <div className="cards">
        <Card title="Trucos" singleCard>
          <ul className="cards__card-list">
            {allCantrips.map((spell, spellIndex) => (
              <li key={spell.name}>
                <label
                  htmlFor={spell.name}
                  className={`checkbox__toSelect ${
                    toLearn[spellIndex] && 'checkbox__selectedToSelect'
                  }`}
                >
                  <input
                    hidden
                    type="checkbox"
                    id={spell.name}
                    name="learn[]"
                    value={spell.name}
                    checked={toLearn[spellIndex]}
                    onChange={e =>
                      setSpellToLearn(spellIndex, e.target.checked)
                    }
                  />
                  <SkillItem
                    ref={skillRefs[spellIndex].current[0]}
                    pc={pc}
                    traitName={spell.name}
                    trait="spell"
                    openModal={openSkillModal(spellIndex)}
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

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Trucos
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
        Aprendes 3 nuevos Trucos de cualquier clase
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default TomeSpells;
