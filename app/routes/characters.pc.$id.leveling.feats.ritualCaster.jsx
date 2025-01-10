import { createRef, Fragment, useRef, useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { getPc, updateFeatSpells } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { FEATS } from '~/domain/feats/featExplanations';
import { t } from '~/domain/translations';
import { getAllPcSpells } from '~/domain/spells/getSpells';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillModal } from '~/components/modal/skillModal';
import { SkillItem } from '~/components/modal/skillItem';
import { Card } from '~/components/cards/card';
import { SPELL_LIST } from '~/domain/spells/spellList';
import classNames from 'classnames';
import { unique } from '~/utils/array';
import { getStat, getStatMod } from '~/domain/characters';
import { getSpellcastingAbility } from '~/domain/spells/spells';
import { increment } from '~/domain/display';

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
  const selectedSpellsRaw = formData.getAll('selectedSpells[]');
  const selectedSpells = unique(selectedSpellsRaw);
  const selectedSpellClass = formData.get('spellClass');

  await updateFeatSpells(
    id,
    'ritualCaster',
    selectedSpells,
    selectedSpellClass
  );

  return redirect(`/characters/pc/${id}/summary`);
};

function RitualCasterSelection() {
  const { pc } = useLoaderData();

  useTitle(t(FEATS.ritualCaster.name));

  const [selectedSpells, setSelectedSpells] = useState([]);
  const [selectedSpellClass, setSelectedSpellClass] = useState(null);

  const allPcSpellNames = getAllPcSpells(pc).map(s => s.name);

  // spellsByRequirement = [
  //    requirement1:
  //   [
  //     [spell1, spell2, spell3], // spells for class1
  //     [spell4, spell5, spell6], // spells for class2
  //   ],
  //    requirement2:
  //   [
  //     [spell7, spell8, spell9], // spells for class1
  //     [spell10, spell11, spell12], // spells for class2
  //   ],
  // ]
  const spellsByRequirement = FEATS.ritualCaster.bonus.spells.map(
    spellRequirements =>
      spellRequirements.class.map(function getSpellsByClass(sClass) {
        return SPELL_LIST.filter(
          spell =>
            spell.class.includes(sClass) &&
            spell.level <= spellRequirements.maxSpellLevel(pc) &&
            spell.ritual == spellRequirements.ritual &&
            !allPcSpellNames.includes(spell.name)
        ).sort((a, b) => a.level - b.level);
      })
  );

  const [skillRefs, setSkillRefs] = useState({
    ...spellsByRequirement.reduce(
      (acc, spellsForRequirement, requirementIndex) => {
        return {
          ...acc,
          ...spellsForRequirement.reduce((classAcc, spells, classIndex) => {
            const className =
              FEATS.ritualCaster.bonus.spells[requirementIndex].class[
                classIndex
              ];
            return {
              ...classAcc,
              [`${requirementIndex}.${className}`]: spells.map(() =>
                createRef()
              ),
            };
          }, {}),
        };
      },
      {}
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

  function onSpellClick(sClass) {
    return e => {
      if (e.target.checked) {
        // on spell selection
        if (selectedSpellClass === sClass) {
          // if selected for the same class
          if (
            selectedSpells.length < FEATS.ritualCaster.bonus.spells[0].amount
          ) {
            setSelectedSpells(old => [...old, e.target.value]);
          }
        } else {
          // if selected for a different class
          setSelectedSpellClass(sClass);
          setSelectedSpells([e.target.value]);
        }
      } else {
        // on spell deselection
        if (selectedSpellClass === sClass) {
          // if deselected for the same class
          setSelectedSpells(old =>
            old.filter(spell => spell !== e.target.value)
          );
          if (selectedSpells.length === 1) {
            // if there is only one spell selected
            setSelectedSpellClass(null);
          }
        } else {
          // if selected for a different class
          setSelectedSpellClass(sClass);
          setSelectedSpells([e.target.value]);
        }
      }
    };
  }

  const pcCastingStat = getSpellcastingAbility(pc);

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">{t(FEATS.ritualCaster.name)}</h2>

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
        {FEATS.ritualCaster.description(null, pc, noOp, 'dontShowChooseTrait')}
      </div>

      <h3 className="app__pale-text">
        Tu Aptitud Mágica es {t(pcCastingStat)} (
        {increment(getStatMod(getStat(pc, pcCastingStat)))})
      </h3>

      <div className="cards">
        {spellsByRequirement.map((spells, requirementIndex) => (
          <Fragment key={requirementIndex}>
            {FEATS.ritualCaster.bonus.spells[requirementIndex].class.map(
              (sClass, classIndex) => (
                <Card
                  title={() => (
                    <>
                      {t(sClass)}{' '}
                      <span className="cards__card-title-subtext">
                        ({t(getSpellcastingAbility(pc, sClass))}:{' '}
                        {increment(
                          getStatMod(
                            getStat(pc, getSpellcastingAbility(pc, sClass))
                          )
                        )}
                        )
                      </span>
                    </>
                  )}
                  key={sClass}
                >
                  <input
                    hidden
                    type="checkbox"
                    id="spellClass"
                    name="spellClass"
                    value={sClass}
                    checked={selectedSpellClass === sClass}
                  />
                  <ul className="cards__card-list">
                    {spells[classIndex].map((spell, spellIndex) => (
                      <li key={`${sClass}.${spell.name}`}>
                        <label
                          htmlFor={`${sClass}.${spell.name}`}
                          className={classNames('checkbox__toSelect', {
                            checkbox__selectedToSelect:
                              selectedSpells.includes(spell.name) &&
                              selectedSpellClass === sClass,
                            checkbox__disabledToSelect:
                              selectedSpells.length >=
                                FEATS.ritualCaster.bonus.spells[0].amount &&
                              !(
                                selectedSpells.includes(spell.name) &&
                                selectedSpellClass === sClass
                              ),
                          })}
                        >
                          <input
                            hidden
                            type="checkbox"
                            id={`${sClass}.${spell.name}`}
                            name="selectedSpells[]"
                            value={spell.name}
                            checked={selectedSpells.includes(spell.name)}
                            onChange={onSpellClick(sClass)}
                          />
                          <SkillItem
                            ref={
                              skillRefs[`${requirementIndex}.${sClass}`][
                                spellIndex
                              ]
                            }
                            pc={pc}
                            traitName={spell.name}
                            trait="spell"
                            openModal={openSkillModal(
                              `${requirementIndex}.${sClass}`,
                              spellIndex,
                              {},
                              'dontTriggerSeeTrait'
                            )}
                            openOnRightClick
                          >
                            <span className="tooltip">
                              {t(spell.name)}{' '}
                              <span className="app__small-text app__semipale-text">
                                (nivel {spell.level})
                              </span>
                              <span className="tooltiptext">
                                {t(spell.school)}
                              </span>
                            </span>
                          </SkillItem>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            )}
          </Fragment>
        ))}
      </div>

      <p>
        <button
          type="submit"
          className="cards__button-card"
          disabled={
            selectedSpells.length != FEATS.ritualCaster.bonus.spells[0].amount
          }
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
      <h2 className="app__error-text">{error?.message || 'Error'}</h2>

      <p className="app__paragraph">
        A veces, ocurren errores al intentar seleccionar una opción. Por favor,
        intenta nuevamente.
      </p>

      <p className="app__error-stack">{error?.stack || 'Error'}</p>
    </div>
  );
}

export default RitualCasterSelection;
