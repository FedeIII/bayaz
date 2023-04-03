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
  getTomeSpells,
  hasToLearnTomeSpells,
} from '~/domain/classes/warlock/warlock';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);

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
  const name = formData.get('name');
  const learn = formData.getAll('learn[]');
  let tomeSpells = formData.get('tomeSpells');
  tomeSpells = tomeSpells ? tomeSpells.split(',') : [];
  await updateAttrsForClass(name, 'warlock', {
    tomeSpells: [...tomeSpells, ...learn].map(spellName => ({
      name: spellName,
    })),
  });
  return redirect(`/characters/pc/${name}/summary`);
};

function TomeSpells() {
  const { pc } = useLoaderData();
  const { name, pClass, level } = pc;

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

  const [skillRefs, setSkillRefs] = useState(allCantrips.map(() => [useRef()]));

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
      <input
        readOnly
        type="text"
        name="tomeSpells"
        value={tomeSpells.join(',')}
        hidden
      />

      <h2 className={appStyles.paleText}>Escoge Trucos del Pacto del Tomo</h2>

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

      <div className={`${cardStyles.cards}`}>
        <Card title="Trucos" singleCard>
          <ul className={cardStyles.cardList}>
            {allCantrips.map((spell, spellIndex) => (
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
        <button type="submit" className={cardStyles.buttonCard}>
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
      <h2 className={appStyles.errorText}>{error.message}</h2>

      <p className={appStyles.paragraph}>
        Aprendes 3 nuevos Trucos de cualquier clase
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default TomeSpells;
