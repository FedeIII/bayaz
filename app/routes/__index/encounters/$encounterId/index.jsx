import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import {
  createRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getPc, healPc, updatePc } from '~/services/pc.server';
import { addMonstersKilled, getParty } from '~/services/party.server';
import { health, Monster, sortByXp } from '~/domain/encounters/monsters';
import {
  addMonsterToEncounter,
  damageMonster,
  getEncounter,
  healMonster,
  updateEncounterNotes,
} from '~/services/encounter.server';
import MonstersContext from '~/components/contexts/monstersContext';
import { getActiveSession } from '~/domain/party/party';
import { damagePc } from '~/domain/mutations/characterMutations';
import usePcsFromSession from '~/components/hooks/usePcsFromSession';
import { useCharacterItems } from '~/components/modal/useCharacterItems';
import { CharacterModal } from '~/components/modal/characterModal';
import { translateMonster } from '~/domain/encounters/monsterTranslations';
import { rollDice } from '~/domain/random';
import { npcHealth } from '~/domain/npc/npc';
import { endPartyEncounter } from '~/domain/mutations/partyMutations';
import { NpcsCombat } from '~/routes/__index/encounters/$encounterId/npcsCombat';
import { MonstersCombat } from '~/routes/__index/encounters/$encounterId/monstersCombat';
import { replaceAt } from '~/utils/array';
import { getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/randomEncounter.css';
import charactersStyles from '~/components/characters/characters.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: charactersStyles },
  ];
};

const MAX_SEARCH_MOBS = 5;

export const loader = async ({ params }) => {
  const encounter = await getEncounter(params.encounterId);

  let npcs;
  if (encounter.npcs?.length) {
    npcs = await Promise.all(encounter.npcs.map(getPc));
  }

  if (encounter.monsters?.length) {
    encounter.monsters = sortByXp(encounter.monsters.map(Monster));
  }

  return json({ encounter, npcs });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const endCombat = formData.get('endCombat');
  const encounterId = formData.get('encounterId');
  const partyId = formData.get('partyId');
  const isNpcs = formData.get('isNpcs');
  const action = formData.get('action');
  const monsterName = formData.get('monsterName');

  if (action === 'set-initiative') {
    const pcId = formData.get('id');
    const newInitiative = formData.get('value');

    await updatePc({
      id: pcId,
      initiative: Number(newInitiative),
    });
  }

  const encounter = await getEncounter(encounterId);

  if (action === 'add-monster') {
    return await addMonsterToEncounter(encounterId, monsterName);
  }

  if (action === 'set-initiative') {
    return encounter;
  }

  if (action === 'set-notes') {
    const notesEntries = Array.from(formData.entries()).filter(
      ([key]) => key !== 'action' && key !== 'encounterId'
    );

    return await updateEncounterNotes(
      encounterId,
      notesEntries.reduce(
        (notes, notesEntry) => ({ ...notes, [notesEntry[0]]: notesEntry[1] }),
        {}
      )
    );
  }

  if (partyId) {
    const party = await getParty(partyId);

    const activeSession = getActiveSession(party);

    const mobsKilled = encounter.monsters
      .filter(m => m.hp <= 0)
      .map(m => m.name);

    if (endCombat) {
      if (mobsKilled.length) {
        await Promise.all([
          addMonstersKilled(partyId, activeSession.id, mobsKilled),
        ]);
      }

      await endPartyEncounter(partyId);

      return redirect(`/party/${partyId}`);
    }
  }

  let updatedEncounter = encounter;

  const damagedMonsterId = formData.get('damage');
  const damage = formData.get(`damage-${damagedMonsterId}`);
  const healMonsterId = formData.get('heal');
  const heal = formData.get(`heal-${healMonsterId}`);

  if (isNpcs) {
    if (damagedMonsterId && damage) {
      updatedEncounter = await damagePc(damagedMonsterId, parseInt(damage, 10));
    }

    if (healMonsterId && heal) {
      updatedEncounter = await healPc(healMonsterId, parseInt(heal, 10));
    }
  } else {
    if (damagedMonsterId && damage) {
      updatedEncounter = await damageMonster(
        encounterId,
        damagedMonsterId,
        parseInt(damage, 10)
      );
    }

    if (healMonsterId && heal) {
      updatedEncounter = await healMonster(
        encounterId,
        healMonsterId,
        parseInt(heal, 10)
      );
    }
  }

  const damagePcId = formData.get('pc-damage');
  const pcDamage = formData.get(`pc-damage-${damagePcId}`);
  if (damagePcId && pcDamage) {
    await damagePc(damagePcId, parseInt(pcDamage, 10));
  }

  const healPcId = formData.get('pc-heal');
  const pcHeal = formData.get(`pc-heal-${healPcId}`);
  if (healPcId && pcHeal) {
    await healPc(healPcId, parseInt(pcHeal, 10));
  }

  return json({ encounter: updatedEncounter });
};

function PartyCombat() {
  const { encounter, npcs } = useLoaderData();
  const { id: encounterId, monsters } = encounter;
  const [pcs, partyId, updatePcs] = usePcsFromSession();
  const pcsPlusNpcs = useMemo(() => [...pcs, ...npcs], [pcs, npcs]);
  const submit = useSubmit();

  const isNpcs = !!npcs?.length && !monsters?.length;
  const mobs = isNpcs ? npcs : monsters;

  const monsterContext = useContext(MonstersContext) || {};
  const {
    monstersState,
    setMonstersState,
    deleteMonstersState,
    setEncounterIdState,
    deleteEncounterIdState,
  } = monsterContext;

  function onSubmit(data) {
    if ([].slice.call(data.target).find(node => node.name === 'endCombat')) {
      deleteMonstersState();
      deleteEncounterIdState();
    }
  }

  const [refsList, setRefsList] = useState({
    mobs: useRef(monsters.map(createRef)),
    searchMobs: useRef(Array(MAX_SEARCH_MOBS).fill(createRef())),
  });

  const [
    characterModalContent,
    closeCharacterModal,
    openCharacterModal,
    selectedCharacterRef,
    setSelectedCharacterRef,
  ] = useCharacterItems(refsList);

  const [initiatives, setInitiatives] = useState({
    mobs: mobs.map((_, i) => monstersState?.[i]?.initiative || 0),
    pcs: pcsPlusNpcs.map(pc => pc.initiative || 0),
  });

  useEffect(() => {
    setInitiatives(old => ({
      mobs: mobs.map((_, i) => old.mobs[i] || 0),
      pcs: pcsPlusNpcs.map(pc => pc.initiative || 0),
    }));
  }, [mobs, pcsPlusNpcs]);

  useEffect(() => {
    setEncounterIdState(encounterId);
    setMonstersState(
      mobs.map((mob, i) => ({
        name: mob.name,
        health: isNpcs ? npcHealth(mob) : health(mob),
        initiative: initiatives.mobs[i],
      }))
    );
  }, [encounterId, mobs, initiatives.mobs]);

  const initiativesList = useMemo(() => {
    return [
      ...initiatives.mobs
        .map((mobInitiative, i) => ({
          type: 'mobs',
          name: isNpcs
            ? mobs[i].name
            : mobs[i].nick || translateMonster(mobs[i].name),
          value: mobInitiative,
          index: i,
        }))
        .filter((_, i) => (isNpcs ? npcs[i].hitPoints : monsters[i].hp > 0)),
      ...initiatives.pcs
        .map((pcInitiative, i) => ({
          type: 'pcs',
          name: pcsPlusNpcs[i].name,
          value: pcInitiative,
          index: i,
        }))
        .filter((_, i) => pcsPlusNpcs[i].hitPoints > 0),
    ].sort((a, b) => b.value - a.value);
  }, [initiatives.mobs, initiatives.pcs, mobs, pcsPlusNpcs]);

  function resetInitiatives() {
    setInitiatives({
      mobs: mobs.map(() => 0),
      pcs: pcs.map(pc => pc.initiative || 0),
    });
  }

  function setMobInitiatives(mobDexes) {
    return () =>
      setInitiatives(old => ({
        ...old,
        mobs: mobs.map((_, i) =>
          rollDice('1d20' + increment(getStatMod(mobDexes[i])))
        ),
      }));
  }

  function addMonsterToEncounter(monsterName) {
    submit(
      { action: 'add-monster', encounterId, monsterName },
      { method: 'post' }
    );
  }

  function setEncounterNotes(encounterId, notes) {
    submit({ action: 'set-notes', encounterId, ...notes }, { method: 'post' });
  }

  const [hover, setHover] = useState({
    mobs: null,
    pcs: null,
  });

  const formRef = useRef(null);

  return (
    <Form
      method="post"
      className="encounters__form"
      onSubmit={onSubmit}
      ref={formRef}
    >
      <input
        readOnly
        type="text"
        name="encounterId"
        value={encounterId}
        hidden
      />
      <input readOnly type="text" name="partyId" value={partyId} hidden />

      {characterModalContent && (
        <CharacterModal
          elRef={selectedCharacterRef}
          formRef={formRef}
          closeModal={closeCharacterModal}
        >
          {characterModalContent}
        </CharacterModal>
      )}

      {isNpcs && (
        <NpcsCombat
          refsList={refsList}
          openCharacterModal={openCharacterModal}
          initiativesList={initiativesList}
          initiatives={initiatives}
          setInitiatives={setInitiatives}
          hover={hover}
          setHover={setHover}
          resetInitiatives={resetInitiatives}
          setMobInitiatives={setMobInitiatives}
          pcs={pcs}
          partyId={partyId}
          updatePcs={updatePcs}
        />
      )}

      {!isNpcs && (
        <MonstersCombat
          refsList={refsList}
          MAX_SEARCH_MOBS={MAX_SEARCH_MOBS}
          addMonsterToEncounter={addMonsterToEncounter}
          openCharacterModal={openCharacterModal}
          initiativesList={initiativesList}
          initiatives={initiatives}
          setMonsterRandomInitiative={(i, dex) => e => {
            setInitiatives(old => ({
              ...old,
              mobs: replaceAt(
                i,
                old.mobs,
                rollDice('1d20' + increment(getStatMod(dex)))
              ),
            }));
          }}
          setMonsterInitiative={i => e => {
            setInitiatives(old => ({
              ...old,
              mobs: replaceAt(i, old.mobs, e.target.value),
            }));
          }}
          setLocalPcInitiative={i => e => {
            setInitiatives(old => ({
              ...old,
              pcs: replaceAt(i, old.pcs, e.target.value),
            }));
          }}
          setRemotePcInitiative={i => e => {
            submit(
              {
                action: 'set-initiative',
                id: pcsPlusNpcs[i].id,
                value: e.target.value,
                encounterId,
              },
              { method: 'post' }
            );
          }}
          setEncounterNotes={setEncounterNotes}
          hover={hover}
          setHover={setHover}
          resetInitiatives={resetInitiatives}
          setMobInitiatives={setMobInitiatives}
          pcs={pcsPlusNpcs}
          partyId={partyId}
          updatePcs={updatePcs}
        />
      )}
    </Form>
  );
}

export default PartyCombat;
