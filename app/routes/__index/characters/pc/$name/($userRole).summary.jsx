import { json } from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useSubmit,
  useTransition,
} from '@remix-run/react';
import { createRef, useEffect, useRef, useState } from 'react';

import {
  getPc,
  equipWeapons,
  updatePc,
  reorderWeapons,
  switchArmor,
  createNotes,
  updateNotes,
  deleteNote,
  updateNotePosition,
  unequipWeapon,
  unequipArmor,
} from '~/services/pc.server';
import {
  CLASSES,
  getTraits,
  hasLeveledUp,
  getChannelDivinityTraits,
} from '~/domain/characters';
import {
  getSorcererOrigin,
  translateSorcererOrigin,
  getSorcererOriginTraits,
} from '~/domain/classes/sorcerer/sorcerer';
import {
  translateDivineDomain,
  getDivineDomain,
  getClericDomainTraits,
  hasChannelDivinity,
} from '~/domain/classes/cleric/cleric';
import {
  getPrimalPath,
  getPrimalPathTraits,
  translatePrimalPath,
} from '~/domain/classes/barbarian/barbarian';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import { useInventoryItems } from '~/components/modal/useInventoryItems';
import { ItemModal } from '~/components/modal/itemModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SkillModal } from '~/components/modal/skillModal';
import { useTitle } from '~/components/hooks/useTitle';
import {
  getDeltaSpells,
  hasLearnedSpellsForCurrentLevel,
} from '~/domain/spells/spells';
import {
  getBardCollege,
  getBardCollegeTraits,
  translateBardCollege,
} from '~/domain/classes/bard/bard';
import {
  getInvocations,
  getWarlockPatron,
  getWarlockPatronTraits,
  translatePatron,
} from '~/domain/classes/warlock/warlock';
import {
  getDruidCircle,
  getDruidCircleTraits,
  translateDruidCircle,
} from '~/domain/classes/druid/druid';
import {
  getRangerConclave,
  getRangerConclaveTraits,
  translateRangerConclave,
} from '~/domain/classes/ranger/ranger';
import {
  getMartialArchetype,
  getMartialArchetypeTraits,
  translateMartialArchetype,
} from '~/domain/classes/fighter/fighter';
import {
  getArcaneTradition,
  getArcaneTraditionTraits,
  translateArcaneTradition,
} from '~/domain/classes/wizard/wizard';
import {
  getMonasticTradition,
  getMonasticTraditionTraits,
  translateMonasticTradition,
} from '~/domain/classes/monk/monk';
import {
  getSacredOath,
  getSacredOathTraits,
  translateSacredOath,
} from '~/domain/classes/paladin/paladin';
import {
  getRoguishArchetype,
  getRoguishArchetypeTraits,
  translateRoguishArchetype,
} from '~/domain/classes/rogue/rogue';
import { longRest, spendHitDie } from '~/domain/characterMutations';
import Note from '~/components/note/note';
import BasicAttrs from '~/components/summary/basicAttrs';
import CombatAttrs from '~/components/summary/combatAttrs';
import SheetStats from '~/components/summary/sheetStats';
import SheetSkills from '~/components/summary/sheetSkills';
import SheetAttacks from '~/components/summary/sheetAttacks';
import SheetEquipment from '~/components/summary/sheetEquipment';
import ProficienciesAndLanguages from '~/components/summary/proficienciesAndLanguages';

import styles from '~/components/sheet.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc, isForPlayers: params.userRole === 'players' });
};

async function equipWeaponsAction(formData) {
  const oldWeaponName = formData.get('oldWeaponName');
  const newWeaponName = formData.get('newWeaponName');
  const name = formData.get('name');

  return await equipWeapons(name, oldWeaponName, newWeaponName);
}

async function unequipWeaponAction(formData) {
  const name = formData.get('name');
  const weaponName = formData.get('weaponName');

  return await unequipWeapon(name, weaponName);
}

async function reorderWeaponsAction(formData) {
  const name = formData.get('name');
  const weaponName = formData.get('weaponName');
  const weaponSlot = formData.get('weaponSlot');

  return await reorderWeapons(name, weaponName, weaponSlot);
}

async function switchArmorAction(formData) {
  const name = formData.get('name');
  const newArmorName = formData.get('newArmorName');

  return await switchArmor(name, newArmorName);
}

async function unequipArmorAction(formData) {
  const name = formData.get('name');
  const armorName = formData.get('armorName');

  return await unequipArmor(name, armorName);
}

async function spendHitDieAction(formData) {
  const name = formData.get('name');
  const diceAmount = formData.get('diceAmount');

  return await spendHitDie(name, parseInt(diceAmount, 10));
}

async function spendRealHitDieAction(formData) {
  const name = formData.get('name');
  const die = formData.get('die');
  const diceAmount = formData.get('diceAmount');

  return await spendHitDie(name, parseInt(diceAmount, 10), parseInt(die, 10));
}

async function longRestAction(formData) {
  const name = formData.get('name');

  return await longRest(name);
}

async function createNotesAction(formData) {
  const name = formData.get('name');
  const position = formData.get('position');

  return await createNotes(name, position.split(','));
}

async function deleteNoteAction(formData) {
  const name = formData.get('name');
  const id = formData.get('id');

  return await deleteNote(name, id);
}

async function updateNotePositionAction(formData) {
  const name = formData.get('name');
  const id = formData.get('noteId');
  const position = formData.get('position');

  return await updateNotePosition(name, id, position.split(','));
}

async function updateNoteTextAction(formData) {
  const name = formData.get('name');
  const id = formData.get('noteId');
  const text = formData.get('text');

  return await updateNotes(name, id, text);
}

async function updateFreeTexts(formData) {
  const name = formData.get('name');
  const playerName = formData.get('playerName');
  const personality = formData.get('personality');
  const ideals = formData.get('ideals');
  const bonds = formData.get('bonds');
  const flaws = formData.get('flaws');
  const temporaryHitPoints = formData.get('temporaryHitPoints');

  return await updatePc({
    name,
    temporaryHitPoints,
    freeText: { playerName, personality, ideals, bonds, flaws },
  });
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const action = formData.get('action');

  let pc = null;
  if (action === 'equipWeapons') {
    pc = await equipWeaponsAction(formData);
  } else if (action === 'unequipWeapon') {
    pc = await unequipWeaponAction(formData);
  } else if (action === 'reorderWeapons') {
    pc = await reorderWeaponsAction(formData);
  } else if (action === 'equipArmor') {
    pc = await switchArmorAction(formData);
  } else if (action === 'unequipArmor') {
    pc = await unequipArmorAction(formData);
  } else if (action === 'spendHitDie') {
    pc = await spendHitDieAction(formData);
  } else if (action === 'spendRealHitDie') {
    pc = await spendRealHitDieAction(formData);
  } else if (action === 'longRest') {
    pc = await longRestAction(formData);
  } else if (action === 'createNotes') {
    pc = await createNotesAction(formData);
  } else if (action === 'deleteNote') {
    pc = await deleteNoteAction(formData);
  } else if (action === 'updateNotePosition') {
    pc = await updateNotePositionAction(formData);
  } else if (action === 'updateNoteText') {
    pc = await updateNoteTextAction(formData);
  } else {
    pc = await updateFreeTexts(formData);
  }

  return json({ pc });
};

function PcSummary() {
  const { pc, isForPlayers } = useLoaderData();
  const {
    name,
    items: { equipment },
    freeText: { personality, ideals, bonds, flaws } = {},
    notes,
  } = pc;

  const [pcName, setPcName] = useState(name);
  useEffect(() => {
    setPcName(name);
  }, [name]);

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  useTitle(pcName);

  const [isSubmitShown, setIsSubmitShown] = useState(false);

  function onFreeTextChange() {
    setIsSubmitShown(true);
  }

  function onFormSubmit(e) {
    setIsSubmitShown(false);
  }

  const [selectedNote, setSelectedNote] = useState(null);

  function onNoteChange(noteId, text) {
    submit(
      {
        action: 'updateNoteText',
        name: pcName,
        noteId,
        text,
      },
      { method: 'post' }
    );
  }

  function onNoteDelete(noteId) {
    submit(
      {
        action: 'deleteNote',
        name: pcName,
        id: noteId,
      },
      { method: 'post' }
    );
  }

  function onPickNote(noteId) {
    setSelectedNote(noteId);
  }

  function onDropNote(e) {
    if (selectedNote) {
      e.preventDefault();
      const formPos = formRef?.current?.getBoundingClientRect();
      const formLeftX = formPos?.x || 0;
      const formTopY = formPos?.y || 0;
      submit(
        {
          action: 'updateNotePosition',
          name: pcName,
          noteId: selectedNote,
          position: [e.clientX - formLeftX, e.clientY - formTopY],
        },
        { method: 'post' }
      );
      setSelectedNote(null);
    }
  }

  useAddMenuItems('/characters', [
    { name: pcName, url: `/characters/pc/${pcName}/summary`, level: 1 },
    {
      name: 'Inventario',
      url: `/characters/pc/${pcName}/bio`,
      level: 2,
    },
    {
      name: 'Conjuros',
      url: `/characters/pc/${pcName}/spells`,
      level: 2,
    },
  ]);

  const submit = useSubmit();

  const [actionModalContent, setActionModalContent] = useState(null);

  const [itemRefs, setItemRefs] = useState({
    weapons: useRef([createRef(), createRef(), createRef()]),
    armor: useRef([createRef()]),
    shield: useRef([createRef()]),
    ammunition: useRef(equipment.ammunition.map(createRef)),
    others: useRef(equipment.others.map(createRef)),
  });

  const [
    itemModalContent,
    closeItemModal,
    openItemModal,
    selectedItemRef,
    setSelectedItemRef,
  ] = useInventoryItems(pc, itemRefs, actionModalContent);

  const traits = getTraits(pc);
  const primalPathTraits = getPrimalPathTraits(pc);
  const invocations = getInvocations(pc);
  const patronTraits = getWarlockPatronTraits(pc);
  const bardCollegeTraits = getBardCollegeTraits(pc);
  const divineDomainTraits = getClericDomainTraits(pc);
  const channelDivinityTraits = getChannelDivinityTraits(pc);
  const druidCircleTraits = getDruidCircleTraits(pc);
  const rangerConclaveTraits = getRangerConclaveTraits(pc);
  const martialArchetypeTraits = getMartialArchetypeTraits(pc);
  const sorcererOriginTraits = getSorcererOriginTraits(pc);
  const arcaneTradicionTraits = getArcaneTraditionTraits(pc);
  const monasticTraditionTraits = getMonasticTraditionTraits(pc);
  const sacredOathTraits = getSacredOathTraits(pc);
  const roguishArchetypeTraits = getRoguishArchetypeTraits(pc);

  const [skillRefs, setSkillRefs] = useState({
    levelUp: [useRef()],
    spells: [useRef()],
    traits: traits.map(() => useRef()),
    primalPath: primalPathTraits.map(() => useRef()),
    bardCollege: bardCollegeTraits.map(() => useRef()),
    invocations: invocations.map(() => useRef()),
    patron: patronTraits.map(() => useRef()),
    divineDomain: divineDomainTraits.map(() => useRef()),
    channelDivinity: (() => {
      const refs = channelDivinityTraits.map(() => useRef());
      refs.main = useRef();
      return refs;
    })(),
    druidCircle: druidCircleTraits.map(() => useRef()),
    martialArchetype: martialArchetypeTraits.map(() => useRef()),
    sorcererOrigin: sorcererOriginTraits.map(() => useRef()),
    arcaneTradition: arcaneTradicionTraits.map(() => useRef()),
    monasticTradition: monasticTraditionTraits.map(() => useRef()),
    sacredOath: sacredOathTraits.map(() => useRef()),
    roguishArchetype: roguishArchetypeTraits.map(() => useRef()),
    ac: [useRef()],
    hp: [useRef()],
    remainingHitDice: [useRef()],
    attackBonus: [useRef(), useRef(), useRef()],
    movingModal: [useRef()],
  });

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
    skillBigModalContent,
  ] = useSkillItems(pc, skillRefs, submit);

  const formRef = useRef(null);

  const [mousePos, setMousePos] = useState([null, null]);

  function onNotesClick(e) {
    setMousePos([null, null]);
  }

  function onNotesRightClick(e) {
    e.preventDefault();
    const formPos = formRef?.current?.getBoundingClientRect();
    const formLeftX = formPos?.x || 0;
    const formTopY = formPos?.y || 0;
    setMousePos([e.clientX - formLeftX, e.clientY - formTopY]);
  }

  return (
    <>
      <img src="/images/sheet1.jpg" className={styles.sheetBackground} />
      <div
        className={styles.sheetNotes}
        onClick={onNotesClick}
        onContextMenu={onNotesRightClick}
        onMouseUp={onDropNote}
        style={{
          zIndex: selectedNote ? 2 : 1,
        }}
      />
      <SkillItem
        ref={skillRefs.movingModal[0]}
        traitName="notes"
        trait="Notas"
        pc={pc}
        openModal={openSkillModal('movingModal', 0)}
        position={mousePos[0] ? mousePos : []}
      />
      <Form
        method="post"
        className={styles.summary}
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <input readOnly type="text" name="name" value={pcName} hidden />

        {/* MODALS */}
        {actionModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={() => setActionModalContent(null)}
            dropShadow
            isForPlayers={isForPlayers}
          >
            {actionModalContent}
          </ItemModal>
        )}

        {itemModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={closeItemModal}
            closeOnLeave
            isForPlayers={isForPlayers}
          >
            {itemModalContent}
          </ItemModal>
        )}

        {skillModalContent && (
          <SkillModal
            elRef={selectedSkillRef}
            formRef={formRef}
            closeModal={closeSkillModal}
          >
            {skillModalContent}
          </SkillModal>
        )}

        {skillBigModalContent && (
          <SkillModal
            elRef={selectedSkillRef}
            formRef={formRef}
            closeModal={closeSkillModal}
            bigModal
          >
            {skillBigModalContent}
          </SkillModal>
        )}

        {/* FREE TEXT SUBMIT */}
        {isSubmitShown && (
          <button
            type="submit"
            disabled={isCreating}
            className={`${styles.data} ${styles.submit}`}
          >
            Actualizar
          </button>
        )}

        {notes.map(note => {
          return (
            <Note
              key={note._id}
              position={note.position}
              id={note._id}
              text={note.text}
              selected={selectedNote === note._id}
              onBlur={onNoteChange}
              onDelete={onNoteDelete}
              onPick={onPickNote}
            />
          );
        })}

        {/* BASIC ATTRS */}
        <BasicAttrs
          pc={pc}
          pcName={pcName}
          onFreeTextChange={onFreeTextChange}
        />

        {/* STATS */}
        <SheetStats pc={pc} />

        {/* SKILLS */}
        <SheetSkills pc={pc} />

        {/* COMBAT ATTRS */}
        <CombatAttrs
          pc={pc}
          skillRefs={skillRefs}
          openSkillModal={openSkillModal}
          onFreeTextChange={onFreeTextChange}
          isForPlayers={isForPlayers}
        />

        {/* ATTACKS */}
        <SheetAttacks
          pc={pc}
          pcName={pcName}
          itemRefs={itemRefs}
          setSelectedItemRef={setSelectedItemRef}
          setActionModalContent={setActionModalContent}
          openItemModal={openItemModal}
          closeItemModal={closeItemModal}
          skillRefs={skillRefs}
          openSkillModal={openSkillModal}
          submit={submit}
        />

        {/* EQUIPMENT */}
        <SheetEquipment
          pc={pc}
          pcName={pcName}
          itemRefs={itemRefs}
          openItemModal={openItemModal}
          closeItemModal={closeItemModal}
          setSelectedItemRef={setSelectedItemRef}
          setActionModalContent={setActionModalContent}
          submit={submit}
        />

        {/* FREETEXT */}
        <textarea
          className={`${styles.data} ${styles.personality}`}
          name="personality"
          defaultValue={personality}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.ideals}`}
          name="ideals"
          defaultValue={ideals}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.bonds}`}
          name="bonds"
          defaultValue={bonds}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.flaws}`}
          name="flaws"
          defaultValue={flaws}
          onChange={onFreeTextChange}
        ></textarea>

        {/* FEATS & TRAITS */}
        <ul className={`${styles.data} ${styles.featsAndTraits}`}>
          {hasLeveledUp(pc) && (
            <li className={styles.traitLabel}>
              <SkillItem
                ref={skillRefs.levelUp[0]}
                traitName="levelUp"
                trait="+Puntos de Golpe"
                pc={pc}
                openModal={openSkillModal('levelUp', 0)}
              />
            </li>
          )}

          {!hasLearnedSpellsForCurrentLevel(pc) && getDeltaSpells(pc) > 0 && (
            <li className={styles.traitLabel}>
              <SkillItem
                ref={skillRefs.spells[0]}
                traitName="newSpells"
                trait="Escoge nuevos conjuros"
                pc={pc}
                openModal={openSkillModal('spells', 0)}
              />
            </li>
          )}

          {traits.map(([traitName, trait], i) => (
            <li className={styles.traitLabel} key={traitName}>
              <SkillItem
                ref={skillRefs.traits[i]}
                traitName={traitName}
                trait={trait}
                pc={pc}
                openModal={openSkillModal('traits', i)}
              />
            </li>
          ))}

          {!!getPrimalPath(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Senda del {translatePrimalPath(getPrimalPath(pc))}
              </strong>
              <ul>
                {primalPathTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.primalPath[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('primalPath', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getBardCollege(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Colegio del {translateBardCollege(getBardCollege(pc))}
              </strong>
              <ul>
                {bardCollegeTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.bardCollege[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('bardCollege', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!invocations.length && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Invocaciones Sobrenaturales{' '}
              </strong>
              <ul>
                {invocations.map((invocationName, i) => (
                  <li className={styles.traitLabel} key={invocationName}>
                    <SkillItem
                      ref={skillRefs.invocations[i]}
                      traitName={invocationName}
                      trait="invocation"
                      pc={pc}
                      openModal={openSkillModal('invocations', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getWarlockPatron(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Pacto con {translatePatron(getWarlockPatron(pc))}
              </strong>
              <ul>
                {patronTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.patron[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('patron', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getDivineDomain(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Dominio de {translateDivineDomain(getDivineDomain(pc))}
              </strong>
              <ul>
                {divineDomainTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.divineDomain[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('divineDomain', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {hasChannelDivinity(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                <SkillItem
                  ref={skillRefs.channelDivinity.main}
                  traitName="channelDivinity"
                  trait={CLASSES.cleric.leveling[2].traits.channelDivinity}
                  pc={pc}
                  openModal={openSkillModal('channelDivinity', 'main')}
                />
              </strong>
              <ul>
                {channelDivinityTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.channelDivinity[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('channelDivinity', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getDruidCircle(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateDruidCircle(getDruidCircle(pc))}
              </strong>
              <ul>
                {druidCircleTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.druidCircle[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('druidCircle', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getRangerConclave(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Arquetipo del {translateRangerConclave(getRangerConclave(pc))}
              </strong>
              <ul>
                {rangerConclaveTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.rangerConclave[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('rangerConclave', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getMartialArchetype(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateMartialArchetype(getMartialArchetype(pc))}
              </strong>
              <ul>
                {martialArchetypeTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.martialArchetype[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('martialArchetype', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getSorcererOrigin(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateSorcererOrigin(getSorcererOrigin(pc))}
              </strong>
              <ul>
                {sorcererOriginTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.sorcererOrigin[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('sorcererOrigin', i)}
                      bigModal={traitName === 'wildMagicSurge'}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getArcaneTradition(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateArcaneTradition(getArcaneTradition(pc))}
              </strong>
              <ul>
                {arcaneTradicionTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.arcaneTradition[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('arcaneTradition', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getMonasticTradition(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateMonasticTradition(getMonasticTradition(pc))}
              </strong>
              <ul>
                {monasticTraditionTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.monasticTradition[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('monasticTradition', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getSacredOath(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateSacredOath(getSacredOath(pc))}
              </strong>
              <ul>
                {sacredOathTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.sacredOath[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('sacredOath', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getRoguishArchetype(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateRoguishArchetype(getRoguishArchetype(pc))}
              </strong>
              <ul>
                {roguishArchetypeTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.roguishArchetype[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('roguishArchetype', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>

        {/* PROFICIENCIES & LANGUAGES */}
        <ProficienciesAndLanguages pc={pc} />
      </Form>
    </>
  );
}

export default PcSummary;
