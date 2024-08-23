import { useEffect, useState } from 'react';
import { getTable } from '~/domain/tables';

export function useSearchTable(search) {
  const [tableResults, setTableResults] = useState([]);

  useEffect(() => {
    if (search.length < 3) {
      setTableResults([]);
    } else {
      getTable(search).then(res => {
        setTableResults(res);
      });
    }
  }, [search]);

  return tableResults;
}
