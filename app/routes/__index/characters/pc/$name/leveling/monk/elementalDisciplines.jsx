import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { removeItem } from '~/utils/insert';
import { Card } from '~/components/cards/card';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';
import { SkillItem } from '~/components/modal/skillItem';
import {
  ELEMENTAL_DISCIPLINES,
  getElementalDisciplines,
  getMonasticTradition,
  hasToLearnElementalDiscipline,
} from '~/domain/classes/monk/monk';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToLearnElementalDiscipline(pc)) {
    throw new Error('Ya has escogido Disciplina Elemental en tu nivel');
  }

  if (
    pc.pClass !== 'monk' ||
    getMonasticTradition(pc) !== 'wayOfTheFourElements'
  ) {
    throw new Error(
      'Solo los Monjes de la tradición monástica del Camino de los Cuatro Elementos'
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const disciplines = formData.getAll('disciplines[]');
  const forget = formData.get('forget');

  let pDisciplines = formData.get('pDisciplines');
  pDisciplines = pDisciplines ? pDisciplines.split(',') : [];
  if (forget) pDisciplines = pDisciplines.filter(invName => forget !== invName);

  await updateAttrsForClass(name, 'monk', {
    elementalDisciplines: [...pDisciplines, ...disciplines],
  });
  return redirect(`/characters/pc/${name}/summary`);
};

function ElementalDisciplines() {
  const { pc } = useLoaderData();
  const disciplines = getElementalDisciplines(pc);

  useTitle('Monje del Camino de los Cuatro Elementos nivel ' + pc.level);

  const [disciplinesToForget, setDisciplinesToForget] = useState(null);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);

  const numberOfDisciplinesToSelect = 1 + (disciplinesToForget ? 1 : 0);

  function changeSelectedDisciplines(disciplineName) {
    return e => {
      if (e.target.checked) {
        if (selectedDisciplines.length < numberOfDisciplinesToSelect)
          setSelectedDisciplines(old => [...old, disciplineName]);
      } else {
        setSelectedDisciplines(old =>
          removeItem(invName => invName === disciplineName, old)
        );
      }
    };
  }

  function changeDisciplineToForget(disciplineName) {
    return e => {
      if (e.target.checked) setDisciplinesToForget(disciplineName);
      else {
        setSelectedDisciplines([]);
        setDisciplinesToForget(null);
      }
    };
  }

  const [skillRefs, setSkillRefs] = useState({
    // Known Disciplines
    known: disciplines.map(() => useRef()),
    // Known Disciplines
    ...Object.keys(ELEMENTAL_DISCIPLINES).map(() => [useRef()]),
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
      <input readOnly type="text" name="name" value={pc.name} hidden />
      <input
        readOnly
        type="text"
        name="pDisciplines"
        value={disciplines.join(',')}
        hidden
      />

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <h2 className="app__pale-text">Disciplinas Elementales</h2>
      <p className="app__paragraph">
        Aprendes una disciplina elemental adicional de tu elección a los niveles
        6, 11 y 17.
      </p>

      {/* // Known Disciplines */}
      {!!disciplines.length && (
        <>
          <h3>{disciplines.length} disciplinas conocidas.</h3>
          <p>
            Cuando aprendas una nueva disciplina elemental, puedes reemplazar
            una disciplina elemental que ya conozcas por otra.
          </p>
          <div className="cards">
            <Card title="Disciplinas conocidas" singleCard>
              <ul className="cards__card-list">
                {disciplines.map((disciplineName, i) => (
                  <li key={disciplineName}>
                    <label
                      htmlFor={disciplineName}
                      className={`checkbox__toRemove ${
                        disciplinesToForget === disciplineName &&
                        'checkbox__selectedToRemove'
                      } ${
                        disciplines.length === 1 && 'checkbox__disabledToSelect'
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={disciplineName}
                        name="forget"
                        value={disciplineName}
                        disabled={disciplines.length === 1}
                        checked={disciplinesToForget === disciplineName}
                        onChange={changeDisciplineToForget(disciplineName)}
                      />
                      <SkillItem
                        ref={skillRefs.known[i]}
                        pc={pc}
                        traitName={disciplineName}
                        trait="discipline"
                        openModal={openSkillModal('known', i)}
                        openOnRightClick
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
      {/* // Known Disciplines */}

      <p>
        <h3 className="app__pale-text">
          Escoge {numberOfDisciplinesToSelect} disciplinas
        </h3>
        <div className="cards">
          <Card title="Disciplinas" singleCard>
            <ul className="cards__card-list">
              {Object.values(ELEMENTAL_DISCIPLINES)
                .filter(discipline => !disciplines.includes(discipline.name))
                .map((discipline, i) => {
                  return (
                    <li key={discipline.name}>
                      <label
                        htmlFor={discipline.name}
                        className={`checkbox__toSelect ${
                          selectedDisciplines.includes(discipline.name) &&
                          'checkbox__selectedToSelect'
                        } ${
                          pc.level < discipline.level &&
                          'checkbox__disabledToSelect'
                        }`}
                      >
                        <input
                          hidden
                          type="checkbox"
                          id={discipline.name}
                          name="disciplines[]"
                          value={discipline.name}
                          disabled={pc.level < discipline.level}
                          checked={selectedDisciplines.includes(
                            discipline.name
                          )}
                          onChange={changeSelectedDisciplines(discipline.name)}
                        />
                        <SkillItem
                          ref={skillRefs[i][0]}
                          traitName={discipline.name}
                          trait="discipline"
                          openModal={openSkillModal(i, 0)}
                          openOnRightClick
                        />{' '}
                        {discipline.level > 1 && `(nivel ${discipline.level})`}
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
          Escoger disciplina
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
        Aprendes una disciplina elemental adicional de tu elección a los niveles
        6, 11 y 17.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default ElementalDisciplines;
