import { createRef, useRef, useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc, updateFeatCantrip } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { FEATS } from '~/domain/feats/featExplanations';
import { t } from '~/domain/translations';
import { getAllPcCantrips } from '~/domain/spells/getSpells';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';
import { SkillItem } from '~/components/modal/skillItem';
import { Card } from '~/components/cards/card';
import { ALL_CANTRIPS } from '~/domain/spells/spellList';

const noOp = () => {};

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC no encontrado');
  }

  return { pc };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const selectedCantrip = formData.get('selectedCantrip');

  await updateFeatCantrip(id, 'spellSniper', selectedCantrip);

  return redirect(`/characters/pc/${id}/summary`);
};

function TavernBrawlerSelection() {
  const { pc } = useLoaderData();

  useTitle(t(FEATS.tavernBrawler.name));

  const [selectedCantrip, setSelectedCantrip] = useState('');

  const availableCantrips = ALL_CANTRIPS.filter(
    spell =>
      spell.class.some(c => FEATS.spellSniper.bonus.cantrip.includes(c)) &&
      !getAllPcCantrips(pc)
        .map(s => s.name)
        .includes(spell.name)
  );

  const [skillRefs, setSkillRefs] = useState({
    cantrips: useRef(availableCantrips.map(createRef)),
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

      <h2 className="app__pale-text">{t(FEATS.spellSniper.name)}</h2>

      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      <div className="app__paragraph">
        {FEATS.spellSniper.description(null, pc, noOp, 'dontShowChooseTrait')}
      </div>

      <div className="cards">
        <Card title="Trucos" singleCard>
          <ul className="cards__card-list">
            {availableCantrips.map((spell, cantripIndex) => (
              <li key={spell.name}>
                <label
                  htmlFor={spell.name}
                  className={`checkbox__toSelect ${
                    selectedCantrip === spell.name &&
                    'checkbox__selectedToSelect'
                  }`}
                >
                  <input
                    hidden
                    type="checkbox"
                    id={spell.name}
                    name="selectedCantrip"
                    value={spell.name}
                    checked={selectedCantrip === spell.name}
                    onChange={e => setSelectedCantrip(e.target.value)}
                  />
                  <SkillItem
                    ref={skillRefs.cantrips.current[cantripIndex]}
                    pc={pc}
                    traitName={spell.name}
                    trait="spell"
                    openModal={openSkillModal(
                      'cantrips',
                      cantripIndex,
                      {},
                      'dontTriggerSeeTrait'
                    )}
                    openOnRightClick
                  >
                    <span className="tooltip">
                      {t(spell.name)}
                      <span className="tooltiptext">{t(spell.school)}</span>
                    </span>
                  </SkillItem>
                </label>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <p>
        <button
          type="submit"
          className="cards__button-card"
          disabled={!selectedCantrip}
        >
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
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        A veces, ocurren errores al intentar seleccionar una opción. Por favor,
        intenta nuevamente.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default TavernBrawlerSelection;
