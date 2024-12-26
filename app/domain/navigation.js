import { insertAfter, unique } from '~/utils/array';
import { PATHS } from '~/utils/paths';
import { isDm } from './user';

const menuLinks = [
  { name: 'Perfil', url: '/', level: 0, isForPlayers: true },
  { name: 'Dados', url: '/dice', level: 0, isForPlayers: true },
  { name: 'Lugares', url: '/places', level: 0 },
  /**/ { name: 'Asentamientos', url: '/places/list', level: 1 },
  /**/ { name: 'Genéricos', url: '/places/generic/list', level: 1 },
  { name: 'Mapa', url: '/map', level: 0 },
  { name: 'Personajes', url: '/characters', level: 0, isForPlayers: true },
  /**/ { name: 'NPCs', url: '/characters/npc/main/list', level: 1 },
  /**/ { name: 'Quick NPCs', url: '/characters/npc/quick/list', level: 1 },
  /****/ { name: 'Crear NPC', url: '/characters/npc/quick/new', level: 2 },
  { name: 'Party', url: '/party', level: 0 },
  { name: 'Encuentros', url: '/encounters', level: 0 },
  /**/ { name: 'Crear', url: '/encounters/new', level: 1 },
  /**/ { name: 'Lista', url: '/encounters/list', level: 1 },
  { name: 'Items', url: '/items', level: 0 },
  { name: 'Glosario', url: '/glossary', level: 0 },
];

export function getBasicMenuItems(user) {
  if (isDm(user)) {
    return menuLinks;
  }

  return menuLinks.filter(item => item.isForPlayers);
}

export function getAllMenuItems({
  isDm,
  partyIdState,
  allPcIds = [],
  allPcNames = [],
  encounterIdState,
}) {
  let items = [...menuLinks];

  if (!isDm) {
    items = menuLinks.filter(item => item.isForPlayers);
  }

  if (isDm && partyIdState) {
    items = insertAfter(item => item.name === 'Party', items, [
      { name: 'Sesión', url: `/party/${partyIdState}`, level: 1 },
      { name: 'Imágenes', url: `/party/${partyIdState}/images`, level: 1 },
    ]);
  }

  if (allPcIds?.length) {
    items.push(
      ...allPcIds.reduce(
        (newItems, id, i) => [
          ...newItems,
          {
            header: allPcNames[i],
            pc: allPcNames[i],
            name: 'Principal',
            url: PATHS.summary(id),
            level: 1,
            collapsedIcon: 'ጰ',
          },
          {
            name: 'Inventario',
            pc: allPcNames[i],
            url: PATHS.bio(id),
            level: 2,
            collapsedIcon: '⚔',
          },
          {
            name: 'Conjuros',
            pc: allPcNames[i],
            url: PATHS.spells(id),
            level: 2,
            collapsedIcon: '⛥',
          },
        ],
        []
      )
    );
  }

  return items;
}
