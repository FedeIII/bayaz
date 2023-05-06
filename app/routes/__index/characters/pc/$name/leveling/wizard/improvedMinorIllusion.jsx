import { useRef, useState } from 'react';
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
import { getClassSpells } from '~/domain/spells/spells';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
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
  const name = formData.get('name');
  const spell = formData.get('spell');

  await updateAttrsForClass(name, 'wizard', {
    improvedMinorIllusion: { name: spell },
  });

  return redirect(`/characters/pc/${name}/summary`);
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
    cantrips: wizardCantrips.map(() => useRef()),
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
        <input readOnly type="text" name="name" value={pc.name} hidden />
        <input readOnly type="text" name="spell" value="minorIllusion" hidden />

        <h2 className={appStyles.paleText}>Truco de Ilusión</h2>
        <p className={appStyles.paragraph}>
          Cuando escoges esta escuela en nivel 2, aprendes el truco ilusión
          menor. El truco no cuenta para tu límite de trucos conocidos.
        </p>

        <p>
          <button type="submit" className={cardStyles.buttonCard}>
            Aprender Ilusión Menor
          </button>
        </p>
      </Form>
    );
  }

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="name" value={pc.name} hidden />

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <h2 className={appStyles.paleText}>Truco de Ilusión</h2>
      <p className={appStyles.paragraph}>
        Cuando escoges esta escuela en nivel 2, aprendes el truco ilusión menor.
        Si ya conocías este truco, aprendes otro truco de mago de tu elección.
        El truco no cuenta para tu límite de trucos conocidos.
      </p>

      <p>
        <div className={`${cardStyles.cards}`}>
          <Card
            title="Trucos de mago"
            className={cardStyles.scrollCard}
            singleCard
          >
            <ul className={cardStyles.cardList}>
              {wizardCantrips
                .filter(
                  spell => !knownCantrips.map(s => s.name).includes(spell.name)
                )
                .map((spell, spellIndex) => {
                  return (
                    <li key={spell.name}>
                      <label
                        htmlFor={spell.name}
                        className={`${styles.toSelect} ${
                          selectedSpell === spell.name &&
                          styles.selectedToSelect
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
                          ref={skillRefs.cantrips[spellIndex]}
                          traitName={spell.name}
                          trait="spell"
                          openModal={openSkillModal('cantrips', spellIndex)}
                          openOnRightClick
                        />
                      </label>
                    </li>
                  );
                })}
            </ul>
          </Card>
        </div>
      </p>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
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
      <h2 className={appStyles.errorText}>{error.message}</h2>

      <p className={appStyles.paragraph}>
        Cuando escoges esta escuela en nivel 2, aprendes el truco ilusión menor.
        Si ya conocías este truco, aprendes otro truco de mago de tu elección.
        El truco no cuenta para tu límite de trucos conocidos.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default ImprovedMinorIllusionSpell;
