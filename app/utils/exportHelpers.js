import { t } from '~/domain/translations';

export function downloadNpcData(formData) {
  const npcText = formatNpcForExport(formData);
  const blob = new Blob([npcText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${formData.name || 'npc'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function formatNpcForExport(npc) {
  const sections = [
    `Nombre: ${npc.name}`,
    `Raza: ${t(npc.race)}`,
    `Género: ${t(npc.gender)}`,
    '\n',
    'Apariencia:',
    ...(npc.looks?.map(look => `- ${look}`) || []),
    '\n',
    'Comportamiento:',
    `- Ánimo actual: ${npc.behavior.mood}`,
    `- En calma: ${npc.behavior.calm}`,
    `- En estrés: ${npc.behavior.stress}`,
    npc.talent ? `- Talento: ${npc.talent}` : '',
    '\n',
    'Fe:',
    npc.faith.description ? `- Descripción: ${npc.faith.description}` : '',
    npc.faith.deityName ? `- Deidad: ${npc.faith.deityName}` : '',
    '\n',
    'Rasgos:',
    npc.ideals ? `- Ideales: ${npc.ideals}` : '',
    npc.bonds ? `- Vínculos: ${npc.bonds}` : '',
    npc.flaws ? `- Defectos: ${npc.flaws}` : '',
    '\n',
    npc.notes ? 'Notas:' : '',
    npc.notes || '',
  ].filter(Boolean);

  return sections.join('\n');
}
