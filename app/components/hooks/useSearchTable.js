import { useEffect, useState } from 'react';
import { newEmpyTableResults, getTable } from '~/domain/tables/searchTables';

const defaultEmptyResults = newEmpyTableResults();

export function useSearchTable(search) {
  const [tableResults, setTableResults] = useState(defaultEmptyResults);

  useEffect(() => {
    if (search.length < 3) {
      setTableResults(defaultEmptyResults);
    } else {
      getTable(search).then(res => {
        setTableResults(res);
      });
    }
  }, [search]);

  return tableResults;
}
