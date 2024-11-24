export const NPC_FAITH_DESCRIPTION = [
  'Verdadero creyente discreto',
  'Practicante casual',
  'Estudiante crítico',
  'Abiertamente cínico',
  'Curioso de mente abierta',
  'Fe perdida',
  'Cauteloso',
  'Verdadero creyente fanático',
];

export const NPC_DEITIES = [
  [35, 'Matter'],
  [20, 'Energy'],
  [10, 'Spirit'],
  [5, 'Space'],
  [30, 'None'],
];

export function getDeity(deityName) {
  return Object.keys(NPC_DEITIES_NAMES).find(deity =>
    NPC_DEITIES_NAMES[deity].find(
      deityEntry => deityEntry[1].split(' (')[0] === deityName.split(' (')[0]
    )
  );
}

export const NPC_DEITIES_NAMES = {
  Matter: [
    [60, 'Simtu (Naturaleza)'],
    [40, 'Abnu (Comercio)'],
    [30, 'Sabatu (Curación)'],
    [20, 'Zid (Caza)'],
    [10, 'Terrafar (Montaña)'],
    [10, 'Durku (Ladrones)'],
    [10, 'Tigris (Ríos)'],
    [10, 'Mummu (Mar)'],
    [10, 'Ishtar (Riqueza)'],
    [10, 'Astar (Belleza)'],
    [10, 'Ashnan (Alcohol)'],
  ],
  Energy: [
    [60, 'Akosh (Tormenta)'],
    [40, 'Giru (Tech)'],
    [30, 'Ilu (Fuego)'],
    [20, 'Dshim (Viento)'],
    [10, 'Nuska (Luz)'],
    [10, 'Hefesto (Minería)'],
    [10, 'Kothar (Poder)'],
  ],
  Spirit: [
    [60, 'Kabattu (Guerra)'],
    [40, 'Lamassu (Almas)'],
    [30, 'Napsutu (Sueño)'],
    [20, 'Namtar (Muerte)'],
    [10, 'Ayya (Vida)'],
    [10, 'Shalmu (Paz)'],
    [10, 'Ishqum (Amor)'],
    [10, 'Laylu (Noche)'],
    [10, 'Nabu (Día)'],
    [10, 'Dianna (Destino)'],
  ],
  Space: [
    [60, 'Burumu (Cielo)'],
    [40, 'Alaktu (Estrellas)'],
    [30, 'Dumu (Tiempo)'],
    [20, 'Nashi’um (Viajeros)'],
    [10, 'Shumu (Eternidad)'],
    [10, 'Kur (Vacío)'],
    [10, 'Anqamar (Gravedad)'],
    [10, 'Shamash (Orden)'],
    [10, 'Ilmun (Conocimiento)'],
  ],
  None: [
    [50, 'Indiferente con los dioses'],
    [35, 'Seguidor de todos los dioses'],
    [15, 'Contra todos los dioses'],
  ],
};
