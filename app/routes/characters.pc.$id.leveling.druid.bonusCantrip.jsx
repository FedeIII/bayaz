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
import { getBonusCantrip } from '~/domain/classes/druid/druid';
import { DRUID_SPELLS } from '~/domain/spells/druid';
import { getKnownCantrips } from '~/domain/spells/getSpells';
import { translateSpell } from '~/domain/spells/spells';
import { translateSchool } from '~/domain/spells/spellTranslations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);

  if (!pc) {
    throw new Error('PC not found');
  }

  if (getBonusCantrip(pc)) {
    throw new Error('Ya has escogido Truco Adicional');
  }

  if (pc.pClass !== 'druid') {
    throw new Error(
      'Solo los druidas pueden escoger Truco Adicional del Círculo de la Tierra'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const learn = formData.get('learn');

  await updateAttrsForClass(id, 'druid', {
    bonusCantrip: { name: learn },
  });
  return redirect(`/characters/pc/${id}/summary`);
};

function BonusCantrip() {
  const { pc } = useLoaderData();
  const { id, name } = pc;

  useTitle('Druida del Círculo de la Tierra nivel 2');

  const knownCantrips = getKnownCantrips(pc).map(s => s.name);
  const druidCantrips = DRUID_SPELLS.filter(
    s => s.level === 0 && !knownCantrips.includes(s.name)
  );

  const [toLearn, setToLearn] = useState(druidCantrips.map(() => false));

  function setSpellToLearn(spellIndex, checked) {
    setToLearn(oldToLearn => {
      if (checked && oldToLearn.filter(v => v)?.length === 1) return oldToLearn;
      else return replaceAt(spellIndex, oldToLearn, checked);
    });
  }

  const [skillRefs, setSkillRefs] = useState(
    druidCantrips.map(() => useRef([createRef()]))
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

      <h2 className="app__pale-text">
        Escoge Truco Adicional del Círculo de la Tierra
      </h2>

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <div className="cards">
        <Card title="Trucos" singleCard>
          <ul className="cards__card-list">
            {druidCantrips.map((spell, spellIndex) => (
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
                    ref={skillRefs[spellIndex].current[0]}
                    traitName={spell.name}
                    trait="spell"
                    pc={pc}
                    openModal={openSkillModal(
                      spellIndex,
                      0,
                      {},
                      'dontTriggerSeeTrait'
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
            ))}
          </ul>
        </Card>
      </div>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Truco
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
        Aprendes 1 nuevo Truco de Druida del Círculo de la Tierra
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default BonusCantrip;
