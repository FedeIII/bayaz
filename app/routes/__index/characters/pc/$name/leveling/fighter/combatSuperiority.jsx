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
  COMBAT_SUPERIORITY_MANEUVERS,
  getCombatSuperiorityManeuvers,
  getMaxCombatSuperiorityManeuvers,
  hasToLearnCombatSuperiorityManeuvers,
  isBattleMaster,
} from '~/domain/classes/fighter/fighter';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
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
  const name = formData.get('name');
  const maneuvers = formData.getAll('maneuvers[]');
  const forget = formData.get('forget');

  let pManeuvers = formData.get('pManeuvers');
  pManeuvers = pManeuvers ? pManeuvers.split(',') : [];
  if (forget) pManeuvers = pManeuvers.filter(invName => forget !== invName);

  await updateAttrsForClass(name, 'fighter', {
    combatSuperiority: [...pManeuvers, ...maneuvers],
  });
  return redirect(`/characters/pc/${name}/summary`);
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
    known: maneuvers.map(() => useRef()),
    // Known Maneuvers
    ...COMBAT_SUPERIORITY_MANEUVERS.map(() => [useRef()]),
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

      <h2 className={appStyles.paleText}>
        Maniobras de Superioridad de Combate
      </h2>
      <p className={appStyles.paragraph}>
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
          <div className={`${cardStyles.cards}`}>
            <Card title="Maniobras conocidas" singleCard>
              <ul className={cardStyles.cardList}>
                {maneuvers.map((maneuverName, i) => (
                  <li key={maneuverName}>
                    <label
                      htmlFor={maneuverName}
                      className={`${styles.toRemove} ${
                        maneuverToForget === maneuverName &&
                        styles.selectedToRemove
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
                        ref={skillRefs.known[i]}
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
        <h3 className={appStyles.paleText}>
          Escoge {numberOfManeuversToSelect} maniobras
        </h3>
        <div className={`${cardStyles.cards}`}>
          <Card title="Maniobras" singleCard>
            <ul className={cardStyles.cardList}>
              {COMBAT_SUPERIORITY_MANEUVERS.filter(
                maneuverName => !maneuvers.includes(maneuverName)
              ).map((maneuverName, i) => {
                return (
                  <li key={maneuverName}>
                    <label
                      htmlFor={maneuverName}
                      className={`${styles.toSelect} ${
                        selectedManeuvers.includes(maneuverName) &&
                        styles.selectedToSelect
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
                        ref={skillRefs[i][0]}
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
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Maniobra
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
        Si una invocación sobrenatural tiene prerrequisitos, debes cumplirlos
        para aprenderla. Puedes aprender la invocación en el mismo momento en
        que cumples sus prerrequisitos.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default CombatSuperiorityManeuvers;
