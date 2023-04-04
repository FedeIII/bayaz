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

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);

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
  const name = formData.get('name');
  const learn = formData.get('learn');

  await pushAttrsForClass(name, 'warlock', {
    arcanum: { name: learn },
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function MysticArcanum() {
  const { pc } = useLoaderData();
  const { name, level } = pc;

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
      <input readOnly type="text" name="name" value={name} hidden />

      <h2 className={appStyles.paleText}>Escoge Conjuro de Arcanum Místico</h2>

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

      <div className={`${cardStyles.cards}`}>
        <Card title={`Conjuros nivel ${spellLevel}`} singleCard>
          <ul className={cardStyles.cardList}>
            {arcanumOptions.map((spell, spellIndex) => (
              <li key={spell.name}>
                <label
                  htmlFor={spell.name}
                  className={`${styles.toSelect} ${
                    toLearn[spellIndex] && styles.selectedToSelect
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
        <button type="submit" className={cardStyles.buttonCard}>
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
      <h2 className={appStyles.errorText}>{error.message}</h2>

      <p className={appStyles.paragraph}>
        Aprendes un Conjuro de brujo como Arcanum Místico
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default MysticArcanum;
