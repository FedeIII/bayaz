import { includesAll } from '~/utils/array';
import { TABLE_MAP, TABLES } from './tables';

export const newEmpyTableResults = () => ({
  title: [],
  keywords: [],
  rows: [],
});

export async function getTable(search) {
  const lowercaseSearch = search.toLowerCase();
  const searchWords = lowercaseSearch.split(' ');
  return TABLES.reduce((tableResults, table) => {
    if (includesAll(table.name.toLowerCase(), searchWords)) {
      tableResults.title.push(table);
    } else if (
      table.keywords.some(keyword => keyword.includes(lowercaseSearch))
    ) {
      tableResults.keywords.push(table);
    } else if (
      table.rows.some(row =>
        Object.entries(row).some(
          ([key, value]) =>
            includesAll(key.toLowerCase(), searchWords) ||
            includesAll(value.toLowerCase(), searchWords)
        )
      )
    ) {
      tableResults.rows.push(table);
    }

    return tableResults;
  }, newEmpyTableResults());
}

export function getAssociatedTable(text) {
  const gemsMatch = text.match(/gemas.*valor.*([\d].+) po/);
  if (gemsMatch) {
    return TABLE_MAP.get(`Piedras Preciosas de ${gemsMatch[1]} po`);
  }

  const artMatch = text.match(/obras.*arte.*([\d].+) po/);
  if (artMatch) {
    return TABLE_MAP.get(`Obras de arte de ${artMatch[1]} po`);
  }

  const magicMatch = text.match(/objetos mágicos ([A-Z])/);
  if (magicMatch) {
    return TABLE_MAP.get(`Tabla de objetos mágicos ${magicMatch[1]}`);
  }
}
