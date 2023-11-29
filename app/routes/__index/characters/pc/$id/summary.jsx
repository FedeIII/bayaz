import { json, redirect } from '@remix-run/node';
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
  dropEquipmentAmmo,
  changeEquipmentAmmoAmount,
  updatePcName,
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
import { isDm } from '~/domain/user';
import { getUser } from '~/services/user.server';
import { getSessionUser } from '~/services/session.server';

import styles from '~/components/sheet.css';
import spellsStyles from '~/components/spells.css';
import noteStyles from '~/components/note/note.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: spellsStyles },
    { rel: 'stylesheet', href: noteStyles },
  ];
};

export const loader = async ({ request, params }) => {
  const pc = await getPc(params.id);

  if (!pc) {
    throw new Error('pc not found');
  }

  const owner = await getUser({ id: pc.userId });
  const user = await getSessionUser(request);

  return json({ pc, playerName: owner.name, isDm: isDm(user) });
};

async function equipWeaponsAction(formData) {
  const oldWeaponName = formData.get('oldWeaponName');
  const newWeaponName = formData.get('newWeaponName');
  const id = formData.get('id');

  return await equipWeapons(id, oldWeaponName, newWeaponName);
}

async function unequipWeaponAction(formData) {
  const id = formData.get('id');
  const weaponName = formData.get('weaponName');

  return await unequipWeapon(id, weaponName);
}

async function reorderWeaponsAction(formData) {
  const id = formData.get('id');
  const weaponName = formData.get('weaponName');
  const weaponSlot = formData.get('weaponSlot');

  return await reorderWeapons(id, weaponName, weaponSlot);
}

async function switchArmorAction(formData) {
  const id = formData.get('id');
  const newArmorName = formData.get('newArmorName');

  return await switchArmor(id, newArmorName);
}

async function unequipArmorAction(formData) {
  const id = formData.get('id');
  const armorName = formData.get('armorName');

  return await unequipArmor(id, armorName);
}

async function spendHitDieAction(formData) {
  const id = formData.get('id');
  const diceAmount = formData.get('diceAmount');

  return await spendHitDie(id, parseInt(diceAmount, 10));
}

async function spendRealHitDieAction(formData) {
  const id = formData.get('id');
  const die = formData.get('die');
  const diceAmount = formData.get('diceAmount');

  return await spendHitDie(id, parseInt(diceAmount, 10), parseInt(die, 10));
}

async function longRestAction(formData) {
  const id = formData.get('id');

  return await longRest(id);
}

async function createNotesAction(formData) {
  const id = formData.get('id');
  const position = formData.get('position');

  return await createNotes(id, position.split(','));
}

async function deleteNoteAction(formData) {
  const id = formData.get('id');
  const noteId = formData.get('noteId');

  return await deleteNote(id, noteId);
}

async function updateNotePositionAction(formData) {
  const id = formData.get('id');
  const noteId = formData.get('noteId');
  const position = formData.get('position');

  return await updateNotePosition(id, noteId, position.split(','));
}

async function updateNoteTextAction(formData) {
  const id = formData.get('id');
  const noteId = formData.get('noteId');
  const text = formData.get('text');

  return await updateNotes(id, noteId, text);
}

async function dropAmmoAction(formData) {
  const id = formData.get('id');
  const itemName = formData.get('itemName');

  await dropEquipmentAmmo(id, itemName);
}

async function changeAmmoAmountAction(formData) {
  const id = formData.get('id');
  const itemName = formData.get('itemName');
  const itemAmount = formData.get('itemAmount');

  await changeEquipmentAmmoAmount(id, itemName, itemAmount);
}

async function changeMoneyAction(formData) {
  const id = formData.get('id');
  const coin = formData.get('coin');
  const amount = formData.get('amount');

  return await updatePc({ id, [`money.${coin}`]: amount });
}

async function updateNameAction(formData) {
  const id = formData.get('id');
  const pcName = formData.get('pcName');

  await updatePcName(id, pcName);

  return redirect(`/characters/pc/${id}/summary`);
}

async function updateFreeTexts(formData) {
  const id = formData.get('id');
  const personality = formData.get('personality');
  const ideals = formData.get('ideals');
  const bonds = formData.get('bonds');
  const flaws = formData.get('flaws');
  const temporaryHitPoints = formData.get('temporaryHitPoints');

  const updatedPc = await updatePc({
    id,
    temporaryHitPoints,
    'freeText.personality': personality,
    'freeText.ideals': ideals,
    'freeText.bonds': bonds,
    'freeText.flaws': flaws,
  });

  return updatedPc;
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
  } else if (action === 'dropAmmo') {
    pc = await dropAmmoAction(formData);
  } else if (action === 'changeAmmoAmount') {
    pc = await changeAmmoAmountAction(formData);
  } else if (action === 'changeMoney') {
    pc = await changeMoneyAction(formData);
  } else if (action === 'updateName') {
    return await updateNameAction(formData);
  } else {
    pc = await updateFreeTexts(formData);
  }

  return json({ pc });
};

function PcSummary() {
  const { pc, playerName, isDm } = useLoaderData();
  const {
    id,
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

  function onNameChange(e) {
    submit(
      {
        action: 'updateName',
        id,
        pcName: e.target.value,
      },
      { method: 'post' }
    );
  }

  function onFormSubmit(e) {
    setIsSubmitShown(false);
  }

  const [selectedNote, setSelectedNote] = useState(null);

  function onNoteChange(noteId, text) {
    submit(
      {
        action: 'updateNoteText',
        id,
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
        id,
        noteId,
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
          id,
          noteId: selectedNote,
          position: [e.clientX - formLeftX, e.clientY - formTopY],
        },
        { method: 'post' }
      );
      setSelectedNote(null);
    }
  }

  useAddMenuItems('/characters', [
    { name: pcName, url: `/characters/pc/${id}/summary`, level: 1 },
    {
      name: 'Inventario',
      url: `/characters/pc/${id}/bio`,
      level: 2,
    },
    {
      name: 'Conjuros',
      url: `/characters/pc/${id}/spells`,
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

  useEffect(() => {
    if (equipment.ammunition.length)
      itemRefs.ammunition.current = equipment.ammunition.map(createRef);
    if (equipment.others.length)
      itemRefs.others.current = equipment.others.map(createRef);
  }, [equipment.ammunition, equipment.others, itemRefs]);

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
    levelUp: useRef([createRef()]),
    spells: useRef([createRef()]),
    traits: useRef(traits.map(createRef)),
    primalPath: useRef(primalPathTraits.map(createRef)),
    bardCollege: useRef(bardCollegeTraits.map(createRef)),
    invocations: useRef(invocations.map(createRef)),
    patron: useRef(patronTraits.map(createRef)),
    divineDomain: useRef(divineDomainTraits.map(createRef)),
    channelDivinity: useRef(
      (() => {
        const refs = channelDivinityTraits.map(createRef);
        refs.main = createRef();
        return refs;
      })()
    ),
    druidCircle: useRef(druidCircleTraits.map(createRef)),
    martialArchetype: useRef(martialArchetypeTraits.map(createRef)),
    sorcererOrigin: useRef(sorcererOriginTraits.map(createRef)),
    arcaneTradition: useRef(arcaneTradicionTraits.map(createRef)),
    monasticTradition: useRef(monasticTraditionTraits.map(createRef)),
    sacredOath: useRef(sacredOathTraits.map(createRef)),
    roguishArchetype: useRef(roguishArchetypeTraits.map(createRef)),
    ac: useRef([createRef()]),
    hp: useRef([createRef()]),
    remainingHitDice: useRef([createRef()]),
    attackBonus: useRef([createRef(), createRef(), createRef()]),
    movingModal: useRef([createRef()]),
  });

  /* prettier-ignore */

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
      <img src="/images/sheet1.jpg" className="sheet__background" />
      <div
        className="sheet__notes"
        onClick={onNotesClick}
        onContextMenu={onNotesRightClick}
        onMouseUp={onDropNote}
        style={{
          zIndex: selectedNote ? 2 : 1,
        }}
      />
      <SkillItem
        ref={skillRefs.movingModal.current[0]}
        traitName="notes"
        trait="Notas"
        pc={pc}
        openModal={openSkillModal('movingModal', 0)}
        position={mousePos[0] ? mousePos : []}
      />
      <Form
        method="post"
        className="sheet__summary"
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <input readOnly type="text" name="id" value={id} hidden />
        <input readOnly type="text" name="pcName" value={pcName} hidden />

        {/* MODALS */}
        {actionModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={() => setActionModalContent(null)}
            dropShadow
            isDm={isDm}
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
            isDm={isDm}
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
            className="sheet__data sheet__submit"
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
          playerName={playerName}
          onNameChange={onNameChange}
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
          isDm={isDm}
        />

        {/* ATTACKS */}
        <SheetAttacks
          pc={pc}
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
          itemRefs={itemRefs}
          openItemModal={openItemModal}
          closeItemModal={closeItemModal}
          setSelectedItemRef={setSelectedItemRef}
          setActionModalContent={setActionModalContent}
          submit={submit}
        />

        {/* FREETEXT */}
        <textarea
          className="sheet__data sheet__personality"
          name="personality"
          defaultValue={personality}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className="sheet__data sheet__ideals"
          name="ideals"
          defaultValue={ideals}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className="sheet__data sheet__bonds"
          name="bonds"
          defaultValue={bonds}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className="sheet__data sheet__flaws"
          name="flaws"
          defaultValue={flaws}
          onChange={onFreeTextChange}
        ></textarea>

        {/* FEATS & TRAITS */}
        <ul className="sheet__data sheet__feats-and-traits">
          {hasLeveledUp(pc) && (
            <li className="sheet__trait-label">
              <SkillItem
                ref={skillRefs.levelUp.current[0]}
                traitName="levelUp"
                trait="+Puntos de Golpe"
                pc={pc}
                openModal={openSkillModal('levelUp', 0)}
              />
            </li>
          )}

          {!hasLearnedSpellsForCurrentLevel(pc) && getDeltaSpells(pc) > 0 && (
            <li className="sheet__trait-label">
              <SkillItem
                ref={skillRefs.spells.current[0]}
                traitName="newSpells"
                trait="Escoge nuevos conjuros"
                pc={pc}
                openModal={openSkillModal('spells', 0)}
              />
            </li>
          )}

          {traits.map(([traitName, trait], i) => (
            <li className="sheet__trait-label" key={traitName}>
              <SkillItem
                ref={skillRefs.traits.current[i]}
                traitName={traitName}
                trait={trait}
                pc={pc}
                openModal={openSkillModal('traits', i)}
              />
            </li>
          ))}

          {!!getPrimalPath(pc) && (
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                Senda del {translatePrimalPath(getPrimalPath(pc))}
              </strong>
              <ul>
                {primalPathTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.primalPath.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                Colegio del {translateBardCollege(getBardCollege(pc))}
              </strong>
              <ul>
                {bardCollegeTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.bardCollege.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                Invocaciones Sobrenaturales{' '}
              </strong>
              <ul>
                {invocations.map((invocationName, i) => (
                  <li className="sheet__trait-label" key={invocationName}>
                    <SkillItem
                      ref={skillRefs.invocations.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                Pacto con {translatePatron(getWarlockPatron(pc))}
              </strong>
              <ul>
                {patronTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.patron.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                Dominio de {translateDivineDomain(getDivineDomain(pc))}
              </strong>
              <ul>
                {divineDomainTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.divineDomain.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                <SkillItem
                  ref={skillRefs.channelDivinity.current.main}
                  traitName="channelDivinity"
                  trait={CLASSES.cleric.leveling[2].traits.channelDivinity}
                  pc={pc}
                  openModal={openSkillModal('channelDivinity', 'main')}
                />
              </strong>
              <ul>
                {channelDivinityTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.channelDivinity.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                {translateDruidCircle(getDruidCircle(pc))}
              </strong>
              <ul>
                {druidCircleTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.druidCircle.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                Arquetipo del {translateRangerConclave(getRangerConclave(pc))}
              </strong>
              <ul>
                {rangerConclaveTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.rangerConclave.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                {translateMartialArchetype(getMartialArchetype(pc))}
              </strong>
              <ul>
                {martialArchetypeTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.martialArchetype.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                {translateSorcererOrigin(getSorcererOrigin(pc))}
              </strong>
              <ul>
                {sorcererOriginTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.sorcererOrigin.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                {translateArcaneTradition(getArcaneTradition(pc))}
              </strong>
              <ul>
                {arcaneTradicionTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.arcaneTradition.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                {translateMonasticTradition(getMonasticTradition(pc))}
              </strong>
              <ul>
                {monasticTraditionTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.monasticTradition.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                {translateSacredOath(getSacredOath(pc))}
              </strong>
              <ul>
                {sacredOathTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.sacredOath.current[i]}
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
            <li className="sheet__trait-label">
              <strong className="sheet__trait">
                {translateRoguishArchetype(getRoguishArchetype(pc))}
              </strong>
              <ul>
                {roguishArchetypeTraits.map(([traitName, trait], i) => (
                  <li className="sheet__trait-label" key={traitName}>
                    <SkillItem
                      ref={skillRefs.roguishArchetype.current[i]}
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
