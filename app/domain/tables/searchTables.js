import { includesAll } from '~/utils/array';
import { TABLES } from './tables';

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
