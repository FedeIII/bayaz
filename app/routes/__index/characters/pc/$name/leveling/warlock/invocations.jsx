import { useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { removeItem } from '~/utils/insert';
import { Card } from '~/components/cards/card';
import {
  INVOCATIONS,
  getInvocations,
  getWarlockMaxInvocations,
  hasToSelectInvocations,
  isInvocationAvailable,
} from '~/domain/classes/warlock/warlock';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';
import { SkillItem } from '~/components/modal/skillItem';

import styles from '~/components/checkbox.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToSelectInvocations(pc)) {
    throw new Error('Ya has escogido invocaciones en tu nivel');
  }

  if (pc.pClass !== 'warlock') {
    throw new Error('Solo los brujos puedes escoger invocaciones');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const invocations = formData.getAll('invocations[]');
  let pInvocations = formData.get('pInvocations');
  pInvocations = pInvocations ? pInvocations.split(',') : [];
  await updateAttrsForClass(name, 'warlock', {
    invocations: [...pInvocations, ...invocations],
  });
  return redirect(`/characters/pc/${name}/summary`);
};

function EldritchInvocations() {
  const { pc } = useLoaderData();
  const invocations = getInvocations(pc);
  const maxInvocations = getWarlockMaxInvocations(pc);

  useTitle('Brujo nivel ' + pc.level);

  const [selectedInvocations, setSelectedInvocations] = useState(invocations);

  function changeSelectedInvocations(invocationName) {
    return e => {
      if (e.target.checked) {
        if (selectedInvocations.length < maxInvocations)
          setSelectedInvocations(old => [...old, invocationName]);
      } else {
        setSelectedInvocations(old =>
          removeItem(invName => invName === invocationName, old)
        );
      }
    };
  }

  const [skillRefs, setSkillRefs] = useState(
    Object.keys(INVOCATIONS).reduce(
      (refs, invName) => ({ ...refs, [invName]: [useRef()] }),
      {}
    )
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
      <input readOnly type="text" name="name" value={pc.name} hidden />
      <input
        readOnly
        type="text"
        name="pInvocations"
        value={invocations.join(',')}
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

      <h2 className={appStyles.paleText}>Invocaciones Sobrenaturales</h2>
      <p className={appStyles.paragraph}>
        Si una invocación sobrenatural tiene prerrequisitos, debes cumplirlos
        para aprenderla. Puedes aprender la invocación en el mismo momento en
        que cumples sus prerrequisitos.
      </p>
      <p>
        <h3 className={appStyles.paleText}>
          Escoge {maxInvocations} invocaciones
        </h3>
        <div className={`${cardStyles.cards}`}>
          <Card title={`Invocaciones nivel ${pc.level}`} singleCard>
            <ul className={cardStyles.cardList}>
              {Object.keys(INVOCATIONS)
                .filter(invocationName =>
                  isInvocationAvailable(pc, invocationName)
                )
                .map(invocationName => {
                  return (
                    <li key={invocationName}>
                      <label
                        htmlFor={invocationName}
                        className={`${styles.toSelect} ${
                          selectedInvocations.includes(invocationName) &&
                          styles.selectedToSelect
                        }`}
                      >
                        <input
                          hidden
                          type="checkbox"
                          id={invocationName}
                          name="invocations[]"
                          value={invocationName}
                          checked={selectedInvocations.includes(invocationName)}
                          onChange={changeSelectedInvocations(invocationName)}
                        />
                        <SkillItem
                          ref={skillRefs[invocationName][0]}
                          traitName={invocationName}
                          trait="invocation"
                          openModal={openSkillModal(invocationName)}
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
        Si una invocación sobrenatural tiene prerrequisitos, debes cumplirlos
        para aprenderla. Puedes aprender la invocación en el mismo momento en
        que cumples sus prerrequisitos.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default EldritchInvocations;
