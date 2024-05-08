import { createEncounter, getEncounter } from '~/services/encounter.server';
import { getParty } from '~/services/party.server';
import { updatePc } from '~/services/pc.server';

export async function createNpcsEncounter({ id, name, npcs }) {
  const npcEncounter = await getEncounter(id);

  if (npcEncounter) return npcEncounter;

  const newEncounter = await createEncounter({ id, name, npcs });

  return newEncounter;
}

export async function endPartyEncounter(partyId) {
  const party = await getParty(partyId);
  for (let pcId of party.players) {
    updatePc({ id: pcId, initiative: null });
  }
}
