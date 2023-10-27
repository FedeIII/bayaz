import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc, learnWizardExtraSpell } from '~/services/pc.server';
import { translateClass } from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';
import { getClassSpells, maxSpellLevel } from '~/domain/spells/spells';
import { Card } from '~/components/cards/card';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { getInvocationsSpells } from '~/domain/classes/warlock/warlock';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');

  const [learn] = formData.getAll('learn[]');

  await learnWizardExtraSpell(name, learn);

  return redirect(`/characters/pc/${name}/spells`);
};

function ExtraSpells() {
  const { pc } = useLoaderData();
  const { name, pClass, level } = pc;

  useTitle(`${translateClass(pClass)} nivel ${level}`);

  const knownSpells = getAllPcSpells(pc).filter(
    spell =>
      !getInvocationsSpells(pc)
        .map(s => s.name)
        .includes(spell.name)
  );

  const newSpellsMaxLevel = maxSpellLevel(pc);
  const newSpellLevels = Array.from(Array(newSpellsMaxLevel), (_, i) => i + 1);
  const spellsByLevel = newSpellLevels.map(spellLevel =>
    getClassSpells(pc).filter(spell => spell.level === spellLevel)
  );

  const [toLearn, setToLearn] = useState(null);

  function setSpellToLearn(spellName, checked) {
    if (checked) {
      setToLearn(spellName);
    } else {
      setToLearn(null);
    }
  }

  const [skillRefs, setSkillRefs] = useState({
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
      <input readOnly type="text" name="name" value={name} hidden />
      <input readOnly type="text" name="level" value={level} hidden />

      <h2 className={appStyles.paleText}>Copia un conjuro a tu libro</h2>

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <div className={`${cardStyles.cards} ${cardStyles.scrollList}`}>
        {spellsByLevel.map((spellsOfLevel, i) => {
          const spellLevel = i + 1;
          return (
            <Card
              title={`Conjuros nivel ${spellLevel}`}
              className={cardStyles.scrollCard}
              singleCard={spellsByLevel.length === 1}
              key={spellLevel}
            >
              <ul className={cardStyles.cardList}>
                {spellsOfLevel
                  .filter(
                    spell => !knownSpells.map(s => s.name).includes(spell.name)
                  )
                  .map((spell, spellIndex) => (
                    <li key={spell.name}>
                      <label
                        htmlFor={spell.name}
                        className={`${styles.toSelect} ${
                          toLearn === spell.name && styles.selectedToSelect
                        }`}
                      >
                        <input
                          hidden
                          type="checkbox"
                          id={spell.name}
                          name="learn[]"
                          value={spell.name}
                          checked={toLearn === spell.name}
                          onChange={e =>
                            setSpellToLearn(spell.name, e.target.checked)
                          }
                        />
                        <SkillItem
                          ref={skillRefs[i][spellIndex]}
                          traitName={spell.name}
                          trait="spell"
                          openModal={openSkillModal(i, spellIndex)}
                          openOnRightClick
                        />
                      </label>
                    </li>
                  ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
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
      <h2 className={appStyles.errorText}>{error.message}</h2>

      <p className={appStyles.paragraph}>
        Cuando encuentras un conjuro de mago de nivel 1 o superior, puedes
        añadirlo a tu libro de conjuros si es de un nivel para el cual tienes
        espacios de conjuros y si puedes conseguir tiempo suficiente para
        descifrarlo y copiarlo. Copiar un conjuro a un libro implica reproducir
        la forma básica del conjuro y después descifrar el sistema único de
        anotación que usó el mago para escribirlo. Debes practicar el conjuro
        hasta que entiendas los sonidos o gestos requeridos, después
        transcribirlo a tu libro de conjuros usando tu propia anotación. Por
        cada nivel del conjuro, el proceso dura 2 horas y requiere 50 po. El
        coste representa los componentes materiales que gastas en experimentar
        con el conjuro para dominarlo, así como las delicadas tintas que
        necesitas para registrarlo. Una vez que has gastado este tiempo y
        dinero, puedes prepararlo.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default ExtraSpells;
