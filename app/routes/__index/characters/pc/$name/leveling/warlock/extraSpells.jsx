import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc, learnWarlockExtraSpell } from '~/services/pc.server';
import { translateClass } from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';
import { getAllPcSpells } from '~/domain/spells/getSpells';
import { Card } from '~/components/cards/card';
import { SkillModal } from '~/components/modal/skillModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SPELL_LIST } from '~/domain/spells/spellList';

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

  await learnWarlockExtraSpell(name, learn);

  return redirect(`/characters/pc/${name}/spells`);
};

function ExtraSpells() {
  const { pc } = useLoaderData();
  const { name, pClass, level } = pc;

  useTitle(`${translateClass(pClass)} nivel ${level}`);

  const knownSpells = getAllPcSpells(pc).map(s => s.name);

  const ritualForLevel = SPELL_LIST.filter(
    s =>
      s.level <= Math.ceil(level / 2) &&
      s.ritual &&
      !knownSpells.includes(s.name)
  );

  const [toLearn, setToLearn] = useState(ritualForLevel.map(() => false));

  function setSpellToLearn(spellName, checked) {
    if (checked) {
      setToLearn(spellName);
    } else {
      setToLearn(null);
    }
  }

  const [skillRefs, setSkillRefs] = useState(
    ritualForLevel.map(() => [useRef()])
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
      <input readOnly type="text" name="level" value={level} hidden />

      <h2 className="app__pale-text">Copia un conjuro a tu libro</h2>

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
        <Card title="Rituales" singleCard>
          <ul className="cards__card-list">
            {ritualForLevel.map((spell, spellIndex) => (
              <li key={spell.name}>
                <label
                  htmlFor={spell.name}
                  className={`checkbox__toSelect ${
                    toLearn === spell.name && 'checkbox__selectedToSelect'
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

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ExtraSpells;
