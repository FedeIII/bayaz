import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { Card } from '~/components/cards/card';
import { replaceAt } from '~/utils/insert';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SPELL_LIST } from '~/domain/spells/spellList';
import {
  getTomeRituals,
  hasToLearnTomeRituals,
} from '~/domain/classes/warlock/warlock';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);

  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToLearnTomeRituals(pc)) {
    throw new Error('Ya has escogido Rituales del Pacto del Tomo');
  }

  if (pc.pClass !== 'warlock') {
    throw new Error(
      'Solo los brujos pueden escoger Rituales del Pacto del Tomo'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const learn = formData.getAll('learn[]');

  let tomeRituals = formData.get('tomeRituals');
  tomeRituals = tomeRituals ? tomeRituals.split(',') : [];

  await updateAttrsForClass(id, 'warlock', {
    tomeRituals: [...tomeRituals, ...learn].map(spellName => ({
      name: spellName,
    })),
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function TomeRituals() {
  const { pc } = useLoaderData();
  const { id, level } = pc;

  const tomeRituals = getTomeRituals(pc);
  const numberOfSpellsToLearn = 2 - tomeRituals.length;

  useTitle('Brujo nivel ' + level);

  const allRituals = SPELL_LIST.filter(s => s.level === 1 && s.ritual);

  const [toLearn, setToLearn] = useState(allRituals.map(() => false));

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

  const [skillRefs, setSkillRefs] = useState(allRituals.map(() => [useRef()]));

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
        name="tomeRituals"
        value={tomeRituals.join(',')}
        hidden
      />

      <h2 className="app__pale-text">Escoge Rituales del Pacto del Tomo</h2>

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <h3>
        Aprendes {numberOfSpellsToLearn} nuevos Rituales de cualquier clase
      </h3>

      <div className="cards">
        <Card title="Rituales" singleCard>
          <ul className="cards__card-list">
            {allRituals.map((spell, spellIndex) => (
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
                    ref={skillRefs[spellIndex][0]}
                    traitName={spell.name}
                    trait="spell"
                    openModal={openSkillModal(spellIndex)}
                    openOnRightClick
                  />
                </label>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Rituales
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
        Aprendes 3 nuevos Rituales de cualquier clase
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default TomeRituals;
