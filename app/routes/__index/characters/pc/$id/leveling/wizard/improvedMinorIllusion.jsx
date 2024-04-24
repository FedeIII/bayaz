import { createRef, useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { Card } from '~/components/cards/card';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';
import { SkillItem } from '~/components/modal/skillItem';
import { getKnownCantrips } from '~/domain/spells/getSpells';
import { getImprovedMinorIllusionSpell } from '~/domain/classes/wizard/wizard';
import { getClassSpells, translateSpell } from '~/domain/spells/spells';
import { translateSchool } from '~/domain/spells/spellTranslations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getImprovedMinorIllusionSpell(pc)) {
    throw new Error('Ya has escogido Truco de Ilusión');
  }

  if (pc.pClass !== 'wizard') {
    throw new Error('Solo los magos pueden escoger Truco de Ilusión');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const spell = formData.get('spell');

  await updateAttrsForClass(id, 'wizard', {
    improvedMinorIllusion: { name: spell },
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function ImprovedMinorIllusionSpell() {
  const { pc } = useLoaderData();
  const knownCantrips = getKnownCantrips(pc);
  const knowsMinorIllusion = knownCantrips
    .map(s => s.name)
    .includes('minorIllusion');

  useTitle('Erudito de Ilusión nivel 2');

  const [selectedSpell, setSelectedSpell] = useState(null);

  const wizardCantrips = getClassSpells(pc).filter(spell => spell.level === 0);

  const [skillRefs, setSkillRefs] = useState({
    cantrips: useRef(wizardCantrips.map(createRef)),
  });

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(pc, skillRefs);

  const formRef = useRef(null);

  if (!knowsMinorIllusion) {
    return (
      <Form method="post" ref={formRef}>
        <input readOnly type="text" name="id" value={pc.id} hidden />
        <input readOnly type="text" name="spell" value="minorIllusion" hidden />

        <h2 className="app__pale-text">Truco de Ilusión</h2>
        <p className="app__paragraph">
          Cuando escoges esta escuela en nivel 2, aprendes el truco ilusión
          menor. El truco no cuenta para tu límite de trucos conocidos.
        </p>

        <p>
          <button type="submit" className="cards__button-card">
            Aprender Ilusión Menor
          </button>
        </p>
      </Form>
    );
  }

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="id" value={pc.id} hidden />

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <h2 className="app__pale-text">Truco de Ilusión</h2>
      <p className="app__paragraph">
        Cuando escoges esta escuela en nivel 2, aprendes el truco ilusión menor.
        Si ya conocías este truco, aprendes otro truco de mago de tu elección.
        El truco no cuenta para tu límite de trucos conocidos.
      </p>

      <p>
        <div className="cards">
          <Card
            title="Trucos de mago"
            className="cards__scroll-card"
            singleCard
          >
            <ul className="cards__card-list">
              {wizardCantrips
                .filter(
                  spell => !knownCantrips.map(s => s.name).includes(spell.name)
                )
                .map((spell, spellIndex) => {
                  return (
                    <li key={spell.name}>
                      <label
                        htmlFor={spell.name}
                        className={`checkbox__toSelect ${
                          selectedSpell === spell.name &&
                          'checkbox__selectedToSelect'
                        }`}
                      >
                        <input
                          hidden
                          type="radio"
                          id={spell.name}
                          name="spell"
                          value={spell.name}
                          checked={selectedSpell === spell.name}
                          onChange={() => setSelectedSpell(spell.name)}
                        />
                        <SkillItem
                          ref={skillRefs.cantrips.current[spellIndex]}
                          pc={pc}
                          traitName={spell.name}
                          trait="spell"
                          openModal={openSkillModal('cantrips', spellIndex)}
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
        </div>
      </p>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Truco
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
        Cuando escoges esta escuela en nivel 2, aprendes el truco ilusión menor.
        Si ya conocías este truco, aprendes otro truco de mago de tu elección.
        El truco no cuenta para tu límite de trucos conocidos.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ImprovedMinorIllusionSpell;
