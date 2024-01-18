import { createEncounter, getEncounter } from '~/services/encounter.server';

export async function createNpcsEncounter({ id, name, npcs }) {
  const npcEncounter = await getEncounter(id);

  if (npcEncounter) return npcEncounter;

  const newEncounter = await createEncounter({ id, name, npcs });

  return newEncounter;
}
