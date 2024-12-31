import { createRef, useRef, useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateFeatAttr } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { removeItem } from '~/utils/array';
import { Card } from '~/components/cards/card';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';
import { SkillItem } from '~/components/modal/skillItem';
import {
  COMBAT_SUPERIORITY_MANEUVERS,
  getCombatSuperiorityManeuvers,
} from '~/domain/classes/fighter/fighter';
import { FEATS } from '~/domain/feats/featExplanations';
import { t } from '~/domain/translations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  return { pc };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const maneuvers = formData.getAll('maneuvers[]');

  await updateFeatAttr(id, 'martialAdept', maneuvers);
  return redirect(`/characters/pc/${id}/summary`);
};

const MAX_MANEUVERS = 2;

function CombatSuperiorityManeuvers() {
  const { pc } = useLoaderData();
  useTitle(t(FEATS.martialAdept.name));

  const maneuvers = getCombatSuperiorityManeuvers(pc);

  const [selectedManeuvers, setSelectedManeuvers] = useState([]);

  function changeSelectedManeuvers(maneuverName) {
    return e => {
      if (e.target.checked) {
        if (selectedManeuvers.length < MAX_MANEUVERS)
          setSelectedManeuvers(old => [...old, maneuverName]);
      } else {
        setSelectedManeuvers(old =>
          removeItem(invName => invName === maneuverName, old)
        );
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

      <h2 className="app__pale-text">{t(FEATS.martialAdept.name)}</h2>

      <div className="app__paragraph">
        {FEATS.martialAdept.description(null, pc, 'dontShowChooseTrait')}
      </div>

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
                    <SkillItem
                      ref={skillRefs.known.current[i]}
                      pc={pc}
                      traitName={maneuverName}
                      trait="maneuver"
                      openModal={openSkillModal(
                        'known',
                        i,
                        {},
                        'dontTriggerSeeTrait'
                      )}
                      openOnRightClick
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
      {/* // Known Maneuvers */}

      <p>
        <h3 className="app__pale-text">Escoge {MAX_MANEUVERS} maniobras</h3>
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
                        openModal={openSkillModal(
                          i,
                          0,
                          {},
                          'dontTriggerSeeTrait'
                        )}
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

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default CombatSuperiorityManeuvers;
