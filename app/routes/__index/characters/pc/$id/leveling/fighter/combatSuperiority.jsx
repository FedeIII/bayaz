import { createRef, useRef, useState } from 'react';
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
  COMBAT_SUPERIORITY_MANEUVERS,
  getCombatSuperiorityManeuvers,
  getMaxCombatSuperiorityManeuvers,
  hasToLearnCombatSuperiorityManeuvers,
  isBattleMaster,
} from '~/domain/classes/fighter/fighter';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToLearnCombatSuperiorityManeuvers(pc)) {
    throw new Error('Ya has escogido Maniobras en tu nivel');
  }

  if (pc.pClass !== 'fighter' || !isBattleMaster(pc)) {
    throw new Error('Solo los Maestros de Batalla puedes escoger Maniobras');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const maneuvers = formData.getAll('maneuvers[]');
  const forget = formData.get('forget');

  let pManeuvers = formData.get('pManeuvers');
  pManeuvers = pManeuvers ? pManeuvers.split(',') : [];
  if (forget) pManeuvers = pManeuvers.filter(invName => forget !== invName);

  await updateAttrsForClass(id, 'fighter', {
    combatSuperiority: [...pManeuvers, ...maneuvers],
  });
  return redirect(`/characters/pc/${id}/summary`);
};

function CombatSuperiorityManeuvers() {
  const { pc } = useLoaderData();
  const maneuvers = getCombatSuperiorityManeuvers(pc);
  const maxManeuvers = getMaxCombatSuperiorityManeuvers(pc);

  useTitle('Maestro de Batalla nivel ' + pc.level);

  const [maneuverToForget, setManeuverToForget] = useState(null);
  const [selectedManeuvers, setSelectedManeuvers] = useState([]);

  const numberOfManeuversToSelect =
    maxManeuvers - (maneuvers.length - (maneuverToForget ? 1 : 0));

  function changeSelectedManeuvers(maneuverName) {
    return e => {
      if (e.target.checked) {
        if (selectedManeuvers.length < numberOfManeuversToSelect)
          setSelectedManeuvers(old => [...old, maneuverName]);
      } else {
        setSelectedManeuvers(old =>
          removeItem(invName => invName === maneuverName, old)
        );
      }
    };
  }

  function changeManeuverToForget(maneuverName) {
    return e => {
      if (e.target.checked) setManeuverToForget(maneuverName);
      else {
        setSelectedManeuvers([]);
        setManeuverToForget(null);
      }
    };
  }

  const [skillRefs, setSkillRefs] = useState({
    // Known Maneuvers
    known: useRef(maneuvers.map(createRef)),
    // Known Maneuvers
    ...COMBAT_SUPERIORITY_MANEUVERS.map(() => useRef([createRef()])),
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
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input
        readOnly
        type="text"
        name="pManeuvers"
        value={maneuvers.join(',')}
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

      <h2 className="app__pale-text">Maniobras de Superioridad de Combate</h2>
      <p className="app__paragraph">
        Aprendes tres maniobras de tu elección, las cuales están detalladas más
        abajo. Muchas maniobras mejoran un ataque de alguna manera. Solo puedes
        usar una maniobra por ataque.
      </p>

      {/* // Known Maneuvers */}
      {!!maneuvers.length && (
        <>
          <h3>{maneuvers.length} maniobras conocidas</h3>
          <p>
            Cada vez que aprendes una nueva maniobra, puedes reemplazar otra
            maniobra ya conocida por otra.
          </p>
          <div className="cards">
            <Card title="Maniobras conocidas" singleCard>
              <ul className="cards__card-list">
                {maneuvers.map((maneuverName, i) => (
                  <li key={maneuverName}>
                    <label
                      htmlFor={maneuverName}
                      className={`checkbox__toRemove ${
                        maneuverToForget === maneuverName &&
                        'checkbox__selectedToRemove'
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={maneuverName}
                        name="forget"
                        value={maneuverName}
                        checked={maneuverToForget === maneuverName}
                        onChange={changeManeuverToForget(maneuverName)}
                      />
                      <SkillItem
                        ref={skillRefs.known.current[i]}
                        pc={pc}
                        traitName={maneuverName}
                        trait="maneuver"
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
      {/* // Known Maneuvers */}

      <p>
        <h3 className="app__pale-text">
          Escoge {numberOfManeuversToSelect} maniobras
        </h3>
        <div className="cards">
          <Card title="Maniobras" singleCard>
            <ul className="cards__card-list">
              {COMBAT_SUPERIORITY_MANEUVERS.filter(
                maneuverName => !maneuvers.includes(maneuverName)
              ).map((maneuverName, i) => {
                return (
                  <li key={maneuverName}>
                    <label
                      htmlFor={maneuverName}
                      className={`checkbox__toSelect ${
                        selectedManeuvers.includes(maneuverName) &&
                        'checkbox__selectedToSelect'
                      }`}
                    >
                      <input
                        hidden
                        type="checkbox"
                        id={maneuverName}
                        name="maneuvers[]"
                        value={maneuverName}
                        checked={selectedManeuvers.includes(maneuverName)}
                        onChange={changeSelectedManeuvers(maneuverName)}
                      />
                      <SkillItem
                        ref={skillRefs[i].current[0]}
                        pc={pc}
                        traitName={maneuverName}
                        trait="maneuver"
                        openModal={openSkillModal(i, 0)}
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
        <button type="submit" className="cards__button-card">
          Escoger Maniobra
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Si una invocación sobrenatural tiene prerrequisitos, debes cumplirlos
        para aprenderla. Puedes aprender la invocación en el mismo momento en
        que cumples sus prerrequisitos.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default CombatSuperiorityManeuvers;
