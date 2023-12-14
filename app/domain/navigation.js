import { insertAfter, unique } from '~/utils/insert';
import { PATHS } from '~/utils/paths';
import { isDm } from './user';

const menuLinks = [
  { name: 'Perfil', url: '/', level: 0, isForPlayers: true },
  { name: 'Dados', url: '/dice', level: 0, isForPlayers: true },
  { name: 'Lugares', url: '/places', level: 0, isForPlayers: false },
  { name: 'Personajes', url: '/characters', level: 0, isForPlayers: true },
  { name: 'Party', url: '/party', level: 0, isForPlayers: false },
  { name: 'Encuentros', url: '/encounters', level: 0, isForPlayers: false },
  { name: 'Glosario', url: '/glossary', level: 0, isForPlayers: false },
  { name: 'Items', url: '/items', level: 0, isForPlayers: false },
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
      { name: partyIdState, url: `/party/${partyIdState}`, level: 1 },
    ]);
  }

  if (isDm && partyIdState && encounterIdState) {
    items = insertAfter(item => item.name === 'Encuentros', items, [
      {
        name: 'Combate',
        url: `/party/${partyIdState}/encounters/${encounterIdState}`,
        level: 2,
      },
    ]);
  }

  if (allPcIds?.length) {
    items = insertAfter(
      item => item.name === 'Personajes',
      items,
      allPcIds.reduce(
        (newItems, id, i) => [
          ...newItems,
          {
            name: allPcNames[i],
            url: PATHS.summary(id),
            level: 1,
          },
          {
            name: 'Inventario',
            url: PATHS.bio(id),
            level: 2,
          },
          {
            name: 'Conjuros',
            url: PATHS.spells(id),
            level: 2,
          },
        ],
        []
      )
    );
  }

  return items;
}
