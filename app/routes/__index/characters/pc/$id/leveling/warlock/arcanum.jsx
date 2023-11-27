import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, pushAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { Card } from '~/components/cards/card';
import { replaceAt } from '~/utils/insert';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { hasToLearnArcanum } from '~/domain/classes/warlock/warlock';
import { WARLOCK_SPELLS } from '~/domain/spells/warlock';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);

  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToLearnArcanum(pc)) {
    throw new Error(
      'Ya has escogido Conjuro de Arcanum Místico para este nivel'
    );
  }

  if (pc.pClass !== 'warlock') {
    throw new Error(
      'Solo los brujos pueden escoger Conjuros de Arcanum Místico'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const learn = formData.get('learn');

  await pushAttrsForClass(id, 'warlock', {
    arcanum: { name: learn },
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function MysticArcanum() {
  const { pc } = useLoaderData();
  const { id, level } = pc;

  const spellLevel = level >= 17 ? 9 : level >= 15 ? 8 : level >= 13 ? 7 : 6;

  useTitle('Brujo nivel ' + level);

  const arcanumOptions = WARLOCK_SPELLS.filter(s => s.level === spellLevel);

  const [toLearn, setToLearn] = useState(arcanumOptions.map(() => false));

  function setSpellToLearn(spellIndex, checked) {
    setToLearn(oldToLearn => {
      if (checked && oldToLearn.filter(v => v)?.length === 1) return oldToLearn;
      else return replaceAt(spellIndex, oldToLearn, checked);
    });
  }

  const [skillRefs, setSkillRefs] = useState(
    arcanumOptions.map(() => [useRef()])
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

      <h2 className="app__pale-text">Escoge Conjuro de Arcanum Místico</h2>

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
        Aprendes un Conjuro de brujo de nivel {spellLevel} como Arcanum Místico
      </h3>

      <div className="cards">
        <Card title={`Conjuros nivel ${spellLevel}`} singleCard>
          <ul className="cards__card-list">
            {arcanumOptions.map((spell, spellIndex) => (
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
                    name="learn"
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
          Escoger Arcanum
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
        Aprendes un Conjuro de brujo como Arcanum Místico
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default MysticArcanum;
