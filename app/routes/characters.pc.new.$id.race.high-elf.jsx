import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { createRef, useRef, useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import { LANGUAGES, RACES, translateLanguage } from '~/domain/characters';
import { WIZARD_SPELLS } from '~/domain/spells/wizard';
import { getSpell } from '~/domain/spells/getSpells';
import { t } from '~/domain/translations';
import { SkillItem } from '~/components/modal/skillItem';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const cantrip = formData.get('cantrip');
  const language = formData.get('language');

  await updatePc({
    id,
    spells: [getSpell(cantrip)],
    languages: [...RACES.elf.high.languages, language],
  });

  return redirect(`../${id}/class`);
};

function PcElfSkills() {
  const { pc } = useLoaderData();
  const { id, name } = pc;

  const navigation = useNavigation();
  const isCreating = navigation.state === 'submitting';

  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [isCantripSelected, setIsCantripSelected] = useState(false);

  const [skillRefs, setSkillRefs] = useState({
    cantrips: useRef(
      Object.values(WIZARD_SPELLS)
        .filter(s => s.level === 0)
        .map(createRef)
    ),
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
      <div className="characters__content">
        {skillModalContent && (
          <SkillModal
            elRef={selectedSkillRef}
            formRef={formRef}
            closeModal={closeSkillModal}
          >
            {skillModalContent}
          </SkillModal>
        )}

        <h2>Habilidades de Alto Elfo para {name}</h2>
        <input readOnly type="text" name="id" value={id} hidden />

        <div className="characters__trait-columns characters__trait-columns--three">
          <div className="characters__trait-label">
            <span className="characters__trait-title">
              Conoces un truco de mago (Inteligencia)
            </span>
            <div className="characters__traits">
              {Object.values(WIZARD_SPELLS)
                .filter(s => s.level === 0)
                .map((spell, cantripIndex) => (
                  <label
                    htmlFor={spell.name}
                    key={spell.name}
                    className="characters__skill-label"
                  >
                    <input
                      type="radio"
                      name="cantrip"
                      id={spell.name}
                      value={spell.name}
                      onChange={() => setIsCantripSelected(true)}
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
                ))}
            </div>
          </div>

          <div className="characters__trait-label">
            <span className="characters__trait-title">
              Selecciona un idioma extra
            </span>
            <div className="characters__traits">
              {LANGUAGES()
                .filter(l => !RACES.elf.high.languages.includes(l))
                .map(language => (
                  <label
                    htmlFor={language}
                    key={language}
                    className="characters__skill-label"
                  >
                    <input
                      type="radio"
                      name="language"
                      id={language}
                      value={language}
                      onChange={() => setIsLanguageSelected(true)}
                    />
                    {translateLanguage(language)}
                  </label>
                ))}
            </div>
          </div>
        </div>

        <p>
          <button
            type="submit"
            className="cards__button-card"
            disabled={isCreating || !isLanguageSelected || !isCantripSelected}
          >
            {isCreating
              ? 'Creando...'
              : isLanguageSelected && isCantripSelected
              ? 'Continuar'
              : 'Elige habilidades'}
          </button>
        </p>
      </div>
    </Form>
  );
}

export default PcElfSkills;
