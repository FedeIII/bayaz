import { insertAfter } from '~/utils/insert';
import { PATHS } from '~/utils/paths';

const menuLinks = [
  { name: 'Perfil', url: '/', level: 0, isForPlayers: true },
  { name: 'Dados', url: '/dice', level: 0, isForPlayers: true },
  { name: 'Lugares', url: '/places', level: 0, isForPlayers: false },
  { name: 'Personajes', url: '/characters', level: 0, isForPlayers: true },
  { name: 'Party', url: '/party', level: 0, isForPlayers: false },
  { name: 'Glosario', url: '/glossary', level: 0, isForPlayers: false },
];

export function getBasicMenuItems(user) {
  if (user?.roles.includes('dm')) {
    return menuLinks;
  }

  return menuLinks.filter(item => item.isForPlayers);
}

export function getAllMenuItems({
  isDm,
  pcName,
  partyIdState,
  pcNamesState,
  encounterIdState,
}) {
  let items = [...menuLinks];

  if (!isDm) {
    items = menuLinks.filter(item => item.isForPlayers);
  }

  if (isDm && partyIdState) {
    items = insertAfter(item => item.name === 'Party', items, [
      { name: partyIdState, url: `/party/${partyIdState}`, level: 1 },
      {
        name: 'Encuentros',
        url: `/party/${partyIdState}/encounters`,
        level: 2,
      },
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

  if (isDm && pcNamesState?.length) {
    items = insertAfter(
      item => item.name === 'Personajes',
      items,
      pcNamesState.reduce(
        (newItems, pcName) => [
          ...newItems,
          {
            name: pcName,
            url: PATHS.summary(pcName),
            level: 1,
          },
          {
            name: 'Inventario',
            url: PATHS.bio(pcName),
            level: 2,
          },
          {
            name: 'Conjuros',
            url: PATHS.spells(pcName),
            level: 2,
          },
        ],
        []
      )
    );
  } else {
    if (pcName) {
      items = insertAfter(item => item.name === 'Personajes', items, [
        {
          name: pcName,
          url: PATHS.summary(pcName),
          level: 1,
        },
        {
          name: 'Inventario',
          url: PATHS.bio(pcName),
          level: 2,
        },
        {
          name: 'Conjuros',
          url: PATHS.spells(pcName),
          level: 2,
        },
      ]);
    }
  }

  return items;
}
